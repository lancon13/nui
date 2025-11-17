import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NTooltip from './NTooltip.vue'
import NButton from './NButton.vue'
import NIcon from './NIcon.vue'

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
                         <NTooltip nested>
                            <p class="p-8">Nested tooltip</p>
                        </NTooltip>                
                    </a>
                    
                </NTooltip>
            </NButton>
        `
    })
}
