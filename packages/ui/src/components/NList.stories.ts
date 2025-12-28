import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NList from './NList.vue'
import NListItem from './NListItem.vue'

const meta = {
    title: 'UI/NList',
    component: NList,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        tag: { control: 'text' },
        items: { control: 'object' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NList, NListItem },
        setup() {
            return { args }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border">
                <NList v-bind="args">
                    <NListItem>Option 1</NListItem>
                    <NListItem>Option 2</NListItem>
                    <NListItem>Option 3</NListItem>
                </NList>
            </div>
        `
    })
}

export const InteractiveItems: Story = {
    args: {},
    render: args => ({
        components: { NList, NListItem },
        setup() {
            return { args }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border">
                <NList v-bind="args">
                    <NListItem icon="mdi-account" href="#">Profile</NListItem>
                    <NListItem icon="mdi-cog" href="#">Settings</NListItem>
                    <NListItem icon="mdi-help-circle" href="#">Help Center</NListItem>
                    <NListItem separator />
                    <NListItem icon="mdi-logout" href="#" class="text-error">Logout</NListItem>
                </NList>
            </div>
        `
    })
}

export const DataItems: Story = {
    args: {},
    render: args => ({
        components: { NList },
        setup() {
            const items = [
                { content: 'Dashboard', icon: 'mdi-view-dashboard', onClick: () => console.log('Dashboard') },
                { content: 'Analytics', icon: 'mdi-chart-bar' },
                { content: 'Users', icon: 'mdi-account-multiple' }
            ]
            return { args, items }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border">
                <NList v-bind="args" :items="items" />
            </div>
        `
    })
}

export const Grouped: Story = {
    args: {},
    render: args => ({
        components: { NList },
        setup() {
            const items = [
                { content: 'Personal', heading: true },
                { content: 'My Profile', icon: 'mdi-account' },
                { content: 'Notifications', icon: 'mdi-bell' },
                { content: 'Organization', heading: true },
                { content: 'Team Settings', icon: 'mdi-account-group' },
                { content: 'Project Billing', icon: 'mdi-credit-card' }
            ]
            return { args, items }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border">
                <NList v-bind="args" :items="items" />
            </div>
        `
    })
}

export const NestedExpandable: Story = {
    args: {},
    render: args => ({
        components: { NList },
        setup() {
            const items = [
                {
                    content: 'Resources',
                    icon: 'mdi-folder',
                    expandable: true,
                    children: [
                        { content: 'Documents', icon: 'mdi-file-document' },
                        { content: 'Images', icon: 'mdi-image' },
                        {
                            content: 'Video Content',
                            icon: 'mdi-video',
                            expandable: true,
                            children: [
                                { content: 'Tutorials', icon: 'mdi-play-circle' },
                                { content: 'Interviews', icon: 'mdi-account-voice' }
                            ]
                        }
                    ]
                },
                { content: 'Favorites', icon: 'mdi-star' }
            ]
            return { args, items }
        },
        template: `
            <div class="w-80 bg-surface shadowed border border-border">
                <NList v-bind="args" :items="items" />
            </div>
        `
    })
}

export const EmptyState: Story = {
    args: {},
    render: args => ({
        components: { NList },
        setup() {
            const items: never[] = []
            return { args, items }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border italic text-text-muted">
                <NList v-bind="args" :items="items">
                    <template #empty-content>
                        <div class="p-4 text-center">
                            Custom Empty State
                        </div>
                    </template>
                </NList>
            </div>
        `
    })
}

export const CustomSlots: Story = {
    args: {},
    render: args => ({
        components: { NList },
        setup() {
            const items = [
                { id: 1, title: 'Item 1', desc: 'Description 1' },
                { id: 2, title: 'Item 2', desc: 'Description 2' }
            ]
            return { args, items }
        },
        template: `
            <div class="w-64 bg-surface shadowed border border-border">
                <NList v-bind="args" :items="items">
                    <template #item-content="{ title, desc }">
                        <div class="flex flex-col">
                            <span class="font-bold">{{ title }}</span>
                            <span class="text-xs text-text-muted">{{ desc }}</span>
                        </div>
                    </template>
                </NList>
            </div>
        `
    })
}
