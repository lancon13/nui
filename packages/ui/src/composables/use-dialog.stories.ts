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
                const d = await create({
                    title: 'System Message',
                    content: 'This is a default dialog used for general information.',
                    actions: [{ label: 'Ok', class: ' flex-1 justify-center' }],
                    closeButton: true,
                    cardClass: 'w-96 shadowed',
                    cardHeaderClass: 'justify-between'
                })
                await d.show()
            }

            const showLoading = async () => {
                const d = await create({
                    title: 'Processing Data',
                    content: 'Please wait while we synchronize your profile.',
                    loading: true,
                    loadingName: 'loading',
                    loadingClass: 'text-3xl animate-spin',
                    cardClass: 'w-96 shadowed'
                })
                const { hide } = await d.show()
                setTimeout(hide, 3000)
            }

            const showWithActions = async () => {
                const d = await create({
                    title: 'Unsaved Changes',
                    content: 'You have unsaved changes. Do you want to save before leaving?',
                    cardClass: 'w-[450px] shadowed',
                    actions: [
                        {
                            label: 'Discard',
                            class: 'error texted',
                            onClick: ({ hide }) => {
                                hide()
                            }
                        },
                        {
                            label: 'Cancel',
                            class: 'flat',
                            onClick: ({ hide }) => {
                                hide()
                            }
                        },
                        {
                            label: 'Save & Exit',
                            class: '',
                            onClick: ({ hide }) => {
                                hide()
                            }
                        }
                    ]
                })
                await d.show()
            }

            return { showDefault, showLoading, showWithActions }
        },
        template: `
            <div class="flex flex-col gap-4 w-[400px]">
                <NButton @click="showDefault" class="justify-center ">Basic Dialog</NButton>
                <NButton @click="showLoading" class="justify-center outlined ">Loading Dialog</NButton>
                <NButton @click="showWithActions" class="justify-center flat ">Complex Actions</NButton>
            </div>
        `
    })
}

export const CustomRole: Story = {
    render: () => ({
        components: { NButton },
        setup() {
            const { create } = useDialog()

            const showAlertDialog = async () => {
                const d = await create({
                    title: 'Security Warning',
                    content: 'Your session is about to expire.',
                    role: 'alertdialog',
                    actions: [{ label: 'Renew Session', class: ' w-full' }],
                    cardClass: 'shadowed w-80'
                })
                await d.show()
            }

            return { showAlertDialog }
        },
        template: `
            <NButton @click="showAlertDialog" class="error">Show as alertdialog</NButton>
        `
    })
}

export const Helpers: Story = {
    render: () => ({
        components: { NButton },
        setup() {
            const { alert, confirm, prompt } = useDialog()
            const confirmResult = ref<'ok' | 'cancel' | null>(null)
            const promptResult = ref<string | null>(null)

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

            return { showAlert, showConfirm, confirmResult, showPrompt, promptResult }
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
            </div>
        `
    })
}
