import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NButton from './NButton.vue'
import NDrawer from './NDrawer.vue'
import NCard from './NCard.vue'
import { ref } from 'vue'

const meta = {
    title: 'UI/NDrawer',
    component: NDrawer,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {}
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const showDrawer = ref(false)

            return { args, showDrawer }
        },
        template: `
            <div>
                <NButton @click="() => showDrawer = !showDrawer">Show menu</NButton>
                <NDrawer v-model="showDrawer" :overlay="true">
                    <NCard class="h-full squared shadowed w-[16rem]">Content</NCard>
                </NDrawer>
            </div>
             
        `
    })
}

export const Direction: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const showTop = ref(false)
            const showBottom = ref(false)
            const showLeft = ref(false)
            const showRight = ref(false)

            return { args, showTop, showBottom, showLeft, showRight }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton @click="() => showTop = !showTop">Top</NButton>
                <NButton @click="() => showBottom = !showBottom">Bottom</NButton>
                <NButton @click="() => showLeft = !showLeft">Left</NButton>
                <NButton @click="() => showRight = !showRight">Right</NButton>

                <NDrawer v-model="showTop" direction="top" :overlay="true">
                    <NCard class="w-full squared shadowed h-[16rem]">Top</NCard>
                </NDrawer>
                <NDrawer v-model="showBottom" direction="bottom" :overlay="true">
                    <NCard class="w-full squared shadowed h-[16rem]">Bottom</NCard>
                </NDrawer>
                <NDrawer v-model="showLeft" direction="left" :overlay="true">
                    <NCard class="h-full squared shadowed w-[16rem]">Left</NCard>
                </NDrawer>
                <NDrawer v-model="showRight" direction="right" :overlay="true">
                    <NCard class="h-full squared shadowed w-[16rem]">Right</NCard>
                </NDrawer>

            </div>
        `
    })
}

export const DirectionNoOverlay: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const showTop = ref(false)
            const showBottom = ref(false)
            const showLeft = ref(false)
            const showRight = ref(false)

            return { args, showTop, showBottom, showLeft, showRight }
        },
        template: `
            <div class="flex flex-row items-center gap-4">
                <NButton @click="() => showTop = !showTop">Top</NButton>
                <NButton @click="() => showBottom = !showBottom">Bottom</NButton>
                <NButton @click="() => showLeft = !showLeft">Left</NButton>
                <NButton @click="() => showRight = !showRight">Right</NButton>

                <NDrawer v-model="showTop" direction="top" :overlay="false">
                    <NCard class="w-full squared shadowed h-[16rem]">Top</NCard>
                </NDrawer>
                <NDrawer v-model="showBottom" direction="bottom" :overlay="false">
                    <NCard class="w-full squared shadowed h-[16rem]">Bottom</NCard>
                </NDrawer>
                <NDrawer v-model="showLeft" direction="left" :overlay="false">
                    <NCard class="h-full squared shadowed w-[16rem]">Left</NCard>
                </NDrawer>
                <NDrawer v-model="showRight" direction="right" :overlay="false">
                    <NCard class="h-full squared shadowed w-[16rem]">Right</NCard>
                </NDrawer>

            </div>
        `
    })
}

export const FocusOnShow: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const showDrawer = ref(false)

            return { args, showDrawer }
        },
        template: `
            <div>
                <NButton @click="() => showDrawer = !showDrawer">Show menu</NButton>
                <NDrawer v-model="showDrawer" :overlay="true" :focusOnShow="true">
                    <NCard class="h-full squared shadowed w-[16rem]">
                        <div class="p-4 flex flex-col items-center gap-4">
                            <p>The button below should be focused.</p>
                            <NButton>Focus Me</NButton>
                        </div>
                    </NCard>
                </NDrawer>
            </div>

        `
    })
}

export const Nested: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const showDrawer1 = ref(false)
            const showDrawer2 = ref(false)

            return { args, showDrawer1, showDrawer2 }
        },
        template: `
            <div>
                <NButton @click="() => showDrawer1 = true">Show Nested Drawers</NButton>

                <NDrawer v-model="showDrawer1" direction="left" :overlay="true">
                    <NCard class="h-full squared shadowed w-[24rem]">
                        <div class="p-4 flex flex-col items-center gap-4">
                            <h3 class="text-lg font-bold">Outer Drawer</h3>
                            <p>This is the first level drawer.</p>
                            <NButton @click="() => showDrawer2 = true">Open Inner Drawer</NButton>
                        </div>                        
                    </NCard>

                    <NDrawer v-model="showDrawer2" direction="left" :overlay="true">
                        <NCard class="h-full squared shadowed w-[16rem]">
                            <div class="p-4 flex flex-col items-center gap-4">
                                <h3 class="text-lg font-bold">Inner Drawer</h3>
                                <p>This is the second level drawer.</p>
                                <NButton @click="() => showDrawer2 = false">Close Inner Drawer</NButton>
                            </div>
                        </NCard>
                    </NDrawer>
                </NDrawer>
            </div>
        `
    })
}

export const MultiLayers: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const showDrawer1 = ref(false)
            const showDrawer2 = ref(false)

            return { args, showDrawer1, showDrawer2 }
        },
        template: `
            <div>
                <NButton @click="() => showDrawer1 = true">Show Nested Drawers</NButton>

                <NDrawer v-model="showDrawer1" direction="left" :overlay="true">
                    <NCard class="h-full squared shadowed w-[24rem]">
                        <div class="p-4 flex flex-col items-center gap-4">
                            <h3 class="text-lg font-bold">Outer Drawer</h3>
                            <p>This is the first level drawer.</p>
                            <NButton @click="() => showDrawer2 = true">Open Inner Drawer</NButton>
                        </div>                        
                    </NCard>
                </NDrawer>

                <NDrawer v-model="showDrawer2" direction="left" :overlay="true">
                    <NCard class="h-full squared shadowed w-[16rem]">
                        <div class="p-4 flex flex-col items-center gap-4">
                            <h3 class="text-lg font-bold">Inner Drawer</h3>
                            <p>This is the second level drawer.</p>
                            <NButton @click="() => showDrawer2 = false">Close Inner Drawer</NButton>
                        </div>
                    </NCard>
                </NDrawer>
            </div>
        `
    })
}

export const Container: Story = {
    args: {},
    render: args => ({
        components: { NDrawer, NButton, NCard },
        setup() {
            const showDrawer1 = ref(false)

            return { args, showDrawer1 }
        },
        template: `
            <div class="flex flex-col gap-4">                
                <NCard class="w-[24rem] h-[24rem]">
                    <div class="p-4 flex flex-col items-center gap-4">
                        <h3 class="text-lg font-bold">Outer Drawer</h3>
                        <p>This is the first level drawer.</p>
                        <NButton @click="() => showDrawer1 = true">Open Inner Drawer</NButton>
                    </div>
                    
                    <NDrawer v-model="showDrawer1" direction="left" :overlay="true" class="w-2/3">
                        <NCard class="h-full squared shadowed w-full">
                            <div class="p-4 flex flex-col items-center gap-4">
                                <h3 class="text-lg font-bold">Drawer inside container</h3>                                
                                <NButton @click="() => showDrawer1 = false">Close</NButton>
                            </div>                        
                        </NCard>
                    </NDrawer>
                </NCard>
            </div>
        `
    })
}
