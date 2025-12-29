import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, useTemplateRef } from 'vue'
import NButton from './NButton.vue'
import NCard from './NCard.vue'
import NIcon from './NIcon.vue'
import NModal from './NModal.vue'
import NTooltip from './NTooltip.vue'
import NLoading from './NLoading.vue'

const meta = {
    title: 'UI/NModal',
    component: NModal,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        direction: { control: 'select', options: ['center', 'top', 'bottom', 'left', 'right'] },
        overlay: { control: 'boolean' },
        persist: { control: 'boolean' },
        role: { control: 'text' }
    }
} satisfies Meta<typeof NModal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NModal, NButton, NCard },
        setup() {
            const showModal = ref(false)
            return { args, showModal }
        },
        template: `
            <div>
                <NButton @click="showModal = true" class="brand">Show Default Modal</NButton>
                <NModal v-bind="args" v-model="showModal">
                    <NCard class="shadowed w-96">
                        <div class="p-6 flex flex-col items-center gap-4 text-center">
                            <div class="text-xl font-bold">Default Modal</div>
                            <p class="text-text-light text-sm">This is a standard modal dialog centered on the screen. It is accessible and supports stacking.</p>
                            <NButton class="brand w-full justify-center" @click="showModal = false">Close Modal</NButton>
                        </div>
                    </NCard>
                </NModal>
            </div>
        `
    })
}

export const Direction: Story = {
    render: args => ({
        components: { NModal, NButton, NCard },
        setup() {
            const activeDir = ref<any>('center')
            const show = ref(false)
            const open = (dir: string) => {
                activeDir.value = dir
                show.value = true
            }
            return { args, show, activeDir, open }
        },
        template: `
            <div class="flex flex-wrap items-center gap-4">
                <NButton v-for="dir in ['center', 'top', 'bottom', 'left', 'right']" :key="dir" @click="open(dir)" class="capitalize outlined brand">
                    {{ dir }}
                </NButton>

                <NModal v-model="show" :direction="activeDir">
                    <NCard :class="['shadowed', activeDir === 'top' || activeDir === 'bottom' ? 'w-full h-48' : activeDir === 'center' ? 'w-96' : 'h-full w-64']">
                        <div class="p-6 flex flex-col gap-4 h-full">
                            <div class="text-xl font-bold capitalize">{{ activeDir }} Modal</div>
                            <p class="text-text-light text-sm">Modals can slide in from any edge of the screen, acting as drawers or full-width banners.</p>
                            <NButton class="brand mt-auto w-full justify-center" @click="show = false" label="Close" />
                        </div>
                    </NCard>
                </NModal>
            </div>
        `
    })
}

export const NoOverlay: Story = {
    args: {
        overlay: false
    },
    render: args => ({
        components: { NModal, NButton, NCard },
        setup() {
            const showModal = ref(false)
            return { args, showModal }
        },
        template: `
            <div>
                <NButton @click="showModal = true">Show Without Overlay</NButton>
                <NModal v-bind="args" v-model="showModal">
                    <NCard class="shadowed w-96 border border-border">
                        <div class="p-6 flex flex-col gap-4 text-center">
                            <div class="text-lg font-bold text-brand">No Overlay</div>
                            <p>This modal doesn't dim the background. You can still see the page content clearly.</p>
                            <NButton class="brand" @click="showModal = false">Close</NButton>
                        </div>
                    </NCard>
                </NModal>
            </div>
        `
    })
}

export const ComplexDialog: Story = {
    args: {},
    render: args => ({
        components: { NModal, NButton, NCard, NIcon, NTooltip },
        setup() {
            const showModal = ref(false)
            return { args, showModal }
        },
        template: `
            <div class="flex flex-col items-center gap-4">
                <NButton @click="showModal = true" icon="mdi-account" class="brand">User Profile</NButton>
                
                <NModal v-bind="args" v-model="showModal">
                     <NCard class="w-[400px] shadowed">
                        <div class="n-card-header p-0 relative">
                            <div class="w-full h-48 bg-brand text-text-invert flex items-center justify-center text-4xl">
                                <NIcon name="mdi-account-circle" />
                            </div>
                            <NButton icon="mdi-close" class="icon absolute right-2 top-2 pilled flat brand" @click="showModal = false" />
                        </div>

                        <div class="n-card-header">
                            <h1 class="text-2xl font-bold">John Doe</h1>
                        </div>
                        <div class="n-card-body">
                            <p class="text-text/70">Software Engineer at NUI Corp. passionate about accessible UI components and modern web technologies.</p>
                        </div>
                        
                        <div class="n-card-footer justify-end gap-2 border-t border-border mt-4">
                            <NButton label="Settings" class="texted brand" />
                            <NButton label="Save Changes" class="brand" @click="showModal = false" />
                        </div>
                    </NCard>
                </NModal>
            </div>
        `
    })
}

export const LoadingState: Story = {
    args: {
        persist: true
    },
    render: args => ({
        components: { NModal, NButton, NLoading },
        setup() {
            const showModal = ref(false)
            const handleButtonClick = () => {
                showModal.value = true
                setTimeout(() => {
                    showModal.value = false
                }, 2000)
            }
            return { args, showModal, handleButtonClick }
        },
        template: `
            <div>
                <NButton @click="handleButtonClick" class="outlined brand">Perform Action</NButton>
                <NModal v-bind="args" v-model="showModal" class="flex flex-col items-center justify-center gap-6 text-text-invert">
                    <NLoading class="text-6xl animate-spin" />
                    <div class="text-xl font-semibold">Processing...</div>
                </NModal>
            </div>
        `
    })
}

export const NestedDialogs: Story = {
    args: {},
    render: args => ({
        components: { NModal, NButton, NCard, NTooltip },
        setup() {
            const showFirst = ref(false)
            const showSecond = ref(false)
            return { args, showFirst, showSecond }
        },
        template: `
            <div>
                <NButton @click="showFirst = true">Open Main Modal</NButton>
                
                <NModal v-model="showFirst">
                     <NCard class="w-96 shadowed">
                        <div class="n-card-header text-lg font-bold">Main Action</div>
                        <div class="n-card-body">
                            <p>Are you sure you want to proceed with this sensitive operation?</p>
                        </div>
                        <div class="n-card-footer justify-end gap-2">
                            <NButton label="Cancel" class="texted" @click="showFirst = false" />
                            <NButton label="Proceed" class="brand" @click="showSecond = true" />
                        </div>
                    </NCard>                    
                </NModal>
                
                <NModal v-model="showSecond">
                    <NCard class="w-80 shadowed border-2 border-brand">
                        <div class="n-card-header text-brand font-bold">Final Confirmation</div>
                        <div class="n-card-body">
                            <p>This action cannot be undone. Enter your password to continue.</p>
                        </div>
                        <div class="n-card-footer">
                            <NButton label="Confirm" class="brand w-full" @click="showSecond = false; showFirst = false" />
                        </div>
                    </NCard>
                </NModal>
            </div>
        `
    })
}
