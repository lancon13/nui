<template>
    <div
        ref="containerRef"
        :class="[
            'n-image',
            props.containerClass,
            { 'n-image--block': props.width === '100%' || props.height === '100%' }
        ]"
        :style="containerStyles"
        role="img"
        :aria-label="props.alt"
    >
        <!-- Placeholder / Loading -->
        <transition name="n-image-fade">
            <div
                v-if="(isLoading || props.loading) && !hasError"
                :class="['n-image-placeholder', props.placeholderClass]"
            >
                <slot name="placeholder">
                    <n-loading overlay :name="props.loadingName" :class="props.loadingClass" />
                </slot>
            </div>
        </transition>

        <!-- Error -->
        <div v-if="hasError" :class="['n-image-error', props.errorClass]">
            <slot name="error">
                <div class="w-full h-full bg-surface flex items-center justify-center text-error p-4">
                    <n-icon name="alert-circle" class="mr-2" />
                    <span class="text-sm">Failed to load image</span>
                </div>
            </slot>
        </div>

        <!-- Image -->
        <img
            v-if="shouldLoad"
            ref="imageRef"
            :src="props.src"
            :srcset="props.srcset"
            :sizes="props.sizes"
            :alt="props.alt"
            :class="imageClasses"
            :style="imageStyles"
            :loading="props.lazy ? 'lazy' : undefined"
            v-bind="imageBind"
            @load="handleLoad"
            @error="handleError"
        />
    </div>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { useIntersectionObserver } from '@vueuse/core'
    import { computed, ref, useAttrs, useTemplateRef, type HTMLAttributes } from 'vue'
    import { cn } from '../helpers/classes'
    import NIcon from './NIcon.vue'
    import NLoading from './NLoading.vue'

    export type NImageProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        src: string
        alt?: string
        srcset?: string
        sizes?: string
        lazy?: boolean
        aspectRatio?: string
        fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
        width?: string | number
        height?: string | number
        containerClass?: string | string[] | object
        placeholderClass?: string | string[] | object
        errorClass?: string | string[] | object
        threshold?: number
        loading?: boolean
        loadingName?: string
        loadingClass?: string | string[] | object
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NImageProps>(), {
        alt: '',
        lazy: false,
        fit: 'cover',
        threshold: 0.1
    })

    const emits = defineEmits<{
        (e: 'load', event: Event): void
        (e: 'error', event: Event): void
    }>()

    const containerRef = useTemplateRef<HTMLElement | null>('containerRef')
    const shouldLoad = ref(!props.lazy)
    const isLoading = ref(true)
    const hasError = ref(false)

    // Handle Lazy Loading
    if (props.lazy) {
        const { stop } = useIntersectionObserver(
            containerRef,
            ([{ isIntersecting }]) => {
                if (isIntersecting) {
                    shouldLoad.value = true
                    stop()
                }
            },
            {
                threshold: props.threshold
            }
        )
    }

    function handleLoad(e: Event) {
        isLoading.value = false
        emits('load', e)
    }

    function handleError(e: Event) {
        isLoading.value = false
        hasError.value = true
        emits('error', e)
    }

    // Styles
    const containerStyles = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const styles: any = {
            ...(props.aspectRatio ? { aspectRatio: props.aspectRatio } : {}),
            ...(props.width ? { width: typeof props.width === 'number' ? `${props.width}px` : props.width } : {}),
            ...(props.height ? { height: typeof props.height === 'number' ? `${props.height}px` : props.height } : {})
        }

        // If aspectRatio is set but no dimensions are provided, default width to 100%
        // to ensure it fills the parent and has a calculated height.
        if (props.aspectRatio && !props.width && !props.height) {
            styles.width = '100%'
        }

        return styles
    })

    const imageClasses = computed(() =>
        cn(
            'n-image-img',
            `n-image-img--fit-${props.fit}`,
            props.aspectRatio || (props.width && props.height)
                ? 'absolute inset-0 w-full h-full'
                : 'block max-w-full h-auto',
            isLoading.value || props.loading ? 'opacity-0' : 'opacity-100',
            attrs.class as any
        )
    )

    const imageBind = computed(() => {
        const { class: _, ...bind } = attrs
        return bind
    })

    const imageStyles = computed(() => ({}))
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/components-index.css';

    @layer components {
        .n-image {
            @apply relative overflow-hidden bg-surface;
            @apply inline-block align-middle;

            &.n-image--block {
                @apply block;
            }

            .n-image-placeholder,
            .n-image-error {
                @apply absolute inset-0 z-10 w-full h-full;
                /* Ensure loading overlay background matches container to hide incomplete image loading */
                @apply bg-surface;
            }

            .n-image-img {
                @apply transition-opacity duration-300 ease-in-out;

                &.n-image-img--fit-cover {
                    object-fit: cover;
                }
                &.n-image-img--fit-contain {
                    object-fit: contain;
                }
                &.n-image-img--fit-fill {
                    object-fit: fill;
                }
                &.n-image-img--fit-none {
                    object-fit: none;
                }
                &.n-image-img--fit-scale-down {
                    object-fit: scale-down;
                }
            }
        }

        /* Fade transition */
        .n-image-fade-enter-active,
        .n-image-fade-leave-active {
            @apply transition-opacity duration-300;
        }

        .n-image-fade-enter-from,
        .n-image-fade-leave-to {
            @apply opacity-0;
        }
    }
</style>
