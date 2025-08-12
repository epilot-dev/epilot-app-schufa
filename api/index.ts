import type { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { OpenAPIBackend, type Request } from "openapi-backend";
import { definition } from "./definition";
import * as schufaHandlers from "./schufa/handler";
import { handleErrors, replyJSON } from "./utils/lambda";

const api = new OpenAPIBackend({ definition, quick: true });

api.register({
	schufaCheck: schufaHandlers.schufaCheck,

	// default handlers
	notFound: () => replyJSON({ err: "not found" }, { statusCode: 404 }),
	validationFail: (c) =>
		replyJSON({ err: c.validation.errors }, { statusCode: 400 }),
	notImplemented: async (c, _event: APIGatewayProxyEventV2) => {
		const { status, mock } = c.api.mockResponseForOperation(
			c.operation.operationId as string,
		);

		return replyJSON(mock, { statusCode: status });
	},
});

export async function handler(event: APIGatewayProxyEventV2, context: Context) {
	await api.init();

	return await api
		.handleRequest(
			{
				method: event.requestContext.http.method,
				path: event.rawPath,
				query: event.rawQueryString,
				body: event.body,
				headers: event.headers as Request["headers"],
			},
			event,
			context,
		)
		.catch(handleErrors);
}
