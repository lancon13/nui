<template>
    <teleport v-if="isReady && props.overlay" to="#n-toasts-container">
        <transition name="n-toast-overlay">
            <div
                v-if="model"
                :class="overlayClasses"
                :style="overlayStyles"
                tabindex="-1"
                @mousedown="handleOverlayClick"
            >
                <transition name="n-toast">
                    <component
                        :is="props.tag"
                        ref="contentRef"
                        :class="toastClasses"
                        :style="toastStyles"
                        v-bind="toastBind"
                    >
                        <slot name="default" v-html="props.content"></slot>
                    </component>
                </transition>
            </div>
        </transition>
    </teleport>

    <teleport v-else-if="isReady" to="#n-toasts-container">
        <transition name="n-toast">
            <component
                :is="props.tag"
                v-if="model"
                ref="contentRef"
                :class="toastClasses"
                :style="toastStyles"
                v-bind="toastBind"
            >
                <slot name="default" v-html="props.content"></slot>
            </component>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
    import { computed, useAttrs, ref, nextTick, watch, onBeforeUnmount } from 'vue'
    import { useTeleportContainer } from '../composables/use-teleport-container'
    import { useComponentStack } from '../composables/use-component-stack'

    defineOptions({ inheritAttrs: false })

    const attrs = useAttrs()
    const props = withDefaults(
        defineProps<{
            tag?: string
            content?: string
            overlay?: boolean
            noOverlayHide?: boolean
            noEscHide?: boolean
            position?: string
        }>(),
        {
            tag: 'div',
            content: '',
            overlay: false,
            noOverlayHide: false,
            noEscHide: false,
            position: 'top-center'
        }
    )

    const model = defineModel<boolean>({ default: false })
    const { isReady } = useTeleportContainer('n-toasts-container')

    const contentRef = ref<HTMLElement | null>(null)
    const lastFocusedElement = ref<HTMLElement | null>(null)

    // --- Component Stack (Z-Index) ---
    const { register, unregister, getZIndex, isTop } = useComponentStack('n-toast')
    const toastId = Symbol('toast-id')
    const stackZIndex = computed(() => getZIndex(toastId))

    // ==========================================
    // VIEW MODEL
    // ==========================================

    // --- Overlay Logic ---
    const overlayClasses = computed(() => [
        'n-toast-overlay',
        props.overlay ? 'n-toast-overlay--solid' : 'n-toast-overlay--empty',
        `n-toast-overlay--position-${props.position}`
    ])

    const overlayStyles = computed(() => ({
        zIndex: stackZIndex.value
    }))

    // --- Toast Logic ---
    const toastClasses = computed(() => ['n-toast', `n-toast--position-${props.position}`])

    const toastStyles = computed(() => ({
        // If standalone (no overlay), apply z-index directly to toast
        ...(props.overlay ? {} : { zIndex: stackZIndex.value })
    }))

    const toastBind = computed(() => ({
        role: 'log',
        'aria-live': 'polite',
        ...attrs
    }))

    // ==========================================
    // BEHAVIORAL LOGIC
    // ==========================================

    const FOCUSABLE_SELECTORS = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    const focusFirstElement = () => {
        if (!contentRef.value) return
        const focusable = contentRef.value.querySelector(FOCUSABLE_SELECTORS) as HTMLElement | null

        if (focusable) {
            focusable.focus()
        } else {
            contentRef.value.focus()
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !props.noEscHide && isTop(toastId)) {
            model.value = false
        }
    }

    watch(model, async isOpen => {
        if (isOpen) {
            register(toastId)
            lastFocusedElement.value = document.activeElement as HTMLElement
            window.addEventListener('keydown', onKeyDown)

            await nextTick()
            focusFirstElement()
        } else {
            window.removeEventListener('keydown', onKeyDown)

            if (lastFocusedElement.value) {
                lastFocusedElement.value.focus()
                lastFocusedElement.value = null
            }
            unregister(toastId)
        }
    })

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', onKeyDown)
        unregister(toastId)
    })

    const show = () => {
        model.value = true
    }
    const hide = () => {
        model.value = false
    }
    const handleOverlayClick = () => {
        if (!props.noOverlayHide) hide()
    }

    defineExpose({ show, hide })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        /* =========================================
       1. BASE LAYOUT & TRANSITIONS
       ========================================= */

        /* --- Overlay (Wrapper Mode) --- */
        .n-toast-overlay {
            @apply fixed inset-0 z-1000 bg-bg-invert/50;

            &.n-toast-overlay--empty {
                @apply bg-transparent;
            }

            &.n-toast-overlay-enter-active,
            &.n-toast-overlay-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
            }

            &.n-toast-overlay-enter-from,
            &.n-toast-overlay-leave-to {
                @apply opacity-0;
                .n-toast {
                    @apply opacity-0;
                }
            }

            &.n-toast-overlay-leave-active {
                @apply delay-200;
                .n-toast {
                    @apply delay-0;
                }
            }
        }

        /* --- Toast (The Notification) --- */
        .n-toast {
            @apply fixed z-1000 w-auto;
            @apply transition-[opacity,translate] duration-200 ease-in-out delay-200;

            /* Context Override: Absolute if inside Overlay */
            .n-toast-overlay & {
                @apply absolute delay-300;
            }

            &.n-toast-enter-active,
            &.n-toast-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out delay-0;
            }
            &.n-toast-enter-from,
            &.n-toast-leave-to {
                @apply opacity-0;
            }
        }

        /* =========================================
       2. POSITIONING LOGIC
       ========================================= */

        /* Vertical Alignment */
        :is([class*='--position-top']) .n-toast,
        :is([class*='--position-top']).n-toast {
            @apply top-0;
        }
        :is([class*='--position-bottom']) .n-toast,
        :is([class*='--position-bottom']).n-toast {
            @apply bottom-0;
        }
        :is([class*='--position-center-']) .n-toast,
        :is([class*='--position-center-']).n-toast {
            @apply top-1/2 -translate-y-1/2;
        }

        /* Horizontal Alignment */
        :is([class*='-left']) .n-toast,
        :is([class*='-left']).n-toast {
            @apply left-0;
        }
        :is([class*='-right']) .n-toast,
        :is([class*='-right']).n-toast {
            @apply right-0;
        }

        /* Center Horizontal */
        :is([class*='--position-']:not([class*='-left']):not([class*='-right'])) .n-toast,
        :is([class*='--position-']:not([class*='-left']):not([class*='-right'])).n-toast {
            @apply left-1/2 -translate-x-1/2;
        }

        /* Dead Center */
        :is([class*='center-center']) .n-toast,
        :is([class*='center-center']).n-toast {
            @apply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
        }

        /* =========================================
       3. ANIMATION DIRECTION LOGIC
       ========================================= */

        :is([class*='--position-top']) {
            &.n-toast-overlay-enter-from .n-toast,
            &.n-toast-overlay-leave-to .n-toast,
            &.n-toast.n-toast-enter-from,
            &.n-toast.n-toast-leave-to {
                @apply -translate-y-4;
            }
        }
        :is([class*='--position-bottom']) {
            &.n-toast-overlay-enter-from .n-toast,
            &.n-toast-overlay-leave-to .n-toast,
            &.n-toast.n-toast-enter-from,
            &.n-toast.n-toast-leave-to {
                @apply translate-y-4;
            }
        }
        :is([class*='--position-center-left']) {
            &.n-toast-overlay-enter-from .n-toast,
            &.n-toast-overlay-leave-to .n-toast,
            &.n-toast.n-toast-enter-from,
            &.n-toast.n-toast-leave-to {
                @apply -translate-x-4;
            }
        }
        :is([class*='--position-center-right']) {
            &.n-toast-overlay-enter-from .n-toast,
            &.n-toast-overlay-leave-to .n-toast,
            &.n-toast.n-toast-enter-from,
            &.n-toast.n-toast-leave-to {
                @apply translate-x-4;
            }
        }
    }
</style>
