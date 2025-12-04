<template>
    <n-popover v-bind="compBind" class="n-menu">
        <ul :class="['n-list', props.listClass]">
            <template v-for="(node, index) in finalNodes" :key="index">
                <component :is="node" />
            </template>
        </ul>
    </n-popover>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    import { computed, h, HTMLAttributes, useSlots, VNode, isVNode } from 'vue'
    import NIcon from './NIcon.vue'
    import NListItem, { NListItemProps } from './NListItem.vue'
    import NMenu from './NMenu.vue'
    import NPopover, { NPopoverProps } from './NPopover.vue'

    defineOptions({
        inheritAttrs: false
    })

    export type NMenuDirection = 'top' | 'bottom' | 'left' | 'right'
    export type NMenuPosition = 'start' | '' | 'end'
    export type NMenuItemData = NListItemProps & {
        label: string
        onClick?: () => void
        items?: NMenuItemData[]
    }
    export type NMenuProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NPopoverProps & {
            listClass?: string | string[] | object
            items?: NMenuItemData[]
        }

    const slots = useSlots()
    const props = withDefaults(defineProps<NMenuProps>(), {
        tag: 'div',
        listClass: 'bg-surface shadowed'
    })

    const compBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { items, listClass, ...rest } = props
        return rest
    })

    // 1. Define shared props for nested menus to avoid repetition
    const nestedMenuProps = computed(() => ({
        direction: 'right' as const,
        position: 'start' as const,
        listClass: props.listClass,
        stacked: true
    }))

    const createNodesFromData = (items: NMenuItemData[]): VNode[] => {
        return items.map(item => {
            const { label, onClick, items: subItems, ...rest } = item

            if (subItems && subItems.length) {
                return h(
                    NListItem,
                    { ...rest, 'data-has-submenu': true },
                    {
                        default: () => [
                            label,
                            h(NMenu, {
                                ...nestedMenuProps.value,
                                items: subItems
                            }),
                            h(NIcon, {
                                name: 'chevron-right',
                                class: 'ml-8 -mr-2'
                            })
                        ]
                    }
                )
            }

            return h(NListItem, { ...rest, onClick }, { default: () => label })
        })
    }

    const wrappedSlotDefaultNodes = computed(() => {
        // 1. Helper to get raw children array from a node
        const getChildrenArray = (node: VNode): any[] => {
            if (typeof node.children === 'string' || typeof node.children === 'number') {
                return [String(node.children)]
            }
            if (Array.isArray(node.children)) return node.children
            if (typeof node.children === 'object' && node.children !== null) {
                return (node.children as any).default?.() ?? []
            }
            return []
        }

        // 2. Helper to recursively process children
        const mapChildren = (children: VNode['children']): any => {
            if (!children) return null
            if (typeof children === 'string' || typeof children === 'number') return children

            if (Array.isArray(children)) {
                return processNodes(children as VNode[])
            }

            if (typeof children === 'object') {
                const newSlots: Record<string, () => VNode[]> = {}
                for (const key in children) {
                    const slotFn = (children as any)[key]
                    if (typeof slotFn === 'function') {
                        newSlots[key] = () => processNodes(slotFn())
                    }
                }
                return newSlots
            }
            return children
        }

        // 3. Logic to transform specific nodes
        const processNodes = (nodes: any[]): any[] => {
            return nodes.map(node => {
                if (!isVNode(node)) return node

                // Case A: Nested NMenu (Standalone) - force props and recurse
                if (node.type === NMenu) {
                    return h(NMenu, { ...node.props, ...nestedMenuProps.value }, mapChildren(node.children))
                }

                // Case B: NListItem OR Standard <li>
                // Both need to be checked for nested menus to add the Chevron
                if (node.type === NListItem || node.type === 'li') {
                    return transformToListItem(node)
                }

                // Case C: Generic Node - Recurse children
                if (node.children) {
                    return h(node.type as string, node.props, mapChildren(node.children))
                }

                return node
            })
        }

        // 4. Logic to extract <ul>/NMenu from items and add Chevron
        const transformToListItem = (node: VNode): VNode => {
            // Get all children (text, elements, components)
            const rawChildren = [getChildrenArray(node)].flat()

            // Find if there is a nested Submenu (ul or NMenu)
            const subMenuNode = rawChildren.find(c => isVNode(c) && (c.type === 'ul' || c.type === NMenu))

            // The content is everything EXCEPT the submenu
            const contentNodes = rawChildren.filter(c => c !== subMenuNode)

            // Recurse on the content (in case there are other nested components in the text)
            const processedContent = processNodes(contentNodes)

            // If we found a submenu, render NListItem with Content + Menu + Icon
            if (subMenuNode) {
                const subMenuChildren = getChildrenArray(subMenuNode)

                return h(NListItem, node.props, {
                    default: () => [
                        ...processedContent,
                        // Inject the nested NMenu with forced props
                        h(
                            NMenu,
                            { ...props, ...nestedMenuProps.value },
                            { default: () => processNodes(subMenuChildren) }
                        ),
                        // Inject the Chevron
                        h(NIcon, { name: 'chevron-right', class: 'ml-8 -mr-2' })
                    ]
                })
            }

            // No submenu found? Just render NListItem with processed content
            return h(NListItem, node.props, {
                default: () => processedContent
            })
        }

        return processNodes(slots.default?.() ?? [])
    })

    const finalNodes = computed(() => {
        if (props.items && props.items.length) {
            return createNodesFromData(props.items)
        }

        return wrappedSlotDefaultNodes.value
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
