import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
// import { fn } from '@storybook/test'
import NuiButton from './NuiButton.vue'

const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
const variants = ['solid', 'outlined', 'flat', 'text']
const sizes = ['small', 'medium', 'large']

const meta = {
    title: 'UI/NuiButton',
    component: NuiButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'],
        },
        color: {
            control: 'select',
            options: colors,
        },
        variant: {
            control: 'select',
            options: variants,
        },
        size: {
            control: 'select',
            options: sizes,
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
            options: ['_self', '_blank', '_parent', '_top'],
        },
        toggle: { control: 'boolean' },
        shadow: { control: 'boolean' },
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
        toggle: false,
        shadow: false,
        // onClick: fn(),
    },
} satisfies Meta<typeof NuiButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Button',
    },
    render: (args) => ({
        components: { NuiButton },
        setup() {
            return { args }
        },
        template: '<NuiButton v-bind="args" />',
    }),
}

export const Variants: Story = {
    render: (args) => ({
        components: { NuiButton },
        setup() {
            return { args, colors, variants }
        },
        template: `
        <div class="grid grid-cols-6 gap-sm place-content-center">
            <template v-for="variant in variants" :key="variant">
                <NuiButton
                    v-for="color in colors" :key="color" 
                    v-bind="args"
                    :variant="variant"
                    :color="color"
                    :label="color.charAt(0).toUpperCase() + color.slice(1)"
                />
            </template>
        </div>`,
    }),
}

export const Sizes: Story = {
    render: (args) => ({
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
            </div>`,
    }),
}

export const Icons: Story = {
    args: {
        prependIcon: 'account',
        appendIcon: 'arrow-right',
    },
    render: (args) => ({
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
        </div>`,
    }),
}

export const IconOnly: Story = {
    args: {
        label: ''
    },
    render: (args) => ({
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
            </div>`,
    }),
}

export const Loading: Story = {
    args: {
        loading: true,
    },
    render: (args) => ({
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
            </div>`,
    }),
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => ({
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
            </div>`,
    }),
}



export const Pilled: Story = {
    args: {
        pilled: true,
    },

    render: (args) => ({
        components: { NuiButton },
        setup() {
            return { args, colors, variants }
        },

        template: `
        <div class="grid grid-cols-6 gap-sm">
            <template v-for="variant in variants" :key="variant">
                <NuiButton
                    v-for="color in colors"
                    v-bind="args"
                    :key="color"
                    :variant="variant"
                    :color="color"
                    :label="color.charAt(0).toUpperCase() + color.slice(1)"
                />
            </template>
        </div>`,

    }),

}



export const AsLink: Story = {
    args: {
        label: 'I am a link',
        tag: 'a',
        href: 'https://www.google.com',
        target: '_blank',
    },
    render: (args) => ({
        components: { NuiButton },
        setup() {
            return { args }
        },
        template: '<NuiButton v-bind="args" />',
    }),

}

export const CurrentColor: Story = {
    args: {
        color: 'current',
    },
    render: (args) => ({
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
        `,
    }),
}

export const Toggle: Story = {
    args: {
        toggle: true,
        label: 'Toggle Me',
    },
    render: (args) => ({
        components: { NuiButton },
        setup() {
            const toggled = ref(true)
            return { args, toggled }
        },
        template: '<NuiButton v-bind="args" v-model="toggled" />',
    }),
}

export const ToggleOff: Story = {
    args: {
        toggle: true,
        modelValue: false,
    },
    render: (args) => ({
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
        </div>`,
    }),
}

export const Shadow: Story = {
    args: {
        shadow: true,
    },
    render: (args) => ({
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
        </div>`,
    }),
}