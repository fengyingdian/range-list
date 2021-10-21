const { default: tsjPreset } = require('ts-jest/presets');
module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/test/.*\\.(test|spec))\\.[tj]sx?$',
  moduleFileExtensions: [
    "js",
    "ts",
  ],
  moduleNameMapper: {
    '^@APP/(.*)$': '<rootDir>/test/$1'
  },
}