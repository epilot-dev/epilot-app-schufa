type Code =
	| "INVALID_AUTH_TOKEN"
	| "INVALID_CERT"
	| "SCHUFA_AUTH_ERROR"
	| "NO_TEST_USER"
	| "DATA_MAPPING_ERROR"
	| "ENTITY_UPDATE_ERROR"
	| "SCHUFA_DATA_ERROR";

export class VisibleError extends Error {
	constructor(
		message: string,
		public readonly code: Code,
		public readonly statusCode: number,
		// biome-ignore lint/suspicious/noExplicitAny: details can be any
		public readonly details?: Record<string, any>,
	) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class StillProcessingError extends Error {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}
