import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NButton from './NButton.vue'
import NIcon from './NIcon.vue'
import NInputText from './NInputText.vue'

const meta = {
    title: 'UI/NInputText',
    component: NInputText,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        type: { control: 'select', options: ['text', 'password', 'email', 'number', 'tel', 'url'] },
        message: { control: 'text' },
        onInput: { action: 'input' },
        onChange: { action: 'change' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref('')
            return { args, value }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Value: <code>{{ value }}</code></div>
                <NInputText v-bind="args" v-model="value" label="Username" placeholder="Enter username" />
            </div>
        `
    })
}

export const CustomClasses: Story = {
    args: {},
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref('')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputText 
                    v-bind="args" 
                    v-model="value" 
                    label="Custom Wrapper" 
                    wrapper-class="border border-brand p-2 bg-brand/5"
                />
                <NInputText 
                    v-bind="args" 
                    v-model="value" 
                    label="Custom Container" 
                    container-class="bg-info/10 p-2"
                />
            </div>
        `
    })
}

export const Colors: Story = {
    args: {},
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref('Text content')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputText v-bind="args" v-model="value" label="Default" />
                <NInputText v-bind="args" v-model="value" class="brand" label="Brand" />
                <NInputText v-bind="args" v-model="value" class="success" label="Success" helperText="Saved!" icon="mdi-check" />
                <NInputText v-bind="args" v-model="value" class="error" label="Error" helperText="Input is invalid" icon="mdi-alert-circle" />
            </div>
        `
    })
}

export const Sizes: Story = {
    args: {},
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref('Sizing')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputText v-bind="args" v-model="value" size="small" label="Small" />
                <NInputText v-bind="args" v-model="value" size="medium" label="Medium" />
                <NInputText v-bind="args" v-model="value" size="large" label="Large" />
            </div>
        `
    })
}

export const Pilled: Story = {
    args: {},
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref('Rounded')
            return { args, value }
        },
        template: `
            <div class="w-96">
                <NInputText v-bind="args" v-model="value" class="rounded-full" label="Pilled Shape" />
            </div>
        `
    })
}

export const Password: Story = {
    args: {
        type: 'password',
        label: 'Password'
    },
    render: args => ({
        components: { NInputText, NButton, NIcon },
        setup() {
            const value = ref('secret123')
            const showPassword = ref(false)
            return { args, value, showPassword }
        },
        template: `
            <div class="w-96">
                <NInputText v-bind="args" v-model="value" :type="showPassword ? 'text' : 'password'" icon="mdi-lock" placeholder="••••••••">
                    <template #append>
                        <NIcon 
                            :name="showPassword ? 'mdi-eye-off' : 'mdi-eye'" 
                            class="cursor-pointer hover:text-brand"
                            @click="showPassword = !showPassword"
                        />
                    </template>
                </NInputText>
            </div>
        `
    })
}

export const Number: Story = {
    args: {
        type: 'number',
        label: 'Number Input'
    },
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref(0)
            return { args, value }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Value: <code>{{ value }}</code> (Type: {{ typeof value }})</div>
                <NInputText v-bind="args" v-model="value" placeholder="Enter number" />
            </div>
        `
    })
}

export const Events: Story = {
    args: {
        placeholder: 'Type something and then click outside...'
    },
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref('')
            const inputCount = ref(0)
            const changeCount = ref(0)

            function handleInput() {
                inputCount.value++
            }
            function handleChange() {
                changeCount.value++
            }

            return { args, value, inputCount, changeCount, handleInput, handleChange }
        },
        template: `
            <div class="w-[500px] flex flex-col gap-6">
                <div class="bg-brand/5 p-4 rounded-element border border-brand/20">
                    <p class="text-sm mb-4">
                        <strong>Input event:</strong> fires immediately on every keystroke.<br/>
                        <strong>Change event:</strong> fires only when you blur (click away) after changing value.
                    </p>
                    <NInputText 
                        v-bind="args" 
                        v-model="value" 
                        @input="handleInput" 
                        @change="handleChange" 
                    />
                </div>
                
                <div class="grid grid-cols-2 gap-4 text-center">
                    <div class="p-4 bg-surface rounded shadowed border border-border flex flex-col gap-1">
                        <div class="text-xs uppercase tracking-widest opacity-60 font-bold">Input Fires</div>
                        <div class="text-4xl font-black text-brand">{{ inputCount }}</div>
                        <div class="text-[10px] opacity-50 italic">Fires on every key</div>
                    </div>
                    <div class="p-4 bg-surface rounded shadowed border border-border flex flex-col gap-1">
                        <div class="text-xs uppercase tracking-widest opacity-60 font-bold">Change Fires</div>
                        <div class="text-4xl font-black text-success">{{ changeCount }}</div>
                        <div class="text-[10px] opacity-50 italic">Fires on blur</div>
                    </div>
                </div>
            </div>
        `
    })
}

export const Loading: Story = {
    args: {
        loading: true
    },
    render: args => ({
        components: { NInputText, NButton },
        setup() {
            const value = ref('Loading content...')
            const loading = ref(true)
            return { args, value, loading }
        },
        template: `
            <div class="flex flex-col items-center gap-4 w-96">
                <NInputText v-bind="args" v-model="value" :loading="loading" loadingName="mdi-sync" loadingClass="animate-spin" label="Data Field" class="brand" />
                <NButton @click="loading = !loading" :label="loading ? 'Stop Loading' : 'Start Loading'" />
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {
        disabled: true
    },
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref('Disabled input')
            return { args, value }
        },
        template: `
            <div class="w-96">
                <NInputText v-bind="args" v-model="value" label="Disabled Field" placeholder="You cannot edit this" />
            </div>
        `
    })
}

export const Icons: Story = {
    args: {},
    render: args => ({
        components: { NInputText },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 w-96">
                <NInputText v-bind="args" prepend-icon="mdi-magnify" placeholder="Search..." />
                <NInputText v-bind="args" append-icon="mdi-email" placeholder="Email address" class="brand" />
            </div>
        `
    })
}

export const Debounce: Story = {
    args: {
        debounce: 500,
        label: 'Debounced Input'
    },
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref('')
            return { args, value }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Model Value: <code>{{ value }}</code></div>
                <div class="text-xs text-muted mb-2">Value updates 500ms after you stop typing.</div>
                <NInputText v-bind="args" v-model="value" placeholder="Type fast..." />
            </div>
        `
    })
}

export const Transform: Story = {
    args: {
        format: (val: string) => val.toUpperCase(),
        parse: (val: string) => val.toLowerCase()
    },
    render: args => ({
        components: { NInputText },
        setup() {
            const value = ref('lowercase')
            return { args, value }
        },
        template: `
            <div class="w-96 flex flex-col gap-2">
                <div>Model (lowercase): <code>{{ value }}</code></div>
                <NInputText v-bind="args" v-model="value" label="UPPERCASE Display" />
            </div>
        `
    })
}
