import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NButton',
    component: NButton,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: '<NButton v-bind="args">Button</NButton>'
    })
}
