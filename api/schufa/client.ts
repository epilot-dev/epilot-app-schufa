import OpenAPIClientAxios from "openapi-client-axios";
import { useSchufaConfig } from "../config";
import { schufa_oas } from "./definition";
import type { Client } from "./schufa";

let client: Client;

export const getSchufaClient = () => {
	if (!client) {
		client = createClient();
	}

	return client;
};

export const createClient = () => {
	const schufa_api = new OpenAPIClientAxios({
		definition: schufa_oas,
	});

	const apiClient = schufa_api.initSync<Client>();

	const config = useSchufaConfig();

	apiClient.defaults.baseURL = config.baseEnergyUrl;

	apiClient.defaults.headers.common = {
		...(apiClient.defaults.headers.common ?? {}),
	};

	return apiClient;
};
