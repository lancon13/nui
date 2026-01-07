import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NIcon from './NIcon.vue'
import NButton from './NButton.vue'
import NCard from './NCard.vue'
import NTooltip from './NTooltip.vue'
import NInputText from './NInputText.vue'

const meta = {
    title: 'UI/NCard',
    component: NCard,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
        name: { control: 'text' },
        loading: { control: 'boolean' },
        loadingName: { control: 'text' },
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
        components: { NCard },
        setup() {
            return { args }
        },
        template: '<NCard v-bind="args" class="w-96">This is a card</NCard>'
    })
}

export const HeadBodyFoot: Story = {
    args: {},
    render: args => ({
        components: { NCard },
        setup() {
            return { args }
        },
        template: `
            <NCard v-bind="args" class="w-96">
                <div class="n-card-header">Header</div>
                <div class="n-card-body">Body</div>
                <div class="n-card-footer">Footer</div>
            </NCard>
        `
    })
}

export const Complex1: Story = {
    args: {},
    render: args => ({
        components: { NCard, NButton, NIcon, NTooltip },
        setup() {
            return { args }
        },
        template: `
            <NCard v-bind="args" class="w-96">
                <div class="n-card-header">
                    <h1 class="title-text text-xl">Sim City</h1>
                    <span class="n-space" />
                    <NButton icon="close" class="pilled icon text-xs">
                        <NTooltip>Close card</NTooltip>
                    </NButton>
                </div>

                <div class="n-card-body">
                    <p>The :has() pseudo-class allows selecting an element based on whether it contains or is followed by specific elements. This offers more flexibility than the sibling combinator alone.</p>
                </div>
                
                <div class="n-card-footer justify-end pt-8">
                    <NButton label="Cancel" class="outlined" />
                    <NButton label="Save" />
                </div>
            </NCard>
        `
    })
}

export const Complex2: Story = {
    args: {},
    render: args => ({
        components: { NCard, NButton, NIcon, NTooltip },
        setup() {
            return { args }
        },
        template: `
            <NCard v-bind="args" class="w-96 shadowed">
                <div class="n-card-header p-0">
                    <div class="w-full h-64 bg-brand text-text-invert content-col items-center justify-center">Image</div>
                </div>

                <div class="n-card-header">
                    <h1 class="title-text text-xl">Hello world</h1>
                </div>
                <div class="n-card-body">
                    <p>The :has() pseudo-class allows selecting an element based on whether it contains or is followed by specific elements. This offers more flexibility than the sibling combinator alone.</p>
                </div>
                
                <div class="n-card-footer justify-end pt-8">
                    <NButton label="More info" class="texted brand" />
                    <NButton label="Close" class="brand" >
                        <NTooltip>Close this card</NTooltip>
                    </NButton>
                </div>
            </NCard>
        `
    })
}

export const Nested: Story = {
    args: {},
    render: args => ({
        components: { NCard },
        setup() {
            return { args }
        },
        template: `
            <NCard v-bind="args" class="w-96">
                <div class="n-card-header">List of items</div>
                <div class="n-card-body content-col">
                    <NCard v-for="(item, index) in ['Item 1', 'Item 2', 'Item 3']" :key="index">
                        <span v-if="index !== 2">{{item}}</span>
                        <div v-else class="n-card-body content-col">
                            <NCard v-for="(item, index) in ['Item 1', 'Item 2', 'Item 3']" :key="index">
                                <span>{{ item }}</span>
                            </NCard>
                        </div>
                    </NCard>
                </div>                
            </NCard>
        `
    })
}

export const Clickable: Story = {
    args: {},
    render: args => ({
        components: { NCard },
        setup() {
            function handleClick() {
                console.log('Click')
            }
            return { args, handleClick }
        },
        template: '<NCard v-bind="args" class="w-96" href="#" @click="handleClick">I am a clickable card</NCard>'
    })
}

export const Disabled: Story = {
    args: {},
    render: args => ({
        components: { NCard },
        setup() {
            function handleClick() {
                console.log('Click')
            }
            return { args, handleClick }
        },
        template: '<NCard v-bind="args" class="w-96" href="#" disabled @click="handleClick">I am a clickable card</NCard>'
    })
}

export const Loading: Story = {
    args: {
        loadingClass: 'text-5xl text-brand animate-spin'
    },
    render: args => ({
        components: { NCard, NButton },
        setup() {
            const loading = ref(true)
            const toggleLoading = () => {
                loading.value = !loading.value
            }
            return { args, loading, toggleLoading }
        },
        template: `
            <div class="flex flex-col items-center gap-4">
                <NCard v-bind="args" class="w-96 h-64" :loading="loading">
                    <div class="n-card-header">Header</div>
                    <div class="n-card-body">Body</div>
                    <div class="n-card-footer">Footer</div>
                </NCard>
                <NButton label="Toggle Loading" @click="toggleLoading" />
            </div>
        `
    })
}

export const InteractiveWithInput: Story = {
    args: {},
    render: args => ({
        components: { NCard, NInputText },
        setup() {
            const text = ref('')
            return { args, text }
        },
        template: `
            <NCard v-bind="args" class="w-96" @click="() => {}">
                <div class="n-card-body content-col">
                    <p class="mb-4 text-sm opacity-60">This card is clickable. Typing "space" in the input below should work correctly.</p>
                    <NInputText v-model="text" label="Test Input" placeholder="Try typing spaces..." />
                    <div class="mt-2 text-xs font-mono bg-surface-indent p-2 rounded">Value: "{{ text }}"</div>
                </div>
            </NCard>
        `
    })
}

export const Bordered: Story = {
    args: {},
    render: args => ({
        components: { NCard },
        setup() {
            return { args }
        },
        template: '<NCard v-bind="args" class="w-96 h-32 border border-border" >This is a card that has border</NCard>'
    })
}