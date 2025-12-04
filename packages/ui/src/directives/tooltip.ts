/* eslint-disable @typescript-eslint/no-explicit-any */
import { createVNode, render, type Directive, type VNode } from 'vue'
import NTooltip, { type NTooltipProps, type NTooltipDirection } from '../components/NTooltip.vue'

// Helper to ensure the teleport container exists
const ensureTooltipContainer = () => {
    const containerId = 'n-tooltips-container'
    if (!document.getElementById(containerId)) {
        const container = document.createElement('div')
        container.id = containerId
        document.body.appendChild(container)
    }
}

type TooltipElement = HTMLElement & {
    _tooltip?: {
        vnode: VNode
        container: HTMLElement
    }
}

const mountTooltip = (el: TooltipElement, binding: any) => {
    const content = binding.value
    if (!content) {
        return
    }

    ensureTooltipContainer()

    const modifiers = Object.keys(binding.modifiers)
    const direction = (modifiers.find(m => ['top', 'bottom', 'left', 'right'].includes(m)) ||
        'top') as NTooltipDirection

    const props: NTooltipProps = {
        content,
        direction,
        attachParent: el,
        hoverTriggerAnchor: el,
        focusTriggerAnchor: el
    }

    const vnode = createVNode(NTooltip, props)
    const container = document.createElement('div')
    document.body.appendChild(container)
    render(vnode, container)

    el._tooltip = {
        vnode,
        container
    }
}

const unmountTooltip = (el: TooltipElement) => {
    if (!el._tooltip) {
        return
    }

    render(null, el._tooltip.container)
    el._tooltip.container.remove()
    delete el._tooltip
}

const updateTooltip = (el: TooltipElement, binding: any) => {
    if (el._tooltip && el._tooltip.vnode.component) {
        const { props } = el._tooltip.vnode.component
        props.content = binding.value
        const modifiers = Object.keys(binding.modifiers)
        props.direction = (modifiers.find(m => ['top', 'bottom', 'left', 'right'].includes(m)) ||
            'top') as NTooltipDirection
    } else {
        unmountTooltip(el)
        mountTooltip(el, binding)
    }
}

export const vTooltip: Directive = {
    mounted(el, binding) {
        mountTooltip(el, binding)
    },
    updated(el, binding) {
        updateTooltip(el, binding)
    },
    unmounted(el) {
        unmountTooltip(el)
    }
}
