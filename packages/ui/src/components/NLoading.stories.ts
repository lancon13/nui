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
        name: { control: 'text' },
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
                <NLoading v-bind="args" class="text-sm animate-spin"></NLoading>
                <NLoading v-bind="args" class="text-lg animate-spin"></NLoading>
                <NLoading v-bind="args" class="text-xl animate-spin"></NLoading>
                <NLoading v-bind="args" class="text-2xl animate-spin"></NLoading>
                <NLoading v-bind="args" class="text-[3rem] animate-spin"></NLoading>
                <NLoading v-bind="args" class="text-[5rem] animate-spin"></NLoading>
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
                <NLoading v-bind="args" class="text-[3rem] text-brand animate-spin"></NLoading>
                <NLoading v-bind="args" class="text-[3rem] text-success animate-spin"></NLoading>
                <NLoading v-bind="args" class="text-[3rem] text-error animate-spin"></NLoading>
                <NLoading v-bind="args" class="text-[3rem] text-warning animate-spin"></NLoading>
                <NLoading v-bind="args" class="text-[3rem] text-info animate-spin"></NLoading>                
            </div>
        `
    })
}

export const CustomIcon: Story = {
    args: {},
    render: args => ({
        components: { NLoading },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NLoading v-bind="args" name="mdi-cached" class="text-[3rem] animate-spin"></NLoading>
                <NLoading v-bind="args" name="mdi-cached" class="text-[3rem] text-brand animate-spin"></NLoading>
                <NLoading v-bind="args" name="mdi-sync" class="text-[3rem] text-success animate-spin"></NLoading>
            </div>
        `
    })
}

export const Overlay: Story = {
    args: {
        overlay: true,
        class: 'text-5xl animate-spin'
    },
    render: args => ({
        components: { NLoading },
        setup() {
            return { args }
        },
        template: `
            <div class="relative flex h-64 w-64 flex-col items-center justify-center gap-4 border border-border bg-surface p-6 shadow-md">
                <div class="h-12 w-full rounded bg-text/10"></div>
                <div class="h-4 w-full rounded bg-text/10"></div>
                <div class="h-4 w-2/3 rounded bg-text/10"></div>
                <div class="mt-auto h-10 w-full rounded bg-brand/20"></div>
                <NLoading v-bind="args"></NLoading>
            </div>
        `
    })
}