import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NTooltip from './NTooltip.vue'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NTooltip',
    component: NTooltip,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
    },
    args: {}
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NTooltip, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Show tooltip
                <NTooltip v-bind="args" >This is a tooltip</NTooltip>
            </NButton>
        `
    })
}
