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
    import { inject, PropType, toRef, Ref, ComponentPublicInstance } from 'vue'
    import { useMenuFocus } from '../composables/useMenuFocus'
    import { useSubmenuHover } from '../composables/useSubmenuHover'
    import type { NuiMenuItem } from './NuiMenu.vue'
    import NuiIcon from './NuiIcon.vue'
    import NuiList from './NuiList.vue'
    import NuiListItem from './NuiListItem.vue'
    import NuiPopOver from './NuiPopOver.vue'

    // Define the injected API interface
    export interface RecursiveMenuState {
        openSubmenus: Ref<Record<string, boolean>>
        submenuTimeouts: Ref<Record<string, number>>
        handleSubmenuMouseOver: (item: NuiMenuItem) => void
        handleSubmenuMouseOut: (item: NuiMenuItem) => void
    }

    // Define the interface for the exposed methods of RecursiveMenu
    export interface RecursiveMenuInstance extends ComponentPublicInstance {
        focusFirstItem: () => void
        focusLastItem: () => void
    }

    // Inject the menu state and handlers
    const { openSubmenus } = inject('menu-state') as RecursiveMenuState

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

    const { itemRefs, submenuRecursiveMenuRefs, handleItemKeydown, focusFirstItem, focusLastItem } =
        useMenuFocus(
            toRef(props, 'items'),
            toRef(props, 'ancestors'),
            toRef(props, 'parentListItemRef')
        )

    const {
        handleListMouseover,
        handleListMouseout,
        handleSubmenuTriggerMouseover,
        handleSubmenuTriggerMouseout,
        handleSubmenuTriggerClick
    } = useSubmenuHover(toRef(props, 'items'), toRef(props, 'ancestors'))

    defineExpose({ focusFirstItem, focusLastItem })
</script>

<style lang="css" scoped>
    /* Styles for RecursiveMenu.vue */
    /* This component doesn't have its own specific styles beyond what NuiList/NuiListItem provide */
    /* However, if there were any, they would go here. */
</style>
