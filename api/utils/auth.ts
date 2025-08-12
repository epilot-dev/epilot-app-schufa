import { verify } from "node:crypto";
import type { Context } from "openapi-backend";
import { getEnvironment } from "./stage";

type PublicKey = {
	algorithm: string;
	issuer: string;
	public_key: string;
};

let cachedPublicKey: string | null = null;

export async function verifyEpilotSignature(c: Context) {
	try {
		const webhookId = c.request.headers["webhook-id"];
		const webhookTimestamp = c.request.headers["webhook-timestamp"];
		const webhookSignature = c.request.headers["webhook-signature"];
		const payload = c.request.body;

		// prevent replay attack
		const currentTime = Math.floor(Date.now() / 1000);
		const webhookTime = Number.parseInt(webhookTimestamp);
		const tolerance = 300; // 5 minutes

		if (Math.abs(currentTime - webhookTime) > tolerance) {
			return false;
		}

		const environment = getEnvironment();
		// Fetch the public key from epilot's well-known endpoint, but cache it
		if (!cachedPublicKey) {
			const stage = !environment
				? "dev"
				: environment.startsWith("prod")
					? ""
					: environment;
			const url = ["https://cdn.app", stage, "sls", "epilot.io"]
				.filter(Boolean)
				.join(".");
			const response = await fetch(`${url}/v1/.well-known/public-key`);
			if (!response.ok) {
				return false;
			}
			const json = (await response.json()) as PublicKey;
			if (!json.public_key) {
				return false;
			}
			cachedPublicKey = json.public_key;
		}
		const publicKeyPem = cachedPublicKey;

		// Parse webhook-signature header to extract v1a signature
		const signatures: Record<string, string> = {};

		for (const part of webhookSignature.split(" ")) {
			const [version, signature] = part.split(",", 2);
			if (version && signature) {
				signatures[version] = signature;
			}
		}

		if (!signatures.v1a) {
			return false;
		}

		// Reconstruct the signed content: msg_id.timestamp.payload
		const signedContent = `${webhookId}.${webhookTimestamp}.${payload}`;
		const messageBuffer = Buffer.from(signedContent, "utf8");
		const signatureBuffer = Buffer.from(signatures.v1a, "base64");

		// Verify using ed25519
		return verify(null, messageBuffer, publicKeyPem, signatureBuffer);
	} catch (error) {
		return false;
	}
}
