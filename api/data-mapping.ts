import { SCHUFA_TEST_DATA } from "./test-data";

import type { EntityItem } from "@epilot/entity-client";
import { Resource } from "sst";
import { ZodError, z } from "zod/v4";
import { VisibleError } from "./errors";
import type { PersonData as PayloadForSchufa } from "./schufa/schufa";
import { logger, sanitizeContact } from "./utils/logger";

type Gender = "MALE" | "FEMALE" | "DIVERSE" | "UNKNOWN";

const SCHUFA_ALLOWED_CHARS =
	/^[A-Za-z\dßÄÖÜäöüĄąŁłĽľŚśŠšŞşŤťŹźŽžŻżŔŕÁáÂâĂăĹĺĆćÇçČčÉéĘęËëĚěÍíÎîĎďƉđŃńŇňÓóÔôŐőŘřŮůÚúŰűÝýŢţÃÅÆÈÊÌÏÐÑÒÕØÙÛÞÀàãåæèêìïðñòõøùûþÿŒœŸƒ:/()',.\-\s]+$/;

const AddressSchema = z.object({
	streetWithNumber: z
		.string()
		.min(1)
		.regex(SCHUFA_ALLOWED_CHARS, {
			message: "Invalid characters in streetWithNumber",
		})
		.transform((val) => val.trim().slice(0, 46)),
	postalCode: z.coerce
		.string()
		.length(5, { message: "Die PLZ muss genau 5 Zeichen lang sein" }),
	city: z
		.string()
		.min(1)
		.regex(SCHUFA_ALLOWED_CHARS, { message: "Invalid characters in city" })
		.transform((val) => val.trim().slice(0, 44)),
	country: z.literal("DEU").optional(),
});

const PersonData = z.object({
	firstName: z
		.string()
		.min(1)
		.regex(SCHUFA_ALLOWED_CHARS, { message: "Invalid characters in firstName" })
		.transform((val) => val.trim().slice(0, 44)),
	lastName: z
		.string()
		.min(1)
		.regex(SCHUFA_ALLOWED_CHARS, { message: "Invalid characters in lastName" })
		.transform((val) => val.trim().slice(0, 46)),
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
	title: z
		.union([
			z.literal(""),
			z
				.string()
				.max(30)
				.regex(SCHUFA_ALLOWED_CHARS, { message: "Invalid characters", error: "Invalid characters" }),
		])
		.optional(),
	placeOfBirth: z
		.string()
		.max(24)
		.regex(SCHUFA_ALLOWED_CHARS, {
			message: "Invalid characters in placeOfBirth",
		})
		.optional(),
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
