import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
// import { fn } from '@storybook/test'
import NTabs from './NTabs.vue'
import NTab from './NTab.vue'
import NButton from './NButton.vue'

const meta = {
    title: 'UI/NTabs',
    component: NTabs,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
        name: { control: 'text' },
        loadingType: { control: 'select', options: ['normal'] },
        loadingClass: { control: 'text' }
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
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <NTabs v-bind="args" model-value="item-2">
                <!-- This is the default slot contains the tab nodes -->
                <NTab name="item-1">Item 1</NTab>
                <NTab name="item-2">Item 2</NTab>
                <NTab name="item-3">Item 3</NTab>
            </NTabs>
        `
    })
}

export const Spaced: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NTabs v-bind="args" model-value="item-2" class="">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class="separator">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                 <NTabs v-bind="args" model-value="item-2" class="gap-2 individual">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>
            </div>
        `
    })
}

export const Multiple: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 p-4">
                <NTabs v-bind="args" :model-value="['item-2', 'item-3']" multiple class="">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" :model-value="['item-2', 'item-3']" multiple class="gap-2 individual">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>
            </div>
        `
    })
}

export const Loading: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab, NButton },
        setup() {
            const loading = ref(true)
            const toggleLoading = () => {
                loading.value = !loading.value
            }
            return { args, loading, toggleLoading }
        },
        template: `
            <div class="flex flex-col items-center">
                <NTabs v-bind="args" model-value="item-2">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1" :loading="loading">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3" :loading="loading" loadingClass="text-xl">Item 3</NTab>
                    <NTab name="item-4" :loading="loading" loadingClass="text-warning">Item 4</NTab>
                </NTabs>
                <NButton @click="toggleLoading" label="Toggle loading" class="mt-4" />
            </div>
        `
    })
}

export const Normal: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NTabs v-bind="args" model-value="item-2" class="">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" primary">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" success">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" error">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" info">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" warning">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

            </div>
        `
    })
}

export const Flat: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NTabs v-bind="args" model-value="item-2" class=" flat">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" flat primary">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" flat success">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" flat error">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" flat info">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" flat warning">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

            </div>
        `
    })
}

export const Outlined: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 p-4">
                <NTabs v-bind="args" model-value="item-2" class=" outlined">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" outlined primary">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" outlined success">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" outlined error">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" outlined info">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" outlined warning">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

            </div>
        `
    })
}

export const Texted: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 p-4">
                <NTabs v-bind="args" model-value="item-2" class=" texted">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" texted primary">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" texted success">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" texted error">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" texted info">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class=" texted warning">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

            </div>
        `
    })
}

export const Shadowed: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 p-4">
                <NTabs v-bind="args" model-value="item-2" class="shadowed">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class="shadowed flat">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class="shadowed outlined">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                <NTabs v-bind="args" model-value="item-2" class="shadowed texted">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1">Item 1</NTab>
                    <NTab name="item-2">Item 2</NTab>
                    <NTab name="item-3">Item 3</NTab>
                </NTabs>

                

            </div>
        `
    })
}

export const Disabled: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 p-4">
                <div class="p-2 bg-surface flex flex-col gap-2">
                    <NTabs v-bind="args" model-value="item-2" class="">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>

                    <NTabs v-bind="args" model-value="item-2" class="primary">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>
                </div>

                <div class="p-2 bg-surface flex flex-col gap-2">
                    <NTabs v-bind="args" model-value="item-2" class="flat">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>

                    <NTabs v-bind="args" model-value="item-2" class="flat primary">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>
                </div>


                <div class="p-2 bg-surface flex flex-col gap-2">
                    <NTabs v-bind="args" model-value="item-2" class="outlined">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>

                    <NTabs v-bind="args" model-value="item-2" class="outlined primary">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>
                </div>

                <div class="p-2 bg-surface flex flex-col gap-2">
                    <NTabs v-bind="args" model-value="item-2" class="texted">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>

                    <NTabs v-bind="args" model-value="item-2" class="texted primary">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>
                </div>


                <div class="p-2 bg-surface flex flex-col gap-2">
                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>

                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line primary">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>
                </div>

                <div class="p-2 bg-surface flex flex-col gap-2">
                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line flat">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>

                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line flat primary">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>
                </div>

                <div class="p-2 bg-surface flex flex-col gap-2">
                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line texted">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>

                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line texted primary">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" disabled>Item 1</NTab>
                        <NTab name="item-2" disabled>Item 2</NTab>
                        <NTab name="item-3" disabled>Item 3</NTab>
                    </NTabs>
                </div>

            </div>
        `
    })
}

export const ActiveBottomLine: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4 p-4">
                <div class="p-2 bg-surface flex flex-col gap-2">
                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" >Item 1</NTab>
                        <NTab name="item-2" >Item 2</NTab>
                        <NTab name="item-3" >Item 3</NTab>
                    </NTabs>
                
                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line primary">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" >Item 1</NTab>
                        <NTab name="item-2" >Item 2</NTab>
                        <NTab name="item-3" >Item 3</NTab>
                    </NTabs>
                </div>

                <div class="p-2 bg-surface flex flex-col gap-2">
                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line flat ">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" >Item 1</NTab>
                        <NTab name="item-2" >Item 2</NTab>
                        <NTab name="item-3" >Item 3</NTab>
                    </NTabs>
                
                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line flat primary">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" >Item 1</NTab>
                        <NTab name="item-2" >Item 2</NTab>
                        <NTab name="item-3" >Item 3</NTab>
                    </NTabs>
                </div>

                <div class="p-2 bg-surface flex flex-col text-center gap-2">
                    <div>No outlined</div>
                </div>

                <div class="p-2 bg-surface flex flex-col gap-2">
                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line texted ">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" >Item 1</NTab>
                        <NTab name="item-2" >Item 2</NTab>
                        <NTab name="item-3" >Item 3</NTab>
                    </NTabs>
                
                    <NTabs v-bind="args" model-value="item-2" class="active-bottom-line texted primary">
                        <!-- This is the default slot contains the tab nodes -->
                        <NTab name="item-1" >Item 1</NTab>
                        <NTab name="item-2" >Item 2</NTab>
                        <NTab name="item-3" >Item 3</NTab>
                    </NTabs>
                </div>

            </div>
        `
    })
}

export const Icons: Story = {
    args: {},
    render: args => ({
        components: { NTabs, NTab },
        setup() {
            return { args }
        },
        template: `
            <div class="flex flex-col gap-4">
                <NTabs v-bind="args" model-value="item-2" class="">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1" icon="account">Item 1</NTab>
                    <NTab name="item-2" icon="account">Item 2</NTab>
                    <NTab name="item-3" icon="account">Item 3</NTab>
                </NTabs>
                
                <NTabs v-bind="args" model-value="item-2" class="">
                    <!-- This is the default slot contains the tab nodes -->
                    <NTab name="item-1" append-icon="account">Item 1</NTab>
                    <NTab name="item-2" append-icon="account">Item 2</NTab>
                    <NTab name="item-3" append-icon="account">Item 3</NTab>
                </NTabs>      

            </div>
        `
    })
}
