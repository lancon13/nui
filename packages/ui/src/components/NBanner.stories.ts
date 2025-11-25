import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NBanner from './NBanner.vue'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NBanner',
    component: NBanner,
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
        components: { NBanner },
        setup() {
            return { args }
        },
        template: '<NBanner v-bind="args">This is a banner message</NBanner>'
    })
}

export const Normal: Story = {
    args: {},
    render: args => ({
        components: { NBanner },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NBanner v-bind="args">This is a banner message</NBanner>
                <NBanner v-bind="args" class="primary">This is a banner message</NBanner>
                <NBanner v-bind="args" class="success">This is a banner message</NBanner>
                <NBanner v-bind="args" class="error">This is a banner message</NBanner>
                <NBanner v-bind="args" class="warning">This is a banner message</NBanner>
                <NBanner v-bind="args" class="info">This is a banner message</NBanner>
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
            <div class="flex flex-col gap-4">
                <NBanner v-bind="args" class="flat">This is a banner message</NBanner>
                <NBanner v-bind="args" class="flat primary">This is a banner message</NBanner>
                <NBanner v-bind="args" class="flat success">This is a banner message</NBanner>
                <NBanner v-bind="args" class="flat error">This is a banner message</NBanner>
                <NBanner v-bind="args" class="flat warning">This is a banner message</NBanner>
                <NBanner v-bind="args" class="flat info">This is a banner message</NBanner>
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
            <div class="flex flex-col gap-4">
                <NBanner v-bind="args" class="outlined">This is a banner message</NBanner>
                <NBanner v-bind="args" class="outlined primary">This is a banner message</NBanner>
                <NBanner v-bind="args" class="outlined success">This is a banner message</NBanner>
                <NBanner v-bind="args" class="outlined error">This is a banner message</NBanner>
                <NBanner v-bind="args" class="outlined warning">This is a banner message</NBanner>
                <NBanner v-bind="args" class="outlined info">This is a banner message</NBanner>
            </div>
        `
    })
}

export const FlatOutlined: Story = {
    args: {},
    render: args => ({
        components: { NBanner },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NBanner v-bind="args" class="flat outlined">This is a banner message</NBanner>
                <NBanner v-bind="args" class="flat outlined primary">This is a banner message</NBanner>
                <NBanner v-bind="args" class="flat outlined success">This is a banner message</NBanner>
                <NBanner v-bind="args" class="flat outlined error">This is a banner message</NBanner>
                <NBanner v-bind="args" class="flat outlined warning">This is a banner message</NBanner>
                <NBanner v-bind="args" class="flat outlined info">This is a banner message</NBanner>
            </div>
        `
    })
}

export const Icon: Story = {
    args: {},
    render: args => ({
        components: { NBanner },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NBanner v-bind="args" icon="account" class="">This is a banner message</NBanner>
                <NBanner v-bind="args" icon="account" class=" primary">This is a banner message</NBanner>
                <NBanner v-bind="args" icon="account" class=" success">This is a banner message</NBanner>
                <NBanner v-bind="args" icon="account" class=" error">This is a banner message</NBanner>
                <NBanner v-bind="args" icon="account" class=" warning">This is a banner message</NBanner>
                <NBanner v-bind="args" icon="account"class=" info">This is a banner message</NBanner>
            </div>
        `
    })
}

export const Actions: Story = {
    args: {},
    render: args => ({
        components: { NBanner, NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NBanner v-bind="args" icon="account" class="">
                    This is a banner message
                    <template #actions>
                        <NButton label="Dismiss" class="text-xs flat" />
                    </template>
                </NBanner>
                <NBanner v-bind="args" icon="account" class="success">
                    This is a banner message
                    <template #actions>
                        <NButton label="Dismiss" class="text-xs flat" />
                    </template>
                </NBanner>
                <NBanner v-bind="args" icon="account" class="error">
                    This is a banner message
                    <template #actions>
                        <NButton label="Dismiss" class="text-xs flat"/>
                    </template>
                </NBanner>
                <NBanner v-bind="args" icon="account" class="warning">
                    This is a banner message
                    <template #actions>
                        <NButton label="Dismiss" class="text-xs flat"/>
                    </template>
                </NBanner>
                <NBanner v-bind="args" icon="account" class="info">
                    This is a banner message
                    <template #actions>
                        <NButton label="Dismiss" class="text-xs flat"/>
                    </template>
                </NBanner>

                <NBanner v-bind="args" icon="account" :inline-actions="false" class="">
                    This is a banner message
                    <template #actions>
                        <NButton label="Dismiss" class="text-xs flat" />
                    </template>
                </NBanner>
            </div>
        `
    })
}
