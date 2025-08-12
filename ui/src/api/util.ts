import type { AxiosInstance } from "axios";

interface AxiosClientOpts {
	baseURL?: string;
	token: string;
}

export const configureClient = <ClientType extends AxiosInstance>(
	client: ClientType,
	opts: AxiosClientOpts,
) => {
	// set API url
	if (opts.baseURL) {
		client.defaults.baseURL = opts.baseURL;
	}

	client.defaults.headers.common = {
		Authorization: `Bearer ${opts.token}`,
	};

	return client;
};
