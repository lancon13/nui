import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NMenu from './NMenu.vue'
import NListItem from './NListItem.vue'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NMenu',
    component: NMenu,
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
        components: { NMenu, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Show menu
                <NMenu v-bind="args" persistent>
                    <li href="#">Menu item 1</li>
                    <li href="#">Menu item 2</li>
                    <li href="#">Menu item 3</li>
                    <li href="#">
                        Menu item 4
                        <ul>
                            <li href="#">Menu item 1</li>
                            <li href="#">Menu item 2</li>
                            <li href="#">Menu item 3</li>
                        </ul>
                    </li>
                    <li href="#">Menu item 5</li>
                </NMenu>
            </NButton>
        `
    })
}

export const ListAndListItems: Story = {
    args: {},
    render: args => ({
        components: { NMenu, NListItem, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Show menu
                <NMenu v-bind="args">
                    <NListItem href="#">Menu item 1</NListItem>
                    <NListItem href="#">Menu item 2</NListItem>
                    <NListItem href="#">Menu item 3</NListItem>
                    <NListItem href="#">
                        Menu item 4
                        <NMenu>
                            <NListItem href="#">Menu item 1</NListItem>
                            <NListItem href="#">Menu item 2</NListItem>
                            <NListItem href="#">Menu item 3</NListItem>
                        </NMenu>
                    </NListItem>
                    <NListItem href="#">Menu item 5</NListItem>
                </NMenu>
            </NButton>
        `
    })
}

export const WithItemsProp: Story = {
    args: {
        items: [
            { content: 'Item 1', onClick: () => alert('Item 1 clicked') },
            { content: 'Item 2', href: '#item2' },
            {
                content: 'Submenu',
                href: '#item2',
                items: [
                    { content: 'Sub Item 1', onClick: () => alert('Sub Item 1 clicked') },
                    { content: 'Sub Item 2', href: '#subitem2' },
                    {
                        content: 'Deep Submenu',
                        items: [{ content: 'Deep Item 1' }, { content: 'Deep Item 2' }]
                    }
                ]
            },
            { content: 'Item 3' }
        ]
    },
    render: args => ({
        components: { NMenu, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Show menu
                <NMenu v-bind="args" persistent />
            </NButton>
        `
    })
}

export const WithHeadings: Story = {
    args: {
        items: [
            { content: 'User Account', heading: true },
            { content: 'Profile', icon: 'mdi-account' },
            { content: 'Settings', icon: 'mdi-cog' },
            {
                content: 'Preferences',
                items: [{ content: 'Theme', heading: true }, { content: 'Dark Mode' }, { content: 'Light Mode' }]
            },
            { content: 'System', heading: true },
            { content: 'Help', icon: 'mdi-help-circle' },
            { content: 'Logout', icon: 'mdi-logout', class: 'text-error' }
        ]
    },
    render: args => ({
        components: { NMenu, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Show menu
            </NButton>
        `
    })
}

export const WithHeadingsSlots: Story = {
    args: {},
    render: args => ({
        components: { NMenu, NListItem, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Show menu
                <NMenu v-bind="args">
                    <NListItem heading>Application</NListItem>
                    <NListItem icon="mdi-view-dashboard">Dashboard</NListItem>
                    <NListItem icon="mdi-chart-bar">Analytics</NListItem>

                    <NListItem heading>User Settings</NListItem>
                    <NListItem icon="mdi-account">Profile</NListItem>
                    <NListItem icon="mdi-shield-lock">
                        Security
                        <NMenu>
                             <NListItem heading>Security Settings</NListItem>
                             <NListItem>Change Password</NListItem>
                             <NListItem>2FA</NListItem>
                        </NMenu>
                    </NListItem>

                    <NListItem heading>Danger Zone</NListItem>
                    <NListItem icon="mdi-delete" class="text-error">Delete Account</NListItem>
                </NMenu>
            </NButton>
        `
    })
}
