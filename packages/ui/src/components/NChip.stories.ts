import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NChip from './NChip.vue'

const meta = {
    title: 'UI/NChip',
    component: NChip,
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
        components: { NChip },
        setup() {
            return { args }
        },
        template: '<NChip v-bind="args">STATUS</NChip>'
    })
}

export const Normal: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args">Active</NChip>
                <NChip v-bind="args" class="primary">Primary</NChip>
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
                <NChip v-bind="args" class="flat" >Active</NChip>
                <NChip v-bind="args" class="flat primary" >Primary</NChip>
                <NChip v-bind="args" class="flat success" >Success</NChip>
                <NChip v-bind="args" class="flat error" >Error</NChip>
                <NChip v-bind="args" class="flat warning" >Warning</NChip>
                <NChip v-bind="args" class="flat info" >Info</NChip>
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
                <NChip v-bind="args" class="outlined">Active</NChip>
                <NChip v-bind="args" class="outlined primary">Primary</NChip>
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
                <NChip v-bind="args" class="texted">Active</NChip>
                <NChip v-bind="args" class="texted primary">Primary</NChip>
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
                    <div>
                        <NChip v-bind="args" class="text-xs">X-Small</NChip>
                    </div>
                    <div>
                        <NChip v-bind="args" class="text-sm">Small</NChip>                    
                    </div>
                    <div>
                        <NChip v-bind="args" class="text-base">Base</NChip>                    
                    </div>
                    <div>
                        <NChip v-bind="args" class="text-lg">Large</NChip>                    
                    </div>
                    <div>
                        <NChip v-bind="args" class="text-xl">X-Large</NChip>                
                    </div>                                        
                </div>
                
                <div class="flex flex-row items-stretch gap-4">
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

export const Pilled: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="pilled">Active</NChip>
                    <NChip v-bind="args" class="pilled primary">Primary</NChip>
                    <NChip v-bind="args" class="pilled success">Success</NChip>
                    <NChip v-bind="args" class="pilled error">Error</NChip>
                    <NChip v-bind="args" class="pilled warning">Warning</NChip>
                    <NChip v-bind="args" class="pilled info">Info</NChip>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="pilled flat">Active</NChip>
                    <NChip v-bind="args" class="pilled primary flat">Primary</NChip>
                    <NChip v-bind="args" class="pilled success flat">Success</NChip>
                    <NChip v-bind="args" class="pilled error flat">Error</NChip>
                    <NChip v-bind="args" class="pilled warning flat">Warning</NChip>
                    <NChip v-bind="args" class="pilled info flat">Info</NChip>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="pilled outlined">Active</NChip>
                    <NChip v-bind="args" class="pilled primary outlined">Primary</NChip>
                    <NChip v-bind="args" class="pilled success outlined">Success</NChip>
                    <NChip v-bind="args" class="pilled error outlined">Error</NChip>
                    <NChip v-bind="args" class="pilled warning outlined">Warning</NChip>
                    <NChip v-bind="args" class="pilled info outlined">Info</NChip>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="pilled texted">Active</NChip>
                    <NChip v-bind="args" class="pilled primary texted">Primary</NChip>
                    <NChip v-bind="args" class="pilled success texted">Success</NChip>
                    <NChip v-bind="args" class="pilled error texted">Error</NChip>
                    <NChip v-bind="args" class="pilled warning texted">Warning</NChip>
                    <NChip v-bind="args" class="pilled info texted">Info</NChip>
                </div>
            </div>
        `
    })
}

export const Squared: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="squared">Active</NChip>
                    <NChip v-bind="args" class="squared primary">Primary</NChip>
                    <NChip v-bind="args" class="squared success">Success</NChip>
                    <NChip v-bind="args" class="squared error">Error</NChip>
                    <NChip v-bind="args" class="squared warning">Warning</NChip>
                    <NChip v-bind="args" class="squared info">Info</NChip>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="squared flat">Active</NChip>
                    <NChip v-bind="args" class="squared primary flat">Primary</NChip>
                    <NChip v-bind="args" class="squared success flat">Success</NChip>
                    <NChip v-bind="args" class="squared error flat">Error</NChip>
                    <NChip v-bind="args" class="squared warning flat">Warning</NChip>
                    <NChip v-bind="args" class="squared info flat">Info</NChip>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="squared outlined">Active</NChip>
                    <NChip v-bind="args" class="squared primary outlined">Primary</NChip>
                    <NChip v-bind="args" class="squared success outlined">Success</NChip>
                    <NChip v-bind="args" class="squared error outlined">Error</NChip>
                    <NChip v-bind="args" class="squared warning outlined">Warning</NChip>
                    <NChip v-bind="args" class="squared info outlined">Info</NChip>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="squared texted">Active</NChip>
                    <NChip v-bind="args" class="squared primary texted">Primary</NChip>
                    <NChip v-bind="args" class="squared success texted">Success</NChip>
                    <NChip v-bind="args" class="squared error texted">Error</NChip>
                    <NChip v-bind="args" class="squared warning texted">Warning</NChip>
                    <NChip v-bind="args" class="squared info texted">Info</NChip>
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
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="shadowed">Active</NChip>
                    <NChip v-bind="args" class="shadowed primary">Primary</NChip>
                    <NChip v-bind="args" class="shadowed success">Success</NChip>
                    <NChip v-bind="args" class="shadowed error">Error</NChip>
                    <NChip v-bind="args" class="shadowed warning">Warning</NChip>
                    <NChip v-bind="args" class="shadowed info">Info</NChip>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="shadowed flat">Active</NChip>
                    <NChip v-bind="args" class="shadowed primary flat">Primary</NChip>
                    <NChip v-bind="args" class="shadowed success flat">Success</NChip>
                    <NChip v-bind="args" class="shadowed error flat">Error</NChip>
                    <NChip v-bind="args" class="shadowed warning flat">Warning</NChip>
                    <NChip v-bind="args" class="shadowed info flat">Info</NChip>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="shadowed outlined">Active</NChip>
                    <NChip v-bind="args" class="shadowed primary outlined">Primary</NChip>
                    <NChip v-bind="args" class="shadowed success outlined">Success</NChip>
                    <NChip v-bind="args" class="shadowed error outlined">Error</NChip>
                    <NChip v-bind="args" class="shadowed warning outlined">Warning</NChip>
                    <NChip v-bind="args" class="shadowed info outlined">Info</NChip>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NChip v-bind="args" class="shadowed texted">Active</NChip>
                    <NChip v-bind="args" class="shadowed primary texted">Primary</NChip>
                    <NChip v-bind="args" class="shadowed success texted">Success</NChip>
                    <NChip v-bind="args" class="shadowed error texted">Error</NChip>
                    <NChip v-bind="args" class="shadowed warning texted">Warning</NChip>
                    <NChip v-bind="args" class="shadowed info texted">Info</NChip>
                </div>
            </div>
        `
    })
}

export const Icon: Story = {
    args: {},
    render: args => ({
        components: { NChip },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NChip v-bind="args" prependIcon="account" class="flat">Test account</NChip>
                <NChip v-bind="args" appendIcon="account" class="flat">User</NChip>                
                <div></div>
                <NChip v-bind="args" icon="delete" class="error">Removed</NChip>
                <div></div>
                <NChip v-bind="args" prependIcon="alert" appendIcon="alert" class="flat error">Delete</NChip>
            </div>
        `
    })
}
