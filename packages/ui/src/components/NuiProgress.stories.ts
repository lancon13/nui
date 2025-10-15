import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import NuiProgress from './NuiProgress.vue'

const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
const sizes = ['small', 'medium', 'large']

const meta = {
    title: 'UI/NuiProgress',
    component: NuiProgress,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
        range: { control: 'object' },
        color: { control: 'select', options: colors },
        indeterminate: { control: 'boolean' },
        reversed: { control: 'boolean' },
        pilled: { control: 'boolean' },
        size: { control: 'select', options: sizes },
        bordered: { control: 'boolean' },
        striped: { control: 'boolean' },
    },
    args: {
        value: 0.5,
        range: [0, 1],
        color: 'primary',
        indeterminate: false,
        reversed: false,
        pilled: false,
        size: 'medium',
        bordered: false,
        striped: false,
    }
} satisfies Meta<typeof NuiProgress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NuiProgress },
        setup() {
            return { args }
        },
        template: '<NuiProgress v-bind="args" class="w-64" />'
    })
}

export const Bordered: Story = {
    args: {
        bordered: true,
    },
    render: args => ({
        components: { NuiProgress },
        setup() {
            return { args, colors }
        },
        template: `
        <div class="flex flex-col gap-sm w-64">
            <NuiProgress
                v-for="color in colors"
                :key="color"
                v-bind="args"
                :color="color"
            />
        </div>
        `
    })
}

export const Pilled: Story = {
    args: {
        pilled: true,
        value: 0.75,
    },
    render: args => ({
        components: { NuiProgress },
        setup() {
            return { args }
        },
        template: `
        <div class="flex flex-col gap-sm w-64">
            <NuiProgress v-bind="args" />
            <NuiProgress v-bind="args" :pilled="false" />
        </div>
        `
    })
}

export const Sizes: Story = {
    render: args => ({
        components: { NuiProgress },
        setup() {
            return { args, sizes }
        },
        template: `
        <div class="flex flex-col items-center gap-sm w-64">
            <NuiProgress
                v-for="size in sizes"
                :key="size"
                v-bind="args"
                :size="size"
                class="w-full"
            />
        </div>
        `
    })
}

export const Colors: Story = {
    render: args => ({
        components: { NuiProgress },
        setup() {
            return { args, colors }
        },
        template: `
        <div class="flex flex-col gap-sm w-64">
            <NuiProgress
                v-for="color in colors"
                :key="color"
                v-bind="args"
                :color="color"
            />
        </div>
        `
    })
}

export const Indeterminate: Story = {
    args: {
        indeterminate: true,
    },
    render: args => ({
        components: { NuiProgress },
        setup() {
            return { args, colors }
        },
        template: `
        <div class="flex flex-col gap-sm w-64">
            <NuiProgress
                v-for="color in colors"
                :key="color"
                v-bind="args"
                :color="color"
            />
        </div>
        `
    })
}

export const StripedIndeterminate: Story = {
    args: {
        indeterminate: true,
        striped: true,
    },
    render: args => ({
        components: { NuiProgress },
        setup() {
            return { args, colors }
        },
        template: `
        <div class="flex flex-col gap-sm w-64">
            <NuiProgress
                v-for="color in colors"
                :key="color"
                v-bind="args"
                :color="color"
            />
        </div>
        `
    })
}

export const StripedDeterminate: Story = {
    args: {
        value: 0.75,
        striped: true,
    },
    render: args => ({
        components: { NuiProgress },
        setup() {
            return { args, colors }
        },
        template: `
        <div class="flex flex-col gap-sm w-64">
            <NuiProgress
                v-for="color in colors"
                :key="color"
                v-bind="args"
                :color="color"
            />
        </div>
        `
    })
}

export const Reversed: Story = {
    args: {
        reversed: true,
    },
    render: args => ({
        components: { NuiProgress },
        setup() {
            return { args, colors }
        },
        template: `
        <div class="flex flex-col gap-sm w-64">
            <NuiProgress
                v-for="color in colors"
                :key="color"
                v-bind="args"
                :color="color"
            />
        </div>
        `
    })
}

export const WithContent: Story = {
    render: args => ({
        components: { NuiProgress },
        setup() {
            const value = ref(args.value)
            const percentage = computed(() => {
                const [min, max] = args.range
                const range = max - min
                if (range === 0) return value.value >= max ? 100 : 0
                return Math.round(((value.value - min) / range) * 100)
            })
            return { args, value, percentage }
        },
        template: `
        <div class="flex flex-col gap-sm w-64">
            <NuiProgress v-bind="args" :value="value">
                {{ percentage }}%
            </NuiProgress>
            <input type="range" v-model.number="value" :min="args.range[0]" :max="args.range[1]" step="0.01" class="w-full" />
        </div>
        `
    })
}
