<template>
    <teleport v-if="isReady" :to="`#n-toasts-container--position-${props.position}`">
        <!-- Overlay -->
        <transition name="n-toast-overlay">
            <div
                v-if="props.overlay && model"
                :class="overlayClasses"
                :style="overlayStyles"
                aria-hidden="true"
                @mousedown="handleOverlayClick"
            />
        </transition>

        <!-- Toast -->
        <transition mode="out-in" name="n-toast">
            <component
                :is="props.tag"
                v-if="model"
                ref="contentRef"
                :role="props.role"
                :aria-live="(attrs['aria-live'] as string) || 'polite'"
                :aria-atomic="(attrs['aria-atomic'] as string) || 'true'"
                :class="toastClasses"
                :style="toastStyles"
                v-bind="toastBind"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
                @focusin="handleMouseEnter"
                @focusout="handleMouseLeave"
            >
                <slot name="default">
                    <span v-if="props.content" v-html="props.content" />
                </slot>
            </component>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { useEventListener } from '@vueuse/core'
    import { computed, type HTMLAttributes, nextTick, onUnmounted, ref, useAttrs, useTemplateRef, watch } from 'vue'
    import { useComponentStack } from '../composables/use-component-stack'
    import { usePausableTimer } from '../composables/use-pausable-timer'
    import { useTeleportContainer } from '../composables/use-teleport-container'
    import { cn } from '../helpers/classes'
    import { generatePseudoRandomKey } from '../helpers/tools'

    export type NToastProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        content?: string
        overlay?: boolean
        noOverlayHide?: boolean
        noEscHide?: boolean
        position?: string
        focusOnShow?: boolean
        duration?: number
        role?: string
    }

    defineOptions({ inheritAttrs: false })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NToastProps>(), {
        tag: 'div',
        content: '',
        overlay: false,
        noOverlayHide: false,
        noEscHide: false,
        position: 'top-center',
        focusOnShow: true,
        duration: 0,
        role: 'status'
    })

    const model = defineModel<boolean>({ default: false })
    const { isReady } = useTeleportContainer(computed(() => `n-toasts-container--position-${props.position}`))

    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')
    const lastFocusedElement = ref<HTMLElement | null>(null)

    const toastId = Symbol(`toast-id-${generatePseudoRandomKey()}`)
    const { register, unregister, getZIndex, getOrderIndex, isTop } = useComponentStack(
        computed(() => `n-toast--position-${props.position}`)
    )

    // Timer Logic
    const {
        start: startTimer,
        stop: stopTimer,
        pause: pauseTimer,
        resume: resumeTimer
    } = usePausableTimer(
        () => hide(),
        computed(() => props.duration),
        { immediate: false }
    )

    const stackZIndex = computed(() => getZIndex(toastId))
    const stackOrderIndex = computed(() => getOrderIndex(toastId))

    const overlayClasses = computed(() => ['n-toast-overlay', `n-toast-overlay--position-${props.position}`])
    const overlayStyles = computed(() => ({ zIndex: stackZIndex.value, order: stackOrderIndex.value }))

    const toastClasses = computed(() => cn('n-toast', `n-toast--position-${props.position}`, attrs.class as any))
    const toastStyles = computed(() => ({ zIndex: stackZIndex.value, order: stackOrderIndex.value }))
    const toastBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { tag, content, overlay, noOverlayHide, noEscHide, position, focusOnShow, duration, role, ...rest } =
            props

        // Destructure standard attributes handled explicitly in template to avoid duplicates
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { 'aria-live': ariaLive, 'aria-atomic': ariaAtomic, role: roleAttr, class: _, ...remainingAttrs } = attrs

        // Also exclude them from props rest if present (since NToastProps extends HTMLAttributes)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-explicit-any
        const { 'aria-live': pAl, 'aria-atomic': pAa, role: pR, ...cleanRest } = rest as any

        return { ...cleanRest, ...remainingAttrs }
    })

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
            if (props.duration > 0) startTimer()
            await nextTick()
            if (props.focusOnShow) focusFirstElement()
        } else {
            stopTimer()
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

    function handleOverlayClick(e: MouseEvent) {
        if (props.noOverlayHide) return
        const target = e.target as HTMLElement
        if (target.clientWidth < e.clientX || target.clientHeight < e.clientY) return
        hide()
    }

    function handleMouseEnter() {
        if (props.duration > 0) pauseTimer()
    }

    function handleMouseLeave() {
        if (props.duration > 0) resumeTimer()
    }

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
    @reference '../styles/components-index.css';

    @layer components {
        .n-toast-overlay {
            @apply fixed inset-0 z-1000 bg-background-invert/50;

            &.n-toast-overlay-enter-active,
            &.n-toast-overlay-leave-active {
                @apply transition-opacity duration-200 ease-in-out;
            }

            &.n-toast-overlay-leave-active {
                @apply delay-200;
            }

            &.n-toast-overlay-enter-from,
            &.n-toast-overlay-leave-to {
                @apply opacity-0;
            }
        }

        .n-toast {
            @apply relative z-1000 w-auto transition-all duration-200 ease-in-out;

            &.n-toast-enter-from,
            &.n-toast-leave-to {
                @apply opacity-0;
            }

            /* Transition Directions */
            &:is([class*='--position-top']) {
                &.n-toast-enter-from,
                &.n-toast-leave-to {
                    @apply -translate-y-4;
                }
            }
            &:is([class*='--position-bottom']) {
                &.n-toast-enter-from,
                &.n-toast-leave-to {
                    @apply translate-y-4;
                }
            }
            &:is([class*='--position-center-left']) {
                &.n-toast-enter-from,
                &.n-toast-leave-to {
                    @apply -translate-x-4;
                }
            }
            &:is([class*='--position-center-right']) {
                &.n-toast-enter-from,
                &.n-toast-leave-to {
                    @apply translate-x-4;
                }
            }
        }
    }
</style>
