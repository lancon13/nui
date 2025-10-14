import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NuiChip from './NuiChip.vue'
import NuiIcon from './NuiIcon.vue'
import NuiTooltip from './NuiTooltip.vue'
import NuiButton from './NuiButton.vue'

const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
const variants = ['solid', 'outlined', 'flat', 'text']
const sizes = ['small', 'medium', 'large']

const meta = {
    title: 'UI/NuiChip',
    component: NuiChip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: { control: 'select', options: colors },
        variant: { control: 'select', options: variants },
        size: { control: 'select', options: sizes },
        pilled: { control: 'boolean' },
        shadow: { control: 'boolean' },
        clickable: { control: 'boolean' },
        label: { control: 'text' },
    },
    args: {
        color: 'primary',
        variant: 'solid',
        size: 'medium',
        pilled: false,
        shadow: false,
        clickable: false,
        label: 'Chip',
    },
} satisfies Meta<typeof NuiChip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
    render: (args) => ({
        components: { NuiChip },
        setup() {
            return { args, colors, variants }
        },
        template: `
        <div class="flex flex-wrap gap-sm">
            <template v-for="variant in variants" :key="variant">
                <NuiChip
                    v-for="color in colors" :key="color" 
                    v-bind="args"
                    :variant="variant"
                    :color="color"
                    :label="variant"
                />
            </template>
        </div>`,
    }),
}

export const Sizes: Story = {
    render: (args) => ({
        components: { NuiChip },
        setup() {
            return { args, sizes }
        },
        template: `
        <div class="flex items-center flex-wrap gap-sm">
            <NuiChip
                v-for="size in sizes" :key="size" 
                v-bind="args"
                :size="size"
                :label="size"
            />
        </div>`,
    }),
}

export const Pilled: Story = {
    args: {
        pilled: true,
    },
    render: (args) => ({
        components: { NuiChip },
        setup() {
            return { args, sizes }
        },
        template: `
        <div class="flex items-center flex-wrap gap-sm">
            <NuiChip
                v-for="size in sizes" :key="size" 
                v-bind="args"
                :size="size"
                :label="size"
            />
        </div>`,
    }),
}

export const Clickable: Story = {
    args: {
        clickable: true,
        label: 'Clickable Chip',
    },
}

export const WithIcons: Story = {
    render: (args) => ({
        components: { NuiChip, NuiIcon, NuiButton, NuiTooltip },
        setup() {
            return { args }
        },
        template: `
        <div class="flex items-center flex-wrap gap-sm">
            <NuiChip v-bind="args" label="Prepend">
                <template #prepend>
                    <NuiIcon name="account" />
                </template>
            </NuiChip>
            <NuiChip v-bind="args" label="Removable">
                <template #append>
                    <a href="#" class="hover:opacity-50">
                        <NuiIcon name="close"></NuiIcon>
                        <NuiTooltip>Close Chip</NuiTooltip>
                    </a>
                </template>
            </NuiChip>
            <NuiChip v-bind="args">
                <template #prepend>
                    <NuiIcon name="account" />
                </template>
                With Icon
            </NuiChip>
        </div>`,
    }),
}

export const Shadow: Story = {
    args: {
        shadow: true,
    },
    render: (args) => ({
        components: { NuiChip },
        setup() {
            return { args, variants, sizes }
        },
        template: `
        <div class="grid grid-cols-4 gap-sm place-content-center">
            <template v-for="size in sizes" :key="size">
                <div v-for="variant in variants" :key="variant" >
                    <NuiChip                       
                        v-bind="args"
                        :size="size"
                        :variant="variant"
                        :label="variant"
                    />
                </div>
            </template>
        </div>`,
    }),
}
