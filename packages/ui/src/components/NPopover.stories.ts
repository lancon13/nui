import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NButton from './NButton.vue'
import NPopover from './NPopover.vue'
import NListItem from './NListItem.vue'

const meta = {
    title: 'UI/NPopover',
    component: NPopover,
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
} satisfies Meta<typeof NPopover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NPopover, NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="p-8">
                <NButton class="brand">
                    Hover Me
                    <NPopover v-bind="args">
                        <div class="p-4 bg-surface text-text shadowed rounded-element border border-border">
                            Popover Content
                        </div>
                    </NPopover>
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
        components: { NPopover, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton class="brand">
                Click to Toggle
                <NPopover v-bind="args">
                    <div class="p-4 bg-surface text-text shadowed rounded-element border border-border">
                        Clicked! Click trigger again to close.
                    </div>
                </NPopover>
            </NButton>
        `
    })
}

export const Nested: Story = {
    render: args => ({
        components: { NPopover, NButton, NListItem },
        setup() {
            return { args }
        },
        template: `
            <NButton class="brand">
                Root Popover
                <NPopover v-bind="args">
                    <ul class="n-list bg-surface shadowed w-48 py-2 rounded-element">
                        <NListItem>Item 1</NListItem>
                        <NListItem>
                            Hover for Nested
                            <NPopover direction="right" position="start" stacked>
                                <ul class="n-list bg-surface shadowed w-48 py-2 rounded-element">
                                    <NListItem>Nested Item A</NListItem>
                                    <NListItem>Nested Item B</NListItem>
                                </ul>
                            </NPopover>
                        </NListItem>
                        <NListItem>Item 3</NListItem>
                    </ul>
                </NPopover>
            </NButton>
        `
    })
}

export const Overlay: Story = {
    args: {
        overlay: true,
        triggerByHover: false,
        triggerByFocus: false,
        triggerByInteraction: true
    },
    render: args => ({
        components: { NPopover, NButton },
        setup() {
            const popoverRef = ref<InstanceType<typeof NPopover> | null>(null)
            const closePopover = () => {
                popoverRef.value?.hide()
            }
            return { args, popoverRef, closePopover }
        },
        template: `
            <NButton class="error">
                Open Overlay
                <NPopover v-bind="args" ref="popoverRef">
                    <div class="p-6 bg-surface text-text shadowed rounded-lg flex flex-col items-center gap-4 min-w-[300px]">
                        <h3 class="text-xl font-bold">Confirmation</h3>
                        <p class="text-center text-text-light">This is an overlay popover. Click outside or use the button to close.</p>
                        <NButton class="brand" label="Close Me" @click.stop="closePopover" />
                    </div>
                </NPopover>
            </NButton>
        `
    })
}

export const ManualControl: Story = {
    render: args => ({
        components: { NPopover, NButton },
        setup() {
            const isOpen = ref(false)
            return { args, isOpen }
        },
        template: `
            <div class="flex flex-col items-center gap-4">
                <div class="flex gap-2">
                    <NButton @click="isOpen = true" class="success" label="Open" />
                    <NButton @click="isOpen = false" class="error" label="Close" />
                </div>
                
                <div class="relative border p-4 rounded bg-surface-muted">
                    Target Area
                    <NPopover v-bind="args" v-model="isOpen" :triggerByHover="false" :triggerByInteraction="false">
                        <div class="p-2 bg-brand text-text-invert rounded">
                            Controlled by external state
                        </div>
                    </NPopover>
                </div>
            </div>
        `
    })
}

