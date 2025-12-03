import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NuiAvatar from './NuiAvatar.vue'
import NuiIcon from './NuiIcon.vue'
import NuiTooltip from './NuiTooltip.vue'

const meta = {
    title: 'UI/NuiAvatar',
    component: NuiAvatar,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large']
        },
        color: {
            control: { type: 'select' },
            options: ['primary', 'success', 'error', 'warning', 'info', 'current']
        },
        variant: {
            control: { type: 'select' },
            options: ['solid', 'flat', 'outlined', 'text']
        }
    },
    parameters: {
        layout: 'centered'
    }
} satisfies Meta<typeof NuiAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        text: 'N',
        size: 'medium',
        color: 'primary',
        variant: 'solid',
        squared: false,
        shadow: false
    }
}

export const Variants: Story = {
    render: args => ({
        components: { NuiAvatar },
        setup() {
            return { args }
        },
        template: `
      <div class="grid grid-cols-4 gap-sm">
        <NuiAvatar v-bind="args" variant="solid" text="S" />
        <NuiAvatar v-bind="args" variant="flat" text="F" />
        <NuiAvatar v-bind="args" variant="outlined" text="O" />
        <NuiAvatar v-bind="args" variant="text" text="T" />
      </div>
    `
    }),
    args: {
        color: 'primary',
        size: 'medium'
    }
}

export const Colors: Story = {
    render: args => ({
        components: { NuiAvatar },
        setup() {
            return { args }
        },
        template: `
      <div class="grid grid-cols-6 gap-sm">
        <NuiAvatar v-bind="args" color="primary" text="P" />
        <NuiAvatar v-bind="args" color="success" text="S" />
        <NuiAvatar v-bind="args" color="error" text="E" />
        <NuiAvatar v-bind="args" color="warning" text="W" />
        <NuiAvatar v-bind="args" color="info" text="I" />
        <NuiAvatar v-bind="args" color="current" text="C" />
      </div>
    `
    }),
    args: {
        variant: 'solid',
        size: 'medium'
    }
}

export const Sizes: Story = {
    render: args => ({
        components: { NuiAvatar },
        setup() {
            return { args }
        },
        template: `
      <div class="flex items-center gap-sm">
        <NuiAvatar v-bind="args" size="small" text="S" />
        <NuiAvatar v-bind="args" size="medium" text="M" />
        <NuiAvatar v-bind="args" size="large" text="L" />
        <NuiAvatar v-bind="args" size="64px" text="XL" />
      </div>
    `
    }),
    args: {
        variant: 'solid',
        color: 'primary'
    }
}

export const Squared: Story = {
    render: args => ({
        components: { NuiAvatar },
        setup() {
            return { args }
        },
        template: `
        <div class="flex items-center gap-sm">
          <NuiAvatar v-bind="args" size="large" text="L" />
          <NuiAvatar v-bind="args" size="large" text="L" squared />
        </div>
      `
    }),
    args: {
        variant: 'solid',
        color: 'primary'
    }
}

export const AllVariantsAndColors: Story = {
    render: args => ({
        components: { NuiAvatar },
        setup() {
            const variants = ['solid', 'flat', 'outlined', 'text']
            const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
            const textMap: Record<string, string> = {
                primary: 'P',
                success: 'S',
                error: 'E',
                warning: 'W',
                info: 'I',
                current: 'C'
            }
            return { args, variants, colors, textMap }
        },
        template: `
      <div class="flex flex-col gap-y-lg">
        <div v-for="variant in variants" :key="variant" class="flex flex-col gap-y-sm">
          <h3 class="text-lg font-semibold capitalize">{{ variant }}</h3>
          <div class="grid grid-cols-6 gap-x-sm">
            <NuiAvatar
              v-for="color in colors"
              :key="color"
              v-bind="args"
              :variant="variant"
              :color="color"
              :text="textMap[color]"
            />
          </div>
        </div>
      </div>
    `
    }),
    args: {
        size: 'medium'
    }
}

export const Shadow: Story = {
    render: args => ({
        components: { NuiAvatar },
        setup() {
            const variants = ['solid', 'flat', 'outlined', 'text']
            const sizes = ['small', 'medium', 'large']
            return { args, variants, sizes }
        },
        template: `
      <div class="flex flex-col gap-y-lg">
        <div v-for="variant in variants" :key="variant" class="flex flex-col gap-y-sm">
          <h3 class="text-lg font-semibold capitalize">{{ variant }}</h3>
          <div class="flex items-start gap-x-lg">
            <div v-for="size in sizes" :key="size" class="flex items-center gap-x-sm">
                <NuiAvatar v-bind="args" :variant="variant" :size="size" :text="size[0].toUpperCase()" />
                <NuiAvatar v-bind="args" :variant="variant" :size="size" :text="size[0].toUpperCase()" shadow />
            </div>
          </div>
        </div>
      </div>
    `
    }),
    args: {
        color: 'primary'
    }
}

export const WithMedia: Story = {
    render: args => ({
        components: { NuiAvatar, NuiIcon },
        setup() {
            const sizes = ['small', 'medium', 'large']
            const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
            const variants = ['solid', 'flat', 'outlined', 'text']
            return { args, sizes, colors, variants }
        },
        template: `
      <div class="flex flex-col gap-y-lg">
        <div class="flex flex-col gap-y-sm">
          <h3 class="text-lg font-semibold capitalize">Sizes</h3>
          <div class="flex items-center gap-x-sm">
            <NuiAvatar v-for="size in sizes" :key="size" v-bind="args" :size="size">
              <img src="https://picsum.photos/150" alt="placeholder" class="h-full w-full object-cover" />
            </NuiAvatar>
          </div>
        </div>
        <div class="flex flex-col gap-y-sm">
          <h3 class="text-lg font-semibold capitalize">Colors</h3>
          <div class="flex items-center gap-x-sm">
            <NuiAvatar v-for="color in colors" :key="color" v-bind="args" :color="color">
              <img src="https://picsum.photos/150" alt="placeholder" class="h-full w-full object-cover" />
            </NuiAvatar>
          </div>
        </div>
        <div class="flex flex-col gap-y-sm">
          <h3 class="text-lg font-semibold capitalize">Variants</h3>
          <div class="flex items-center gap-x-sm">
            <NuiAvatar v-for="variant in variants" :key="variant" v-bind="args" :variant="variant">
              <img src="https://picsum.photos/150" alt="placeholder" class="h-full w-full object-cover" />
            </NuiAvatar>
          </div>
        </div>
        <div class="flex flex-col gap-y-sm">
          <h3 class="text-lg font-semibold capitalize">With Icon (Sizes)</h3>
          <div class="flex items-center gap-x-sm">
            <NuiAvatar v-for="size in sizes" :key="size" v-bind="args" :size="size">
              <NuiIcon name="account" />
            </NuiAvatar>
          </div>
        </div>
        <div class="flex flex-col gap-y-sm">
          <h3 class="text-lg font-semibold capitalize">With Icon (Colors)</h3>
          <div class="flex items-center gap-x-sm">
            <NuiAvatar v-for="color in colors" :key="color" v-bind="args" :color="color">
              <NuiIcon name="account" />
            </NuiAvatar>
          </div>
        </div>
      </div>
    `
    }),
    args: {
        size: 'medium',
        color: 'primary',
        variant: 'solid'
    }
}

export const Clickable: Story = {
    render: args => ({
        components: { NuiAvatar },
        setup() {
            const handleClick = () => {
                alert('Avatar clicked!')
            }
            return { args, handleClick }
        },
        template: `
      <NuiAvatar v-bind="args" class="cursor-pointer transition-all duration-200 hover:opacity-75" @click="handleClick" />
    `
    }),
    args: {
        text: 'C',
        size: 'large',
        color: 'primary'
    }
}

export const WithTooltip: Story = {
    render: args => ({
        components: { NuiAvatar, NuiTooltip },
        setup() {
            return { args }
        },
        template: `
        <NuiAvatar v-bind="args">
            <NuiTooltip text="This is a tooltip" />
        </NuiAvatar>
    `
    }),
    args: {
        text: 'T',
        size: 'large',
        color: 'primary'
    }
}
