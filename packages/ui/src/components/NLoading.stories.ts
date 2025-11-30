import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NLoading from './NLoading.vue'

const meta = {
    title: 'UI/NLoading',
    component: NLoading,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        type: { control: 'select', options: ['normal'] },
        overlay: { control: 'boolean' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NLoading },
        setup() {
            return { args }
        },
        template: '<NLoading v-bind="args"></NLoading>'
    })
}

export const Sizes: Story = {
    args: {},
    render: args => ({
        components: { NLoading },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NLoading v-bind="args" class="text-sm"></NLoading>
                <NLoading v-bind="args" class="text-lg"></NLoading>
                <NLoading v-bind="args" class="text-xl"></NLoading>
                <NLoading v-bind="args" class="text-2xl"></NLoading>
                <NLoading v-bind="args" class="text-[3rem]"></NLoading>
                <NLoading v-bind="args" class="text-[5rem]"></NLoading>
            </div>
        `
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NLoading },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NLoading v-bind="args" class="text-primary text-5xl"></NLoading>
                <NLoading v-bind="args" class="text-success text-5xl"></NLoading>
                <NLoading v-bind="args" class="text-error text-5xl"></NLoading>
                <NLoading v-bind="args" class="text-warning text-5xl"></NLoading>
                <NLoading v-bind="args" class="text-info text-5xl"></NLoading>                
            </div>
        `
    })
}

export const Overrides: Story = {
    args: {},
    render: args => ({
        components: { NLoading },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NLoading v-bind="args" name="mdi-cached"></NLoading>
                <NLoading v-bind="args" name="mdi-cached" class="text-primary"></NLoading>
            </div>
        `
    })
}

export const Overlay: Story = {
    args: {
        overlay: true,
        class: 'text-5xl'
    },
    render: args => ({
        components: { NLoading },
        setup() {
            return { args }
        },
        template: `
            <div class="relative flex h-48 w-64 items-center justify-center rounded-lg border">
                Some content
                <NLoading v-bind="args"></NLoading>
            </div>
        `
    })
}
