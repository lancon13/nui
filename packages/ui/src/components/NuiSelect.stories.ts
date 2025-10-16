import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NuiSelect from './NuiSelect.vue'
import NuiIcon from './NuiIcon.vue'
import NuiButton from './NuiButton.vue'
import NuiCard from './NuiCard.vue'

const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
const sizes = ['small', 'medium', 'large']

const meta = {
    title: 'UI/NuiSelect',
    component: NuiSelect,
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
        placeholder: { control: 'text' },
        helperText: { control: 'text' },
        loading: { control: 'boolean' },
        pilled: { control: 'boolean' },
        // v-model
        modelValue: { control: 'text' }
    },
    args: {
        // Default args
        color: undefined,
        size: 'medium',
        disabled: false,
        label: 'Label',
        placeholder: 'Placeholder',
        helperText: 'This is a helper text.',
        loading: false,
        pilled: false,
        modelValue: ''
    }
} satisfies Meta<typeof NuiSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NuiSelect, NuiCard },
        setup() {
            const model = ref(args.modelValue || 'Option 1')
            return { args, model }
        },
        template: `
            <NuiSelect v-bind="args" v-model="model" class="w-64">
                <template #dropdown-content>
                    <NuiCard class="w-64 p-sm">
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model = 'Option 1'">Option 1</p>
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model = 'Option 2'">Option 2</p>
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model = 'Option 3'">Option 3</p>
                    </NuiCard>
                </template>
            </NuiSelect>
        `
    })
}

export const Disabled: Story = {
    args: {
        disabled: true,
        modelValue: 'Disabled value'
    },
    render: args => ({
        components: { NuiSelect, NuiCard },
        setup() {
            const model = ref(args.modelValue)
            return { args, model }
        },
        template: `
            <NuiSelect v-bind="args" v-model="model" class="w-64">
                <template #dropdown-content>
                    <NuiCard class="w-64 p-sm">
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model = 'Option 1'">Option 1</p>
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model = 'Option 2'">Option 2</p>
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model = 'Option 3'">Option 3</p>
                    </NuiCard>
                </template>
            </NuiSelect>
        `
    })
}

export const Loading: Story = {
    args: {
        loading: true,
        modelValue: 'Loading value'
    },
    render: args => ({
        components: { NuiSelect, NuiCard },
        setup() {
            const model = ref(args.modelValue)
            return { args, model }
        },
        template: `
            <NuiSelect v-bind="args" v-model="model" class="w-64">
                <template #dropdown-content>
                    <NuiCard class="w-64 p-sm">
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model = 'Option 1'">Option 1</p>
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model = 'Option 2'">Option 2</p>
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model = 'Option 3'">Option 3</p>
                    </NuiCard>
                </template>
            </NuiSelect>
        `
    })
}

export const Colors: Story = {
    render: args => ({
        components: { NuiSelect, NuiCard },
        setup() {
            return { args, colors }
        },
        template: `
            <div class="grid grid-cols-2 gap-md">
                <NuiSelect v-for="color in colors" :key="color" v-bind="args" :color="color" :label="color" :model-value="color" class="w-64">
                    <template #dropdown-content>
                        <NuiCard class="w-64 p-sm">
                            <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="args.modelValue = 'Option 1'">Option 1</p>
                            <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="args.modelValue = 'Option 2'">Option 2</p>
                        </NuiCard>
                    </template>
                </NuiSelect>
            </div>
        `
    })
}

export const Sizes: Story = {
    render: args => ({
        components: { NuiSelect, NuiCard },
        setup() {
            return { args, sizes }
        },
        template: `
            <div class="flex flex-col gap-md items-start">
                <NuiSelect v-for="size in sizes" :key="size" v-bind="args" :size="size" :label="size" :model-value="size" class="w-64">
                    <template #dropdown-content>
                        <NuiCard class="w-64 p-sm">
                            <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="args.modelValue = 'Option 1'">Option 1</p>
                            <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="args.modelValue = 'Option 2'">Option 2</p>
                        </NuiCard>
                    </template>
                </NuiSelect>
            </div>
        `
    })
}

export const Shapes: Story = {
    render: args => ({
        components: { NuiSelect, NuiCard },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-md items-start">
                <NuiSelect v-bind="args" label="Default" class="w-64">
                    <template #dropdown-content>
                        <NuiCard class="w-64 p-sm">
                            <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="args.modelValue = 'Option 1'">Option 1</p>
                        </NuiCard>
                    </template>
                </NuiSelect>
                <NuiSelect v-bind="args" pilled label="Pilled" class="w-64">
                    <template #dropdown-content>
                        <NuiCard class="w-64 p-sm">
                            <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="args.modelValue = 'Option 1'">Option 1</p>
                        </NuiCard>
                    </template>
                </NuiSelect>
            </div>
        `
    })
}

export const WithSlots: Story = {
    render: args => ({
        components: { NuiSelect, NuiIcon, NuiButton, NuiCard },
        setup() {
            const model1 = ref('prepend icon')
            const model2 = ref('append icon')
            const model3 = ref('both')
            return { args, model1, model2, model3 }
        },
        template: `
        <div class="flex flex-col gap-md w-80">
            <NuiSelect v-bind="args" v-model="model1" label="Prepend slot">
                <template #prepend>
                    <NuiIcon name="account" />
                </template>
                <template #dropdown-content>
                    <NuiCard class="w-64 p-sm">
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model1 = 'Option A'">Option A</p>
                    </NuiCard>
                </template>
            </NuiSelect>
            <NuiSelect v-bind="args" v-model="model2" label="Append slot">
                <template #append>
                    <NuiIcon name="arrow-right" />
                </template>
                <template #dropdown-content>
                    <NuiCard class="w-64 p-sm">
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model2 = 'Option B'">Option B</p>
                    </NuiCard>
                </template>
            </NuiSelect>
            <NuiSelect v-bind="args" v-model="model3" label="Prepend and Append slots">
                <template #prepend>
                    <NuiIcon name="magnify" />
                </template>
                <template #append>
                    <NuiButton label="Submit" size="small" />
                </template>
                <template #dropdown-content>
                    <NuiCard class="w-64 p-sm">
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model3 = 'Option C'">Option C</p>
                    </NuiCard>
                </template>
            </NuiSelect>
        </div>
    `
    })
}

export const WithBeforeAfter: Story = {
    render: args => ({
        components: { NuiSelect, NuiIcon, NuiButton, NuiCard },
        setup() {
            const model1 = ref('before slot')
            const model2 = ref('after slot')
            const model3 = ref('all slots')
            return { args, model1, model2, model3 }
        },
        template: `
        <div class="flex flex-col gap-md w-96">
            <NuiSelect v-bind="args" v-model="model1" label="Before slot">
                <template #before>
                    <NuiIcon name="magnify" />
                </template>
                <template #dropdown-content>
                    <NuiCard class="w-64 p-sm">
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model1 = 'Option X'">Option X</p>
                    </NuiCard>
                </template>
            </NuiSelect>
            <NuiSelect v-bind="args" v-model="model2" label="After slot">
                <template #after>
                    <NuiButton icon="arrow-right" variant="flat" />
                </template>
                <template #dropdown-content>
                    <NuiCard class="w-64 p-sm">
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model2 = 'Option Y'">Option Y</p>
                    </NuiCard>
                </template>
            </NuiSelect>
            <NuiSelect v-bind="args" v-model="model3" label="All slots">
                <template #before>
                    <NuiIcon name="account" />
                </template>
                <template #prepend>
                    <NuiIcon name="magnify" />
                </template>
                <template #append>
                    <NuiIcon name="arrow-right" />
                </template>
                <template #after>
                    <NuiButton rounded  icon="close" />
                </template>
                <template #dropdown-content>
                    <NuiCard class="w-64 p-sm">
                        <p class="cursor-pointer hover:bg-gray-100 p-xs" @click="model3 = 'Option Z'">Option Z</p>
                    </NuiCard>
                </template>
            </NuiSelect>
        </div>
    `
    })
}
