import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { nextTick, watch, type Ref, ref } from 'vue'
import { delay } from '../helpers/tools'

export function useFocusable(
    model: Ref<boolean>,
    contentRef: Ref<HTMLElement | null>,
    overlay: Ref<boolean>,
    focusOnShow: Ref<boolean>,
    delays?: {
        show?: number
        hide?: number
    }
) {
    const {
        activate,
        deactivate,
        hasFocus: isFocusTrapped,
        pause: originalPause,
        unpause: originalUnpause
    } = useFocusTrap(contentRef, {
        immediate: false,
        allowOutsideClick: (event: MouseEvent | TouchEvent) => {
            const target = event.target as HTMLElement
            // Allow clicks on elements that have a parent with the class 'n-popover' (nested popovers)
            if (target.closest('.n-popover')) {
                return true
            }
            // Allow clicks on overlays (to trigger close)
            if (target.closest('.n-modal-overlay') || target.closest('.n-drawer-overlay')) {
                return true
            }
            return false
        }
    })

    const pauseCount = ref(0)

    const pause = () => {
        pauseCount.value++
        if (pauseCount.value === 1) {
            originalPause()
        }
    }

    const unpause = () => {
        if (pauseCount.value > 0) {
            pauseCount.value--
        }
        if (pauseCount.value === 0) {
            originalUnpause()
        }
    }

    function findFirstFocusable(element: HTMLElement): HTMLElement | null {
        if (!element) {
            return null
        }
        const focusableSelector = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'textarea:not([disabled])',
            'select:not([disabled])',
            'details',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ')

        return element.querySelector(focusableSelector)
    }

    watch(model, async isOpen => {
        await nextTick()
        // Handle Close
        if (!isOpen) {
            if (overlay.value) {
                if (typeof delays?.hide === 'number') await delay(delays.hide)
                deactivate()
            }
            return
        }

        // Handle Open
        const firstFocusable = findFirstFocusable(contentRef.value as HTMLElement)
        if (focusOnShow.value && firstFocusable) {
            if (typeof delays?.show === 'number') await delay(delays.show)
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            overlay.value ? activate() : firstFocusable.focus()
        }
    })

    const focusContent = () => {
        if (contentRef.value) {
            contentRef.value.focus()
        }
    }

    return { isFocusTrapped, pause, unpause, focusContent }
}
