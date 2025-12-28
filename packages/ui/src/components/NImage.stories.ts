import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NButton from './NButton.vue'
import NImage from './NImage.vue'

const meta = {
    title: 'UI/NImage',
    component: NImage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        src: { control: 'text' },
        alt: { control: 'text' },
        lazy: { control: 'boolean' },
        aspectRatio: { control: 'text' },
        fit: {
            control: 'select',
            options: ['cover', 'contain', 'fill', 'none', 'scale-down']
        },
        width: { control: 'text' },
        height: { control: 'text' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        src: 'https://picsum.photos/800/600'
    },
    render: args => ({
        components: { NImage },
        setup() {
            return { args }
        },
        template: `
            <NImage v-bind="args" src="https://picsum.photos/400/300" />
        `
    })
}

export const AspectRatio: Story = {
    args: {
        src: 'https://picsum.photos/800/600'
    },
    render: args => ({
        components: { NImage },
        setup() {
            return { args }
        },
        template: `
            <div class="grid grid-cols-3 gap-4 w-[800px]">
                <div class="flex flex-col gap-2">
                    <span class="text-sm font-bold">Square (1/1)</span>
                    <NImage v-bind="args" src="https://picsum.photos/400/400?random=1" aspect-ratio="1/1" />
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-sm font-bold">Video (16/9)</span>
                    <NImage v-bind="args" src="https://picsum.photos/600/400?random=2" aspect-ratio="16/9" />
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-sm font-bold">Portrait (3/4)</span>
                    <NImage v-bind="args" src="https://picsum.photos/300/400?random=3" aspect-ratio="3/4" />
                </div>
            </div>
        `
    })
}

export const FitModes: Story = {
    args: {
        src: 'https://picsum.photos/800/600'
    },
    render: args => ({
        components: { NImage },
        setup() {
            const fits = ['cover', 'contain', 'fill', 'none', 'scale-down']
            return { args, fits }
        },
        template: `
            <div class="flex flex-wrap gap-4 w-[400px] h-[400px]">
                <div v-for="fit in fits" :key="fit" class="flex flex-col gap-2">
                    <span class="text-sm font-bold capitalize">{{ fit }}</span>
                    <NImage 
                        src="https://picsum.photos/600/400" 
                        :fit="fit" 
                        width="300px"
                        height="300px" 
                        container-class="bg-surface-indent border border-border"
                    />
                </div>
            </div>
        `
    })
}

export const LazyLoading: Story = {
    args: {
        src: 'https://picsum.photos/800/600'
    },
    render: args => ({
        components: { NImage },
        setup() {
            return { args }
        },
        template: `
            <div class="h-[400px] overflow-y-auto border border-border p-4 w-[400px] relative">
                <p class="mb-4 text-sm">Scroll down to load the image...</p>
                <div class="h-[800px] flex items-center justify-center bg-surface-indent mb-4 text-text-light">
                    Spacer (800px height)
                </div>
                <NImage 
                    v-bind="args"
                    src="https://picsum.photos/800/600?random=lazy" 
                    lazy 
                    aspect-ratio="16/9"
                />
                 <div class="h-[400px] flex items-center justify-center bg-surface-indent mt-4 text-text-light">
                    More content
                </div>
            </div>
        `
    })
}

export const ErrorState: Story = {
    args: {
        src: 'https://picsum.photos/800/600'
    },
    render: args => ({
        components: { NImage },
        setup() {
            return { args }
        },
        template: `
            <div class="w-[300px]">
                <NImage 
                    v-bind="args"
                    src="https://localhost/image.jpg" 
                    aspect-ratio="16/9"
                />
            </div>
        `
    })
}

export const CustomPlaceholder: Story = {
    args: {
        src: 'https://picsum.photos/800/600'
    },
    render: args => ({
        components: { NImage },
        setup() {
            return { args }
        },
        template: `
            <div class="w-[300px]">
                <NImage 
                    v-bind="args"
                    src="https://picsum.photos/800/600?delay=2000" 
                    aspect-ratio="16/9"
                >
                    <template #placeholder>
                        <div class="w-full h-full flex flex-col items-center justify-center bg-brand/10 text-brand">
                             <svg class="animate-spin h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span class="text-xs font-bold uppercase tracking-wider">Loading...</span>
                        </div>
                    </template>
                </NImage>
            </div>
        `
    })
}

export const ManualLoading: Story = {
    args: {
        src: 'https://picsum.photos/800/600'
    },
    render: args => ({
        components: { NImage, NButton },
        setup() {
            const isLoading = ref(true)
            return { args, isLoading }
        },
        template: `
            <div class="flex flex-col gap-4 items-center">
                <NButton @click="isLoading = !isLoading" class="brand">
                    Toggle Manual Loading: {{ isLoading }}
                </NButton>
                <div class="w-[400px]">
                    <NImage 
                        v-bind="args"
                        :loading="isLoading"
                        loading-name="mdi-sync"
                        loading-class="text-brand text-4xl"
                        aspect-ratio="16/9"
                    />
                </div>
            </div>
        `
    })
}
