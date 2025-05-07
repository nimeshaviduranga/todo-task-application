export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.css$': '<rootDir>/src/mocks/styleMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
};