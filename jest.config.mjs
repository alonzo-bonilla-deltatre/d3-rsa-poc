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
    "!**/*Wrapper.{ts,tsx}"
  ],
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "../coverage",
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/helpers/(.*)$': '<rootDir>/helpers/$1',
    '^@/models/(.*)$': '<rootDir>/models/$1',
    '^@/services/(.*)$': '<rootDir>/services/$1',
    '^@/utilities/(.*)$': '<rootDir>/utilities/$1',
  },
  resetMocks: true,
  reporters: ["default"],
  testMatch: ['**/*.test.{ts,tsx}'],
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ["/node_modules/"],
  transform: {},
  testEnvironment: "jsdom"
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)