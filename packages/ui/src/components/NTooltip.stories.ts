import type { Meta, StoryObj } from '@storybook/vue3'
import NTooltip from './NTooltip.vue'
import NButton from './NButton.vue'
import NIcon from './NIcon.vue'
import { ref } from 'vue'

const meta = {
    title: 'UI/NTooltip',
    component: NTooltip,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        direction: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
        position: { control: 'select', options: ['start', '', 'end'] },
        triggerByHover: { control: 'boolean' },
        triggerByFocus: { control: 'boolean' },
        triggerByInteraction: { control: 'boolean' },
        allowClickToHide: { control: 'boolean' },
        persistent: { control: 'boolean' },
        overlay: { control: 'boolean' },
        fit: { control: 'boolean' }
    }
} satisfies Meta<typeof NTooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NTooltip, NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="p-8">
                <NButton class="brand">
                    Hover Me
                    <NTooltip v-bind="args">Simple Tooltip</NTooltip>
                </NButton>
            </div>
        `
    })
}

export const ClickToggle: Story = {
    args: {
        triggerByHover: false,
        triggerByInteraction: true,
        allowClickToHide: true
    },
    render: args => ({
        components: { NTooltip, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton class="brand">
                Click Me
                <NTooltip v-bind="args">
                    Clicked! Click again to close.
                </NTooltip>
            </NButton>
        `
    })
}

export const Directions: Story = {
    render: args => ({
        components: { NTooltip, NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-wrap items-center gap-8 p-12">
                <NButton class="outlined brand">
                    Top
                    <NTooltip v-bind="args" direction="top">Tooltip on Top</NTooltip>
                </NButton>
                <NButton class="outlined brand">
                    Bottom
                    <NTooltip v-bind="args" direction="bottom">Tooltip on Bottom</NTooltip>
                </NButton>
                <NButton class="outlined brand">
                    Left
                    <NTooltip v-bind="args" direction="left">Tooltip on Left</NTooltip>
                </NButton>
                <NButton class="outlined brand">
                    Right
                    <NTooltip v-bind="args" direction="right">Tooltip on Right</NTooltip>
                </NButton>
            </div>
        `
    })
}

export const RichContent: Story = {
    render: args => ({
        components: { NTooltip, NButton, NIcon },
        setup() {
            return { args }
        },
        template: `
            <NButton class="brand">
                HTML Content
                <NTooltip v-bind="args" class="p-4 w-64 text-left">
                    <div class="flex flex-col gap-2">
                        <div class="font-bold flex items-center gap-2">
                            <NIcon name="mdi-information" class="text-brand" />
                            Information
                        </div>
                        <p class="text-xs">You can include <strong>formatted text</strong>, icons, and even links inside tooltips.</p>
                        <a href="#" class="text-brand underline text-[10px]">Learn more</a>
                    </div>
                </NTooltip>
            </NButton>
        `
    })
}

export const IconButtons: Story = {
    render: args => ({
        components: { NTooltip, NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex items-center gap-4">
                <NButton icon="mdi-help-circle" class="icon texted brand">
                    <NTooltip v-bind="args">Get help</NTooltip>
                </NButton>
                <NButton icon="mdi-delete" class="icon texted error">
                    <NTooltip v-bind="args">Delete item</NTooltip>
                </NButton>
                <NButton icon="mdi-share" class="icon texted info">
                    <NTooltip v-bind="args">Share content</NTooltip>
                </NButton>
            </div>
        `
    })
}

export const PersistentOverlay: Story = {
    args: {
        overlay: true,
        persistent: true,
        triggerByHover: false,
        triggerByFocus: false,
        triggerByInteraction: true
    },
    render: args => ({
        components: { NTooltip, NButton },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div>
                <NButton class="brand" @click="show = true">Click for Overlay Tooltip</NButton>
                <NTooltip v-bind="args" v-model="show" class="p-6 flex flex-col items-center gap-4">
                    <div class="text-lg font-bold">Overlay Tooltip</div>
                    <p class="text-sm">This tooltip requires a manual close because it's persistent.</p>
                    <NButton class="brand text-xs" label="Close" @click.stop="show = false" />
                </NTooltip>
            </div>
        `
    })
}