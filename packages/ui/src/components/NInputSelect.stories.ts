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

export const CustomClasses: Story = {
    args: {
        options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' }
        ]
    },
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('1')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputSelect 
                    v-bind="args" 
                    v-model="value" 
                    label="Custom Wrapper" 
                    wrapper-class="border border-brand p-2 bg-brand/5"
                />
                <NInputSelect 
                    v-bind="args" 
                    v-model="value" 
                    label="Custom Container" 
                    container-class="bg-info/10 p-2"
                />
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
                <NInputSelect v-bind="args" v-model="value" :options="options" class="success" label="Success" helperText="Selection saved" />
                <NInputSelect v-bind="args" v-model="value" :options="options" class="error" label="Error" helperText="Invalid selection" />
            </div>
        `
    })
}

export const Sizes: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('medium')
            const options = [{ label: 'Option', value: 'medium' }]
            return { args, value, options }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputSelect v-bind="args" v-model="value" :options="options" size="small" label="Small" />
                <NInputSelect v-bind="args" v-model="value" :options="options" size="medium" label="Medium" />
                <NInputSelect v-bind="args" v-model="value" :options="options" size="large" label="Large" />
            </div>
        `
    })
}

export const Shapes: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('')
            const options = [{ label: 'Pilled', value: 'pilled' }]
            return { args, value, options }
        },
        template: `
            <div class="w-96">
                <NInputSelect v-bind="args" v-model="value" :options="options" class="pilled" label="Pilled" />
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

export const MultipleEmpty: Story = {
    args: {
        multiple: true,
        label: 'Multiple (Start Empty)'
    },
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref([])
            const options = [
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' }
            ]
            return { args, value, options }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <p>Selected: <code>{{ value }}</code></p>
                <NInputSelect v-bind="args" v-model="value" :options="options" />
            </div>
        `
    })
}

export const MultipleGrouped: Story = {
    args: {
        multiple: true
    },
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref(['volvo', 'audi'])
            const options = [
                {
                    label: 'Swedish Cars',
                    options: [
                        { label: 'Volvo', value: 'volvo' },
                        { label: 'Saab', value: 'saab', disabled: true }
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
            <div class="w-96 flex flex-col gap-2">
                <p>Selected: <code>{{ value }}</code></p>
                <NInputSelect v-bind="args" v-model="value" :options="options" label="Multiple Grouped Select" />
                <p class="text-xs text-gray-500">Includes a disabled option (Saab).</p>
            </div>
        `
    })
}

export const DataDriven: Story = {
    render: args => ({
        components: { NInputSelect },
        setup() {
            // Mock backend data structure that doesn't match label/value directly
            const rawUsers = [
                { id: 101, name: 'Alice Smith', role: 'Admin' },
                { id: 102, name: 'Bob Jones', role: 'User' },
                { id: 103, name: 'Charlie Brown', role: 'Guest' }
            ]

            // Transform data-driven source into NInputSelect format
            const options = rawUsers.map(user => ({
                label: `${user.name} (${user.role})`,
                value: String(user.id)
            }))

            const value = ref('101')
            return { args, value, options }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <NInputSelect v-bind="args" v-model="value" :options="options" label="User Selection (Mapped Data)" />
                <div class="text-xs">Underlying ID: <code>{{ value }}</code></div>
            </div>
        `
    })
}

export const DataDrivenMixed: Story = {
    render: args => ({
        components: { NInputSelect },
        setup() {
            // Raw complex data with both direct items and categories
            const rawData = [
                { type: 'item', name: 'Standard Delivery', id: 'std' },
                {
                    type: 'category',
                    name: 'Express Services',
                    items: [
                        { name: 'Next Day Air', id: 'nda' },
                        { name: 'Two Day Ground', id: '2dg' }
                    ]
                },
                {
                    type: 'category',
                    name: 'International',
                    items: [
                        { name: 'Global Priority', id: 'gp' }
                    ]
                },
                { type: 'item', name: 'Local Pickup', id: 'lp' }
            ]

            // Dynamic transformation to mixed options and optgroups
            const options = rawData.map(entry => {
                if (entry.type === 'category') {
                    return {
                        label: entry.name,
                        options: entry.items.map(item => ({
                            label: item.name,
                            value: item.id
                        }))
                    }
                }
                return {
                    label: entry.name,
                    value: entry.id
                }
            })

            const value = ref('std')
            return { args, value, options }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <NInputSelect v-bind="args" v-model="value" :options="options" label="Data-Driven Mixed (Groups + Items)" />
                <div class="text-xs">Selected Service: <code>{{ value }}</code></div>
            </div>
        `
    })
}

export const AsyncOptions: Story = {
    render: args => ({
        components: { NInputSelect, NButton },
        setup() {
            const value = ref('')
            const options = ref([])
            const loading = ref(false)

            const fetchData = async () => {
                loading.value = true
                options.value = []
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500))
                options.value = [
                    { label: 'Dynamic Option 1', value: 'd1' },
                    { label: 'Dynamic Option 2', value: 'd2' },
                    { label: 'Dynamic Option 3', value: 'd3' }
                ]
                loading.value = false
            }

            return { args, value, options, loading, fetchData }
        },
        template: `
            <div class="w-96 flex flex-col gap-4">
                <NInputSelect 
                    v-bind="args" 
                    v-model="value" 
                    :options="options" 
                    :loading="loading" 
                    label="Async Data Loading" 
                    placeholder="Load data..." 
                />
                <NButton 
                    :label="loading ? 'Loading...' : 'Fetch External Options'" 
                    @click="fetchData" 
                    :disabled="loading" 
                    class="brand"
                />
            </div>
        `
    })
}

export const FocusAnimation: Story = {
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('')
            const options = [
                { label: 'Focus me...', value: '1' },
                { label: '...to see rotation', value: '2' }
            ]
            return { args, value, options }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <NInputSelect v-bind="args" v-model="value" :options="options" label="Animated Dropdown Icon" />
                <p class="text-xs text-gray-500">The chevron icon rotates 180° when the select element is focused (simulating open state).</p>
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

export const Formatting: Story = {
    args: {
        label: 'Formatted Options',
        formatOption: (val: string) => `✦ ${val}`,
        formatOptGroup: (val: string) => val.toUpperCase()
    },
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('volvo')
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
                <NInputSelect v-bind="args" v-model="value" :options="options" />
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
                <NInputSelect v-bind="args" v-model="value" :options="options" dropdown-icon="mdi-chevron-down" dropdown-icon-class="text-red-500" label="Custom Dropdown Icon" />
                <NInputSelect v-bind="args" v-model="value" :options="options" label="Append Slot">
                    <template #append>
                        <span class="text-xs text-gray-400 ml-1">Optional</span>
                    </template>
                </NInputSelect>
            </div>
        `
    })
}
