import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: 'development',
  target: 'web',
  entry: {
    lib: './lib/index.js',
    becsy: {
      import: './lib/extra/storage/becsy.js',
      dependOn: 'lib',
    },
    bitecs: {
      import: './lib/extra/storage/bitecs.js',
      dependOn: 'lib',
    },
    miniplex: {
      import: './lib/extra/storage/miniplex.js',
      dependOn: 'lib',
    },
    runloop: {
      import: './lib/extra/runloop.js',
      dependOn: 'lib',
    },
    system: {
      import: './lib/extra/system.js',
      dependOn: 'lib',
    },
  },
  output: {
    clean: true,
    filename: '[name].echo-d.js',
    globalObject: 'typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this',
    library: "echoD",
    libraryTarget: "umd",
    path: resolve(__dirname, 'dist', 'dev'),
  },
  devtool: 'source-map',
  // devtool: 'inline-source-map',
};
