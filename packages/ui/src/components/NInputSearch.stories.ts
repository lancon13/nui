import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import { ref } from 'vue'
import NInputSearch from './NInputSearch.vue'

const meta = {
    title: 'UI/NInputSearch',
    component: NInputSearch,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {}
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => ({
        components: { NInputSearch },
        setup() {
            const value = ref('selection-1')

            const items = ref([
                { label: 'Selection 1', value: 'selection-1' },
                { label: 'Selection 2', value: 'selection-2' },
                { label: 'Selection 3', value: 'selection-3' }
            ])
            return { value, items }
        },
        template: `
            <div class="flex flex-col gap-2">
                <div>{{value}}</div>
                <NInputSearch v-model="value" use-input :items="items" label="Value" name="demo" />
            </div>
        `
    })
}

export const Multiple: Story = {
    render: () => ({
        components: { NInputSearch },
        setup() {
            const value = ref(['selection-1'])

            const items = ref([
                { label: 'Selection 1', value: 'selection-1' },
                { label: 'Selection 2', value: 'selection-2' },
                { label: 'Selection 3', value: 'selection-3' },
                { label: 'Selection 4', value: 'selection-4' },
                { label: 'Selection 5', value: 'selection-5' }
            ])
            return { value, items }
        },
        template: `
            <div class="flex flex-col gap-2 w-72">
                <div>{{value}}</div>
                <NInputSearch v-model="value" multiple :items="items" label="Value" name="demo" />
            </div>
        `
    })
}

export const Loading: Story = {
    render: () => ({
        components: { NInputSearch },
        setup() {
            const value = ref('selection-1')

            const items = ref([
                { label: 'Selection 1', value: 'selection-1' },
                { label: 'Selection 2', value: 'selection-2' },
                { label: 'Selection 3', value: 'selection-3' }
            ])
            return { value, items }
        },
        template: `
            <div class="flex flex-col gap-2">
                <div>{{value}}</div>
                <NInputSearch
                    v-model="value"
                    :items="items"
                    name="demo"
                    loading                         
                />
            </div>
        `
    })
}

export const WithHeadings: Story = {
    render: () => ({
        components: { NInputSearch },
        setup() {
            const value = ref('option-1')
            const items = ref([
                { label: 'Group 1', heading: true },
                { label: 'Option 1', value: 'option-1' },
                { label: 'Option 2', value: 'option-2' },
                { label: 'Group 2', heading: true },
                { label: 'Option 3', value: 'option-3' },
                { label: 'Option 4', value: 'option-4' }
            ])
            return { value, items }
        },
        template: `
            <div class="flex flex-col gap-2 w-72">
                <div>{{value}}</div>
                <NInputSearch v-model="value" :items="items" label="With Headings" name="demo-headings" />
            </div>
        `
    })
}

export const WithNestedItems: Story = {
    render: () => ({
        components: { NInputSearch },
        setup() {
            const value = ref('child-1')
            const items = ref([
                {
                    label: 'Parent 1',
                    value: 'parent-1',
                    children: [
                        { label: 'Child 1', value: 'child-1' },
                        { label: 'Child 2', value: 'child-2' }
                    ]
                },
                {
                    label: 'Parent 2',
                    value: 'parent-2',
                    children: [
                        { label: 'Child A', value: 'child-a' },
                        {
                            label: 'Sub-Parent',
                            value: 'sub-parent',
                            children: [{ label: 'Grandchild', value: 'grandchild' }]
                        }
                    ]
                }
            ])
            return { value, items }
        },
        template: `
            <div class="flex flex-col gap-2 w-72">
                <div>{{value}}</div>
                <NInputSearch v-model="value" :items="items" label="Nested Items" name="demo-nested" />
            </div>
        `
    })
}
