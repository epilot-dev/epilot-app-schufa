import { describe, expect, it } from "vitest";
import { maskClientId } from "./auth";

describe("maskClientId", () => {
	it("keeps only the last 4 characters", () => {
		expect(maskClientId("epilot-werk35-a1b2c3d4")).toBe(
			"******************c3d4",
		);
	});

	it("fully masks short values", () => {
		expect(maskClientId("abcd")).toBe("****");
		expect(maskClientId("ab")).toBe("****");
	});

	it("marks missing values", () => {
		expect(maskClientId(undefined)).toBe("MISSING");
		expect(maskClientId("")).toBe("MISSING");
	});
});
