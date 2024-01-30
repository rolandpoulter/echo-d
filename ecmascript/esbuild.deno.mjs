// import * as esbuild from 'esbuild'
import * as esbuild from 'https://deno.land/x/esbuild@v0.19.11/mod.js'

const buildBrowser = () => esbuild.build({
    entryPoints: [
        'src/index.ts'
    ],
    // watch: false,
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'browser',
    // target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    outfile: 'dist/deno/lib.echo-d.web.js',
})

const buildNeutral = () => esbuild.build({
    entryPoints: [
        'src/index.ts'
    ],
    // watch: false,
    bundle: true,
    platform: 'neutral',
    // platform: 'deno',
    // packages: 'external',
    outfile: 'dist/deno/lib.echo-d.js',
})

const isBrowser = Deno.env.get('BROWSWER')

console.log('Building for Deno...', isBrowser)

await (isBrowser ? buildBrowser() : buildNeutral())

// Build other
// await (!isBrowser ? buildBrowser() : buildNeutral())

console.log('Done.')

Deno.exit(0)