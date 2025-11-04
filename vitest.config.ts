import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        projects: [
            './ui/vitest.config.ts',
            './api/vitest.config.ts',
        ],
    }

})