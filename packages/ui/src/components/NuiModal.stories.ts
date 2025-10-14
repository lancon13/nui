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
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        modelValue: { control: 'boolean' },
        autoFocus: { control: 'boolean' },
        noEscHide: { control: 'boolean' },
        noClickHide: { control: 'boolean' },
        noHide: { control: 'boolean' },
    },
    args: {
        modelValue: false,
        autoFocus: true,
        noEscHide: false,
        noClickHide: false,
        noHide: false,
    },
} satisfies Meta<typeof NuiModal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: (args) => ({
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
        `,
    }),
}

export const NoHide: Story = {
    args: {
        noHide: true,
    },
    render: (args) => ({
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
        `,
    }),
}

export const NoClickHide: Story = {
    args: {
        noClickHide: true,
    },
    render: (args) => ({
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
        `,
    }),
}

export const NoEscHide: Story = {
    args: {
        noEscHide: true,
    },
    render: (args) => ({
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
        `,
    }),
}

export const NoAutoFocus: Story = {
    args: {
        autoFocus: false,
    },
    render: (args) => ({
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
        `,
    }),
}

export const AutoFocusAndFocusTrap: Story = {
    render: (args) => ({
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
        `,
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the `autoFocus` and focus-trapping behavior. \n\n1.  **Initial Focus**: When you open the modal, focus is automatically moved to the first focusable element inside it (the \"First Name\" input). \n2.  **Focus Trapping**: Once the modal is open, pressing the `Tab` key will cycle through the focusable elements *only within the modal*. You cannot focus on the elements behind the overlay. \n3.  **Return Focus**: When you close the modal (using the \"Close\" button, `Escape` key, or by clicking the overlay), focus is automatically returned to the element that opened it (the \"Open Modal\" button). \n\nTry disabling the `autoFocus` control to see the difference.'
            }
        }
    }
}
