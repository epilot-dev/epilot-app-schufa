import { Resource } from "sst";

export const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL as string;
export const APPS_REQUESTS_SLACK_WEBHOOK_CHANNEL = process.env
	.APPS_REQUESTS_SLACK_WEBHOOK_CHANNEL as string;

export const useSchufaConfig = () => {
	if (Resource.App.stage.startsWith("prod")) {
		return {
			tokenUrl: "https://auth.api.schufa.de/token",
			baseEnergyUrl: "https://api.schufa.de/credit-report",
			secret: {
				cert: Buffer.from(Resource.ProdSchufaCert.value, "base64").toString(
					"utf8",
				),
				key: Buffer.from(Resource.ProdEpilotKey.value, "base64").toString(
					"utf8",
				),
			},
		};
	}

	return {
		tokenUrl: "https://auth.api.sandbox.schufa.de/token",
		baseEnergyUrl: "https://api.sandbox.schufa.de/credit-report",
		secret: {
			cert: Buffer.from(Resource.TestSchufaCert.value, "base64").toString(
				"utf8",
			),
			key: Buffer.from(Resource.TestEpilotKey.value, "base64").toString("utf8"),
		},
	};
};
