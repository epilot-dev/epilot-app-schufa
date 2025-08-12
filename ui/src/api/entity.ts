import { getClient } from "@epilot/entity-client";

import { configureClient } from "./util";

export const getEntityClient = (token: string) => {
	const client = getClient();

	return configureClient(client, {
		baseURL: "https://entity.sls.epilot.io",
		token,
	});
};

export const getEntity = async (params: {
	slug: string;
	id: string;
	token: string;
}) => {
	const client = getEntityClient(params.token);

	const entity = await client
		.getEntity({ id: params.id, slug: params.slug, hydrate: false })
		.then((res) => res.data);

	if (!entity) {
		throw new Error("Entity not found");
	}

	return entity;
};
