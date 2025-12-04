import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import { ref, useTemplateRef } from 'vue'
import NButton from './NButton.vue'
import NCard from './NCard.vue'
import NPopover from './NPopover.vue'

const meta = {
    title: 'UI/NPopover',
    component: NPopover,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
        name: { control: 'text' }
    },
    args: {
        name: 'account'
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NPopover, NButton, NCard },
        setup() {
            const showModal = ref(false)

            function handleButtonClick() {
                showModal.value = !showModal.value
            }

            return { args, showModal, handleButtonClick }
        },
        template: `
            <NButton @click="handleButtonClick">
                Show popover
                <NPopover v-bind="args" v-model="showModal" class="">
                    <div class="bg-text-invert shadowed w-32 p-4">
                        <ul>
                            <li tabindex="0" class="n-separator">Test 1</li>
                            <li tabindex="0" class="n-separator">Test 2</li>
                            <li tabindex="0">
                                Test 3
                                <NPopover v-bind="args" stacked direction="right" position="start" class="">
                                    <div class="bg-text-invert shadowed w-32 h-32 p-4">
                                        <ul>
                                            <li tabindex="0" class="n-separator">Test 1</li>
                                            <li tabindex="0" class="n-separator">Test 2</li>
                                            <li tabindex="0">Test 3</li>
                                        </ul>
                                    </div>
                                </NPopover>
                            </li>
                        </ul>
                    </div>
                </NPopover>
            </NButton>
        `
    })
}

export const Menu: Story = {
    args: {},
    render: args => ({
        components: { NPopover, NButton, NCard },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Menu
                <NPopover v-bind="args" class="">
                    <ul class="n-list shadowed min-w-64">
                        <li tabindex="0" class="n-list-item clickable">Test 1</li>
                        <li tabindex="0" class="n-list-item clickable">Test 2</li>                        
                    </ul>
                </NPopover>
            </NButton>
        `
    })
}

export const OverlayButton: Story = {
    args: {},
    render: args => ({
        components: { NPopover, NButton },
        setup() {
            const tooltipRef = useTemplateRef<typeof NPopover>('tooltipRef')
            const showTooltip = ref(false)

            function handleButtonClick() {
                // showTooltip.value = !showTooltip.value
                if (showTooltip.value && tooltipRef.value) tooltipRef.value.hide()
                else if (!showTooltip.value && tooltipRef.value) tooltipRef.value.show()
            }
            return { args, showTooltip, handleButtonClick }
        },
        template: `
            <NButton icon="information-symbol" class="pilled icon text-3xl p-0" @click="handleButtonClick">
                <NPopover v-bind="args"
                    ref="tooltipRef"
                    v-model="showTooltip"
                    overlay
                    persistent
                    :hoverTriggerAnchor="null"
                    :focusTriggerAnchor="null"
                    class="flex flex-col gap-4 items-center"
                >
                    <div class="p-4">This is a tooltip</div>
                    <NButton @click="handleButtonClick">Close</NButton>
                </NPopover>
            </NButton>
        `
    })
}
