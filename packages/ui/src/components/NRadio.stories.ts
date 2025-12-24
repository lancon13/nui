import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NRadio from './NRadio.vue'
import NTooltip from './NTooltip.vue'

const meta = {
    title: 'UI/NRadio',
    component: NRadio,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        inlineLabel: { control: 'boolean' },
        message: { control: 'text' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NRadio, NTooltip },
        setup() {
            const value = ref('option1')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <div>Selected: {{ value }}</div>
                <NRadio v-bind="args" label="Option 1" v-model="value" value="option1" />
                <NRadio v-bind="args" label="Option 2" v-model="value" value="option2" />
                <NRadio v-bind="args" label="With Slot Content" v-model="value" value="option3">
                    Choice 3 with <span class="text-brand font-bold">Custom Styling</span>
                </NRadio>
            </div>
        `
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NRadio },
        setup() {
            const value = ref('brand')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NRadio v-bind="args" class="brand" label="Brand" v-model="value" value="brand" />
                <NRadio v-bind="args" class="success" label="Success" v-model="value" value="success" />
                <NRadio v-bind="args" class="error" label="Error" v-model="value" value="error" />
                <NRadio v-bind="args" class="warning" label="Warning" v-model="value" value="warning" />
                <NRadio v-bind="args" class="info" label="Info" v-model="value" value="info" />
            </div>
        `
    })
}

export const States: Story = {
    args: {},
    render: args => ({
        components: { NRadio },
        setup() {
            const value = ref('enabled')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NRadio v-bind="args" label="Enabled Option" v-model="value" value="enabled" />
                <NRadio v-bind="args" label="Disabled Option" v-model="value" value="disabled" disabled />
                <NRadio v-bind="args" label="Disabled Selected" v-model="value" value="enabled" disabled />
            </div>
        `
    })
}

export const InlineLabel: Story = {
    args: {
        inlineLabel: true
    },
    render: args => ({
        components: { NRadio },
        setup() {
            const value = ref('v1')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NRadio v-bind="args" label="I am inline" v-model="value" value="v1" />
                <NRadio v-bind="args" class="brand" label="Brand Inline" v-model="value" value="v2" />
            </div>
        `
    })
}

export const Messages: Story = {
    args: {
        message: 'Please pick one'
    },
    render: args => ({
        components: { NRadio },
        setup() {
            const value = ref('')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NRadio v-bind="args" label="Option A" v-model="value" value="a" />
                <NRadio v-bind="args" class="error" label="Option B (Error)" v-model="value" value="b" message="Selection required" />
            </div>
        `
    })
}
