import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NIcon from './NIcon.vue'

const meta = {
    title: 'UI/NIcon',
    component: NIcon,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        tag: { control: 'text' },
        disabled: { control: 'boolean' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        name: 'mdi-account'
    },
    render: args => ({
        components: { NIcon },
        setup() {
            return { args }
        },
        template: '<NIcon v-bind="args" name="mdi-account" class="text-2xl" />'
    })
}

export const AutoPrefix: Story = {
    args: {
        name: 'mdi-account'
    },
    render: args => ({
        components: { NIcon },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col items-center gap-2">
                <div class="flex items-center gap-4">
                    <div class="flex flex-col items-center">
                        <span class="text-xs text-muted mb-1">name="mdi-account"</span>
                        <NIcon v-bind="args" name="mdi-account" class="text-2xl" />
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-xs text-muted mb-1">name="account"</span>
                        <NIcon v-bind="args" name="account" class="text-2xl text-brand" />
                    </div>
                </div>
                <p class="text-xs text-muted">The component automatically adds 'mdi-' if missing.</p>
            </div>
        `
    })
}

export const Sizes: Story = {
    args: {
        name: 'mdi-magnify'
    },
    render: args => ({
        components: { NIcon },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-end gap-4">
                <div class="flex flex-col items-center gap-1">
                    <NIcon v-bind="args" name="mdi-magnify" class="text-sm" />
                    <span class="text-xs text-muted">text-sm</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <NIcon v-bind="args" name="mdi-magnify" class="text-base" />
                    <span class="text-xs text-muted">text-base</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <NIcon v-bind="args" name="mdi-magnify" class="text-xl" />
                    <span class="text-xs text-muted">text-xl</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <NIcon v-bind="args" name="mdi-magnify" class="text-2xl" />
                    <span class="text-xs text-muted">text-2xl</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <NIcon v-bind="args" name="mdi-magnify" class="text-[3rem]" />
                    <span class="text-xs text-muted">text-[3rem]</span>
                </div>
            </div>
        `
    })
}

export const Colors: Story = {
    args: {
        name: 'mdi-heart'
    },
    render: args => ({
        components: { NIcon },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-6">
                <NIcon v-bind="args" name="mdi-heart" class="text-4xl text-text" />
                <NIcon v-bind="args" name="mdi-heart" class="text-4xl text-brand" />
                <NIcon v-bind="args" name="mdi-heart" class="text-4xl text-success" />
                <NIcon v-bind="args" name="mdi-heart" class="text-4xl text-error" />
                <NIcon v-bind="args" name="mdi-heart" class="text-4xl text-warning" />
                <NIcon v-bind="args" name="mdi-heart" class="text-4xl text-info" />                
            </div>
        `
    })
}

export const Loading: Story = {
    args: {
        name: 'mdi-loading'
    },
    render: args => ({
        components: { NIcon },
        setup() {
            return { args }
        },
        template: `
            <div class="flex items-center gap-4">
                <NIcon v-bind="args" name="mdi-loading" class="text-4xl animate-spin" />
                <NIcon v-bind="args" name="mdi-sync" class="text-4xl animate-spin text-brand" />
                <NIcon v-bind="args" name="mdi-cog" class="text-4xl animate-spin text-muted" />
            </div>
        `
    })
}

export const Clickable: Story = {
    args: {
        name: 'mdi-cursor-default-click'
    },
    render: args => ({
        components: { NIcon },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex items-center gap-2">
                    <NIcon v-bind="args" name="mdi-cursor-default-click" href="#" class="text-2xl text-brand" />
                    <span>Clickable (has onClick listener)</span>
                </div>
                
                <div class="flex items-center gap-2">
                    <NIcon v-bind="args" tag="a" href="#" name="mdi-link" class="text-2xl text-info" />
                    <span>Link (tag="a", href="#")</span>
                </div>
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {
        name: 'mdi-account'
    },
    render: args => ({
        components: { NIcon },
        setup() {
            return { args }
        },
        template: `
            <div class="flex items-center gap-4">
                <NIcon v-bind="args" name="mdi-account" class="text-4xl" />
                <NIcon v-bind="args" name="mdi-account" disabled class="text-4xl" />
                
                <NIcon v-bind="args" tag="a" href="#" name="mdi-link" disabled class="text-4xl text-brand" />
            </div>
        `
    })
}
