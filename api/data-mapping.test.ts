import { mapToPersonalDataOrThrow } from "./data-mapping";
import { VisibleError } from "./errors";

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

beforeEach(() => {
	vi.clearAllMocks();
	vi.resetAllMocks();
});
describe("mapToPersonalDataOrThrow", () => {
	describe("basic functionality", () => {
		it("should throw an error for invalid data", () => {
			// given
			const entity = {
				_id: "",
				_schema: "contact",
				_org: "org123",
				_title: "",
				_created_at: "",
				_updated_at: "",
			};

			// then
			const result = mapToPersonalDataOrThrow(entity);

			expect(result.data).toBeUndefined();
			expect(result.error).toBeDefined();
		});

		it("should map a valid minimal entity", () => {
			const entity = {
				_id: "1",
				_org: "org",
				_schema: "contact",
				_title: "",
				_created_at: "",
				_updated_at: "",
				first_name: "Peter", // matches SCHUFA_TEST_DATA
				last_name: "Lustig", // matches SCHUFA_TEST_DATA
				salutation: "Mr.",
				address: [
					{
						street: "Main St",
						street_number: "1",
						postal_code: "12345",
						city: "Berlin",
						country: "DE",
					},
				],
			};
			const { data } = mapToPersonalDataOrThrow(entity);
			expect(data).toMatchObject({
				firstName: "Peter",
				lastName: "Lustig",
				gender: "MALE",
				addresses: {
					currentAddress: {
						streetWithNumber: "Main St 1",
						postalCode: "12345",
						city: "Berlin",
						country: "DEU",
					},
				},
			});
		});

		it("should throw if address is missing", () => {
			const entity = {
				_id: "2",
				_org: "org",
				_schema: "contact",
				_title: "",
				_created_at: "",
				_updated_at: "",
				first_name: "",
				last_name: "",
				salutation: "Mr.",
			};
			const { error } = mapToPersonalDataOrThrow(entity);
			expect(error).toBeDefined();
		});

		it("should throw if first or last name is missing", () => {
			const entity = {
				_id: "3",
				_org: "org",
				_schema: "contact",
				_title: "",
				_created_at: "",
				_updated_at: "",
				address: [
					{
						street: "Main St",
						street_number: "1",
						postal_code: "12345",
						city: "Berlin",
						country: "DEU",
					},
				],
			};

			const { error } = mapToPersonalDataOrThrow(entity);
			expect(error).toBeDefined();
			expect(error?.issues).toEqual([
				{
					code: "invalid_type",
					expected: "string",
					message: "Invalid input: expected string, received undefined",
					path: ["firstName"],
				},
				{
					code: "invalid_type",
					expected: "string",
					message: "Invalid input: expected string, received undefined",
					path: ["lastName"],
				},
			]);
		});

		it("should map salutation to gender", () => {
			const base = {
				_id: "4",
				_org: "org",
				_schema: "contact",
				_title: "",
				_created_at: "",
				_updated_at: "",
				first_name: "Peter",
				last_name: "Parker",
				address: [
					{ street: "s", street_number: "1", postal_code: "12345", city: "c" },
				],
			};
			const { data: male } = mapToPersonalDataOrThrow({
				...base,
				salutation: "Mr.",
			});

			expect(male?.gender).toBe("MALE");
			const { data: female } = mapToPersonalDataOrThrow({
				...base,
				salutation: "Ms. / Mrs.",
			});
			expect(female?.gender).toBe("FEMALE");
			const { data: unknown } = mapToPersonalDataOrThrow({
				...base,
				salutation: "Other",
			});
			expect(unknown?.gender).toBe("UNKNOWN");
		});

		it("should throw VisibleError if test user not found", () => {
			mockStage.mockReturnValue("dev");
			const entity = {
				_id: "5",
				_org: "org",
				_schema: "contact",
				_title: "",
				_created_at: "",
				_updated_at: "",
				first_name: "NotInTest", // does not match SCHUFA_TEST_DATA
				last_name: "User", // does not match SCHUFA_TEST_DATA
				salutation: "Mr.",
				address: [
					{
						street: "Main St",
						street_number: "1",
						postal_code: "12345",
						city: "Berlin",
						country: "DEU",
					},
				],
			};
			expect(() => mapToPersonalDataOrThrow(entity)).toThrow(VisibleError);
		});

		it("should use test mock data in non-production environments", () => {
			mockStage.mockReturnValue("dev");

			const entity = {
				_id: "5",
				_org: "org",
				_schema: "contact",
				_title: "",
				_created_at: "",
				_updated_at: "",
				first_name: "ERNST",
				last_name: "MACH",
				dateOfBirth: "1965-04-03",
				address: [
					{
						street: "JULIUSSTR.",
						street_number: "3",
						postal_code: "60487",
						city: "Frankfurt",
						country: "DE",
					},
				],
			};

			const { data } = mapToPersonalDataOrThrow(entity);

			expect(data).toMatchObject({
				firstName: "ERNST",
				lastName: "MACH",
				gender: "UNKNOWN",
				dateOfBirth: "1965-04-03",
				addresses: {
					currentAddress: {
						streetWithNumber: "JULIUSSTR. 3",
						postalCode: "60487",
						city: "Frankfurt",
						country: "DEU",
					},
				},
			});
		});

		it("should handle optional fields", () => {
			const entity = {
				_id: "6",
				_org: "org",
				_schema: "contact",
				_title: "",
				_created_at: "",
				_updated_at: "",
				first_name: "Peter",
				last_name: "Parker",
				salutation: "Mr.",
				dateOfBirth: "2000-01-01",
				title: "Dr.",
				placeOfBirth: "Munich",
				address: [
					{
						street: "Main St",
						street_number: "1",
						postal_code: "12345",
						city: "Berlin",
						country: "DEU",
					},
				],
			};
			const { data } = mapToPersonalDataOrThrow(entity);
			expect(data?.dateOfBirth).toBe("2000-01-01");
			expect(data?.title).toBe("Dr.");
			expect(data?.placeOfBirth).toBe("Munich");
		});
	});

	describe("acceptance testing", () => {
		it("Scenario 1: Long names get cut of at their max char size limit: [firstName at 44, lastName at 46]", () => {
			// given
			const contact = {
				salutation: "Mr.",
				first_name:
					"Karl-Theodor-Mariä-Nikolaus-Johann-Jacob-Philipp zu Guttenberg",
				last_name: "SchnittstellenErmöglichenDieKommunikationZwischenSystemen",
				birthdate: "1950-01-01",
				address: [
					{
						_id: "z4oCmq-NCc8RwYOdWhuh-",
						_tags: [],
						street: "Bildwiesenweg",
						zip: "",
						city: "Michelbach an der Bilz Gschlachtenbretzingen-Ost",
						country: null,
						postal_code: 74544,
						street_number: "24",
					},
				],
				_schema: "contact",
				_id: "7dc59c44-b6d1-4b28-af34-b9557b22ff45",
				_org: "739224",
				_owners: [
					{
						org_id: "739224",
						user_id: "unknown",
					},
				],
				_created_at: "2025-06-26T17:48:46.680Z",
				_updated_at: "2025-06-27T06:21:12.180Z",
				_title:
					"Karl-Theodor-Mariä-Nikolaus-Johann-Jacob-Philipp zu Guttenberg SchnittstellenErmöglichenDieKommunikationZwischenSystemen",
			};

			// when
			const result = mapToPersonalDataOrThrow(contact);

			// then
			expect(result.error).toBeUndefined();
			expect(result.data).toEqual({
				addresses: {
					currentAddress: {
						city: "Michelbach an der Bilz Gschlachtenbretzingen",
						country: undefined,
						postalCode: "74544",
						streetWithNumber: "Bildwiesenweg 24",
					},
					previousAddress: undefined,
				},
				dateOfBirth: "1950-01-01",
				firstName: "Karl-Theodor-Mariä-Nikolaus-Johann-Jacob-Phi",
				gender: "MALE",
				lastName: "SchnittstellenErmöglichenDieKommunikationZwisc",
				placeOfBirth: undefined,
				title: undefined,
			});
		});

		it("Scenario 2: Long streetNames get cut of at max char limit", () => {
			// given
			const contact = {
				salutation: "Mr.",
				first_name: "Simon",
				last_name: "Theß",
				birthdate: "1970-01-01",
				address: [
					{
						_id: "pzDZrKaPbnpDeJcONJ_tt",
						_tags: [],
						street: "Bischoeflich-Geistlicher-Rat-Josef-Zinnbauer Strasse",
						zip: "",
						city: "Dingolfing",
						country: null,
						postal_code: "84130",
						street_number: "24",
					},
				],
				_schema: "contact",
				_id: "d24ae29b-3870-465b-93a7-2a3eeee9f8df",
				_org: "739224",
				_owners: [
					{
						org_id: "739224",
						user_id: "unknown",
					},
				],
				_created_at: "2025-06-26T17:48:51.826Z",
				_updated_at: "2025-06-26T18:59:04.776Z",
				_title: "Simon Theß",
				place_of_birth: "Abnahme TDS B2C",
			};

			// when
			const result = mapToPersonalDataOrThrow(contact);

			// then
			expect(result.error).toBeUndefined();
			expect(result.data).toEqual({
				addresses: {
					currentAddress: {
						city: "Dingolfing",
						country: undefined,
						postalCode: "84130",
						streetWithNumber: "Bischoeflich-Geistlicher-Rat-Josef-Zinnbauer S",
					},
					previousAddress: undefined,
				},
				dateOfBirth: "1970-01-01",
				firstName: "Simon",
				gender: "MALE",
				lastName: "Theß",
				placeOfBirth: "Abnahme TDS B2C",
				title: undefined,
			});
		});

		it("Scenario 3: Correct contact mapping", () => {
			// given
			const contact = {
				salutation: "Ms. / Mrs.",
				first_name: "Manuela Elfi",
				last_name: "Schnittstellentest",
				birthdate: "1977-07-07",
				address: [
					{
						_id: "VOOLvhqcPk3Cs61ryi3P0",
						_tags: [],
						street: "Christian-Ritter-von-Langheinrich-Straße",
						zip: "",
						city: "Bayreuth",
						country: null,
						postal_code: "95448",
						street_number: "10",
					},
				],
				_schema: "contact",
				_id: "b88aa1f6-e055-4a0e-9ba7-2396931db685",
				_org: "739224",
				_owners: [
					{
						org_id: "739224",
						user_id: "unknown",
					},
				],
				_created_at: "2025-06-26T17:48:50.494Z",
				_updated_at: "2025-06-26T19:01:22.328Z",
				_title: "Manuela Elfi Schnittstellentest",
			};

			// when
			const result = mapToPersonalDataOrThrow(contact);

			// then
			expect(result.error).toBeUndefined();
			expect(result.data).toEqual({
				addresses: {
					currentAddress: {
						city: "Bayreuth",
						country: undefined,
						postalCode: "95448",
						streetWithNumber: "Christian-Ritter-von-Langheinrich-Straße 10",
					},
					previousAddress: undefined,
				},
				dateOfBirth: "1977-07-07",
				firstName: "Manuela Elfi",
				gender: "FEMALE",
				lastName: "Schnittstellentest",
				placeOfBirth: undefined,
				title: undefined,
			});
		});

		it("Scenario 4: Invalid birthday falls back to being ignored", () => {
			// given
			const contact = {
				first_name: "Świętą Łůcję",
				last_name: "Schnittstellentest",
				birthdate: "00.00.0000",
				address: [
					{
						_id: "5_gVCrILG2j4rcPkVN8LX",
						_tags: [],
						street: "Annaberger Straße",
						zip: "",
						city: "Chemnitz",
						country: null,
						postal_code: "09120",
						street_number: "89",
					},
				],
				_schema: "contact",
				_id: "02357768-9f8e-417a-869e-acbe3f7e2f36",
				_org: "739224",
				_owners: [
					{
						org_id: "739224",
						user_id: "unknown",
					},
				],
				_created_at: "2025-06-26T17:48:49.151Z",
				_updated_at: "2025-06-27T05:21:32.750Z",
				ausweisverlaengerung_freigeschaltet: "Nein",
				_title: "Świętą Łůcję Schnittstellentest",
			};

			// when
			const result = mapToPersonalDataOrThrow(contact);

			// then
			expect(result.error).toBeUndefined();
			expect(result.data).toEqual({
				addresses: {
					currentAddress: {
						city: "Chemnitz",
						country: undefined,
						postalCode: "09120",
						streetWithNumber: "Annaberger Straße 89",
					},
					previousAddress: undefined,
				},
				dateOfBirth: undefined,
				firstName: "Świętą Łůcję",
				gender: "UNKNOWN",
				lastName: "Schnittstellentest",
				placeOfBirth: undefined,
				title: undefined,
			});
		});

		it("Scenario 5: Current address not in germany", () => {
			// given
			const contact = {
				salutation: "Mr.",
				first_name: "André",
				last_name: "SchnittstellentestDonnées",
				birthdate: "1970-04-30",
				address: [
					{
						_id: "PO5SxUctwXUbRWqRaiv17",
						_tags: [],
						street: "Edifício Amarilis Praia da Rocha Avenida",
						zip: "",
						city: "Portimaó",
						country: "PRT",
						postal_code: "8500-801",
						street_number: "V3",
					},
				],
				_schema: "contact",
				_id: "a10fe354-3312-4807-9b00-6f0c790311fb",
				_org: "739224",
				_owners: [
					{
						org_id: "739224",
						user_id: "unknown",
					},
				],
				_created_at: "2025-06-26T17:48:47.769Z",
				_updated_at: "2025-06-27T06:09:00.411Z",
				_title: "André SchnittstellentestDonnées",
			};

			// when
			const result = mapToPersonalDataOrThrow(contact);

			// then
			expect(result.data).toBeUndefined();
			expect(result.error?.issues).toEqual([
				{
					code: "too_big",
					exact: true,
					inclusive: true,
					maximum: 5,
					message: "Die PLZ muss genau 5 Zeichen lang sein",
					origin: "string",
					path: ["addresses", "currentAddress", "postalCode"],
				},
				{
					code: "invalid_value",
					message: 'Invalid input: expected "DEU"',
					path: ["addresses", "currentAddress", "country"],
					values: ["DEU"],
				},
			]);
		});

		it("Scenario 6: Invalid postal code (only 5 digits allowed in GER)", () => {
			// given
			const contact = {
				salutation: "Mr.",
				first_name: "André",
				last_name: "SchnittstellentestDonnées",
				birthdate: "1970-04-30",
				address: [
					{
						_id: "PO5SxUctwXUbRWqRaiv17",
						_tags: [],
						street: "Babostrasse",
						zip: "",
						city: "Frankfurt",
						postal_code: "8500",
						street_number: "3",
					},
				],
				_schema: "contact",
				_id: "a10fe354-3312-4807-9b00-6f0c790311fb",
				_org: "739224",
				_owners: [
					{
						org_id: "739224",
						user_id: "unknown",
					},
				],
				_created_at: "2025-06-26T17:48:47.769Z",
				_updated_at: "2025-06-27T06:09:00.411Z",
				_title: "André SchnittstellentestDonnées",
			};

			// when
			const result = mapToPersonalDataOrThrow(contact);

			// then
			expect(result.data).toBeUndefined();
			expect(result.error?.issues).toEqual([
				{
					code: "too_small",
					minimum: 5,
					exact: true,
					inclusive: true,
					message: "Die PLZ muss genau 5 Zeichen lang sein",
					origin: "string",
					path: ["addresses", "currentAddress", "postalCode"],
				},
			]);
		});
	});
});
