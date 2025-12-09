import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import { ref } from 'vue'
import NInputText from './NInputText.vue'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NInputText',
    component: NInputText,
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
        components: { NInputText },
        setup() {
            const value = ref('Test me')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-2">
                <div>{{value}}</div>
                <NInputText v-bind="args" v-model.input="value" label="Value" name="demo" />
            </div>
        `
    })
}

export const Number: Story = {
    args: {},
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref(325)
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-2">
                <div>{{value}}</div>
                <NInputText v-bind="args" v-model.input.number="value" label="Value" name="demo" />
            </div>
        `
    })
}

export const Transform: Story = {
    args: {},
    render: args => ({
        components: { NInputText, NButton },
        setup() {
            const value = ref('test me')
            const format = (value: string) => {
                return value.toLocaleUpperCase()
            }
            const parse = (value: string) => {
                return value.toLocaleLowerCase()
            }
            const filter = (value: string) => {
                return value.replace(/[aeiou]/gi, '')
            }
            return { args, value, format, parse, filter }
        },
        template: `
            <div class="flex flex-col gap-2">
                <div>{{value}}</div>
                <NInputText v-bind="args" v-model.input="value" label="Value" name="demo" :format="format" :parse="parse" />
                <NInputText v-bind="args" v-model.input="value" label="Filter" name="demo" :format="filter" :parse="filter" icon="account"  >
                    <template #after>
                        <NButton class="mt-6">Submit</NButton>
                    </template>
                </NInputText>
            </div>
        `
    })
}
