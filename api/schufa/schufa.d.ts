/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface Amount {
            /**
             * example:
             * 6500
             */
            amount?: number; // int32
            /**
             * example:
             * EUR
             */
            currency: string;
        }
        /**
         * Balance from due/overdue or titled debt
         */
        export interface Balance {
            amount: Amount;
            date: string; // date
        }
        /**
         * Claims assigned to the contract
         */
        export interface Claim {
            /**
             * True if court judgement/section title otherwise false
             */
            adjudication: boolean;
            currentAmount?: Amount;
            initialAmount?: Amount;
            balances: /* Balance from due/overdue or titled debt */ Balance[];
            /**
             * "Values:
             * * `OPEN` - Claim was opened
             * * `HANDOVER_TO_COLLECTION` - Transfer of distressed claim to collection agency/internal collection department for collection purposes (Legacy attribute: UI)
             * * `IRRECOVERABLE_CLAIM_WITH_TITLE` - Irrecoverable overdue claim / collection uneconomic (with title) (Legacy attribute: UF)
             * * `IRRECOVERABLE_CLAIM_WITHOUT_TITLE` - Irrecoverable overdue claim / collection uneconomic (without title) (Legacy attribute: US)
             * * `RETURN_OF_CLAIM_TO_CREDITOR_BY_COLLECTION` - Return of claim to creditor by collection agency/internal collection department (Legacy attribute: RI)
             * * `PERSON_OBJECTS_CLAIM_TOWARDS_CONTRACT_PARTNER` - Person concerned objects directly towards contract partner about claim reported (Legacy attribute: WS)
             * * `PERSON_OBJECTS_CLAIM_TOWARDS_SCHUFA` - Person concerned objects towards SCHUFA about claim reported (Legacy attribute: WV)
             * * `BALANCE_SOLD` - Balance sold under assignment of claim (Legacy attribute: SZ)
             * * `BALANCE_COMPARISON` - Balance comparison to avert insolvency in the case of due/overdue or titled claims (Legacy attribute: SV)
             * * `SETTLED` - Indicates that the claim is settled. (Legacy attribute: ER)
             *
             */
            status: string;
        }
        /**
         * Enquire about the customer
         */
        export interface Contract {
            /**
             * Indicates that the contract was reported to SCHUFA with the person's date of birth.
             */
            withDateOfBirth: boolean;
            /**
             * Values:
             * * `UNSECURED_LOAN` - Unsecured building society loan or instalment loan not secured by charge on real estate (Legacy attribute: KR)
             * * `SURETY_FOR_LOAN_UNSECURED` - Surety for unsecured building society loan, loan not secured by charge on real estate or leasing/hire purchase (Legacy attribute: BU)
             * * `CO_APPLICANT_UNSECURED_LOAN` - Co-applicant for unsecured building society loans or instalment loans not secured by charge on real estate(Legacy attribute: MA)
             * * `SURETY_FOR_LOAN_SECURED` - Surety for loan secured by a charge on real estate (Legacy attribute: BP)
             * * `LEASING` - Leasing/hire purchase (Legacy attribute: ML)
             * * `UNSECURED_LOAN_BULLET_MATURITY` - Unsecured building society loan or loan with bullet maturity not secured by a charge on real estate (Legacy attribute: KX)
             * * `SURETY_FOR_LOAN_WITH_FINAL_MATURITY` - Surety for unsecured building society loan or loan with bullet maturity not secured by charge on real estate (Legacy attribute: BX)
             * * `CO_APPLICANT_LOAN_BULLET_MATURITY` - Co-applicant for loans, unsecured building society loans or loans with bullet maturity not secured by a charge on real estate (Legacy attribute: MX)
             * * `FORWARD_LOAN` - Forward loan (Legacy attribute: HF)
             * * `CURRENT_ACCOUNT` - Current account (Legacy attribute: GI)
             * * `BUILDING_SOCIETY_LOAN_SECURED` - Building-society loan secured by declaration of commitment (Legacy attribute: HN)
             * * `CO_APPLICANT_SECURED_LOAN` - Co-applicant for loans secured by a charge on real estate for real estate financing (Legacy attribute: MY)
             * * `SECURED_LOAN` - Loan secured by a charge on real estate (Legacy attribute: HP)
             * * `PERMANENT_ACCOUNT` - Permanent account (credit-based) (Legacy attribute: DC)
             * * `SECURED_LOAN_NO_AMOUNT` - Loan secured by a charge on real estate (without amount) (Legacy attribute: HY)
             * * `SURETY_FOR_LOAN_NO_AMOUNT` - Surety for loan secured by a charge on real estate (without amount) (Legacy attribute: BY)
             * * `CREDIT_CARD` - Credit card or credit card account (Legacy attribute: CC)
             * * `CREDIT_CARD_REVOLVING` - Credit card or credit card account with revolving limit (Legacy attribute: CR)
             * * `LIQUIDATION_ACCOUNT` - Account in liquidation (Legacy attribute: KW)
             * * `CREDIT_LINES_FREELANCERS` - Working capital credit lines for freelancers (Legacy attribute: K1)
             * * `CREDIT_LINES_SMALL_BUSINESSES` - Working capital credit lines for self-employed/small business owners (Legacy attribute: K2)
             * * `INVESTMENT_LOAN_FREELANCERS` - Capital investment loans for freelancers (Legacy attribute: K3)
             * * `INVESTMENT_LOAN_SMALL_BUSINESSES` - Capital investment loans for self-employed/small business owners (Legacy attribute: K4)
             * * `ACCOUNT_FREELANCERS` - Account for freelancers (Legacy attribute: K5)
             * * `ACCOUNT_SMALL_BUSINESSES` - Account for self-employed/small business owners (Legacy attribute: K6)
             * * `ABSOLUTE_GUARANTEE` - Absolute guarantee for businesses (Legacy attribute: K7)
             * * `LEASING_FREELANCERS` - Leasing/hire purchase for business purposes (for freelancers) (Legacy attribute: M3)
             * * `LEASING_SMALL_BUSINESSES` - Leasing/hire purchase for business purposes (for self-employed and small business owners) (Legacy attribute: M4)
             * * `SECURED_INVESTMENT_CREDITS_FREELANCERS` - Investment credit secured by a land charge for business purposes (for freelancers) (Legacy attribute: M7)
             * * `SECURED_INVESTMENT_CREDITS_SMALL_BUSINESSES` - Investment credit secured by a land charge for business purposes (for self-employed and small business owners) (Legacy attribute: M8)
             * * `MASKED` - Anonymized / masked contract attribute (Legacy attribute: XX)
             *
             */
            attributeName: string;
            date?: string; // date
            /**
             * referencenumber for the identification of own attributes - formerly: Kontonummer
             * example:
             * AZ14YXII-20
             */
            reference?: string;
            amount?: Amount;
            rates?: /* Defines the number and type of credit rates. */ Rates;
            /**
             * Indicates that the contract has ended. (Legacy attribute: ER)
             */
            settled: boolean;
            claim?: /* Claims assigned to the contract */ Claim;
        }
        /**
         * Court Data of the customer
         */
        export interface CourtData {
            /**
             * Indicates that the contract was reported to SCHUFA with the person's date of birth.
             */
            withDateOfBirth: boolean;
            /**
             * Values:
             * * `NO_SUBMISSION_OF_ASSETS_REPORT` - Claimant has not fulfilled his obligation to submit a declaration of assets (Legacy attribute: S1)
             * * `ASSETS_UNSUITABLE_FOR_COLLECTION` - Satisfaction of creditors excluded according to the content of the list of assets (Legacy attribute: S2)
             * * `DEBTOR_HAS_NOT_DEMONSTRATED_CREDIT_SATISFACTION` - Creditor satisfaction not proven within one month after submission of the statement of assets (Legacy attribute: S3)
             * * `INSOLVENCY_REFUSED` - Insolvency proceedings rejected (Legacy attribute: IA)
             * * `INSOLVENCY_INITIATED` - Insolvency proceedings initiated (Legacy attribute: IE)
             * * `DISCHARGE_OF_RESIDUAL_DEBT_ANNOUNCEMENT` - Discharge of residual debt announced (Legacy attribute: RA)
             * * `DISCHARGE_OF_RESIDUAL_DEBT_DENIAL` - Discharge of residual debt denied (Legacy attribute: RV)
             * * `DISCHARGE_OF_RESIDUAL_DEBT_GRANTED` - Discharge of residual debt granted (Legacy attribute: RB)
             * * `INSOLVENCY_CANCELLED` - Insolvency proceedings terminated (Legacy attribute: IS)
             *
             */
            attributeName: string;
            /**
             * Date of the event
             */
            date: string; // date
            /**
             * referencenumber for the identification of own attributes - formerly: Kontonummer
             * example:
             * AZ14YXII-20
             */
            reference: string;
        }
        export interface CreditRatingInformation {
            /**
             * The reportId is a unique identification number for the order.
             * example:
             * 1234567890
             */
            reportId: string;
            personData?: PersonDataResponse;
            courtData: /* Court Data of the customer */ CourtData[];
            contracts: /* Enquire about the customer */ Contract[];
            enquiries: /* Enquire about the customer */ Enquire[];
            notes: /* Note about the customer */ Note[];
            /**
             *
             * Array of extensible-enum.
             * Values:
             * * `NO_DATE_OF_BIRTH` - Indicates that the person provided does not have a date of birth in the database, which gives the identification a certain degree of uncertainty.
             * * `DIFFERENT_PERSON_DATA` - Indicates whether the identity of the person is potentially questionable because the person data from the request does not exactly match the data in the database.
             * * `DIFFERENT_ADDRESS_DATA` - Indicates that the address data of the person's main address differs between the request and the database.
             *
             */
            identificationReservations: string[];
            score?: Score;
        }
        export interface CreditRatingRequest {
            personData: /* Data to identify a person */ PersonData;
            /**
             * reference for the identification of own attributes (Formerly: Kontonummer)
             * example:
             * ABC-123-DEF
             */
            reference?: string; // [A-Za-z\dßÄÖÜäöü:/()',.\-\s]{1,25}
        }
        export interface CurrentAddress {
            /**
             * example:
             * MAXIMILIANSTRAße 20B
             */
            streetWithNumber: string; // [A-Za-z\dßÄÖÜäöüĄąŁłĽľŚśŠšŞşŤťŹźŽžŻżŔŕÁáÂâĂăĹĺĆćÇçČčÉéĘęËëĚěÍíÎîĎďƉđŃńŇňÓóÔôŐőŘřŮůÚúŰűÝýŢţÃÅÆÈÊÌÏÐÑÒÕØÙÛÞÀàãåæèêìïðñòõøùûþÿŒœŸƒ:/()',.\-\s]{1,46}
            /**
             * example:
             * 80539
             */
            postalCode: string; // [A-Za-z\d\-\s]{1,10}
            /**
             * example:
             * MÜNCHEN
             */
            city: string; // [A-Za-z\dßÄÖÜäöüĄąŁłĽľŚśŠšŞşŤťŹźŽžŻżŔŕÁáÂâĂăĹĺĆćÇçČčÉéĘęËëĚěÍíÎîĎďƉđŃńŇňÓóÔôŐőŘřŮůÚúŰűÝýŢţÃÅÆÈÊÌÏÐÑÒÕØÙÛÞÀàãåæèêìïðñòõøùûþÿŒœŸƒ:/()',.\-\s]{1,44}
            /**
             * example:
             * DEU
             */
            country?: string; // [A-Z]{3}
        }
        export interface DeceasedInformation {
            /**
             * example:
             * true
             */
            deceased: boolean;
            /**
             * example:
             * 2015-01-15
             */
            dateOfDeath?: string; // date
            /**
             * example:
             * SATGAB2015-007
             */
            deathCertificateId?: string;
        }
        /**
         * Enquire about the customer
         */
        export interface Enquire {
            /**
             * Indicates that the contract was reported to SCHUFA with the person's date of birth.
             */
            withDateOfBirth: boolean;
            /**
             * Values:
             * * `ENQUIRY_UNSECURED_LOANS` - Enquiry concerning unsecured building loans or loans not secured by a charge on real estate (Legacy attribute: AK)
             * * `ENQUIRY_SECURED_LOANS` - Enquiry concerning loans secured by charge on real estate (Legacy attribute: AW)
             * * `ENQUIRY_LEASING` - Enquiry concerning leasing/hire purchase (Legacy attribute: AL)
             * * `ENQUIRY_PAYMENT_METHODS` - Enquiry concerning the offer of payment methods (Legacy attribute: ZV)
             * * `ENQUIRY_COMMERCE` - Commercial enquiry concerning delivery of goods or services (Legacy attribute: AH)
             * * `ENQUIRY_MAIL_ORDERS` - Enquiry of catalog companies concerning the delivery of goods and services (Legacy attribute: AV)
             * * `ENQUIRY_SERVICES` - Enquiry concerning services (Legacy attribute: AD)
             * * `ENQUIRY_COLLECTION` - Enquiry concerning collection if the preconditions of §31, section 2 BDSG for reporting the claim are fulfilled (Legacy attribute: AI)
             * * `ENQUIRY_SERVICES_FINANCIAL` - Enquiry concerning financial services (Legacy attribute: AF)
             * * `ENQUIRY_CONDITIONS_REAL_ESTATE_LOANS` - Enquiry concerning terms of real estate loans (Legacy attribute: KH)
             * * `ENQUIRY_CONDITIONS_LOANS` - Enquiry concerning terms of loans (Legacy attribute: KK)
             * * `ENQUIRY_FREELANCERS` - Enquiry concerning freelancers (Legacy attribute: A5)
             * * `ENQUIRY_SMALL_BUSINESSES` - Enquiry concerning self-employed/small business owners (Legacy attribute: A6)
             * * `ENQUIRY_SECURED_INVESTMENT_CREDITS_FREELANCERS` - Enquiry concerning investment credits secured by a land charge for business purposes (for freelancers) (Legacy attribute: B7)
             * * `ENQUIRY_SECURED_INVESTMENT_CREDITS_SMALL_BUSINESSES` - Enquiry concerning investment credits secured by a land charge for business purposes (for self-employed and small business owners) (Legacy attribute: B8)
             * * `ENQUIRY_GAMBLING` - Enquiry concerning gambling (Legacy attribute: AO)
             *
             */
            attributeName: string;
            date: string; // date
            /**
             * referencenumber for the identification of own attributes - formerly: Kontonummer
             * example:
             * AZ14YXII-20
             */
            reference?: string;
        }
        export interface EnquiryInProcessing {
            message: string;
            /**
             * The reportId is a unique identification number for the order.
             * example:
             * 08154711
             */
            reportId: string;
            /**
             * URL that can be used to retrieve the result of manual processing.
             * example:
             * https://api.hub.schufa.de/credit-report/manual-processing/08154711
             */
            href: string;
        }
        /**
         * Note about the customer
         */
        export interface Note {
            /**
             * Indicates that the contract was reported to SCHUFA with the person's date of birth.
             */
            withDateOfBirth: boolean;
            /**
             * Values:
             * * `NOTE` - The note is a freely formulated comment (Legacy attribute: H3)
             * * `SELF_REPRESENTATION` - The self-representation of a consumer refers to the registered data on this consumer. It includes the consumer's counterstatement within the meaning of the BDSG. (Legacy attribute: H5)
             * * `SECONDARY_RESIDENCE` - Postal code/city/street + house number of second residence (Legacy attribute: 2W)
             *
             */
            attributeName: string;
            /**
             * example:
             * 70372/STUTTGART/EMSER STR. 11
             */
            text: string;
        }
        export interface OpenApiProblemDetail {
            /**
             * example:
             * about:blank
             */
            type?: string; // uri
            /**
             * example:
             * 400
             */
            status?: number; // int32
            title?: string;
            detail?: string;
            instance?: string;
            requestId?: string; // uri
            violations?: Violation[];
        }
        /**
         * Data to identify a person
         */
        export interface PersonData {
            /**
             * example:
             * Peter
             */
            firstName: string; // [A-Za-z\dßÄÖÜäöüĄąŁłĽľŚśŠšŞşŤťŹźŽžŻżŔŕÁáÂâĂăĹĺĆćÇçČčÉéĘęËëĚěÍíÎîĎďƉđŃńŇňÓóÔôŐőŘřŮůÚúŰűÝýŢţÃÅÆÈÊÌÏÐÑÒÕØÙÛÞÀàãåæèêìïðñòõøùûþÿŒœŸƒ:/()',.\-\s]{1,44}
            /**
             * example:
             * Maier
             */
            lastName: string; // [A-Za-z\dßÄÖÜäöüĄąŁłĽľŚśŠšŞşŤťŹźŽžŻżŔŕÁáÂâĂăĹĺĆćÇçČčÉéĘęËëĚěÍíÎîĎďƉđŃńŇňÓóÔôŐőŘřŮůÚúŰűÝýŢţÃÅÆÈÊÌÏÐÑÒÕØÙÛÞÀàãåæèêìïðñòõøùûþÿŒœŸƒ:/()',.\-\s]{1,46}
            /**
             * example:
             * MALE
             */
            gender: string;
            /**
             * example:
             * 1973-01-15
             */
            dateOfBirth?: string; // date
            /**
             * example:
             * Dr.
             */
            title?: string; // [A-Za-z\dßÄÖÜäöüĄąŁłĽľŚśŠšŞşŤťŹźŽžŻżŔŕÁáÂâĂăĹĺĆćÇçČčÉéĘęËëĚěÍíÎîĎďƉđŃńŇňÓóÔôŐőŘřŮůÚúŰűÝýŢţÃÅÆÈÊÌÏÐÑÒÕØÙÛÞÀàãåæèêìïðñòõøùûþÿŒœŸƒ:/()',.\-\s]{0,30}
            /**
             * example:
             * Wiesbaden
             */
            placeOfBirth?: string; // [A-Za-z\dßÄÖÜäöüĄąŁłĽľŚśŠšŞşŤťŹźŽžŻżŔŕÁáÂâĂăĹĺĆćÇçČčÉéĘęËëĚěÍíÎîĎďƉđŃńŇňÓóÔôŐőŘřŮůÚúŰűÝýŢţÃÅÆÈÊÌÏÐÑÒÕØÙÛÞÀàãåæèêìïðñòõøùûþÿŒœŸƒ:/()',.\-\s]{0,24}
            addresses: /* Current and previous addresses of a person. */ PersonDataAddresses;
        }
        /**
         * Current and previous addresses of a person.
         */
        export interface PersonDataAddresses {
            currentAddress: CurrentAddress;
            previousAddress?: PreviousAddress;
        }
        export interface PersonDataResponse {
            /**
             * example:
             * PETER
             */
            firstName: string;
            /**
             * example:
             * MAIER
             */
            lastName: string;
            /**
             * example:
             * MALE
             */
            gender: string;
            /**
             * Only filled if the date of birth is known. Omit field if unknown.
             * example:
             * 1973-01-15
             */
            dateOfBirth?: string; // date
            deceasedInformation: DeceasedInformation;
            /**
             * example:
             * Dr.
             */
            title?: string;
            /**
             * example:
             * WIESBADEN
             */
            placeOfBirth?: string;
            addresses: /* Current and previous addresses of a person. */ PersonDataAddresses;
            /**
             * example:
             * EHB9SU3EZ1
             */
            schufaId?: string;
        }
        export interface PreviousAddress {
            /**
             * example:
             * SCHILLERSTRAßE 96
             */
            streetWithNumber: string; // [A-Za-z\dßÄÖÜäöüĄąŁłĽľŚśŠšŞşŤťŹźŽžŻżŔŕÁáÂâĂăĹĺĆćÇçČčÉéĘęËëĚěÍíÎîĎďƉđŃńŇňÓóÔôŐőŘřŮůÚúŰűÝýŢţÃÅÆÈÊÌÏÐÑÒÕØÙÛÞÀàãåæèêìïðñòõøùûþÿŒœŸƒ:/()',.\-\s]{1,46}
            /**
             * example:
             * 10625
             */
            postalCode: string; // [A-Za-z\d\-\s]{1,10}
            /**
             * example:
             * BERLIN
             */
            city: string; // [A-Za-z\dßÄÖÜäöüĄąŁłĽľŚśŠšŞşŤťŹźŽžŻżŔŕÁáÂâĂăĹĺĆćÇçČčÉéĘęËëĚěÍíÎîĎďƉđŃńŇňÓóÔôŐőŘřŮůÚúŰűÝýŢţÃÅÆÈÊÌÏÐÑÒÕØÙÛÞÀàãåæèêìïðñòõøùûþÿŒœŸƒ:/()',.\-\s]{1,44}
            /**
             * example:
             * DEU
             */
            country?: string; // [A-Z]{3}
        }
        /**
         * Defines the number and type of credit rates.
         */
        export interface Rates {
            /**
             * example:
             * MONTHLY
             */
            type?: string;
            /**
             * Number of rates (1-999)
             * example:
             * 12
             */
            number?: number; // int32
        }
        export interface Score {
            /**
             * A descriptive text about which scoring data is involved in this element.
             * example:
             * Score
             */
            description?: string;
            status?: string;
            details?: ScoreDetails;
        }
        export interface ScoreDetails {
            /**
             * The score value is provided in this element.
             * example:
             * 1179
             */
            value?: number; // int32
            /**
             * The risk rate describes the risk of a payment default.
             * example:
             * 77.75
             */
            riskRate?: number; // double
            /**
             * Here an individual indication of the area to which the score value is assigned can be found, if applicable.
             * example:
             * F
             */
            range?: string;
            /**
             * A score text can supplement and substantiate the other score information.
             * example:
             * RATINGSTUFE F
             */
            text?: string;
            infoText?: any[];
        }
        export interface Violation {
            field: string;
            message: string;
        }
    }
}
declare namespace Paths {
    namespace Checks {
        export type RequestBody = Components.Schemas.CreditRatingRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreditRatingInformation;
            export type $202 = Components.Schemas.EnquiryInProcessing;
            /**
             * ProblemDetail
             */
            export type $400 = Components.Schemas.OpenApiProblemDetail;
            export type $401 = Components.Schemas.OpenApiProblemDetail;
            export type $403 = Components.Schemas.OpenApiProblemDetail;
            export type $404 = Components.Schemas.OpenApiProblemDetail;
            export type $422 = Components.Schemas.OpenApiProblemDetail;
            export type $500 = Components.Schemas.OpenApiProblemDetail;
        }
    }
    namespace Energy {
        export type RequestBody = Components.Schemas.CreditRatingRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreditRatingInformation;
            export type $202 = Components.Schemas.EnquiryInProcessing;
            /**
             * ProblemDetail
             */
            export type $400 = Components.Schemas.OpenApiProblemDetail;
            export type $401 = Components.Schemas.OpenApiProblemDetail;
            export type $403 = Components.Schemas.OpenApiProblemDetail;
            export type $404 = Components.Schemas.OpenApiProblemDetail;
            export type $422 = Components.Schemas.OpenApiProblemDetail;
            export type $500 = Components.Schemas.OpenApiProblemDetail;
        }
    }
    namespace GetManualProcessing {
        namespace Parameters {
            export type ReportId = string;
        }
        export interface PathParameters {
            reportId: Parameters.ReportId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CreditRatingInformation;
            export type $202 = Components.Schemas.EnquiryInProcessing;
            /**
             * ProblemDetail
             */
            export type $400 = Components.Schemas.OpenApiProblemDetail;
            export type $401 = Components.Schemas.OpenApiProblemDetail;
            export type $403 = Components.Schemas.OpenApiProblemDetail;
            export type $404 = Components.Schemas.OpenApiProblemDetail;
            export type $422 = Components.Schemas.OpenApiProblemDetail;
            export type $500 = Components.Schemas.OpenApiProblemDetail;
        }
    }
}


export interface OperationMethods {
  /**
   * checks - Request to control own inquiries and messages about an ongoing business relationship.
   * 
   * Enquiry for control purposes of a private customer with whom a contractual relationship already exists. This is an inquiry about existing contractual relationships or contractual relationships that are being processed, e.g. to check your own inquiries and reports or undisputed claims which have not (yet) fulfilled the preconditions of §31, section 2 BDSG (Legacy enquiry attribute: AU). The legitimate interest is justified by the conclusion of a contract between the consumer and the contract partner.
   */
  'checks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Checks.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Checks.Responses.$200 | Paths.Checks.Responses.$202>
  /**
   * energy - Enquiry concerning energy contract or energy-related service
   * 
   * Request for a credit report based on the conclusion of an energy contract or energy-related service with the consumer (Legacy enquiry attribute: AE). The legitimate interest is justified by the conclusion of an energy contract between the consumer and the contract partner.
   */
  'energy'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Energy.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Energy.Responses.$200 | Paths.Energy.Responses.$202>
  /**
   * getManualProcessing - Retrieve the result of a manual processing.
   * 
   * The provided reportId is checked to see whether the result of the manual processing is available. The response contains either the result of the processing or the information that it has not yet been completed.
   */
  'getManualProcessing'(
    parameters?: Parameters<Paths.GetManualProcessing.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetManualProcessing.Responses.$200 | Paths.GetManualProcessing.Responses.$202>
}

export interface PathsDictionary {
  ['/checks']: {
    /**
     * checks - Request to control own inquiries and messages about an ongoing business relationship.
     * 
     * Enquiry for control purposes of a private customer with whom a contractual relationship already exists. This is an inquiry about existing contractual relationships or contractual relationships that are being processed, e.g. to check your own inquiries and reports or undisputed claims which have not (yet) fulfilled the preconditions of §31, section 2 BDSG (Legacy enquiry attribute: AU). The legitimate interest is justified by the conclusion of a contract between the consumer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Checks.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Checks.Responses.$200 | Paths.Checks.Responses.$202>
  }
  ['/energy']: {
    /**
     * energy - Enquiry concerning energy contract or energy-related service
     * 
     * Request for a credit report based on the conclusion of an energy contract or energy-related service with the consumer (Legacy enquiry attribute: AE). The legitimate interest is justified by the conclusion of an energy contract between the consumer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Energy.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Energy.Responses.$200 | Paths.Energy.Responses.$202>
  }
  ['/manual-processing/{reportId}']: {
    /**
     * getManualProcessing - Retrieve the result of a manual processing.
     * 
     * The provided reportId is checked to see whether the result of the manual processing is available. The response contains either the result of the processing or the information that it has not yet been completed.
     */
    'get'(
      parameters?: Parameters<Paths.GetManualProcessing.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetManualProcessing.Responses.$200 | Paths.GetManualProcessing.Responses.$202>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Amount = Components.Schemas.Amount;
export type Balance = Components.Schemas.Balance;
export type Claim = Components.Schemas.Claim;
export type Contract = Components.Schemas.Contract;
export type CourtData = Components.Schemas.CourtData;
export type CreditRatingInformation = Components.Schemas.CreditRatingInformation;
export type CreditRatingRequest = Components.Schemas.CreditRatingRequest;
export type CurrentAddress = Components.Schemas.CurrentAddress;
export type DeceasedInformation = Components.Schemas.DeceasedInformation;
export type Enquire = Components.Schemas.Enquire;
export type EnquiryInProcessing = Components.Schemas.EnquiryInProcessing;
export type Note = Components.Schemas.Note;
export type OpenApiProblemDetail = Components.Schemas.OpenApiProblemDetail;
export type PersonData = Components.Schemas.PersonData;
export type PersonDataAddresses = Components.Schemas.PersonDataAddresses;
export type PersonDataResponse = Components.Schemas.PersonDataResponse;
export type PreviousAddress = Components.Schemas.PreviousAddress;
export type Rates = Components.Schemas.Rates;
export type Score = Components.Schemas.Score;
export type ScoreDetails = Components.Schemas.ScoreDetails;
export type Violation = Components.Schemas.Violation;
