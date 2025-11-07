/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NuiModal from './NuiModal.vue'
import NuiCard from './NuiCard.vue'
import NuiButton from './NuiButton.vue'
import NuiInput from './NuiInput.vue'

const meta = {
    title: 'UI/NuiModal',
    component: NuiModal,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    argTypes: {
        modelValue: { control: 'boolean' },
        autoFocus: { control: 'boolean' },
        noEscHide: { control: 'boolean' },
        noClickHide: { control: 'boolean' },
        noHide: { control: 'boolean' },
        level: { control: 'number' },
        noOverlay: { control: 'boolean' }
    },
    args: {
        modelValue: false,
        autoFocus: true,
        noEscHide: false,
        noClickHide: false,
        noHide: false,
        level: 0,
        noOverlay: false
    }
} satisfies Meta<typeof NuiModal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div class="h-screen w-full p-lg">
                <NuiButton label="Open Modal" @click="show = true" />
                <NuiModal v-bind="args" v-model="show">
                    <NuiCard class="w-96">
                        <template #header>
                            <h2 class="font-bold">Modal Title</h2>
                        </template>
                        <p>This is the content of the modal. You can put anything you want here.</p>
                        <template #footer>
                            <NuiButton label="Close" @click="show = false" />
                        </template>
                    </NuiCard>
                </NuiModal>
            </div>
        `
    })
}

export const ProgrammaticControl: Story = {
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton },
        setup() {
            const modalRef = ref<any>(null)
            const lastEvent = ref('')

            const showModal = () => {
                modalRef.value?.show()
            }
            const hideModal = () => {
                modalRef.value?.hide()
            }

            const onShow = () => {
                lastEvent.value = 'show event fired!'
                console.log('show event fired!')
            }
            const onHide = () => {
                lastEvent.value = 'hide event fired!'
                console.log('hide event fired!')
            }

            return {
                args,
                modalRef,
                lastEvent,
                showModal,
                hideModal,
                onShow,
                onHide
            }
        },
        template: `
            <div class="h-screen w-full p-lg">
                <div class="flex items-center gap-md">
                    <NuiButton label="Show Modal" color="primary" @click="showModal" />
                    <NuiButton label="Hide Modal" color="error" @click="hideModal" />
                </div>
                <p class="mt-md">Last event: <code class="font-bold">{{ lastEvent || 'none' }}</code></p>

                <NuiModal
                    ref="modalRef"
                    v-bind="args"
                    @show="onShow"
                    @hide="onHide"
                >
                    <NuiCard class="w-96">
                        <template #header>
                            <h2 class="font-bold">Programmatic Modal</h2>
                        </template>
                        <p>This modal is controlled by methods and emits events.</p>
                        <template #footer>
                            <NuiButton label="Close via method" @click="hideModal" />
                        </template>
                    </NuiCard>
                </NuiModal>
            </div>
        `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates how to control the modal programmatically. Use the buttons to call the `show()` and `hide()` methods exposed by the component. The component also emits `show` and `hide` events, which are logged below.'
            }
        }
    }
}

export const NoOverlay: Story = {
    args: {
        noOverlay: true
    },
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div class="h-screen w-full p-lg bg-muted-bg relative">
                <div class="absolute inset-0 bg-[url('https://tailwindcss.com/_next/static/media/hero-dark@90.dba36cdf.jpg')] bg-cover bg-center"></div>
                <div class="relative">
                    <NuiButton label="Open No Overlay Modal" @click="show = true" />
                    <NuiModal v-bind="args" v-model="show">
                        <NuiCard class="w-96">
                            <template #header>
                                <h2 class="font-bold">No Overlay Modal</h2>
                            </template>
                            <p>This modal does not have a background overlay. You can see the content behind it.</p>
                            <template #footer>
                                <NuiButton label="Close" @click="show = false" />
                            </template>
                        </NuiCard>
                    </NuiModal>
                </div>
            </div>
        `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the `noOverlay` prop. When set to `true`, the modal appears without the dark background overlay, allowing content behind it to be visible.'
            }
        }
    }
}

export const NoHide: Story = {
    args: {
        noHide: true
    },
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div class="h-screen w-full p-lg">
                <NuiButton label="Open No Hide Modal" @click="show = true" />
                <NuiModal v-bind="args" v-model="show">
                    <NuiCard class="w-96">
                        <template #header>
                            <h2 class="font-bold">No Hide Modal</h2>
                        </template>
                        <p>You cannot close this modal by clicking the overlay or pressing Escape. You must use the button.</p>
                        <template #footer>
                            <NuiButton label="Close" @click="show = false" />
                        </template>
                    </NuiCard>
                </NuiModal>
            </div>
        `
    })
}

export const NoClickHide: Story = {
    args: {
        noClickHide: true
    },
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div class="h-screen w-full p-lg">
                <NuiButton label="Open No Click Hide Modal" @click="show = true" />
                <NuiModal v-bind="args" v-model="show">
                    <NuiCard class="w-96">
                        <template #header>
                            <h2 class="font-bold">No Click Hide Modal</h2>
                        </template>
                        <p>You cannot close this modal by clicking the overlay. You can still use the Escape key.</p>
                        <template #footer>
                            <NuiButton label="Close" @click="show = false" />
                        </template>
                    </NuiCard>
                </NuiModal>
            </div>
        `
    })
}

export const NoEscHide: Story = {
    args: {
        noEscHide: true
    },
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div class="h-screen w-full p-lg">
                <NuiButton label="Open No Esc Hide Modal" @click="show = true" />
                <NuiModal v-bind="args" v-model="show">
                    <NuiCard class="w-96">
                        <template #header>
                            <h2 class="font-bold">No Esc Hide Modal</h2>
                        </template>
                        <p>You cannot close this modal by pressing Escape. You can still click the overlay.</p>
                        <template #footer>
                            <NuiButton label="Close" @click="show = false" />
                        </template>
                    </NuiCard>
                </NuiModal>
            </div>
        `
    })
}

export const NoAutoFocus: Story = {
    args: {
        autoFocus: false
    },
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div class="h-screen w-full p-lg">
                <NuiButton label="Open No Auto Focus Modal" @click="show = true" />
                <NuiModal v-bind="args" v-model="show">
                    <NuiCard class="w-96">
                        <template #header>
                            <h2 class="font-bold">No Auto Focus Modal</h2>
                        </template>
                        <p>This modal does not automatically focus the first element.</p>
                        <template #footer>
                            <NuiButton label="Close" @click="show = false" />
                        </template>
                    </NuiCard>
                </NuiModal>
            </div>
        `
    })
}

export const AutoFocusAndFocusTrap: Story = {
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton, NuiInput },
        setup() {
            const show = ref(false)
            return { args, show }
        },
        template: `
            <div class="h-screen w-full p-lg flex flex-col items-start gap-md">
                <p>
                    Use your Tab key to navigate. Notice how focus is handled when the modal opens and closes.
                </p>
                <NuiButton label="Button Before" />
                <NuiButton label="Open Modal" @click="show = true" id="open-modal-btn" />
                <NuiButton label="Button After" />

                <NuiModal v-bind="args" v-model="show">
                    <NuiCard class="w-[30rem]">
                        <template #header>
                            <h2 class="font-bold">Focus Trap Demo</h2>
                        </template>
                        <div class="flex flex-col gap-md">
                            <p>Focus should have automatically moved to the input field below.</p>
                            <NuiInput label="First Name" placeholder="Enter your first name" />
                            <NuiInput label="Last Name" placeholder="Enter your last name" />
                            <p>Tabbing should be trapped within this modal. Pressing Escape or clicking the overlay will close it.</p>
                        </div>
                        <template #footer>
                            <NuiButton label="A Button" />
                            <NuiButton label="Close" @click="show = false" />
                        </template>
                    </NuiCard>
                </NuiModal>
            </div>
        `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the `autoFocus` and focus-trapping behavior. \n\n1.  **Initial Focus**: When you open the modal, focus is automatically moved to the first focusable element inside it (the "First Name" input). \n2.  **Focus Trapping**: Once the modal is open, pressing the `Tab` key will cycle through the focusable elements *only within the modal*. You cannot focus on the elements behind the overlay. \n3.  **Return Focus**: When you close the modal (using the "Close" button, `Escape` key, or by clicking the overlay), focus is automatically returned to the element that opened it (the "Open Modal" button). \n\nTry disabling the `autoFocus` control to see the difference.'
            }
        }
    }
}

export const MultipleModals: Story = {
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton },
        setup() {
            const showModal1 = ref(false)
            const showModal2 = ref(false)
            return { args, showModal1, showModal2 }
        },
        template: `
            <div class="h-screen w-full p-lg flex items-start gap-md">
                <NuiButton label="Open Modal 1" @click="showModal1 = true" />
                <NuiButton label="Open Modal 2" color="success" @click="showModal2 = true" />

                <!-- Modal 1 -->
                <NuiModal v-bind="args" v-model="showModal1">
                    <NuiCard class="w-96">
                        <template #header><h2 class="font-bold">Modal 1</h2></template>
                        <p>This is the first modal.</p>
                        <template #footer>
                            <NuiButton label="Close" @click="showModal1 = false" />
                        </template>
                    </NuiCard>
                </NuiModal>

                <!-- Modal 2 -->
                <NuiModal v-bind="args" v-model="showModal2">
                    <NuiCard class="w-96">
                        <template #header><h2 class="font-bold">Modal 2</h2></template>
                        <p>This is the second modal.</p>
                        <template #footer>
                            <NuiButton label="Close" color="success" @click="showModal2 = false" />
                        </template>
                    </NuiCard>
                </NuiModal>
            </div>
        `
    })
}

export const NestedModalsWithLevel: Story = {
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton },
        setup() {
            const showModal1 = ref(false)
            const showModal2 = ref(false)
            return { args, showModal1, showModal2 }
        },
        template: `
            <div class="h-screen w-full p-lg">
                <NuiButton label="Open Base Modal" @click="showModal1 = true" />

                <!-- Base Modal -->
                <NuiModal v-bind="args" v-model="showModal1" :level="0">
                    <NuiCard class="w-[32rem]">
                        <template #header><h2 class="font-bold">Base Modal (Level 0)</h2></template>
                        <p>This is the first modal. You can open another modal from here.</p>
                        <template #footer>
                            <NuiButton label="Open Nested Modal" color="primary" @click="showModal2 = true" />
                            <NuiButton label="Close" @click="showModal1 = false" />
                        </template>
                    </NuiCard>
                </NuiModal>

                <!-- Nested Modal -->
                <NuiModal v-bind="args" v-model="showModal2" :level="1">
                    <NuiCard class="w-96">
                        <template #header><h2 class="font-bold">Nested Modal (Level 1)</h2></template>
                        <p>This is the second, nested modal. It appears on top of the first one because its <strong>level</strong> is higher.</p>
                        <template #footer>
                            <NuiButton label="Close" color="primary" @click="showModal2 = false" />
                        </template>
                    </NuiCard>
                </NuiModal>
            </div>
        `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates how the `level` prop can be used to stack modals correctly. The nested modal has `level={1}` which gives it a higher `z-index` than the base modal at `level={0}`. Without the `level` prop, the stacking order would depend on the DOM order, which can be unreliable.'
            }
        }
    }
}

export const IncorrectlyStackedModals: Story = {
    render: args => ({
        components: { NuiModal, NuiCard, NuiButton },
        setup() {
            const showModal1 = ref(false)
            const showModal2 = ref(false)
            return { args, showModal1, showModal2 }
        },
        template: `
            <div class="h-screen w-full p-lg">
                <NuiButton label="Open High-Level Modal" @click="showModal1 = true" />

                <!-- High-Level Modal -->
                <NuiModal v-bind="args" v-model="showModal1" :level="1">
                    <NuiCard class="w-[32rem]">
                        <template #header><h2 class="font-bold">High-Level Modal (Level 1)</h2></template>
                        <p>This modal has a higher level. It will open a modal with a lower level.</p>
                        <template #footer>
                            <NuiButton label="Open Low-Level Modal" color="primary" @click="showModal2 = true" />
                            <NuiButton label="Close" @click="showModal1 = false" />
                        </template>
                    </NuiCard>
                </NuiModal>

                <!-- Low-Level Modal -->
                <NuiModal v-bind="args" v-model="showModal2" :level="0">
                    <NuiCard class="w-96">
                        <template #header><h2 class="font-bold">Low-Level Modal (Level 0)</h2></template>
                        <p>This modal has a lower level, so it appears behind the first modal. You may need to move the first modal to see it.</p>
                        <template #footer>
                            <NuiButton label="Close" color="primary" @click="showModal2 = false" />
                        </template>
                    </NuiCard>
                </NuiModal>
            </div>
        `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates what happens when modals are stacked incorrectly using the `level` prop. The second modal is given a lower `level` than the first, causing it to appear behind.'
            }
        }
    }
}
