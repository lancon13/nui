<template>
    <n-popover ref="popoverRef" :class="compClasses" v-bind="compBind">
        <component :is="props.listTag" :class="['n-list', props.listClass]" role="menu">
            <template v-for="(node, index) in slotDefaultNodes" :key="node.key ?? index">
                <component :is="node" />
            </template>
        </component>
    </n-popover>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { computed, Fragment, h, type HTMLAttributes, useSlots, useTemplateRef, type VNode } from 'vue'
    import { useMenuTransform } from '../composables'
    import NIcon from './NIcon.vue'
    import NListItem from './NListItem.vue'
    import NMenu from './NMenu.vue'
    import NPopover, { type NPopoverProps } from './NPopover.vue'

    export type NMenuDirection = 'top' | 'bottom' | 'left' | 'right'
    export type NMenuPosition = 'start' | '' | 'end'
    export type NMenuItemData = Record<string, any>
    export type NMenuProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NPopoverProps & {
            listTag?: string
            listClass?: string | string[] | object
            items?: NMenuItemData[]
            valueField?: string
            childrenField?: string
            contentField?: string
            triggerByHover?: boolean
            triggerByFocus?: boolean
            triggerByInteraction?: boolean
            allowClickToHide?: boolean
            recursiveTriggers?: boolean
        }

    const defaultSubmenuProps = {
        direction: 'right' as const,
        position: 'start' as const,
        stacked: true
    }

    const slots = useSlots()
    const props = withDefaults(defineProps<NMenuProps>(), {
        tag: 'div',
        listTag: 'ul',
        listClass: 'bg-surface shadowed',
        valueField: 'value',
        childrenField: 'items',
        contentField: 'content',
        triggerByHover: true,
        triggerByFocus: true,
        triggerByInteraction: true,
        allowClickToHide: false,
        recursiveTriggers: false
    })

    const emits = defineEmits<{
        (e: 'select', item: NMenuItemData): void
    }>()

    const popoverRef = useTemplateRef('popoverRef')
    const { transformedNodes } = useMenuTransform(slots, defaultSubmenuProps)

    const compClasses = computed(() => ['n-menu'])
    const compBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const {
            items,
            listTag,
            listClass,
            valueField,
            childrenField,
            contentField,
            triggerByHover,
            triggerByFocus,
            triggerByInteraction,
            allowClickToHide,
            recursiveTriggers,
            ...rest
        } = props

        return {
            ...rest,
            hoverTriggerAnchor: triggerByHover ? props.hoverTriggerAnchor : null,
            focusTriggerAnchor: triggerByFocus ? props.focusTriggerAnchor : null,
            clickTriggerAnchor: triggerByInteraction ? props.clickTriggerAnchor : null,
            attachParent: triggerByInteraction ? props.attachParent : null,
            allowClickToHide
        }
    })

    const createNodesFromData = (items: NMenuItemData[], submenuProps = defaultSubmenuProps): VNode[] => {
        return items.map(item => {
            const {
                [props.contentField]: content,
                [props.childrenField]: subItems,
                onClick: originalOnClick,
                ...rest
            } = item
            const hasSubmenu = !!(subItems && subItems.length)

            const itemProps = {
                key: item.key ?? item.id ?? item[props.valueField],
                ...rest,
                role: 'menuitem',
                'aria-haspopup': hasSubmenu ? 'menu' : undefined,
                onClick: (e: MouseEvent) => {
                    if (originalOnClick && typeof originalOnClick === 'function') {
                        originalOnClick(e)
                    }
                    emits('select', item)
                }
            }

            if (hasSubmenu && !slots['item']) {
                const {
                    hoverTriggerAnchor,
                    focusTriggerAnchor,
                    clickTriggerAnchor,
                    fit,
                    items: _,
                    triggerByHover,
                    triggerByFocus,
                    triggerByInteraction,
                    allowClickToHide,
                    recursiveTriggers,
                    ...otherProps
                } = props

                const recursiveProps = {
                    ...otherProps,
                    ...(props.recursiveTriggers
                        ? {
                              triggerByHover,
                              triggerByFocus,
                              triggerByInteraction,
                              allowClickToHide,
                              recursiveTriggers
                          }
                        : {})
                }

                return h(
                    NListItem,
                    itemProps as any,
                    slots['submenu']
                        ? h(Fragment, null, slots['submenu'](item) ?? [])
                        : {
                              default: () => [
                                  h('span', { class: 'grow' }, content),
                                  h(NMenu as any, {
                                      ...recursiveProps,
                                      ...defaultSubmenuProps,
                                      items: subItems,
                                      ...submenuProps,
                                      onSelect: (subItem: NMenuItemData) => emits('select', subItem)
                                  }),
                                  h(NIcon, {
                                      name: 'mdi-chevron-right',
                                      class: 'ml-8 -mr-2',
                                      'aria-hidden': 'true'
                                  })
                              ]
                          }
                )
            }

            return slots['item']
                ? h(Fragment, null, slots['item'](item) ?? [])
                : h(NListItem, itemProps as any, () => slots['item-content']?.(item) ?? content)
        })
    }

    const slotDefaultNodes = computed(() => {
        return props.items && props.items.length
            ? createNodesFromData(props.items, defaultSubmenuProps)
            : transformedNodes.value
    })

    defineExpose({ popoverRef })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-menu {
            /* Basic menu styles */
        }
    }
</style>
