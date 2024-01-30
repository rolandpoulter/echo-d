const buildBrowser = () => Bun.build({
    entryPoints: [
        'src/index.ts'
    ],
    bundle: true,
    minify: true,
    sourcemap: 'external',
    target: 'browser',
    outdir: 'dist/bun',
    // naming: "[dir]/[name].[ext]"
    naming: {
        // default values
        entry: '[dir]/lib.echo-d.web.[ext]',
        chunk: '[name]-[hash].[ext]',
        asset: '[name]-[hash].[ext]',
    }
})

const buildNeutal = () => Bun.build({
    entryPoints: [
        'src/index.ts'
    ],
    bundle: true,
    platform: 'bun',
    // packages: 'external',
    // external: true,
    outdir: 'dist/bun',
    // naming: "[dir]/[name].[ext]"
    naming: {
        // default values
        entry: '[dir]/lib.echo-d.[ext]',
        chunk: '[name]-[hash].[ext]',
        asset: '[name]-[hash].[ext]',
    }
})

const isBrowser = !!process.env.BROWSER

console.log('Building for Bun...', isBrowser)

await (isBrowser ? buildBrowser() : buildNeutal())

console.log('Done.')

process.exit(0)