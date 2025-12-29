import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NAvatar from './NAvatar.vue'
import NIcon from './NIcon.vue'
import NInputSearch from './NInputSearch.vue'

const meta = {
    title: 'UI/NInputSearch',
    component: NInputSearch,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        multiple: { control: 'boolean' },
        clearable: { control: 'boolean' },
        useInput: { control: 'boolean' },
        fillInput: { control: 'boolean' },
        closeOnSelect: { control: 'boolean' },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

// --- Base Stories ---

export const SingleSearchable: Story = {
    args: {
        useInput: true,
        clearable: true,
        fillInput: true,
        label: 'Single Searchable',
        placeholder: 'Search for an option...'
    },
    render: args => ({
        components: { NInputSearch },
        setup() {
            const value = ref('')
            const items = [
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' }
            ]
            return { args, value, items }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Selected: <code>{{ value || 'None' }}</code></div>
                <NInputSearch v-bind="args" v-model="value" :items="items" />
            </div>
        `
    })
}

export const SingleSelectLike: Story = {
    args: {
        useInput: false,
        clearable: true,
        fillInput: false,
        label: 'Single Select-like',
        placeholder: 'Select an option...'
    },
    render: args => ({
        components: { NInputSearch },
        setup() {
            const value = ref('')
            const items = [
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' }
            ]
            return { args, value, items }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Selected: <code>{{ value || 'None' }}</code></div>
                <NInputSearch v-bind="args" v-model="value" :items="items" />
            </div>
        `
    })
}

export const MultipleSearchable: Story = {
    args: {
        multiple: true,
        useInput: true,
        clearable: true,
        label: 'Multiple Searchable',
        placeholder: 'Add tags...'
    },
    render: args => ({
        components: { NInputSearch },
        setup() {
            const value = ref(['1'])
            const items = [
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' },
                { label: 'Option 4', value: '4' }
            ]
            return { args, value, items }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Selected: <code>{{ value }}</code></div>
                <NInputSearch v-bind="args" v-model="value" :items="items" />
            </div>
        `
    })
}

export const MultipleSelectLike: Story = {
    args: {
        multiple: true,
        useInput: false,
        clearable: true,
        label: 'Multiple Select-like',
        placeholder: 'Choose options...'
    },
    render: args => ({
        components: { NInputSearch },
        setup() {
            const value = ref(['1'])
            const items = [
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' },
                { label: 'Option 4', value: '4' }
            ]
            return { args, value, items }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Selected: <code>{{ value }}</code></div>
                <NInputSearch v-bind="args" v-model="value" :items="items" />
            </div>
        `
    })
}

// --- Features ---

export const FillInputDisabled: Story = {
    args: {
        useInput: true,
        fillInput: false,
        label: 'Fill Input Disabled',
        placeholder: 'Input clears on focus...'
    },
    render: args => ({
        components: { NInputSearch },
        setup() {
            const value = ref('1')
            const items = [
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' }
            ]
            return { args, value, items }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Selected: <code>{{ value }}</code></div>
                <p class="text-xs text-gray-500">When fillInput is false, focusing the input will show the placeholder instead of the selected value.</p>
                <NInputSearch v-bind="args" v-model="value" :items="items" />
            </div>
        `
    })
}

export const Colors: Story = {
    args: {
        clearable: true,
        placeholder: 'Select color...'
    },
    render: args => ({
        components: { NInputSearch },
        setup() {
            const items = [{ label: 'Selected Item', value: 'v' }]
            const value = ref('v')
            return { args, value, items }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputSearch v-bind="args" v-model="value" :items="items" label="Default" />
                <NInputSearch v-bind="args" v-model="value" :items="items" class="brand" label="Brand" />
                <NInputSearch v-bind="args" v-model="value" :items="items" class="success" label="Success" message="Selection saved" />
                <NInputSearch v-bind="args" v-model="value" :items="items" class="error" label="Error" message="Invalid selection" />
            </div>
        `
    })
}

export const NestedAndGroups: Story = {
    args: {
        useInput: true,
        label: 'Category Search',
        placeholder: 'Search categories...'
    },
    render: args => ({
        components: { NInputSearch },
        setup() {
            const value = ref('')
            const items = [
                { label: 'Electronic', heading: true },
                {
                    label: 'Computers',
                    value: 'comp',
                    children: [
                        { label: 'Laptops', value: 'laptops' },
                        { label: 'Desktops', value: 'desktops' }
                    ]
                },
                { label: 'Audio', heading: true },
                {
                    label: 'Headphones',
                    value: 'headphones',
                    children: [
                        { label: 'Wired', value: 'wired' },
                        { label: 'Wireless', value: 'wireless' }
                    ]
                }
            ]
            return { args, value, items }
        },
        template: `
            <div class="w-96">
                <NInputSearch v-bind="args" v-model="value" :items="items" />
            </div>
        `
    })
}

export const LoadingAndDisabled: Story = {
    render: args => ({
        components: { NInputSearch },
        setup() {
            const value = ref('')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                 <NInputSearch v-bind="args" v-model="value" label="Loading..." loading class="brand" placeholder="Loading items..." />
                 <NInputSearch v-bind="args" v-model="value" label="Disabled" disabled placeholder="Component disabled" />
            </div>
        `
    })
}

export const AsyncFilter: Story = {
    args: {
        useInput: true,
        loadingName: 'searching',
        placeholder: 'Start typing to search async...'
    },
    render: args => ({
        components: { NInputSearch },
        setup() {
            const value = ref('')
            const loading = ref(false)
            const items = ref<{ label: string; value: string }[]>([])

            const handleFilter = (query: string) => {
                loading.value = true
                setTimeout(() => {
                    if (!query) {
                        items.value = []
                    } else {
                        items.value = [
                            { label: query + ' 1', value: query + '-1' },
                            { label: query + ' 2', value: query + '-2' },
                            { label: query + ' 3', value: query + '-3' }
                        ]
                    }
                    loading.value = false
                }, 1000)
            }

            return { args, value, items, loading, handleFilter }
        },
        template: `
            <div class="w-96">
                <NInputSearch
                    v-bind="args"
                    v-model="value"
                    :items="items"
                    :loading="loading"
                    label="Async Search"
                    @filter="handleFilter"
                />
            </div>
        `
    })
}

export const CustomSlots: Story = {
    args: {
        multiple: true,
        label: 'User Select',
        placeholder: 'Search users...'
    },
    render: args => ({
        components: { NInputSearch, NIcon, NAvatar },
        setup() {
            const value = ref(['user-1'])
            const items = [
                { label: 'Alice', value: 'user-1', avatar: 'https://i.pravatar.cc/150?u=1' },
                { label: 'Bob', value: 'user-2', avatar: 'https://i.pravatar.cc/150?u=2' },
                { label: 'Charlie', value: 'user-3', avatar: 'https://i.pravatar.cc/150?u=3' }
            ]
            return { args, value, items }
        },
        template: `
            <div class="w-96">
                <NInputSearch v-bind="args" v-model="value" :items="items">
                    <template #item-content="{ label, avatar }">
                        <div class="flex items-center gap-2">
                            <NAvatar :src="avatar" size="xs" />
                            <span>{{ label }}</span>
                        </div>
                    </template>
                </NInputSearch>
            </div>
        `
    })
}
