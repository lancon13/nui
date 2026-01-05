import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NButton from './NButton.vue'
import NCard from './NCard.vue'
import NInputField from './NInputField.vue'

const meta = {
    title: 'UI/NInputField',
    component: NInputField,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        loadingName: { control: 'text' },
        loadingClass: { control: 'text' },
        message: { control: 'text' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NInputField },
        setup() {
            const value = ref('')
            return { args, value }
        },
        template: `
            <div class="w-96">
                <NInputField v-bind="args" v-model="value" label="Username" name="username" placeholder="Enter username" />
            </div>
        `
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NInputField },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputField v-bind="args" label="Default" placeholder="Default state" />
                <NInputField v-bind="args" class="brand" label="Brand" placeholder="Brand state" />
                <NInputField v-bind="args" class="success" label="Success" placeholder="Success state" helperText="Saved successfully" icon="mdi-check" />
                <NInputField v-bind="args" class="error" label="Error" placeholder="Error state" helperText="Field is required" icon="mdi-alert-circle" />
                <NInputField v-bind="args" class="warning" label="Warning" placeholder="Warning state" helperText="Check your input" icon="mdi-alert" />
                <NInputField v-bind="args" class="info" label="Info" placeholder="Info state" helperText="Information message" icon="mdi-information" />
            </div>
        `
    })
}

export const Sizes: Story = {
    args: {},
    render: args => ({
        components: { NInputField },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputField v-bind="args" size="small" label="Small" placeholder="Small size" />
                <NInputField v-bind="args" size="medium" label="Medium" placeholder="Medium size" />
                <NInputField v-bind="args" size="large" label="Large" placeholder="Large size" />
            </div>
        `
    })
}

export const Shapes: Story = {
    args: {},
    render: args => ({
        components: { NInputField },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputField v-bind="args" class="pilled" label="Pilled" placeholder="Pilled shape" />
            </div>
        `
    })
}

export const Icons: Story = {
    args: {},
    render: args => ({
        components: { NInputField },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputField v-bind="args" icon="mdi-magnify" placeholder="Search..." />
                <NInputField v-bind="args" prepend-icon="mdi-account" placeholder="User" />
                <NInputField v-bind="args" append-icon="mdi-eye" placeholder="Password" />
            </div>
        `
    })
}

export const Loading: Story = {
    args: {
        loading: true
    },
    render: args => ({
        components: { NInputField, NButton },
        setup() {
            const value = ref('Loading content...')
            const loading = ref(true)
            return { args, value, loading }
        },
        template: `
            <div class="flex flex-col items-center gap-4 w-96">
                <NInputField v-bind="args" v-model="value" :loading="loading" loadingName="mdi-sync" loadingClass="animate-spin" label="Data Field" class="brand" />
                <NButton @click="loading = !loading" :label="loading ? 'Stop Loading' : 'Start Loading'" />
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {
        disabled: true
    },
    render: args => ({
        components: { NInputField },
        setup() {
            const value = ref('Disabled input')
            return { args, value }
        },
        template: `
            <div class="w-96">
                <NInputField v-bind="args" v-model="value" label="Disabled Field" placeholder="You cannot edit this" />
            </div>
        `
    })
}

export const CustomContent: Story = {
    args: {},
    render: args => ({
        components: { NInputField, NCard },
        setup() {
            const value = ref('Custom input')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-8 w-96">
                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold text-brand">Using Slots (#overlay)</div>
                    <NInputField v-bind="args" v-model="value" label="Has Overlay">
                        <template #overlay>
                            <div class="absolute inset-0 bg-brand/5 pointer-events-none" />
                        </template>
                    </NInputField>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold text-brand">Using Slots (#dropdown)</div>
                    <NInputField v-bind="args" v-model="value" label="Has Dropdown">
                        <template #dropdown>
                            <NCard class="mt-1 drop-shadow-xl border border-border p-4">
                                This is a dropdown content.
                            </NCard>
                        </template>
                    </NInputField>
                </div>
            </div>
        `
    })
}

export const Formatter: Story = {
    args: {
        format: (val: string) => val.toUpperCase(),
        parse: (val: string) => val.toLowerCase()
    },
    render: args => ({
        components: { NInputField },
        setup() {
            const value = ref('hello')
            return { args, value }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Model Value (lowercase): <code>{{ value }}</code></div>
                <NInputField v-bind="args" v-model="value" label="UPPERCASE Formatter" />
            </div>
        `
    })
}

export const Slots: Story = {
    args: {},
    render: args => ({
        components: { NInputField, NButton },
        setup() {
            const value = ref('')
            return { args, value }
        },
        template: `
            <div class="w-[500px] flex flex-col gap-8">
                <NInputField v-bind="args" v-model="value" label="Full Slots Example">
                    <template #before>
                        <NButton class="flat squared">Prefix</NButton>
                    </template>
                    
                    <template #label>
                        <div class="flex justify-between items-center w-full">
                            <span class="font-bold text-brand italic">Custom Label Slot</span>
                            <span class="text-xs opacity-50">Optional</span>
                        </div>
                    </template>

                    <template #top>
                        <div class="text-[10px] uppercase tracking-wider opacity-70 mb-1">Top Slot Content</div>
                    </template>

                    <template #prepend>
                        <span class="pl-2 text-brand">P:</span>
                    </template>

                    <template #append>
                        <span class="pr-2 text-brand">:S</span>
                    </template>

                    <template #bottom>
                        <div class="text-[10px] text-right opacity-70 mt-1">Bottom Slot Content</div>
                    </template>

                    <template #after>
                        <NButton class="primary squared">Suffix</NButton>
                    </template>
                </NInputField>
            </div>
        `
    })
}
