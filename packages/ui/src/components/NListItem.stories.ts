import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NListItem from './NListItem.vue'
import NList from './NList.vue'
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
        tag: { control: 'text' },
        icon: { control: 'text' },
        disabled: { control: 'boolean' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NListItem, NList },
        setup() {
            return { args }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border">
                <NList>
                    <NListItem v-bind="args">Simple Item</NListItem>
                    <NListItem v-bind="args" href="#">Link Item</NListItem>
                    <NListItem v-bind="args" icon="mdi-star">Icon Item</NListItem>
                </NList>
            </div>
        `
    })
}

export const ListIntegration: Story = {
    args: {},
    render: args => ({
        components: { NListItem, NList },
        setup() {
            return { args }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border">
                <NList>
                    <NListItem v-bind="args" icon="mdi-account" class="border-b border-border/10">Profile</NListItem>
                    <NListItem v-bind="args" icon="mdi-cog" class="border-b border-border/10">Settings</NListItem>
                    <NListItem v-bind="args" icon="mdi-logout" class="text-error">Sign out</NListItem>    
                </NList>
            </div>
        `
    })
}

export const ComplexContent: Story = {
    args: {},
    render: args => ({
        components: { NListItem, NAvatar, NIcon, NList },
        setup() {
            return { args }
        },
        template: `
            <div class="w-80 bg-surface shadowed border border-border">
                <NList>
                    <NListItem v-bind="args" class="items-start">
                        <template #prepend>
                            <NAvatar class="pilled" size="2.5rem">A</NAvatar>
                        </template>
                        <div class="flex flex-col gap-1 w-full">
                            <span class="font-bold">Complex Item</span>
                            <p class="text-xs text-text-muted">
                                This item uses slots for custom layout including an avatar and multiline text.
                            </p>
                        </div>
                        <template #append>
                            <NIcon name="mdi-chevron-right" class="text-text-muted mt-1" />
                        </template>
                    </NListItem>
                </NList>
            </div>
        `
    })
}

export const UserList: Story = {
    args: {},
    render: args => ({
        components: { NListItem, NAvatar, NIcon, NList },
        setup() {
            const toggles = ref<Record<number, boolean>>({})
            const users = [
                { id: 1, name: 'Alice Smith', email: 'alice@example.com', initial: 'A' },
                { id: 2, name: 'Bob Jones', email: 'bob@example.com', initial: 'B' },
                { id: 3, name: 'Charlie Day', email: 'charlie@example.com', initial: 'C' }
            ]
            return { args, toggles, users }
        },
        template: `
            <div class="w-80">
                <h3 class="text-sm font-bold text-text-muted mb-2 uppercase tracking-wider">Team Members</h3>
                <NList class="bg-surface shadowed border border-border">
                    
                    <NListItem 
                        v-for="user in users" 
                        :key="user.id" 
                        v-bind="args" 
                        class="items-center border-b last:border-0 border-border/10"
                    >
                        <template #prepend>
                            <NAvatar class="pilled brand text-xs">{{ user.initial }}</NAvatar>
                        </template>
                        
                        <div class="flex-1 min-w-0">
                            <div class="font-bold truncate">{{ user.name }}</div>
                            <div class="text-xs text-text-muted truncate">{{ user.email }}</div>
                        </div>

                        <template #append>
                            <NIcon 
                                class="text-2xl cursor-pointer" 
                                :class="toggles[user.id] ? 'text-brand' : 'text-text-muted'"
                                :name="toggles[user.id] ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"
                                @click.stop="toggles[user.id] = !toggles[user.id]" 
                            />
                        </template>
                    </NListItem>
                </NList>
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {},
    render: args => ({
        components: { NListItem, NList },
        setup() {
            return { args }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border">
                <NList>
                    <NListItem v-bind="args" icon="mdi-account">Active Item</NListItem>
                    <NListItem v-bind="args" icon="mdi-lock" disabled>Disabled Item</NListItem>
                    <NListItem v-bind="args" icon="mdi-cog">Another Active Item</NListItem>
                </NList>
            </div>
        `
    })
}

export const Expandable: Story = {
    args: {},
    render: args => ({
        components: { NListItem, NList },
        setup() {
            return { args }
        },
        template: `
            <div class="w-80 bg-surface shadowed border border-border">
                <NList>
                    <NListItem v-bind="args" expandable icon="mdi-folder">
                        <span>Documents</span>
                        <template #content>
                            <NList class="pl-4 w-full bg-surface-indent">
                                <NListItem icon="mdi-file-document">Resume.pdf</NListItem>
                                <NListItem icon="mdi-file-excel">Budget.xlsx</NListItem>
                            </NList>
                        </template>
                    </NListItem>
                    
                    <NListItem v-bind="args" expandable icon="mdi-image">
                        <span>Photos</span>
                        <template #content>
                            <div class="p-4 text-xs text-text-muted italic">
                                No photos found in this folder.
                            </div>
                        </template>
                    </NListItem>
                </NList>
            </div>
        `
    })
}

export const NestedManual: Story = {
    args: {},
    render: args => ({
        components: { NList, NListItem },
        setup() {
            return { args }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border">
                <NList>
                    <NListItem icon="mdi-home">Home</NListItem>
                    <NListItem icon="mdi-domain">
                        Organization
                        <NList class="w-full pl-4 mt-2 border-l border-border/20">
                            <NListItem icon="mdi-account-group">Teams</NListItem>
                            <NListItem icon="mdi-projector">Projects</NListItem>
                        </NList>
                    </NListItem>
                    <NListItem icon="mdi-cog">Settings</NListItem>
                </NList>
            </div>
        `
    })
}

export const ContentProp: Story = {
    args: {},
    render: args => ({
        components: { NListItem, NList },
        setup() {
            return { args }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border">
                <NList>
                    <NListItem v-bind="args" content-field="label" label="Item via 'label' prop" />
                    <NListItem v-bind="args" content-field="title" title="Item via 'title' prop" />
                    <NListItem v-bind="args">Standard slot content</NListItem>
                </NList>
            </div>
        `
    })
}
