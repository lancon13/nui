import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NuiTooltip from './NuiTooltip.vue'
import NuiButton from './NuiButton.vue'

const positions = ['top', 'bottom', 'left', 'right']

const meta = {
    title: 'UI/NuiTooltip',
    component: NuiTooltip,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        html: { control: 'text' },
        position: {
            control: 'select',
            options: positions
        },
        modelValue: { control: 'boolean' },
        showDelay: { control: 'number' },
        hideDelay: { control: 'number' },
        persistent: { control: 'boolean' },
        offset: { control: 'object' },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large']
        },
        triggerParent: { control: false }, // Not controllable via storybook UI
        attachParent: { control: false } // Not controllable via storybook UI
    },
    args: {
        text: 'This is a tooltip',
        position: 'bottom'
    }
} satisfies Meta<typeof NuiTooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args }
        },
        template: `
            <NuiButton>
                <div>Tooltip</div>
                <NuiTooltip v-bind="args" />
            </NuiButton>
        `
    })
}

export const Positions: Story = {
    render: () => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { positions }
        },
        template: `
        <div class="grid grid-cols-4 gap-sm">
            <NuiButton v-for="pos in positions" :key="pos" :label="'Hover for ' + pos">
                <NuiTooltip :position="pos" text="Tooltip text" />
            </NuiButton>
        </div>
    `
    })
}

export const Controlled: Story = {
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
        <div class="flex flex-col gap-sm">
            <NuiButton label="Toggle Tooltip" @click="show = !show" />
            <div class="p-sm mt-md border border-dashed border-primary relative text-center">
                Attach Point
                <NuiTooltip v-bind="args" v-model="show" />
            </div>
        </div>
    `
    })
}

export const CustomOffset: Story = {
    args: {
        offset: [20, 20],
        text: 'Offset [20, 20]'
    },
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args }
        },
        template: `
            <NuiButton label="Hover me">
                <NuiTooltip v-bind="args" />
            </NuiButton>`
    })
}

export const RichContent: Story = {
    args: {},
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args }
        },
        template: `
        <div>
            <NuiButton label="Hover for rich content">
            <NuiTooltip v-bind="args">
                <div class="p-2">
                <h3 class="text-lg font-bold text-bg">Hello World</h3>
                <p class="text-bg/80">This is some rich content.</p>
                </div>
            </NuiTooltip>
        </div>
    `
    })
}

export const ExplicitParent: Story = {
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args }
        },
        template: `
        <div class="text-center">
            <NuiButton label="This is the trigger" id="my-trigger-button" />

            <div class="p-sm mt-md border border-dashed border-error-200 bg-error-50">
                The tooltip component is here, but it points to the button above.
                <NuiTooltip v-bind="args" triggerParent="#my-trigger-button" text="I am attached to the button" />
            </div>
        </div>
    `
    })
}

export const SeparateTriggerAndAttach: Story = {
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args }
        },
        template: `
            <div class="text-center">
                <NuiButton label="This is the trigger" id="my-trigger-button-2" />

                <div id="my-attach-point" class="p-sm mt-md border border-dashed border-primary-200 bg-primary-50 text-neutral relative">
                    The tooltip will be attached here.
                </div>

                <div class="p-sm mt-md border border-dashed border-error-200 bg-error-50">
                    The tooltip component is here, but it is triggered by the button and attached to the blue box.
                    <NuiTooltip v-bind="args" triggerParent="#my-trigger-button-2" attachParent="#my-attach-point" text="Triggered by button, attached to blue box" />
                </div>
            </div>
    `
    })
}

export const Delays: Story = {
    args: {
        showDelay: 500,
        hideDelay: 500,
        text: 'This tooltip has a 500ms show and hide delay.'
    },
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args }
        },
        template: `
            <NuiButton label="Hover me">
                <NuiTooltip v-bind="args" />
            </NuiButton>`
    })
}

export const Persistent: Story = {
    args: {
        persistent: true,
        text: 'I will stay visible as long as you hover the target!'
    },
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args }
        },
        template: `
            <NuiButton label="Hover me">
                <NuiTooltip v-bind="args" />
            </NuiButton>`
    })
}

export const Focusable: Story = {
    args: {
        hideDelay: 200
    },
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args }
        },
        template: `
        <div class="text-center">
            <NuiButton label="Hover for focusable tooltip">
                <NuiTooltip v-bind="args">
                    <div class="p-2 text-left">
                        <h3 class="text-md font-bold text-white">Focusable Tooltip</h3>
                        <p class="text-white/80">
                            This tooltip will stay open as long as it has focus.
                        </p>
                        <div class="mt-2">
                            <a href="#" class="text-primary-400 hover:underline" @click.prevent>
                                A link
                            </a>
                        </div>
                    </div>
                </NuiTooltip>
            </NuiButton>
        </div>
    `
    })
}

export const ExposedMethods: Story = {
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            const tooltipRef = ref<InstanceType<typeof NuiTooltip> | null>(null)
            const showTooltip = () => {
                tooltipRef.value?.show()
            }
            const hideTooltip = () => {
                tooltipRef.value?.hide()
            }
            return { args, tooltipRef, showTooltip, hideTooltip }
        },
        template: `
        <div class="grid grid-cols-3 gap-sm">
            <NuiButton label="Target">
                <NuiTooltip v-bind="args" ref="tooltipRef" text="I can be controlled programmatically" />
            </NuiButton>
            <NuiButton label="Call show()" @click="showTooltip" />
            <NuiButton label="Call hide()" @click="hideTooltip" />
        </div>
    `
    })
}
