import * as https from "node:https";
import { URLSearchParams } from "node:url";
import { useSchufaConfig } from "../config";
import { VisibleError } from "../errors";
import { logger } from "../utils/logger";

interface OAuthTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string;
	refresh_token?: string;
}

interface CachedToken extends OAuthTokenResponse {
	expires_at: number; // Unix timestamp in milliseconds
}

interface HttpResponse {
	status: number;
	ok: boolean;
	json: () => Promise<OAuthTokenResponse>;
}

// Global variable for Lambda container reuse (warm starts)
let tokenCache: CachedToken | null = null;

export async function useSchufaAuthTokenOrThrow(client_id: string) {
	if (tokenCache && tokenCache.expires_at > Date.now()) {
		return tokenCache;
	}

	try {
		const config = useSchufaConfig();

		const postData = new URLSearchParams({
			client_id,
			grant_type: "client_credentials",
			scope: "hub-api-products",
		}).toString();

		const options: https.RequestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			cert: config.secret.cert,
			key: config.secret.key,
		};

		const response: HttpResponse = await new Promise((resolve, reject) => {
			const req = https.request(
				`${config.baseAuthUrl}/auth/realms/hub/protocol/openid-connect/token`,
				options,
				(res) => {
					let data = "";
					// biome-ignore lint/suspicious/noAssignInExpressions: yolo
					res.on("data", (chunk) => (data += chunk));
					res.on("end", () => {
						try {
							const status = res.statusCode ?? 200;
							const parsedData = JSON.parse(data || "{}");
							resolve({
								status,
								ok: status >= 200 && status < 300,
								json: () => Promise.resolve(parsedData),
							});
						} catch (parseError) {
							reject(new Error(`JSON parse error: ${parseError}`));
						}
					});
				},
			);

			req.on("error", reject);
			req.write(postData);
			req.end();
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const tokenData = await response.json();

		if (!tokenData.access_token) {
			throw new Error("Access token not found in response");
		}

		// Calculate expires_at with a 60-second buffer
		const bufferSeconds = 60;
		const expiresAt =
			Date.now() + (tokenData.expires_in - bufferSeconds) * 1000;

		// Cache the token with expires_at
		tokenCache = {
			...tokenData,
			expires_at: expiresAt,
		};

		logger.debug(`Token cached until: ${new Date(expiresAt).toISOString()}`);

		return tokenCache;
	} catch (error) {
		throw new VisibleError(
			"Es konnte keine Verbindung zum SCHUFA-Server hergestellt werden. Bitte kontaktiere den Support.",
			"SCHUFA_AUTH_ERROR",
			500,
			{ error },
		);
	}
}
