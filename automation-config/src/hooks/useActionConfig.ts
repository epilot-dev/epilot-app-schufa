import { useCallback, useEffect, useState } from "react";
import {
	getActionConfig,
	isInitialized,
	updateActionConfig,
	updateContentHeight,
} from "@epilot/app-bridge";
import { CLIENT_IDS_OPTION_KEY, DEFAULT_CONFIG } from "../types";
import type { ClientIdEntry, SchufaActionConfig } from "../types";

interface ActionConfigShape {
	custom_action_config?: SchufaActionConfig;
	options?: Array<{ key: string; value?: unknown }>;
}

function parseEntries(options: ActionConfigShape["options"]): ClientIdEntry[] {
	const clientIdsOption = options?.find((o) => o.key === CLIENT_IDS_OPTION_KEY);
	const rawEntries = clientIdsOption?.value;
	if (!Array.isArray(rawEntries)) return [];

	const next: ClientIdEntry[] = [];
	for (const e of rawEntries) {
		if (!e || typeof e !== "object") continue;
		const obj = e as Record<string, unknown>;
		if (typeof obj.id !== "string" || obj.id.length === 0) continue;
		const entry: ClientIdEntry = { id: obj.id };
		if (typeof obj.name === "string") entry.name = obj.name;
		next.push(entry);
	}
	return next;
}

/**
 * Syncs the Schufa action config with the automation editor via app-bridge.
 *
 * The iframe's session token is app-scoped and can't read the org's install
 * data from the App API, so the host (epilot360-automation-hub) forwards the
 * component's option values inside the `init-action-config` payload. We read
 * `client_ids` from there.
 */
export function useActionConfig() {
	const [config, setConfig] = useState<SchufaActionConfig>(DEFAULT_CONFIG);
	const [entries, setEntries] = useState<ClientIdEntry[]>([]);
	const [loaded, setLoaded] = useState(false);

	const fetchActionConfig = useCallback(async () => {
		try {
			const actionConfig =
				(await getActionConfig<SchufaActionConfig>()) as ActionConfigShape;
			const saved = actionConfig.custom_action_config;
			if (saved && typeof saved === "object") {
				setConfig({ ...DEFAULT_CONFIG, ...saved });
			}
			setEntries(parseEntries(actionConfig.options));
		} catch (err) {
			console.warn(
				"[schufa-automation-config] Failed to load action config:",
				err,
			);
		}
	}, []);

	useEffect(() => {
		if (!isInitialized()) {
			setLoaded(true);
			return;
		}

		let cancelled = false;
		(async () => {
			await fetchActionConfig();
			if (!cancelled) setLoaded(true);
		})();

		return () => {
			cancelled = true;
		};
	}, [fetchActionConfig]);

	useEffect(() => {
		if (loaded && isInitialized()) {
			requestAnimationFrame(() => {
				// Reserve enough vertical space for the Select dropdown menu, which
				// Radix portals inside the same iframe. The host clamps the iframe to
				// whatever height we report, so we floor it generously.
				updateContentHeight(Math.max(document.body.scrollHeight, 480));
			});
		}
	}, [config, loaded]);

	const updateConfig = useCallback((next: SchufaActionConfig) => {
		setConfig(next);
		if (isInitialized()) updateActionConfig(next);
	}, []);

	return { config, updateConfig, entries, loaded };
}
