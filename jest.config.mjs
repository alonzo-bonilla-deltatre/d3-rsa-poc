import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  rootDir: './src',
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/coverage/**",
    "!**/app/**",
    "!**/models/**",
    "!**/*Wrapper.{ts,tsx}",
    "!**/*.tsx", // Components don't have tests
    "!**/*.stories.{ts,tsx,js,jsx}*",
    "!**/__mocks__/**"
  ],
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "../coverage",
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/helpers/(.*)$': '<rootDir>/helpers/$1',
    '^@/models/(.*)$': '<rootDir>/models/$1',
    '^@/services/(.*)$': '<rootDir>/services/$1',
    '^@/utilities/(.*)$': '<rootDir>/utilities/$1',
  },
  resetMocks: true,
  reporters: ["default"],
  setupFiles: ['./__mocks__/jest-setup.js'],
  testMatch: ['**/*.test.{ts,tsx}'],
  transformIgnorePatterns: ["/node_modules/"],
  transform: {},
  testEnvironment: "jsdom"
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)