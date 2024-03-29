/** @type {import('jest').Config} */
const config = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/setupJest.ts"
  ],
  transformIgnorePatterns: [
    "^.+\\.js$"
  ]
};

module.exports = config;
