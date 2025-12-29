import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NBanner from './NBanner.vue'
import NButton from './NButton.vue'
import NToast from './NToast.vue'

const meta = {
    title: 'UI/NToast',
    component: NToast,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            control: 'select',
            options: [
                'top-left',
                'top-center',
                'top-right',
                'center-left',
                'center-center',
                'center-right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ]
        },
        duration: { control: 'number' },
        overlay: { control: 'boolean' },
        noOverlayHide: { control: 'boolean' },
        noEscHide: { control: 'boolean' }
    }
} satisfies Meta<typeof NToast>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        position: 'top-right'
    },
    render: args => ({
        components: { NToast, NButton, NBanner },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div>
                <NButton @click="show = true" class="brand">Show Toast</NButton>
                <NToast v-bind="args" v-model="show">
                    <NBanner  icon="mdi-information">
                        Notification message
                        <template #actions>
                            <NButton label="Close" class="flat" icon="mdi-close" @click="show = false" />
                        </template>
                    </NBanner>
                </NToast>
            </div>
        `
    })
}

export const Positions: Story = {
    render: args => ({
        components: { NToast, NButton, NBanner },

        setup() {
            const positions = [
                'top-left',
                'top-center',
                'top-right',

                'center-left',
                'center-center',
                'center-right',

                'bottom-left',
                'bottom-center',
                'bottom-right'
            ]

            const activeToasts = ref<Record<string, boolean>>({})

            const open = (pos: string) => {
                activeToasts.value[pos] = true
            }

            return { args, positions, activeToasts, open }
        },

        template: `

            <div class="grid grid-cols-3 gap-4 w-[600px]">
                <NButton v-for="pos in positions" :key="pos" @click="open(pos)" class="justify-center text-xs outlined">
                    {{ pos }}
                </NButton>

                <template v-for="pos in positions" :key="'toast-' + pos">
                    <NToast v-model="activeToasts[pos]" :position="pos">
                        <NBanner class="brand" icon="mdi-map-marker">
                            Toast at {{ pos }}
                            <template #actions>
                                <NButton label="OK" class="flat" @click="activeToasts[pos] = false" />
                            </template>
                        </NBanner>
                    </NToast>
                </template>
            </div>

        `
    })
}

export const AutoHide: Story = {
    args: {
        position: 'bottom-center',
        duration: 3000
    },
    render: args => ({
        components: { NToast, NButton, NBanner },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div>
                <NButton @click="show = true" class="brand">Show Auto-hide Toast</NButton>
                <NToast v-bind="args" v-model="show">
                    <NBanner class="success" icon="mdi-check-circle" :duration="args.duration" show-progress>
                        Successfully saved! (Closes in 3s)
                    </NBanner>
                </NToast>
            </div>
        `
    })
}

export const Status: Story = {
    args: {
        position: 'bottom-right'
    },
    render: args => ({
        components: { NToast, NButton, NBanner },
        setup() {
            const statuses = ['brand', 'success', 'error', 'warning', 'info']
            const activeToasts = ref<Record<string, boolean>>({})
            const open = (status: string) => {
                activeToasts.value[status] = true
            }
            return { args, statuses, activeToasts, open }
        },
        template: `
            <div class="flex flex-wrap gap-4">
                <NButton v-for="status in statuses" :key="status" @click="open(status)" :class="status">
                    {{ status.charAt(0).toUpperCase() + status.slice(1) }}
                </NButton>

                <template v-for="status in statuses" :key="'toast-' + status">
                    <NToast v-model="activeToasts[status]" v-bind="args">
                        <NBanner :class="status" icon="mdi-circle">
                            <span class="capitalize">{{ status }}</span> notification.
                            <template #actions>
                                <NButton label="Dismiss" class="flat" @click="activeToasts[status] = false" />
                            </template>
                        </NBanner>
                    </NToast>
                </template>
            </div>
        `
    })
}
