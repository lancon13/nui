import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NChip from './NChip.vue'

const meta = {
    title: 'UI/NChip',
    component: NChip,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'clicked' },
        onRemove: { action: 'removed' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: '<NChip v-bind="args">STATUS</NChip>'
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args">Default</NChip>
                <NChip v-bind="args" class="brand">Brand</NChip>
                <NChip v-bind="args" class="success">Success</NChip>
                <NChip v-bind="args" class="error">Error</NChip>
                <NChip v-bind="args" class="warning">Warning</NChip>
                <NChip v-bind="args" class="info">Info</NChip>
            </div>
        `
    })
}

export const Flat: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args" class="flat">Default</NChip>
                <NChip v-bind="args" class="flat brand">Brand</NChip>
                <NChip v-bind="args" class="flat success">Success</NChip>
                <NChip v-bind="args" class="flat error">Error</NChip>
                <NChip v-bind="args" class="flat warning">Warning</NChip>
                <NChip v-bind="args" class="flat info">Info</NChip>
            </div>
        `
    })
}

export const Outline: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args" class="outlined">Default</NChip>
                <NChip v-bind="args" class="outlined brand">Brand</NChip>
                <NChip v-bind="args" class="outlined success">Success</NChip>
                <NChip v-bind="args" class="outlined error">Error</NChip>
                <NChip v-bind="args" class="outlined warning">Warning</NChip>
                <NChip v-bind="args" class="outlined info">Info</NChip>
            </div>
        `
    })
}

export const Texted: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args" class="texted">Default</NChip>
                <NChip v-bind="args" class="texted brand">Brand</NChip>
                <NChip v-bind="args" class="texted success">Success</NChip>
                <NChip v-bind="args" class="texted error">Error</NChip>
                <NChip v-bind="args" class="texted warning">Warning</NChip>
                <NChip v-bind="args" class="texted info">Info</NChip>
            </div>
        `
    })
}

export const Sizes: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="text-xs">X-Small</NChip>
                    <NChip v-bind="args" class="text-sm">Small</NChip>
                    <NChip v-bind="args" class="text-base">Base</NChip>
                    <NChip v-bind="args" class="text-lg">Large</NChip>
                    <NChip v-bind="args" class="text-xl">X-Large</NChip>
                </div>
            </div>
        `
    })
}

export const Shapes: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="pilled">Pilled</NChip>
                    <NChip v-bind="args" class="pilled brand">Brand</NChip>
                    <NChip v-bind="args" class="pilled flat success">Success</NChip>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="squared">Squared</NChip>
                    <NChip v-bind="args" class="squared brand">Brand</NChip>
                    <NChip v-bind="args" class="squared outlined error">Error</NChip>
                </div>
            </div>
        `
    })
}

export const Shadowed: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args" class="shadowed">Default</NChip>
                <NChip v-bind="args" class="shadowed brand">Brand</NChip>
                <NChip v-bind="args" class="shadowed flat success">Success</NChip>
            </div>
        `
    })
}

export const Icons: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args" prependIcon="mdi-account" class="flat">Prepend</NChip>
                <NChip v-bind="args" appendIcon="mdi-check" class="flat brand">Append</NChip>
                <NChip v-bind="args" icon="mdi-delete" class="error">Icon Prop</NChip>
            </div>
        `
    })
}

export const Removable: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args" removable @remove="args.onRemove">Default Removable</NChip>
                <NChip v-bind="args" class="brand" removable @remove="args.onRemove">Brand Removable</NChip>
                <NChip v-bind="args" removable removable-class="text-error" @remove="args.onRemove">Custom Close Style</NChip>
            </div>
        `
    })
}

export const Clickable: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args" href="#" @click="args.onClick">Click Me</NChip>
                <NChip v-bind="args" class="brand" href="#" @click="args.onClick">Click Me (Brand)</NChip>
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {
        disabled: true
    },
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args" href="#" @click="args.onClick">Disabled</NChip>
                <NChip v-bind="args" class="brand" href="#" @click="args.onClick">Disabled (Brand)</NChip>
            </div>
        `
    })
}
