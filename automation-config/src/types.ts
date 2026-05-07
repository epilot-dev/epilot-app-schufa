/**
 * Schufa automation action configuration stored as custom_action_config
 * in the epilot automation action.
 */
export interface SchufaActionConfig {
	/**
	 * Stable id of the `client_ids` entry to use for this automation. When
	 * unset and the install has a single entry, that entry is used.
	 */
	client_id_key?: string;
}

export const DEFAULT_CONFIG: SchufaActionConfig = {};

/**
 * Key of the option declared in the schufa app manifest that holds the
 * org-configured Schufa credentials. Must match the manifest exactly.
 */
export const CLIENT_IDS_OPTION_KEY = "client_ids";

/**
 * One credential the org configured at install time.
 */
export interface ClientIdEntry {
	/** Stable, server-assigned identifier — the action saves this as `client_id_key`. */
	id: string;
	/** Human-readable label, shown in the dropdown. */
	name?: string;
}
