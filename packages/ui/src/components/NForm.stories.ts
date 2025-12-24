import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NForm from './NForm.vue'
import NButton from './NButton.vue'
import NInputText from './NInputText.vue'
import NCheckbox from './NCheckbox.vue'
import NBanner from './NBanner.vue'

const meta = {
    title: 'UI/NForm',
    component: NForm,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        tag: { control: 'text' },
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
                    <div class="flex justify-end">
                        <NButton type="submit" class="primary">Login</NButton>
                    </div>
                </NForm>
            </div>
        `
    })
}

export const MessageInfo: Story = {
    args: {},
    render: args => ({
        components: { NForm, NButton, NInputText, NCheckbox },
        setup() {
            return { args }
        },
        template: `
            <div class="w-96">
                <NForm v-bind="args" message="Please fill in the form below." status="info">
                    <NInputText label="Username" placeholder="Enter your username" />
                    <NInputText label="Password" type="password" placeholder="Enter your password" />
                    <div class="flex justify-end">
                        <NButton type="submit" class="primary">Login</NButton>
                    </div>
                </NForm>
            </div>
        `
    })
}

export const MessageSuccess: Story = {
    args: {},
    render: args => ({
        components: { NForm, NButton, NInputText, NCheckbox },
        setup() {
            return { args }
        },
        template: `
            <div class="w-96">
                <NForm v-bind="args" message="Login successful! Redirecting..." status="success">
                    <NInputText label="Username" placeholder="Enter your username" model-value="correct_user" />
                    <NInputText label="Password" type="password" placeholder="Enter your password" model-value="********" />
                    <div class="flex justify-end">
                        <NButton type="submit" class="primary">Login</NButton>
                    </div>
                </NForm>
            </div>
        `
    })
}

export const MessageWarning: Story = {
    args: {},
    render: args => ({
        components: { NForm, NButton, NInputText, NCheckbox },
        setup() {
            return { args }
        },
        template: `
            <div class="w-96">
                <NForm v-bind="args" message="Your password will expire in 3 days." status="warning">
                    <NInputText label="Username" placeholder="Enter your username" />
                    <NInputText label="Password" type="password" placeholder="Enter your password" />
                    <div class="flex justify-end">
                        <NButton type="submit" class="primary">Login</NButton>
                    </div>
                </NForm>
            </div>
        `
    })
}

export const MessageError: Story = {
    args: {},
    render: args => ({
        components: { NForm, NButton, NInputText, NCheckbox },
        setup() {
            return { args }
        },
        template: `
            <div class="w-96">
                <NForm v-bind="args" message="Invalid username or password." status="error">
                    <NInputText label="Username" placeholder="Enter your username" model-value="wrong_user" />
                    <NInputText label="Password" type="password" placeholder="Enter your password" />
                    <div class="flex justify-end">
                        <NButton type="submit" class="primary">Login</NButton>
                    </div>
                </NForm>
            </div>
        `
    })
}

export const SlotMessage: Story = {
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
                        <NBanner class="error" icon="alert-circle">
                            <strong>Error:</strong> Something went terribly wrong.
                        </NBanner>
                    </template>
                    <NInputText label="Username" placeholder="Enter your username" />
                    <NInputText label="Password" type="password" placeholder="Enter your password" />
                    <div class="flex justify-end">
                        <NButton type="submit" class="primary">Login</NButton>
                    </div>
                </NForm>
            </div>
        `
    })
}

export const CustomMessage: Story = {
    args: {},
    render: args => ({
        components: { NForm, NButton, NInputText },
        setup() {
            return { args }
        },
        template: `
            <div class="w-96">
                <NForm v-bind="args">
                    <template #message>
                        <div class="p-4 bg-primary/10 text-primary rounded text-sm border border-primary/20">
                            This is a completely custom message area not using NBanner.
                        </div>
                    </template>
                    <NInputText label="Email" placeholder="Enter your email" />
                    <div class="flex justify-end">
                        <NButton type="submit" class="primary">Subscribe</NButton>
                    </div>
                </NForm>
            </div>
        `
    })
}
