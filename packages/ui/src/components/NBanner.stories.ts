import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NBanner from './NBanner.vue'
import NButton from './NButton.vue'
import { ref } from 'vue'

const meta = {
    title: 'UI/NBanner',
    component: NBanner,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        duration: { control: 'number' },
        showProgress: { control: 'boolean' },
        inlineActions: { control: 'boolean' },
        icon: { control: 'text' }
    },
    args: {
        icon: 'mdi-information',
        duration: 0,
        showProgress: false,
        inlineActions: true
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NBanner },
        setup() {
            return { args }
        },
        template: '<NBanner v-bind="args">This is a banner message</NBanner>'
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NBanner },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <NBanner v-bind="args">Default banner message</NBanner>
                <NBanner v-bind="args" class="brand">Brand banner message</NBanner>
                <NBanner v-bind="args" class="success">Success banner message</NBanner>
                <NBanner v-bind="args" class="error">Error banner message</NBanner>
                <NBanner v-bind="args" class="warning">Warning banner message</NBanner>
                <NBanner v-bind="args" class="info">Info banner message</NBanner>
            </div>
        `
    })
}

export const Flat: Story = {
    args: {},
    render: args => ({
        components: { NBanner },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <NBanner v-bind="args" class="flat">Flat banner message</NBanner>
                <NBanner v-bind="args" class="flat brand">Flat Brand</NBanner>
                <NBanner v-bind="args" class="flat success">Flat Success</NBanner>
                <NBanner v-bind="args" class="flat error">Flat Error</NBanner>
                <NBanner v-bind="args" class="flat warning">Flat Warning</NBanner>
                <NBanner v-bind="args" class="flat info">Flat Info</NBanner>
            </div>
        `
    })
}

export const Outlined: Story = {
    args: {},
    render: args => ({
        components: { NBanner },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <NBanner v-bind="args" class="outlined">Outlined banner message</NBanner>
                <NBanner v-bind="args" class="outlined brand">Outlined Brand</NBanner>
                <NBanner v-bind="args" class="outlined success">Outlined Success</NBanner>
                <NBanner v-bind="args" class="outlined error">Outlined Error</NBanner>
                <NBanner v-bind="args" class="outlined warning">Outlined Warning</NBanner>
                <NBanner v-bind="args" class="outlined info">Outlined Info</NBanner>
            </div>
        `
    })
}

export const WithProgress: Story = {
    args: {
        duration: 5000,
        showProgress: true
    },
    render: args => ({
        components: { NBanner, NButton },
        setup() {
            const show = ref(true)
            return { args, show }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <NButton @click="show = true" :disabled="show">Reset Banner</NButton>
                <NBanner v-if="show" v-bind="args" class="info" @timer-end="show = false">
                    This banner will close in 5 seconds.
                </NBanner>
            </div>
        `
    })
}

export const WithActions: Story = {
    args: {},
    render: args => ({
        components: { NBanner, NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <NBanner v-bind="args" class="info">
                    Update available
                    <template #actions>
                        <NButton class="text-xs texted pilled" label="Later" />
                        <NButton class="text-xs flat pilled brand" label="Update Now" />
                    </template>
                </NBanner>

                <NBanner v-bind="args" class="error" :inline-actions="false">
                    Connection lost. Please check your internet connection.
                    <template #actions>
                        <NButton class="text-xs outlined " label="Retry" />
                    </template>
                </NBanner>
            </div>
        `
    })
}

export const Dismissible: Story = {
    args: {},
    render: args => ({
        components: { NBanner, NButton },
        setup() {
            const show = ref(true)
            return { args, show }
        },
        template: `
            <div class="flex flex-col gap-4 w-[600px]">
                <NButton v-if="!show" @click="show = true">Show Banner</NButton>
                <NBanner v-model="show" v-bind="args" class="warning">
                    This is a dismissible banner.
                    <template #actions>
                        <NButton icon="mdi-close" class="flat icon" @click="show = false" aria-label="Dismiss" />
                    </template>
                </NBanner>
            </div>
        `
    })
}
