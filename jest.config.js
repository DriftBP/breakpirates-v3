module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/setupJest.ts"
  ],
  transformIgnorePatterns: [
    "^.+\\.js$"
  ],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs']
};
