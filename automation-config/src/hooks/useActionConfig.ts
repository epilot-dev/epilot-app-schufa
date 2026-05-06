import { useCallback, useEffect, useRef, useState } from "react";
import {
	getActionConfig,
	getSession,
	isInitialized,
	updateActionConfig,
	updateContentHeight,
} from "@epilot/app-bridge";
import { createAppClient } from "../api/appClient";
import { CLIENT_ID_KEY_PREFIX, DEFAULT_CONFIG } from "../types";
import type { ClientIdOption, SchufaActionConfig } from "../types";

interface ActionConfigShape {
	component_id?: string;
	custom_action_config?: SchufaActionConfig;
}

/**
 * Hook that syncs the Schufa action config with the epilot automation
 * action config via app-bridge, and fetches the available `client_id_*`
 * option keys from the matching installed app component.
 */
export function useActionConfig() {
	const [config, setConfig] = useState<SchufaActionConfig>(DEFAULT_CONFIG);
	const [clientIdOptions, setClientIdOptions] = useState<ClientIdOption[]>([]);
	const [loaded, setLoaded] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (!isInitialized()) {
			setLoaded(true);
			return;
		}

		(async () => {
			let componentId: string | undefined;
			try {
				const actionConfig =
					(await getActionConfig<SchufaActionConfig>()) as ActionConfigShape;
				componentId = actionConfig.component_id;
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
							c.id === componentId,
					);

				const options: ClientIdOption[] = (component?.options ?? [])
					.filter((option) => option.key.startsWith(CLIENT_ID_KEY_PREFIX))
					.map((option) => ({
						key: option.key,
						label: option.label,
						description: option.description,
					}))
					.sort((a, b) => a.key.localeCompare(b.key));

				setClientIdOptions(options);
			} catch (err) {
				console.warn(
					"[schufa-automation-config] Failed to load app installation:",
					err,
				);
			}

			setLoaded(true);
		})();
	}, []);

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

	return { config, updateConfig, clientIdOptions, loaded };
}
