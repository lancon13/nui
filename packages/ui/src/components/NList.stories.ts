import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NList from './NList.vue'
import NListItem from './NListItem.vue'
import { ref } from 'vue'

const meta = {
    title: 'UI/NList',
    component: NList,
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
        components: { NList },
        setup() {
            return { args }
        },
        template: `
            <NList v-bind="args">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </NList>
        `
    })
}

export const WithListItem: Story = {
    args: {},
    render: args => ({
        components: { NList, NListItem },
        setup() {
            return { args }
        },
        template: `
             <NList v-bind="args" class="bg-surface">
                <NListItem icon="mdi-account" to="www.google.com" class="n-separator">Profile</NListItem>
                <NListItem icon="mdi-list-status" to="www.google.com">Options</NListItem>
                <NListItem icon="mdi-cog" to="www.google.com" class="n-separator">Settings</NListItem>
                <NListItem icon="mdi-logout" to="www.google.com">Sign out</NListItem>    
            </NList>

        `
    })
}

export const WithItemsData: Story = {
    args: {},
    render: args => ({
        components: { NList, NListItem },
        setup() {
            const items = ref([
                { content: 'Item 1', icon: 'account' },
                { content: 'Item 2', icon: 'cog' },
                { content: 'Item 3', icon: 'logout' }
            ])
            return { args, items }
        },
        template: `
             <NList v-bind="args" class="bg-surface" :items="items">                
            </NList>

        `
    })
}

export const WithItemsDataWithItemSlot: Story = {
    args: {},
    render: args => ({
        components: { NList, NListItem },
        setup() {
            const items = ref([
                { content: 'Item 1', icon: 'account' },
                { content: 'Item 2', icon: 'cog' },
                { content: 'Item 3', icon: 'logout' }
            ])
            return { args, items }
        },
        template: `
             <NList v-bind="args" class="bg-surface" :items="items">
                <template #item="{content, icon}">
                    <li class="n-list-item n-separator n-list-item--clickable">{{content}} {{icon}}</li>                    
                </template>
            </NList>

        `
    })
}

export const WithItemsDataWithItemContentSlot: Story = {
    args: {},
    render: args => ({
        components: { NList, NListItem },
        setup() {
            const items = ref([
                { content: 'Item 1', icon: 'account' },
                { content: 'Item 2', icon: 'cog', href: '#' },
                { content: 'Item 3', icon: 'logout' }
            ])
            return { args, items }
        },
        template: `
             <NList v-bind="args" class="bg-surface" :items="items">
                <template #item-content="{content, icon}">
                    <div>{{content}} {{icon}}</div>
                </template>
            </NList>

        `
    })
}
