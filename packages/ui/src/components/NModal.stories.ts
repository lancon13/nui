import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import { ref, useTemplateRef } from 'vue'
import NButton from './NButton.vue'
import NCard from './NCard.vue'
import NIcon from './NIcon.vue'
import NModal from './NModal.vue'
import NTooltip from './NTooltip.vue'

const meta = {
    title: 'UI/NModal',
    component: NModal,
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
        components: { NModal, NButton, NCard },
        setup() {
            const showModal = ref(false)

            function handleButtonClick() {
                showModal.value = !showModal.value
            }

            return { args, showModal, handleButtonClick }
        },
        template: `
            <NButton @click="handleButtonClick">
                Show modal
                <NModal v-bind="args" v-model="showModal" >
                    <NCard class="shadowed">
                        <div class="n-card-body flex flex-col items-center gap-4">
                            <div>This is a content</div>
                            <NButton @click="handleButtonClick">Close</NButton>
                        </div>
                    </NCard>
                </NModal>
            </NButton>
        `
    })
}

export const Simple: Story = {
    args: {},
    render: args => ({
        components: { NModal, NButton, NCard },
        setup() {
            const showModal = ref(false)

            function handleButtonClick() {
                showModal.value = !showModal.value
            }

            return { args, showModal, handleButtonClick }
        },
        template: `
            <NButton @click="handleButtonClick">
                Show modal
                <NModal v-bind="args" v-model="showModal" noOverlayHide >
                    <div class="p-5 bg-bg-invert text-text-invert">Simple content, use ESC to close</div>
                </NModal>
            </NButton>
        `
    })
}

export const NoOverlay: Story = {
    args: {},
    render: args => ({
        components: { NModal, NButton, NCard },
        setup() {
            const showModal = ref(false)

            function handleButtonClick() {
                showModal.value = !showModal.value
            }

            return { args, showModal, handleButtonClick }
        },
        template: `
            <NButton @click="handleButtonClick">
                Show modal
                <NModal v-bind="args" v-model="showModal" :overlay="false" >
                    <div class="p-5 bg-bg-invert text-text-invert shadowed rounded-element">Simple content, use ESC to close</div>
                </NModal>
            </NButton>
        `
    })
}

export const Dialog: Story = {
    args: {},
    render: args => ({
        components: { NModal, NButton, NCard, NIcon, NTooltip },
        setup() {
            const showModal = ref(false)

            function handleButtonClick() {
                showModal.value = !showModal.value
            }

            return { args, showModal, handleButtonClick }
        },
        template: `
            <NButton @click="handleButtonClick" icon="account">
                Profile
                <NTooltip>Show profile</NTooltip>
                <NModal v-bind="args" v-model="showModal" >
                     <NCard v-bind="args" class="w-96 shadowed">
                        <div class="n-card-header p-0">
                            <div class="w-full h-64 bg-primary text-text-invert content-col items-center justify-center">Image</div>
                            <NButton icon="close" class="icon absolute right-2 top-2 pilled flat"  @click="handleButtonClick">
                                <NTooltip>
                                    Close this card <a href="#">here</a>
                                        </NTooltip>
                            </NButton>
                        </div>

                        <div class="n-card-header">
                            <h1 class="title-text text-xl">Hello world</h1>
                        </div>
                        <div class="n-card-body">
                            <p>The :has() pseudo-class allows selecting an element based on whether it contains or is followed by specific elements. This offers more flexibility than the sibling combinator alone.</p>
                        </div>
                        
                        <div class="n-card-footer justify-end pt-8">
                            <NButton label="More info" class="texted primary" tabindex="1" />
                            <NButton label="Close" class="primary" @click="handleButtonClick"  >
                                <NTooltip>Close this card</NTooltip>
                            </NButton>
                        </div>
                    </NCard>
                </NModal>
            </NButton>
        `
    })
}

export const NestedDialog: Story = {
    args: {},
    render: args => ({
        components: { NModal, NButton, NCard, NIcon, NTooltip },
        setup() {
            const showModal = ref(false)
            const anotherDialogRef = useTemplateRef('anotherDialogRef')

            function handleButtonClick() {
                showModal.value = !showModal.value
            }

            return { args, showModal, handleButtonClick, anotherDialogRef }
        },
        template: `
            <NButton @click="handleButtonClick" icon="open-in-new">
                Open
                <NModal v-bind="args" v-model="showModal" >
                     <NCard v-bind="args" class="w-96 shadowed">                        
                        <div class="n-card-body">
                            <p>Please click the following button to open another dialog.</p>
                        </div>
                        
                        <div class="n-card-footer justify-end pt-8">
                            <NButton label="Open another dialog" class="flat primary" tabindex="1" @click="() => anotherDialogRef.show()" />
                            <NButton label="Close" class="primary" @click="handleButtonClick"  >
                                <NTooltip>Close this card</NTooltip>
                            </NButton>
                        </div>
                    </NCard>                    
                </NModal>
                
                
                <NModal v-bind="args" ref="anotherDialogRef">
                    <NCard v-bind="args" class="w-64 h-64 shadowed">                        
                        <div class="n-card-body">
                            <p>This is another dialog.</p>
                        </div>
                        
                        <div class="n-card-footer pt-8">
                            <NButton label="Close" class="w-full justify-center primary" @click="() => anotherDialogRef.hide()"  >                                    
                            </NButton>
                        </div>
                    </NCard>
                </NModal>
            </NButton>
        `
    })
}
