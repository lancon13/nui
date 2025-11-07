import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import NuiCircularProgress from './NuiCircularProgress.vue'

const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
const sizes = ['small', 'medium', 'large']

const meta = {
    title: 'UI/NuiCircularProgress',
    component: NuiCircularProgress,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
        range: { control: 'object' },
        color: { control: 'select', options: colors },
        indeterminate: { control: 'boolean' },
        size: { control: 'text' },
        thickness: { control: { type: 'number', min: 1, max: 25, step: 1 } },
        fillColor: { control: 'color' }
    },
    args: {
        value: 0.5,
        range: [0, 1],
        color: 'primary',
        indeterminate: false,
        size: 'medium',
        thickness: 16,
        fillColor: 'transparent'
    }
} satisfies Meta<typeof NuiCircularProgress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NuiCircularProgress },
        setup() {
            return { args }
        },
        template: '<NuiCircularProgress v-bind="args" />'
    })
}

export const Sizes: Story = {
    render: args => ({
        components: { NuiCircularProgress },
        setup() {
            return { args, sizes }
        },
        template: `
        <div class="flex items-center gap-sm">
            <NuiCircularProgress
                v-for="size in sizes"
                :key="size"
                v-bind="args"
                :size="size"
            />
        </div>
        `
    })
}

export const Colors: Story = {
    render: args => ({
        components: { NuiCircularProgress },
        setup() {
            return { args, colors }
        },
        template: `
        <div class="flex items-center gap-sm">
            <NuiCircularProgress
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
        indeterminate: true
    },
    render: args => ({
        components: { NuiCircularProgress },
        setup() {
            return { args, colors }
        },
        template: `
        <div class="flex items-center gap-sm">
            <NuiCircularProgress
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
        components: { NuiCircularProgress },
        setup() {
            const initialValue = args.value ?? 0.5
            const initialRange = args.range ?? [0, 1]

            const value = ref(initialValue)
            const percentage = computed(() => {
                const [min, max] = initialRange
                const range = max - min
                if (range === 0) return value.value >= max ? 100 : 0
                return Math.round(((value.value - min) / range) * 100)
            })
            return { args, value, percentage, initialRange }
        },
        template: `
        <div class="flex flex-col gap-sm w-64 items-center">
            <NuiCircularProgress v-bind="args" :value="value">
                <span class="text-sm font-sans text-muted-500">{{ percentage }}%</span>
            </NuiCircularProgress>
            <input type="range" v-model.number="value" :min="initialRange[0]" :max="initialRange[1]" step="0.01" class="w-full" />
        </div>
        `
    })
}

export const ArbitrarySizes: Story = {
    render: args => ({
        components: { NuiCircularProgress },
        setup() {
            return { args }
        },
        template: `
        <div class="flex items-center gap-sm">
            <NuiCircularProgress v-bind="args" size="2rem"  />
            <NuiCircularProgress v-bind="args" size="50px" />
            <NuiCircularProgress v-bind="args" size="10rem" :thickness="25" />
        </div>
        `
    })
}

export const WithFillColor: Story = {
    render: args => ({
        components: { NuiCircularProgress },
        setup() {
            return { args }
        },
        template: `
        <div class="flex items-center gap-sm">
            <NuiCircularProgress v-bind="args" fillColor="#FF0000" />
            <NuiCircularProgress v-bind="args" fillColor="#0000FF" />
            <NuiCircularProgress v-bind="args" fillColor="#00FF00" />
        </div>
        `
    }),
    args: {
        value: 75
    }
}
