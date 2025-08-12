import { sanitizeContact } from "./logger";

describe("Logger", () => {
	it("should sanitize contact fields", () => {
		// given
		const contact = undefined;

		// when
		const sanitized_contact = sanitizeContact(contact);

		// then
		expect(sanitized_contact).toBeUndefined();
	});

	it("should sanitize contact fields", () => {
		// given
		const contact = {
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
			_updated_at: "2025-07-10T13:33:53.913Z",
			$relation: {
				entity_id: "cc523084-8284-417d-b322-efda7109a643",
			},
		};

		// when
		const sanitized_contact = sanitizeContact(contact);

		// then
		expect(sanitized_contact?.first_name).toBe("REDACTED");
		expect(sanitized_contact?.last_name).toBe("REDACTED");
		expect(sanitized_contact?.email).toBe("REDACTED");
		expect(sanitized_contact?.phone).toBe("REDACTED");
		expect(sanitized_contact?.address).toBe("REDACTED");
	});
});
