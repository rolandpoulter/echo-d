import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import jestConfig from './jest.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  ...jestConfig,

  // rootDir: join(__dirname, 'test', 'env', 'web'),

  testMatch: [
    '**/test/env/web/**/*test.{js,mjs,cjs,jsx}'
  ],

  preset: "jest-puppeteer",
};

delete config.testEnvironment;

export default config;
