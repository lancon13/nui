<template>
    <div ref="placeholderRef" class="hidden" />
    <teleport to="body">
        <div
            v-if="model || isVisible"
            ref="contentRef"
            role="tooltip"
            :class="compClasses"
            :style="floatingStyles"
            @mouseenter="handleTooltipHoverIn"
            @mouseleave="handleTooltipHoverOut"
            @focusin="handleTooltipFocusIn"
            @focusout="handleTooltipFocusOut"
        >
            <slot>
                <div v-if="html" v-html="html" />
                <div v-else>{{ text }}</div>
            </slot>
        </div>
    </teleport>
</template>

<script lang="ts" setup>
    import { autoUpdate, flip, offset, shift, useFloating, type Placement } from '@floating-ui/vue'
    import { computed, onUnmounted, ref, watch } from 'vue'

    export type NuiTooltipDisplayPosition = 'top' | 'bottom' | 'left' | 'right'

    export interface NuiTooltipProps {
        text?: string
        html?: string
        displayPosition?: NuiTooltipDisplayPosition
        autoReposition?: boolean
        shiftPadding?: number
        showDelay?: number
        hideDelay?: number
        persistent?: boolean
        triggerParent?: HTMLElement | string | null
        attachParent?: HTMLElement | string | null
        offset?: [number, number]
        size?: 'small' | 'medium' | 'large'
        noHover?: boolean
        noFocus?: boolean
    }

    const props = withDefaults(defineProps<NuiTooltipProps>(), {
        text: '',
        html: '',
        displayPosition: 'bottom',
        autoReposition: true,
        shiftPadding: 8,
        showDelay: 0,
        hideDelay: 125,
        persistent: false,
        triggerParent: null,
        attachParent: null,
        offset: () => [0, 8],
        size: 'medium',
        noHover: false,
        noFocus: false
    })

    const model = defineModel<boolean>({ default: false })
    const isVisible = ref(false)
    const isFocusing = ref(false)

    const placeholderRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)
    const positionTarget = ref<HTMLElement | null>(null)
    const triggerTarget = ref<HTMLElement | null>(null)

    let showTimeoutId: number | undefined
    let hideTimeoutId: number | undefined

    const placement = computed<Placement>(() => props.displayPosition)

    const middleware = computed(() => {
        const [cross, main] = props.offset
        const list = [offset({ crossAxis: cross, mainAxis: main })]
        if (props.autoReposition) {
            list.push(flip())
            list.push(shift({ padding: props.shiftPadding }))
        }
        return list
    })

    const {
        x,
        y,
        strategy,
        placement: finalPlacement
    } = useFloating(positionTarget, contentRef, {
        placement,
        whileElementsMounted: autoUpdate,
        middleware
    })

    const placementDirection = computed(() => finalPlacement.value.split('-')[0])

    const floatingStyles = computed(() => ({
        position: strategy.value,
        top: y.value != null ? `${y.value}px` : '',
        left: x.value != null ? `${x.value}px` : ''
    }))

    const startShow = () => {
        if (hideTimeoutId) clearTimeout(hideTimeoutId)
        if (showTimeoutId) clearTimeout(showTimeoutId)

        showTimeoutId = window.setTimeout(() => {
            model.value = true
        }, props.showDelay)
    }

    const startHide = () => {
        if (props.persistent) return

        if (showTimeoutId) clearTimeout(showTimeoutId)
        if (hideTimeoutId) clearTimeout(hideTimeoutId)

        hideTimeoutId = window.setTimeout(() => {
            model.value = false
        }, props.hideDelay)
    }

    const cancelHide = () => {
        if (hideTimeoutId) clearTimeout(hideTimeoutId)
    }

    const handleTooltipHoverIn = () => {
        cancelHide()
    }
    const handleTooltipHoverOut = () => {
        if (!isFocusing.value) startHide()
    }
    const handleTooltipFocusIn = () => {
        isFocusing.value = true
        startShow()
    }
    const handleTooltipFocusOut = (event: FocusEvent) => {
        const relatedTarget = event.relatedTarget as HTMLElement | null
        if (!contentRef.value?.contains(relatedTarget)) {
            isFocusing.value = false
            startHide()
        }
    }

    const handleParentFocusIn = function () {
        isFocusing.value = true
        startShow()
    }
    const handleParentFocusOut = function () {
        isFocusing.value = false
        startHide()
    }
    const handleParentHoverIn = function () {
        if (!isFocusing.value) startShow()
    }
    const handleParentHoverOut = function () {
        if (!isFocusing.value) startHide()
    }

    const attachEvents = (element: HTMLElement) => {
        if (!props.noHover) {
            element.addEventListener('mouseenter', handleParentHoverIn)
            element.addEventListener('mouseleave', handleParentHoverOut)
        }
        if (!props.noFocus) {
            element.addEventListener('focus', handleParentFocusIn)
            element.addEventListener('blur', handleParentFocusOut)
        }
    }

    const detachEvents = (element: HTMLElement) => {
        element.removeEventListener('mouseenter', handleParentHoverIn)
        element.removeEventListener('mouseleave', handleParentHoverOut)
        element.removeEventListener('focus', handleParentFocusIn)
        element.removeEventListener('blur', handleParentFocusOut)
    }

    const setup = () => {
        if (triggerTarget.value) detachEvents(triggerTarget.value)

        let posTarget: HTMLElement | null = null
        if (props.attachParent) {
            posTarget =
                typeof props.attachParent === 'string'
                    ? document.querySelector(props.attachParent)
                    : props.attachParent
        } else if (placeholderRef.value) {
            posTarget = placeholderRef.value.parentElement
        }
        positionTarget.value = posTarget

        let trig: HTMLElement | null = null
        if (props.triggerParent) {
            trig =
                typeof props.triggerParent === 'string'
                    ? document.querySelector(props.triggerParent)
                    : props.triggerParent
        } else if (placeholderRef.value) {
            trig = placeholderRef.value.parentElement
        }
        triggerTarget.value = trig

        if (triggerTarget.value) attachEvents(triggerTarget.value)
    }

    watch(
        () => [
            props.attachParent,
            props.triggerParent,
            placeholderRef.value,
            props.noHover,
            props.noFocus
        ],
        setup,
        {
            flush: 'post'
        }
    )

    onUnmounted(() => {
        if (triggerTarget.value) detachEvents(triggerTarget.value)
    })

    watch(
        model,
        value => {
            if (value) {
                setTimeout(() => (isVisible.value = true), 1)
            } else {
                setTimeout(() => (isVisible.value = false), 250)
            }
        },
        { immediate: true }
    )

    const compClasses = computed(() => [
        'nui-tooltip',
        `nui-tooltip--placement-${placementDirection.value}`,
        `nui-tooltip--size-${props.size}`,
        {
            'nui-tooltip--visible': model.value && isVisible.value
        }
    ])

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
    @reference '../styles/components.css';

    @layer components {
        .nui-tooltip {
            @apply absolute z-10
                bg-[var(--nui-tooltip-background-color)] text-[var(--nui-tooltip-text-color)]
                rounded-[var(--nui-tooltip-radius)]
                text-[length:var(--nui-tooltip-font-size)] leading-base
                px-[var(--nui-tooltip-padding-x)] py-[var(--nui-tooltip-padding-y)]
                font-normal
                whitespace-nowrap
                opacity-0
                transition-[opacity,translate] duration-250 ease-in-out;

            &.nui-tooltip--visible {
                @apply opacity-100;
                /* Top, Bottom */
                &.nui-tooltip--placement-top,
                &.nui-tooltip--placement-bottom {
                    @apply translate-y-0;
                }
                /* Left, Right */
                &.nui-tooltip--placement-left,
                &.nui-tooltip--placement-right {
                    @apply translate-x-0;
                }
            }

            &.nui-tooltip--placement-top {
                @apply translate-y-2;
            }
            &.nui-tooltip--placement-bottom {
                @apply -translate-y-2;
            }
            &.nui-tooltip--placement-left {
                @apply translate-x-2;
            }
            &.nui-tooltip--placement-right {
                @apply -translate-x-2;
            }
        }
    }
</style>
