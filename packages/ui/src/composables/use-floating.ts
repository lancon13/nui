import { autoUpdate, flip, offset, shift, useFloating as useFloatingUI, type Placement } from '@floating-ui/vue'
import { useElementSize, useEventListener, useTimeoutFn } from '@vueuse/core'
import { computed, nextTick, ref, toValue, watch, type MaybeRefOrGetter, type Ref, type WritableComputedRef } from 'vue'
import { getElement } from '../helpers/dom'

export interface UseFloatingProps {
    showDelay?: number
    hideDelay?: number
    persistent?: boolean
    allowClickToHide?: boolean
    triggerByHover?: boolean
    triggerByFocus?: boolean
    triggerByInteraction?: boolean
    hoverTriggerAnchor?: HTMLElement | string | null
    focusTriggerAnchor?: HTMLElement | string | null
    clickTriggerAnchor?: HTMLElement | string | null
    autoReposition?: boolean
    margin?: number
    offset?: [number, number]
}

export function useFloating(
    propsOrRef: MaybeRefOrGetter<UseFloatingProps>,
    options: {
        model: WritableComputedRef<boolean>
        contentRef: Ref<HTMLElement | null>
        attachParentEl: Ref<HTMLElement | null>
        placement: Ref<Placement>
    }
) {
    const { model, contentRef, attachParentEl, placement } = options
    const isContentHoverFocus = ref(false)
    const isInteractionPending = ref(false)
    const isRestoringFocus = ref(false)

    // Helper to access props
    const props = computed(() => {
        const p = toValue(propsOrRef)
        return {
            triggerByHover: true,
            triggerByFocus: true,
            triggerByInteraction: true,
            ...p
        }
    })

    useEventListener(() => (typeof document !== 'undefined' ? document : null), 'mouseup', () => {
        isInteractionPending.value = false
    })
    useEventListener(() => (typeof document !== 'undefined' ? document : null), 'keyup', () => {
        isInteractionPending.value = false
    })

    const showTimer = useTimeoutFn(
        () => {
            show()
        },
        computed(() => props.value.showDelay ?? 0),
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
        computed(() => props.value.hideDelay ?? 0),
        {
            immediate: false
        }
    )

    const hoverTriggerAnchorEl = ref<HTMLElement | null>(null)
    const focusTriggerAnchorEl = ref<HTMLElement | null>(null)
    const clickTriggerAnchorEl = ref<HTMLElement | null>(null)
    const { width: parentWidth, height: parentHeight } = useElementSize(attachParentEl)

    const {
        x,
        y,
        strategy,
        placement: floatingPlacement
    } = useFloatingUI(attachParentEl, contentRef, {
        placement,
        whileElementsMounted: autoUpdate,
        middleware: computed(() => {
            const [cross, main] = props.value.offset ?? [0, 0]
            const list = [offset(props.value.margin), offset({ crossAxis: cross, mainAxis: main })]
            if (props.value.autoReposition) {
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

    const cancelTimers = () => {
        if (showTimer.isPending.value) showTimer.stop()

        if (hideTimer.isPending.value) hideTimer.stop()
    }

    const updateListeners = (
        el: HTMLElement | null | undefined,
        events: Record<string, EventListener>,
        action: 'add' | 'remove'
    ) => {
        if (!el) return
        Object.entries(events).forEach(([event, handler]) => {
            if (action === 'add') el.addEventListener(event, handler)
            else el.removeEventListener(event, handler)
        })
    }

    watch(
        () => [
            props.value.hoverTriggerAnchor,
            props.value.focusTriggerAnchor,
            props.value.clickTriggerAnchor,
            attachParentEl.value
        ],
        () => {
            nextTick(() => {
                const p = props.value

                const resolveEl = (anchor: HTMLElement | string | null | undefined) =>
                    anchor ? getElement(anchor) : typeof anchor === 'undefined' ? attachParentEl.value : null

                const newHoverEl = resolveEl(p.hoverTriggerAnchor)
                const newFocusEl = resolveEl(p.focusTriggerAnchor)
                const newClickEl = resolveEl(p.clickTriggerAnchor)

                const hoverHandlers = {
                    mouseenter: handleTriggerAnchorHoverFocusIn as EventListener,
                    mouseleave: handleTriggerAnchorHoverFocusOut as EventListener
                }
                const focusHandlers = {
                    focus: handleTriggerAnchorHoverFocusIn as EventListener,
                    blur: handleTriggerAnchorHoverFocusOut as EventListener,
                    mousedown: handleTriggerAnchorInteractionStart as EventListener,
                    keydown: handleTriggerAnchorKeydown as EventListener
                }
                const clickHandlers = {
                    click: handleTriggerAnchorClick as EventListener
                }

                // Helper to update if changed
                const updateRef = (
                    refEl: Ref<HTMLElement | null>,
                    newEl: HTMLElement | null,
                    handlers: Record<string, EventListener>
                ) => {
                    if (refEl.value !== newEl) {
                        updateListeners(refEl.value, handlers, 'remove')
                        refEl.value = newEl
                        updateListeners(refEl.value, handlers, 'add')
                    }
                }

                updateRef(hoverTriggerAnchorEl, newHoverEl, hoverHandlers)
                updateRef(focusTriggerAnchorEl, newFocusEl, focusHandlers)
                updateRef(clickTriggerAnchorEl, newClickEl, clickHandlers)
            })
        },
        { deep: true, immediate: true, flush: 'post' }
    )

    function handleTriggerAnchorInteractionStart() {
        isInteractionPending.value = true
    }

    function handleTriggerAnchorKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ' ') {
            isInteractionPending.value = true
        }
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    function handleTriggerAnchorClick(e: Event) {
        // e.stopPropagation() // Optional
        if (model.value) {
            if (props.value.allowClickToHide) {
                if (props.value.persistent) return
                cancelTimers()
                hide()
            }
        } else {
            if (hideTimer.isPending.value) hideTimer.stop()
            showTimer.start()
        }
    }

    function handleTriggerAnchorHoverFocusIn() {
        if (isInteractionPending.value || isRestoringFocus.value) return
        if (hideTimer.isPending.value) hideTimer.stop()
        if (!showTimer.isPending.value) showTimer.start()
    }

    function handleTriggerAnchorHoverFocusOut(e: Event) {
        if (props.value.persistent) return

        // If mouseleave but triggerByHover is false, ignore
        if (e.type === 'mouseleave' && !props.value.triggerByHover) return
        if (showTimer.isPending.value) showTimer.stop()
        if (!hideTimer.isPending.value) hideTimer.start()
    }

    function handleContentHoverFocusIn() {
        isContentHoverFocus.value = true
        if (hideTimer.isPending.value) hideTimer.stop()
    }

    function handleContentHoverFocusOut() {
        if (props.value.persistent) return
        isContentHoverFocus.value = false

        // If triggerByHover is false, moving out of content shouldn't auto-hide
        if (!props.value.triggerByHover) return
        if (!hideTimer.isPending.value) hideTimer.start()
    }

    useEventListener('keydown', e => {
        if (model.value && e.key === 'Escape' && !props.value.persistent) {
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
                isRestoringFocus.value = true
                if (focusTriggerAnchorEl.value) focusTriggerAnchorEl.value.focus()
                else if (attachParentEl.value) attachParentEl.value?.focus()
                setTimeout(() => {
                    isRestoringFocus.value = false
                }, 0)
            })
        }
    }

    return {
        show,
        hide,
        handleContentHoverFocusIn,
        handleContentHoverFocusOut,
        compStyles,
        placement: floatingPlacement,
        parentWidth,
        parentHeight
    }
}
