import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NAvatar from './NAvatar.vue'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NAvatar',
    component: NAvatar,
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
        components: { NAvatar },
        setup() {
            return { args }
        },
        template: '<NAvatar v-bind="args" icon="mdi-account"></NAvatar>'
    })
}

export const Normal: Story = {
    args: {},
    render: args => ({
        components: { NAvatar },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <div><NAvatar v-bind="args" icon="mdi-account" class=""></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class=" primary"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class=" success"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class=" error"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class=" warning"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class=" info"></NAvatar></div>
            </div>
        `
    })
}

export const Pilled: Story = {
    args: {},
    render: args => ({
        components: { NAvatar },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <div><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="pilled primary"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="pilled success"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="pilled error"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="pilled warning"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="pilled info"></NAvatar></div>
            </div>
        `
    })
}

export const Squared: Story = {
    args: {},
    render: args => ({
        components: { NAvatar },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <div><NAvatar v-bind="args" icon="mdi-account" class="squared"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="squared primary"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="squared success"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="squared error"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="squared warning"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="squared info"></NAvatar></div>
            </div>
        `
    })
}

export const Shadowed: Story = {
    args: {},
    render: args => ({
        components: { NAvatar },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <div><NAvatar v-bind="args" icon="mdi-account" class="shadowed"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="shadowed primary"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="shadowed success"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="shadowed error"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="shadowed warning"></NAvatar></div>
                <div><NAvatar v-bind="args" icon="mdi-account" class="shadowed info"></NAvatar></div>
            </div>
        `
    })
}

export const Labels: Story = {
    args: {},
    render: args => ({
        components: { NAvatar },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <div><NAvatar v-bind="args" class="rounded">A</NAvatar></div>
                <div><NAvatar v-bind="args" class="rounded primary">B</NAvatar></div>
                <div><NAvatar v-bind="args" class="rounded success">C</NAvatar></div>
                <div><NAvatar v-bind="args" class="rounded error">D</NAvatar></div>
                <div><NAvatar v-bind="args" class="rounded warning">E</NAvatar></div>
                <div><NAvatar v-bind="args" class="rounded info">F</NAvatar></div>
            </div>
        `
    })
}

export const Sizes: Story = {
    args: {},
    render: args => ({
        components: { NAvatar },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-4">
                    <div><NAvatar v-bind="args" icon="mdi-account" class="text-xs"></NAvatar></div>
                    <div><NAvatar v-bind="args" icon="mdi-account" class="text-sm"></NAvatar></div>
                    <div><NAvatar v-bind="args" icon="mdi-account" class="text-base"></NAvatar></div>
                    <div><NAvatar v-bind="args" icon="mdi-account" class="text-lg"></NAvatar></div>
                    <div><NAvatar v-bind="args" icon="mdi-account" class="text-xl"></NAvatar></div>                
                </div>

                <div class="flex flex-row items-center gap-4">
                    <div><NAvatar v-bind="args" class="text-xs">A</NAvatar></div>
                    <div><NAvatar v-bind="args" class="text-sm">B</NAvatar></div>
                    <div><NAvatar v-bind="args" class="text-base">C</NAvatar></div>
                    <div><NAvatar v-bind="args" class="text-lg">D</NAvatar></div>
                    <div><NAvatar v-bind="args" class="text-xl">E</NAvatar></div>                    
                </div>
            </div>
        `
    })
}

export const Buttons: Story = {
    args: {},
    render: args => ({
        components: { NAvatar, NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">                
                <div class="flex flex-row items-center gap-4">
                    <NButton class="pilled"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                    <NButton class="outlined"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                    <NButton class="texted"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                    <NButton class="flat"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                    <NButton class="squared"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                    <NButton class="shadowed"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                </div>

                <div class="flex flex-row items-center gap-4">
                    <NButton class="pilled primary"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                    <NButton class="outlined primary"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                    <NButton class="texted primary"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                    <NButton class="flat primary"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                    <NButton class="squared primary"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                    <NButton class="shadowed primary"><NAvatar v-bind="args" icon="mdi-account" ></NAvatar></NButton>
                </div>

                <div class="flex flex-row items-center gap-4">
                    <NButton class="pilled"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="outlined"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="texted"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="flat"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="squared"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="shadowed"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                </div>

                <div class="flex flex-row items-center gap-4">
                    <NButton class="pilled primary"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="outlined primary"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="texted primary"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="flat primary"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="squared primary"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="shadowed primary"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                </div>

                <div class="flex flex-row items-center gap-4">
                    <NButton class="pilled primary text-[2rem]"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="outlined primary text-[2rem]"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="texted primary text-[2rem]"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="flat primary text-[2rem]"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="squared primary text-[2rem]"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                    <NButton class="shadowed primary text-[2rem]"><NAvatar v-bind="args" label="T" ></NAvatar></NButton>
                </div>
            </div>
        `
    })
}
