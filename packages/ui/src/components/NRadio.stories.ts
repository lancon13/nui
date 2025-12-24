import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
// import { fn } from '@storybook/test'
import NRadio from './NRadio.vue'
import NTooltip from './NTooltip.vue'

const meta = {
    title: 'UI/NRadio',
    component: NRadio,
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
        components: { NRadio, NTooltip },
        setup() {
            const value = ref<boolean | null>(null)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-2">
                <div>Value: {{value}}</div>
                <div></div>
                <NRadio v-bind="args" label="Members Agreement" v-model="value" value="v1" >
                    I agree with the terms and conditions.
                    <NTooltip>Tooltip</NTooltip>
                </NRadio>
                <NRadio v-bind="args" label="Members Agreement" v-model="value" value="v2" >
                    I agree with the terms and conditions.
                    <NTooltip>Tooltip</NTooltip>
                </NRadio>
            </div>
        `
    })
}

export const InlineLabel: Story = {
    args: {},
    render: args => ({
        components: { NRadio, NTooltip },
        setup() {
            const value = ref<boolean | null>(null)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-2">
                <div>Value: {{value}}</div>
                <div></div>
                <NRadio v-bind="args" label="Members Agreement" inline-label v-model="value" value="v1" >
                    I agree with the terms and conditions.
                    <NTooltip>Tooltip</NTooltip>
                </NRadio>
                <NRadio v-bind="args" label="Members Agreement" inline-label v-model="value" value="v2" >
                    I agree with the terms and conditions.
                    <NTooltip>Tooltip</NTooltip>
                </NRadio>
            </div>
        `
    })
}
