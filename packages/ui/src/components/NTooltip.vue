<template>
    <div ref="placeholderRef" class="hidden" />
    <teleport to="body">
        <component
            :is="props.tag"
            v-if="isActive"
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
    </teleport>
</template>

<script setup lang="ts">
    import { autoUpdate, flip, offset, shift, useFloating, type Placement } from '@floating-ui/vue'
    import { useTimeoutFn } from '@vueuse/core'
    import { computed, nextTick, ref, useAttrs, useTemplateRef, watch } from 'vue'
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
        }>(),
        {
            tag: 'span',
            content: '',
            showDelay: 75,
            hideDelay: 250,
            persistent: false,
            direction: 'bottom',
            margin: 16,
            offset: () => [0, 0],
            autoReposition: true
        }
    )

    const model = defineModel<boolean>({ default: false })
    const placeholderRef = useTemplateRef<HTMLElement | null>('placeholderRef')
    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')
    const isContentHoverFocus = ref(false)
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
        return ['n-tooltip', model.value ? 'n-tooltip--visible' : '', `n-tooltip--direction-${placement.value}`]
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

    const isActive = computed({
        get() {
            return true
        },
        set(value) {
            console.log(value)
        }
    })

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
                    : attachParentEl.value
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
                    : attachParentEl.value
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
        .n-tooltip {
            @apply absolute z-10
                bg-text text-text-invert 
                text-center
                text-sm
                px-2 py-1
                rounded-element
                opacity-0
                transition-[opacity,translate] duration-200 ease-in-out;

            &.n-tooltip--visible {
                @apply opacity-100;
                /* Top, Bottom */
                &.n-tooltip--direction-top,
                &.n-tooltip--direction-bottom {
                    @apply translate-y-0;
                }
                /* Left, Right */
                &.n-tooltip--direction-left,
                &.n-tooltip--direction-right {
                    @apply translate-x-0;
                }
            }
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
</style>
