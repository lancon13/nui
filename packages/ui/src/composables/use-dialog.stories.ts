/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { useDialog } from '.'
import NButton from '../components/NButton.vue'

const meta = {
    title: 'Composables/useDialog',
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
            const { create } = useDialog()

            const showDefault = async () => {
                const dialog = await create({
                    title: 'Default dialog',
                    content: 'This is a default dialog!',
                    actions: [
                        {
                            label: 'Ok',
                            class: 'flat'
                        }
                    ]
                })
                await dialog.show()
            }

            const showLoading = async () => {
                const dialog = await create({
                    title: 'Loading...',
                    content: 'This dialog will close in 3 seconds.',
                    loading: true
                })
                const { hide } = await dialog.show()
                setTimeout(hide, 3000)
            }

            const showWithActions = async () => {
                const dialog = await create({
                    title: 'Dialog with actions',
                    content: 'Click a button to close this dialog.',
                    actions: [
                        {
                            label: 'Custom Action',
                            class: 'outlined',
                            onClick: ({ hide }) => {
                                console.log('Custom action clicked!')
                                hide()
                            }
                        },
                        {
                            label: 'Dismiss',
                            onClick: ({ hide }) => {
                                console.log('Dismiss clicked!')
                                hide()
                            }
                        }
                    ]
                })
                await dialog.show()
            }

            return { showDefault, showLoading, showWithActions }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NButton @click="showDefault" class="justify-center">Show default dialog</NButton>
                <NButton @click="showLoading" class="justify-center">Show loading dialog (3s)</NButton>
                <NButton @click="showWithActions" class="justify-center">Show dialog with actions</NButton>
            </div>
        `
    })
}

export const CustomLoading: Story = {
    render: () => ({
        components: { NButton },
        setup() {
            const { create } = useDialog()

            const showCustomLoading = async () => {
                const dialog = await create({
                    title: 'Custom Loading...',
                    loading: true,
                    loadingClass: 'text-5xl text-primary'
                })
                const { hide } = await dialog.show()
                setTimeout(hide, 3000)
            }

            return { showCustomLoading }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NButton @click="showCustomLoading" class="justify-center">Show custom loading dialog (3s)</NButton>
            </div>
        `
    })
}

export const Helpers: Story = {
    render: () => ({
        components: { NButton },
        setup() {
            const { alert, confirm, prompt, loading } = useDialog()
            const confirmResult = ref<'ok' | 'cancel' | null>(null)
            const promptResult = ref<string | null>(null)
            let currentLoadingDialog: { hide: () => void } | null = null

            const showAlert = async () => {
                await alert('Alert', 'This is an alert message.')
                console.log('Alert was closed.')
            }

            const showConfirm = async () => {
                confirmResult.value = null
                const result = await confirm('Confirm', 'Are you sure you want to proceed?')
                confirmResult.value = result
            }

            const showPrompt = async () => {
                promptResult.value = null
                const result = await prompt('User Input', 'Please enter your name:', 'John Doe')
                promptResult.value = result
            }

            const showLoading = async () => {
                if (currentLoadingDialog) return // Prevent multiple loading dialogs
                currentLoadingDialog = await loading('Please wait while we process your request...');
                // Simulate some async operation
                setTimeout(() => {
                    currentLoadingDialog?.hide();
                    currentLoadingDialog = null;
                }, 3000);
            }

            return { showAlert, showConfirm, confirmResult, showPrompt, promptResult, showLoading }
        },
        template: `
            <div class="flex flex-col gap-4 items-center">
                <NButton @click="showAlert" class="justify-center">Show Alert</NButton>
                <NButton @click="showConfirm" class="justify-center">Show Confirm</NButton>
                <div v-if="confirmResult !== null" class="mt-4">
                    Confirm result: {{ confirmResult }}
                </div>

                <NButton @click="showPrompt" class="justify-center">Show Prompt</NButton>
                <div v-if="promptResult !== null" class="mt-4">
                    Prompt result: {{ promptResult }}
                </div>

                <NButton @click="showLoading" class="justify-center">Show Loading</NButton>
            </div>
        `
    })
}
