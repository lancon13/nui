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
    args: {},
    render: args => ({
        components: { NInputSearch },
        setup() {
            const value = ref('selection-1')

            const items = ref([
                { label: 'Selection 1', value: 'selection-1' },
                { label: 'Selection 2', value: 'selection-2' },
                { label: 'Selection 3', value: 'selection-3' }
            ])
            return { args, value, items }
        },
        template: `
            <div class="flex flex-col gap-2">
                <div>{{value}}</div>
                <NInputSearch v-bind="args" v-model="value" :items="items" label="Value" name="demo" />
            </div>
        `
    })
}

export const Multiple: Story = {
    render: args => ({
        args: {},
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
            return { args, value, items }
        },
        template: `
            <div class="flex flex-col gap-2 w-96">
                <div>{{value}}</div>
                <NInputSearch v-bind="args" v-model="value" multiple :items="items" label="Value" name="demo" />
            </div>
        `
    })
}
