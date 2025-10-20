import { verify } from "node:crypto";
import type { IncomingMessage } from "node:http";
import type { Context } from "openapi-backend";
import { logger } from "./logger";

export type PublicKey = {
	algorithm: string;
	issuer: string;
	public_key: string;
};

let cachedPublicKey: string | null = null;

export type HttpRequest = IncomingMessage & { body: string | Buffer };

export async function verifyEpilotSignature(c: Context) {
	try {
		const webhookId = c.request.headers["webhook-id"] as string;
		const webhookTimestamp = c.request.headers["webhook-timestamp"] as string;
		const webhookSignature = c.request.headers["webhook-signature"] as string;

		const payload = JSON.stringify(c.request.requestBody?.data);

		if (!webhookId || !webhookTimestamp || !webhookSignature) {
			logger.warn("[verifyEpilotSignature] Missing required headers");
			return false;
		}

		if (!isFreshTimestamp(webhookTimestamp)) {
			logger.warn("[verifyEpilotSignature] Timestamp too old");
			return false;
		}

		const publicKeyPem = await getEpilotPublicKey();
		if (!publicKeyPem) {
			logger.warn("[verifyEpilotSignature] Failed to fetch public key");
			return false;
		}

		const signatures = parseSignatures(webhookSignature);
		if (!signatures.v1a) {
			logger.warn("[verifyEpilotSignature] No v1a signature found");
			return false;
		}

		// Reconstruct the signed content: msg_id.timestamp.payload
		const signedContent = `${webhookId}.${webhookTimestamp}.${payload}`;
		const messageBuffer = Buffer.from(signedContent, "utf8");
		const signatureBuffer = Buffer.from(signatures.v1a, "base64");

		// Verify using ed25519 - pass the public key directly as a string
		const result = verify(null, messageBuffer, publicKeyPem, signatureBuffer);

		return result;
	} catch (error) {
		logger.error("[verifyEpilotSignature] Error during verification", {
			error,
		});
		return false;
	}
}

function isFreshTimestamp(webhookTimestamp: string) {
	const currentTime = Math.floor(Date.now() / 1000);
	const webhookTime = Number.parseInt(webhookTimestamp);
	const tolerance = 300; // 5 minutes

	return Math.abs(currentTime - webhookTime) <= tolerance;
}

export async function getEpilotPublicKey(): Promise<string | null> {
	if (!cachedPublicKey) {
		const response = await fetch(
			"https://cdn.app.sls.epilot.io/v1/.well-known/public-key",
		);
		if (!response.ok) return null;
		const json = (await response.json()) as PublicKey;
		if (!json.public_key) return null;
		cachedPublicKey = json.public_key;
	}

	return cachedPublicKey;
}

function parseSignatures(webhookSignature: string): Record<string, string> {
	const signatures: Record<string, string> = {};
	for (const part of webhookSignature.split(" ")) {
		const [version, signature] = part.split(",", 2);
		if (version && signature) {
			signatures[version] = signature;
		}
	}

	return signatures;
}
