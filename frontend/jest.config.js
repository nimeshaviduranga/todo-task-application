export default {
  testEnvironment: 'jsdom',
  transform: {},
  extensionsToTreatAsEsm: ['.jsx', '.js'],
  moduleNameMapper: {
    '^.+\\.css$': '<rootDir>/src/mocks/styleMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
};