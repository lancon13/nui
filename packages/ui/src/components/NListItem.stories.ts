import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NListItem from './NListItem.vue'
import NIcon from './NIcon.vue'
import NAvatar from './NAvatar.vue'
import { ref } from 'vue'

const meta = {
    title: 'UI/NListItem',
    component: NListItem,
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
        components: { NListItem },
        setup() {
            return { args }
        },
        template: `
            <ul class="n-list">
                <NListItem v-bind="args" href="http://www.google.com">Item 1</NListItem>
                <NListItem v-bind="args" >Item 2</NListItem>
                <NListItem v-bind="args" >Item 3</NListItem>
            </ul>
        `
    })
}

export const List: Story = {
    args: {},
    render: args => ({
        components: { NListItem },
        setup() {
            return { args }
        },
        template: `
            <ul class="n-list w-64 bg-white text-black shadowed">
                <NListItem v-bind="args" icon="mdi-account" to="www.google.com" class="n-separator">Profile</NListItem>
                <NListItem v-bind="args" icon="mdi-list-status" to="www.google.com">Options</NListItem>
                <NListItem v-bind="args" icon="mdi-cog" to="www.google.com" class="n-separator">Settings</NListItem>
                <NListItem v-bind="args" icon="mdi-logout" to="www.google.com">Sign out</NListItem>    
            </ul>
        `
    })
}

export const SingleComplex: Story = {
    args: {},
    render: args => ({
        components: { NListItem, NAvatar, NIcon },
        setup() {
            return { args }
        },
        template: `
            <NListItem v-bind="args" class="bg-white text-black shadowed items-start" >
                <NAvatar v-bind="args" class="rounded">A</NAvatar>
                <div class="w-64">
                    <h1 class="text-lg/none font-bold mb-2">Option 1</h1>
                    <p class="text-xs">This property corresponds to the margin-top and margin-bottom, or the margin-right and margin-left properties, depending on the values defined for writing-mode, direction, and text-orientation.</p>
                </div>
                <NIcon name="cursor-default-click" />
            </NListItem>
        `
    })
}

export const UsersList: Story = {
    args: {},
    render: args => ({
        components: { NListItem, NAvatar, NIcon },
        setup() {
            const toggledSwitches = ref({})

            return { args, toggledSwitches }
        },
        template: `
            <div>
                <h1 class="text-lg text-text/50 font-bold mb-4">Users</h1>
                <ul class="n-list bg-white text-black shadowed">
                    <NListItem v-bind="args" class="n-separator items-center" >
                        <NAvatar v-bind="args" class="pilled">G</NAvatar>
                        <div class="w-64">
                            <h1 class="text-lg/tight font-bold">Gordon Cheng</h1>
                            <p class="text-xs">lancon13@gmail.com</p>
                        </div>
                        <NIcon name="toggle-switch" class="text-3xl" />
                    </NListItem>
                    <NListItem v-bind="args" class="n-separator items-center" >
                        <NAvatar v-bind="args" class="pilled">G</NAvatar>
                        <div class="w-64">
                            <h1 class="text-lg/tight font-bold">Gordon Cheng</h1>
                            <p class="text-xs">lancon13@gmail.com</p>
                        </div>
                        <NIcon name="toggle-switch" class="text-3xl" />
                    </NListItem>
                    <NListItem v-bind="args" class="n-separator items-center" >
                        <NAvatar v-bind="args" class="pilled">G</NAvatar>
                        <div class="w-64">
                            <h1 class="text-lg/tight font-bold">Gordon Cheng</h1>
                            <p class="text-xs">lancon13@gmail.com</p>
                        </div>
                        <NIcon @click="() => toggledSwitches[3] = !toggledSwitches[3]" :name="toggledSwitches[3] ? 'toggle-switch' : 'toggle-switch-off'" class="text-3xl"  />
                    </NListItem>
                </ul>
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {},
    render: args => ({
        components: { NListItem },
        setup() {
            return { args }
        },
        template: `
            <ul class="n-list w-64 bg-white text-black shadowed">
                <NListItem v-bind="args" icon="mdi-account" to="www.google.com" iconClass="text-primary" class="n-separator">Profile</NListItem>
                <NListItem v-bind="args" icon="mdi-list-status" to="www.google.com" iconClass="text-primary">Options</NListItem>
                <NListItem v-bind="args" icon="mdi-cog" to="www.google.com" iconClass="text-primary" class="n-separator">Settings</NListItem>
                <NListItem v-bind="args" icon="mdi-logout" to="www.google.com" iconClass="text-primary" disabled>Sign out</NListItem>    
            </ul>
        `
    })
}
