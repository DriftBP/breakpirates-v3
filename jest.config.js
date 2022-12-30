/** @type {import('jest').Config} */
const config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    '<rootDir>/setupJest.ts'
  ],
  transformIgnorePatterns: [
    "^.+\\.js$"
  ],
  globalSetup: 'jest-preset-angular/global-setup',
};

module.exports = config;
