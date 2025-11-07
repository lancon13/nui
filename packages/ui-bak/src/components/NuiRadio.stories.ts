import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NuiRadio from './NuiRadio.vue'

const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
const sizes = ['small', 'medium', 'large']

const meta = {
    title: 'UI/NuiRadio',
    component: NuiRadio,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
        color: {
            control: 'select',
            options: colors
        },
        size: {
            control: 'select',
            options: sizes
        },
        disabled: { control: 'boolean' },
        label: { control: 'text' },
        description: { control: 'text' },
        helperText: { control: 'text' },
        name: { control: 'text' },
        value: { control: 'text' }
    },
    args: {
        color: 'current',
        size: 'medium',
        disabled: false,
        label: 'Radio',
        description: 'Radio description',
        helperText: 'Radio helper text',
        name: 'nui-radio',
        value: 'radio'
    }
} satisfies Meta<typeof NuiRadio>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NuiRadio },
        setup() {
            const value = ref('one')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-sm">
                <NuiRadio v-bind="args" v-model="value" name="radio-def" value="one" label="Option one" />
                <NuiRadio v-bind="args" v-model="value" name="radio-def" value="two" label="Option two" />
                <NuiRadio v-bind="args" v-model="value" name="radio-def" value="three" label="Option three" />
            </div>
        `
    })
}

export const Colors: Story = {
    render: args => ({
        components: { NuiRadio },
        setup() {
            const value = ref('primary')
            return { args, colors, value }
        },
        template: `
            <div class="grid grid-cols-3 gap-sm">
                <template v-for="color in colors" :key="color">
                    <NuiRadio v-bind="args" v-model="value" name="radio-colors" :value="color" :label="color" :color="color" />
                </template>
            </div>
        `
    })
}

export const Sizes: Story = {
    render: args => ({
        components: { NuiRadio },
        setup() {
            const value = ref('medium')
            return { args, sizes, value }
        },
        template: `
            <div class="flex items-end gap-sm">
                <template v-for="size in sizes" :key="size">
                    <NuiRadio v-bind="args" v-model="value" name="radio-sizes" :value="size" :label="size" :size="size" />
                </template>
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {
        disabled: true
    },
    render: args => ({
        components: { NuiRadio },
        setup() {
            const value = ref('one')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-sm">
                <NuiRadio v-bind="args" v-model="value" name="radio-dis" value="one" label="Option one (selected)" />
                <NuiRadio v-bind="args" v-model="value" name="radio-dis" value="two" label="Option two" />
            </div>
        `
    })
}
