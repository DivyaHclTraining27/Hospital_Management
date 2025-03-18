import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/__tests__/__mocks__",
    "src/components/*.{ts, tsx}",
  ],
  // coverageDirectory:
  // process.env.TEST_ENV === "API" ? "api-coverage" : "coverage",
  coverageProvider: "v8",
  testEnvironment: process.env.TEST_ENV === "API" ? "node" : "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.css$": "<rootDir>/src/__test__/__mocks__/styleMock.ts",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", // for frontend
    // "!src/**/*.d.ts", // Exclude declaration files
    // "!src/**/index.ts", // Exclude index files if needed
  ],
  coverageReporters: ["text", "html", "lcov"],
  moduleDirectories: ["node_modules", "<rootDir>"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
