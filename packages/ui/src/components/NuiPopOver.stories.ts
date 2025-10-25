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
        },
        nested: {
            control: 'boolean'
        }
    },
    args: {
        displayPosition: 'bottom',
        anchorPosition: 'start',
        offset: [0, 8],
        autoReposition: true,
        attachParent: null,
        triggerParent: null,
        shiftPadding: 8,
        nested: false
    }
} satisfies Meta<typeof NuiPopOver>

export default meta
type Story = StoryObj<typeof meta>

const NestedPopover = {
    name: 'NestedPopover',
    components: { NuiPopOver, NuiButton, NuiCard },
    props: ['level', 'maxLevel'],
    setup(props: { level?: number; maxLevel?: number }) {
        const show = ref(false)
        const currentLevel = props.level || 1
        const isLastLevel = currentLevel === props.maxLevel
        const displayPosition = currentLevel % 2 === 0 ? 'left' : 'right' // Alternate position
        return { show, currentLevel, isLastLevel, displayPosition }
    },
    template: `
    <NuiButton :class="{'mt-sm': currentLevel > 1}">
      Level {{ currentLevel }} Trigger
      <NuiPopOver v-model="show" :display-position="displayPosition" :offset="[0, 8]" nested>
        <NuiCard :class="{'bg-primary-alt': currentLevel % 2 === 0, 'bg-secondary-alt': currentLevel % 2 !== 0}">
          <template #header>
            <h3 class="font-bold">Level {{ currentLevel }} Popover</h3>
          </template>
          <p>This is level {{ currentLevel }} content.</p>
          <template v-if="!isLastLevel">
            <NestedPopover :level="currentLevel + 1" :max-level="maxLevel" />
          </template>
          <template #footer>
            <NuiButton :label="'Close Level ' + currentLevel" size="small" @click="show = false" />
          </template>
        </NuiCard>
      </NuiPopOver>
    </NuiButton>
  `
}

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

export const Nested: Story = {
    render: () => ({
        components: { NuiPopOver, NuiButton, NuiCard, NestedPopover },
        setup() {
            const showParent = ref(false)
            const maxLevel = ref(3) // Default to 3 levels
            return { showParent, maxLevel }
        },
        template: `
      <div class="flex flex-col gap-md">
        <div class="flex items-center gap-sm">
          <label>Max Nesting Level:</label>
          <input type="number" v-model.number="maxLevel" min="1" max="5" class="border p-xs rounded" />
        </div>
        <NuiButton>
          Root Trigger
          <NuiPopOver v-model="showParent" :offset="[0, 8]">
            <NuiCard class="w-72">
              <template #header>
                <h3 class="font-bold">Root Popover</h3>
              </template>
              <p>This is the root popover. Adjust max nesting level below.</p>
              <NestedPopover :level="1" :max-level="maxLevel" />
              <template #footer>
                  <NuiButton label="Close Root" size="small" @click="showParent = false" />
              </template>
            </NuiCard>
          </NuiPopOver>
        </NuiButton>
      </div>
    `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates multi-level nested popovers. Adjust the "Max Nesting Level" to see 1 to 5 levels deep. Clicking inside any child popover will not close its parent popovers.'
            }
        }
    }
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

export const ImperativeControl: Story = {
    render: args => ({
        components: { NuiPopOver, NuiButton, NuiCard },
        setup() {
            const popoverRef = ref<InstanceType<typeof NuiPopOver> | null>(null)
            const showPopover = () => {
                popoverRef.value?.show()
            }
            const hidePopover = () => {
                popoverRef.value?.hide()
            }
            return { args, popoverRef, showPopover, hidePopover }
        },
        template: `
            <div class="flex gap-md">
                <NuiButton label="Show Popover" @click="showPopover" />
                <NuiButton label="Hide Popover" @click="hidePopover" />

                <NuiPopOver ref="popoverRef" v-bind="args">
                    <NuiCard class="w-64">
                        <p>This popover is controlled imperatively.</p>
                    </NuiCard>
                </NuiPopOver>
            </div>
        `
    }),
    parameters: {
        docs: {
            description: {
                story: "This story demonstrates how to imperatively control the popover's visibility using the `show()` and `hide()` methods exposed by the component."
            }
        }
    }
}
