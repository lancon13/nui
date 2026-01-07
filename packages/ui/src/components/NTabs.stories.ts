import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NTabs from './NTabs.vue'
import NTab from './NTab.vue'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NTabs',
    component: NTabs,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        loadingName: { control: 'text' },
        loadingClass: { control: 'text' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            const value = ref('item-2')
            return { args, value }
        },
        template: `
            <NTabs v-bind="args" v-model="value">
                <NTab name="item-1">Item 1</NTab>
                <NTab name="item-2">Item 2</NTab>
                <NTab name="item-3">Item 3</NTab>
            </NTabs>
        `
    })
}

export const IndependentButtons: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            const handleClick = (name: string) => {
                alert(`Clicked ${name}`)
            }
            return { args, handleClick }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <div class="text-sm opacity-60">In this mode, all tabs are focusable and act as individual buttons.</div>
                <NTabs v-bind="args" class="individual gap-2 brand">
                    <NTab name="refresh" icon="mdi-refresh" @click="handleClick('Refresh')">Refresh</NTab>
                    <NTab name="print" icon="mdi-printer" @click="handleClick('Print')">Print</NTab>
                    <NTab name="export" icon="mdi-export" @click="handleClick('Export')">Export</NTab>
                </NTabs>
            </div>
        `
    })
}

export const Spaced: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            const value = ref('item-2')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-8 w-[600px]">
                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold">Default (Grouped)</div>
                    <NTabs v-bind="args" v-model="value">
                        <NTab name="item-1">Item 1</NTab>
                        <NTab name="item-2">Item 2</NTab>
                        <NTab name="item-3">Item 3</NTab>
                    </NTabs>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold">Separator</div>
                    <NTabs v-bind="args" v-model="value" class="separator">
                        <NTab name="item-1">Item 1</NTab>
                        <NTab name="item-2">Item 2</NTab>
                        <NTab name="item-3">Item 3</NTab>
                    </NTabs>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold">Individual (Gaps)</div>
                    <NTabs v-bind="args" v-model="value" class="gap-2 individual">
                        <NTab name="item-1">Item 1</NTab>
                        <NTab name="item-2">Item 2</NTab>
                        <NTab name="item-3">Item 3</NTab>
                    </NTabs>
                </div>
            </div>
        `
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            const value = ref('item-1')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <NTabs v-bind="args" v-model="value" class="brand">
                    <NTab name="item-1">Brand</NTab>
                    <NTab name="item-2">Item 2</NTab>
                </NTabs>
                <NTabs v-bind="args" v-model="value" class="success">
                    <NTab name="item-1">Success</NTab>
                    <NTab name="item-2">Item 2</NTab>
                </NTabs>
                <NTabs v-bind="args" v-model="value" class="error">
                    <NTab name="item-1">Error</NTab>
                    <NTab name="item-2">Item 2</NTab>
                </NTabs>
                <NTabs v-bind="args" v-model="value" class="warning">
                    <NTab name="item-1">Warning</NTab>
                    <NTab name="item-2">Item 2</NTab>
                </NTabs>
                <NTabs v-bind="args" v-model="value" class="info">
                    <NTab name="item-1">Info</NTab>
                    <NTab name="item-2">Item 2</NTab>
                </NTabs>
            </div>
        `
    })
}

export const ActiveBottomLine: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            const value = ref('item-1')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-8 w-[600px]">
                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold">Standard</div>
                    <NTabs v-bind="args" v-model="value" class="active-bottom-line brand">
                        <NTab name="item-1">Item 1</NTab>
                        <NTab name="item-2">Item 2</NTab>
                        <NTab name="item-3">Item 3</NTab>
                    </NTabs>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold">Flat</div>
                    <NTabs v-bind="args" v-model="value" class="active-bottom-line flat success">
                        <NTab name="item-1">Item 1</NTab>
                        <NTab name="item-2">Item 2</NTab>
                        <NTab name="item-3">Item 3</NTab>
                    </NTabs>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold">Texted</div>
                    <NTabs v-bind="args" v-model="value" class="active-bottom-line texted error">
                        <NTab name="item-1">Item 1</NTab>
                        <NTab name="item-2">Item 2</NTab>
                        <NTab name="item-3">Item 3</NTab>
                    </NTabs>
                </div>
            </div>
        `
    })
}

export const Variants: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            const value = ref('item-1')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-8 w-[600px]">
                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold">Flat Brand</div>
                    <NTabs v-bind="args" v-model="value" class="flat brand">
                        <NTab name="item-1">Item 1</NTab>
                        <NTab name="item-2">Item 2</NTab>
                    </NTabs>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold">Outlined Success</div>
                    <NTabs v-bind="args" v-model="value" class="outlined success">
                        <NTab name="item-1">Item 1</NTab>
                        <NTab name="item-2">Item 2</NTab>
                    </NTabs>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="text-sm font-bold">Texted Error</div>
                    <NTabs v-bind="args" v-model="value" class="texted error">
                        <NTab name="item-1">Item 1</NTab>
                        <NTab name="item-2">Item 2</NTab>
                    </NTabs>
                </div>
            </div>
        `
    })
}

export const Multiple: Story = {
    args: {
        multiple: true
    },
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            const value = ref(['item-1', 'item-3'])
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <div>Selected: {{ value }}</div>
                <NTabs v-bind="args" v-model="value" class="brand separator">
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>
            </div>
        `
    })
}

export const Loading: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab, NButton },
        setup() {
            const loading = ref(true)
            const value = ref('item-2')
            const toggleLoading = () => {
                loading.value = !loading.value
            }
            return { args, loading, value, toggleLoading }
        },
        template: `
            <div class="flex flex-col items-center gap-4 w-[600px]">
                <NTabs v-bind="args" v-model="value" class="brand">
                    <NTab name="item-1" :loading="loading">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3" :loading="loading" loadingName="mdi-sync" loadingClass="text-xl animate-spin">Item 3</NTab>
                </NTabs>
                <NButton @click="toggleLoading" label="Toggle Loading" />
            </div>
        `
    })
}

export const Icons: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            const value = ref('item-1')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <NTabs v-bind="args" v-model="value" class="brand separator">
                    <NTab name="item-1" icon="mdi-account">Profile</NTab>
                    <NTab name="item-2" icon="mdi-cog">Settings</NTab>
                    <NTab name="item-3" icon="mdi-bell" append-icon="mdi-circle-small">Notifications</NTab>
                </NTabs>
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            const value = ref('item-2')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <NTabs v-bind="args" v-model="value" class="brand">
                    <NTab name="item-1" disabled>Disabled</NTab>
                    <NTab name="item-2">Active</NTab>
                    <NTab name="item-3">Enabled</NTab>
                </NTabs>
            </div>
        `
    })
}