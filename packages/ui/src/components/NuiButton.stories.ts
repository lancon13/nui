import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { reactive } from 'vue'
// import { fn } from '@storybook/test'
import NuiButton from './NuiButton.vue'

const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
const variants = ['solid', 'outlined', 'flat', 'text']
const sizes = ['small', 'medium', 'large']

const meta = {
    title: 'UI/NuiButton',
    component: NuiButton,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset']
        },
        color: {
            control: 'select',
            options: colors
        },
        variant: {
            control: 'select',
            options: variants
        },
        size: {
            control: 'select',
            options: sizes
        },
        disabled: { control: 'boolean' },
        label: { control: 'text' },
        tag: { control: 'text' },
        prependIcon: { control: 'text' },
        appendIcon: { control: 'text' },
        icon: { control: 'text' },
        loading: { control: 'boolean' },
        loadingLabel: { control: 'text' },
        loadingIcon: { control: 'text' },
        rounded: { control: 'boolean' },
        pilled: { control: 'boolean' },
        to: { control: 'text' },
        href: { control: 'text' },
        target: {
            control: 'select',
            options: ['_self', '_blank', '_parent', '_top']
        },
        toggled: { control: 'boolean' },
        shadow: { control: 'boolean' },
        noRounded: { control: 'boolean' }
        // Events
        // onClick: { action: 'clicked' },
    },
    args: {
        type: 'button',
        color: 'current',
        variant: 'solid',
        size: 'medium',
        disabled: false,
        label: 'Button',
        tag: 'button',
        loading: false,
        loadingLabel: 'Loading...',
        loadingIcon: 'loading',
        rounded: false,
        pilled: false,
        to: undefined,
        href: undefined,
        target: undefined,
        shadow: false
        // onClick: fn(),
    }
} satisfies Meta<typeof NuiButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Button'
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args }
        },
        template: '<NuiButton v-bind="args" />'
    })
}

export const Variants: Story = {
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args, variants }
        },
        template: `
      <div class="flex flex-wrap items-end gap-sm">
        <NuiButton
          v-for="variant in variants"
          :key="variant"
          v-bind="args"
          color="primary"
          :variant="variant"
          :label="variant.charAt(0).toUpperCase() + variant.slice(1)"
        />
      </div>
    `
    })
}

export const Colors: Story = {
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args, colors }
        },
        template: `
      <div class="flex flex-wrap items-end gap-sm">
        <NuiButton
          v-for="color in colors"
          :key="color"
          v-bind="args"
          variant="solid"
          :color="color"
          :label="color.charAt(0).toUpperCase() + color.slice(1)"
        />
      </div>
    `
    })
}

export const Sizes: Story = {
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args, colors, sizes }
        },
        template: `
            <div class="grid grid-cols-3 gap-sm place-content-center">
                <template v-for="color in colors" :key="color">
                    <div v-for="size in sizes" :key="size" class="flex flex-col justify-center text-center">
                        <NuiButton
                            v-bind="args"
                            :color="color"
                            :size="size"
                            :label="size.charAt(0).toUpperCase() + size.slice(1)"
                        />
                    </div>
                </template>
            </div>`
    })
}

export const Icons: Story = {
    args: {
        prependIcon: 'account',
        appendIcon: 'arrow-right'
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args, sizes, variants }
        },
        template: `
         <div class="grid grid-cols-4 gap-sm">
            <template v-for="size in sizes" :key="size">                    
                <NuiButton
                    v-for="variant in variants" :key="variant"
                    v-bind="args"
                    :variant="variant"
                    :size="size"
                />                
            </template>
        </div>`
    })
}

export const IconOnly: Story = {
    args: {
        label: ''
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args, sizes, variants }
        },
        template: `
            <div class="grid grid-cols-8 gap-sm">
                <template v-for="size in sizes" :key="size">
                    <div v-for="variant in variants" :key="variant" class="justify-self-center-safe">
                        <NuiButton                            
                            v-bind="args"
                            :variant="variant"
                            :size="size"
                            icon="plus"                        
                        />
                    </div>
                    <div v-for="variant in variants" :key="variant" class="justify-self-center-safe">
                        <NuiButton
                            v-bind="args"
                            :variant="variant"
                            :size="size"
                            icon="plus"
                            rounded
                        />
                    </div>
                </template>                
            </div>`
    })
}

export const Loading: Story = {
    args: {
        loading: true
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { variants, args }
        },
        template: `
            <div class="grid grid-cols-4 gap-sm">
                <NuiButton
                    v-for="variant in variants"
                    v-bind="args"                    
                    color="primary"
                    :variant="variant"                    
                />     
            </div>`
    })
}

export const Disabled: Story = {
    args: {
        disabled: true
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { variants, args }
        },

        template: `
             <div class="grid grid-cols-4 gap-sm">
                <NuiButton
                    v-for="variant in variants"
                    v-bind="args"
                    color="primary"                    
                    :variant="variant"                    
                />                
            </div>`
    })
}

export const Pilled: Story = {
    args: {
        pilled: true,
        color: 'primary'
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args, variants }
        },
        template: `
      <div class="flex flex-wrap items-end gap-sm">
        <NuiButton
          v-for="variant in variants"
          :key="variant"
          v-bind="args"
          :variant="variant"
          :label="variant.charAt(0).toUpperCase() + variant.slice(1)"
        />
      </div>
    `
    })
}

export const NoRounded: Story = {
    args: {
        noRounded: true,
        color: 'primary',
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args, variants }
        },
        template: `
      <div class="flex flex-wrap items-end gap-sm">
        <NuiButton
          v-for="variant in variants"
          :key="variant"
          v-bind="args"
          :variant="variant"
          :label="variant.charAt(0).toUpperCase() + variant.slice(1)"
        />
      </div>
    `,
    }),
}

export const AsLink: Story = {
    args: {
        label: 'I am a link',
        tag: 'a',
        href: 'https://www.google.com',
        target: '_blank'
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args }
        },
        template: '<NuiButton v-bind="args" />'
    })
}

export const CurrentColor: Story = {
    args: {
        color: 'current'
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args }
        },
        template: `
            <div class="text-primary-500">
                <div class="flex gap-sm">
                    <NuiButton v-bind="args" variant="solid" label="Solid" />
                    <NuiButton v-bind="args" variant="outlined" label="Outlined" />
                    <NuiButton v-bind="args" variant="flat" label="Flat" />
                    <NuiButton v-bind="args" variant="text" label="Text" />
                </div>
            </div>
        `
    })
}

export const Toggle: Story = {
    args: {
        color: 'primary'
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            const sizes = ['small', 'medium', 'large']
            const variants = ['solid', 'outlined', 'flat', 'text']
            const states = reactive({
                small: {
                    solid: { normal: false, pilled: false, rounded: false, icon: false },
                    outlined: { normal: false, pilled: false, rounded: false, icon: false },
                    flat: { normal: false, pilled: false, rounded: false, icon: false },
                    text: { normal: false, pilled: false, rounded: false, icon: false }
                },
                medium: {
                    solid: { normal: false, pilled: false, rounded: false, icon: false },
                    outlined: { normal: false, pilled: false, rounded: false, icon: false },
                    flat: { normal: false, pilled: false, rounded: false, icon: false },
                    text: { normal: false, pilled: false, rounded: false, icon: false }
                },
                large: {
                    solid: { normal: false, pilled: false, rounded: false, icon: false },
                    outlined: { normal: false, pilled: false, rounded: false, icon: false },
                    flat: { normal: false, pilled: false, rounded: false, icon: false },
                    text: { normal: false, pilled: false, rounded: false, icon: false }
                }
            })

            return { args, sizes, variants, states }
        },
        template: `
            <div class="space-y-xl">
                <div v-for="size in sizes" :key="size">
                    <h2 class="font-sans font-bold text-lg capitalize mb-md border-b-2 border-muted-200 dark:border-muted-800 pb-sm">
                        Size: {{ size }}
                    </h2>
                    <div class="space-y-lg">
                        <div
                            v-for="variant in variants"
                            :key="variant"
                            class="flex items-center gap-x-sm"
                        >
                            <h3 class="font-sans font-bold capitalize w-20 shrink-0">
                                {{ variant }}
                            </h3>
                            <NuiButton
                                v-bind="args"
                                :toggled="states[size][variant].normal"                                
                                :size="size"
                                :variant="variant"
                                label="Normal"
                                @click="() => states[size][variant].normal = !states[size][variant].normal"
                            />
                            <NuiButton                                
                                v-bind="args"
                                :toggled="states[size][variant].pilled"
                                :size="size"
                                :variant="variant"
                                label="Pilled"
                                pilled
                                @click="() => states[size][variant].pilled = !states[size][variant].pilled"
                            />
                            <NuiButton                                
                                v-bind="args"
                                :toggled="states[size][variant].rounded"
                                :size="size"
                                :variant="variant"
                                label=""
                                icon="account"
                                rounded
                                @click="() => states[size][variant].rounded = !states[size][variant].rounded"
                            />
                            <NuiButton
                                v-bind="args"
                                :toggled="states[size][variant].icon"
                                :size="size"
                                :variant="variant"
                                icon="heart"
                                label=""
                                @click="() => states[size][variant].icon = !states[size][variant].icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
        `
    })
}

export const Shadow: Story = {
    args: {
        shadow: true
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args, colors, sizes }
        },
        template: `
        <div class="grid grid-cols-6 gap-sm place-content-center">
            <template v-for="size in sizes" :key="size">
                <NuiButton
                    v-for="color in colors" :key="color" 
                    v-bind="args"
                    :size="size"
                    :color="color"
                    :label="color"
                />
            </template>
        </div>`
    })
}

export const TextShadow: Story = {
    args: {
        shadow: true,
        variant: 'text'
    },
    render: args => ({
        components: { NuiButton },
        setup() {
            return { args, colors, sizes }
        },
        template: `
        <div class="grid grid-cols-6 gap-sm place-content-center">
            <template v-for="size in sizes" :key="size">
                <NuiButton
                    v-for="color in colors" :key="color" 
                    v-bind="args"
                    :size="size"
                    :color="color"
                    :label="color"
                />
            </template>
        </div>`
    })
}
