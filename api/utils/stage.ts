import { Resource } from "sst";

const STAGES = ["dev", "staging", "prod"];

export const getEnvironment = () => {
	if (STAGES.includes(Resource.App.stage)) {
		return Resource.App.stage;
	}

	return undefined;
};
