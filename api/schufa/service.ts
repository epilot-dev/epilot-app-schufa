import { SFN } from "@aws-sdk/client-sfn";
import type { EntityItem } from "@epilot/entity-client";
import { isAxiosError } from "axios";
import { nanoid } from "nanoid";
import { Resource } from "sst";
import type { ZodError } from "zod/v4";
import { z } from "zod/v4";
import {
	APPS_REQUESTS_SLACK_WEBHOOK_CHANNEL,
	SLACK_WEBHOOK_URL,
} from "../config";
import { mapToPersonalDataOrThrow } from "../data-mapping";
import { getEntityClient } from "../entity/client";
import { VisibleError } from "../errors";
import type { Components } from "../openapi";
import { SCHUFA_MOCK_DATA } from "../test-data";
import { logger, sanitizeContact } from "../utils/logger";
import { useSchufaAuthTokenOrThrow } from "./auth";
import { getSchufaClient } from "./client";
import type { CreditRatingInformation, Score } from "./schufa";

const sfn = new SFN();

export type SchufaPayload =
	Components.RequestBodies.SchufaCheckRequest["data"]["entity"];

// consent is initially handled by the client
export function isUserConsentPresent(entity: SchufaPayload) {
	return true;
}

// entity is already hydrated from the automation worker
export function findContactEntity(entity: SchufaPayload) {
	logger.debug("looking for contact in entity payload", {
		entity: sanitizeContact(entity),
	});

	if (!isEntityItem(entity)) return undefined;

	if (entity._schema === "opportunity") {
		return entity?.customer?.find(
			(entity: EntityItem) => entity?._schema === "contact",
		) as EntityItem | undefined;
	}

	if (entity._schema === "order") {
		return entity?.customer?.find(
			(entity: EntityItem) => entity?._schema === "contact",
		) as EntityItem | undefined;
	}

	if (entity._schema === "contact") return entity;

	if (entity._schema === "submission") {
		// only single contacts supported initially. pick the first contact
		return entity?.mapped_entities?.find(
			(entity: EntityItem) => entity?._schema === "contact",
		) as EntityItem;
	}

	// other use cases not supported (yet)
	return undefined;
}

const SchufaErrorSchema = z.object({
	title: z.string(),
	status: z.number(),
	detail: z.string(),
});

export async function getCreditScoreForUser(params: {
	app_options: Components.RequestBodies.SchufaCheckRequest["data"]["app_options"];
	contact: EntityItem;
}): Promise<Partial<CreditRatingInformation> | ZodError> {
	// test mode is dedicated for customers to play around with different use cases
	if (params.app_options.enable_test_mode) {
		const user = SCHUFA_MOCK_DATA.find(
			(user) =>
				user.firstName === params.contact?.first_name &&
				user.lastName === params.contact?.last_name,
		);

		if (!user?.details) {
			new VisibleError("Test user not found", "NO_TEST_USER", 400, {
				contact: params.contact,
			});
		}

		return {
			score: {
				status: "active",
				description: "This is a dry run. No real SCHUFA data was fetched.",
				details: user?.details,
			},
		};
	}

	const { access_token } = await useSchufaAuthTokenOrThrow(
		params.app_options.client_id,
	);

	const mapping_result = mapToPersonalDataOrThrow(params.contact);

	if (mapping_result.error) {
		logger.error("Failed to map personal data for SCHUFA", {
			mapping_result,
		});

		return mapping_result.error;
	}

	try {
		const client = getSchufaClient();

		const result = await client.energy(
			undefined,
			{
				personData: mapping_result.data,
			},
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			},
		);

		logger.info("SCHUFA data fetched successfully", {
			information: result.data,
		});

		if (result.status === 200) {
			const information = result.data as CreditRatingInformation;

			return information;
		}

		return { reportId: result.data.reportId };
	} catch (error) {
		logger.error("Failed to fetch SCHUFA data", {
			error: isAxiosError(error) ? error.toJSON() : error,
			error_message: isAxiosError(error) ? error.response?.data : undefined,
			contact: sanitizeContact(params.contact),
		});

		if (isAxiosError(error)) {
			const response = SchufaErrorSchema.parse(error.response?.data);
			throw new VisibleError(
				response.detail,
				"SCHUFA_DATA_ERROR",
				response.status,
				{ error },
			);
		}

		throw new VisibleError(
			"Failed to fetch SCHUFA data",
			"SCHUFA_DATA_ERROR",
			500,
			{ error },
		);
	}
}

export async function updateContactWithSchufaScore(params: {
	schufa_score: Score;
	access_token: string;
	contact: EntityItem;
}) {
	if (params.contact._schema !== "contact") {
		return;
	}

	const client = getEntityClient({
		token: params.access_token,
		org_id: params.contact.org_id,
	});

	await client.patchEntity(
		{ id: params.contact._id, slug: "contact" },
		{
			score_value: params.schufa_score.details?.value,
			score_range: params.schufa_score.details?.range,
			schufa_text: params.schufa_score.details?.text,
			schufa_risk_rate: params.schufa_score.details?.riskRate,
			schufa_info_text: params.schufa_score.details?.infoText?.map((text) => ({
				_id: nanoid(),
				_tags: [],
				value: text,
			})),
			score_timestamp: new Date().toISOString(),
		},
	);
}

export async function startAsyncReportProcessing(params: {
	reportId: string;
	contact: EntityItem;
	epilotToken: string;
	clientId: string;
}) {
	logger.info(
		"[createAsyncSchufaProcessing] received input for async schufa processing",
		{ reportId: params.reportId, contact_id: params.contact._id },
	);

	try {
		const input = {
			reportId: params.reportId,
			epilotToken: params.epilotToken,
			contact: params.contact,
			clientId: params.clientId,
		};

		await sfn.startExecution({
			stateMachineArn: Resource.AsyncStateMachine.arn,
			input: JSON.stringify(input),
			name: `schufa-async-${params.contact._id}-${params.reportId}-${Date.now()}-${nanoid(5)}`,
			traceHeader: params.reportId,
		});
	} catch (error) {
		logger.error("Failed to start async SCHUFA processing", {
			error: isAxiosError(error) ? error.toJSON() : error,
		});
		throw new VisibleError(
			"Failed to start async SCHUFA processing",
			"SCHUFA_DATA_ERROR",
			500,
			{ error },
		);
	}
}

export const notifySlackOnSchufaRequest = async (params: {
	org_id: string;
	level: "info" | "error";
	entity_id: string;
	is_test_request?: boolean;
	error_reason?: string;
}) => {
	if (!Resource.App.stage.startsWith("prod")) {
		return; // skip in non-prod environments
	}
	const text =
		params.level === "error"
			? `:alert: Schufa request for org: ${params.org_id} failed. Entity ID: ${params.entity_id}. Error reason: ${params.error_reason ?? "No error reason provided"}`
			: `:white_check_mark: Schufa request for org: ${params.org_id}. Entity ID: ${params.entity_id}`;

	try {
		await fetch(SLACK_WEBHOOK_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: JSON.stringify({
				text: params.is_test_request ? `*TEST* ${text}` : text,
				channel: APPS_REQUESTS_SLACK_WEBHOOK_CHANNEL,
				username: "epilot Apps",
				icon_emoji: ":app:",
			}),
		});
	} catch (err) {
		logger.error("error on [notifySlackOnSchufaRequest]", { error: err });
	}
};

function isEntityItem(input: unknown): input is EntityItem {
	return (
		typeof input === "object" &&
		input !== null &&
		"_id" in input &&
		"_schema" in input
	);
}
