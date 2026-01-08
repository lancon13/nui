import { VNode } from 'vue';
export declare const getElement: (selector: HTMLElement | string | null, parent?: Document | HTMLElement) => HTMLElement | null;
export declare const getParentElement: (selector?: HTMLElement | string | null) => HTMLElement | null;
export declare const getVNodeName: (node: VNode) => string;
/**
 * Checks if a VNode is a native HTML element with a specific tag name.
 * Returns false for Components, Fragments, or Text nodes.
 * * @param node The VNode to check
 * @param tagName A string or array of strings to match (e.g., 'div', ['span', 'p'])
 */
export declare const isVNodeTagContain: (node: VNode, tagName: string | string[]) => boolean;
/**
 * Checks if a VNode's resolved name matches a specific string or one of an array of strings.
 */
export declare const isVNodeNameContain: (node: VNode, name: string | string[]) => boolean;
/**
 * Checks if a VNode contains a specific CSS class.
 */
export declare const isVNodeClassContain: (node: VNode, className: string | string[]) => boolean;
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
export declare function wrapTextNode(nodes: string | VNode | VNode[] | undefined, tag?: string, props?: Record<string, any>): VNode[];
/**
 * Normalizes Vue class props (string, array, object) into a single flat array.
 * Useful for merging multiple class props (like iconClass + prependIconClass).
 */
export declare function resolveClassProp(...args: (string | object | string[] | undefined | null)[]): any[];
