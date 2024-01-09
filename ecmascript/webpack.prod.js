import { resolve } from 'path';
import { merge } from 'webpack-merge';
import config from './webpack.config.js';

export default merge(config, {
  mode: 'production',
  output: {
    ...config.output,
    filename: '[name].echo-d.min.js',
    path: resolve(config.output.path, '..', 'prod'),
  },
});