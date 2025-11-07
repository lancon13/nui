import { ref, onBeforeUpdate, nextTick, Ref, inject } from 'vue'
import NuiListItem from '../components/NuiListItem.vue'
import type { NuiMenuItem } from '../components/NuiMenu.vue'
import { RecursiveMenuInstance, RecursiveMenuState } from '../components/RecursiveMenu.vue'

export function useMenuFocus(
    items: Ref<NuiMenuItem[]>,
    ancestors: Ref<NuiMenuItem[]>,
    parentListItemRef: Ref<InstanceType<typeof NuiListItem> | null>
) {
    const { handleSubmenuMouseOver, handleSubmenuMouseOut } = inject(
        'menu-state'
    ) as RecursiveMenuState

    const itemRefs = ref<InstanceType<typeof NuiListItem>[]>([])
    const submenuRecursiveMenuRefs = ref<Record<string, RecursiveMenuInstance | null>>({})

    onBeforeUpdate(() => {
        itemRefs.value = []
    })

    const focusFirstItem = () => {
        if (itemRefs.value.length > 0) {
            itemRefs.value[0].$el.focus()
        }
    }

    const focusLastItem = () => {
        if (itemRefs.value.length > 0) {
            itemRefs.value[itemRefs.value.length - 1].$el.focus()
        }
    }

    const focusNextItem = (currentIndex: number) => {
        if (currentIndex < itemRefs.value.length - 1) {
            itemRefs.value[currentIndex + 1].$el.focus()
        } else {
            focusFirstItem() // Loop around
        }
    }

    const focusPreviousItem = (currentIndex: number) => {
        if (currentIndex > 0) {
            itemRefs.value[currentIndex - 1].$el.focus()
        }
    }

    const handleItemKeydown = (e: KeyboardEvent, item: NuiMenuItem) => {
        const focusedElement = document.activeElement
        const currentItemIndex = itemRefs.value.findIndex(el => el.$el === focusedElement)

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            focusNextItem(currentItemIndex)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            focusPreviousItem(currentItemIndex)
        }
        // Handle Space/ArrowRight/ArrowLeft on submenu triggers
        else if (item.children?.length) {
            // isSubmenuTrigger
            if (e.key === ' ' || e.key === 'ArrowRight') {
                e.preventDefault()
                handleSubmenuMouseOver(item)
                nextTick(() => {
                    const submenuComponent = submenuRecursiveMenuRefs.value[item.value]
                    if (submenuComponent && submenuComponent.focusFirstItem) {
                        submenuComponent.focusFirstItem()
                    }
                })
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                handleSubmenuMouseOut(item)
                if (parentListItemRef.value) {
                    parentListItemRef.value.$el.focus()
                }
            }
        } else if (e.key === 'ArrowLeft') {
            // For final items, ArrowLeft should close current submenu and focus parent
            e.preventDefault()
            if (ancestors.value.length > 0) {
                const immediateParent = ancestors.value[ancestors.value.length - 1]
                handleSubmenuMouseOut(immediateParent)
                if (parentListItemRef.value) {
                    parentListItemRef.value.$el.focus()
                }
            }
        }
    }

    return {
        itemRefs,
        submenuRecursiveMenuRefs,
        handleItemKeydown,
        focusFirstItem,
        focusLastItem
    }
}
