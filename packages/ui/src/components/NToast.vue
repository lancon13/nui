<template>
    <teleport v-if="isReady" :to="`#n-toasts-container--position-${props.position}`">
        <!-- Overlay -->
        <transition name="n-toast-overlay">
            <div
                v-if="props.overlay && model"
                :class="overlayClasses"
                :style="overlayStyles"
                tabindex="-1"
                @mousedown="handleOverlayClick"
            />
        </transition>

        <!-- Toast -->
        <transition mode="out-in" name="n-toast">
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
    import { useEventListener } from '@vueuse/core'
    import { computed, HTMLAttributes, nextTick, onUnmounted, ref, useAttrs, useTemplateRef, watch } from 'vue'
    import { useComponentStack } from '../composables/use-component-stack'
    import { useTeleportContainer } from '../composables/use-teleport-container'
    import { generatePseudoRandomKey } from '../helpers/tools'

    defineOptions({ inheritAttrs: false })

    export type NToastProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        content?: string
        overlay?: boolean
        noOverlayHide?: boolean
        noEscHide?: boolean
        position?: string
        focusOnShow?: boolean
    }

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NToastProps>(), {
        tag: 'div',
        content: '',
        overlay: false,
        noOverlayHide: false,
        noEscHide: false,
        position: 'top-center',
        focusOnShow: true
    })

    const model = defineModel<boolean>({ default: false })
    const { isReady } = useTeleportContainer(computed(() => `n-toasts-container--position-${props.position}`))

    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')
    const lastFocusedElement = ref<HTMLElement | null>(null)

    // --- Component Stack (Z-Index) ---
    const toastId = Symbol(`toast-id-${generatePseudoRandomKey()}`)
    const { register, unregister, getZIndex, getOrderIndex, isTop } = useComponentStack(
        computed(() => `n-toast--position-${props.position}`)
    )
    const stackZIndex = computed(() => getZIndex(toastId))
    const stackOrderIndex = computed(() => getOrderIndex(toastId))

    const overlayClasses = computed(() => ['n-toast-overlay', `n-toast-overlay--position-${props.position}`])
    const overlayStyles = computed(() => ({
        zIndex: stackZIndex.value,
        order: stackOrderIndex.value
    }))

    const toastClasses = computed(() => ['n-toast', `n-toast--position-${props.position}`])
    const toastStyles = computed(() => ({
        zIndex: stackZIndex.value,
        order: stackOrderIndex.value
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

    useEventListener('keydown', e => {
        if (model.value && e.key === 'Escape' && !props.noEscHide && isTop(toastId)) {
            e.preventDefault()
            e.stopPropagation()
            hide()
        }
    })

    watch(model, async value => {
        if (value) {
            register(toastId)
            lastFocusedElement.value = document.activeElement as HTMLElement
            await nextTick()
            if (props.focusOnShow) focusFirstElement()
        } else {
            if (lastFocusedElement.value) {
                lastFocusedElement.value.focus()
                lastFocusedElement.value = null
            }
            unregister(toastId)
        }
    })

    onUnmounted(() => {
        unregister(toastId)
    })

    // Event handlers
    function handleOverlayClick(e: MouseEvent) {
        if (props.noOverlayHide) return
        const target = e.target as HTMLElement
        if (target.clientWidth < e.clientX || target.clientHeight < e.clientY) return
        hide()
    }

    // Methods
    const show = () => {
        model.value = true
    }
    const hide = () => {
        model.value = false
    }
    defineExpose({ show, hide })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-toast-overlay {
            @apply fixed inset-0 z-1000 bg-bg-invert/50;

            &.n-toast-overlay-enter-active,
            &.n-toast-overlay-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
            }

            &.n-toast-overlay-enter-from,
            &.n-toast-overlay-leave-to {
                @apply opacity-0;
            }

            &.n-toast-overlay-leave-active {
                @apply delay-200;
                & + .n-toast {
                    @apply delay-0;
                }
            }
        }

        .n-toast {
            @apply relative z-1000 w-auto;
            @apply transition-[opacity,translate] duration-200 ease-in-out;
            /* @apply delay-200 */

            &.n-toast-enter-from,
            &.n-toast-leave-to {
                @apply opacity-0;
            }

            &:is([class*='--position-top']) {
                &.n-toast.n-toast-enter-from,
                &.n-toast.n-toast-leave-to {
                    @apply -translate-y-4;
                }
            }

            &:is([class*='--position-bottom']) {
                &.n-toast.n-toast-enter-from,
                &.n-toast.n-toast-leave-to {
                    @apply translate-y-4;
                }
            }
            &:is([class*='--position-center-left']) {
                &.n-toast.n-toast-enter-from,
                &.n-toast.n-toast-leave-to {
                    @apply -translate-x-4;
                }
            }
            &:is([class*='--position-center-right']) {
                &.n-toast.n-toast-enter-from,
                &.n-toast.n-toast-leave-to {
                    @apply translate-x-4;
                }
            }
        }
    }
</style>
