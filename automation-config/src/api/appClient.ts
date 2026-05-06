import { getClient } from "@epilot/app-client";

/**
 * The iframe is served from `cdn.app{.stage}.sls.epilot.io`. The matching App
 * API lives at `app{.stage}.sls.epilot.io`. Derive the base URL from the host
 * so the same bundle works in dev / staging / prod without env wiring.
 *
 * Falls back to the production URL when the iframe is not embedded (e.g. local
 * `pnpm dev`).
 */
function deriveAppApiBaseUrl(): string {
	const host = window.location.host;
	const match = host.match(/^cdn\.app(\.[a-z0-9-]+)?\.sls\.epilot\.io$/);
	if (match) {
		const stage = match[1] ?? "";
		return `https://app${stage}.sls.epilot.io`;
	}
	return "https://app.sls.epilot.io";
}

export function createAppClient(token: string) {
	const client = getClient();
	client.defaults.baseURL = deriveAppApiBaseUrl();
	client.defaults.headers.common.Authorization = `Bearer ${token}`;
	return client;
}
