/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts", // ✅ enables TS + JSX transformation
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // ✅ routes .ts and .tsx to ts-jest
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json", // ✅ ensures ts-jest uses your TS config
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js|jsx)",
    "**/?(*.)+(spec|test).(ts|tsx|js|jsx)",
  ],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
