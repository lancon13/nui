import { autoUpdate, flip, offset, shift, useFloating as useFloatingUI, type Placement } from '@floating-ui/vue'
import { useEventListener, useTimeoutFn } from '@vueuse/core'
import { computed, nextTick, ref, watch, type Ref, type WritableComputedRef, toValue } from 'vue'
import { getElement } from '../helpers/dom'

export function useFloating(
    props: {
        showDelay?: number
        hideDelay?: number
        persistent?: boolean
        hoverTriggerAnchor?: HTMLElement | string | null
        focusTriggerAnchor?: HTMLElement | string | null
        autoReposition?: boolean
        margin?: number
        offset?: [number, number]
    },
    options: {
        model: WritableComputedRef<boolean>
        contentRef: Ref<HTMLElement | null>
        attachParentEl: Ref<HTMLElement | null>
        placement: Ref<Placement>
    }
) {
    const { model, contentRef, attachParentEl, placement } = options

    const isContentHoverFocus = ref(false)

    const showTimer = useTimeoutFn(
        () => {
            show()
        },
        computed(() => props.showDelay ?? 0),
        {
            immediate: false
        }
    )

    const hideTimer = useTimeoutFn(
        () => {
            if (document.activeElement !== toValue(focusTriggerAnchorEl) && !isContentHoverFocus.value) {
                hide()
            }
        },
        computed(() => props.hideDelay ?? 0),
        {
            immediate: false
        }
    )

    const hoverTriggerAnchorEl = ref<HTMLElement | null>(null)
    const focusTriggerAnchorEl = ref<HTMLElement | null>(null)

    const {
        x,
        y,
        strategy,
        placement: floatingPlacement
    } = useFloatingUI(attachParentEl, contentRef, {
        placement,
        whileElementsMounted: autoUpdate,
        middleware: computed(() => {
            const [cross, main] = props.offset ?? [0, 0]
            const list = [offset(props.margin), offset({ crossAxis: cross, mainAxis: main })]
            if (props.autoReposition) {
                list.push(flip())
                list.push(shift({ padding: 8 }))
            }
            return list
        })
    })

    const compStyles = computed(() => ({
        position: strategy.value,
        top: y.value != null ? `${y.value}px` : '',
        left: x.value != null ? `${x.value}px` : ''
    }))

    watch(
        () => [props.hoverTriggerAnchor, props.focusTriggerAnchor, attachParentEl.value],
        () => {
            nextTick(() => {
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

    function handleTriggerAnchorHoverFocusIn() {
        if (hideTimer.isPending.value) hideTimer.stop()
        if (!showTimer.isPending.value) showTimer.start()
    }
    function handleTriggerAnchorHoverFocusOut() {
        if (props.persistent) return
        if (showTimer.isPending.value) showTimer.stop()
        if (!hideTimer.isPending.value) hideTimer.start()
    }

    function handleContentHoverFocusIn() {
        isContentHoverFocus.value = true
        if (hideTimer.isPending.value) hideTimer.stop()
    }
    function handleContentHoverFocusOut() {
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

    const show = () => {
        model.value = true
    }

    const hide = (skipReturnFocus = false) => {
        const isFocusInside = contentRef.value?.contains(document.activeElement)
        model.value = false

        if (!skipReturnFocus && isFocusInside) {
            nextTick(() => {
                if (focusTriggerAnchorEl.value) focusTriggerAnchorEl.value.focus()
                else if (attachParentEl.value) attachParentEl.value?.focus()
            })
        }
    }

    return {
        show,
        hide,
        handleContentHoverFocusIn,
        handleContentHoverFocusOut,
        compStyles,
        placement: floatingPlacement
    }
}
