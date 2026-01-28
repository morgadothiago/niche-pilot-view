import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist", "**/*.d.ts"],
    testTimeout: 10000,
    hookTimeout: 10000,
    reporters: ["default"],
    passWithNoTests: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "src/main.tsx",
        "src/vite-env.d.ts",
      ],
      thresholds: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },
    },
    // Retry failed tests once in CI
    retry: process.env.CI ? 1 : 0,
    // Better error output
    onConsoleLog: () => false,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
