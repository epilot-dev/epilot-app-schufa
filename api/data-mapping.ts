import { SCHUFA_TEST_DATA } from "./test-data";

import type { EntityItem } from "@epilot/entity-client";
import { Resource } from "sst";
import { ZodError, z } from "zod/v4";
import { VisibleError } from "./errors";
import type { PersonData as PayloadForSchufa } from "./schufa/schufa";
import { logger, sanitizeContact } from "./utils/logger";

type Gender = "MALE" | "FEMALE" | "DIVERSE" | "UNKNOWN";

// Character set accepted by SCHUFA for names and address fields.
const SCHUFA_CHARS =
	"A-Za-z\\dßÄÖÜäöüĄąŁłĽľŚśŠšŞşŤťŹźŽžŻżŔŕÁáÂâĂăĹĺĆćÇçČčÉéĘęËëĚěÍíÎîĎďƉđŃńŇňÓóÔôŐőŘřŮůÚúŰűÝýŢţÃÅÆÈÊÌÏÐÑÒÕØÙÛÞÀàãåæèêìïðñòõøùûþÿŒœŸƒ:/()',.\\-\\s";
const SCHUFA_ALLOWED_CHARS = new RegExp(`^[${SCHUFA_CHARS}]+$`);
const SCHUFA_ALLOWED_CHARS_OR_EMPTY = new RegExp(`^[${SCHUFA_CHARS}]*$`);
const SCHUFA_DISALLOWED_CHAR = new RegExp(`[^${SCHUFA_CHARS}]`, "g");

// Invisible / zero-width characters that sneak in via copy-paste (e.g. from PDFs):
// soft hyphen, zero-width space/joiners, bidi marks, word joiner, BOM.
const INVISIBLE_CHARS = /[\u00AD\u200B-\u200F\u2060\uFEFF]/g;

const stripInvisibleChars = (val: unknown) =>
	typeof val === "string" ? val.replace(INVISIBLE_CHARS, "") : val;

/** Removes invisible characters before running the given string schema. */
const cleanString = <T extends z.ZodType>(schema: T) =>
	z.preprocess(stripInvisibleChars, schema);

// Validation messages are German and deliberately do NOT contain the field
// name – formatValidationError() prepends the human readable label.
const MSG_MISSING = "fehlt";
const msgMaxLength = (max: number) => `darf höchstens ${max} Zeichen lang sein`;
const msgInvalidChars = (iss: { input?: unknown }) => {
	const chars = [
		...new Set(String(iss.input ?? "").match(SCHUFA_DISALLOWED_CHAR) ?? []),
	];
	return `enthält unzulässige Zeichen: ${chars.map((c) => `„${c}“`).join(", ")}`;
};

/** Required text field: must be present, non-empty and only use SCHUFA chars. */
const requiredText = (maxLength: number) =>
	cleanString(
		z
			.string({ error: MSG_MISSING })
			.min(1, { error: MSG_MISSING })
			.regex(SCHUFA_ALLOWED_CHARS, { error: msgInvalidChars })
			.transform((val) => val.trim().slice(0, maxLength)),
	);

/** Optional text field: may be empty, but must only use SCHUFA chars. */
const optionalText = (maxLength: number) =>
	cleanString(
		z
			.string()
			.max(maxLength, { error: msgMaxLength(maxLength) })
			.regex(SCHUFA_ALLOWED_CHARS_OR_EMPTY, { error: msgInvalidChars }),
	).optional();

const AddressSchema = z.object({
	streetWithNumber: requiredText(46),
	postalCode: z.coerce
		.string()
		.transform((val) => val.trim())
		.pipe(z.string().length(5, { error: "muss genau 5 Zeichen lang sein" })),
	city: requiredText(44),
	country: z
		.literal("DEU", { error: "muss Deutschland (DEU) sein" })
		.optional(),
});

const PersonData = z.object({
	firstName: requiredText(44),
	lastName: requiredText(46),
	gender: z.enum(["MALE", "FEMALE", "DIVERSE", "UNKNOWN"]).default("UNKNOWN"),
	dateOfBirth: z
		.any()
		.transform((val) => {
			if (typeof val !== "string") return undefined;

			// Try parsing as date
			const date = new Date(val);
			const min = new Date("1900-01-01");
			const max = new Date();

			// Reject if not a valid date string (e.g., "00.00.0000", "banana")
			const isoMatch = /^\d{4}-\d{2}-\d{2}$/.test(val);
			if (!isoMatch) return undefined;

			// Check actual range
			if (Number.isNaN(date.getTime()) || date < min || date > max)
				return undefined;

			return val;
		})
		.optional(),
	title: optionalText(30),
	placeOfBirth: optionalText(24),
	addresses: z.object({
		currentAddress: AddressSchema,
		previousAddress: AddressSchema.optional(),
	}),
});

type PersonData = z.infer<typeof PersonData>;

export function mapToPersonalDataOrThrow(entity: EntityItem) {
	const __TEST_ENVIRONMENT__ = !Resource.App.stage.startsWith("prod");

	const address = entity.address?.[0];

	const prevAddress =
		entity.address?.length > 1 ? entity.address[1] : undefined;

	const shallow_data: PayloadForSchufa = {
		firstName: entity.first_name ?? entity.firstName,
		lastName: entity.last_name ?? entity.lastName,
		gender: salutationToGender(entity.salutation),
		dateOfBirth: entity.dateOfBirth ?? entity.birthday ?? entity.birthdate,
		title: entity.title,
		placeOfBirth:
			entity.placeOfBirth ??
			entity.birthplace ??
			entity.birth_place ??
			entity.place_of_birth,
		addresses: {
			currentAddress: {
				city: address?.city,
				streetWithNumber: `${address?.street} ${address?.street_number}`,
				postalCode:
					address?.postal_code ??
					address?.postalCode ??
					address?.zip_code ??
					address?.zip,
				country: toCountryCode(address?.country),
			},
			previousAddress:
				prevAddress && isGermanAddress(prevAddress.country)
					? {
							city: prevAddress.city,
							streetWithNumber: `${prevAddress.street} ${prevAddress.street_number}`,
							postalCode:
								prevAddress.postal_code ??
								prevAddress.postalCode ??
								prevAddress.zip_code ??
								prevAddress.zip,
							country: toCountryCode(prevAddress.country),
						}
					: undefined,
		},
	};

	try {
		const user = PersonData.parse(shallow_data);

		if (__TEST_ENVIRONMENT__) {
			const test_user = SCHUFA_TEST_DATA.find(
				(test) =>
					test.firstName === user?.firstName &&
					test.lastName === user?.lastName,
			);
			if (!test_user) {
				// TODO map to error_message so the automation action can display this error message
				throw new VisibleError(
					"Test user not found. Please use a test account from the provided data set",
					"NO_TEST_USER",
					400,
				);
			}
		}

		return {
			data: user,
			error: undefined,
		};
	} catch (error) {
		if (isZodError(error)) {
			return {
				data: undefined,
				error,
			};
		}

		logger.error("unexpected error while mapping personal data", {
			error,
			data: shallow_data,
			contact: sanitizeContact(entity),
		});

		if (error instanceof VisibleError) throw error;

		throw new VisibleError(
			"Unexpected error while mapping personal data",
			"DATA_MAPPING_ERROR",
			500,
		);
	}
}

export const isZodError = (value: unknown): value is ZodError =>
	value instanceof ZodError;

const salutationToGender = (salutation?: string): Gender => {
	if (!salutation) return "UNKNOWN";

	if (salutation === "Mr.") return "MALE";

	if (salutation === "Ms. / Mrs.") return "FEMALE";

	return "UNKNOWN";
};

// ISO 3166-1 alpha-3 codes, e.g. DEU for Germany
const toCountryCode = (country?: string): string | undefined => {
	if (!country) return undefined;

	if (country.length === 3) return country.toUpperCase();
	if (country === "DE") return "DEU";
};

const isGermanAddress = (country?: string) => {
	// on empty countries schufa assumes that the address is in Germany
	if (!country) return true;

	return country.toUpperCase() === "DEU" || country.toUpperCase() === "DE";
};

const FIELD_LABELS: Record<string, string> = {
	firstName: "Vorname",
	lastName: "Nachname",
	title: "Titel",
	placeOfBirth: "Geburtsort",
	dateOfBirth: "Geburtsdatum",
	gender: "Anrede",
	streetWithNumber: "Straße und Hausnummer",
	postalCode: "PLZ",
	city: "Ort",
	country: "Land",
};

const describeIssuePath = (path: PropertyKey[]) => {
	const field = String(path.at(-1) ?? "");
	const label = FIELD_LABELS[field] ?? field;
	return path.includes("previousAddress")
		? `${label} (vorherige Adresse)`
		: label;
};

/**
 * Turns a zod validation error into a user-facing (German) error_output for
 * the automation UI: a one-line summary in error_reason plus one entry per
 * field in error_info.details.
 */
export function formatValidationError(error: ZodError) {
	// only report the first problem per field – e.g. an empty string fails
	// both the min(1) and the regex check
	const seen = new Set<string>();
	const problems: { field: string; message: string }[] = [];

	for (const issue of error.issues) {
		const key = issue.path.map(String).join(".");
		if (seen.has(key)) continue;
		seen.add(key);
		problems.push({
			field: describeIssuePath(issue.path),
			message: issue.message,
		});
	}

	const summary = problems.map((p) => `${p.field} ${p.message}`).join("; ");

	return {
		error_code: "MAPPING_ERROR",
		error_reason: `Die Kontaktdaten sind für die SCHUFA-Prüfung ungültig: ${summary}. Bitte korrigiere die Daten am Kontakt.`,
		error_info: {
			details: problems.map((p) => ({
				explanation: p.field,
				context: p.message,
			})),
		},
	};
}
