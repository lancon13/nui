import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NMenu from './NMenu.vue'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NMenu',
    component: NMenu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {}
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NMenu, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Show menu
                <NMenu v-bind="args">
                    <li href="#">Menu item 1</li>
                    <li href="#">Menu item 2</li>
                    <li href="#">Menu item 3</li>
                    <li href="#">
                        Menu item 4
                        <ul>
                            <li href="#">Menu item 1</li>
                            <li href="#">Menu item 2</li>
                            <li href="#">Menu item 3</li>
                        </ul>
                    </li>
                    <li href="#">Menu item 5</li>
                </NMenu>
            </NButton>
        `
    })
}
