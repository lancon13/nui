import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
// import { fn } from '@storybook/test'
import NToggle from './NToggle.vue'
import NTooltip from './NTooltip.vue'

const meta = {
    title: 'UI/NToggle',
    component: NToggle,
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
        components: { NToggle, NTooltip },
        setup() {
            const value = ref<boolean | null>(null)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-2">
                <div>Value: {{value}}</div>
                <div></div>
                <NToggle v-bind="args" label="Members Agreement" v-model="value" >
                    I agree with the terms and conditions.
                    <NTooltip>Tooltip</NTooltip>
                </NToggle>
            </div>
        `
    })
}
