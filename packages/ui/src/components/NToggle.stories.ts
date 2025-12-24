import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NToggle from './NToggle.vue'
import NTooltip from './NTooltip.vue'

const meta = {
    title: 'UI/NToggle',
    component: NToggle,
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
        components: { NToggle, NTooltip },
        setup() {
            const value = ref<boolean | null>(null)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <div>Value: {{ value }}</div>
                <NToggle v-bind="args" label="Basic Toggle" v-model="value" />
                <NToggle v-bind="args" label="With Slot Content" v-model="value">
                    Enable <span class="text-brand font-bold">Advanced Features</span>
                    <NTooltip>This might slow down your browser</NTooltip>
                </NToggle>
            </div>
        `
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NToggle },
        setup() {
            const value = ref(true)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NToggle v-bind="args" class="brand" label="Brand" v-model="value" />
                <NToggle v-bind="args" class="success" label="Success" v-model="value" />
                <NToggle v-bind="args" class="error" label="Error" v-model="value" />
                <NToggle v-bind="args" class="warning" label="Warning" v-model="value" />
                <NToggle v-bind="args" class="info" label="Info" v-model="value" />
            </div>
        `
    })
}

export const States: Story = {
    args: {},
    render: args => ({
        components: { NToggle },
        setup() {
            const on = ref(true)
            const off = ref(false)
            const indeterminate = ref(null)
            return { args, on, off, indeterminate }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NToggle v-bind="args" label="On" v-model="on" />
                <NToggle v-bind="args" label="Off" v-model="off" />
                <NToggle v-bind="args" label="Indeterminate" v-model="indeterminate" />
                <NToggle v-bind="args" label="Disabled On" v-model="on" disabled />
                <NToggle v-bind="args" label="Disabled Off" v-model="off" disabled />
            </div>
        `
    })
}

export const InlineLabel: Story = {
    args: {
        inlineLabel: true
    },
    render: args => ({
        components: { NToggle },
        setup() {
            const value = ref(true)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NToggle v-bind="args" label="I am inline" v-model="value" />
                <NToggle v-bind="args" class="brand" label="Brand Inline" v-model="value" />
            </div>
        `
    })
}

export const Messages: Story = {
    args: {
        message: 'Toggle to activate'
    },
    render: args => ({
        components: { NToggle },
        setup() {
            const value = ref(false)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NToggle v-bind="args" label="Helper Text" v-model="value" />
                <NToggle v-bind="args" class="error" label="Error State" v-model="value" message="System failure" />
            </div>
        `
    })
}
