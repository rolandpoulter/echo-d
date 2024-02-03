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

  watchAll: false,

  collectCoverage: true,

  coverageReporters: [
    'text',
    'json',
    'lcov',
    'clover',
    'cobertura',
    'html'
  ],
};

export default config;
