import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NuiCard from './NuiCard.vue'
import NuiButton from './NuiButton.vue'
import NuiIcon from './NuiIcon.vue'

const meta: Meta<typeof NuiCard> = {
    title: 'UI/NuiCard',
    component: NuiCard,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        shadow: { control: 'boolean' },
        bordered: { control: 'boolean' },
        clickable: { control: 'boolean' },
        tag: { control: 'text' },
        href: { control: 'text' },
        target: { control: 'text' }
    },
    args: {
        shadow: true,
        bordered: false,
        clickable: false,
        tag: 'div'
    }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NuiCard },
        setup() {
            return { args }
        },
        template: `
        <NuiCard v-bind="args">
            This is the default content of the card.
        </NuiCard>
    `
    })
}

export const WithHeaderAndFooter: Story = {
    render: args => ({
        components: { NuiCard },
        setup() {
            return { args }
        },
        template: `
        <NuiCard v-bind="args">
            <template #header>
                <h2 class="font-bold">Card Header</h2>
            </template>
            <p>This is the main content of the card. It can grow as needed.</p>
            <template #footer>
                <p class="text-sm text-gray-500">Card Footer</p>
            </template>
        </NuiCard>
    `
    })
}

export const NoShadow: Story = {
    ...WithHeaderAndFooter,
    args: {
        shadow: false
    }
}

export const Bordered: Story = {
    ...WithHeaderAndFooter,
    args: {
        bordered: true,
        shadow: false
    }
}

export const Dialog: Story = {
    render: args => ({
        components: { NuiCard, NuiButton, NuiIcon },
        setup() {
            return { args }
        },
        template: `
        <NuiCard v-bind="args">
            <template #header>                
                <div>
                    <h1 class="font-bold text-lg">Dialog Title</h1>
                    <p class="text-sm">This is a subtitle for the dialog.</p>
                </div>
                <NuiButton variant="flat" rounded>
                    <NuiIcon name="close" size="large" />
                </NuiButton>                
            </template>

            <div>
                <p>This is the main content of the dialog. You can put any information or form fields here.</p>
                <a href="#">Link me</a>
            </div>

            <template #footer>
                <NuiButton variant="flat">Cancel</NuiButton>
                <NuiButton variant="solid">Confirm</NuiButton>
            </template>
        </NuiCard>
    `
    })
}

export const WithMedia: Story = {
    render: args => ({
        components: { NuiCard },
        setup() {
            return { args }
        },
        template: `
        <NuiCard v-bind="args">
            <template #media>
                <div alt="placeholder" class="w-full h-[10rem] bg-primary text-white flex items-center justify-center">Image</div>
            </template>
            <h3 class="font-bold">Card Title</h3>
            <p class="text-sm">This is the card's main content.</p>
        </NuiCard>
    `
    })
}

export const ClickableLink: Story = {
    args: {
        bordered: true,
        shadow: false,
        clickable: true,
        tag: 'a',
        href: '#',
        target: '_blank'
    },
    render: args => ({
        components: { NuiCard },
        setup() {
            return { args }
        },
        template: `
        <NuiCard v-bind="args">
            <h3 class="font-bold">Clickable Card</h3>
            <p class="text-sm">This card is a link and has hover/focus effects.</p>
        </NuiCard>
    `
    })
}
