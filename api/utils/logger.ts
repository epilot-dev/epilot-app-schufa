import { Logger } from "@aws-lambda-powertools/logger";
import type { Entity } from "@epilot/entity-client";

export const logger = new Logger({ serviceName: "epilot-schufa-app" });

const SENSITIVE_CONTACT_FIELDS = [
	"first_name",
	"last_name",
	"email",
	"phone",
	"address",
];

export const sanitizeContact = (contact?: Entity) => {
	if (!contact) return;
	const sanitizedContact = { ...contact };

	for (const field of SENSITIVE_CONTACT_FIELDS) {
		if (sanitizedContact[field]) {
			sanitizedContact[field] = "REDACTED";
		}
	}

	return sanitizedContact;
};
