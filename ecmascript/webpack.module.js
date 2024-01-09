import { resolve } from 'path';
import { merge } from 'webpack-merge';
import config from './webpack.config.js';

const moduleConfig = merge(config, {
  // target: 'node',
  experiments: {
    outputModule: true,
  },
  output: {
    ...config.output,
    chunkFormat: 'module',
    environment: {
      dynamicImport: true,
      module: true,
    },
    filename: '[name].echo-d.js',
    libraryTarget: 'module',
    module: true,
    path: resolve(config.output.path, '..', 'module'),
  },
});

// webpack config for module requires library name be undefined
delete moduleConfig.output.library

export default moduleConfig;