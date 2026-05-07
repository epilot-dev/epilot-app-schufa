import type {
  Context,
  UnknownParams,
} from 'openapi-backend';

declare namespace Components {
    namespace RequestBodies {
        export interface SchufaCheckRequest {
            /**
             * The timestamp of the action
             * example:
             * 2023-10-01T12:00:00Z
             */
            timestamp?: string;
            /**
             * The data to be forwarded to the zapier trigger
             */
            data: {
                /**
                 * The id of the epilot organization
                 * example:
                 * 123
                 */
                org_id: string;
                app_options: {
                    [name: string]: any;
                    /**
                     * Whether the schufa app is in test mode. The test mode uses a random score and description.
                     */
                    enable_test_mode?: boolean;
                    /**
                     * Legacy default client id. Still accepted as a fallback for orgs that
                     * installed the app before the multi-client_id rollout.
                     *
                     * example:
                     * client_123
                     */
                    client_id?: string;
                    /**
                     * List of named Schufa client_id credentials configured by the org. The automation
                     * picks one entry by `client_id_key` (the entry's stable id). Each entry's
                     * `client_id` value is encrypted at rest by app-api and arrives decrypted here.
                     *
                     */
                    client_ids?: {
                        /**
                         * Stable, server-assigned identifier for this entry.
                         * example:
                         * 01HZ...
                         */
                        id: string;
                        /**
                         * Human-readable label for the entry.
                         * example:
                         * Werk35
                         */
                        name?: string;
                        /**
                         * The Schufa client id for this entry.
                         * example:
                         * abc123
                         */
                        client_id: string;
                    }[];
                    /**
                     * Id of the `client_ids` entry to use for this automation. When unset and
                     * a single `client_ids` entry exists, that entry is used; otherwise the
                     * legacy `client_id` is used as a last resort.
                     *
                     * example:
                     * 01HZ...
                     */
                    client_id_key?: string;
                };
                entity: {
                    [name: string]: any;
                };
            };
        }
    }
    namespace Schemas {
        export interface SchufaReport {
            [name: string]: any;
            /**
             * If this is present the action was skipped and the reason is given
             * example:
             * User consent not given
             */
            skip_reason?: string;
            /**
             * If this is present the action failed and the error message is given
             */
            error_output?: {
                /**
                 * The reason for the error
                 * example:
                 * Invalid client id
                 */
                error_reason?: string;
            };
        }
    }
}
declare namespace Paths {
    namespace SchufaCheck {
        export type RequestBody = Components.RequestBodies.SchufaCheckRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SchufaReport;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
}


export interface Operations {
  /**
   * POST /api/v1/schufa/check
   */
  ['schufaCheck']: {
    requestBody: Paths.SchufaCheck.RequestBody;
    params: UnknownParams;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<Paths.SchufaCheck.RequestBody, UnknownParams, UnknownParams, UnknownParams, UnknownParams>;
    response: Paths.SchufaCheck.Responses.$200 | Paths.SchufaCheck.Responses.$400 | Paths.SchufaCheck.Responses.$401 | Paths.SchufaCheck.Responses.$403 | Paths.SchufaCheck.Responses.$404 | Paths.SchufaCheck.Responses.$500;
  }
}

export type OperationContext<operationId extends keyof Operations> = Operations[operationId]["context"];
export type OperationResponse<operationId extends keyof Operations> = Operations[operationId]["response"];
export type HandlerResponse<ResponseBody, ResponseModel = Record<string, any>> = ResponseModel & { _t?: ResponseBody };
export type OperationHandlerResponse<operationId extends keyof Operations> = HandlerResponse<OperationResponse<operationId>>;
export type OperationHandler<operationId extends keyof Operations, HandlerArgs extends unknown[] = unknown[]> = (...params: [OperationContext<operationId>, ...HandlerArgs]) => Promise<OperationHandlerResponse<operationId>>;


export type SchufaReport = Components.Schemas.SchufaReport;
