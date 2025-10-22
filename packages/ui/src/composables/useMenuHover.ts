import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

interface NuiPopOverRef {
    show: () => void
    hide: () => void
    placeholderRef: HTMLElement | null
}

export function useMenuHover(menuElement: Ref<NuiPopOverRef | null>, isNested: Ref<boolean>) {
    let hoverTimeout: number | undefined

    onMounted(() => {
        if (isNested.value && menuElement.value && menuElement.value.placeholderRef) {
            const parentElement = menuElement.value.placeholderRef.parentElement
            if (parentElement) {
                const handleMouseOver = () => {
                    clearTimeout(hoverTimeout)
                    if (menuElement.value) {
                        menuElement.value.show()
                    }
                }
                const handleMouseOut = () => {
                    hoverTimeout = window.setTimeout(() => {
                        if (menuElement.value) {
                            menuElement.value.hide()
                        }
                    }, 750)
                }

                parentElement.addEventListener('mouseover', handleMouseOver)
                parentElement.addEventListener('mouseout', handleMouseOut)

                onBeforeUnmount(() => {
                    parentElement.removeEventListener('mouseover', handleMouseOver)
                    parentElement.removeEventListener('mouseout', handleMouseOut)
                    clearTimeout(hoverTimeout)
                })
            }
        }
    })
}
