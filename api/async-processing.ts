import type { EntityItem } from "@epilot/entity-client";
import { isAxiosError } from "axios";
import { StillProcessingError } from "./errors";
import { useSchufaAuthTokenOrThrow } from "./schufa/auth";
import { getSchufaClient } from "./schufa/client";
import type { CreditRatingInformation } from "./schufa/schufa";
import { updateContactWithSchufaScore } from "./schufa/service";
import { logger } from "./utils/logger";

type Input = {
	reportId: string;
	epilotToken: string;
	clientId: string;
	contact: EntityItem;
};

export async function handler(input: Input) {
	logger.info(
		"[CheckProcessingStatus] received input for async schufa processing v2",
		{
			reportId: input.reportId,
			contact_id: input.contact._id,
			org_id: input.contact._org,
		},
	);

	const client = getSchufaClient();

	try {
		const { access_token } = await useSchufaAuthTokenOrThrow(input.clientId);
		const result = await client.get(`/manual-processing/${input.reportId}`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		});

		if (result.status === 202) {
			logger.info(
				"SCHUFA report is still being processed - throwing StillProcessingError",
				{
					result: result.data,
				},
			);
			// we use sfn automatic retries with an exponential backoff strategy (max 5 retries, 2 min interval)
			throw new StillProcessingError(
				"The SCHUFA report is still being processed. Please try again later.",
			);
		}

		const information = result.data as CreditRatingInformation;

		logger.info("SCHUFA report processing completed", {
			information,
			reportId: input.reportId,
			contact_id: input.contact._id,
			org_id: input.contact._org,
		});

		if (information.score) {
			await updateContactWithSchufaScore({
				access_token: input.epilotToken,
				schufa_score: information.score,
				contact: input.contact,
			});
		}
	} catch (error) {
		if (error instanceof StillProcessingError) throw error;

		logger.error("Failed to check SCHUFA processing status", {
			error: isAxiosError(error) ? error.toJSON() : error,
		});
	}
}
