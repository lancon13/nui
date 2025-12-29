import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NBanner from './NBanner.vue'
import NButton from './NButton.vue'
import NCheckbox from './NCheckbox.vue'
import NForm from './NForm.vue'
import NInputText from './NInputText.vue'

const meta = {
    title: 'UI/NForm',
    component: NForm,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        tag: { control: 'text' },
        title: { control: 'text' },
        titleTag: { control: 'text' },
        titleClass: { control: 'text' },
        message: { control: 'text' },
        status: {
            control: 'select',
            options: ['success', 'error', 'warning', 'info']
        }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NForm, NButton, NInputText, NCheckbox },
        setup() {
            return { args }
        },
        template: `
            <div class="w-96">
                <NForm v-bind="args">
                    <NInputText label="Username" placeholder="Enter your username" />
                    <NInputText label="Password" type="password" placeholder="Enter your password" />
                    <NCheckbox label="Remember me" inlineLabel />
                    <div class="flex justify-end pt-4">
                        <NButton type="submit" class="brand">Login</NButton>
                    </div>
                </NForm>
            </div>
        `
    })
}

export const WithTitle: Story = {
    args: {
        title: 'Account Settings',
        titleTag: 'h2'
    },
    render: args => ({
        components: { NForm, NButton, NInputText },
        setup() {
            return { args }
        },
        template: `
            <div class="w-96">
                <NForm v-bind="args">
                    <NInputText label="Email" modelValue="john@example.com" />
                    <NInputText label="Display Name" modelValue="John Doe" />
                    <div class="flex justify-end pt-4">
                        <NButton type="submit" class="brand" label="Update Profile" />
                    </div>
                </NForm>
            </div>
        `
    })
}

export const StatusMessages: Story = {
    args: {},

    render: args => ({
        components: { NForm, NButton, NInputText },

        setup() {
            return { args }
        },

        template: `
            <div class="flex flex-col gap-8 w-96">
                <NForm v-bind="args" message="Please fill in your credentials." status="info">
                    <NInputText label="Username" placeholder="user123" />
                    <NButton type="submit" class="brand" label="Next" />
                </NForm>
                <NForm v-bind="args" message="Profile updated successfully!" status="success">
                    <NInputText label="Display Name" modelValue="John Doe" />
                    <NButton type="submit" class="success" label="Saved" disabled />
                </NForm>

                <NForm v-bind="args" message="Password strength is weak." status="warning">
                    <NInputText label="New Password" type="password" modelValue="12345" />
                    <NButton type="submit" class="warning" label="Change" />
                </NForm>

                <NForm v-bind="args" message="Invalid email format detected." status="error">
                    <NInputText label="Email" modelValue="invalid-email" class="error" />
                    <NButton type="submit" class="error" label="Fix Errors" />
                </NForm>
            </div>
        `
    })
}

export const CustomMessage: Story = {
    args: {},

    render: args => ({
        components: { NForm, NButton, NInputText, NBanner },

        setup() {
            return { args }
        },

        template: `
            <div class="w-96">
                <NForm v-bind="args">
                    <template #message>
                        <NBanner class="brand" icon="mdi-gift">
                            <strong>Special Offer:</strong> Sign up today for a 20% discount!
                        </NBanner>
                    </template>

                    <NInputText label="Email" placeholder="you@example.com" />
                    <div class="flex justify-end pt-4">
                        <NButton type="submit" class="brand" label="Sign Up" />
                    </div>
                </NForm>
            </div>
        `
    })
}

export const Accessibility: Story = {
    args: {
        'aria-labelledby': 'form-title'
    },

    render: args => ({
        components: { NForm, NButton, NInputText },
        setup() {
            return { args }
        },
        template: `
            <div class="w-96">
                <h2 id="form-title" class="text-xl font-bold mb-4">Registration Form</h2>
                <NForm v-bind="args">
                    <NInputText label="Full Name" placeholder="Jane Doe" />
                    <NInputText label="Email" type="email" placeholder="jane@example.com" />
                    <div class="flex justify-end pt-4">
                        <NButton type="submit" class="brand" label="Register" />
                    </div>
                </NForm>
            </div>
        `
    })
}
