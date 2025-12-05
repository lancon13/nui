/* eslint-disable @typescript-eslint/no-explicit-any */
// composables/useMenuTransform.ts
import { computed, h, isVNode, Text, Comment, type Slots, type VNode, type VNodeChild } from 'vue' // <--- Import Text, Comment
import NMenu from '../components/NMenu.vue'
import NListItem from '../components/NListItem.vue'
import NIcon from '../components/NIcon.vue'
import { merge } from 'es-toolkit/object'

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

        // FIX: Skip Text and Comment nodes immediately.
        // We do not want to wrap text nodes in new h() calls with slots.
        if (node.type === Text || node.type === Comment) {
            return node
        }

        // 1. Recursive NMenu
        if (node.type === NMenu) {
            return h(NMenu, merge(defaultSubmenuProps, { ...node.props, ...submenuProps }) as any, {
                default: () => transformNodes(getChildren(node), submenuProps)
            })
        }

        // 2. List Items (NListItem or li)
        if (node.type === NListItem || node.type === 'li') {
            const children = getChildren(node)

            // Check for submenu
            const subMenuIndex = children.findIndex(c => isVNode(c) && (c.type === 'ul' || c.type === NMenu))
            const hasSubMenu = subMenuIndex !== -1

            // Separate content from submenu
            const rawContent = hasSubMenu ? children.filter((_, i) => i !== subMenuIndex) : children

            // Processed content
            const processedContent = transformNodes(rawContent, submenuProps)

            if (hasSubMenu) {
                const subMenuNode = children[subMenuIndex] as VNode
                return h(NListItem, node.props, {
                    default: () => [
                        ...processedContent,
                        h(NMenu, merge(defaultSubmenuProps, { ...node.props, ...submenuProps }) as any, {
                            default: () => transformNodes(getChildren(subMenuNode), submenuProps)
                        }),
                        h(NIcon, { name: 'chevron-right', class: 'ml-8 -mr-2' })
                    ]
                })
            }

            return h(NListItem, node.props, { default: () => processedContent })
        }

        // 3. Generic wrappers (div, etc) -> Recurse deeper
        if (node.children) {
            const children = getChildren(node)
            // Ensure we don't try to recurse into something that shouldn't have slots
            if (children.length) {
                return h(node.type as any, node.props, {
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
