import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { vTooltip } from './tooltip'

const meta = {
    title: 'Directives/vTooltip',
    decorators: [
        () => ({
            template: `
            <div class="p-16 flex justify-center items-center h-full">
                <story />
            </div>
            `
        })
    ]
} satisfies Meta

export default meta

export const AllDirections: StoryObj = {
    render: () => ({
        directives: {
            tooltip: vTooltip
        },
        template: `
            <div class="flex flex-wrap gap-4">
                <div class="border rounded p-2 w-32 h-16 flex justify-center items-center" v-tooltip.top="'This is a tooltip on top'">
                Top
                </div>
                <div class="border rounded p-2 w-32 h-16 flex justify-center items-center" v-tooltip.bottom="'This is a tooltip on bottom'">
                Bottom
                </div>
                <div class="border rounded p-2 w-32 h-16 flex justify-center items-center" v-tooltip.left="'This is a tooltip on left'">
                Left
                </div>
                <div class="border rounded p-2 w-32 h-16 flex justify-center items-center" v-tooltip.right="'This is a tooltip on right'">
                Right
                </div>
                <div class="border rounded p-2 w-32 h-16 flex justify-center items-center" v-tooltip.top="'HTML <b>content</b> is also supported'">
                HTML content
                </div>
                <div class="border rounded p-2 w-32 h-16 flex justify-center items-center" v-tooltip="'Default direction (top)'">
                Default
                </div>
      </div>
    `
    })
}
