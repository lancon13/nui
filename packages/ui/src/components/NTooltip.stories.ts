import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NTooltip from './NTooltip.vue'
import NButton from './NButton.vue'
import NIcon from './NIcon.vue'
import { ref, useTemplateRef } from 'vue'

const meta = {
    title: 'UI/NTooltip',
    component: NTooltip,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
    },
    args: {}
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NTooltip, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Show tooltip
                <NTooltip v-bind="args" >This is a tooltip</NTooltip>
            </NButton>
        `
    })
}

export const Direction: Story = {
    args: {},
    render: args => ({
        components: { NTooltip, NButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton>
                    Top
                    <NTooltip v-bind="args" direction="top">This is a tooltip</NTooltip>
                </NButton>
                <NButton>
                    Left
                    <NTooltip v-bind="args" direction="left">This is a tooltip</NTooltip>
                </NButton>
                <NButton>
                    Right
                    <NTooltip v-bind="args" direction="right">This is a tooltip</NTooltip>
                </NButton>
                <NButton>
                    Bottom
                    <NTooltip v-bind="args" direction="bottom">This is a tooltip</NTooltip>
                </NButton>

            </div>
        `
    })
}

export const Content: Story = {
    args: {},
    render: args => ({
        components: { NTooltip, NButton, NIcon },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Show tooltip
                <NTooltip v-bind="args" >
                    <h1 class="title-text text-lg">This is a HTML content</h1>
                    <p>Here is a more advanced example that transitions multiple properties, with different durations and easing curves for enter and leave:</p>
                    <a href="#" >
                        Link to somewhere
                         <NTooltip stacked>
                            <p class="p-8">Nested tooltip</p>
                        </NTooltip>                
                    </a>
                    
                </NTooltip>
            </NButton>
        `
    })
}

export const IconButton: Story = {
    args: {},
    render: args => ({
        components: { NTooltip, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton icon="close" class="pilled icon text-xs">
                <NTooltip v-bind="args" >This is a tooltip</NTooltip>
            </NButton>
        `
    })
}

export const OverlayButton: Story = {
    args: {},
    render: args => ({
        components: { NTooltip, NButton },
        setup() {
            const tooltipRef = useTemplateRef<typeof NTooltip>('tooltipRef')
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
                <NTooltip v-bind="args"
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
                </NTooltip>
            </NButton>
        `
    })
}
