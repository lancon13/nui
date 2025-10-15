import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NuiCheckbox from './NuiCheckbox.vue'

const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
const sizes = ['small', 'medium', 'large']

const meta: Meta<typeof NuiCheckbox> = {
    title: 'UI/NuiCheckbox',
    component: NuiCheckbox,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        modelValue: {
            control: 'boolean'
        },
        label: {
            control: 'text'
        },
        description: {
            control: 'text'
        },
        disabled: {
            control: 'boolean'
        },
        indeterminate: {
            control: 'boolean'
        },
        color: {
            control: 'select',
            options: colors
        },
        size: {
            control: 'select',
            options: sizes
        },
        helperText: {
            control: 'text'
        }
    },
    args: {
        modelValue: false,
        label: 'Toggle me',
        description: undefined,
        disabled: false,
        color: 'current',
        size: 'medium',
        helperText: undefined
    }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Default Checkbox'
    },
    render: args => ({
        components: { NuiCheckbox },
        setup() {
            const model = ref(false)
            return { args, model }
        },
        template: '<NuiCheckbox v-bind="args" v-model="model" />'
    })
}

export const Checked: Story = {
    args: {
        label: 'Checked Checkbox',
        modelValue: true
    },
    render: args => ({
        components: { NuiCheckbox },
        setup() {
            const model = ref(args.modelValue)
            return { args, model }
        },
        template: '<NuiCheckbox v-bind="args" v-model="model" />'
    })
}

export const Disabled: Story = {
    args: {
        label: 'Disabled Checkbox',
        description: 'I am disabled.',
        disabled: true
    }
}

export const Indeterminate: Story = {
    args: {
        label: 'Indeterminate Checkbox',
        indeterminate: true
    }
}

export const WithDescription: Story = {
    args: {
        label: 'Accept terms',
        description: 'You must accept the terms and conditions to proceed.'
    }
}

export const WithSlot: Story = {
    args: {
        label: undefined, // Label (Description) is provided via slot
        description: ' ' // This is required to make the slot render
    },
    render: args => ({
        components: { NuiCheckbox },
        setup() {
            const model = ref(false)
            return { args, model }
        },
        template:
            '<NuiCheckbox v-bind="args" v-model="model">Custom <strong>Description</strong> with <em>HTML</em></NuiCheckbox>'
    })
}

export const Group: Story = {
    render: () => ({
        components: { NuiCheckbox },
        setup() {
            const selected = ref(['Apple', 'Banana'])
            const fruits = ['Apple', 'Banana', 'Orange']
            return { selected, fruits }
        },
        template: `
            <div class="w-[20rem]">
                <p class="mb-md">Selected: {{ selected }}</p>
                <div class="flex flex-col gap-sm">
                    <NuiCheckbox v-for="fruit in fruits" :key="fruit" v-model="selected" :value="fruit" :label="fruit" />
                </div>    
            </div>    
            
        `
    })
}

export const HelperText: Story = {
    args: {
        label: 'Checkbox with helper text',
        helperText: 'This is some helpful text for the checkbox.'
    }
}

export const Colors: Story = {
    render: () => ({
        components: { NuiCheckbox },
        setup() {
            return { colors }
        },
        template: `
            <div class="flex flex-col gap-sm">
                <NuiCheckbox 
                    v-for="color in colors" 
                    :key="color" 
                    :model-value="true"
                    :label="color.charAt(0).toUpperCase() + color.slice(1)" 
                    :color="color"
                    description="You must accept the terms and conditions to proceed."
                    :helper-text="color.charAt(0).toUpperCase() + color.slice(1) + ' helper text'"
                />
            </div>
        `
    })
}

export const Sizes: Story = {
    render: () => ({
        components: { NuiCheckbox },
        setup() {
            return { sizes }
        },
        template: `
            <div class="flex flex-col gap-sm items-start">
                <NuiCheckbox 
                    v-for="size in sizes" 
                    :key="size" 
                    :model-value="true"
                    :label="size.charAt(0).toUpperCase() + size.slice(1)" 
                    description="You must accept the terms and conditions to proceed."
                    :size="size"
                />
            </div>
        `
    })
}
