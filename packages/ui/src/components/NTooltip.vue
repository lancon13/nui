<template>
    <div ref="placeholderRef" class="hidden" />

    <transition v-if="props.stacked" name="n-tooltip">
        <component
            :is="props.tag"
            v-if="model"
            ref="contentRef"
            role="tooltip"
            :style="compStyles"
            :class="compClasses"
            v-bind="compBind"
            @mouseenter="handleTooltipHoverFocusIn"
            @mouseleave="handleTooltipHoverFocusOut"
            @focusin="handleTooltipHoverFocusIn"
            @focusout="handleTooltipHoverFocusOut"
        >
            <slot name="default" v-html="props.content"></slot>
        </component>
    </transition>

    <!-- Overlay -->
    <teleport v-else-if="isReady && props.overlay" to="#n-tooltips-container">
        <transition name="n-tooltip-overlay">
            <div v-if="model" class="n-tooltip-overlay">
                <component
                    :is="props.tag"
                    ref="contentRef"
                    role="tooltip"
                    :style="compStyles"
                    :class="compClasses"
                    v-bind="compBind"
                    @mouseenter="handleTooltipHoverFocusIn"
                    @mouseleave="handleTooltipHoverFocusOut"
                    @focusin="handleTooltipHoverFocusIn"
                    @focusout="handleTooltipHoverFocusOut"
                >
                    <slot name="default" v-html="props.content"></slot>
                </component>
            </div>
        </transition>
    </teleport>

    <!-- Without Overlay -->
    <teleport v-else-if="isReady" to="#n-tooltips-container">
        <transition name="n-tooltip">
            <component
                :is="props.tag"
                v-if="model"
                ref="contentRef"
                role="tooltip"
                :style="compStyles"
                :class="compClasses"
                v-bind="compBind"
                @mouseenter="handleTooltipHoverFocusIn"
                @mouseleave="handleTooltipHoverFocusOut"
                @focusin="handleTooltipHoverFocusIn"
                @focusout="handleTooltipHoverFocusOut"
            >
                <slot name="default" v-html="props.content"></slot>
            </component>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
    import { autoUpdate, flip, offset, shift, useFloating, type Placement } from '@floating-ui/vue'
    import { useEventListener, useTimeoutFn } from '@vueuse/core'
    import { computed, nextTick, ref, useAttrs, useTemplateRef, watch } from 'vue'
    import { useTeleportContainer } from '../composables/use-teleport-container'
    import { getElement } from '../helpers/dom'

    export type NTooltipDirection = 'top' | 'bottom' | 'left' | 'right'

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(
        defineProps<{
            tag?: string
            content?: string
            showDelay?: number
            hideDelay?: number
            persistent?: boolean
            hoverTriggerAnchor?: HTMLElement | string | null
            focusTriggerAnchor?: HTMLElement | string | null
            attachParent?: HTMLElement | string | null
            direction?: NTooltipDirection
            margin?: number
            offset?: [number, number]
            autoReposition?: boolean
            stacked?: boolean
            overlay?: boolean
        }>(),
        {
            tag: 'span',
            content: '',
            showDelay: 75,
            hideDelay: 250,
            persistent: false,
            direction: 'bottom',
            margin: 8,
            offset: () => [0, 0],
            autoReposition: true,
            stacked: false,
            overlay: false
        }
    )

    const model = defineModel<boolean>({ default: false })
    const placeholderRef = useTemplateRef<HTMLElement | null>('placeholderRef')
    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')
    const isContentHoverFocus = ref(false)
    const { isReady } = useTeleportContainer('n-tooltips-container')
    const showTimer = useTimeoutFn(
        () => {
            show()
        },
        computed(() => props.showDelay),
        {
            immediate: false
        }
    )
    const hideTimer = useTimeoutFn(
        () => {
            if (document.activeElement !== focusTriggerAnchorEl.value && !isContentHoverFocus.value) hide()
        },
        computed(() => props.hideDelay),
        {
            immediate: false
        }
    )

    const attachParentEl = ref<HTMLElement | null>(null)
    const hoverTriggerAnchorEl = ref<HTMLElement | null>(null)
    const focusTriggerAnchorEl = ref<HTMLElement | null>(null)
    const { x, y, strategy, placement } = useFloating(attachParentEl, contentRef, {
        placement: computed<Placement>(() => props.direction),
        whileElementsMounted: autoUpdate,
        middleware: computed(() => {
            const [cross, main] = props.offset
            const list = [offset(props.margin), offset({ crossAxis: cross, mainAxis: main })]
            if (props.autoReposition) {
                list.push(flip())
                list.push(shift({ padding: 8 }))
            }
            return list
        })
    })

    const compClasses = computed(() => {
        return ['n-tooltip', `n-tooltip--direction-${placement.value}`]
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })
    const compStyles = computed(() => ({
        position: strategy.value,
        top: y.value != null ? `${y.value}px` : '',
        left: x.value != null ? `${x.value}px` : ''
    }))

    // Lifecycle hooks
    watch(
        () => [props.attachParent, props.hoverTriggerAnchor, props.focusTriggerAnchor],
        () => {
            nextTick(() => {
                attachParentEl.value = props.attachParent
                    ? getElement(props.attachParent)
                    : placeholderRef.value?.parentElement || null

                // Hover
                if (hoverTriggerAnchorEl.value) {
                    hoverTriggerAnchorEl.value.removeEventListener('mouseenter', handleTriggerAnchorHoverFocusIn)
                    hoverTriggerAnchorEl.value.removeEventListener('mouseleave', handleTriggerAnchorHoverFocusOut)
                }
                hoverTriggerAnchorEl.value = props.hoverTriggerAnchor
                    ? getElement(props.hoverTriggerAnchor)
                    : typeof props.hoverTriggerAnchor === 'undefined'
                      ? attachParentEl.value
                      : null
                if (hoverTriggerAnchorEl.value) {
                    hoverTriggerAnchorEl.value.addEventListener('mouseenter', handleTriggerAnchorHoverFocusIn)
                    hoverTriggerAnchorEl.value.addEventListener('mouseleave', handleTriggerAnchorHoverFocusOut)
                }

                // Focus
                if (focusTriggerAnchorEl.value) {
                    focusTriggerAnchorEl.value.removeEventListener('focus', handleTriggerAnchorHoverFocusIn)
                    focusTriggerAnchorEl.value.removeEventListener('blur', handleTriggerAnchorHoverFocusOut)
                }
                focusTriggerAnchorEl.value = props.focusTriggerAnchor
                    ? getElement(props.focusTriggerAnchor)
                    : typeof props.focusTriggerAnchor === 'undefined'
                      ? attachParentEl.value
                      : null
                if (focusTriggerAnchorEl.value) {
                    focusTriggerAnchorEl.value.addEventListener('focus', handleTriggerAnchorHoverFocusIn)
                    focusTriggerAnchorEl.value.addEventListener('blur', handleTriggerAnchorHoverFocusOut)
                }
            })
        },
        { deep: true, immediate: true, flush: 'post' }
    )

    // Event handlers
    function handleTriggerAnchorHoverFocusIn() {
        if (hideTimer.isPending.value) hideTimer.stop()
        if (!showTimer.isPending.value) showTimer.start()
    }
    function handleTriggerAnchorHoverFocusOut() {
        if (props.persistent) return
        if (showTimer.isPending.value) showTimer.stop()
        if (!hideTimer.isPending.value) hideTimer.start()
    }

    function handleTooltipHoverFocusIn() {
        isContentHoverFocus.value = true
        if (hideTimer.isPending.value) hideTimer.stop()
    }
    function handleTooltipHoverFocusOut() {
        isContentHoverFocus.value = false
        if (props.persistent) return
        if (!hideTimer.isPending.value) hideTimer.start()
    }

    useEventListener('keydown', e => {
        if (model.value && e.key === 'Escape') {
            e.preventDefault()
            e.stopPropagation()
            hide()
        }
    })

    // Methods
    const show = () => {
        model.value = true
    }

    const hide = (skipReturnFocus = false) => {
        // Check if focus is currently inside the tooltip content
        const isFocusInside = contentRef.value?.contains(document.activeElement)
        model.value = false

        // Return focus if explicitly requested OR if focus was lost inside the tooltip
        if (!skipReturnFocus && isFocusInside) {
            nextTick(() => {
                if (focusTriggerAnchorEl.value) focusTriggerAnchorEl.value.focus()
                else if (attachParentEl.value) attachParentEl.value?.focus()
            })
        }
    }
    defineExpose({ show, hide })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-tooltip-overlay {
            @apply bg-bg-invert/50 fixed inset-0 grid place-content-center z-2000;

            &.n-tooltip-overlay-enter-active,
            &.n-tooltip-overlay-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
            }
            &.n-tooltip-overlay-leave-active {
                @apply delay-200;
                .n-tooltip {
                    @apply delay-0;
                }
            }
            &.n-tooltip-overlay-enter-from,
            &.n-tooltip-overlay-leave-to {
                @apply opacity-0;
                .n-tooltip {
                    @apply opacity-0;
                    &.n-tooltip--direction-top {
                        @apply translate-y-2;
                    }
                    &.n-tooltip--direction-bottom {
                        @apply -translate-y-2;
                    }
                    &.n-tooltip--direction-left {
                        @apply translate-x-2;
                    }
                    &.n-tooltip--direction-right {
                        @apply -translate-x-2;
                    }
                }
            }

            .n-tooltip {
                @apply transition-[opacity,translate] delay-200 duration-200 ease-in-out;
                @apply translate-x-0 translate-y-0;
            }
        }

        .n-tooltip {
            @apply z-2000
                bg-bg-invert text-text-invert 
                text-center
                text-xs
                px-2 py-1
                rounded-element
                shadow
                max-w-1/3;

            &.n-tooltip-enter-active,
            &.n-tooltip-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
                @apply translate-x-0 translate-y-0;
            }

            &.n-tooltip-enter-from,
            &.n-tooltip-leave-to {
                @apply opacity-0;
                &.n-tooltip--direction-top {
                    @apply translate-y-2;
                }
                &.n-tooltip--direction-bottom {
                    @apply -translate-y-2;
                }
                &.n-tooltip--direction-left {
                    @apply translate-x-2;
                }
                &.n-tooltip--direction-right {
                    @apply -translate-x-2;
                }
            }
        }
    }
</style>
