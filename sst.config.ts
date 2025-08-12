/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "epilot-app-schufa",
			removal: input?.stage === "prod" ? "retain" : "remove",
			protect: ["prod"].includes(input?.stage),
			home: "aws",
		};
	},
	async run() {
		const stage = $app.stage.startsWith('prod') ? "" : $app.stage;

		const TEST_epilotPrivateKey = new sst.Secret("TestEpilotKey", 'private-key-placeholder');
		const TEST_schufaCert = new sst.Secret("TestSchufaCert", 'schufa-cert-placeholder');
		const PROD_epilotPrivateKey = new sst.Secret("ProdEpilotKey", 'prod-private-key-placeholder');
		const PROD_schufaCert = new sst.Secret("ProdSchufaCert", 'prod-schufa-cert-placeholder');
		
		const useCustomDomain = ['prod', 'staging', 'dev'].includes($app.stage);

		const wait = sst.aws.StepFunctions.wait({ 
            name: "WaitForAsyncProcess", 
            time: "2 minutes",	
			assign: {
				recordId: "{% $states.input.reportId %}",
				epilotToken: "{% $states.input.epilotToken %}",
				clientId: "{% $states.input.clientId %}",
				contact: "{% $states.input.contact %}"
			}
          });

		  const check_status_fn = new sst.aws.Function("CheckProcessingStatusLambda", {
			handler: "api/async-processing.handler",
			runtime: "nodejs22.x",
			architecture: "arm64",
			link: [TEST_schufaCert, TEST_epilotPrivateKey, PROD_epilotPrivateKey, PROD_schufaCert],
			timeout: "1 minute",
		  });
		  
          const check_status = sst.aws.StepFunctions.lambdaInvoke({ 
            name: 'CheckProcessingStatus', 
            function: check_status_fn,
			payload: {
				reportId: "{% $states.input.reportId %}",
				epilotToken: "{% $states.input.epilotToken %}",
				clientId: "{% $states.input.clientId %}",
				contact: "{% $states.input.contact %}"
			}
          });
          

		// 16 times 15 minutes = 4 hours i.e. if after 4 hours no manual processing was done then we assume that the process failed and we return an error
		 wait.next(check_status.retry({
			interval: "15 minutes",
			maxAttempts: 16,
			backoffRate: 1, // no exponential backoff
			errors: ['StillProcessingError']
		 }))
		  
		  
		const sfn = new sst.aws.StepFunctions("AsyncStateMachine", { definition: wait });

		const api = new sst.aws.ApiGatewayV2("SchufaApi", {
			domain: useCustomDomain ? ['schufa-app', 'sls', stage, 'epilot.io'].filter(Boolean).join('.') : undefined, 
			link: [TEST_schufaCert, TEST_epilotPrivateKey, PROD_epilotPrivateKey, PROD_schufaCert, sfn],
			cors: {
				allowOrigins: ["*"], // we only do server-to-server communication
				allowHeaders: ["Content-Type", "Authorization"],
				allowMethods: ["POST"],
			},
		});

		api.route(`POST /api/v1/schufa/check`, {
			handler: "api/index.handler",
			runtime: "nodejs22.x",
			architecture: "arm64",
			permissions: [
				{
					actions: ["states:StartExecution"],
					resources: [sfn.arn],
				},
			]
		});
	},
});
