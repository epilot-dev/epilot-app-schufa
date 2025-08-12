import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			include: ["src/**/*"],
			provider: "v8",
			reporter: ["text-summary", "html", "cobertura"],
		},
		fileParallelism: false,
		globals: true,
		outputFile: "test-report.xml",
		reporters: ["default", "junit"],
		silent: true,
		watch: false,
	},
});
