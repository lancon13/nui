import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NButton from './NButton.vue'
import NInputSelect from './NInputSelect.vue'

const meta = {
    title: 'UI/NInputSelect',
    component: NInputSelect,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        multiple: { control: 'boolean' },
        message: { control: 'text' },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Select Option',
        placeholder: 'Choose one...'
    },
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('')
            const options = [
                { label: 'Option 1', value: 'test1' },
                { label: 'Option 2', value: 'test2' },
                { label: 'Option 3', value: 'test3' }
            ]
            return { args, value, options }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Selected: <code>{{ value || 'none' }}</code></div>
                <NInputSelect v-bind="args" v-model="value" :options="options" />
            </div>
        `
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect },
        setup() {
            const options = [
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' },
                { label: 'Green', value: 'green' }
            ]
            const value = ref('blue')
            return { args, value, options }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputSelect v-bind="args" v-model="value" :options="options" label="Default" />
                <NInputSelect v-bind="args" v-model="value" :options="options" class="brand" label="Brand" />
                <NInputSelect v-bind="args" v-model="value" :options="options" class="success" label="Success" message="Selection saved" />
                <NInputSelect v-bind="args" v-model="value" :options="options" class="error" label="Error" message="Invalid selection" />
            </div>
        `
    })
}

export const Grouped: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('mercedes')
            const options = [
                {
                    label: 'Swedish Cars',
                    options: [
                        { label: 'Volvo', value: 'volvo' },
                        { label: 'Saab', value: 'saab' }
                    ]
                },
                {
                    label: 'German Cars',
                    options: [
                        { label: 'Mercedes', value: 'mercedes' },
                        { label: 'Audi', value: 'audi' }
                    ]
                }
            ]
            return { args, value, options }
        },
        template: `
            <div class="w-96">
                <NInputSelect v-bind="args" v-model="value" :options="options" label="Car Manufacturers" />
            </div>
        `
    })
}

export const Multiple: Story = {
    args: {
        multiple: true
    },
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref(['test1', 'test3'])
            const options = [
                { label: 'Option 1', value: 'test1' },
                { label: 'Option 2', value: 'test2' },
                { label: 'Option 3', value: 'test3' },
                { label: 'Option 4', value: 'test4' }
            ]
            return { args, value, options }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <p>Selected: <code>{{ value }}</code></p>
                <NInputSelect v-bind="args" v-model="value" :options="options" label="Multiple Select" />
                <p class="text-xs text-gray-500">
                    Even with <b>multiple</b> enabled, the native select remains a single-line dropdown (using <code>size="1"</code>), 
                    triggering the OS-native multi-select picker on mobile/desktop.
                </p>
            </div>
        `
    })
}

export const MultipleNoCheckmark: Story = {
    args: {
        multiple: true,
        showCheckmark: false,
        label: 'Multiple (No Checkmark Attempt)'
    },
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref(['test1', 'test3'])
            const options = [
                { label: 'Option 1', value: 'test1' },
                { label: 'Option 2', value: 'test2' },
                { label: 'Option 3', value: 'test3' }
            ]
            return { args, value, options }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <p>Selected: <code>{{ value }}</code></p>
                <p class="text-xs text-gray-500 mb-2">
                    Attempts to hide the checkmark on selected options via CSS (browser support varies).
                </p>
                <NInputSelect v-bind="args" v-model="value" :options="options" />
            </div>
        `
    })
}

export const CustomSlots: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('opt1')
            return { args, value }
        },
        template: `
            <div class="w-96">
                <NInputSelect v-bind="args" v-model="value" label="Using Default Slot">
                    <option value="opt1">Hardcoded 1</option>
                    <option value="opt2">Hardcoded 2</option>
                    <optgroup label="Grouped">
                        <option value="opt3">Hardcoded 3</option>
                    </optgroup>
                </NInputSelect>
            </div>
        `
    })
}

export const LoadingAndDisabled: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect, NButton },
        setup() {
            const value = ref('1')
            const options = [
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' }
            ]
            const loading = ref(true)
            return { args, value, options, loading }
        },
        template: `
            <div class="flex flex-col items-center gap-4 w-96">
                 <NInputSelect v-bind="args" v-model="value" :options="options" label="Loading State" :loading="loading" class="brand" />
                 <NButton @click="loading = !loading" :label="loading ? 'Stop Loading' : 'Start Loading'" />
                 
                 <NInputSelect v-bind="args" v-model="value" :options="options" label="Disabled State" disabled />
            </div>
        `
    })
}

export const Icons: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('')
            const options = [
                 { label: 'Home', value: 'home' },
                 { label: 'Work', value: 'work' }
            ]
            return { args, value, options }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputSelect v-bind="args" v-model="value" :options="options" prepend-icon="mdi-map-marker" label="Prepend Icon" />
                <NInputSelect v-bind="args" v-model="value" :options="options" append-icon="mdi-check" label="Append Icon (replaces dropdown icon)" />
            </div>
        `
    })
}
