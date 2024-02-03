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

  reporters: [
    // 'default',
    ['jest-junit', {
      outputDirectory: join(__dirname, 'test', 'report'),
      outputName: 'jest-report.xml'
    }],
    ['github-actions', {silent: false}],
    'summary',
  ]
};

export default config;
