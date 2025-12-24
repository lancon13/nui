import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NButton from './NButton.vue'
import NAvatar from './NAvatar.vue'

const meta = {
    title: 'UI/NButton',
    component: NButton,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        loadingName: { control: 'text' },
        loadingClass: { control: 'text' },
        tag: { control: 'text' },
        type: { control: 'text' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Button'
    },
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: '<NButton v-bind="args" />'
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton v-bind="args" label="Default" />
                <NButton v-bind="args" class="primary" label="Primary" />
                <NButton v-bind="args" class="success" label="Success" />
                <NButton v-bind="args" class="error" label="Error" />
                <NButton v-bind="args" class="warning" label="Warning" />
                <NButton v-bind="args" class="info" label="Info" />
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
                <NButton v-bind="args" class="flat" label="Default" />
                <NButton v-bind="args" class="flat primary" label="Primary" />
                <NButton v-bind="args" class="flat success" label="Success" />
                <NButton v-bind="args" class="flat error" label="Error" />
                <NButton v-bind="args" class="flat warning" label="Warning" />
                <NButton v-bind="args" class="flat info" label="Info" />
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
                <NButton v-bind="args" class="outlined" label="Default" />
                <NButton v-bind="args" class="outlined primary" label="Primary" />
                <NButton v-bind="args" class="outlined success" label="Success" />
                <NButton v-bind="args" class="outlined error" label="Error" />
                <NButton v-bind="args" class="outlined warning" label="Warning" />
                <NButton v-bind="args" class="outlined info" label="Info" />
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
                <NButton v-bind="args" class="texted" label="Default" />
                <NButton v-bind="args" class="texted primary" label="Primary" />
                <NButton v-bind="args" class="texted success" label="Success" />
                <NButton v-bind="args" class="texted error" label="Error" />
                <NButton v-bind="args" class="texted warning" label="Warning" />
                <NButton v-bind="args" class="texted info" label="Info" />
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
                    <NButton v-bind="args" class="text-xs" label="X-Small" />
                    <NButton v-bind="args" class="text-sm" label="Small" />
                    <NButton v-bind="args" class="text-base" label="Base" />
                    <NButton v-bind="args" class="text-lg" label="Large" />
                    <NButton v-bind="args" class="text-xl" label="X-Large" />
                </div>
                
                <div class="flex flex-row items-stretch gap-4">
                    <NButton v-bind="args" class="text-xs" label="X-Small" />
                    <NButton v-bind="args" class="text-sm" label="Small" />
                    <NButton v-bind="args" class="text-base" label="Base" />
                    <NButton v-bind="args" class="text-lg" label="Large" />
                    <NButton v-bind="args" class="text-xl" label="X-Large" />
                </div>
            </div>
        `
    })
}

export const Shapes: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="pilled" label="Pilled" />
                    <NButton v-bind="args" class="pilled primary" label="Primary" />
                    <NButton v-bind="args" class="flat success pilled" label="Flat Success" />
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="squared" label="Squared" />
                    <NButton v-bind="args" class="squared primary" label="Primary" />
                    <NButton v-bind="args" class="outlined error squared" label="Outlined Error" />
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
            <div class="flex flex-row items-center gap-4">
                <NButton v-bind="args" class="shadowed" label="Default" />
                <NButton v-bind="args" class="shadowed primary" label="Primary" />
                <NButton v-bind="args" class="shadowed flat success" label="Flat Success" />
            </div>
        `
    })
}

export const Icons: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" prependIcon="mdi-arrow-left" class="flat" label="Prev" />
                    <NButton v-bind="args" appendIcon="mdi-arrow-right" class="flat" label="Next" />
                    <NButton v-bind="args" icon="mdi-send" class="primary" label="Send" />
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" icon="mdi-magnify" class="icon" />
                    <NButton v-bind="args" icon="mdi-magnify" class="icon primary" />
                    <NButton v-bind="args" icon="mdi-magnify" class="icon flat pilled" />
                    <NButton v-bind="args" icon="mdi-magnify" class="icon outlined squared" />
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
                    <NButton v-bind="args" :loading="loading" label="Default" />
                    <NButton v-bind="args" class="flat" :loading="loading" loadingClass="text-xl animate-spin" label="Custom Class" />
                    <NButton v-bind="args" class="primary" :loading="loading" loadingName="mdi-sync" loadingClass="animate-spin" label="Custom Icon" />
                </div>
                <NButton label="Toggle Loading" @click="toggleLoading" />
            </div>
        `
    })
}

export const Links: Story = {
    args: {},
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton v-bind="args" tag="a" href="https://google.com" target="_blank" label="External Link" />
                <NButton v-bind="args" class="primary" tag="a" href="#" label="Anchor Link" />
            </div>
        `
    })
}

export const WithAvatar: Story = {
    args: {},
    render: args => ({
        components: { NButton, NAvatar },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton v-bind="args" class="pilled">
                    <NAvatar icon="mdi-account" size="2rem" />
                    <span class="mr-2">John Doe</span>
                </NButton>
                <NButton v-bind="args" class="flat pilled primary">
                    <NAvatar icon="mdi-account-circle" size="2rem" />
                    <span class="mr-2">Jane Smith</span>
                </NButton>
                <NButton v-bind="args" class="icon pilled">
                    <NAvatar icon="mdi-account-outline" size="2.5rem" />
                </NButton>
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {
        disabled: true
    },
    render: args => ({
        components: { NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" label="Solid" />
                    <NButton v-bind="args" class="primary" label="Primary" />
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="flat" label="Flat" />
                    <NButton v-bind="args" class="flat success" label="Success" />
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="outlined" label="Outlined" />
                    <NButton v-bind="args" class="outlined error" label="Error" />
                </div>
                <div class="flex flex-row items-center gap-4">
                    <NButton v-bind="args" class="texted" label="Texted" />
                    <NButton v-bind="args" class="texted info" label="Info" />
                </div>
            </div>
        `
    })
}
