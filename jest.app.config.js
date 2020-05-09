const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/demo/src'],
  modulePaths: ['<rootDir>/dist'],
};
