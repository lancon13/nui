import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({
            include: ['src'],
            rollupTypes: true
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'NUIHelpers',
            formats: ['es'],
            fileName: 'index'
        },
        rollupOptions: {
            external: ['vue', '@vueuse/core', 'dayjs', 'es-toolkit', 'es-toolkit/compat', 'zod', /^dayjs\/plugin\//],
            output: {
                globals: {
                    vue: 'Vue',
                    '@vueuse/core': 'VueUse',
                    dayjs: 'dayjs',
                    'es-toolkit': 'esToolkit',
                    zod: 'zod'
                }
            }
        }
    }
})
