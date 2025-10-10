/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StorybookConfig } from '@storybook/vue3-vite'
import { resolve } from 'path'

const config: StorybookConfig = {
    stories: [
        '../src/components/**/*.mdx',
        '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'
    ],
    addons: [
        '@chromatic-com/storybook',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-vitest'
    ],
    framework: {
        name: '@storybook/vue3-vite',
        options: {}
    },
    async viteFinal(config, { configType }) {
        config.root = resolve(__dirname, '../') // Set root to packages/ui/
        return config
    },
}
export default config
