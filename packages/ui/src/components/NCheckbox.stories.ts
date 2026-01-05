import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NCheckbox from './NCheckbox.vue'
import NTooltip from './NTooltip.vue'

const meta = {
    title: 'UI/NCheckbox',
    component: NCheckbox,
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
        components: { NCheckbox, NTooltip },
        setup() {
            const value = ref<boolean | null>(null)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <div>Value: {{ value }}</div>
                <NCheckbox v-bind="args" label="Basic Checkbox" v-model="value" />
                <NCheckbox v-bind="args" label="With Slot Content" v-model="value">
                    I agree with the <a href="#" class="text-brand underline">terms and conditions</a>.
                </NCheckbox>
            </div>
        `
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NCheckbox },
        setup() {
            const value = ref(true)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NCheckbox v-bind="args" class="brand" label="Brand" v-model="value" />
                <NCheckbox v-bind="args" class="success" label="Success" v-model="value" helperText="Correct" />
                <NCheckbox v-bind="args" class="error" label="Error" v-model="value" helperText="Wrong" />
                <NCheckbox v-bind="args" class="warning" label="Warning" v-model="value" />
                <NCheckbox v-bind="args" class="info" label="Info" v-model="value" />
            </div>
        `
    })
}

export const Sizes: Story = {
    args: {},
    render: args => ({
        components: { NCheckbox },
        setup() {
            const value = ref(true)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NCheckbox v-bind="args" size="small" label="Small" v-model="value" />
                <NCheckbox v-bind="args" size="medium" label="Medium" v-model="value" />
                <NCheckbox v-bind="args" size="large" label="Large" v-model="value" />
            </div>
        `
    })
}

export const States: Story = {
    args: {},
    render: args => ({
        components: { NCheckbox },
        setup() {
            const checked = ref(true)
            const unchecked = ref(false)
            const indeterminate = ref(null)
            return { args, checked, unchecked, indeterminate }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NCheckbox v-bind="args" label="Checked" v-model="checked" />
                <NCheckbox v-bind="args" label="Unchecked" v-model="unchecked" />
                <NCheckbox v-bind="args" label="Indeterminate" v-model="indeterminate" />
                <NCheckbox v-bind="args" label="Disabled Checked" v-model="checked" disabled />
                <NCheckbox v-bind="args" label="Disabled Unchecked" v-model="unchecked" disabled />
            </div>
        `
    })
}

export const InlineLabel: Story = {
    args: {
        inlineLabel: true
    },
    render: args => ({
        components: { NCheckbox },
        setup() {
            const value = ref(true)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NCheckbox v-bind="args" label="I am inline" v-model="value" />
                <NCheckbox v-bind="args" class="brand" label="Brand Inline" v-model="value" />
            </div>
        `
    })
}

export const Messages: Story = {
    args: {
        helperText: 'This is a helper message'
    },
    render: args => ({
        components: { NCheckbox },
        setup() {
            const value = ref(false)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NCheckbox v-bind="args" label="Username" v-model="value" />
                <NCheckbox v-bind="args" class="error" label="Error State" v-model="value" helperText="This field is required" />
            </div>
        `
    })
}
