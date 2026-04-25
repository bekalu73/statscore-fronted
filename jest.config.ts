import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(png|jpg|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^../lib/constants$': '<rootDir>/__mocks__/constants.js',
    '^../../lib/constants$': '<rootDir>/__mocks__/constants.js',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
};

export default config;
