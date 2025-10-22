import { inject, Ref } from 'vue'
import { NuiMenuItem } from '../types/NuiMenu'
import { RecursiveMenuState } from '../types/NuiRecursiveMenu'

export function useSubmenuHover(items: Ref<NuiMenuItem[]>, ancestors: Ref<NuiMenuItem[]>) {
    const { handleSubmenuMouseOver, handleSubmenuMouseOut } = inject(
        'menu-state'
    ) as RecursiveMenuState

    // Event handlers for NuiList
    const handleListMouseover = () => {
        ancestors.value.forEach(ancestor => {
            handleSubmenuMouseOver(ancestor)
        })
    }

    const handleListMouseout = () => {
        if (ancestors.value.length > 0) {
            const immediateParent = ancestors.value[ancestors.value.length - 1]
            handleSubmenuMouseOut(immediateParent)
        }
    }

    const handleSubmenuTriggerMouseover = (item: NuiMenuItem) => {
        ancestors.value.forEach(ancestor => {
            handleSubmenuMouseOver(ancestor)
        })
        handleSubmenuMouseOver(item)
    }
    const handleSubmenuTriggerMouseout = (item: NuiMenuItem) => {
        handleSubmenuMouseOut(item)
    }
    const handleSubmenuTriggerClick = (e: MouseEvent) => {
        e.stopImmediatePropagation()
    }

    return {
        handleListMouseover,
        handleListMouseout,
        handleSubmenuTriggerMouseover,
        handleSubmenuTriggerMouseout,
        handleSubmenuTriggerClick
    }
}
