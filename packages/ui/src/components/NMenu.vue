<template>
    <n-popover v-bind="$props" class="n-menu">
        <ul :class="['n-list', props.listClass]">
            <template v-for="(node, index) in wrappedSlotDefaultNodes" :key="index">
                <component :is="node" />
            </template>
        </ul>
    </n-popover>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    import { computed, h, HTMLAttributes, useSlots, VNode, isVNode } from 'vue'
    import NIcon from './NIcon.vue'
    import NListItem from './NListItem.vue'
    import NMenu from './NMenu.vue'
    import NPopover, { NPopoverProps } from './NPopover.vue'

    // ... [Keep your defineOptions and types here] ...

    defineOptions({
        inheritAttrs: false
    })

    export type NMenuDirection = 'top' | 'bottom' | 'left' | 'right'
    export type NMenuPosition = 'start' | '' | 'end'
    export type NMenuProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NPopoverProps & {
            listClass?: string | string[] | object
        }

    const slots = useSlots()
    const props = withDefaults(defineProps<NMenuProps>(), {
        tag: 'div',
        listClass: 'bg-surface shadowed'
    })

    // 1. Define shared props for nested menus to avoid repetition
    const nestedMenuProps = computed(() => ({
        direction: 'right' as const,
        position: 'start' as const,
        listClass: props.listClass,
        stacked: true
    }))

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
