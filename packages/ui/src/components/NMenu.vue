<template>
    <n-popover :class="compClasses" v-bind="compBind">
        <component :is="props.listTag" :class="['n-list', props.listClass]">
            <template v-for="(node, index) in slotDefaultNodes" :key="index">
                <component :is="node" />
            </template>
        </component>
    </n-popover>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    import { computed, Fragment, h, HTMLAttributes, useSlots, VNode } from 'vue'
    import { useMenuTransform } from '../composables'
    import NIcon from './NIcon.vue'
    import NListItem, { NListItemProps } from './NListItem.vue'
    import NMenu from './NMenu.vue'
    import NPopover, { NPopoverProps } from './NPopover.vue'
    import { merge } from 'es-toolkit/object'

    export type NMenuDirection = 'top' | 'bottom' | 'left' | 'right'
    export type NMenuPosition = 'start' | '' | 'end'
    export type NMenuItemData = Record<string, any> & Partial<NListItemProps>
    export type NMenuProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NPopoverProps & {
            listTag?: string
            listClass?: string | string[] | object
            items?: NMenuItemData[]
        }
    const defaultSubmenuProps = {
        direction: 'right',
        position: 'start',
        stacked: true
    }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const props = withDefaults(defineProps<NMenuProps>(), {
        tag: 'div',
        listTag: 'ul',
        listClass: 'bg-surface shadowed'
    })

    const { transformedNodes } = useMenuTransform(slots, defaultSubmenuProps)
    const compClasses = computed(() => {
        return ['n-menu']
    })
    const compBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { items, listTag, listClass, ...rest } = props
        return rest
    })

    const createNodesFromData = (items: NMenuItemData[], submenuProps = defaultSubmenuProps): VNode[] => {
        return items.map(item => {
            const { content, items: subItems, ...rest } = item

            if (subItems?.length) {
                return slots['item']
                    ? h(Fragment, null, slots['item'](item) ?? [])
                    : h(
                          NListItem,
                          { ...(rest as any), 'data-has-submenu': true },
                          slots['submenu']
                              ? h(Fragment, null, slots['submenu'](item) ?? [])
                              : {
                                    default: () => [
                                        content,
                                        h(
                                            NMenu,
                                            merge(defaultSubmenuProps, {
                                                ...props,
                                                items: subItems,
                                                ...submenuProps
                                            }) as any
                                        ),
                                        h(NIcon, {
                                            name: 'chevron-right',
                                            class: 'ml-8 -mr-2'
                                        })
                                    ]
                                }
                      )
            }

            return slots['item']
                ? h(Fragment, null, slots['item'](item) ?? [])
                : h(NListItem, { ...(rest as any) }, () => slots['item-content']?.(item) ?? content)
        })
    }

    const slotDefaultNodes = computed(() => {
        return props.items && props.items.length
            ? createNodesFromData(props.items, defaultSubmenuProps)
            : transformedNodes.value
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-menu {
            /* TBA */
        }
    }
</style>
