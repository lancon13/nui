import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NuiPopOver from './NuiPopOver.vue'
import NuiButton from './NuiButton.vue'
import NuiCard from './NuiCard.vue'

const meta = {
    title: 'UI/NuiPopOver',
    component: NuiPopOver,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        displayPosition: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right']
        },
        anchorPosition: {
            control: 'select',
            options: ['start', 'center', 'end']
        },
        offset: {
            control: 'object'
        },
        autoReposition: {
            control: 'boolean'
        },
        attachParent: {
            control: 'text'
        },
        triggerParent: {
            control: 'text'
        },
        shiftPadding: {
            control: 'number'
        }
    },
    args: {
        displayPosition: 'bottom',
        anchorPosition: 'start',
        offset: [0, 8],
        autoReposition: true,
        attachParent: null,
        triggerParent: null,
        shiftPadding: 8
    }
} satisfies Meta<typeof NuiPopOver>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NuiPopOver, NuiButton, NuiCard },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <NuiButton label="Toggle Popover">
                <NuiPopOver v-model="show" v-bind="args">
                    <NuiCard class="w-64">
                        <template #header>
                            <h3 class="font-bold">Popover Title</h3>
                        </template>
                        <p>This is the popover content.</p>
                        <template #footer>
                            <NuiButton label="Close" size="small" @click="show = false" />
                        </template>
                    </NuiCard>
                </NuiPopOver>
            </NuiButton>
        `
    })
}

export const Offset: Story = {
    args: {
        offset: [20, 20]
    },
    render: args => ({
        components: { NuiPopOver, NuiButton, NuiCard },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <NuiButton label="Toggle Popover">
                <NuiPopOver v-model="show" v-bind="args">
                    <NuiCard class="w-64">
                        <p>This popover is offset from the trigger.</p>
                    </NuiCard>
                </NuiPopOver>
            </NuiButton>
        `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the `offset` prop. The offset is an array of two numbers: `[crossAxis, mainAxis]`. In this example, the offset is `[20, 20]`.'
            }
        }
    }
}

export const Positions: Story = {
    render: args => ({
        components: { NuiPopOver, NuiButton, NuiCard },
        setup() {
            const positions = [
                'top-start',
                'top-center',
                'top-end',
                'bottom-start',
                'bottom-center',
                'bottom-end',
                'left-start',
                'left-center',
                'left-end',
                'right-start',
                'right-center',
                'right-end'
            ]

            const popovers = ref(
                positions.map(p => ({
                    id: p,
                    show: false,
                    display: p.split('-')[0],
                    anchor: p.split('-')[1]
                }))
            )

            return { args, popovers }
        },
        template: `
            <div class="grid grid-cols-3 gap-lg p-lg w-[600px]">
                <div v-for="popover in popovers" :key="popover.id" class="flex justify-center">
                    <NuiButton :label="popover.id" class="w-32">
                        <NuiPopOver
                            v-model="popover.show"
                            :display-position="popover.display"
                            :anchor-position="popover.anchor"
                        >
                            <NuiCard class="w-48">
                                <p class="text-center font-bold">{{ popover.id }}</p>
                            </NuiCard>
                        </NuiPopOver>
                    </NuiButton>
                </div>
            </div>
        `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates all the possible `displayPosition` and `anchorPosition` combinations.'
            }
        }
    }
}

export const AutoReposition: Story = {
    render: args => ({
        components: { NuiPopOver, NuiButton, NuiCard },
        setup() {
            const showFlip = ref(false)
            const showNoFlip = ref(false)
            return { args, showFlip, showNoFlip }
        },
        template: `
            <div class="h-screen w-full flex flex-col justify-end p-lg">
                <div class="grid grid-cols-2 gap-lg">
                    <div class="flex justify-center">
                        <NuiButton color="primary">
                            With Auto Reposition
                            <NuiPopOver v-model="showFlip" display-position="top">
                                <NuiCard class="w-64">
                                    <p>This popover will flip to the bottom if there is not enough space on top.</p>
                                </NuiCard>
                            </NuiPopOver>
                        </NuiButton>
                    </div>
                    <div class="flex justify-center">
                        <NuiButton color="error">
                            Without Auto Reposition
                            <NuiPopOver v-model="showNoFlip" display-position="top" :auto-reposition="false">
                                <NuiCard class="w-64">
                                    <p>This popover will get cut off if there is not enough space on top.</p>
                                </NuiCard>
                            </NuiPopOver>
                        </NuiButton>
                    </div>
                </div>
            </div>
        `
    }),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'This story demonstrates the `autoReposition` prop. The popover on the left (default) will automatically "flip" to stay in view, while the one on the right has this disabled and will get cut off by the edge of the screen. Place the buttons near the top of the viewport to see the effect.'
            }
        }
    }
}

export const AttachParent: Story = {
    args: {
        attachParent: '#attach-button'
    },
    render: args => ({
        components: { NuiPopOver, NuiButton, NuiCard },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div class="w-[400px] text-center">
                <NuiButton id="attach-button" label="Popover attached" />

                <div class="mt-xl">
                    <p class="text-sm text-muted">The popover component is a child of this box, but will be attached button above, Click here to trigger.</p>
                    <NuiPopOver v-model="show" v-bind="args">
                        <NuiCard class="w-64">
                            <p>Attached via <code class="font-bold">attachParent</code> prop!</p>
                        </NuiCard>
                    </NuiPopOver>
                </div>
            </div>
        `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates how to use the `attachParent` prop. The popover is positioned relative to the button, even though it is not a child of the button in the DOM. Since `triggerParent` is not set, the `attachParent` element also becomes the trigger.'
            }
        }
    }
}

export const TriggerParent: Story = {
    args: {
        attachParent: '#position-anchor',
        triggerParent: '#click-trigger'
    },
    render: args => ({
        components: { NuiPopOver, NuiButton, NuiCard },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div class="w-[500px] text-center">
                <div class="flex flex-col gap-sm">
                    <NuiButton id="position-anchor" label="Popover is positioned to this button" />
                    <NuiButton id="click-trigger" label="Popover is triggered from this button" />
                </div>
                
                <div class="mt-xl border-dashed border-muted p-md cursor-pointer">
                    <p>Popover is within this box.</p>
                    <NuiPopOver v-model="show" v-bind="args">
                        <NuiCard class="w-64">
                            <p>Positioned to the button, but triggered by this div!</p>
                        </NuiCard>
                    </NuiPopOver>
                </div>
            </div>
        `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates using `attachParent` and `triggerParent` together. The popover is positioned relative to the button, but is triggered by clicking on the dashed box, which is a completely separate element.'
            }
        }
    }
}
