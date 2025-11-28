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
                await create({
                    showImmediate: true,
                    content: 'This is a default notification!',
                    actions: [
                        {
                            label: 'Ok',
                            class: 'flat'
                        }
                    ]
                })
            }

            const showWithOverlay = async () => {
                ;(await create({ content: 'Notification with overlay!', overlay: true, position: 'top-center' })).show()
            }

            const showTimed = async () => {
                ;(
                    await create({ content: 'This will disappear in 3 seconds!', duration: 3000, showProgress: true })
                ).show()
            }

            const showCustomPosition = (position: any) => {
                create({ content: `Notification at ${position}`, position })
            }

            const showWithActions = async () => {
                ;(
                    await create({
                        content: 'Do you want to dismiss this?',
                        actions: [
                            {
                                label: 'Submit',
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
                <NButton @click="showDefault">Show Default Notification</NButton>
                <NButton @click="showWithOverlay">Show Notification with Overlay</NButton>
                <NButton @click="showTimed">Show Timed Notification (3s)</NButton>
                <NButton @click="showWithActions">Show Notification with Actions</NButton>
                <div class="grid grid-cols-3 gap-2 w-96">
                    <NButton @click="showCustomPosition('top-left')">Top-Left</NButton>
                    <NButton @click="showCustomPosition('top-center')">Top-Center</NButton>
                    <NButton @click="showCustomPosition('top-right')">Top-Right</NButton>
                    <NButton @click="showCustomPosition('center-left')">Center-Left</NButton>
                    <NButton @click="showCustomPosition('center-center')">Center-Center</NButton>
                    <NButton @click="showCustomPosition('center-right')">Center-Right</NButton>
                    <NButton @click="showCustomPosition('bottom-left')">Bottom-Left</NButton>
                    <NButton @click="showCustomPosition('bottom-center')">Bottom-Center</NButton>
                    <NButton @click="showCustomPosition('bottom-right')">Bottom-Right</NButton>
                </div>
            </div>
        `
    })
}

// export const CustomComponent: Story = {
//     render: () => ({
//         components: { NButton, NCard },
//         setup() {
//             const { create } = useNotify()

//             const showCustomComponent = () => {
//                 create({
//                     component: NCard,
//                     componentProps: {
//                         title: 'Custom Card Notification',
//                         content: 'This notification uses an NCard component!',
//                         class: 'p-4 w-64'
//                     },
//                     content: h('div', {}, 'Additional content inside card'),
//                     position: 'bottom-right'
//                 })
//             }

//             return { showCustomComponent }
//         },
//         template: `
//             <NButton @click="showCustomComponent">Show Custom Component (NCard)</NButton>
//         `
//     })
// }
