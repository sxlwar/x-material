const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/projects/x-material'],
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      'x-material': ['projects/x-material/src/public-api'],
    },
    { prefix: '<rootDir>/' }
  ),
};
