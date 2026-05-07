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

interface InstallationsResponse {
	apps?: Array<{
		components?: Array<{
			id?: string;
			component_type?: string;
			options?: Array<{ key: string; value?: unknown }>;
		}>;
	}>;
}

/**
 * Hook that syncs the Schufa action config with the epilot automation
 * action config via app-bridge, and reads the org-configured `client_ids`
 * entries from the matching installed app component.
 *
 * Resilience: when the surface mounts inside the automation editor for the
 * first time, the parent's app-bridge response can lag the iframe enough that
 * `getActionConfig` resolves before the parent has wired things up, leaving
 * `component_id` undefined. So we:
 *   - fire `listInstallations` in parallel with `getActionConfig` instead of
 *     gating on it (the API call doesn't need component_id, only the filter
 *     step does)
 *   - retry the whole flow on backoff if either piece is still missing
 *   - refetch on visibilitychange so flipping back to the tab picks up
 *     entries the user added in another tab
 */
export function useActionConfig() {
	const [config, setConfig] = useState<SchufaActionConfig>(DEFAULT_CONFIG);
	const [entries, setEntries] = useState<ClientIdEntry[]>([]);
	const [loaded, setLoaded] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const componentIdRef = useRef<string | undefined>(undefined);
	const installationsRef = useRef<InstallationsResponse | null>(null);
	const entriesRef = useRef<ClientIdEntry[]>([]);

	const recomputeEntries = useCallback((): number => {
		const data = installationsRef.current;
		const componentId = componentIdRef.current;
		if (!data || !componentId) return 0;

		const component = (data.apps ?? [])
			.flatMap((app) => app.components ?? [])
			.find(
				(c) => c.component_type === "CUSTOM_FLOW_ACTION" && c.id === componentId,
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
	}, []);

	const fetchInstallations = useCallback(async () => {
		try {
			const { token } = getSession();
			const client = createAppClient(token);
			const { data } = await client.listInstallations({
				componentType: "CUSTOM_FLOW_ACTION",
			});
			installationsRef.current = data as InstallationsResponse;
			recomputeEntries();
		} catch (err) {
			console.warn(
				"[schufa-automation-config] Failed to load app installations:",
				err,
			);
		}
	}, [recomputeEntries]);

	const fetchActionConfig = useCallback(async () => {
		try {
			const actionConfig =
				(await getActionConfig<SchufaActionConfig>()) as ActionConfigShape;
			if (actionConfig.component_id) {
				componentIdRef.current = actionConfig.component_id;
			}
			const saved = actionConfig.custom_action_config;
			if (saved && typeof saved === "object") {
				setConfig({ ...DEFAULT_CONFIG, ...saved });
			}
			recomputeEntries();
		} catch (err) {
			console.warn(
				"[schufa-automation-config] Failed to load action config:",
				err,
			);
		}
	}, [recomputeEntries]);

	useEffect(() => {
		if (!isInitialized()) {
			setLoaded(true);
			return;
		}

		let cancelled = false;
		const retryDelays = [400, 1000, 2500];

		(async () => {
			// Fire both calls in parallel — `listInstallations` doesn't need
			// component_id, only the filter step does.
			await Promise.all([fetchActionConfig(), fetchInstallations()]);
			if (cancelled) return;
			setLoaded(true);

			// If we still don't have entries, the bridge response or the API
			// call landed stale. Re-run both with backoff until something shows
			// up or we run out of attempts.
			for (const delay of retryDelays) {
				if (cancelled) return;
				if (entriesRef.current.length > 0) return;
				await new Promise((r) => setTimeout(r, delay));
				if (cancelled) return;
				await Promise.all([fetchActionConfig(), fetchInstallations()]);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [fetchActionConfig, fetchInstallations]);

	// Mirror entries into the ref so the retry loop reads the latest count
	// without re-running the effect.
	useEffect(() => {
		entriesRef.current = entries;
	}, [entries]);

	// Refetch when the iframe regains visibility (covers "user added an entry
	// in another tab while this surface was hidden").
	useEffect(() => {
		const onVisible = () => {
			if (document.visibilityState === "visible") {
				void fetchInstallations();
			}
		};
		document.addEventListener("visibilitychange", onVisible);
		return () => document.removeEventListener("visibilitychange", onVisible);
	}, [fetchInstallations]);

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
