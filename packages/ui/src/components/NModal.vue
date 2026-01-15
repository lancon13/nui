<template>
    <teleport v-if="isReady" to="#n-modals-container">
        <!-- Overlay -->
        <transition name="n-modal-overlay">
            <div
                v-if="props.overlay && model"
                :class="overlayClasses"
                :style="overlayStyles"
                aria-hidden="true"
                @mousedown="handleOverlayClick"
            ></div>
        </transition>

        <!-- Modal -->
        <transition name="n-modal">
            <component
                :is="props.tag"
                v-if="model"
                ref="contentRef"
                :role="props.role"
                :aria-modal="props.overlay ? 'true' : undefined"
                :class="modalClasses"
                :style="modalStyles"
                v-bind="modalBind"
                @mousedown="handleModalMouseDown"
                @mouseup="handleModalMouseUp"
            >
                <slot name="default">
                    <span v-if="props.content" v-html="props.content" />
                </slot>
            </component>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
    import { useEventListener } from '@vueuse/core'
    import { computed, type HTMLAttributes, onUnmounted, provide, useAttrs, useTemplateRef, watch } from 'vue'
    import { useComponentStack } from '../composables/use-component-stack'
    import { useFocusable } from '../composables/use-focusable'
    import { useTeleportContainer } from '../composables/use-teleport-container'
    import { generatePseudoRandomKey } from '../helpers/tools'

    export type NModalDirection = 'center' | 'top' | 'bottom' | 'left' | 'right'
    export type NModalProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        content?: string
        overlay?: boolean
        noOverlayHide?: boolean
        noEscHide?: boolean
        direction?: NModalDirection
        persist?: boolean
        focusOnShow?: boolean
        role?: string
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NModalProps>(), {
        tag: 'div',
        content: '',
        overlay: true,
        noOverlayHide: false,
        noEscHide: false,
        direction: 'center',
        persist: false,
        focusOnShow: true,
        role: 'dialog'
    })

    const model = defineModel<boolean>({ default: false })
    const { isReady } = useTeleportContainer('n-modals-container')

    const modalId = Symbol(`modal-id-${generatePseudoRandomKey()}`)
    const { register, unregister, getZIndex, isTop } = useComponentStack('n-modal')
    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')

    const { pause, unpause, focusContent } = useFocusable(
        model,
        contentRef,
        computed(() => props.overlay),
        computed(() => props.focusOnShow),
        props.overlay
            ? {
                  show: 300,
                  hide: 300
              }
            : undefined
    )

    provide('n-modal-focusable', { pause, unpause, focusContent })

    const stackZIndex = computed(() => getZIndex(modalId))

    const overlayClasses = computed(() => ['n-modal-overlay'])
    const overlayStyles = computed(() => ({ zIndex: stackZIndex.value }))
    const modalClasses = computed(() => ['n-modal', `n-modal--direction-${props.direction}`, 'outline-none'])
    const modalStyles = computed(() => ({ zIndex: stackZIndex.value }))
    const modalBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { tag, content, overlay, noOverlayHide, noEscHide, direction, persist, focusOnShow, role, ...rest } =
            props

        // Destructure standard attributes handled explicitly in template to avoid duplicates
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { 'aria-modal': am, role: r, tabindex, ...remainingAttrs } = attrs

        // Also exclude them from props rest if present
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { 'aria-modal': pam, ...finalRest } = rest as Record<string, unknown>

        return { tabindex: tabindex ?? '-1', ...finalRest, ...remainingAttrs }
    })

    useEventListener('keydown', e => {
        if (model.value && e.key === 'Escape' && !props.persist && !props.noEscHide && isTop(modalId)) {
            e.preventDefault()
            e.stopPropagation()
            hide()
        }
    })

    watch(
        model,
        isOpen => {
            if (isOpen) {
                register(modalId)
            } else {
                setTimeout(() => unregister(modalId), 300)
            }
        },
        { immediate: true }
    )

    onUnmounted(() => {
        unregister(modalId)
    })
    function handleOverlayClick(e: MouseEvent) {
        if (props.persist || props.noOverlayHide) return
        const target = e.target as HTMLElement
        if (target.clientWidth < e.clientX || target.clientHeight < e.clientY) return
        hide()
    }

    function isFocusable(element: HTMLElement): boolean {
        if (!element) return false
        if (element === document.body) return false

        const focusableSelector = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'textarea:not([disabled])',
            'select:not([disabled])',
            'details',
            '[tabindex]:not([tabindex="-1"])',
            '[contenteditable]',
            'label'
        ].join(', ')

        // Check if the element itself matches
        if (element.matches(focusableSelector)) return true
        if (element.getAttribute('tabindex') && element.getAttribute('tabindex') !== '-1') return true

        // Check if it's inside a focusable element (e.g. span in button)
        if (element.closest(focusableSelector)) return true

        return false
    }

    function handleModalMouseDown(e: MouseEvent) {
        if (props.persist) return

        const target = e.target as HTMLElement
        // If clicking on empty space (non-focusable), focus the container to avoid trap reset
        if (!isFocusable(target)) {
            // We focus the container so focus is "inside" the trap
            // This allows the previous input to blur properly
            if (contentRef.value) {
                e.preventDefault()
                contentRef.value.focus()
            }
        }

        pause()
    }

    function handleModalMouseUp() {
        if (props.persist) return
        unpause()
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
        .n-modal-overlay {
            @apply fixed inset-0 z-1000 bg-background-invert/50;

            &.n-modal-overlay-enter-active,
            &.n-modal-overlay-leave-active {
                @apply transition-[opacity] duration-200 ease-in-out;
            }

            &.n-modal-overlay-leave-active {
                @apply delay-200;
            }

            &.n-modal-overlay-enter-from,
            &.n-modal-overlay-leave-to {
                @apply opacity-0;
            }
        }

        .n-modal {
            @apply absolute z-1000 w-auto;
            @apply transition-[opacity,translate] duration-200 ease-in-out;
            @apply translate-x-0 translate-y-0;

            &.n-modal-enter-active {
                @apply delay-200;
            }

            &.n-modal--direction-top {
                @apply w-full top-0 left-0;
            }
            &.n-modal--direction-bottom {
                @apply w-full bottom-0 left-0;
            }
            &.n-modal--direction-left {
                @apply h-full top-0 left-0;
            }
            &.n-modal--direction-right {
                @apply h-full top-0 right-0;
            }

            &.n-modal-enter-from,
            &.n-modal-leave-to {
                @apply opacity-0;
                &.n-modal--direction-center {
                    @apply translate-y-2;
                }
                &.n-modal--direction-top {
                    @apply -translate-y-full;
                }
                &.n-modal--direction-bottom {
                    @apply translate-y-full;
                }
                &.n-modal--direction-left {
                    @apply -translate-x-full;
                }
                &.n-modal--direction-right {
                    @apply translate-x-full;
                }
            }
        }
    }
</style>
