import { AxiosError } from "axios";
import { getEntityClient } from "../entity/client";
import { findContactEntity, updateContactWithSchufaScore } from "./service";

const mockStage = vi.fn(() => "prod");

vi.mock("sst", () => ({
	Resource: {
		App: {
			get stage() {
				return mockStage();
			},
		},
	},
}));

vi.mock("../entity/client.ts");

const mockGetEntityClient = vi.mocked(getEntityClient);

beforeEach(() => {
	vi.clearAllMocks();
	vi.resetAllMocks();
});

describe("SchufaService", () => {
	describe("buildPersonalData", () => {
		it("should return undefined for unknown schemas", () => {
			// given
			const submission = {
				_schema: "opportunity",
			};

			// when
			const contact_entity = findContactEntity(submission);

			// then
			expect(contact_entity).toBeUndefined();
		});

		it("should build personal data from a submission", () => {
			// given
			const submission = {
				steps: [
					{
						"Persönliche Informationen": {
							firstName: "Anna",
							lastName: "Beispiel",
							email: "s.sauerer+an5@epilot.cloud",
							telephone: "",
							_isValid: true,
						},
					},
					{
						"Your Request Block": "sdf",
					},
					{
						Consents: {
							Schufa: {
								agreed: true,
								topic: "Schufa",
								text: "Ich stimme der Bonitätsprüfung durch die SCHUFA zu.",
								time: "2025-06-25T11:01:56.929Z",
							},
							_isValid: true,
						},
					},
					{},
				],
				_schema: "submission",
				mapped_entities: [
					{
						_id: "2537046e-e632-4180-988a-cf9372da355b",
						_org: "739224",
						_schema: "contact",
						email: [
							{
								email: "s.sauerer+an5@epilot.cloud",
								_id: "J0urz_7TqmTbmo-ygWWWb",
							},
						],
						last_name: "Beispiel",
						first_name: "Anna",
						_created_at: "2025-06-25T11:02:14.531Z",
						_updated_at: "2025-06-25T11:02:14.531Z",
						_owners: [
							{
								org_id: "739224",
							},
						],
						_title: "Anna Beispiel",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
						consent_email_marketing: {
							status: "unknown",
							identifiers: [
								{
									identifier: "s.sauerer+an5@epilot.cloud",
									status: "unknown",
									events: [],
								},
							],
						},
						consent_sms_marketing: {
							status: "unknown",
							identifiers: [],
						},
						consent_phone_call: {
							status: "unknown",
							identifiers: [],
						},
						consent_print_marketing: {
							status: "unknown",
							identifiers: [
								{
									identifier: "2537046e-e632-4180-988a-cf9372da355b",
									status: "unknown",
									events: [],
								},
							],
						},
						$relation: {
							entity_id: "2537046e-e632-4180-988a-cf9372da355b",
							_tags: [
								"customer",
								"Persönliche Informationen",
								"_hidden_contact_524e736d-4735-4e9f-b9a2-7d3a81561165",
							],
						},
					},
					{
						_id: "2b47a7ff-7632-4b51-96de-86bfc4ef29b6",
						_org: "739224",
						_schema: "opportunity",
						journey_data: {
							"Your Request Block": "sdf",
						},
						consents: {
							Schufa: {
								agreed: true,
								topic: "Schufa",
								text: "Ich stimme der Bonitätsprüfung durch die SCHUFA zu.",
								time: "2025-06-25T11:01:56.929Z",
							},
							_isValid: true,
						},
						source: {
							title: "Journey: Schufa Product Demo 25.06",
							href: "/app/journey-builder/journeys/ff63cd30-51b0-11f0-8f22-59926e47cd36",
						},
						opportunity_title: "Schufa Product Demo 25.06",
						_created_at: "2025-06-25T11:02:17.867Z",
						_updated_at: "2025-06-25T11:02:18.253Z",
						_owners: [
							{
								org_id: "739224",
							},
						],
						opportunity_number: "OP-6345",
						_title: "Schufa Product Demo 25.06",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
						customer: {
							$relation: [
								{
									entity_id: "2537046e-e632-4180-988a-cf9372da355b",
								},
							],
						},
						$relation: {
							entity_id: "2b47a7ff-7632-4b51-96de-86bfc4ef29b6",
							_tags: [
								"_hidden_opportunity_c5e84c9c-d044-4ed1-8c7b-83545959bb76",
							],
						},
					},
				],
				line_items: [],
				journey_name: "Schufa Product Demo 25.06",
				journey_context: {
					journeyId: "ff63cd30-51b0-11f0-8f22-59926e47cd36",
					embedded_in:
						"https://portal.dev.epilot.cloud/app/journey-builder/journeys/ff63cd30-51b0-11f0-8f22-59926e47cd36",
					journey_url_used:
						"https://portal.dev.epilot.cloud/journey-app/?journeyId=ff63cd30-51b0-11f0-8f22-59926e47cd36",
					fetched_entities: {},
					journey_session_id: "Wnjn8VI6qpJY1EZ0",
					datadog_session_id: "4c6deb84-8915-4603-8c72-d2feff183e83",
					journey_app_version: "1888398103",
				},
				submission_type: "general_request",
				runtime_entities: ["OPPORTUNITY"],
				consents: {
					Schufa: {
						agreed: true,
						topic: "Schufa",
						text: "Ich stimme der Bonitätsprüfung durch die SCHUFA zu.",
						time: "2025-06-25T11:01:56.929Z",
					},
					_isValid: true,
				},
				redeemedPromoCodes: [],
				_displayConditionsStatus: {},
				_historyIndexes: [0, 1, 2],
				_fallback: {
					file_id: "a457b225-af6c-4639-b73f-a48bb4fca325",
					s3ref: {
						bucket: "epilot-dev-user-content",
						key: "739224/temp/7cc28560-d394-4929-a83d-3c41080a3097/2025-06-25-13-01-fallback.json",
					},
				},
				source_type: "journey",
				source_id: "ff63cd30-51b0-11f0-8f22-59926e47cd36",
				source: {
					title: "Journey: Schufa Product Demo 25.06",
					href: "/app/journey-builder/journeys/ff63cd30-51b0-11f0-8f22-59926e47cd36",
				},
				is_data_valid: true,
				_id: "06060367-7d07-47e6-8940-b556190a121e",
				_org: "739224",
				_owners: [
					{
						org_id: "739224",
						user_id: "unknown",
					},
				],
				_created_at: "2025-06-25T11:02:04.146Z",
				_updated_at: "2025-06-25T11:02:18.705Z",
				_title: "Journey: Schufa Product Demo 25.06",
				_acl: {
					view: ["org_739224"],
					edit: ["org_739224"],
					delete: ["org_739224"],
				},
				_relations: [
					{
						entity_id: "2537046e-e632-4180-988a-cf9372da355b",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
					},
					{
						entity_id: "2b47a7ff-7632-4b51-96de-86bfc4ef29b6",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
					},
				],
				repeatable_relation_reverse: [],
			};

			// when
			const contact_entity = findContactEntity(submission);

			// then
			expect(contact_entity).toBeDefined();
		});

		it("should find the contact from an opportunity", () => {
			// given
			const opportunity = {
				_org: "739224",
				_schema: "opportunity",
				journey_data: {
					"Your Request Block": "sdf",
				},
				consents: {
					_isValid: true,
					Schufa: {
						agreed: true,
						topic: "Schufa",
						text: "Ich stimme der Bonitätsprüfung durch die SCHUFA zu.",
						time: "2025-07-08T14:48:53.375Z",
					},
				},
				source: {
					title: "Journey: Schufa Product Demo 25.06",
					href: "/app/journey-builder/journeys/ff63cd30-51b0-11f0-8f22-59926e47cd36",
				},
				opportunity_title: "Schufa Product Demo 25.06",
				_id: "149957e9-35ad-4755-a989-9f931de98fdf",
				_created_at: "2025-07-08T14:49:21.999Z",
				_owners: [
					{
						org_id: "739224",
					},
				],
				opportunity_number: "OP-6382",
				_title: "Schufa Product Demo 25.06",
				_acl: {
					view: ["org_739224"],
					edit: ["org_739224"],
					delete: ["org_739224"],
				},
				customer: [
					{
						_id: "78a51fdd-b3c9-4e4a-8b5e-cb1a10a5e709",
						_org: "739224",
						_schema: "contact",
						email: [
							{
								email: "s.sauerer+test@epilot.cloud",
								_id: "Brcku0z3VbeYy8U77byr1",
							},
						],
						last_name: "Sauer",
						first_name: "Seb",
						_created_at: "2025-07-08T14:49:16.649Z",
						_owners: [
							{
								org_id: "739224",
							},
						],
						ausweisverlaengerung_freigeschaltet: "Nein",
						_title: "Seb Sauer",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
						consent_email_marketing: {
							status: "unknown",
							identifiers: [
								{
									identifier: "s.sauerer+test@epilot.cloud",
									status: "unknown",
									events: [],
								},
							],
						},
						consent_sms_marketing: {
							status: "unknown",
							identifiers: [],
						},
						consent_phone_call: {
							status: "unknown",
							identifiers: [],
						},
						consent_print_marketing: {
							status: "unknown",
							identifiers: [
								{
									identifier: "78a51fdd-b3c9-4e4a-8b5e-cb1a10a5e709",
									status: "unknown",
									events: [],
								},
							],
						},
						_updated_at: "2025-07-08T14:49:38.920Z",
						$relation: {
							entity_id: "78a51fdd-b3c9-4e4a-8b5e-cb1a10a5e709",
							_tags: [],
						},
					},
				],
				_updated_at: "2025-07-08T14:49:42.086Z",
				_relations: [
					{
						entity_id: "1f64e58d-c2ac-48d4-8d90-24830a9a9757",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
					},
					{
						entity_id: "78a51fdd-b3c9-4e4a-8b5e-cb1a10a5e709",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
					},
					{
						entity_id: "ab7d9e1c-d794-4b6b-a43b-76d5146d440c",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
					},
				],
				_messages: {
					total_messages: 1,
					last_message_time: "2025-07-08T14:49:37.952Z",
					unread_count: 0,
				},
			};

			// when
			const contact_entity = findContactEntity(opportunity);

			// then
			expect(contact_entity).toEqual(
				expect.objectContaining({
					last_name: "Sauer",
					first_name: "Seb",
				}),
			);
		});

		it("should find the contact from an order", () => {
			// given
			const order = {
				billing_first_name: "David",
				billing_last_name: "Munoz",
				billing_phone: "123456",
				billing_email: "d.munoz@epilot.cloud",
				currency: "EUR",
				_files: [],
				status: "placed",
				source_type: "journey",
				payment_method: [],
				additional_addresses: [],
				billing_address: [],
				delivery_address: [],
				tags: [],
				metadata: [
					{
						key: "_origin",
						value: "journey checkout",
					},
				],
				_tags: ["unsorted-price-labels:this-is-a-price-label"],
				line_items: [],
				prices: [],
				products: [],
				amount_subtotal: 1048,
				amount_total: 1048,
				amount_tax: 0,
				total_details: {},
				_schema: "order",
				_id: "7a0b0dd2-5a47-4d5f-822b-6025e08d74ba",
				_org: "739224",
				_owners: [
					{
						org_id: "739224",
						user_id: "unknown",
					},
				],
				_created_at: "2025-07-10T13:34:06.432Z",
				_updated_at: "2025-07-10T13:34:10.921Z",
				order_number: "OR-5211",
				source: {
					href: null,
					source_type: "manual",
					title: "manual",
				},
				_title: "OR-5211",
				_acl: {
					view: ["org_739224"],
					edit: ["org_739224"],
					delete: ["org_739224"],
				},
				customer: [
					{
						_id: "cc523084-8284-417d-b322-efda7109a643",
						_org: "739224",
						_schema: "contact",
						email: [
							{
								_tags: [],
								email: "d.munoz@epilot.cloud",
								_id: "F4SH77xA1i019s0DNqL6D",
							},
						],
						payment: [
							{
								_tags: [],
								_id: "1ddBBrbZWuUKH_407vtMH",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "mDhvSJjYBhHjTNvkDQhIM",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "F82F9P0hADpjpYlLPCx5c",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "NLZ5pDtbruXxEz9Wse1Hs",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "1RX0evxEweLg1mAQw6oYi",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "x7SmwE8rdXRQqGfsXIZd9",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "NpLvQTTF7eZuoGnq-jJAb",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "xdT0RlKEpyBqb4Ex9Dg5j",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "1cRwrUiOileL7tJLkHfoJ",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "fWTaM9xR73KDjUz99WraO",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "aer-unzpTTKDWO19OD2lo",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "FtRjo6D6FZwfdDKJGC7Mm",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "rixVzsv4dqtYgcsBlJIUW",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "OE76oD1BRAeh9fo22sDdo",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "_Sk-fGhfKgFBK7hgY1kyF",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "nbdQmVa0Clh9F8vjuR4md",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "svWJgvcJvBfNSWII3rLih",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "QYxZBxrS0_EB7iZG3nQ7m",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "_wi-eZ-6ZD7CMHQwI47h0",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "B3zARtAheLGdsF4Q-jhVe",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "2WpaX18_Orq0fhLE7Up-9",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "9c_LiP5Py8453BYijul4d",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "wh6CZ7hQPlizj11Gxf88E",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "p7Y2qkCJ4SmWPQkZF3MDe",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "GrIUqTFAkjoZjcl_9a9pr",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "1bKaxz-Wc5L_2Ux0E1yrr",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "4NfpvMZnMcYpHeCivAl21",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "AvUFNIvAGNaWkec8kZT7G",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "scveF8NQ1Vw4RXKhYlAcC",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "yb3mfjOy9LoWlCE4-bglK",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "ftv4-GLThT2Zzf4vRyVm5",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "sRH5L6xNcs8iiP1t-c2cJ",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "5UCUOj_sr6DkE82vDypVT",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "lAGGNA_Ug4DiP7nBBqagG",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "lGPVGtKIrE1SmRwxmRZ8I",
								type: "payment_invoice",
							},
							{
								_tags: [],
								_id: "rRT87KvtV64iYyYU11iW6",
								type: "payment_invoice",
							},
						],
						birthdate: "1991-12-27T00:00:00.000Z",
						last_name: "Munoz",
						first_name: "David",
						address: [
							{
								country: "DE",
								city: "Velbert",
								_tags: ["Other"],
								additional_info: "asdf",
								street: "",
								street_number: "",
								_id: "Rl1cVqP-ibe1ntoarsvyS",
								postal_code: "42553",
								plot_area: "Area",
								plot_of_land: "Land",
							},
							{
								country: "DE",
								city: "Velbert",
								_tags: ["billing", "delivery"],
								street: "Am Hugenbusch",
								street_number: "11",
								_id: "4-dTfT2CnQdSou5IQmAvS",
								postal_code: "42553",
								additional_info: "",
								plot_area: "",
							},
							{
								country: "DE",
								city: "Euskirchen",
								street: "Alte Gerberstr.",
								street_number: "42",
								_tags: ["delivery", "billing"],
								_id: "Jd4Z1S5CnnAdjRYf9NyeJ",
								postal_code: "53879",
							},
							{
								country: "DE",
								city: "Velbert",
								_tags: ["billing", "delivery"],
								street: "Am Hugenbusch",
								street_number: "1",
								_id: "3ioq-kQ3bXKKmzXTMQ1gl",
								postal_code: "42553",
							},
							{
								country: "DE",
								city: "Velbert",
								_tags: ["delivery"],
								plot_area: "Area 1",
								plot_of_land: "Land 1",
								_id: "8XV8TrixXJW0U0G8uM-ab",
								postal_code: "42553",
							},
						],
						phone: [
							{
								phone: "123456",
								_id: "_b8pfZYcabhMUsIyMkQQk",
							},
							{
								phone: "1234567",
								_id: "gXoBIRBItc3lQTHeqh_NT",
							},
						],
						_created_at: "2022-11-15T09:01:00.719Z",
						_title: "David Munoz",

						salutation: "Mr.",
						_purpose: [],
						_owners: [
							{
								org_id: "739224",
							},
						],
						_acl: {
							view: ["org_739224", "org_911215"],
							edit: ["org_739224", "org_911215"],
							delete: ["org_739224", "org_911215"],
						},
						_acl_sync: "2025-03-28T04:51:53.993Z",
						_files: {
							$relation: [
								{
									entity_id: "1c620745-f7c9-49ff-ab22-7238650733cc",
								},
								{
									entity_id: "aea2e463-c254-4d70-9f23-0d0e10322b99",
								},
								{
									entity_id: "d295d81a-cae9-4d72-8273-834d5ff6d1ef",
								},
							],
						},
						title: "Prof. Dr.",
						contract: {
							$relation: [
								{
									entity_id: "33029197-bb4f-4d77-9f57-24272dfdaca0",
									_schema: "contract",
									_tags: [],
								},
								{
									entity_id: "cb739803-5429-4047-a349-c492c9731bba",
									_schema: "contract",
									_tags: [],
								},
							],
						},
						contracts: {
							$relation: [
								{
									entity_id: "cb739803-5429-4047-a349-c492c9731bba",
									_schema: "contract",
									_tags: [],
								},
								{
									entity_id: "76828435-2429-4063-b48c-2156a4f00e73",
									_schema: "contract",
									_tags: [],
								},
							],
						},
						ausweisverlaengerung_freigeschaltet: "Nein",
						_updated_at: "2025-07-10T13:33:53.913Z",
						$relation: {
							entity_id: "cc523084-8284-417d-b322-efda7109a643",
						},
					},
				],
				_relations: [
					{
						entity_id: "2d42f924-51ba-4572-af66-67c3cbd86d9f",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
					},
					{
						entity_id: "77855f9b-1ce4-4cfb-9356-326ca5054a82",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
					},
					{
						entity_id: "85b4427f-892f-484d-95de-6d7c10ee73ca",
						_acl: {
							view: ["org_739224", "org_911482"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
					},
					{
						entity_id: "c4294ed3-b077-45a6-b781-a1e0348b9d49",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
					},
					{
						entity_id: "cc523084-8284-417d-b322-efda7109a643",
						_acl: {
							view: ["org_739224", "org_911215"],
							edit: ["org_739224", "org_911215"],
							delete: ["org_739224", "org_911215"],
						},
					},
					{
						entity_id: "cc58698b-0fb1-40d9-9afd-9820ef27a555",
						_acl: {
							view: ["org_739224"],
							edit: ["org_739224"],
							delete: ["org_739224"],
						},
					},
				],
			};

			// when
			const contact_entity = findContactEntity(order);

			// then
			expect(contact_entity).toBeDefined();
		});

		it("should return undefined for missing contacts from an opportunity", () => {
			// given
			const opportunity = {
				_org: "739224",
				_schema: "opportunity",
				journey_data: {
					"Your Request Block": "sdf",
				},
				consents: {
					_isValid: true,
					Schufa: {
						agreed: true,
						topic: "Schufa",
						text: "Ich stimme der Bonitätsprüfung durch die SCHUFA zu.",
						time: "2025-07-08T14:48:53.375Z",
					},
				},
				source: {
					title: "Journey: Schufa Product Demo 25.06",
					href: "/app/journey-builder/journeys/ff63cd30-51b0-11f0-8f22-59926e47cd36",
				},
				opportunity_title: "Schufa Product Demo 25.06",
				_id: "149957e9-35ad-4755-a989-9f931de98fdf",
				_created_at: "2025-07-08T14:49:21.999Z",
				_owners: [
					{
						org_id: "739224",
					},
				],
				opportunity_number: "OP-6382",
				_title: "Schufa Product Demo 25.06",
				_acl: {
					view: ["org_739224"],
					edit: ["org_739224"],
					delete: ["org_739224"],
				},
				_updated_at: "2025-07-08T14:49:42.086Z",
			};

			// when
			const contact_entity = findContactEntity(opportunity);

			// then
			expect(contact_entity).toBeUndefined();
		});
	});

	describe("updateContactWithSchufaScore", () => {
		it("should throw a VisibileError when contact was not updated", async () => {
			// given
			const contact = {
				_id: "cc523084-8284-417d-b322-efda7109a643",
				_org: "739224",
				_schema: "contact",
				_updated_at: "2025-07-10T13:33:53.913Z",
				email: [],
				birthdate: "1991-12-27T00:00:00.000Z",
				last_name: "Munoz",
				first_name: "David",
				address: [],
				phone: [],
				_created_at: "2022-11-15T09:01:00.719Z",
				_title: "David Munoz",

				salutation: "Mr.",
				_purpose: [],
				_owners: [
					{
						org_id: "739224",
					},
				],
				_acl: {
					view: ["org_739224", "org_911215"],
					edit: ["org_739224", "org_911215"],
					delete: ["org_739224", "org_911215"],
				},
			};

			const mockClient = {
				patchEntity: vi.fn().mockRejectedValue(
					new AxiosError(
						"Forbidden",
						"403",
						undefined,
						{},
						{
							status: 403,
							statusText: "Forbidden",
							data: { message: "Access denied" },
							headers: {},
							// @ts-ignore
							config: { headers: {} },
						},
					),
				),
				// biome-ignore lint/suspicious/noExplicitAny: mock
			} as any;

			mockGetEntityClient.mockReturnValue(mockClient);

			// when
			await expect(
				updateContactWithSchufaScore({
					access_token: "",
					contact,
					schufa_score: {},
				}),
			).rejects.toThrow("Der Kontakt konnte nicht aktualisiert werden");
		});
	});
});
