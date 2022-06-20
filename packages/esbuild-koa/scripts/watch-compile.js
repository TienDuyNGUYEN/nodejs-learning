const esbuild = require('esbuild')
const fg = require('fast-glob')

const entryPoints = fg.sync(['src/**/*.[tj]s'])

esbuild
    .build({
            entryPoints,
            outdir: 'dist',
            platform: 'node',
            sourcemap: true,
            target: 'es2020',
            watch: true,
            format: 'cjs',
    })
    .catch(() => process.exit(1))