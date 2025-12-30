import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
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
        message: { control: 'text' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('test1')
            const options = [
                { label: 'Option 1', value: 'test1' },
                { label: 'Option 2', value: 'test2' },
                { label: 'Option 3', value: 'test3' }
            ]
            return { args, value, options }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Selected: {{ value }}</div>
                <NInputSelect v-bind="args" v-model="value" :options="options" label="Select Option" name="demo" />
            </div>
        `
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect },
        setup() {
            const options = [{ label: 'Option selected', value: 'v' }]
            const value = ref('v')
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