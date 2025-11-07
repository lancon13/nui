import type { Meta, StoryObj } from '@storybook/vue3-vite'

import NuiBadge from './NuiBadge.vue'
import NuiButton from './NuiButton.vue'
import NuiIcon from './NuiIcon.vue'

const meta = {
    title: 'UI/NuiBadge',
    component: NuiBadge,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['current', 'primary', 'info', 'success', 'warning', 'error']
        },
        variant: {
            control: 'select',
            options: ['solid', 'flat', 'outlined', 'text']
        },
        position: {
            control: 'select',
            options: ['top', 'center', 'bottom']
        },
        direction: {
            control: 'select',
            options: [undefined, 'left', 'right']
        },
        dot: { control: 'boolean' },
        pilled: { control: 'boolean' }
    }
} satisfies Meta<typeof NuiBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        color: 'current'
    },
    render: args => ({
        components: { NuiBadge },
        setup: () => ({ args }),
        template: '<NuiBadge v-bind="args">Badge</NuiBadge>'
    })
}

export const Colors: Story = {
    render: args => ({
        components: { NuiBadge },
        setup: () => ({ args }),
        template: `
      <div class="flex items-center gap-sm">
        <NuiBadge v-bind="args" color="current">current</NuiBadge>
        <NuiBadge v-bind="args" color="primary">primary</NuiBadge>
        <NuiBadge v-bind="args" color="info">info</NuiBadge>
        <NuiBadge v-bind="args" color="success">success</NuiBadge>
        <NuiBadge v-bind="args" color="warning">warning</NuiBadge>
        <NuiBadge v-bind="args" color="error">error</NuiBadge>
      </div>
    `
    })
}

export const Variants: Story = {
    render: args => ({
        components: { NuiBadge },
        setup: () => ({ args }),
        template: `
      <div class="flex items-center gap-sm">
        <NuiBadge v-bind="args" variant="solid" color="primary">solid</NuiBadge>
        <NuiBadge v-bind="args" variant="flat" color="primary">flat</NuiBadge>
        <NuiBadge v-bind="args" variant="outlined" color="primary">outlined</NuiBadge>
        <NuiBadge v-bind="args" variant="text" color="primary">text</NuiBadge>
      </div>
    `
    })
}

export const Dot: Story = {
    args: {
        dot: true
    },
    render: args => ({
        components: { NuiBadge },
        setup: () => ({ args }),
        template: `
      <div class="flex items-center gap-sm">
        <NuiBadge v-bind="args" color="current" />
        <NuiBadge v-bind="args" color="primary" />
        <NuiBadge v-bind="args" color="info" />
        <NuiBadge v-bind="args" color="success" />
        <NuiBadge v-bind="args" color="warning" />
        <NuiBadge v-bind="args" color="error" />
      </div>
    `
    })
}

export const WithIcon: Story = {
    args: {
        color: 'primary'
    },
    render: args => ({
        components: { NuiBadge, NuiIcon },
        setup: () => ({ args }),
        template: `
      <NuiBadge v-bind="args">
        <NuiIcon name="star" />
      </NuiBadge>
    `
    })
}

export const Attached: Story = {
    args: {
        color: 'error',
        position: 'top',
        direction: 'right'
    },
    render: args => ({
        components: { NuiBadge, NuiButton },
        setup: () => ({ args }),
        template: `
      <div class="p-lg grid grid-cols-2 gap-x-lg gap-y-xl">
        <div class="relative">
          <NuiButton>Top-Right <NuiBadge v-bind="args">1</NuiBadge></NuiButton>          
        </div>
        <div class="relative">
          <NuiButton>Top-Left <NuiBadge v-bind="args" direction="left">1</NuiBadge></NuiButton>
          
        </div>
        <div class="relative">
          <NuiButton>Bottom-Right <NuiBadge v-bind="args" position="bottom">1</NuiBadge></NuiButton>
          
        </div>
        <div class="relative">
          <NuiButton>Bottom-Left <NuiBadge v-bind="args" position="bottom" direction="left">1</NuiBadge></NuiButton>
          
        </div>
        <div class="relative">
          <NuiButton>Center-Right <NuiBadge v-bind="args" position="center">1</NuiBadge></NuiButton>
          
        </div>
        <div class="relative">
          <NuiButton>Center-Left <NuiBadge v-bind="args" position="center" direction="left">1</NuiBadge></NuiButton>
          
        </div>
      </div>
    `
    })
}

export const Pilled: Story = {
    render: args => ({
        components: { NuiBadge },
        setup: () => ({ args }),
        template: `
      <div class="flex items-center gap-sm">
        <NuiBadge v-bind="args" pilled color="primary">pilled</NuiBadge>
        <NuiBadge v-bind="args" pilled color="info">info</NuiBadge>
        <NuiBadge v-bind="args" pilled color="success">success</NuiBadge>
        <NuiBadge v-bind="args" pilled color="warning">warning</NuiBadge>
        <NuiBadge v-bind="args" pilled color="error">error</NuiBadge>
      </div>
    `
    })
}

export const PilledWithIcon: Story = {
    args: {
        color: 'primary',
        pilled: true
    },
    render: args => ({
        components: { NuiBadge, NuiIcon },
        setup: () => ({ args }),
        template: `
      <NuiBadge v-bind="args">
        <NuiIcon name="star" />
      </NuiBadge>
    `
    })
}

export const PilledWithNumber: Story = {
    args: {
        color: 'primary',
        pilled: true
    },
    render: args => ({
        components: { NuiBadge },
        setup: () => ({ args }),
        template: `
      <div class="flex items-center gap-sm">
        <NuiBadge v-bind="args" color="primary">1</NuiBadge>
        <NuiBadge v-bind="args" color="info">42</NuiBadge>
        <NuiBadge v-bind="args" color="success">99+</NuiBadge>
      </div>
    `
    })
}

export const PilledVariants: Story = {
    args: {
        pilled: true,
        color: 'primary'
    },
    render: args => ({
        components: { NuiBadge },
        setup: () => ({ args }),
        template: `
      <div class="flex items-center gap-sm">
        <NuiBadge v-bind="args" variant="solid">solid</NuiBadge>
        <NuiBadge v-bind="args" variant="flat">flat</NuiBadge>
        <NuiBadge v-bind="args" variant="outlined">outlined</NuiBadge>
        <NuiBadge v-bind="args" variant="text">text</NuiBadge>
      </div>
    `
    })
}

export const Inline: Story = {
    args: {
        color: 'primary',
        position: 'center'
    },
    render: args => ({
        components: { NuiBadge, NuiButton },
        setup: () => ({ args }),
        template: `
      <NuiButton>
        Profile <NuiBadge v-bind="args" :direction="undefined">4</NuiBadge>
      </NuiButton>
    `
    })
}

export const PilledInline: Story = {
    args: {
        pilled: true,
        position: 'center'
    },
    render: args => ({
        components: { NuiBadge, NuiButton },
        setup: () => ({ args }),
        template: `
      <div class="flex items-center gap-sm">
        <NuiButton>
          Profile <NuiBadge v-bind="args" :direction="undefined" color="primary">1</NuiBadge>
        </NuiButton>
        <NuiButton>
          Messages <NuiBadge v-bind="args" :direction="undefined" color="info">42</NuiBadge>
        </NuiButton>
        <NuiButton>
          Notifications <NuiBadge v-bind="args" :direction="undefined" color="success">99+</NuiBadge>
        </NuiButton>
      </div>
    `
    })
}

export const InlineVariants: Story = {
    args: {
        position: 'center',
        color: 'primary'
    },
    render: args => ({
        components: { NuiBadge, NuiButton },
        setup: () => ({ args }),
        template: `
      <div class="flex items-center gap-sm">
        <NuiButton>
          Solid <NuiBadge v-bind="args" :direction="undefined" variant="solid">New</NuiBadge>
        </NuiButton>
        <NuiButton>
          Flat <NuiBadge v-bind="args" :direction="undefined" variant="flat">New</NuiBadge>
        </NuiButton>
        <NuiButton>
          Outlined <NuiBadge v-bind="args" :direction="undefined" variant="outlined">New</NuiBadge>
        </NuiButton>
        <NuiButton>
          Text <NuiBadge v-bind="args" :direction="undefined" variant="text">New</NuiBadge>
        </NuiButton>
      </div>
    `
    })
}
