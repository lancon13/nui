// vite.config.js
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
    plugins: [
        vue(),
        svgLoader(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/fonts',
                    dest: ''
                }
            ]
        })
    ],
    build: {
        emptyOutDir: false,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'WhispliUI',
            // ADD the formats you want to build
            formats: ['es', 'umd'],
            // FIX the file naming to match your package.json
            fileName: (format) => {
                if (format === 'es') return 'wds-ui.js'
                if (format === 'umd') return 'wds-ui.umd.cjs'
                return `wds-ui.${format}.js`
            },
        },
        rollupOptions: {
            // This is correct! Ensures you don't bundle Vue into your library.
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
                // This is correct! Puts all CSS into one file.
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.endsWith('.css'))
                        return 'components.css'

                    return assetInfo.name || '[name].[ext]'
                },
            },
        },
    },
})
