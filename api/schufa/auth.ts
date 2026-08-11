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
	body: string;
	headers: import("node:http").IncomingHttpHeaders;
	json: () => Promise<OAuthTokenResponse>;
}

// Global variable for Lambda container reuse (warm starts)
let tokenCache: CachedToken | null = null;

// Fingerprints a PEM for logs WITHOUT leaking it: a real cert/key is a long
// string starting with "-----BEGIN ...", while an unset SST secret is the
// short "...-placeholder" default. Lets us tell "secret didn't deploy" apart
// from "SCHUFA rejected a valid cert".
function describePem(pem?: string) {
	if (!pem) return "MISSING";
	const head = pem.split("\n", 1)[0] ?? "";
	return `len=${pem.length} head=${JSON.stringify(head)}`;
}

// keeps enough of the client_id to identify it towards SCHUFA support
// without logging the full credential
export function maskClientId(client_id?: string) {
	if (!client_id) return "MISSING";
	if (client_id.length <= 4) return "****";
	return `${"*".repeat(client_id.length - 4)}${client_id.slice(-4)}`;
}

export interface SchufaClientRef {
	client_id: string;
	/** human-readable label of the configured `client_ids` entry */
	option_name?: string;
	/** how the client_id was resolved from the app options */
	resolved_via?: string;
}

export async function useSchufaAuthTokenOrThrow(client: SchufaClientRef) {
	if (tokenCache && tokenCache.expires_at > Date.now()) {
		return tokenCache;
	}

	const { client_id } = client;

	try {
		const config = useSchufaConfig();

		// everything SCHUFA support needs to trace the call on their side,
		// without leaking the full credential
		const request_context = {
			token_url: config.tokenUrl,
			method: "POST",
			grant_type: "client_credentials",
			scope: "default",
			client_id: maskClientId(client_id),
			option_name: client.option_name,
			resolved_via: client.resolved_via,
			cert: describePem(config.secret.cert),
			key: describePem(config.secret.key),
		};

		logger.info("requesting SCHUFA auth token", request_context);

		const postData = new URLSearchParams({
			client_id,
			grant_type: "client_credentials",
			scope: "default",
		}).toString();

		const options: https.RequestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"user-agent": "epilot-app-schufa",
			},
			cert: config.secret.cert,
			key: config.secret.key,
		};

		const response: HttpResponse = await new Promise((resolve, reject) => {
			const req = https.request(`${config.tokenUrl}`, options, (res) => {
				let data = "";
				// biome-ignore lint/suspicious/noAssignInExpressions: yolo
				res.on("data", (chunk) => (data += chunk));
				res.on("end", () => {
					const status = res.statusCode ?? 0;
					resolve({
						status,
						ok: status >= 200 && status < 300,
						body: data,
						headers: res.headers,
						json: () => Promise.resolve(JSON.parse(data || "{}")),
					});
				});
			});

			req.on("error", (err) => {
				// genuine transport failure (DNS, TLS handshake, connection reset)
				// — distinct from SCHUFA answering with a non-2xx below.
				logger.error("transport error contacting SCHUFA auth endpoint", {
					...request_context,
					code: (err as NodeJS.ErrnoException).code,
					message: err.message,
				});
				reject(err);
			});
			req.write(postData);
			req.end();
		});

		if (!response.ok) {
			logger.error("SCHUFA auth endpoint returned non-2xx", {
				...request_context,
				status: response.status,
				body: response.body || "(empty body)",
				headers: response.headers,
			});
			throw new Error(
				`SCHUFA token HTTP ${response.status}: ${response.body || "(empty body)"}`,
			);
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
