import { isZodError } from "../data-mapping";
import { VisibleError } from "../errors";
import type { OperationHandler } from "../openapi";
import { verifyEpilotSignature } from "../utils/auth";
import { replyJSON } from "../utils/lambda";
import { logger, sanitizeContact } from "../utils/logger";
import {
	findContactEntity,
	getCreditScoreForUser,
	isUserConsentPresent,
	notifySlackOnSchufaRequest,
	startAsyncReportProcessing,
	updateContactWithSchufaScore,
} from "./service";

export const schufaCheck: OperationHandler<"schufaCheck"> = async (c) => {
	const isCorrectSignature = verifyEpilotSignature(c);
	if (!isCorrectSignature) {
		return replyJSON(
			{
				error_output: {
					error_reason: "Invalid signature",
				},
			},
			{ statusCode: 401 },
		);
	}

	const access_token = c.request.headers["x-epilot-token"] as string;

	if (!access_token) {
		return replyJSON(
			{
				error_output: {
					error_reason: "Missing access token in request headers.",
				},
			},
			{ statusCode: 401 },
		);
	}

	try {
		const contact = findContactEntity(c.request.requestBody.data.entity);
		logger.info("contact entity found", { contact: sanitizeContact(contact) });

		if (!contact) {
			return replyJSON({
				skip_reason: "Kein Kontakt für Bonitätsprüfung gefunden.",
			});
		}

		if (!isUserConsentPresent(contact)) {
			return replyJSON({
				skip_reason:
					"Der Kontakt hat keine Einwilligung für die SCHUFA-Prüfung.",
			});
		}

		const schufa_score = await getCreditScoreForUser({
			app_options: c.request.requestBody.data.app_options,
			contact,
		});

		if (isZodError(schufa_score)) {
			logger.warn("zod validation errror - returning 404", {
				contact: sanitizeContact(contact),
				schufa_score,
			});
			return replyJSON(
				{
					error_output: {
						error_reason: "Failed to map personal data for SCHUFA.",
						error_info: {
							details: schufa_score.issues.map((i) => {
								const property = i.path.at(-1);
								return {
									explanation: [property, i.message].join(": "),
								};
							}),
						},
					},
				},
				{ statusCode: 400 },
			);
		}

		if (!schufa_score.score && !schufa_score.reportId) {
			return replyJSON({
				skip_reason: "Kein SCHUFA Score oder Report ID gefunden.",
			});
		}

		if (schufa_score.reportId && !schufa_score.score) {
			await startAsyncReportProcessing({
				epilotToken: access_token,
				contact,
				clientId: c.request.requestBody.data.app_options.client_id,
				reportId: schufa_score.reportId,
			});

			return replyJSON({
				skip_reason:
					"Der SCHUFA-Report benötigt eine manuelle Bearbeitung. Dies kann bis zu 24 Stunden dauern. Bitte prüfe den Kontakt später erneut.",
			});
		}

		if (schufa_score.score) {
			await updateContactWithSchufaScore({
				schufa_score: schufa_score.score,
				access_token,
				contact,
			});
		}

		await notifySlackOnSchufaRequest({
			level: "info",
			org_id: c.request.requestBody.data.entity._org,
			entity_id: c.request.requestBody.data.entity._id,
			is_test_request: c.request.requestBody.data.app_options.enable_test_mode,
		});

		return replyJSON({}, { statusCode: 200 });
	} catch (error) {
		await notifySlackOnSchufaRequest({
			level: "error",
			org_id: c.request.requestBody.data.entity._org,
			entity_id: c.request.requestBody.data.entity._id,
			error_reason:
				error instanceof Error
					? error.message
					: "Unexpected error while processing SCHUFA check.",
			is_test_request: c.request.requestBody.data.app_options.enable_test_mode,
		});

		logger.error("[handler] Unexpected error while processing SCHUFA check", {
			error,
			contact: sanitizeContact(c.request.requestBody.data.entity),
		});

		if (error instanceof VisibleError) {
			return replyJSON(
				{
					error_output: {
						error_reason: error.message,
						error_info: {
							details: [{ explanation: error.message }],
						},
					},
				},
				{ statusCode: error.statusCode },
			);
		}

		return replyJSON(
			{
				error_output: {
					error_reason: "Unexpected error while processing SCHUFA check.",
				},
			},
			{ statusCode: 500 },
		);
	}
};
