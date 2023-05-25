
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: "test",
  // globals: {
  //   'ts-jest': {
  //     isolatedModules: true
  //   }
  // },
  maxWorkers: 1,
};
