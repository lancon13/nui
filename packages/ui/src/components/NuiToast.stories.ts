import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { useNuiToast } from '../composables/useNuiToast'
import NuiButton from './NuiButton.vue'
import NuiCard from './NuiCard.vue'
import NuiToast from './NuiToast.vue'

const meta = {
    title: 'UI/NuiToast',
    component: NuiToast,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs']
} satisfies Meta<typeof NuiToast>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NuiToast, NuiButton, NuiCard },
        setup() {
            const { add } = useNuiToast()

            const showToast = () => {
                add({
                    content: {
                        props: ['close'],
                        components: { NuiCard, NuiButton },
                        template: `
              <NuiCard
                shadow                
              >
                This is a toast message!
                <template #footer>
                  <div class="flex justify-end">
                    <NuiButton
                      variant="text"
                      @click="close"
                    >
                      Close
                    </NuiButton>
                  </div>
                </template>
              </NuiCard>
            `
                    }
                })
            }

            return { args, showToast }
        },
        template: `
      <NuiToast v-bind="args" />
      <div class="p-lg">
        <NuiButton @click="showToast()">Show Toast</NuiButton>
      </div>
    `
    })
}

export const Positions: Story = {
    render: args => ({
        components: { NuiToast, NuiButton, NuiCard },
        setup() {
            const { add } = useNuiToast()

            const showToast = (position, direction) => {
                add({
                    position,
                    direction,
                    content: {
                        props: ['close'],
                        components: { NuiCard, NuiButton },
                        template: `
              <NuiCard
                shadow                
              >
                Toast at ${position} ${direction}
                <template #footer>
                  <div class="flex justify-end">
                    <NuiButton
                      variant="text"
                      @click="close"
                    >
                      Close
                    </NuiButton>
                  </div>
                </template>
              </NuiCard>
            `
                    }
                })
            }

            return { args, showToast }
        },
        template: `
      <NuiToast v-bind="args" />
      <div class="grid grid-cols-3 gap-sm p-lg">
        <NuiButton @click="showToast('top', 'left')">Top Left</NuiButton>
        <NuiButton @click="showToast('top', 'center')">Top Center</NuiButton>
        <NuiButton @click="showToast('top', 'right')">Top Right</NuiButton>
        <NuiButton @click="showToast('center', 'left')">Center Left</NuiButton>
        <div></div>
        <NuiButton @click="showToast('center', 'right')">Center Right</NuiButton>
        <NuiButton @click="showToast('bottom', 'left')">Bottom Left</NuiButton>
        <NuiButton @click="showToast('bottom', 'center')">Bottom Center</NuiButton>
        <NuiButton @click="showToast('bottom', 'right')">Bottom Right</NuiButton>
      </div>
    `
    })
}

export const Stacking: Story = {
    render: args => ({
        components: { NuiToast, NuiButton, NuiCard },
        setup() {
            const { add } = useNuiToast()
            let count = 0

            const showToast = () => {
                add({
                    position: 'bottom',
                    direction: 'right',
                    content: {
                        props: ['close'],
                        components: { NuiCard, NuiButton },
                        template: `
              <NuiCard
                shadow                
              >
                Toast number ${++count}
                <template #footer>
                  <div class="flex justify-end">
                    <NuiButton
                      variant="text"
                      @click="close"
                    >
                      Close
                    </NuiButton>
                  </div>
                </template>
              </NuiCard>
            `
                    }
                })
            }

            return { args, showToast }
        },
        template: `
      <NuiToast v-bind="args" />
      <div class="p-lg">
        <NuiButton @click="showToast()">Add Toast</NuiButton>
      </div>
    `
    })
}
