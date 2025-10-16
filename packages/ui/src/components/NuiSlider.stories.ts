import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NuiSlider from './NuiSlider.vue'

const meta = {
    title: 'UI/NuiSlider',
    component: NuiSlider,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        modelValue: { control: 'number' },
        min: { control: 'number' },
        max: { control: 'number' },
        step: { control: 'number' },
        label: { control: 'text' },
        helperText: { control: 'text' },
        tooltip: { control: 'boolean' },
        markers: { control: 'boolean' },
        color: {
            control: 'select',
            options: ['primary', 'success', 'error', 'warning', 'info', 'current']
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large']
        },
        disabled: { control: 'boolean' },
    },
    args: {
        modelValue: 50,
        min: 0,
        max: 100,
        step: 1,
        label: 'Slider Label',
        helperText: 'Move the slider to select a value',
        tooltip: true,
        markers: false,
        color: 'primary',
        disabled: false,
    }
} satisfies Meta<typeof NuiSlider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: (args) => ({
        components: { NuiSlider },
        setup() {
            const model = ref(args.modelValue)
            return { args, model }
        },
        template: `
            <div class="w-64">
                <NuiSlider v-bind="args" v-model="model" />
                <p class="mt-4 text-center">Value: {{ model }}</p>
            </div>
        `,
    }),
}

export const Tooltip: Story = {
    render: (args) => ({
        components: { NuiSlider },
        setup() {
            const model1 = ref(25)
            const model2 = ref(75)
            return { args, model1, model2 }
        },
        template: `
            <div class="w-64 flex flex-col gap-y-8">
                <NuiSlider v-bind="args" label="Default Tooltip" v-model="model1" />
                <NuiSlider v-bind="args" label="Custom Tooltip" v-model="model2">
                    <template #tooltip="{ value }">
                        <div class="text-primary bg-white/80 p-2 rounded-lg shadow-lg">
                            Value: {{ value }}
                        </div>
                    </template>
                </NuiSlider>
            </div>
        `,
    }),
}

export const Markers: Story = {
    args: {
        markers: true,
        step: 10,
    },
    render: (args) => ({
        components: { NuiSlider },
        setup() {
            const model = ref(args.modelValue)
            return { args, model }
        },
        template: `
            <div class="w-64">
                <NuiSlider v-bind="args" v-model="model" />
                <p class="mt-4 text-center">Value: {{ model }}</p>
            </div>
        `,
    }),
}

export const Colors: Story = {
    render: (args) => ({
        components: { NuiSlider },
        setup() {
            const colors = meta.argTypes.color.options
            return { args, colors }
        },
        template: `
            <div class="w-64 flex flex-col gap-y-4">
                <NuiSlider
                    v-for="color in colors"
                    :key="color"
                    v-bind="args"
                    :color="color"
                    :label="color"
                    :model-value="75"
                />
            </div>
        `,
    }),
    args: {
        label: '',
    }
}

export const Disabled: Story = {
    args: {
        disabled: true,
        modelValue: 25,
    },
    render: (args) => ({
        components: { NuiSlider },
        setup() {
            const model = ref(args.modelValue)
            return { args, model }
        },
        template: `
            <div class="w-64">
                <NuiSlider v-bind="args" v-model="model" />
                <p class="mt-4 text-center">Value: {{ model }}</p>
            </div>
        `,
    }),
}

export const MinMaxStep: Story = {
    render: (args) => ({
        components: { NuiSlider },
        setup() {
            const model1 = ref(4)
            const model2 = ref(0)
            const model3 = ref(0.5)
            return { args, model1, model2, model3 }
        },
        template: `
            <div class="w-64 flex flex-col gap-y-8">
                <NuiSlider v-bind="args" label="Min: 0, Max: 10, Step: 2" :min="0" :max="10" :step="2" v-model="model1" />
                <NuiSlider v-bind="args" label="Min: -10, Max: 10, Step: 1" :min="-10" :max="10" :step="1" v-model="model2" />
                <NuiSlider v-bind="args" label="Min: 0, Max: 1, Step: 0.1" :min="0" :max="1" :step="0.1" v-model="model3" />
            </div>
        `,
    }),
    args: {
        helperText: '',
    }
}

export const Sizes: Story = {
    render: (args) => ({
        components: { NuiSlider },
        setup() {
            const sizes = meta.argTypes.size.options
            return { args, sizes }
        },
        template: `
            <div class="w-64 flex flex-col gap-y-4">
                <NuiSlider
                    v-for="size in sizes"
                    :key="size"
                    v-bind="args"
                    :size="size"
                    :label="size"
                />
            </div>
        `,
    }),
    args: {
        modelValue: 75,
    }
}
