import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { watch, nextTick, type Ref } from 'vue'
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
        pause,
        unpause
    } = useFocusTrap(contentRef, {
        immediate: false
    })

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

    return { isFocusTrapped, pause, unpause }
}
