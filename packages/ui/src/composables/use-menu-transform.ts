/* eslint-disable @typescript-eslint/no-explicit-any */
// composables/useMenuTransform.ts
import { merge } from 'es-toolkit/object'
import { Comment, computed, Fragment, h, isVNode, Text, type Slots, type VNode, type VNodeChild } from 'vue'
import NIcon from '../components/NIcon.vue'
import NListItem from '../components/NListItem.vue'
import NMenu from '../components/NMenu.vue'
import { isVNodeNameContain } from '../helpers/dom'

// --- Configuration ---
const defaultSubmenuProps = {
    direction: 'right',
    position: 'start',
    stacked: true
}

// --- Pure Helper Functions (Module Scope) ---
function getChildren(node: VNode): VNodeChild[] {
    const { children } = node
    if (typeof children === 'string' || typeof children === 'number') return [String(children)]
    if (Array.isArray(children)) return children
    if (children && typeof children === 'object') {
        if ('default' in children && typeof (children as any).default === 'function') {
            return (children as any).default()
        }
    }
    return []
}

function transformNodes(nodes: VNodeChild[], submenuProps = defaultSubmenuProps): VNodeChild[] {
    return nodes.map(node => {
        if (!isVNode(node)) return node

        if (node.type === Text || node.type === Comment) {
            return node
        }

        // Base props to preserve including ref and key
        const baseProps = {
            ...node.props,
            ref: node.ref ?? undefined,
            key: node.key ?? undefined
        }

        // 1. Recursive NMenu
        if (node.type === NMenu || isVNodeNameContain(node, 'NMenu')) {
            return h(NMenu, merge(defaultSubmenuProps, { ...baseProps, ...submenuProps }) as any, {
                default: () => transformNodes(getChildren(node), submenuProps)
            })
        }

        // Handle Fragments (e.g. v-for loops)
        if (node.type === Fragment) {
            return h(Fragment as any, baseProps as any, transformNodes(getChildren(node), submenuProps))
        }

        // 2. List Items (NListItem or li)
        if (node.type === NListItem || isVNodeNameContain(node, 'NListItem') || node.type === 'li') {
            const children = getChildren(node)

            // Check for submenu
            const subMenuIndex = children.findIndex(
                c => isVNode(c) && (c.type === 'ul' || isVNodeNameContain(c as VNode, ['NMenu', 'NList']))
            )
            const hasSubMenu = subMenuIndex !== -1

            // Separate content from submenu
            const rawContent = hasSubMenu ? children.filter((_, i) => i !== subMenuIndex) : children

            // Processed content
            const processedContent = transformNodes(rawContent, submenuProps)

            // Prepare slots object, preserving existing named slots
            const existingSlots =
                node.children && typeof node.children === 'object' && !Array.isArray(node.children)
                    ? { ...node.children }
                    : {}

            if (hasSubMenu) {
                const subMenuNode = children[subMenuIndex] as VNode
                return h(NListItem, baseProps as any, {
                    ...existingSlots,
                    default: () => [
                        ...processedContent,
                        h(NMenu, merge(defaultSubmenuProps, { ...subMenuNode.props, ...submenuProps }) as any, {
                            default: () => transformNodes(getChildren(subMenuNode), submenuProps)
                        }),
                        h(NIcon, { name: 'chevron-right', class: 'ml-8 -mr-2' })
                    ]
                })
            }

            return h(NListItem, baseProps as any, { ...existingSlots, default: () => processedContent })
        }

        // 3. Generic wrappers (div, etc) -> Recurse deeper
        if (node.children) {
            const children = getChildren(node)
            if (children.length) {
                return h(node.type as any, baseProps as any, {
                    default: () => transformNodes(children, submenuProps)
                })
            }
        }

        return node
    })
}

// --- The Exported Composable ---
export function useMenuTransform(slots: Slots, submenuProps = defaultSubmenuProps) {
    const transformedNodes = computed(() => {
        return transformNodes(slots.default?.() ?? [], submenuProps)
    })

    return {
        transformedNodes
    }
}
