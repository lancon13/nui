/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { useModal } from '.'
import NButton from '../components/NButton.vue'

const meta = {
    title: 'Composables/useModal',
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => ({
        components: { NButton },
        setup() {
            const { create, loading } = useModal()

            const showDefault = async () => {
                const modal = await create({
                    content: 'This is a simple modal!',
                    class: 'p-4 bg-surface rounded-element'
                })
                await modal.show()
            }

            const showLoading = async () => {
                const modal = await loading('normal', 'Loading, please wait...', {
                    titleClass: 'font-bold',
                    loadingClass: 'text-5xl text-primary'
                })
                setTimeout(modal.hide, 3000)
            }

            return { showDefault, showLoading }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NButton @click="showDefault" class="justify-center">Show default modal</NButton>
                <NButton @click="showLoading" class="justify-center">Show loading modal (3s)</NButton>
            </div>
        `
    })
}
