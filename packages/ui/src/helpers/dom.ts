/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentInstance, h, isVNode, VNode } from 'vue'

interface ComponentTypeWithName {
    __name__: string | undefined
    name?: string
    __name?: string
}

export const getElement = (selector: HTMLElement | string | null, parent = document): HTMLElement | null => {
    if (typeof selector === 'string') {
        return parent.querySelector(selector)
    }
    return selector
}

export const getParentElement = (selector: HTMLElement | string | null = null): HTMLElement | null => {
    if (selector) {
        return getElement(selector)?.parentElement || null
    }
    const instance = getCurrentInstance()
    if (!instance) {
        console.warn('getParentElement() without a selector can only be used inside setup() or lifecycle hooks.')
        return null
    }
    return instance.proxy?.$el?.parentElement || null
}

export const getVNodeName = (node: VNode): string => {
    if (isVNode(node) && node.type) {
        if (typeof node.type === 'string') {
            return node.type
        } else if (typeof node.type === 'object' && node.type !== null) {
            const componentType = node.type as ComponentTypeWithName
            return componentType.name || componentType.__name || componentType.__name__ || ''
        }
    }
    return ''
}

/**
 * Checks if a VNode is a native HTML element with a specific tag name.
 * Returns false for Components, Fragments, or Text nodes.
 * * @param node The VNode to check
 * @param tagName A string or array of strings to match (e.g., 'div', ['span', 'p'])
 */
export const isVNodeTagContain = (node: VNode, tagName: string | string[]): boolean => {
    // 1. If node.type is not a string, it is not a native HTML tag
    // (It might be a Component, Symbol, or Comment)
    if (typeof node.type !== 'string') {
        return false
    }

    // 2. Normalize input to array
    const targetTags = Array.isArray(tagName) ? tagName : [tagName]

    // 3. Check for match
    return targetTags.includes(node.type)
}

/**
 * Checks if a VNode's resolved name matches a specific string or one of an array of strings.
 */
export const isVNodeNameContain = (node: VNode, name: string | string[]): boolean => {
    // 1. Get the resolved name using your helper
    const nodeName = getVNodeName(node)

    // 2. If no name was resolved, we can't match
    if (!nodeName) return false

    // 3. Normalize input to an array for easy checking
    const namesToCheck = Array.isArray(name) ? name : [name]

    // 4. Check for exact match
    return namesToCheck.includes(nodeName)
}

/**
 * Checks if a VNode contains a specific CSS class.
 */
export const isVNodeClassContain = (node: VNode, className: string | string[]): boolean => {
    // 1. Safety check: ensure props and class exist
    if (!node.props || typeof node.props.class !== 'string') {
        return false
    }

    // 2. Split class string into an array (handle multiple spaces)
    const nodeClasses = node.props.class.split(/\s+/)

    // 3. Normalize input to an array
    const classesToCheck = Array.isArray(className) ? className : [className]

    // 4. Check if ANY of the target classes exist on the node
    return classesToCheck.some(cls => nodeClasses.includes(cls))
}

/**
 * Wraps meaningful text content (strings and non-empty Text nodes) in a specified HTML tag.
 * Preserves Elements, Components, and whitespace-only Text nodes without modification.
 *
 * This is useful for styling mixed content slots where you want to target text specifically
 * without breaking the structure of existing components or elements.
 *
 * @param {string | VNode | VNode[] | undefined} nodes - The content to process. Usually coming from `slots.default()`.
 * @param {string} [tag='span'] - The HTML tag to wrap the text with.
 * @param {Record<string, any>} [props={}] - Attributes or props to apply to the wrapper tag (e.g., `{ class: 'text-bold' }`).
 * @returns {VNode[]} A normalized array of VNodes with text content wrapped.
 *
 * @example
 * // If slots.default() returns: [Text("Hello "), h('span', "World"), Text("\n")]
 * // And we call: wrapTextNode(slots.default(), 'strong', { class: 'highlight' })
 *
 * // The result will be:
 * // [
 * //   h('strong', { class: 'highlight' }, "Hello "), // Wrapped
 * //   h('span', "World"),                            // Left alone (Element)
 * //   Text("\n")                                     // Left alone (Whitespace)
 * // ]
 */
export function wrapTextNode(
    nodes: string | VNode | VNode[] | undefined,
    tag = 'span',
    props: Record<string, any> = {}
): VNode[] {
    if (!nodes) return []

    // Ensure we always work with an array
    const nodeList = Array.isArray(nodes) ? nodes : [nodes]

    return nodeList.map(node => {
        // 1. Handle raw strings (always wrap)
        if (typeof node === 'string') {
            return h(tag, props, node)
        }

        // 2. Handle Vue Text Nodes
        // We only wrap if there is meaningful content (not just whitespace)
        if (node.type === Text) {
            const content = node.children as string
            if (content?.trim()) {
                return h(tag, props, content)
            }
        }

        // 3. Return everything else as-is (Elements, Components, empty Text)
        return node
    })
}
