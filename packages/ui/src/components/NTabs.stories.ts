import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NTabs from './NTabs.vue'
import NTab from './NTab.vue'

const meta = {
    title: 'UI/NTabs',
    component: NTabs,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
        name: { control: 'text' }
    },
    args: {
        name: 'account'
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <NTabs v-bind="args" model-value="item-2">
                <!-- This is the default slot contains the tab nodes -->
                <NTab name="item-1">Item 1</NTab>
                <NTab name="item-2">Item 2</NTab>
                <NTab name="item-3">Item 3</NTab>
            </NTabs>
        `
    })
}

export const Spaced: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NTabs v-bind="args" model-value="item-2" class="">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class="divide-x">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                 <NTabs v-bind="args" model-value="item-2" class="gap-2 individual">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>
            </div>
        `
    })
}
