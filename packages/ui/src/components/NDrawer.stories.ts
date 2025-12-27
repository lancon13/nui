import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NButton from './NButton.vue'
import NCard from './NCard.vue'
import NDrawer from './NDrawer.vue'

const meta = {
    title: 'UI/NDrawer',
    component: NDrawer,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        direction: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
        overlay: { control: 'boolean' },
        noOverlayHide: { control: 'boolean' },
        noClickOutsideHide: { control: 'boolean' },
        noEscHide: { control: 'boolean' },
        persist: { control: 'boolean' },
        content: { control: 'text' },
        tag: { control: 'text' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div>
                <NButton @click="show = true" class="brand">Open Left Drawer</NButton>

                <div class="relative overflow-hidden w-[64rem] h-[32rem]">
                    <NDrawer v-model="show" v-bind="args" direction="left" overlay>
                        <NCard class="h-full w-80 shadowed border-r border-border">
                            <div class="p-6 flex flex-col gap-4">
                                <h3 class="text-xl font-bold text-brand">Navigation</h3>
                                <nav class="flex flex-col gap-2">
                                    <a href="#" class="p-2 hover:bg-brand/10 rounded">Dashboard</a>
                                    <a href="#" class="p-2 hover:bg-brand/10 rounded">Analytics</a>
                                    <a href="#" class="p-2 hover:bg-brand/10 rounded">Settings</a>
                                </nav>
                                <NButton label="Close" class="mt-auto brand texted" @click="show = false" />
                            </div>
                        </NCard>
                    </NDrawer>
                </div>
            </div>
        `
    })
}

export const Directions: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const showLeft = ref(false)
            const showRight = ref(false)
            const showTop = ref(false)
            const showBottom = ref(false)
            return { args, showLeft, showRight, showTop, showBottom }
        },
        template: `
            <div class="flex flex-wrap items-center gap-4">
                <NButton @click="showLeft = true">Left</NButton>
                <NButton @click="showRight = true">Right</NButton>
                <NButton @click="showTop = true">Top</NButton>
                <NButton @click="showBottom = true">Bottom</NButton>

                <div class="relative overflow-hidden w-[64rem] h-[32rem]">
                    <NDrawer v-model="showLeft" v-bind="args" direction="left" overlay>
                        <NCard class="h-full w-80 shadowed border-r border-border">
                            <div class="p-6 flex flex-col items-center justify-center gap-4 h-full">
                                <div class="text-2xl font-bold">Left Drawer</div>
                                <NButton class="brand" @click="showLeft = false">Close</NButton>
                            </div>
                        </NCard>
                    </NDrawer>

                    <NDrawer v-model="showRight" v-bind="args" direction="right" overlay>
                        <NCard class="h-full w-80 shadowed border-l border-border">
                            <div class="p-6 flex flex-col items-center justify-center gap-4 h-full">
                                <div class="text-2xl font-bold">Right Drawer</div>
                                <NButton class="brand" @click="showRight = false">Close</NButton>
                            </div>
                        </NCard>
                    </NDrawer>

                    <NDrawer v-model="showTop" v-bind="args" direction="top" overlay>
                        <NCard class="w-full h-64 shadowed border-b border-border">
                            <div class="p-6 flex flex-col items-center justify-center gap-4 h-full">
                                <div class="text-2xl font-bold">Top Drawer</div>
                                <NButton class="brand" @click="showTop = false">Close</NButton>
                            </div>
                        </NCard>
                    </NDrawer>

                    <NDrawer v-model="showBottom" v-bind="args" direction="bottom" overlay>
                        <NCard class="w-full h-64 shadowed border-t border-border">
                            <div class="p-6 flex flex-col items-center justify-center gap-4 h-full">
                                <div class="text-2xl font-bold">Bottom Drawer</div>
                                <NButton class="brand" @click="showBottom = false">Close</NButton>
                            </div>
                        </NCard>
                    </NDrawer>
                </div>
            </div>
        `
    })
}

export const NoOverlay: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const show = ref(false)
            const overlay = ref(false)
            return { args, show, overlay }
        },
        template: `
            <div>
                <NButton @click="show = !show" class="brand">Toggle Side Panel</NButton>

                <div class="relative overflow-hidden w-[64rem] h-[32rem]">
                    <div class="p-10">
                        <h1 class="text-2xl font-bold mb-4">Main Content Area</h1>
                        <p>The drawer opens without an overlay. Clicking outside will close it (default behavior).</p>
                    </div>
                    <NDrawer v-model="show" v-bind="args" :overlay="overlay" direction="right">
                        <NCard class="h-full w-80 shadowed border-l border-border bg-surface">
                            <div class="p-6">
                                <h3 class="text-lg font-bold mb-4">Information Panel</h3>
                                <p class="text-sm text-text/70 italic">This drawer does not have an overlay.</p>
                            </div>
                        </NCard>
                    </NDrawer>
                </div>
            </div>
        `
    })
}

export const Persistent: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const show = ref(false)
            const persist = ref(true)
            return { args, show, persist }
        },
        template: `
            <div>
                <NButton @click="show = true" class="brand">Open Persistent Drawer</NButton>

                <div class="relative overflow-hidden w-[64rem] h-[32rem]">
                    <NDrawer v-model="show" v-bind="args" :persist="persist" direction="left" overlay>
                        <NCard class="h-full w-80 shadowed border-r border-border">
                            <div class="p-6 flex flex-col gap-4 h-full">
                                <h3 class="text-xl font-bold text-brand">Persistent Drawer</h3>
                                <p>This drawer will <strong>not</strong> close when clicking the overlay, clicking outside, or pressing ESC.</p>
                                <NButton label="Close Explicitly" class="mt-auto brand" @click="show = false" />
                            </div>
                        </NCard>
                    </NDrawer>
                </div>
            </div>
        `
    })
}

export const ContentProp: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton },
        setup() {
            const show = ref(false)
            const content =
                '<div class="p-6 h-full flex flex-col items-center justify-center text-center"><h2 class="text-xl font-bold text-brand mb-2">HTML Content</h2><p>Passed via <code>content</code> prop.</p></div>'
            return { args, show, content }
        },
        template: `
            <div>
                <NButton @click="show = true" class="brand">Open content-prop Drawer</NButton>

                <div class="relative overflow-hidden w-[64rem] h-[32rem]">
                    <NDrawer v-model="show" v-bind="args" :content="content" direction="right" overlay class="bg-surface w-80 h-full border-l border-border shadow-lg" />
                </div>
            </div>
        `
    })
}

export const Nested: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const show1 = ref(false)
            const show2 = ref(false)
            return { args, show1, show2 }
        },
        template: `
            <div>
                <NButton @click="show1 = true" class="outlined brand">Open Multi-level Drawer</NButton>

                <div class="relative overflow-hidden w-[64rem] h-[32rem]">
                    <NDrawer v-model="show1" v-bind="args" direction="left" overlay>
                        <NCard class="h-full w-96 shadowed border-r border-border">
                            <div class="p-6 flex flex-col gap-4">
                                <h3 class="text-lg font-bold">Level 1</h3>
                                <NButton @click="show2 = true" class="brand">Open Level 2</NButton>
                                <NButton label="Close All" class="texted mt-auto" @click="show1 = false" />
                            </div>                        
                        </NCard>

                        <NDrawer v-model="show2" v-bind="args" direction="left" overlay>
                            <NCard class="h-full w-64 shadowed border-r border-border bg-surface-indent">
                                <div class="p-6 flex flex-col gap-4 text-center">
                                    <h3 class="text-md font-bold">Level 2</h3>
                                    <p class="text-xs text-muted">Nested deeper.</p>
                                    <NButton @click="show2 = false" class="mt-auto outlined brand text-xs">Back</NButton>
                                </div>
                            </NCard>
                        </NDrawer>
                    </NDrawer>
                </div>
            </div>
        `
    })
}
