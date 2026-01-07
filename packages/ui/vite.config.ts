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
            name: 'NUI',
            // ADD the formats you want to build
            formats: ['es', 'umd'],
            // FIX the file naming to match your package.json
            fileName: format => {
                if (format === 'es') return 'nui-ui.js'
                if (format === 'umd') return 'nui-ui.umd.cjs'
                return `nui-ui.${format}.js`
            }
        },
        rollupOptions: {
            // Externalize dependencies to avoid bundling them
            external: [
                'vue',
                'vue-router',
                '@nui/helpers',
                '@floating-ui/vue',
                '@vueuse/core',
                '@vueuse/components',
                '@vueuse/integrations',
                '@vueuse/router',
                'async-validator',
                'dayjs',
                'es-toolkit',
                'es-toolkit/compat',
                'focus-trap',
                'vue-forward-slots',
                'vue-i18n',
                'zod'
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    'vue-router': 'VueRouter',
                    '@nui/helpers': 'NUIHelpers',
                    '@floating-ui/vue': 'FloatingVue',
                    '@vueuse/core': 'VueUse',
                    '@vueuse/components': 'VueUseComponents',
                    dayjs: 'dayjs',
                    zod: 'zod',
                    'focus-trap': 'FocusTrap'
                },
                // This is correct! Puts all CSS into one file.
                assetFileNames: assetInfo => {
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) return 'components.css'

                    return assetInfo.name || '[name].[ext]'
                }
            }
        }
    }
})
