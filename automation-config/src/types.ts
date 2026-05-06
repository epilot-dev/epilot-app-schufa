/**
 * Schufa automation action configuration stored as custom_action_config
 * in the epilot automation action.
 */
export interface SchufaActionConfig {
	/**
	 * Name of the app_options field whose value should be used as the Schufa
	 * client_id for this automation. When unset, the default `client_id` is used.
	 */
	client_id_key?: string;
}

export const DEFAULT_CONFIG: SchufaActionConfig = {};

export const CLIENT_ID_KEY_PREFIX = "client_id";

export interface ClientIdOption {
	key: string;
	label?: string;
	description?: string;
}
