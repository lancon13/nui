import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NAvatar from './NAvatar.vue'
import NButton from './NButton.vue'
import NChip from './NChip.vue'
import NIcon from './NIcon.vue'
import NInputCombo from './NInputCombo.vue'

const meta = {
    title: 'UI/NInputCombo',
    component: NInputCombo,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        multiple: { control: 'boolean' },
        clearable: { control: 'boolean' },
        useInput: { control: 'boolean' },
        fillInput: { control: 'boolean' },
        closeDropdownOnSelected: { control: 'boolean' },
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
        fillInput: false,
        label: 'Single Searchable',
        placeholder: 'Search for an option...'
    },
    render: args => ({
        components: { NInputCombo },
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
                <NInputCombo v-bind="args" v-model="value" :items="items" />
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
        components: { NInputCombo },
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
                <NInputCombo v-bind="args" v-model="value" :items="items" />
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
        components: { NInputCombo },
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
                <NInputCombo v-bind="args" v-model="value" :items="items" />
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
        components: { NInputCombo },
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
                <p class="text-xs text-gray-500 mb-2">
                    When at least one option is selected and <b>useInput</b> is false, the text input is hidden (sr-only).
                    It reappears if you clear the selection.
                </p>
                <NInputCombo v-bind="args" v-model="value" :items="items" />
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
        components: { NInputCombo },
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
                <NInputCombo v-bind="args" v-model="value" :items="items" />
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
        components: { NInputCombo },
        setup() {
            const items = [
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' },
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' }
            ]
            const value = ref('blue')
            return { args, value, items }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputCombo v-bind="args" v-model="value" :items="items" label="Default" />
                <NInputCombo v-bind="args" v-model="value" :items="items" class="brand" label="Brand" />
                <NInputCombo v-bind="args" v-model="value" :items="items" class="success" label="Success" helperText="Selection saved" />
                <NInputCombo v-bind="args" v-model="value" :items="items" class="error" label="Error" helperText="Invalid selection" />
            </div>
        `
    })
}

export const Sizes: Story = {
    args: {
        placeholder: 'Select size...'
    },
    render: args => ({
        components: { NInputCombo },
        setup() {
            const items = [{ label: 'Option', value: '1' }]
            const value = ref('1')
            return { args, value, items }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputCombo v-bind="args" v-model="value" :items="items" size="small" label="Small" />
                <NInputCombo v-bind="args" v-model="value" :items="items" size="medium" label="Medium" />
                <NInputCombo v-bind="args" v-model="value" :items="items" size="large" label="Large" />
            </div>
        `
    })
}

export const Shapes: Story = {
    args: {
        placeholder: 'Rounded edges...'
    },
    render: args => ({
        components: { NInputCombo },
        setup() {
            const items = [{ label: 'Option', value: '1' }]
            const value = ref('1')
            return { args, value, items }
        },
        template: `
            <div class="w-96">
                <NInputCombo v-bind="args" v-model="value" :items="items" class="pilled" label="Pilled" />
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
        components: { NInputCombo },
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
                <NInputCombo v-bind="args" v-model="value" :items="items" />
            </div>
        `
    })
}

export const LoadingAndDisabled: Story = {
    render: args => ({
        components: { NInputCombo },
        setup() {
            const value = ref('')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                 <NInputCombo v-bind="args" v-model="value" label="Loading..." loading class="brand" placeholder="Loading items..." />
                 <NInputCombo v-bind="args" v-model="value" label="Disabled" disabled placeholder="Component disabled" />
            </div>
        `
    })
}

export const AsyncSearchBasic: Story = {
    args: {
        useInput: true,
        placeholder: 'Type to search users (simulated API)...',
        label: 'User Search'
    },
    render: args => ({
        components: { NInputCombo, NIcon },
        setup() {
            const value = ref('')
            const loading = ref(false)
            const items = ref<{ label: string; value: string }[]>([])

            const handleFilter = (query: string) => {
                loading.value = true
                // Simulate API call
                setTimeout(() => {
                    if (!query) {
                        items.value = []
                    } else {
                        // Mock data generation
                        items.value = Array.from({ length: 5 }, (_, i) => ({
                            label: `${query} Result ${i + 1}`,
                            value: `${query.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`
                        }))
                    }
                    loading.value = false
                }, 800)
            }

            return { args, value, items, loading, handleFilter }
        },
        template: `
            <div class="w-96">
                <NInputCombo
                    v-bind="args"
                    v-model="value"
                    :items="items"
                    :loading="loading"
                    @filter="handleFilter"
                >
                    <template #append>
                        <NIcon name="mdi-cloud-search" class="text-muted" />
                    </template>
                </NInputCombo>
                <div class="mt-2 text-xs text-muted">
                    Results will appear after 800ms.
                </div>
            </div>
        `
    })
}

export const AsyncSearchWithError: Story = {
    args: {
        useInput: true,
        placeholder: 'Search will fail...',
        label: 'Flaky Search'
    },
    render: args => ({
        components: { NInputCombo, NIcon },
        setup() {
            const value = ref('')
            const loading = ref(false)
            const items = ref<{ label: string; value: string; disabled?: boolean }[]>([])
            const errorMessage = ref('')

            const handleFilter = (query: string) => {
                loading.value = true
                errorMessage.value = ''
                items.value = []

                setTimeout(() => {
                    loading.value = false
                    if (query.length > 2) {
                        errorMessage.value = 'Failed to fetch results. Please try again.'
                    } else if (query) {
                        items.value = [{ label: 'Keep typing...', value: 'hint', disabled: true }]
                    }
                }, 600)
            }

            return { args, value, items, loading, handleFilter, errorMessage }
        },
        template: `
            <div class="w-96">
                <NInputCombo
                    v-bind="args"
                    v-model="value"
                    :items="items"
                    :loading="loading"
                    :class="{ 'error': !!errorMessage }"
                    :message="errorMessage"
                    @filter="handleFilter"
                />
            </div>
        `
    })
}

export const AsyncSearchWithDebounceProp: Story = {
    args: {
        useInput: true,
        debounce: 1000,
        placeholder: 'Built-in 1000ms debounce...',
        label: 'Debounced Prop Search'
    },
    render: args => ({
        components: { NInputCombo, NIcon },
        setup() {
            const value = ref('')
            const loading = ref(false)
            const items = ref<{ label: string; value: string }[]>([])
            const lastQuery = ref('')

            const handleFilter = (query: string) => {
                lastQuery.value = query
                if (!query) {
                    items.value = []
                    return
                }
                loading.value = true
                setTimeout(() => {
                    items.value = [
                        { label: `Result for "${query}" 1`, value: '1' },
                        { label: `Result for "${query}" 2`, value: '2' }
                    ]
                    loading.value = false
                }, 500)
            }

            return { args, value, items, loading, handleFilter, lastQuery }
        },
        template: `
            <div class="w-96">
                <NInputCombo
                    v-bind="args"
                    v-model="value"
                    :items="items"
                    :loading="loading"
                    @filter="handleFilter"
                />
                <div class="mt-2 text-xs text-muted flex flex-col gap-1">
                    <span>Last event emitted for: <code class="text-brand">{{ lastQuery || 'none' }}</code></span>
                    <span>The @filter event is delayed by {{ args.debounce }}ms while typing.</span>
                </div>
            </div>
        `
    })
}

export const AsyncSearchWithDebounceAndSelection: Story = {
    args: {
        useInput: true,

        multiple: true,

        debounce: 500,

        placeholder: 'Search countries...',

        label: 'Country Selector'
    },

    render: args => ({
        components: { NInputCombo },

        setup() {
            const value = ref(['us', 'fr'])
            const loading = ref(false)
            const items = ref([
                { label: 'United States', value: 'us' },
                { label: 'France', value: 'fr' }
            ])
            const allCountries = [
                { label: 'United States', value: 'us' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'France', value: 'fr' },
                { label: 'Germany', value: 'de' },
                { label: 'Canada', value: 'ca' },
                { label: 'Australia', value: 'au' },
                { label: 'Japan', value: 'jp' },
                { label: 'China', value: 'cn' }
            ]

            const handleFilter = (query: string) => {
                loading.value = true

                // Simulate API call delay
                setTimeout(() => {
                    if (!query) {
                        items.value = allCountries.filter(c => value.value.includes(c.value))
                    } else {
                        const lowerQuery = query.toLowerCase()
                        items.value = allCountries.filter(c => c.label.toLowerCase().includes(lowerQuery))
                    }
                    loading.value = false
                }, 500)
            }

            return { args, value, items, loading, handleFilter }
        },

        template: `
            <div class="w-96">
                <NInputCombo
                    v-bind="args"
                    v-model="value"
                    :items="items"
                    :loading="loading"
                    @filter="handleFilter"
                />
                <div class="mt-2 text-xs text-muted">
                    Built-in {{ args.debounce }}ms debounce + simulated 300ms API latency.
                </div>
            </div>
        `
    })
}

export const VModelInputValue: Story = {
    args: {
        useInput: true,
        fillInput: 'value',
        label: "v-model:input-value (fillInput: 'value')",
        placeholder: 'Try typing...'
    },
    render: args => ({
        components: { NInputCombo },
        setup() {
            const value = ref('')
            const myInputValue = ref('')
            const items = [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Cherry', value: 'cherry' }
            ]
            const log = ref<string[]>([])
            const handleInputChange = (e: Event) => {
                const target = e.target as HTMLInputElement
                log.value.unshift(`Change event fired: "${target.value}" (v-model is "${myInputValue.value}")`)
            }
            return { args, value, myInputValue, items, log, handleInputChange }
        },
        template: `
            <div class="w-96 flex flex-col gap-4">
                <div class="flex flex-col gap-1 text-sm bg-surface-variant p-3 rounded border border-outline-variant">
                    <div><b>Selected (v-model):</b> <code>{{ value || 'None' }}</code></div>
                    <div><b>Input Value (v-model:input-value):</b> <code>{{ myInputValue || 'Empty' }}</code></div>
                </div>
                <NInputCombo 
                    v-bind="args" 
                    v-model="value" 
                    v-model:input-value="myInputValue"
                    :items="items"
                    @change="handleInputChange"
                />
                <div>
                    <div class="text-xs font-bold uppercase text-muted mb-1">Event Log (Change event):</div>
                    <div class="bg-surface p-2 rounded h-32 overflow-auto text-xs font-mono border border-outline-variant">
                        <div v-for="(msg, i) in log" :key="i" class="mb-1 border-b border-outline-variant last:border-0 pb-1">{{ msg }}</div>
                        <div v-if="log.length === 0" class="text-muted italic text-center py-4">Change event triggers on blur or enter</div>
                    </div>
                </div>
            </div>
        `
    })
}

// --- Slot Stories ---

export const CustomItemContent: Story = {
    args: {
        multiple: false,
        label: 'Custom Item Content',
        placeholder: 'Search users...'
    },
    render: args => ({
        components: { NInputCombo, NIcon, NAvatar },
        setup() {
            const value = ref('user-1')
            const items = [
                { label: 'Alice', value: 'user-1', avatar: 'https://i.pravatar.cc/150?u=1', status: 'Online' },
                { label: 'Bob', value: 'user-2', avatar: 'https://i.pravatar.cc/150?u=2', status: 'Away' },
                { label: 'Charlie', value: 'user-3', avatar: 'https://i.pravatar.cc/150?u=3', status: 'Offline' }
            ]
            return { args, value, items }
        },
        template: `
            <div class="w-96">
                <NInputCombo v-bind="args" v-model="value" :items="items">
                    <template #item-content="{ label, avatar, status }">
                        <div class="flex items-center gap-3 py-1">
                            <NAvatar :src="avatar" size="sm" />
                            <div class="flex flex-col">
                                <span class="font-bold">{{ label }}</span>
                                <span class="text-xs text-muted">{{ status }}</span>
                            </div>
                        </div>
                    </template>
                </NInputCombo>
            </div>
        `
    })
}

export const CustomChipSlot: Story = {
    args: {
        multiple: true,
        label: 'Custom Chip Slot',
        placeholder: 'Add tags...'
    },
    render: args => ({
        components: { NInputCombo, NChip, NIcon },
        setup() {
            const value = ref(['1', '2'])
            const items = [
                { label: 'Design', value: '1', icon: 'mdi-palette' },
                { label: 'Development', value: '2', icon: 'mdi-code-tags' },
                { label: 'Marketing', value: '3', icon: 'mdi-bullhorn' }
            ]
            return { args, value, items }
        },
        template: `
            <div class="w-96">
                <NInputCombo v-bind="args" v-model="value" :items="items">
                    <template #chip="{ item, remove }">
                        <NChip
                            class="brand"
                            variant="flat"
                            removable
                            @remove="remove"
                        >
                            <template #prepend>
                                <NIcon :name="item.icon" size="xs" class="mr-1" />
                            </template>
                            {{ item.label }}
                        </NChip>
                    </template>
                </NInputCombo>
            </div>
        `
    })
}

export const AppendAndPrependSlots: Story = {
    args: {
        label: 'Append & Prepend',
        placeholder: 'Enter values...'
    },
    render: args => ({
        components: { NInputCombo, NButton, NIcon },
        setup() {
            const value = ref('')
            const items = [
                { label: 'Item 1', value: '1' },
                { label: 'Item 2', value: '2' }
            ]
            return { args, value, items }
        },
        template: `
            <div class="w-96 flex flex-col gap-4">
                <NInputCombo v-bind="args" v-model="value" :items="items">
                    <template #prepend>
                        <div class="pl-2 flex items-center">
                            <NIcon name="mdi-magnify" class="text-muted" />
                        </div>
                    </template>
                    <template #append>
                        <NButton size="xs" variant="flat" class="mr-1 brand">Action</NButton>
                    </template>
                </NInputCombo>
            </div>
        `
    })
}

export const CustomEmptySlot: Story = {
    args: {
        label: 'Custom Empty State',
        placeholder: 'Type something to search...'
    },
    render: args => ({
        components: { NInputCombo, NIcon },
        setup() {
            const value = ref('')
            const items = ref([])

            return { args, value, items }
        },

        template: `
            <div class="w-96">
                <p class="text-xs text-gray-500 mb-2">This demo shows an empty items list with a custom slot.</p>
                <NInputCombo v-bind="args" v-model="value" :items="items">
                    <template #empty>
                        <div class="flex flex-col items-center gap-2 p-4 text-muted w-full">
                            <NIcon name="mdi-database-off" size="xl" />
                            <span>Nothing found here!</span>
                        </div>
                    </template>
                </NInputCombo>
            </div>
        `
    })
}