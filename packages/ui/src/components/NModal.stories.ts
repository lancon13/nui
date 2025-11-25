import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NModal from './NModal.vue'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NModal',
    component: NModal,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
        name: { control: 'text' }
    },
    args: {
        name: 'account'
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NModal, NButton },
        setup() {
            return { args }
        },
        template: `
            <NButton>
                Show modal
                <NModal v-bind="args" >This is a modal</NModal>
            </NButton>
        `
    })
}
