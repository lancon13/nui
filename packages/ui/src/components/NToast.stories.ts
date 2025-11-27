import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
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
        components: { NToast, NButton, NBanner },
        setup() {
            const showToast = ref(false)

            return { args, showToast }
        },
        template: `
            <NButton @click="() => showToast = true">
                Show pop message
                <NToast v-bind="args" v-model="showToast" position="top-right" >
                    <NBanner>
                        <div>This is a toast message</div>
                        <template #actions>
                            <NButton label="Close" class="outlined" @click="() => showToast = false" />
                        </template>
                    </NBanner>
                </NToast>
            </NButton>
        `
    })
}

export const Directions: Story = {
    args: {},
    render: args => ({
        components: { NToast, NButton, NBanner },
        setup() {
            const showToasts = ref({
                'top-left': false,
                'top-center': false,
                'top-right': false,
                'center-left': false,
                'center-center': false,
                'center-right': false,
                'bottom-left': false,
                'bottom-center': false,
                'bottom-right': false
            })
            return { args, showToasts }
        },
        template: `
            <div class="grid grid-cols-3 gap-4">
                <template v-for="(toggle, direction) in showToasts" :key="direction">
                    <NButton @click="() => showToasts[direction] = true" class="justify-center">
                        {{direction}}
                        <NToast v-bind="args" v-model="showToasts[direction]" :position="direction" >
                            <NBanner>
                                <div>This is a toast message</div>
                                <template #actions>
                                    <NButton label="Close" class="outlined" @click="() => showToasts[direction] = false" />
                                </template>
                            </NBanner>
                        </NToast>
                    </NButton>
                </template>
            </div>
            
        `
    })
}

export const Overlay: Story = {
    args: {},
    render: args => ({
        components: { NToast, NButton, NBanner },
        setup() {
            const showToasts = ref({
                'top-left': false,
                'top-center': false,
                'top-right': false,
                'center-left': false,
                'center-center': false,
                'center-right': false,
                'bottom-left': false,
                'bottom-center': false,
                'bottom-right': false
            })
            return { args, showToasts }
        },
        template: `
            <div class="grid grid-cols-3 gap-4">
                <template v-for="(toggle, direction) in showToasts" :key="direction">
                    <NButton @click="() => showToasts[direction] = true" class="justify-center">
                        {{direction}}
                        <NToast v-bind="args" v-model="showToasts[direction]" :position="direction" overlay>
                            <NBanner>
                                <div>This is a toast message</div>
                                <template #actions>
                                    <NButton label="Close" class="outlined" @click="() => showToasts[direction] = false" />
                                </template>
                            </NBanner>
                        </NToast>
                    </NButton>
                </template>
            </div>
            
        `
    })
}

export const Durations: Story = {
    args: {},
    render: args => ({
        components: { NToast, NButton, NBanner },
        setup() {
            const showToasts = ref({
                'top-left': false,
                'top-center': false,
                'top-right': false,
                'center-left': false,
                'center-center': false,
                'center-right': false,
                'bottom-left': false,
                'bottom-center': false,
                'bottom-right': false
            })

            return { args, showToasts }
        },
        template: `
            <div class="grid grid-cols-3 gap-4">
                <template v-for="(toggle, direction) in showToasts" :key="direction">
                    <NButton @click="() => showToasts[direction] = true" class="justify-center">
                        {{direction}}
                        <NToast v-bind="args" v-model="showToasts[direction]" :position="direction">
                            <NBanner :duration="5000" show-progress @timer-end="() => showToasts[direction] = false">
                                <div>This is a toast message</div>
                                <template #actions>
                                    <NButton label="Close" class="outlined" @click="() => showToasts[direction] = false" />
                                </template>
                            </NBanner>
                        </NToast>
                    </NButton>
                </template>
            </div>
            
        `
    })
}

export const Status: Story = {
    args: {},
    render: args => ({
        components: { NToast, NButton, NBanner },
        setup() {
            const showToasts = ref({
                normal: false,
                primary: false,
                success: false,
                error: false,
                warning: false,
                info: false
            })
            return { args, showToasts }
        },
        template: `
            <div class="grid grid-cols-3 gap-4">
                <template v-for="(toggle, status) in showToasts" :key="status">
                    <NButton @click="() => showToasts[status] = true" class="justify-center">
                        {{status}}
                        <NToast v-bind="args" v-model="showToasts[status]" position="bottom-left">
                            <NBanner :class="status" @timer-end="() => showToasts[status] = false">
                                <div>This is a toast message</div>                                
                            </NBanner>
                        </NToast>
                    </NButton>
                </template>
            </div>
            
        `
    })
}
