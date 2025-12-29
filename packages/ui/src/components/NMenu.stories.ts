import type { Meta, StoryObj } from '@storybook/vue3'
import NButton from './NButton.vue'
import NIcon from './NIcon.vue'
import NListItem from './NListItem.vue'
import NMenu from './NMenu.vue'

const meta = {
    title: 'UI/NMenu',
    component: NMenu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        direction: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
        position: { control: 'select', options: ['start', '', 'end'] },
        persistent: { control: 'boolean' },
        overlay: { control: 'boolean' },
        triggerByHover: { control: 'boolean' },
        triggerByFocus: { control: 'boolean' },
        triggerByInteraction: { control: 'boolean' }
    }
} satisfies Meta<typeof NMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NMenu, NButton, NListItem },
        setup() {
            return { args }
        },
        template: `
            <NButton class="brand">
                Open Menu
                <NMenu v-bind="args">
                    <NListItem icon="mdi-account">Profile</NListItem>
                    <NListItem icon="mdi-cog">Settings</NListItem>
                    <NListItem class="my-1 border-t border-border" />
                    <NListItem icon="mdi-logout" class="text-error">Logout</NListItem>
                </NMenu>
            </NButton>
        `
    })
}

export const ClickOnly: Story = {
    args: {
        triggerByHover: false,
        triggerByFocus: false
    },
    render: args => ({
        components: { NMenu, NButton, NListItem },
        setup() {
            const items = [
                {
                    content: 'Parent Item (Click)',
                    items: [
                        { content: 'Child Item 1' },
                        {
                            content: 'Child Item 2 (Nested)',
                            items: [{ content: 'Grandchild A' }, { content: 'Grandchild B' }]
                        }
                    ]
                },
                { content: 'Another Parent' }
            ]
            return { args, items }
        },
        template: `
            <NButton class="brand">
                Click Only Nested
                <NMenu v-bind="args" :items="items" />
            </NButton>
        `
    })
}

export const HoverOnly: Story = {
    args: {
        triggerByInteraction: false,
        triggerByFocus: false
    },
    render: args => ({
        components: { NMenu, NButton, NListItem },
        setup() {
            const items = [
                {
                    content: 'Parent Item (Hover)',
                    items: [
                        { content: 'Child Item 1' },
                        {
                            content: 'Child Item 2 (Nested)',
                            items: [{ content: 'Grandchild A' }, { content: 'Grandchild B' }]
                        }
                    ]
                },
                { content: 'Another Parent' }
            ]
            return { args, items }
        },
        template: `
            <NButton class="brand">
                Hover Only Nested
                <NMenu v-bind="args" :items="items" />
            </NButton>
        `
    })
}

export const FocusOnly: Story = {
    args: {
        triggerByHover: false,
        triggerByInteraction: false
    },
    render: args => ({
        components: { NMenu, NButton, NListItem },
        setup() {
            const items = [
                {
                    content: 'Parent Item (Focus)',
                    items: [
                        { content: 'Child Item 1' },
                        {
                            content: 'Child Item 2 (Nested)',
                            items: [{ content: 'Grandchild A' }, { content: 'Grandchild B' }]
                        }
                    ]
                },
                { content: 'Another Parent' }
            ]
            return { args, items }
        },
        template: `
            <div class="flex flex-col gap-2 items-center">
                <p class="text-xs text-text-light italic text-center">Tab to the button to focus</p>
                <NButton class="brand">
                    Focus Only Nested
                    <NMenu v-bind="args" :items="items" />
                </NButton>
            </div>
        `
    })
}

export const DataDriven: Story = {
    render: args => ({
        components: { NMenu, NButton },
        setup() {
            const items = [
                { content: 'My Account', heading: true },
                { content: 'Profile', icon: 'mdi-account', onClick: () => alert('Profile Clicked') },
                { content: 'Billing', icon: 'mdi-credit-card' },
                { class: 'my-1 border-t border-border' },
                {
                    content: 'Preferences',
                    icon: 'mdi-tune',
                    items: [
                        { content: 'Theme', heading: true },
                        { content: 'Dark Mode', icon: 'mdi-weather-night' },
                        { content: 'Light Mode', icon: 'mdi-weather-sunny' },
                        { class: 'my-1 border-t border-border' },
                        { content: 'Notifications', icon: 'mdi-bell' }
                    ]
                },
                { content: 'Sign Out', icon: 'mdi-logout', class: 'text-error' }
            ]
            return { args, items }
        },
        template: `
            <NButton class="outlined brand">
                Data Menu
                <NMenu v-bind="args" :items="items" />
            </NButton>
        `
    })
}

export const CustomFields: Story = {
    render: args => ({
        components: { NMenu, NButton },
        setup() {
            const items = [
                { label: 'Dashboard', key: 'dash' },
                {
                    label: 'Reports',
                    key: 'rep',
                    children: [
                        { label: 'Sales', key: 'sales' },
                        { label: 'Analytics', key: 'ana' }
                    ]
                }
            ]
            return { args, items }
        },
        template: `
            <NButton class="brand flat">
                Custom Fields
                <NMenu 
                    v-bind="args" 
                    :items="items" 
                    content-field="label" 
                    children-field="children" 
                    value-field="key" 
                />
            </NButton>
        `
    })
}

export const NestedSlots: Story = {
    render: args => ({
        components: { NMenu, NButton, NListItem },
        setup() {
            return { args }
        },
        template: `
            <NButton class="brand">
                Nested Slots
                <NMenu v-bind="args">
                    <NListItem>Static Item</NListItem>
                    <NListItem>
                        Submenu Parent
                        <NMenu direction="right" position="start" stacked>
                            <NListItem>Sub Item A</NListItem>
                            <NListItem>
                                Deep Nested
                                <NMenu direction="right" position="start" stacked>
                                    <NListItem>Level 3 Item 1</NListItem>
                                    <NListItem>Level 3 Item 2</NListItem>
                                </NMenu>
                            </NListItem>
                        </NMenu>
                    </NListItem>
                </NMenu>
            </NButton>
        `
    })
}

export const CustomLayout: Story = {
    render: args => ({
        components: { NMenu, NButton, NIcon },
        setup() {
            return { args }
        },
        template: `
            <NButton class="brand">
                Custom Panel
                <NMenu v-bind="args" list-class="p-4 w-72 bg-surface shadowed rounded-lg border border-border">
                    <div class="flex flex-col items-center gap-3 text-center">
                        <div class="p-3 bg-brand/10 rounded-full text-brand">
                            <NIcon name="mdi-star" class="text-2xl" />
                        </div>
                        <div>
                            <div class="font-bold text-lg">Upgrade Plan</div>
                            <p class="text-xs text-text-light mt-1">Unlock all features by upgrading your account today.</p>
                        </div>
                        <NButton class="brand w-full justify-center" label="Upgrade Now" />
                    </div>
                </NMenu>
            </NButton>
        `
    })
}
