import { useCallback, useEffect, useRef, useState } from "react";
import {
	getActionConfig,
	getSession,
	isInitialized,
	updateActionConfig,
	updateContentHeight,
} from "@epilot/app-bridge";
import { createAppClient } from "../api/appClient";
import { CLIENT_IDS_OPTION_KEY, DEFAULT_CONFIG } from "../types";
import type { ClientIdEntry, SchufaActionConfig } from "../types";

interface ActionConfigShape {
	component_id?: string;
	custom_action_config?: SchufaActionConfig;
}

/**
 * Hook that syncs the Schufa action config with the epilot automation
 * action config via app-bridge, and reads the org-configured `client_ids`
 * entries from the matching installed app component.
 *
 * Resilience: the very first mount can race with the parent app-bridge
 * handshake or a stale CDN response, leaving the dropdown empty. We refetch
 * whenever:
 *   - the iframe regains visibility (user switched tabs / opened the action
 *     after editing the install in another tab)
 *   - the first fetch returned nothing — one short retry catches the race
 */
export function useActionConfig() {
	const [config, setConfig] = useState<SchufaActionConfig>(DEFAULT_CONFIG);
	const [entries, setEntries] = useState<ClientIdEntry[]>([]);
	const [loaded, setLoaded] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const componentIdRef = useRef<string | undefined>(undefined);

	const fetchEntries = useCallback(async () => {
		try {
			const { token } = getSession();
			const client = createAppClient(token);
			const { data } = await client.listInstallations({
				componentType: "CUSTOM_FLOW_ACTION",
			});

			const component = (data.apps ?? [])
				.flatMap((app) => app.components ?? [])
				.find(
					(c) =>
						c.component_type === "CUSTOM_FLOW_ACTION" &&
						c.id === componentIdRef.current,
				);

			const clientIdsOption = component?.options?.find(
				(o) => o.key === CLIENT_IDS_OPTION_KEY,
			);
			const rawEntries = (clientIdsOption as { value?: unknown })?.value;

			const next: ClientIdEntry[] = [];
			if (Array.isArray(rawEntries)) {
				for (const e of rawEntries) {
					if (!e || typeof e !== "object") continue;
					const obj = e as Record<string, unknown>;
					if (typeof obj.id !== "string" || obj.id.length === 0) continue;
					const entry: ClientIdEntry = { id: obj.id };
					if (typeof obj.name === "string") entry.name = obj.name;
					next.push(entry);
				}
			}

			setEntries(next);
			return next.length;
		} catch (err) {
			console.warn(
				"[schufa-automation-config] Failed to load app installation:",
				err,
			);
			return 0;
		}
	}, []);

	useEffect(() => {
		if (!isInitialized()) {
			setLoaded(true);
			return;
		}

		let cancelled = false;

		(async () => {
			try {
				const actionConfig =
					(await getActionConfig<SchufaActionConfig>()) as ActionConfigShape;
				if (cancelled) return;
				componentIdRef.current = actionConfig.component_id;
				const saved = actionConfig.custom_action_config;
				if (saved && typeof saved === "object") {
					setConfig({ ...DEFAULT_CONFIG, ...saved });
				}
			} catch (err) {
				console.warn(
					"[schufa-automation-config] Failed to load action config:",
					err,
				);
			}

			if (cancelled) return;
			const found = await fetchEntries();

			// One-shot retry if the first attempt found nothing — covers the
			// race between this iframe mounting and the listInstallations
			// response carrying the latest install.
			if (!cancelled && found === 0) {
				setTimeout(() => {
					if (!cancelled) void fetchEntries();
				}, 800);
			}

			if (!cancelled) setLoaded(true);
		})();

		return () => {
			cancelled = true;
		};
	}, [fetchEntries]);

	// Refetch whenever the iframe becomes visible again (covers the case
	// where the user added an entry in another tab while this surface was
	// hidden).
	useEffect(() => {
		const onVisible = () => {
			if (document.visibilityState === "visible" && componentIdRef.current) {
				void fetchEntries();
			}
		};
		document.addEventListener("visibilitychange", onVisible);
		return () => document.removeEventListener("visibilitychange", onVisible);
	}, [fetchEntries]);

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

		if (!isInitialized()) return;

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		debounceRef.current = setTimeout(() => {
			updateActionConfig(next);
		}, 300);
	}, []);

	return { config, updateConfig, entries, loaded };
}
