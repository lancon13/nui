/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { useNotify } from '.'
import NButton from '../components/NButton.vue'

const meta = {
    title: 'Composables/useNotify',
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
            const { create } = useNotify()

            const showDefault = async () => {
                ;(
                    await create({
                        content: 'This is a default notification!',
                        actions: [
                            {
                                label: 'Ok',
                                class: 'flat'
                            }
                        ]
                    })
                ).show()
            }

            const showWithOverlay = async () => {
                ;(await create({ content: 'Notification with overlay!', overlay: true, position: 'top-center' })).show()
            }

            const showTimed = async () => {
                ;(
                    await create({ content: 'This will disappear in 3 seconds!', duration: 3000, showProgress: true })
                ).show()
            }

            const showCustomPosition = async (position: any) => {
                ;(await create({ content: `Notification at ${position}`, position })).show()
            }

            const showWithActions = async () => {
                ;(
                    await create({
                        content: 'Do you want to dismiss this?',
                        actions: [
                            {
                                label: 'Dismiss',
                                class: 'outlined',
                                onClick: ({ hide }) => {
                                    console.log('click')
                                    hide()
                                }
                            }
                        ]
                    })
                ).show()
            }

            return { showDefault, showWithOverlay, showTimed, showCustomPosition, showWithActions }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NButton @click="showDefault" class="justify-center">Show default notification</NButton>
                <NButton @click="showWithOverlay" class="justify-center">Show notification with overlay</NButton>
                <NButton @click="showTimed" class="justify-center">Show timed notification (3s)</NButton>
                <NButton @click="showWithActions" class="justify-center">Show notification with actions</NButton>
                <div class="grid grid-cols-3 gap-2">
                    <NButton @click="showCustomPosition('top-left')" class="justify-center">top-left</NButton>
                    <NButton @click="showCustomPosition('top-center')" class="justify-center">top-center</NButton>
                    <NButton @click="showCustomPosition('top-right')" class="justify-center">top-right</NButton>
                    <NButton @click="showCustomPosition('center-left')" class="justify-center">center-left</NButton>
                    <NButton @click="showCustomPosition('center-center')" class="justify-center">center-center</NButton>
                    <NButton @click="showCustomPosition('center-right')" class="justify-center">center-right</NButton>
                    <NButton @click="showCustomPosition('bottom-left')" class="justify-center">bottom-left</NButton>
                    <NButton @click="showCustomPosition('bottom-center')" class="justify-center">bottom-center</NButton>
                    <NButton @click="showCustomPosition('bottom-right')" class="justify-center">bottom-right</NButton>
                </div>
            </div>
        `
    })
}

export const Notify: Story = {
    render: () => ({
        components: { NButton },
        setup() {
            const { notify, success, error, warning, info } = useNotify()

            return { notify, success, error, warning, info }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NButton @click="notify('This is a default notification!')" class="justify-center">Show default notification</NButton>
                <NButton @click="success('This is a success notification!')" class="justify-center">Show success notification</NButton>
                <NButton @click="error('This is an error notification!')" class="justify-center">Show error notification</NButton>
                <NButton @click="warning('This is a warning notification!')" class="justify-center">Show warning notification</NButton>
                <NButton @click="info('This is an info notification!')" class="justify-center">Show info notification</NButton>
                <NButton @click="notify('This will disappear in 15 seconds!', {duration: 15000, showProgress: true })" class="justify-center">Show timed notification</NButton>
            </div>
        `
    })
}
