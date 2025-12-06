import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { watch, nextTick, type Ref } from 'vue'

export function useFocusable(
    model: Ref<boolean>,
    contentRef: Ref<HTMLElement | null>,
    overlay: Ref<boolean>,
    focusOnShow: Ref<boolean>
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

    watch(model, async value => {
        await nextTick()
        if (value) {
            const firstFocusable = findFirstFocusable(contentRef.value as HTMLElement)
            if (overlay.value && focusOnShow.value) {
                if (firstFocusable) {
                    activate()
                }
            } else if (focusOnShow.value) {
                if (firstFocusable) {
                    firstFocusable.focus()
                }
            }
        } else if (!value) {
            if (overlay.value) {
                deactivate()
            }
        }
    })

    return { isFocusTrapped, pause, unpause }
}
