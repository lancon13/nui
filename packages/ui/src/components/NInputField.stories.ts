import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NInputField from './NInputField.vue'
import NCard from './NCard.vue'
import { ref } from 'vue'

const meta = {
    title: 'UI/NInputField',
    component: NInputField,
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
        components: { NInputField },
        setup() {
            const value = ref('')
            return { args, value }
        },
        template: `
            <NInputField v-bind="args" v-model="value" label="Value" name="demo" />            
        `
    })
}

export const Message: Story = {
    args: {},
    render: args => ({
        components: { NInputField },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-2">
                <NInputField v-bind="args" label="Value" name="demo" message="Hello world!" class="primary" />
                <NInputField v-bind="args" label="Value" name="demo" message="Hello world!" icon="check" class="success" />
                <NInputField v-bind="args" label="Value" name="demo" message="Hello world!" icon="alert-circle"  class="error" />
                <NInputField v-bind="args" label="Value" name="demo" message="Hello world!" append-icon="magnify" append-icon-class="text-text" class="warning" />
                <NInputField v-bind="args" label="Value" name="demo" message="Hello world!" class="info text-text" />
            </div>
        `
    })
}

export const Wrapper: Story = {
    args: {},
    render: args => ({
        components: { NInputField },
        setup() {
            const value = ref('Test me')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-2 w-128">
                <NInputField v-bind="args" v-model="value" label="Value" name="demo" message="Hello world!"  >
                    <template #before>
                        R
                    </template>
                    <template #="props">
                        <div>
                            <pre>{{props}}</pre>
                            <input type="text" :value="props.modelValue" @input="(event) => props.onUpdateModelValue(event.target.value)" v-bind="props" />
                        </div>
                    </template>
                </NInputField>
            </div>
        `
    })
}

export const Overlay: Story = {
    args: {},
    render: args => ({
        components: { NInputField, NCard },
        setup() {
            const value = ref('Test me')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-2">
                <NInputField v-bind="args" v-model="value" label="Value" name="demo" class="" >
                    <template #overlay>
                        <NCard class="h-64 drop-shadow-2xl">
                            Hello world
                        </NCard>
                    </template>
                </NInputField>
            </div>
        `
    })
}

export const Dropdown: Story = {
    args: {},
    render: args => ({
        components: { NInputField, NCard },
        setup() {
            const value = ref('Test me')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-2">
                <NInputField v-bind="args" v-model="value" label="Value" name="demo" class="" >
                    <template #dropdown>
                        <NCard class="h-64 drop-shadow-2xl">
                            Hello world
                        </NCard>
                    </template>
                </NInputField>
            </div>
        `
    })
}

export const Loading: Story = {
    args: {},
    render: args => ({
        components: { NInputField, NCard },
        setup() {
            const value = ref('Test me')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-2">
                <NInputField v-bind="args" v-model="value" label="Value" name="demo" loading class="" >                    
                </NInputField>
            </div>
        `
    })
}
