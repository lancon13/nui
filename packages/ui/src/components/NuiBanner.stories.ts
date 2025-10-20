/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import NuiBanner from './NuiBanner.vue'
import NuiButton from './NuiButton.vue'

const meta = {
    title: 'UI/NuiBanner',
    component: NuiBanner,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: { type: 'select' },
            options: ['primary', 'info', 'success', 'warning', 'error', 'current']
        },
        icon: {
            control: { type: 'text' }
        },
        inline: {
            control: { type: 'boolean' }
        },
        shadow: {
            control: { type: 'boolean' }
        }
    }
} satisfies Meta<typeof NuiBanner>

export default meta

type Story = StoryObj<typeof meta & { args: { default?: string } }>

export const Default: Story = {
    args: {
        default: 'This is a default banner.',
        icon: 'account',
        inline: true
    },
    render: args => ({
        components: { NuiBanner },
        setup() {
            return { args }
        },
        template: `
      <NuiBanner v-bind="args">
        {{ args.default }}
      </NuiBanner>
    `
    })
}

export const Colors: Story = {
    render: () => ({
        components: { NuiBanner },
        setup() {
            const colors = ['primary', 'info', 'success', 'warning', 'error', 'current']
            return { colors }
        },
        template: `
      <div class="flex flex-col gap-sm">
        <NuiBanner v-for="color in colors" :key="color" :color="color">
          This is a {{ color }} banner.
        </NuiBanner>
      </div>
    `
    })
}

export const WithIconSlot: Story = {
    args: {
        default: 'This is a banner with a custom icon slot.'
    },
    render: args => ({
        components: { NuiBanner },
        setup() {
            return { args }
        },
        template: `
      <NuiBanner :color="args.color">
        <template #icon>
          <span class="text-2xl">🎉</span>
        </template>
        {{ args.default }}
      </NuiBanner>
    `
    })
}

export const WithActions: Story = {
    args: {
        default: 'This is a banner with actions.',
        icon: 'info-circle',
        actions: [
            {
                label: 'Dismiss',
                variant: 'text',
                color: 'current'
            },
            {
                label: 'Update',
                variant: 'solid',
                color: 'primary'
            }
        ] as any
    },
    render: args => ({
        components: { NuiBanner },
        setup() {
            return { args }
        },
        template: `
      <NuiBanner v-bind="args">
        {{ args.default }}
      </NuiBanner>
    `
    })
}

export const WithActionsSlot: Story = {
    args: {
        default: 'This is a banner with a custom actions slot.',
        icon: 'info-circle'
    },
    render: args => ({
        components: { NuiBanner, NuiButton },
        setup() {
            return { args }
        },
        template: `
      <NuiBanner :color="args.color" :icon="args.icon">
        {{ args.default }}
        <template #actions>
            <NuiButton
                label="Undo"
                variant="text"
                color="primary"
            />
        </template>
      </NuiBanner>
    `
    })
}

export const Block: Story = {
    args: {
        default: 'This is a block banner with actions.',
        icon: 'info-circle',
        inline: false,
        actions: [
            {
                label: 'Dismiss',
                variant: 'text',
                color: 'current'
            },
            {
                label: 'Update',
                variant: 'solid',
                color: 'primary'
            }
        ] as any
    },
    render: args => ({
        components: { NuiBanner },
        setup() {
            return { args }
        },
        template: `
      <NuiBanner
        v-bind="args"
      >
        {{ args.default }}
      </NuiBanner>
    `
    })
}

export const ColoredWithActions: Story = {
    render: () => ({
        components: { NuiBanner },
        setup() {
            const colors = ['primary', 'info', 'success', 'warning', 'error', 'current']
            const actions = [
                {
                    label: 'Dismiss',
                    variant: 'text',
                    color: 'current'
                },
                {
                    label: 'Update',
                    variant: 'solid',
                    color: 'primary'
                }
            ] as any
            return { colors, actions }
        },
        template: `
      <div class="flex flex-col gap-sm">
        <NuiBanner
          v-for="color in colors"
          :key="color"
          :color="color"
          icon="email"
          :actions="actions"
        >
          This is a {{ color }} banner with actions.
        </NuiBanner>
      </div>
    `
    })
}

export const Shadow: Story = {
    args: {
        default: 'This is a banner with a shadow.',
        shadow: true
    },
    render: args => ({
        components: { NuiBanner },
        setup() {
            return { args }
        },
        template: `
      <NuiBanner v-bind="args">
        {{ args.default }}
      </NuiBanner>
    `
    })
}
