module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.test.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  roots: ['./tests'],
  moduleFileExtensions: ["node", "js"],
  testTimeout: 500000
};
