import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NuiTooltip from './NuiTooltip.vue'
import NuiButton from './NuiButton.vue'

const displayPositions = ['top', 'bottom', 'left', 'right']

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
        displayPosition: {
            control: 'select',
            options: displayPositions
        },
        autoReposition: { control: 'boolean' },
        shiftPadding: { control: 'number' },
        modelValue: { control: 'boolean' },
        showDelay: { control: 'number' },
        hideDelay: { control: 'number' },
        persistent: { control: 'boolean' },
        offset: { control: 'object' },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large']
        },
        triggerParent: { control: false },
        attachParent: { control: false },
        noHover: { control: 'boolean' },
        noFocus: { control: 'boolean' }
    },
    args: {
        text: 'This is a tooltip',
        displayPosition: 'bottom',
        autoReposition: true,
        shiftPadding: 8,
        offset: [0, 8],
        showDelay: 0,
        hideDelay: 125,
        persistent: false,
        size: 'medium',
        noHover: false,
        noFocus: false
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

export const DefaultTriggers: Story = {
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args }
        },
        template: `
            <NuiButton>
                <div>Hover or Focus me</div>
                <NuiTooltip v-bind="args" />
            </NuiButton>
        `
    }),
    args: {
        text: 'This tooltip shows on hover or focus.',
        noHover: false,
        noFocus: false
    }
}

export const NoHoverNoFocus: Story = {
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-y-8">
                <NuiButton label="Hover/Focus enabled (default)">
                    <NuiTooltip v-bind="args" text="I show on hover/focus" :no-hover="false" :no-focus="false" />
                </NuiButton>
                <NuiButton label="Hover disabled, Focus enabled">
                    <NuiTooltip v-bind="args" text="I show on focus, not hover" :no-hover="true" :no-focus="false" />
                </NuiButton>
                <NuiButton label="Hover enabled, Focus disabled">
                    <NuiTooltip v-bind="args" text="I show on hover, not focus" :no-hover="false" :no-focus="true" />
                </NuiButton>
                <NuiButton label="Hover/Focus disabled">
                    <NuiTooltip v-bind="args" text="I do NOT show on hover/focus" :no-hover="true" :no-focus="true" />
                </NuiButton>
            </div>
        `
    }),
    args: {
        // These args will be overridden by the template
        text: '',
        noHover: false,
        noFocus: false
    }
}

export const Positions: Story = {
    render: args => ({
        components: { NuiTooltip, NuiButton },
        setup() {
            return { args, displayPositions }
        },
        template: `
            <div class="grid grid-cols-4 gap-sm p-lg">
                <div v-for="pos in displayPositions" :key="pos" class="flex justify-center">
                    <NuiButton :label="pos" class="w-24">
                        <NuiTooltip
                            v-bind="args"
                            :text="pos"
                            :display-position="pos"
                        />
                    </NuiButton>
                </div>
            </div>
        `
    }),
    args: {
        text: ''
    }
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

export const ControlledTriggers: Story = {
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
    }),
    args: {
        text: 'This tooltip is controlled by the button.',
        noHover: true,
        noFocus: true,
        persistent: false
    }
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
            <NuiButton label="Hover for rich content" >
                <NuiTooltip v-bind="args">
                    <div class="p-2">
                    <h3 class="text-lg font-bold text-bg">Hello World</h3>
                    <p class="text-bg/80">This is some rich content.</p>
                    </div>
                </NuiTooltip>
            </NuiButton>
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
