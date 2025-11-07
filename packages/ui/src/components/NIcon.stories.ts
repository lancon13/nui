import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NIcon from './NIcon.vue'

const meta = {
    title: 'UI/NIcon',
    component: NIcon,
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
        components: { NIcon },
        setup() {
            return { args }
        },
        template: '<NIcon v-bind="args" name="mdi-account"></NIcon>'
    })
}

export const Sizes: Story = {
    args: {},
    render: args => ({
        components: { NIcon },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NIcon v-bind="args" name="mdi-magnify" class="text-sm"></NIcon>
                <NIcon v-bind="args" name="mdi-magnify" class="text-lg"></NIcon>
                <NIcon v-bind="args" name="mdi-magnify" class="text-xl"></NIcon>
                <NIcon v-bind="args" name="mdi-magnify" class="text-2xl"></NIcon>
                <NIcon v-bind="args" name="mdi-magnify" class="text-[3rem]"></NIcon>
                <NIcon v-bind="args" name="mdi-magnify" class="text-[5rem]"></NIcon>
            </div>
        `
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NIcon },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NIcon v-bind="args" name="mdi-magnify" class="text-[3rem]"></NIcon>
                <NIcon v-bind="args" name="mdi-magnify" class="text-[3rem] text-primary"></NIcon>
                <NIcon v-bind="args" name="mdi-magnify" class="text-[3rem] text-success"></NIcon>
                <NIcon v-bind="args" name="mdi-magnify" class="text-[3rem] text-error"></NIcon>
                <NIcon v-bind="args" name="mdi-magnify" class="text-[3rem] text-warning"></NIcon>
                <NIcon v-bind="args" name="mdi-magnify" class="text-[3rem] text-info"></NIcon>                
            </div>
        `
    })
}
