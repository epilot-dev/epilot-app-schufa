/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace RequestBodies {
        export type CreditRatingRequestBody = /**
         * Enquiry data for the credit rating.
         * example:
         * {
         *   "personData": {
         *     "firstName": "Peter",
         *     "lastName": "Maier",
         *     "gender": "MALE",
         *     "dateOfBirth": "1973-01-15",
         *     "title": "Dr.",
         *     "placeOfBirth": "Wiesbaden",
         *     "addresses": {
         *       "currentAddress": {
         *         "streetWithNumber": "MAXIMILIANSTRAße 20B",
         *         "postalCode": "80539",
         *         "city": "MÜNCHEN",
         *         "country": "DEU"
         *       },
         *       "previousAddress": {
         *         "streetWithNumber": "SCHILLERSTRAßE 96",
         *         "postalCode": "10625",
         *         "city": "BERLIN",
         *         "country": "DEU"
         *       }
         *     }
         *   },
         *   "reference": "ABC-123-DEF"
         * }
         */
        Schemas.CreditRatingRequest;
    }
    namespace Responses {
        export type $200CreditReport = /**
         * This element describes a credit report.
         * example:
         * {
         *   "reportId": "1234567890",
         *   "personData": {
         *     "firstName": "PETER",
         *     "lastName": "MAIER",
         *     "gender": "MALE",
         *     "dateOfBirth": "1973-01-15",
         *     "deceasedInformation": {
         *       "deceased": true,
         *       "dateOfDeath": "2015-01-15",
         *       "deathCertificateId": "SATGAB2015-007"
         *     },
         *     "title": "Dr.",
         *     "placeOfBirth": "WIESBADEN",
         *     "addresses": {
         *       "currentAddress": {
         *         "streetWithNumber": "MAXIMILIANSTRAße 20B",
         *         "postalCode": "10625",
         *         "city": "BERLIN",
         *         "country": "DEU"
         *       },
         *       "previousAddress": {
         *         "streetWithNumber": "SCHILLERSTRAßE 96",
         *         "postalCode": "80539",
         *         "city": "MÜNCHEN",
         *         "country": "DEU"
         *       },
         *       "secondaryAddresses": [
         *         {
         *           "streetWithNumber": "EMSER STR. 11",
         *           "postalCode": "70372",
         *           "city": "STUTTGART",
         *           "country": "DEU"
         *         }
         *       ]
         *     },
         *     "identityCheckedById": true,
         *     "schufaId": "EHB9SU3EZ1"
         *   },
         *   "courtData": [
         *     {
         *       "withDateOfBirth": true,
         *       "attributeName": "NO_SUBMISSION_OF_ASSETS_REPORT",
         *       "date": "2025-02-01",
         *       "reference": "B1405R00407984814"
         *     }
         *   ],
         *   "contracts": [
         *     {
         *       "withDateOfBirth": true,
         *       "attributeName": "UNSECURED_LOAN",
         *       "date": "2027-07-01",
         *       "reference": "AZ14YXII-20",
         *       "amount": {
         *         "amount": 15000,
         *         "currency": "EUR"
         *       },
         *       "rates": {
         *         "type": "MONTHLY",
         *         "number": 24
         *       },
         *       "settled": false,
         *       "claim": {
         *         "adjudication": true,
         *         "currentAmount": {
         *           "amount": 750,
         *           "currency": "EUR"
         *         },
         *         "initialAmount": {
         *           "amount": 400,
         *           "currency": "EUR"
         *         },
         *         "balances": [
         *           {
         *             "amount": {
         *               "amount": 400,
         *               "currency": "EUR"
         *             },
         *             "date": "2025-05-01"
         *           },
         *           {
         *             "amount": {
         *               "amount": 750,
         *               "currency": "EUR"
         *             },
         *             "date": "2025-07-01"
         *           }
         *         ],
         *         "status": "OPEN"
         *       }
         *     }
         *   ],
         *   "enquiries": [
         *     {
         *       "withDateOfBirth": true,
         *       "attributeName": "ENQUIRY_CURRENT_ACCOUNTS",
         *       "date": "2025-07-01",
         *       "reference": "AZ14YXII-22"
         *     }
         *   ],
         *   "notes": [
         *     {
         *       "withDateOfBirth": true,
         *       "attributeName": "NOTE",
         *       "text": "FRUEHER MUELLER, PETER"
         *     }
         *   ],
         *   "identificationReservations": [
         *     "DIFFERENT_PERSON_DATA"
         *   ],
         *   "score": {
         *     "description": "Score",
         *     "status": "OK",
         *     "details": {
         *       "value": 1179,
         *       "riskRate": 77.75,
         *       "range": "F",
         *       "text": "RATINGSTUFE F",
         *       "infoText": [
         *         "ES LIEGEN INFORMATIONEN ZU VERTRAGSWIDRIGEM VERHALTEN VOR",
         *         "SCORE-ID 9R11-EB5S-QEFB-0OIQ-01"
         *       ]
         *     }
         *   },
         *   "fraudInformation": {
         *     "resultType": "MATCH",
         *     "matchId": "1234567"
         *   }
         * }
         */
        Schemas.CreditRatingInformation;
        export type $202ManualProcessing = /* This element describes the response if manual processing of the enquiry is necessary. */ Schemas.EnquiryInProcessing;
        export type $202ProcessingNotFinished = /* This element describes the response if manual processing of the enquiry is necessary. */ Schemas.EnquiryInProcessing;
        export type $400BadRequest = /* Error response message */ Schemas.ProblemDetail;
        export type $401Unauthorized = /* Error response message */ Schemas.ProblemDetail;
        export type $403Forbidden = /* Error response message */ Schemas.ProblemDetail;
        export type $404NotFound = /* Error response message */ Schemas.ProblemDetail;
        export type $404ReportNotFound = /* Error response message */ Schemas.ProblemDetail;
        export type $422ReportUnprocessable = /* Error response message */ Schemas.ProblemDetail;
        export type $422UnprocessableEntity = /* Error response message */ Schemas.ProblemDetail;
        export type $500InternalServerError = /* Error response message */ Schemas.ProblemDetail;
    }
    namespace Schemas {
        /**
         * An address of the person.
         */
        export interface Address {
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
        /**
         * The amount of the information transferred is specified here (e.g. a loan amount).
         */
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
            amount: /* The amount of the information transferred is specified here (e.g. a loan amount). */ Amount;
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
            currentAmount?: /* The amount of the information transferred is specified here (e.g. a loan amount). */ Amount;
            initialAmount?: /* The amount of the information transferred is specified here (e.g. a loan amount). */ Amount;
            /**
             * example:
             * [
             *   {
             *     "amount": {
             *       "amount": 500,
             *       "currency": "EUR"
             *     },
             *     "date": "2025-07-01"
             *   }
             * ]
             */
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
             * example:
             * OPEN
             */
            status: string;
        }
        /**
         * Contracts of the customer
         */
        export interface Contract {
            withDateOfBirth: /* Indicates that the contract was reported to SCHUFA with the person's date of birth. */ WithDateOfBirth;
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
             * * `BASIC_PAYMENT_ACCOUNT` - Payment account with basic features (Legacy attribute: BS)
             * * `CURRENT_ACCOUNT_SEIZURE_PROTECTION` - Current account with seizure protection (Legacy attribute: GP)
             * * `BUILDING_SOCIETY_LOAN_SECURED` - Building-society loan secured by declaration of commitment (Legacy attribute: HN)
             * * `CO_APPLICANT_SECURED_LOAN` - Co-applicant for loans secured by a charge on real estate for real estate financing (Legacy attribute: MY)
             * * `SECURED_LOAN` - Loan secured by a charge on real estate (Legacy attribute: HP)
             * * `PERMANENT_ACCOUNT` - Permanent account (credit-based) (Legacy attribute: DC)
             * * `SECURED_LOAN_NO_AMOUNT` - Loan secured by a charge on real estate (without amount) (Legacy attribute: HY)
             * * `SURETY_FOR_LOAN_NO_AMOUNT` - Surety for loan secured by a charge on real estate (without amount) (Legacy attribute: BY)
             * * `CREDIT_CARD` - Credit card or credit card account (Legacy attribute: CC)
             * * `CREDIT_CARD_REVOLVING` - Credit card or credit card account with revolving limit (Legacy attribute: CR)
             * * `CREDIT_CURRENT_ACCOUNT` - Non-instalment loans and credits on current accounts (Legacy attribute: KG)
             * * `FRAMEWORK_LOAN` - Master loan agreement with a financial institution (Legacy attribute: RK)
             * * `LIQUIDATION_ACCOUNT` - Account in liquidation (Legacy attribute: KW)
             * * `CREDIT_LINES_FREELANCERS` - Working capital credit lines for freelancers (Legacy attribute: K1)
             * * `CREDIT_LINES_SMALL_BUSINESSES` - Working capital credit lines for self-employed/small business owners (Legacy attribute: K2)
             * * `INVESTMENT_LOAN_FREELANCERS` - Capital investment loans for freelancers (Legacy attribute: K3)
             * * `INVESTMENT_LOAN_SMALL_BUSINESSES` - Capital investment loans for self-employed/small business owners (Legacy attribute: K4)
             * * `ACCOUNT_FREELANCERS` - Account for freelancers (Legacy attribute: K5)
             * * `ACCOUNT_SMALL_BUSINESSES` - Account for self-employed/small business owners (Legacy attribute: K6)
             * * `ABSOLUTE_GUARANTEE` - Absolute guarantee for businesses (Legacy attribute: K7)
             * * `CURRENT_ACCOUNT_FREELANCERS` - Business current account (for freelancers) (Legacy attribute: M1)
             * * `CURRENT_ACCOUNT_SMALL_BUSINESSES` - Business current account (for self-employed and small business owners) (Legacy attribute: M2)
             * * `LEASING_FREELANCERS` - Leasing/hire purchase for business purposes (for freelancers) (Legacy attribute: M3)
             * * `LEASING_SMALL_BUSINESSES` - Leasing/hire purchase for business purposes (for self-employed and small business owners) (Legacy attribute: M4)
             * * `CREDIT_CARD_FREELANCERS` - Credit card for business purposes (for freelancers) (Legacy attribute: M5)
             * * `CREDIT_CARD_SMALL_BUSINESSES` - Credit card for business purposes (for self-employed and small business owners) (Legacy attribute: M6)
             * * `SECURED_INVESTMENT_CREDITS_FREELANCERS` - Investment credit secured by a land charge for business purposes (for freelancers) (Legacy attribute: M7)
             * * `SECURED_INVESTMENT_CREDITS_SMALL_BUSINESSES` - Investment credit secured by a land charge for business purposes (for self-employed and small business owners) (Legacy attribute: M8)
             * * `MASKED` - Anonymized / masked contract attribute (Legacy attribute: XX)
             * example:
             * UNSECURED_LOAN
             */
            attributeName: string;
            date?: string; // date
            reference?: /**
             * referencenumber for the identification of own attributes - formerly: Kontonummer
             * example:
             * AZ14YXII-20
             */
            Reference;
            amount?: /* The amount of the information transferred is specified here (e.g. a loan amount). */ Amount;
            rates?: /* Defines the number and type of credit rates. */ Rates;
            loanAgreement?: /* Information on a loan agreement between a consumer and a credit institution */ LoanAgreement;
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
            withDateOfBirth: /* Indicates that the contract was reported to SCHUFA with the person's date of birth. */ WithDateOfBirth;
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
             * example:
             * NO_SUBMISSION_OF_ASSETS_REPORT
             */
            attributeName: string;
            /**
             * Date of the event
             */
            date: string; // date
            reference: /**
             * referencenumber for the identification of own attributes - formerly: Kontonummer
             * example:
             * AZ14YXII-20
             */
            Reference;
        }
        /**
         * This element describes a credit report.
         * example:
         * {
         *   "reportId": "1234567890",
         *   "personData": {
         *     "firstName": "PETER",
         *     "lastName": "MAIER",
         *     "gender": "MALE",
         *     "dateOfBirth": "1973-01-15",
         *     "deceasedInformation": {
         *       "deceased": true,
         *       "dateOfDeath": "2015-01-15",
         *       "deathCertificateId": "SATGAB2015-007"
         *     },
         *     "title": "Dr.",
         *     "placeOfBirth": "WIESBADEN",
         *     "addresses": {
         *       "currentAddress": {
         *         "streetWithNumber": "MAXIMILIANSTRAße 20B",
         *         "postalCode": "10625",
         *         "city": "BERLIN",
         *         "country": "DEU"
         *       },
         *       "previousAddress": {
         *         "streetWithNumber": "SCHILLERSTRAßE 96",
         *         "postalCode": "80539",
         *         "city": "MÜNCHEN",
         *         "country": "DEU"
         *       },
         *       "secondaryAddresses": [
         *         {
         *           "streetWithNumber": "EMSER STR. 11",
         *           "postalCode": "70372",
         *           "city": "STUTTGART",
         *           "country": "DEU"
         *         }
         *       ]
         *     },
         *     "identityCheckedById": true,
         *     "schufaId": "EHB9SU3EZ1"
         *   },
         *   "courtData": [
         *     {
         *       "withDateOfBirth": true,
         *       "attributeName": "NO_SUBMISSION_OF_ASSETS_REPORT",
         *       "date": "2025-02-01",
         *       "reference": "B1405R00407984814"
         *     }
         *   ],
         *   "contracts": [
         *     {
         *       "withDateOfBirth": true,
         *       "attributeName": "UNSECURED_LOAN",
         *       "date": "2027-07-01",
         *       "reference": "AZ14YXII-20",
         *       "amount": {
         *         "amount": 15000,
         *         "currency": "EUR"
         *       },
         *       "rates": {
         *         "type": "MONTHLY",
         *         "number": 24
         *       },
         *       "settled": false,
         *       "claim": {
         *         "adjudication": true,
         *         "currentAmount": {
         *           "amount": 750,
         *           "currency": "EUR"
         *         },
         *         "initialAmount": {
         *           "amount": 400,
         *           "currency": "EUR"
         *         },
         *         "balances": [
         *           {
         *             "amount": {
         *               "amount": 400,
         *               "currency": "EUR"
         *             },
         *             "date": "2025-05-01"
         *           },
         *           {
         *             "amount": {
         *               "amount": 750,
         *               "currency": "EUR"
         *             },
         *             "date": "2025-07-01"
         *           }
         *         ],
         *         "status": "OPEN"
         *       }
         *     }
         *   ],
         *   "enquiries": [
         *     {
         *       "withDateOfBirth": true,
         *       "attributeName": "ENQUIRY_CURRENT_ACCOUNTS",
         *       "date": "2025-07-01",
         *       "reference": "AZ14YXII-22"
         *     }
         *   ],
         *   "notes": [
         *     {
         *       "withDateOfBirth": true,
         *       "attributeName": "NOTE",
         *       "text": "FRUEHER MUELLER, PETER"
         *     }
         *   ],
         *   "identificationReservations": [
         *     "DIFFERENT_PERSON_DATA"
         *   ],
         *   "score": {
         *     "description": "Score",
         *     "status": "OK",
         *     "details": {
         *       "value": 1179,
         *       "riskRate": 77.75,
         *       "range": "F",
         *       "text": "RATINGSTUFE F",
         *       "infoText": [
         *         "ES LIEGEN INFORMATIONEN ZU VERTRAGSWIDRIGEM VERHALTEN VOR",
         *         "SCORE-ID 9R11-EB5S-QEFB-0OIQ-01"
         *       ]
         *     }
         *   },
         *   "fraudInformation": {
         *     "resultType": "MATCH",
         *     "matchId": "1234567"
         *   }
         * }
         */
        export interface CreditRatingInformation {
            reportId: /**
             * The reportId is a unique identification number for the order.
             * example:
             * 1234567890
             */
            ReportId;
            personData?: /* This element contains the customer data known to SCHUFA. */ PersonDataResponse;
            courtData: /* Court Data of the customer */ CourtData[];
            contracts: /* Contracts of the customer */ Contract[];
            enquiries: /* Enquire about the customer */ Enquire[];
            notes: /* Note about the customer */ Note[];
            identificationReservations: /* Array with reservations regarding the identity of the enquired customer. */ IdentificationReservations;
            score?: /* Score information is transmitted via this element. */ Score;
            fraudInformation?: /* This element provides information whether the requested person is known in the context of fraud prevention. */ FraudInformation;
        }
        /**
         * Enquiry data for the credit rating.
         * example:
         * {
         *   "personData": {
         *     "firstName": "Peter",
         *     "lastName": "Maier",
         *     "gender": "MALE",
         *     "dateOfBirth": "1973-01-15",
         *     "title": "Dr.",
         *     "placeOfBirth": "Wiesbaden",
         *     "addresses": {
         *       "currentAddress": {
         *         "streetWithNumber": "MAXIMILIANSTRAße 20B",
         *         "postalCode": "80539",
         *         "city": "MÜNCHEN",
         *         "country": "DEU"
         *       },
         *       "previousAddress": {
         *         "streetWithNumber": "SCHILLERSTRAßE 96",
         *         "postalCode": "10625",
         *         "city": "BERLIN",
         *         "country": "DEU"
         *       }
         *     }
         *   },
         *   "reference": "ABC-123-DEF"
         * }
         */
        export interface CreditRatingRequest {
            personData: /**
             * Data to identify a person
             * example:
             * {
             *   "firstName": "Peter",
             *   "lastName": "Maier",
             *   "gender": "MALE",
             *   "dateOfBirth": "1973-01-15",
             *   "title": "Dr.",
             *   "placeOfBirth": "Wiesbaden",
             *   "addresses": {
             *     "currentAddress": {
             *       "streetWithNumber": "MAXIMILIANSTRAße 20B",
             *       "postalCode": "80539",
             *       "city": "MÜNCHEN",
             *       "country": "DEU"
             *     },
             *     "previousAddress": {
             *       "streetWithNumber": "SCHILLERSTRAßE 96",
             *       "postalCode": "10625",
             *       "city": "BERLIN",
             *       "country": "DEU"
             *     }
             *   }
             * }
             */
            PersonData;
            /**
             * reference for the identification of own attributes (Formerly: Kontonummer)
             * example:
             * ABC-123-DEF
             */
            reference?: string; // [A-Za-z\dßÄÖÜäöü:/()',.\-\s]{1,25}
        }
        /**
         * Documents that the person has been reported as deceased.
         */
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
            withDateOfBirth: /* Indicates that the contract was reported to SCHUFA with the person's date of birth. */ WithDateOfBirth;
            /**
             * Values:
             * * `ENQUIRY_UNSECURED_LOANS` - Enquiry concerning unsecured building loans or loans not secured by a charge on real estate (Legacy attribute: AK)
             * * `ENQUIRY_SURETY_UNSECURED_LOAN` - Enquiry concerning surety for unsecured building society loan, loan not secured by a charge on real estate or leasing/hire purchase (Legacy attribute: AB)
             * * `ENQUIRY_SECURED_LOANS` - Enquiry concerning loans secured by charge on real estate (Legacy attribute: AW)
             * * `ENQUIRY_CURRENT_ACCOUNTS` - Enquiry concerning current accounts (Legacy attribute: AG)
             * * `ENQUIRY_BASIC_ACCOUNT` - Enquiry concerning payment accounts with basic features (Legacy attribute: KB)
             * * `ENQUIRY_SEIZURE_PROTECTION_ACCOUNT` - Enquiry concerning current accounts with seizure protection (Legacy attribute: KP)
             * * `ENQUIRY_ENERGY` - Enquiry concerning energy contract or energyrelated service (legacy attribute: AE)
             * * `ENQUIRY_CREDIT_CARDS` - Enquiry concerning credit cards (Legacy attribute: AC)
             * * `ENQUIRY_LEASING` - Enquiry concerning leasing/hire purchase (Legacy attribute: AL)
             * * `ENQUIRY_PAYMENT_METHODS` - Enquiry concerning the offer of payment methods (Legacy attribute: ZV)
             * * `ENQUIRY_COMMERCE` - Commercial enquiry concerning delivery of goods or services (Legacy attribute: AH)
             * * `ENQUIRY_MAIL_ORDERS` - Enquiry of catalog companies concerning the delivery of goods and services (Legacy attribute: AV)
             * * `ENQUIRY_TELECOMMUNICATION` - Enquiry concerning telecommunication accounts (Legacy attribute: AT)
             * * `ENQUIRY_SERVICES` - Enquiry concerning services (Legacy attribute: AD)
             * * `ENQUIRY_COLLECTION` - Enquiry concerning collection if the preconditions of §31, section 2 BDSG for reporting the claim are fulfilled (Legacy attribute: AI)
             * * `ENQUIRY_SERVICES_FINANCIAL` - Enquiry concerning financial services (Legacy attribute: AF)
             * * `ENQUIRY_CONDITIONS_REAL_ESTATE_LOANS` - Enquiry concerning terms of real estate loans (Legacy attribute: KH)
             * * `ENQUIRY_CREDIT_CARDS_CREDIT_LINE` - Enquiry concerning credit cards with revolving credit line (Legacy attribute: AR)
             * * `ENQUIRY_CONDITIONS_LOANS` - Enquiry concerning terms of loans (Legacy attribute: KK)
             * * `ENQUIRY_TERMS_LEASING` - Enquiry concerning terms of leasing/hire purchase (Legacy attribute: KL)
             * * `ENQUIRY_CREDIT_LINES_FREELANCERS` - Enquiry concerning working capital credit lines for freelancers (Legacy attribute: A1)
             * * `ENQUIRY_CREDIT_LINES_SMALL_BUSINESSES` - Enquiry concerning working capital credit lines for self-employed/small business owners (Legacy attribute: A2)
             * * `ENQUIRY_INVESTMENT_LOAN_FREELANCERS` - Enquiry concerning capital investment loans for freelancers (Legacy attribute: A3)
             * * `ENQUIRY_INVESTMENT_LOAN_SMALL_BUSINESSES` - Enquiry concerning capital investment loans for self-employed/small business owners (Legacy attribute: A4)
             * * `ENQUIRY_FREELANCERS` - Enquiry concerning freelancers (Legacy attribute: A5)
             * * `ENQUIRY_SMALL_BUSINESSES` - Enquiry concerning self-employed/small business owners (Legacy attribute: A6)
             * * `ENQUIRY_BUSINESS_GUARANTEES` - Enquiry concerning absolute guarantees for a business (Legacy attribute: A7)
             * * `ENQUIRY_CURRENT_ACCOUNTS_FREELANCERS` - Enquiry concerning business current accounts (for freelancers) (Legacy attribute: B1)
             * * `ENQUIRY_CURRENT_ACCOUNTS_SMALL_BUSINESSES` - Enquiry concerning business current accounts (for self-employed and small business owners) (Legacy attribute: B2)
             * * `ENQUIRY_LEASING_FREELANCERS` - Enquiry concerning leasing/hire purchase for business purposes (for freelancers) (Legacy attribute: B3)
             * * `ENQUIRY_LEASING_SMALL_BUSINESSES` - Enquiry concerning leasing/hire purchase for business purposes (for self-employed and small business owners) (Legacy attribute: B4)
             * * `ENQUIRY_CREDIT_CARDS_FREELANCERS` - Enquiry concerning credit cards for business purposes (for freelancers) (Legacy attribute: B5)
             * * `ENQUIRY_CREDIT_CARDS_SMALL_BUSINESSES` - Enquiry concerning credit cards for business purposes (for self-employed and small business owners) (Legacy attribute: B6)
             * * `ENQUIRY_SECURED_INVESTMENT_CREDITS_FREELANCERS` - Enquiry concerning investment credits secured by a land charge for business purposes (for freelancers) (Legacy attribute: B7)
             * * `ENQUIRY_SECURED_INVESTMENT_CREDITS_SMALL_BUSINESSES` - Enquiry concerning investment credits secured by a land charge for business purposes (for self-employed and small business owners) (Legacy attribute: B8)
             * * `ENQUIRY_GAMBLING` - Enquiry concerning gambling (Legacy attribute: AO)
             * example:
             * ENQUIRY_CURRENT_ACCOUNTS
             */
            attributeName: string;
            date: string; // date
            reference?: /**
             * referencenumber for the identification of own attributes - formerly: Kontonummer
             * example:
             * AZ14YXII-20
             */
            Reference;
        }
        /**
         * This element describes the response if manual processing of the enquiry is necessary.
         */
        export interface EnquiryInProcessing {
            /**
             * example:
             * Manual processing of the enquiry is necessary
             */
            message: string;
            reportId: /**
             * The reportId is a unique identification number for the order.
             * example:
             * 1234567890
             */
            ReportId;
            /**
             * URL that can be used to retrieve the result of manual processing.
             * example:
             * https://api.schufa.de/credit-report/manual-processing/08154711
             */
            href: string;
        }
        /**
         * This element provides information whether the requested person is known in the context of fraud prevention.
         */
        export interface FraudInformation {
            /**
             * example:
             * MATCH
             */
            resultType: string;
            /**
             * Reference to a FraudPool hit list that the FraudManager can review. The element is only filled if there is a match.
             * example:
             * 1234567
             */
            matchId?: string;
        }
        /**
         * Array with reservations regarding the identity of the enquired customer.
         */
        export type IdentificationReservations = string[];
        /**
         * Information on a loan agreement between a consumer and a credit institution
         */
        export interface LoanAgreement {
            /**
             * Values:
             * * `CREDIT_CURRENT_ACCOUNT` - Non-instalment loans and credits on current accounts (Legacy attribute: KG)
             * example:
             * CREDIT_CURRENT_ACCOUNT
             */
            attributeName: string;
            /**
             * Date of the agreement
             * example:
             * 2024-05-23
             */
            date: string; // date
            amount: /* The amount of the information transferred is specified here (e.g. a loan amount). */ Amount;
        }
        /**
         * Note about the customer
         */
        export interface Note {
            withDateOfBirth: /* Indicates that the contract was reported to SCHUFA with the person's date of birth. */ WithDateOfBirth;
            /**
             * Values:
             * * `NOTE` - The note is a freely formulated comment (Legacy attribute: H3)
             * * `SELF_REPRESENTATION` - The self-representation of a consumer refers to the registered data on this consumer. It includes the consumer's counterstatement within the meaning of the BDSG. (Legacy attribute: H5)
             * example:
             * NOTE
             */
            attributeName: string;
            /**
             * example:
             * FRUEHER MUELLER, PETER
             */
            text: string;
        }
        /**
         * Data to identify a person
         * example:
         * {
         *   "firstName": "Peter",
         *   "lastName": "Maier",
         *   "gender": "MALE",
         *   "dateOfBirth": "1973-01-15",
         *   "title": "Dr.",
         *   "placeOfBirth": "Wiesbaden",
         *   "addresses": {
         *     "currentAddress": {
         *       "streetWithNumber": "MAXIMILIANSTRAße 20B",
         *       "postalCode": "80539",
         *       "city": "MÜNCHEN",
         *       "country": "DEU"
         *     },
         *     "previousAddress": {
         *       "streetWithNumber": "SCHILLERSTRAßE 96",
         *       "postalCode": "10625",
         *       "city": "BERLIN",
         *       "country": "DEU"
         *     }
         *   }
         * }
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
             * Only filled if the date of birth is known. Omit field if unknown.
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
            currentAddress: /* An address of the person. */ Address;
            previousAddress?: /* An address of the person. */ Address;
        }
        /**
         * Current and previous address as well as secondary residences of a person.
         * example:
         * {
         *   "currentAddress": {
         *     "streetWithNumber": "MAXIMILIANSTRAße 20B",
         *     "postalCode": "10625",
         *     "city": "BERLIN",
         *     "country": "DEU"
         *   },
         *   "previousAddress": {
         *     "streetWithNumber": "SCHILLERSTRAßE 96",
         *     "postalCode": "80539",
         *     "city": "MÜNCHEN",
         *     "country": "DEU"
         *   },
         *   "secondaryAddresses": [
         *     {
         *       "streetWithNumber": "EMSER STR. 11",
         *       "postalCode": "70372",
         *       "city": "STUTTGART",
         *       "country": "DEU"
         *     }
         *   ]
         * }
         */
        export interface PersonDataAddressesResponse {
            currentAddress: /* An address of the person. */ Address;
            previousAddress?: /* An address of the person. */ Address;
            secondaryAddresses?: /* An address of the person. */ Address[];
        }
        /**
         * This element contains the customer data known to SCHUFA.
         */
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
             * example:
             * 1973-01-15
             */
            dateOfBirth?: string; // date
            deceasedInformation: /* Documents that the person has been reported as deceased. */ DeceasedInformation;
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
            addresses: /**
             * Current and previous address as well as secondary residences of a person.
             * example:
             * {
             *   "currentAddress": {
             *     "streetWithNumber": "MAXIMILIANSTRAße 20B",
             *     "postalCode": "10625",
             *     "city": "BERLIN",
             *     "country": "DEU"
             *   },
             *   "previousAddress": {
             *     "streetWithNumber": "SCHILLERSTRAßE 96",
             *     "postalCode": "80539",
             *     "city": "MÜNCHEN",
             *     "country": "DEU"
             *   },
             *   "secondaryAddresses": [
             *     {
             *       "streetWithNumber": "EMSER STR. 11",
             *       "postalCode": "70372",
             *       "city": "STUTTGART",
             *       "country": "DEU"
             *     }
             *   ]
             * }
             */
            PersonDataAddressesResponse;
            /**
             * example:
             * true
             */
            identityCheckedById?: boolean;
            /**
             * example:
             * EHB9SU3EZ1
             */
            schufaId?: string;
        }
        /**
         * Error response message
         */
        export interface ProblemDetail {
            /**
             * example:
             * about:blank
             */
            type?: string;
            /**
             * example:
             * Constraint Violation
             */
            title?: string;
            /**
             * example:
             * 400
             */
            status?: number; // int32
            /**
             * example:
             * Your request did not validate
             */
            detail?: string;
            /**
             * example:
             * /standard
             */
            instance?: string;
            /**
             * example:
             * 3ffa5947-cb2e-4877-995f-ade9a635ae0a/restapis
             */
            requestId?: string;
            /**
             * example:
             * [
             *   {
             *     "field": "personData.firstName",
             *     "message": "must not be null"
             *   }
             * ]
             */
            violations?: /* Tells json path where violations accured with the violation explained under message */ Violation[];
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
        /**
         * referencenumber for the identification of own attributes - formerly: Kontonummer
         * example:
         * AZ14YXII-20
         */
        export type Reference = string;
        /**
         * The reportId is a unique identification number for the order.
         * example:
         * 1234567890
         */
        export type ReportId = string;
        /**
         * Score information is transmitted via this element.
         */
        export interface Score {
            /**
             * A descriptive text about which scoring data is involved in this element.
             * example:
             * Score
             */
            description?: string;
            /**
             * example:
             * OK
             */
            status?: string;
            details?: /* Detailed information on the score. */ ScoreDetails;
        }
        /**
         * Detailed information on the score.
         */
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
            /**
             * Score info texts can contain further information on a score calculation or represent the exclusive scoring information.
             * example:
             * [
             *   "ES LIEGEN INFORMATIONEN ZU VERTRAGSWIDRIGEM VERHALTEN VOR",
             *   "SCORE-ID 9R11-EB5S-QEFB-0OIQ-01"
             * ]
             */
            infoText?: string[];
        }
        /**
         * Tells json path where violations accured with the violation explained under message
         */
        export interface Violation {
            field: string;
            message: string;
        }
        /**
         * Indicates that the contract was reported to SCHUFA with the person's date of birth.
         */
        export type WithDateOfBirth = boolean;
    }
}
declare namespace Paths {
    namespace Checks {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace Collection {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace Commerce {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace ConditionsLoans {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace ConditionsRealEstateLoans {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace Energy {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace Freelancers {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace FreelancersSecuredInvestmentCredits {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
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
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ProcessingNotFinished;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404ReportNotFound;
            export type $422 = Components.Responses.$422ReportUnprocessable;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace Leasing {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace MailOrders {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace PaymentMethod {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace PotentialTenants {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace SecuredLoans {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace Services {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace ServicesFinancial {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace SmallBusinesses {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace SmallBusinessesChecks {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace SmallBusinessesSecuredInvestmentCredits {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
    namespace UnsecuredLoans {
        export type RequestBody = Components.RequestBodies.CreditRatingRequestBody;
        namespace Responses {
            export type $200 = Components.Responses.$200CreditReport;
            export type $202 = Components.Responses.$202ManualProcessing;
            export type $400 = Components.Responses.$400BadRequest;
            export type $401 = Components.Responses.$401Unauthorized;
            export type $403 = Components.Responses.$403Forbidden;
            export type $404 = Components.Responses.$404NotFound;
            export type $422 = Components.Responses.$422UnprocessableEntity;
            export type $500 = Components.Responses.$500InternalServerError;
        }
    }
}


export interface OperationMethods {
  /**
   * checks - Request to control own inquiries and messages about an ongoing business relationship with private customers.
   * 
   * Enquiry for control purposes of a private customer with whom a contractual relationship already exists. This is an inquiry about existing contractual relationships or contractual relationships that are being processed, e.g. to check your own inquiries and reports or undisputed claims which have not (yet) fulfilled the preconditions of §31, section 2 BDSG (Legacy enquiry attribute: AU). The legitimate interest is justified by the conclusion of a contract between the consumer and the contract partner.
   */
  'checks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Checks.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Checks.Responses.$200 | Paths.Checks.Responses.$202>
  /**
   * collection - Enquiry within the scope of collection processing
   * 
   * Request for a credit report as part of the collection processing if the preconditions of §31, section 2 BDSG for reporting the claim are fulfilled (Legacy enquiry attribute: AI). The legitimate interest is justified by the takeover of a claim against a consumer by a debt collection company.
   */
  'collection'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Collection.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Collection.Responses.$200 | Paths.Collection.Responses.$202>
  /**
   * commerce - Commercial enquiry concerning delivery of goods or services
   * 
   * Credit Report on the occasion of an order on account or a payment by installment (Legacy enquiry attribute: AH). The legitimate interest is justified by the conclusion of a contract between the consumer and a commercial company.
   */
  'commerce'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Commerce.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Commerce.Responses.$200 | Paths.Commerce.Responses.$202>
  /**
   * conditionsLoans - Enquiry concerning terms of loans
   * 
   * Request of a credit report in the process of loan offers in order to offer risk-appropriate loan terms (Legacy enquiry attribute: KK). The legitimate interest is justified by the requirements of Basel II and the German Banking Act (KWG), which require the credit conditions to be risk-adequate.
   */
  'conditionsLoans'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ConditionsLoans.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConditionsLoans.Responses.$200 | Paths.ConditionsLoans.Responses.$202>
  /**
   * conditionsRealEstateLoans - Enquiry concerning terms of real estate loan
   * 
   * Request of a credit report in the process of real estate loan offers in order to offer risk-appropriate loan terms (Legacy enquiry attribute: KH). The legitimate interest is justified by the requirements of Basel II and the German Banking Act (KWG), which require the credit conditions to be risk-adequate.
   */
  'conditionsRealEstateLoans'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ConditionsRealEstateLoans.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConditionsRealEstateLoans.Responses.$200 | Paths.ConditionsRealEstateLoans.Responses.$202>
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
   * freelancers - Enquiry concerning freelancers
   * 
   * Request for a credit report on the occasion of the commencement, implementation or settlement of a contractual relationship (Legacy enquiry attribute: A5). The legitimate interest is justified by the granting of a supplier credit between the freelancer and the contract partner.
   */
  'freelancers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Freelancers.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Freelancers.Responses.$200 | Paths.Freelancers.Responses.$202>
  /**
   * freelancersSecuredInvestmentCredits - Enquiry concerning investment credits secured by a land charge for business purposes (for freelancers)
   * 
   * Request for a credit report on the occasion of an application for an investment credit secured by a land charge for business purposes (freelancers) (Legacy enquiry attribute: B7). The legitimate interest is justified by the conclusion of a loan agreement, a surety agreement or a co-obligation to a loan between the freelancer and the contract partner.
   */
  'freelancersSecuredInvestmentCredits'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.FreelancersSecuredInvestmentCredits.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FreelancersSecuredInvestmentCredits.Responses.$200 | Paths.FreelancersSecuredInvestmentCredits.Responses.$202>
  /**
   * leasing - Enquiry concerning leasing
   * 
   * Request for a credit report due to the conclusion of a lease/hire purchase (Legacy enquiry attribute: AL). The legitimate interest is justified by the conclusion of a leasing contract between the consumer and the contract partner.
   */
  'leasing'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Leasing.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Leasing.Responses.$200 | Paths.Leasing.Responses.$202>
  /**
   * mailOrders - Enquiry of catalog companies concerning the delivery of goods and services.
   * 
   * Request for a credit report on the occasion of a distance selling transaction (e.g. mail order or Internet order) (Legacy enquiry attribute: AV). The legitimate interest is justified by the conclusion of a contract between the consumer and a mail order company.
   */
  'mailOrders'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.MailOrders.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MailOrders.Responses.$200 | Paths.MailOrders.Responses.$202>
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
  /**
   * paymentMethod - Enquiry concerning the offer of payment methods
   * 
   * Credit report to manage the types of payment methods offered (Legacy enquiry attribute: ZV). The legitimate interest is justified by the conclusion of a contract between the consumer and the contract partner.
   */
  'paymentMethod'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PaymentMethod.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PaymentMethod.Responses.$200 | Paths.PaymentMethod.Responses.$202>
  /**
   * potentialTenants - Enquiry concerning potential lessees/tenants
   * 
   * Request for a credit report on the occasion of the conclusion of a rental agreement with the customer (Legacy enquiry attribute: AM). The legitimate interest is justified by the conclusion of a rental contract between the consumer and the contract partner.
   */
  'potentialTenants'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PotentialTenants.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PotentialTenants.Responses.$200 | Paths.PotentialTenants.Responses.$202>
  /**
   * securedLoans - Enquiry concerning loans secured by charge on real estate
   * 
   * Request for a credit report on the occasion of the application for a loan for real estate financing or mortgage-secured loan (Legacy enquiry attribute: AW). The legitimate interest is justified by the conclusion of a loan agreement, a surety agreement or a co-obligation to a loan between the consumer and the contract partner.
   */
  'securedLoans'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SecuredLoans.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SecuredLoans.Responses.$200 | Paths.SecuredLoans.Responses.$202>
  /**
   * services - Enquiry concerning services
   * 
   * Request for a credit report on the basis of the conclusion of a contract with the consumer (Legacy enquiry attribute: AD). The legitimate interest is justified by the conclusion of a contract (e.g. car sharing contract) between the consumer and the contract partner.
   */
  'services'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Services.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Services.Responses.$200 | Paths.Services.Responses.$202>
  /**
   * servicesFinancial - Enquiry concerning financial services
   * 
   * Request for a credit report on the basis of the conclusion of a financial services contract (e.g. insurance contract) with the consumer (Legacy enquiry attribute: AF). The legitimate interest is justified by the conclusion of a financial services contract (e.g. insurance contract) between the consumer and the contract partner.
   */
  'servicesFinancial'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ServicesFinancial.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServicesFinancial.Responses.$200 | Paths.ServicesFinancial.Responses.$202>
  /**
   * smallBusinesses - Enquiry concerning self-employed/small business owners
   * 
   * Request for a credit report on the occasion of the commencement, execution or settlement of a contractual relationship (Legacy enquiry attribute: A6). The legitimate interest is justified by the granting of a supplier credit between the self-employed person or small business and the contract partner.
   */
  'smallBusinesses'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SmallBusinesses.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SmallBusinesses.Responses.$200 | Paths.SmallBusinesses.Responses.$202>
  /**
   * smallBusinessesChecks - Request to control own inquiries and messages about an ongoing business relationship with self-employed/small business owners.
   * 
   * Enquiry for control purposes of self-employed/small business owners with whom a contractual relationship already exists. This is an inquiry about existing contractual relationships or contractual relationships that are being processed, e.g. to check your own inquiries and reports or undisputed claims which have not (yet) fulfilled the preconditions of §31, section 2 BDSG (Legacy enquiry attribute: GU). The legitimate interest is justified by the conclusion of a contract between the consumer and the contractual partner.
   */
  'smallBusinessesChecks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SmallBusinessesChecks.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SmallBusinessesChecks.Responses.$200 | Paths.SmallBusinessesChecks.Responses.$202>
  /**
   * smallBusinessesSecuredInvestmentCredits - Enquiry concerning investment credits secured by a land charge for business purposes (for self-employed and small business owners)
   * 
   * Request for a credit report on the occasion of an application for an investment credit secured by a land charge for business purposes (self-employed and small business owners) (Legacy enquiry attribute: B8). The legitimate interest is justified by the conclusion of a loan agreement, a surety agreement or a co-obligation to a loan between the self-employed person or small business and the contract partner.
   */
  'smallBusinessesSecuredInvestmentCredits'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SmallBusinessesSecuredInvestmentCredits.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SmallBusinessesSecuredInvestmentCredits.Responses.$200 | Paths.SmallBusinessesSecuredInvestmentCredits.Responses.$202>
  /**
   * unsecuredLoans - Enquiry concerning unsecured building loans or loans not secured by a charge on real estate
   * 
   * Request for a credit report on the occasion of an application for a loan or as part of the regular credit report in an existing contractual relationship (Legacy enquiry attribute: AK). The legitimate interest is justified by the conclusion of a credit contract between the consumer and the contract partner.
   */
  'unsecuredLoans'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UnsecuredLoans.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnsecuredLoans.Responses.$200 | Paths.UnsecuredLoans.Responses.$202>
}

export interface PathsDictionary {
  ['/checks']: {
    /**
     * checks - Request to control own inquiries and messages about an ongoing business relationship with private customers.
     * 
     * Enquiry for control purposes of a private customer with whom a contractual relationship already exists. This is an inquiry about existing contractual relationships or contractual relationships that are being processed, e.g. to check your own inquiries and reports or undisputed claims which have not (yet) fulfilled the preconditions of §31, section 2 BDSG (Legacy enquiry attribute: AU). The legitimate interest is justified by the conclusion of a contract between the consumer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Checks.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Checks.Responses.$200 | Paths.Checks.Responses.$202>
  }
  ['/collection']: {
    /**
     * collection - Enquiry within the scope of collection processing
     * 
     * Request for a credit report as part of the collection processing if the preconditions of §31, section 2 BDSG for reporting the claim are fulfilled (Legacy enquiry attribute: AI). The legitimate interest is justified by the takeover of a claim against a consumer by a debt collection company.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Collection.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Collection.Responses.$200 | Paths.Collection.Responses.$202>
  }
  ['/commerce']: {
    /**
     * commerce - Commercial enquiry concerning delivery of goods or services
     * 
     * Credit Report on the occasion of an order on account or a payment by installment (Legacy enquiry attribute: AH). The legitimate interest is justified by the conclusion of a contract between the consumer and a commercial company.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Commerce.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Commerce.Responses.$200 | Paths.Commerce.Responses.$202>
  }
  ['/conditions/loans']: {
    /**
     * conditionsLoans - Enquiry concerning terms of loans
     * 
     * Request of a credit report in the process of loan offers in order to offer risk-appropriate loan terms (Legacy enquiry attribute: KK). The legitimate interest is justified by the requirements of Basel II and the German Banking Act (KWG), which require the credit conditions to be risk-adequate.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ConditionsLoans.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConditionsLoans.Responses.$200 | Paths.ConditionsLoans.Responses.$202>
  }
  ['/conditions/real-estate-loans']: {
    /**
     * conditionsRealEstateLoans - Enquiry concerning terms of real estate loan
     * 
     * Request of a credit report in the process of real estate loan offers in order to offer risk-appropriate loan terms (Legacy enquiry attribute: KH). The legitimate interest is justified by the requirements of Basel II and the German Banking Act (KWG), which require the credit conditions to be risk-adequate.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ConditionsRealEstateLoans.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConditionsRealEstateLoans.Responses.$200 | Paths.ConditionsRealEstateLoans.Responses.$202>
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
  ['/freelancers']: {
    /**
     * freelancers - Enquiry concerning freelancers
     * 
     * Request for a credit report on the occasion of the commencement, implementation or settlement of a contractual relationship (Legacy enquiry attribute: A5). The legitimate interest is justified by the granting of a supplier credit between the freelancer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Freelancers.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Freelancers.Responses.$200 | Paths.Freelancers.Responses.$202>
  }
  ['/freelancers/secured-investment-credits']: {
    /**
     * freelancersSecuredInvestmentCredits - Enquiry concerning investment credits secured by a land charge for business purposes (for freelancers)
     * 
     * Request for a credit report on the occasion of an application for an investment credit secured by a land charge for business purposes (freelancers) (Legacy enquiry attribute: B7). The legitimate interest is justified by the conclusion of a loan agreement, a surety agreement or a co-obligation to a loan between the freelancer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.FreelancersSecuredInvestmentCredits.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FreelancersSecuredInvestmentCredits.Responses.$200 | Paths.FreelancersSecuredInvestmentCredits.Responses.$202>
  }
  ['/leasing']: {
    /**
     * leasing - Enquiry concerning leasing
     * 
     * Request for a credit report due to the conclusion of a lease/hire purchase (Legacy enquiry attribute: AL). The legitimate interest is justified by the conclusion of a leasing contract between the consumer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Leasing.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Leasing.Responses.$200 | Paths.Leasing.Responses.$202>
  }
  ['/mail-orders']: {
    /**
     * mailOrders - Enquiry of catalog companies concerning the delivery of goods and services.
     * 
     * Request for a credit report on the occasion of a distance selling transaction (e.g. mail order or Internet order) (Legacy enquiry attribute: AV). The legitimate interest is justified by the conclusion of a contract between the consumer and a mail order company.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.MailOrders.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MailOrders.Responses.$200 | Paths.MailOrders.Responses.$202>
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
  ['/payment-methods']: {
    /**
     * paymentMethod - Enquiry concerning the offer of payment methods
     * 
     * Credit report to manage the types of payment methods offered (Legacy enquiry attribute: ZV). The legitimate interest is justified by the conclusion of a contract between the consumer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PaymentMethod.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PaymentMethod.Responses.$200 | Paths.PaymentMethod.Responses.$202>
  }
  ['/potential-tenants']: {
    /**
     * potentialTenants - Enquiry concerning potential lessees/tenants
     * 
     * Request for a credit report on the occasion of the conclusion of a rental agreement with the customer (Legacy enquiry attribute: AM). The legitimate interest is justified by the conclusion of a rental contract between the consumer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PotentialTenants.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PotentialTenants.Responses.$200 | Paths.PotentialTenants.Responses.$202>
  }
  ['/secured-loans']: {
    /**
     * securedLoans - Enquiry concerning loans secured by charge on real estate
     * 
     * Request for a credit report on the occasion of the application for a loan for real estate financing or mortgage-secured loan (Legacy enquiry attribute: AW). The legitimate interest is justified by the conclusion of a loan agreement, a surety agreement or a co-obligation to a loan between the consumer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SecuredLoans.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SecuredLoans.Responses.$200 | Paths.SecuredLoans.Responses.$202>
  }
  ['/services']: {
    /**
     * services - Enquiry concerning services
     * 
     * Request for a credit report on the basis of the conclusion of a contract with the consumer (Legacy enquiry attribute: AD). The legitimate interest is justified by the conclusion of a contract (e.g. car sharing contract) between the consumer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Services.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Services.Responses.$200 | Paths.Services.Responses.$202>
  }
  ['/services/financial']: {
    /**
     * servicesFinancial - Enquiry concerning financial services
     * 
     * Request for a credit report on the basis of the conclusion of a financial services contract (e.g. insurance contract) with the consumer (Legacy enquiry attribute: AF). The legitimate interest is justified by the conclusion of a financial services contract (e.g. insurance contract) between the consumer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ServicesFinancial.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServicesFinancial.Responses.$200 | Paths.ServicesFinancial.Responses.$202>
  }
  ['/small-businesses']: {
    /**
     * smallBusinesses - Enquiry concerning self-employed/small business owners
     * 
     * Request for a credit report on the occasion of the commencement, execution or settlement of a contractual relationship (Legacy enquiry attribute: A6). The legitimate interest is justified by the granting of a supplier credit between the self-employed person or small business and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SmallBusinesses.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SmallBusinesses.Responses.$200 | Paths.SmallBusinesses.Responses.$202>
  }
  ['/small-businesses/checks']: {
    /**
     * smallBusinessesChecks - Request to control own inquiries and messages about an ongoing business relationship with self-employed/small business owners.
     * 
     * Enquiry for control purposes of self-employed/small business owners with whom a contractual relationship already exists. This is an inquiry about existing contractual relationships or contractual relationships that are being processed, e.g. to check your own inquiries and reports or undisputed claims which have not (yet) fulfilled the preconditions of §31, section 2 BDSG (Legacy enquiry attribute: GU). The legitimate interest is justified by the conclusion of a contract between the consumer and the contractual partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SmallBusinessesChecks.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SmallBusinessesChecks.Responses.$200 | Paths.SmallBusinessesChecks.Responses.$202>
  }
  ['/small-businesses/secured-investment-credits']: {
    /**
     * smallBusinessesSecuredInvestmentCredits - Enquiry concerning investment credits secured by a land charge for business purposes (for self-employed and small business owners)
     * 
     * Request for a credit report on the occasion of an application for an investment credit secured by a land charge for business purposes (self-employed and small business owners) (Legacy enquiry attribute: B8). The legitimate interest is justified by the conclusion of a loan agreement, a surety agreement or a co-obligation to a loan between the self-employed person or small business and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SmallBusinessesSecuredInvestmentCredits.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SmallBusinessesSecuredInvestmentCredits.Responses.$200 | Paths.SmallBusinessesSecuredInvestmentCredits.Responses.$202>
  }
  ['/unsecured-loans']: {
    /**
     * unsecuredLoans - Enquiry concerning unsecured building loans or loans not secured by a charge on real estate
     * 
     * Request for a credit report on the occasion of an application for a loan or as part of the regular credit report in an existing contractual relationship (Legacy enquiry attribute: AK). The legitimate interest is justified by the conclusion of a credit contract between the consumer and the contract partner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UnsecuredLoans.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UnsecuredLoans.Responses.$200 | Paths.UnsecuredLoans.Responses.$202>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Address = Components.Schemas.Address;
export type Amount = Components.Schemas.Amount;
export type Balance = Components.Schemas.Balance;
export type Claim = Components.Schemas.Claim;
export type Contract = Components.Schemas.Contract;
export type CourtData = Components.Schemas.CourtData;
export type CreditRatingInformation = Components.Schemas.CreditRatingInformation;
export type CreditRatingRequest = Components.Schemas.CreditRatingRequest;
export type DeceasedInformation = Components.Schemas.DeceasedInformation;
export type Enquire = Components.Schemas.Enquire;
export type EnquiryInProcessing = Components.Schemas.EnquiryInProcessing;
export type FraudInformation = Components.Schemas.FraudInformation;
export type IdentificationReservations = Components.Schemas.IdentificationReservations;
export type LoanAgreement = Components.Schemas.LoanAgreement;
export type Note = Components.Schemas.Note;
export type PersonData = Components.Schemas.PersonData;
export type PersonDataAddresses = Components.Schemas.PersonDataAddresses;
export type PersonDataAddressesResponse = Components.Schemas.PersonDataAddressesResponse;
export type PersonDataResponse = Components.Schemas.PersonDataResponse;
export type ProblemDetail = Components.Schemas.ProblemDetail;
export type Rates = Components.Schemas.Rates;
export type Reference = Components.Schemas.Reference;
export type ReportId = Components.Schemas.ReportId;
export type Score = Components.Schemas.Score;
export type ScoreDetails = Components.Schemas.ScoreDetails;
export type Violation = Components.Schemas.Violation;
export type WithDateOfBirth = Components.Schemas.WithDateOfBirth;
