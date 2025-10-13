import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NuiIcon from './NuiIcon.vue'

const meta = {
    title: 'UI/NuiIcon',
    component: NuiIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'select',
            options: [
                'account',
                'home',
                'cog',
                'check',
                'close',
            ],
            description: 'The name of the icon to display.',
        },
        size: {
            control: 'select',
            options: ['', 'small', 'medium', 'large', '32px', '48px'],
            description: 'The size of the icon.',
        },
        color: {
            control: 'select',
            options: ['current', 'primary', 'success', 'error', 'warning'],
            description: 'The color of the icon.',
        },
    },
    args: {
        name: 'account',
        size: 'medium',
        color: 'current',
    },
} satisfies Meta<typeof NuiIcon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        name: 'account',
    },
}

export const IconSet: Story = {
    render: (args) => ({
        components: { NuiIcon },
        setup() {
            const icons = meta.argTypes.name.options
            return { args, icons }
        },
        template: `
            <div class="grid grid-cols-6 gap-sm items-center place-items-center">
                <div v-for="icon in icons" :key="icon" class="flex flex-col items-center justify-center gap-xs">
                    <NuiIcon :name="icon" size="large" color="primary" />
                    <span class="text-xs mt-4">{{ icon }}</span>
                </div>
            </div>            
        `,
    }),
}

export const Sizes: Story = {
    render: () => ({
        components: { NuiIcon },
        template: `
            <div class="grid grid-cols-6 gap-sm  ">
                <div class="flex flex-col items-center justify-end gap-xs">
                    <NuiIcon name="account" />
                    <span class="text-xs mt-4">default</span>
                </div>

                <div class="flex flex-col items-center justify-end gap-xs">
                    <NuiIcon name="account" size="small" />
                    <span class="text-xs mt-4">small</span>
                </div>

                <div class="flex flex-col items-center justify-end gap-xs">
                    <NuiIcon name="account" size="medium" />
                    <span class="text-xs mt-4">medium</span>
                </div>

                <div class="flex flex-col items-center justify-end gap-xs">
                    <NuiIcon name="account" size="large" />
                    <span class="text-xs mt-4">large</span>
                </div>

                <div class="flex flex-col items-center justify-end gap-xs">
                    <NuiIcon name="account" size="2rem" />
                    <span class="text-xs mt-4">2rem</span>
                </div>

                <div class="flex flex-col items-center justify-end gap-xs">
                    <NuiIcon name="account" size="48px" />
                    <span class="text-xs mt-4">48px</span>
                </div>
            </div>
        `,
    }),
}

export const Colors: Story = {
    render: () => ({
        components: { NuiIcon },
        setup() {
            const colors = meta.argTypes.color.options
            return { colors }
        },
        template: `
            <div class="grid grid-cols-6 gap-sm items-center">
                <NuiIcon v-for="color in colors" :key="color" name="account" size="large" :color="color" />
            </div>
        `,
    }),
}

export const CurrentColor: Story = {
    render: () => ({
        components: { NuiIcon },
        template: `
            <div class="text-primary-500">
                <NuiIcon name="account" color="current" />
            </div>
        `,
    }),
}
