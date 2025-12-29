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
                const n = await create({
                    content: 'This is a default notification!',
                    actions: [{ label: 'Ok', class: 'flat' }]
                })
                n.show()
            }

            const showWithOverlay = async () => {
                const n = await create({ content: 'Notification with overlay!', overlay: true, position: 'top-center' })
                n.show()
            }

            const showTimed = async () => {
                const n = await create({ content: 'This will disappear in 3 seconds!', duration: 3000, showProgress: true })
                n.show()
            }

            const showCustomPosition = async (position: any) => {
                const n = await create({ content: `Notification at ${position}`, position })
                n.show()
            }

            const showWithActions = async () => {
                const n = await create({
                    content: 'Do you want to dismiss this?',
                    actions: [
                        {
                            label: 'Dismiss',
                            class: 'outlined',
                            onClick: ({ hide }) => {
                                hide()
                            }
                        }
                    ]
                })
                n.show()
            }

            const showAsAlert = async () => {
                const n = await create({
                    content: 'CRITICAL ERROR: Data loss may occur.',
                    bannerClass: 'error',
                    role: 'alert',
                    persistent: true,
                    actions: [{ label: 'Retry', class: 'flat' }, { label: 'Ignore', class: 'texted' }]
                })
                n.show()
            }

            return { showDefault, showWithOverlay, showTimed, showCustomPosition, showWithActions, showAsAlert }
        },
        template: `
            <div class="flex flex-col gap-6 w-[600px]">
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-bold text-text-light uppercase tracking-wider">Basic Usage</h3>
                    <div class="flex flex-wrap gap-2">
                        <NButton @click="showDefault" class="brand flex-1 justify-center">Default</NButton>
                        <NButton @click="showWithOverlay" class="brand flex-1 justify-center">With Overlay</NButton>
                        <NButton @click="showTimed" class="brand flex-1 justify-center">Timed (3s)</NButton>
                        <NButton @click="showAsAlert" class="error flex-1 justify-center">Critical Alert</NButton>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-bold text-text-light uppercase tracking-wider">Positions</h3>
                    <div class="grid grid-cols-3 gap-2">
                        <NButton @click="showCustomPosition('top-left')" class="justify-center text-xs outlined brand">top-left</NButton>
                        <NButton @click="showCustomPosition('top-center')" class="justify-center text-xs outlined brand">top-center</NButton>
                        <NButton @click="showCustomPosition('top-right')" class="justify-center text-xs outlined brand">top-right</NButton>
                        <NButton @click="showCustomPosition('center-left')" class="justify-center text-xs outlined brand">center-left</NButton>
                        <NButton @click="showCustomPosition('center-center')" class="justify-center text-xs outlined brand">center-center</NButton>
                        <NButton @click="showCustomPosition('center-right')" class="justify-center text-xs outlined brand">center-right</NButton>
                        <NButton @click="showCustomPosition('bottom-left')" class="justify-center text-xs outlined brand">bottom-left</NButton>
                        <NButton @click="showCustomPosition('bottom-center')" class="justify-center text-xs outlined brand">bottom-center</NButton>
                        <NButton @click="showCustomPosition('bottom-right')" class="justify-center text-xs outlined brand">bottom-right</NButton>
                    </div>
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
