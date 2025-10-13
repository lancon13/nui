import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NuiToggle from './NuiToggle.vue'
import NuiIcon from './NuiIcon.vue'

const colors = ['primary', 'success', 'error', 'warning', 'info', 'current']
const sizes = ['small', 'medium', 'large']

const meta: Meta<typeof NuiToggle> = {
    title: 'UI/NuiToggle',
    component: NuiToggle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        modelValue: {
            control: 'boolean',
        },
        label: {
            control: 'text',
        },
        description: {
            control: 'text',
        },
        disabled: {
            control: 'boolean',
        },
        color: {
            control: 'select',
            options: colors,
        },
        size: {
            control: 'select',
            options: sizes,
        },
        helperText: {
            control: 'text',
        },
    },
    args: {
        modelValue: false,
        label: 'Toggle me',
        description: undefined,
        disabled: false,
        color: 'current',
        size: 'medium',
        helperText: undefined,
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Default Toggle',
    },
    render: args => ({
        components: { NuiToggle },
        setup() {
            const model = ref(false)
            return { args, model }
        },
        template: '<NuiToggle v-bind="args" v-model="model" />',
    }),
}

export const Checked: Story = {
    args: {
        label: 'Checked Toggle',
        modelValue: true,
    },
    render: args => ({
        components: { NuiToggle },
        setup() {
            const model = ref(args.modelValue)
            return { args, model }
        },
        template: '<NuiToggle v-bind="args" v-model="model" />',
    }),
}

export const Disabled: Story = {
    args: {
        label: 'Disabled Toggle',
        disabled: true,
    },
}

export const WithDescription: Story = {
    args: {
        label: 'Accept terms',
        description: 'You must accept the terms and conditions to proceed.',
    },
}

export const WithSlot: Story = {
    args: {
        label: undefined, // Label (Description) is provided via slot
        description: ' ', // This is required to make the slot render
    },
    render: args => ({
        components: { NuiToggle },
        setup() {
            const model = ref(false)
            return { args, model }
        },
        template: '<NuiToggle v-bind="args" v-model="model">Custom <strong>Description</strong> with <em>HTML</em></NuiToggle>',
    }),
}

export const Group: Story = {
    render: () => ({
        components: { NuiToggle },
        setup() {
            const selected = ref(['Autosave', 'Notifications'])
            const settings = ['Autosave', 'Notifications', 'Dark Mode']
            return { selected, settings }
        },
        template: `
            <div class="w-[20rem]">
                <p class="mb-md">Selected: {{ selected }}</p>
                <div class="flex flex-col gap-sm">
                    <NuiToggle v-for="setting in settings" :key="setting" v-model="selected" :value="setting" :label="setting" />
                </div>
            </div>
        `,
    }),
}

export const HelperText: Story = {
    args: {
        label: 'Toggle with helper text',
        helperText: 'This is some helpful text for the toggle.',
    },
}

export const Colors: Story = {
    render: () => ({
        components: { NuiToggle },
        setup() {
            return { colors }
        },
        template: `
            <div class="flex flex-col gap-sm">
                <NuiToggle
                    v-for="color in colors"
                    :key="color"
                    :model-value="true"
                    :label="color.charAt(0).toUpperCase() + color.slice(1)"
                    :color="color"
                    description="You must accept the terms and conditions to proceed."
                    :helper-text="color.charAt(0).toUpperCase() + color.slice(1) + ' helper text'"
                />
            </div>
        `,
    }),
}

export const Sizes: Story = {
    render: () => ({
        components: { NuiToggle },
        setup() {
            return { sizes }
        },
        template: `
            <div class="flex flex-col gap-sm items-start">
                <NuiToggle
                    v-for="size in sizes"
                    :key="size"
                    :model-value="true"
                    :label="size.charAt(0).toUpperCase() + size.slice(1)"
                    description="You must accept the terms and conditions to proceed."
                    :size="size"
                />
            </div>
        `,
    }),
}

export const WithIcons: Story = {
    args: {
        label: 'Theme',
        description: 'Switch between light and dark mode',
        size: 'large',
        color: 'primary',
    },
    render: (args) => ({
        components: { NuiToggle, NuiIcon },
        setup() {
            const model = ref(false)
            return { args, model }
        },
        template: `
            <!-- The color of the icon in the 'off' slot should be handled by the consumer. -->
            <!-- The 'on' slot icon color is handled by the component. -->
            <NuiToggle v-bind="args" v-model="model">
                <template #on>
                    <NuiIcon name="weather-night" />
                </template>
                <template #off>
                    <NuiIcon name="weather-sunny" class="text-primary" />
                </template>
            </NuiToggle>
        `,
    }),
}

export const WithThumbIcon: Story = {
    args: {
        label: 'Icon in thumb',
        description: 'Show an icon inside the thumb',
        size: 'large',
        color: 'primary',
    },
    render: (args) => ({
        components: { NuiToggle, NuiIcon },
        setup() {
            const model = ref(false)
            return { args, model }
        },
        template: `
            <NuiToggle v-bind="args" v-model="model">
                <template #thumb>
                    <NuiIcon name="power" />
                </template>
            </NuiToggle>
        `,
    }),
}

export const WithIconsSizes: Story = {
    render: () => ({
        components: { NuiToggle, NuiIcon },
        setup() {
            const models = ref({
                small: false,
                medium: true,
                large: false,
            })
            return { sizes, models }
        },
        template: `
            <div class="flex items-start gap-lg">
                <div v-for="size in sizes" :key="size" class="flex flex-col items-center gap-sm">
                    <p class="capitalize">{{ size }}</p>
                    <NuiToggle color="primary" :size="size" v-model="models[size]">
                        <template #on>
                            <NuiIcon name="weather-night" />
                        </template>
                        <template #off>
                            <NuiIcon name="weather-sunny" class="text-primary" />
                        </template>
                    </NuiToggle>
                </div>
            </div>
        `,
    }),
}
