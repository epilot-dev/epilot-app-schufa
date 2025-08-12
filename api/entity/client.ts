import { getClient } from "@epilot/entity-client";
import { Resource } from "sst";

const STAGES = ["dev", "staging", "prod"];

export const getEntityClient = (params: { token: string; org_id: string }) => {
	const client = getClient();

	const dev = !STAGES.includes(Resource.App.stage);
	const stage = dev
		? "dev"
		: Resource.App.stage.startsWith("prod")
			? ""
			: Resource.App.stage;
	const baseURL = ["https://entity", stage, "sls", "epilot.io"]
		.filter(Boolean)
		.join(".");

	client.defaults.headers.common.authorization = `Bearer ${params.token}`;
	client.defaults.baseURL = baseURL;
	client.defaults.headers.common["x-ivy-org-id"] = params.org_id;
	client.defaults.headers.common["x-epilot-org-id"] = params.org_id;

	return client;
};
