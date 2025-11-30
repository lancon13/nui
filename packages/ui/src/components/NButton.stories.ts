import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
// import { fn } from '@storybook/test'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NButton',
    component: NButton,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        loadingType: { control: 'select', options: ['normal'] },
        loadingClass: { control: 'text' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: '<NButton v-bind="args">Button</NButton>'
    })
}

export const Normal: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton v-bind="args">Button</NButton>
                <NButton v-bind="args" class="primary">Primary</NButton>
                <NButton v-bind="args" class="success">Success</NButton>
                <NButton v-bind="args" class="error">Error</NButton>
                <NButton v-bind="args" class="warning">Warning</NButton>
                <NButton v-bind="args" class="info">Info</NButton>
            </div>
        `
    })
}

export const Flat: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton v-bind="args" class="flat" >Button</NButton>
                <NButton v-bind="args" class="flat primary" >Primary</NButton>
                <NButton v-bind="args" class="flat success" >Success</NButton>
                <NButton v-bind="args" class="flat error" >Error</NButton>
                <NButton v-bind="args" class="flat warning" >Warning</NButton>
                <NButton v-bind="args" class="flat info" >Info</NButton>
            </div>
        `
    })
}

export const Outline: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton v-bind="args" class="outlined">Button</NButton>
                <NButton v-bind="args" class="outlined primary">Primary</NButton>
                <NButton v-bind="args" class="outlined success">Success</NButton>
                <NButton v-bind="args" class="outlined error">Error</NButton>
                <NButton v-bind="args" class="outlined warning">Warning</NButton>
                <NButton v-bind="args" class="outlined info">Info</NButton>
            </div>
        `
    })
}

export const Texted: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton v-bind="args" class="texted">Button</NButton>
                <NButton v-bind="args" class="texted primary">Primary</NButton>
                <NButton v-bind="args" class="texted success">Success</NButton>
                <NButton v-bind="args" class="texted error">Error</NButton>
                <NButton v-bind="args" class="texted warning">Warning</NButton>
                <NButton v-bind="args" class="texted info">Info</NButton>
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" disabled class="">Button</NButton>
                    <NButton v-bind="args" disabled class="primary">Primary</NButton>
                    <NButton v-bind="args" disabled class="success">Success</NButton>
                    <NButton v-bind="args" disabled class="error">Error</NButton>
                    <NButton v-bind="args" disabled class="warning">Warning</NButton>
                    <NButton v-bind="args" disabled class="info">Info</NButton>
                </div>

                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" disabled class="flat">Button</NButton>
                    <NButton v-bind="args" disabled class="flat primary">Primary</NButton>
                    <NButton v-bind="args" disabled class="flat success">Success</NButton>
                    <NButton v-bind="args" disabled class="flat error">Error</NButton>
                    <NButton v-bind="args" disabled class="flat warning">Warning</NButton>
                    <NButton v-bind="args" disabled class="flat info">Info</NButton>
                </div>

                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" disabled class="outlined">Button</NButton>
                    <NButton v-bind="args" disabled class="outlined primary">Primary</NButton>
                    <NButton v-bind="args" disabled class="outlined success">Success</NButton>
                    <NButton v-bind="args" disabled class="outlined error">Error</NButton>
                    <NButton v-bind="args" disabled class="outlined warning">Warning</NButton>
                    <NButton v-bind="args" disabled class="outlined info">Info</NButton>
                </div>

                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" disabled class="texted">Button</NButton>
                    <NButton v-bind="args" disabled class="texted primary">Primary</NButton>
                    <NButton v-bind="args" disabled class="texted success">Success</NButton>
                    <NButton v-bind="args" disabled class="texted error">Error</NButton>
                    <NButton v-bind="args" disabled class="texted warning">Warning</NButton>
                    <NButton v-bind="args" disabled class="texted info">Info</NButton>
                </div>
            </div>
        `
    })
}

export const Sizes: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <div>
                        <NButton v-bind="args" class="text-xs">X-Small</NButton>
                    </div>
                    <div>
                        <NButton v-bind="args" class="text-sm">Small</NButton>                    
                    </div>
                    <div>
                        <NButton v-bind="args" class="text-base">Base</NButton>                    
                    </div>
                    <div>
                        <NButton v-bind="args" class="text-lg">Large</NButton>                    
                    </div>
                    <div>
                        <NButton v-bind="args" class="text-xl">X-Large</NButton>                
                    </div>                                        
                </div>
                
                <div class="flex flex-row items-stretch gap-4">
                    <NButton v-bind="args" class="text-xs">X-Small</NButton>
                    <NButton v-bind="args" class="text-sm">Small</NButton>
                    <NButton v-bind="args" class="text-base">Base</NButton>
                    <NButton v-bind="args" class="text-lg">Large</NButton>
                    <NButton v-bind="args" class="text-xl">X-Large</NButton>              
                    
                </div>
            </div>
        `
    })
}

export const Pilled: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="pilled">Button</NButton>
                    <NButton v-bind="args" class="pilled primary">Primary</NButton>
                    <NButton v-bind="args" class="pilled success">Success</NButton>
                    <NButton v-bind="args" class="pilled error">Error</NButton>
                    <NButton v-bind="args" class="pilled warning">Warning</NButton>
                    <NButton v-bind="args" class="pilled info">Info</NButton>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="pilled flat">Button</NButton>
                    <NButton v-bind="args" class="pilled primary flat">Primary</NButton>
                    <NButton v-bind="args" class="pilled success flat">Success</NButton>
                    <NButton v-bind="args" class="pilled error flat">Error</NButton>
                    <NButton v-bind="args" class="pilled warning flat">Warning</NButton>
                    <NButton v-bind="args" class="pilled info flat">Info</NButton>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="pilled outlined">Button</NButton>
                    <NButton v-bind="args" class="pilled primary outlined">Primary</NButton>
                    <NButton v-bind="args" class="pilled success outlined">Success</NButton>
                    <NButton v-bind="args" class="pilled error outlined">Error</NButton>
                    <NButton v-bind="args" class="pilled warning outlined">Warning</NButton>
                    <NButton v-bind="args" class="pilled info outlined">Info</NButton>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="pilled texted">Button</NButton>
                    <NButton v-bind="args" class="pilled primary texted">Primary</NButton>
                    <NButton v-bind="args" class="pilled success texted">Success</NButton>
                    <NButton v-bind="args" class="pilled error texted">Error</NButton>
                    <NButton v-bind="args" class="pilled warning texted">Warning</NButton>
                    <NButton v-bind="args" class="pilled info texted">Info</NButton>
                </div>
            </div>
        `
    })
}

export const Squared: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="squared">Button</NButton>
                    <NButton v-bind="args" class="squared primary">Primary</NButton>
                    <NButton v-bind="args" class="squared success">Success</NButton>
                    <NButton v-bind="args" class="squared error">Error</NButton>
                    <NButton v-bind="args" class="squared warning">Warning</NButton>
                    <NButton v-bind="args" class="squared info">Info</NButton>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="squared flat">Button</NButton>
                    <NButton v-bind="args" class="squared primary flat">Primary</NButton>
                    <NButton v-bind="args" class="squared success flat">Success</NButton>
                    <NButton v-bind="args" class="squared error flat">Error</NButton>
                    <NButton v-bind="args" class="squared warning flat">Warning</NButton>
                    <NButton v-bind="args" class="squared info flat">Info</NButton>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="squared outlined">Button</NButton>
                    <NButton v-bind="args" class="squared primary outlined">Primary</NButton>
                    <NButton v-bind="args" class="squared success outlined">Success</NButton>
                    <NButton v-bind="args" class="squared error outlined">Error</NButton>
                    <NButton v-bind="args" class="squared warning outlined">Warning</NButton>
                    <NButton v-bind="args" class="squared info outlined">Info</NButton>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="squared texted">Button</NButton>
                    <NButton v-bind="args" class="squared primary texted">Primary</NButton>
                    <NButton v-bind="args" class="squared success texted">Success</NButton>
                    <NButton v-bind="args" class="squared error texted">Error</NButton>
                    <NButton v-bind="args" class="squared warning texted">Warning</NButton>
                    <NButton v-bind="args" class="squared info texted">Info</NButton>
                </div>
            </div>
        `
    })
}

export const Shadowed: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="shadowed">Button</NButton>
                    <NButton v-bind="args" class="shadowed primary">Primary</NButton>
                    <NButton v-bind="args" class="shadowed success">Success</NButton>
                    <NButton v-bind="args" class="shadowed error">Error</NButton>
                    <NButton v-bind="args" class="shadowed warning">Warning</NButton>
                    <NButton v-bind="args" class="shadowed info">Info</NButton>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="shadowed flat">Button</NButton>
                    <NButton v-bind="args" class="shadowed primary flat">Primary</NButton>
                    <NButton v-bind="args" class="shadowed success flat">Success</NButton>
                    <NButton v-bind="args" class="shadowed error flat">Error</NButton>
                    <NButton v-bind="args" class="shadowed warning flat">Warning</NButton>
                    <NButton v-bind="args" class="shadowed info flat">Info</NButton>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="shadowed outlined">Button</NButton>
                    <NButton v-bind="args" class="shadowed primary outlined">Primary</NButton>
                    <NButton v-bind="args" class="shadowed success outlined">Success</NButton>
                    <NButton v-bind="args" class="shadowed error outlined">Error</NButton>
                    <NButton v-bind="args" class="shadowed warning outlined">Warning</NButton>
                    <NButton v-bind="args" class="shadowed info outlined">Info</NButton>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="shadowed texted">Button</NButton>
                    <NButton v-bind="args" class="shadowed primary texted">Primary</NButton>
                    <NButton v-bind="args" class="shadowed success texted">Success</NButton>
                    <NButton v-bind="args" class="shadowed error texted">Error</NButton>
                    <NButton v-bind="args" class="shadowed warning texted">Warning</NButton>
                    <NButton v-bind="args" class="shadowed info texted">Info</NButton>
                </div>
            </div>
        `
    })
}

export const Icon: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton v-bind="args" prependIcon="arrow-left" class="flat">Prev</NButton>
                <NButton v-bind="args" appendIcon="arrow-right" class="flat">Next</NButton>                
                <div></div>
                <NButton v-bind="args" icon="send" class="primary">Send</NButton>
                <div></div>
                <NButton v-bind="args" prependIcon="alert" appendIcon="alert" class="texted error">Delete</NButton>
            </div>
        `
    })
}

export const IconOnly: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" prependIcon="arrow-left" ></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" ></NButton>                
                    <NButton v-bind="args" prependIcon="arrow-left" class="pilled"></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="pilled"></NButton>
                    <NButton v-bind="args" prependIcon="arrow-left" class="squared"></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="squared"></NButton>                
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" prependIcon="arrow-left" class="icon" ></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="icon" ></NButton>                
                    <NButton v-bind="args" prependIcon="arrow-left" class="icon pilled"></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="icon pilled"></NButton>
                    <NButton v-bind="args" prependIcon="arrow-left" class="icon squared"></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="icon squared"></NButton>                
                </div>

                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" prependIcon="arrow-left" class="flat"></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="flat"></NButton>                
                    <NButton v-bind="args" prependIcon="arrow-left" class="outlined"></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="outlined"></NButton>
                    <NButton v-bind="args" prependIcon="arrow-left" class="texted squared"></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="texted squared"></NButton>                
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" prependIcon="arrow-left" class="icon primary" ></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="icon primary" ></NButton>                
                    <NButton v-bind="args" prependIcon="arrow-left" class="icon pilled outlined primary"></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="icon pilled outlined primary"></NButton>
                    <NButton v-bind="args" prependIcon="arrow-left" class="icon squared flat primary"></NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="icon squared flat primary"></NButton>                
                </div>
            </div>
        `
    })
}

export const Loading: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            const loading = ref(true)
            const toggleLoading = () => {
                loading.value = !loading.value
            }
            return { args, loading, toggleLoading }
        },
        template: `
            <div class="flex flex-col items-center gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" prependIcon="arrow-left" :loading="loading">Default</NButton>
                    <NButton v-bind="args" appendIcon="arrow-right" class="flat" :loading="loading" loadingClass="text-xl">Small</NButton>
                    <NButton v-bind="args" icon="send" class="primary" :loading="loading" loadingClass="text-warning">Color</NButton>
                </div>
                <NButton label="Toggle Loading" @click="toggleLoading" />
            </div>
        `
    })
}
