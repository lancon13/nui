/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { ToastDirection, ToastPosition, useNuiToast } from '../composables/useNuiToast'
import NuiButton from './NuiButton.vue'
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

type Story = StoryObj<typeof meta & { args: { default?: any } }>

export const Default: Story = {
    render: args => ({
        components: { NuiToast, NuiButton },
        setup() {
            const { add } = useNuiToast()

            const showToast = () => {
                add({
                    content: `
              <NuiBanner
                shadow
                icon="info-circle"
              >
                This is a toast message!
                <template #actions>
                  <NuiButton
                    variant="flat"
                    color="current"
                    @click="close"
                    label="Close"
                  />
                </template>
              </NuiBanner>
            `
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
        components: { NuiToast, NuiButton },
        setup() {
            const { add } = useNuiToast()

            const showToast = (position: ToastPosition, direction: ToastDirection) => {
                add({
                    position,
                    direction,
                    content: `
              <NuiBanner
                shadow
                icon="info-circle"
              >
                Toast at ${position} ${direction}
                <template #actions>
                  <NuiButton
                    variant="flat"
                    color="current"
                    @click="close"
                    label="Close"
                  />
                </template>
              </NuiBanner>
            `
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

export const Grouping: StoryObj = {
    argTypes: {
        badgePosition: {
            control: { type: 'select' },
            options: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
        },
        badgeColor: {
            control: { type: 'select' },
            options: ['primary', 'info', 'success', 'warning', 'error', 'current']
        }
    },
    args: {
        badgePosition: 'top-right',
        badgeColor: 'primary'
    },
    render: (args: any) => ({
        components: { NuiToast, NuiButton },
        setup() {
            const { add } = useNuiToast()

            const showToast = () => {
                add({
                    position: 'bottom',
                    direction: 'right',
                    groupId: 'group-1',
                    badgePosition: args.badgePosition,
                    badgeProps: {
                        color: args.badgeColor
                    },
                    content: `
              <NuiBanner
                shadow
                icon="info-circle"
              >
                This is a grouped toast!
                <template #actions>
                  <NuiButton
                    variant="flat"
                    color="current"
                    @click="close"
                    label="Close"
                  />
                </template>
              </NuiBanner>
            `
                })
            }

            return { args, showToast }
        },
        template: `
      <NuiToast v-bind="args" />
      <div class="p-lg">
        <NuiButton @click="showToast()">Add Grouped Toast</NuiButton>
      </div>
    `
    })
}

export const Stacking: Story = {
    render: args => ({
        components: { NuiToast, NuiButton },
        setup() {
            const { add } = useNuiToast()
            let count = 0

            const showToast = () => {
                add({
                    position: 'bottom',
                    direction: 'right',
                    content: `
              <NuiBanner
                shadow
                icon="info-circle"
              >
                Toast number ${++count}
                <template #actions>
                  <NuiButton
                    variant="flat"
                    color="current"
                    @click="close"
                    label="Close"
                  />
                </template>
              </NuiBanner>
            `
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

export const Colors: Story = {
    render: args => ({
        components: { NuiToast, NuiButton },
        setup() {
            const { add } = useNuiToast()

            const showToast = (color: string) => {
                add({
                    position: 'bottom',
                    direction: 'right',
                    content: `
              <NuiBanner
                shadow
                icon="info-circle"
                color="${color}"
              >
                This is a ${color} toast!
                <template #actions>
                  <NuiButton
                    variant="flat"
                    color="current"
                    @click="close"
                    label="Close"
                  />
                </template>
              </NuiBanner>
            `
                })
            }

            return { args, showToast }
        },
        template: `
      <NuiToast v-bind="args" />
      <div class="p-lg flex gap-sm">
        <NuiButton @click="showToast('primary')">Primary</NuiButton>
        <NuiButton @click="showToast('success')">Success</NuiButton>
        <NuiButton @click="showToast('info')">Info</NuiButton>
        <NuiButton @click="showToast('warning')">Warning</NuiButton>
        <NuiButton @click="showToast('error')">Error</NuiButton>
      </div>
    `
    })
}
