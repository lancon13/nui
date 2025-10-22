<template>
    <nui-list
        shadow
        :offset="[0, 0]"
        @mouseover="handleListMouseover"
        @mouseout="handleListMouseout"
    >
        <template v-for="(item, index) in props.items" :key="item.value">
            <nui-list-item
                :ref="
                    el => {
                        if (el && '$el' in el) {
                            itemRefs[index] = el as InstanceType<typeof NuiListItem>
                        }
                    }
                "
                hoverable
                focusable
                clickable
                :class="{ 'has-submenu': item.children?.length }"
                @keydown="handleItemKeydown($event, item)"
                @click="
                    item.children?.length
                        ? handleSubmenuTriggerClick($event)
                        : item.onClick?.($event)
                "
                @focus="!item.children?.length ? item.onFocus?.($event) : null"
                @blur="!item.children?.length ? item.onBlur?.($event) : null"
                @mouseover="
                    item.children?.length
                        ? handleSubmenuTriggerMouseover(item)
                        : item.onMouseOver?.($event)
                "
                @mouseout="
                    item.children?.length
                        ? handleSubmenuTriggerMouseout(item)
                        : item.onMouseOut?.($event)
                "
            >
                <span class="nui-menu__item-label">{{ item.label }}</span>
                <nui-icon
                    v-if="item.children?.length"
                    name="chevron-right"
                    class="nui-menu__item-icon"
                />
                <nui-pop-over
                    v-if="item.children?.length"
                    v-model="openSubmenus[item.value]"
                    display-position="right"
                    anchor-position="start"
                    class="nui-menu__submenu"
                    nested
                >
                    <recursive-menu
                        :ref="
                            el => {
                                if (el && '$el' in el) {
                                    submenuRecursiveMenuRefs[item.value] =
                                        el as unknown as RecursiveMenuInstance
                                } else {
                                    submenuRecursiveMenuRefs[item.value] = null
                                }
                            }
                        "
                        :items="item.children"
                        :ancestors="[...props.ancestors, item]"
                        :parent-list-item-ref="itemRefs[index]"
                    />
                </nui-pop-over>
            </nui-list-item>
        </template>
    </nui-list>
</template>

<script setup lang="ts">
    import {
        ref,
        onBeforeUpdate,
        nextTick,
        inject,
        Ref,
        PropType,
        ComponentPublicInstance
    } from 'vue'
    import NuiPopOver from './NuiPopOver.vue'
    import NuiList from './NuiList.vue'
    import NuiListItem from './NuiListItem.vue'
    import NuiIcon from './NuiIcon.vue'

    // Define NuiMenuItem interface (needs to be imported or defined here)
    export interface NuiMenuItem {
        label: string
        value: string
        onClick?: (payload: MouseEvent) => void
        onFocus?: (payload: FocusEvent) => void
        onBlur?: (payload: FocusEvent) => void
        onMouseOver?: (payload: MouseEvent) => void
        onMouseOut?: (payload: MouseEvent) => void
        children?: NuiMenuItem[]
    }

    // Define the injected API interface
    interface RecursiveMenuState {
        openSubmenus: Ref<Record<string, boolean>>
        submenuTimeouts: Ref<Record<string, number>>
        handleSubmenuMouseOver: (item: NuiMenuItem) => void
        handleSubmenuMouseOut: (item: NuiMenuItem) => void
    }

    // Define the interface for the exposed methods of RecursiveMenu
    interface RecursiveMenuInstance extends ComponentPublicInstance {
        focusFirstItem: () => void
        focusLastItem: () => void
    }

    // Inject the menu state and handlers
    const { openSubmenus, handleSubmenuMouseOver, handleSubmenuMouseOut } = inject(
        'menu-state'
    ) as RecursiveMenuState

    // Props for this component
    const props = defineProps({
        items: {
            type: Array as PropType<NuiMenuItem[]>,
            required: true
        },
        ancestors: {
            type: Array as PropType<NuiMenuItem[]>,
            required: true
        },
        parentListItemRef: {
            type: Object as PropType<InstanceType<typeof NuiListItem> | null>,
            default: null
        }
    })

    const itemRefs = ref<InstanceType<typeof NuiListItem>[]>([]) // To hold refs to NuiListItem
    const submenuRecursiveMenuRefs = ref<Record<string, RecursiveMenuInstance | null>>({})

    // Ensure itemRefs is reset before each update
    onBeforeUpdate(() => {
        itemRefs.value = []
    })

    // Focus management methods
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

    defineExpose({ focusFirstItem, focusLastItem }) // Expose methods for parent components

    // Event handlers for NuiList
    const handleListMouseover = () => {
        props.ancestors.forEach(ancestor => {
            handleSubmenuMouseOver(ancestor)
        })
    }

    const handleListMouseout = () => {
        if (props.ancestors.length > 0) {
            const immediateParent = props.ancestors[props.ancestors.length - 1]
            handleSubmenuMouseOut(immediateParent)
        }
    }

    // Event handler for NuiListItem keydown
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
                if (props.parentListItemRef) {
                    props.parentListItemRef.$el.focus()
                }
            }
        } else if (e.key === 'ArrowLeft') {
            // For final items, ArrowLeft should close current submenu and focus parent
            e.preventDefault()
            if (props.ancestors.length > 0) {
                const immediateParent = props.ancestors[props.ancestors.length - 1]
                handleSubmenuMouseOut(immediateParent)
                if (props.parentListItemRef) {
                    props.parentListItemRef.$el.focus()
                }
            }
        }
    }

    const handleSubmenuTriggerMouseover = (item: NuiMenuItem) => {
        props.ancestors.forEach(ancestor => {
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
</script>

<style lang="css" scoped>
    /* Styles for RecursiveMenu.vue */
    /* This component doesn't have its own specific styles beyond what NuiList/NuiListItem provide */
    /* However, if there were any, they would go here. */
</style>
