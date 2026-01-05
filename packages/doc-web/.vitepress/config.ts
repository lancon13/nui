import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    title: 'NUI Docs',
    description: 'Documentation for NUI Library',
    appearance: false,
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@nui/ui': path.resolve(__dirname, '../../ui/src')
            }
        }
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'Components', link: '/components/button' },
            { text: 'Composables', link: '/composables/use-dialog' }
        ],
        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Getting Started', link: '/guide/getting-started' },
                    { text: 'Theming', link: '/guide/theming' },
                    { text: 'Typography', link: '/guide/typography' },
                    { text: 'Utilities', link: '/guide/utilities' }
                ]
            },
            {
                text: 'General',
                items: [
                    { text: 'Button', link: '/components/button' },
                    { text: 'Icon', link: '/components/icon' },
                    { text: 'Avatar', link: '/components/avatar' },
                    { text: 'Chip', link: '/components/chip' },
                    { text: 'Card', link: '/components/card' },
                    { text: 'List', link: '/components/list' },
                    { text: 'Menu', link: '/components/menu' },
                    { text: 'Tabs', link: '/components/tabs' },
                    { text: 'Image', link: '/components/image' },
                    { text: 'Loading', link: '/components/loading' }
                ]
            },
            {
                text: 'Forms',
                items: [
                    { text: 'Input', link: '/components/input' },
                    { text: 'Checkbox', link: '/components/checkbox' },
                    { text: 'Radio', link: '/components/radio' },
                    { text: 'Toggle', link: '/components/toggle' },
                    { text: 'Select', link: '/components/select' },
                    { text: 'Combobox', link: '/components/combobox' },
                    { text: 'Calendar', link: '/components/calendar' },
                    { text: 'Form', link: '/components/form' },
                    { text: 'Field', link: '/components/input-field' }
                ]
            },
            {
                text: 'Feedback',
                items: [
                    { text: 'Banner', link: '/components/banner' },
                    { text: 'Toast', link: '/components/toast' },
                    { text: 'Tooltip', link: '/components/tooltip' }
                ]
            },
            {
                text: 'Overlay',
                items: [
                    { text: 'Modal', link: '/components/modal' },
                    { text: 'Drawer', link: '/components/drawer' },
                    { text: 'Popover', link: '/components/popover' }
                ]
            },
            {
                text: 'Composables',
                items: [
                    { text: 'useDialog', link: '/composables/use-dialog' },
                    { text: 'useNotify', link: '/composables/use-notify' },
                    { text: 'useModal', link: '/composables/use-modal' }
                ]
            }
        ]
    }
})
