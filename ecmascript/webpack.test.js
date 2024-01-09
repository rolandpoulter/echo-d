import { createRequire } from 'node:module';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlInlineScriptPlugin from 'html-inline-script-webpack-plugin';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpackMajorVersion = require('webpack/package.json').version.split('.')[0];

const templateContent = ({htmlWebpackPlugin}) =>
`<html>
  <head>
    ${htmlWebpackPlugin.tags.headTags}
  </head>
  <body>
    ${htmlWebpackPlugin.tags.bodyTags}
  </body>
</html>`

export default {
  mode: 'development',
  entry: {
    tester: './test/env/web/page/tester.js'
  },
  output: {
    clean: false,
    filename: '[name].echo-d.js',
    path: resolve(__dirname, 'test', 'env', 'web', 'page'),
    publicPath: ''
  },
  module: {
    rules: [
      // { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      // { test: /\.pug$/, loader: 'pug-loader' }
    ]
  },
  resolve: {
    fallback: {
      // constants: require.resolve('constants-browserify'),
      path: false, // require.resolve('path-browserify'),
      stream: false, // require.resolve('stream-browserify'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      cache: false,
      // favicon: 'favicon.ico',
      filename: 'tester.html',
      inject: false,
      // template: path.join(__dirname, 'test', 'env', 'web', 'page', 'template.pug'),
      templateContent,
      // title: 'pug demo'
    }),
    // new MiniCssExtractPlugin({ filename: 'styles.css' })
    new HtmlInlineScriptPlugin()
  ]
};