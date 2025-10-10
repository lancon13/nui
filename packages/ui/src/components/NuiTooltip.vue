<template>
    <div
        ref="tooltipRef"
        role="tooltip"
        :class="compClasses"
        :style="compStyles"
    >
        <slot>
            <div v-if="html" v-html="html" />
            <div v-else>{{ text }}</div>
        </slot>
    </div>
</template>

<script lang="ts" setup>
    import { computed, ref, watch, onMounted, onUnmounted } from 'vue'

    export interface NuiTooltipProps {
        text?: string
        html?: string
        position?: 'top' | 'bottom' | 'left' | 'right'
        modelValue?: boolean | null
        showDelay?: number
        hideDelay?: number
        persistent?: boolean
        triggerParent?: HTMLElement | string | null
        attachParent?: HTMLElement | string | null
        offset?: [string|number, string|number]
        size?: 'small' | 'medium' | 'large'
    }

    const props = withDefaults(defineProps<NuiTooltipProps>(), {
        text: '',
        html: '',
        position: 'bottom',
        modelValue: null,
        showDelay: 0,
        hideDelay: 0,
        persistent: false,
        triggerParent: null,
        attachParent: null,
        offset: () => [0, 0],
        size: 'medium',
    })

    const emit = defineEmits(['update:modelValue'])

    const tooltipRef = ref<HTMLElement>()
    const isVisible = ref(false)
    let showTimeoutId: number | undefined
    let hideTimeoutId: number | undefined

    let triggerEl: HTMLElement | null = null
    let attachEl: HTMLElement | null = null
    let placeholder: HTMLElement | null = null
    let originalParent: Node | null = null
    let originalNextSibling: Node | null = null
    let originalPosition: string | undefined

    const attachEvents = (element: HTMLElement) => {
        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
    }

    const detachEvents = (element: HTMLElement) => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
    }

    onMounted(() => {
        // Determine trigger element
        if (props.triggerParent)
            if (typeof props.triggerParent === 'string')
                triggerEl = document.querySelector(props.triggerParent)
            else
                triggerEl = props.triggerParent
        else
            triggerEl = tooltipRef.value?.parentElement || null
        

        // Determine attach element
        if (props.attachParent)
            if (typeof props.attachParent === 'string')
                attachEl = document.querySelector(props.attachParent)
            else
                attachEl = props.attachParent
        else
            attachEl = tooltipRef.value?.parentElement || null
        

        if (triggerEl)
            attachEvents(triggerEl)
        
        if (attachEl) {
            const tooltipEl = tooltipRef.value
            if (tooltipEl) {
                originalParent = tooltipEl.parentNode
                originalNextSibling = tooltipEl.nextSibling

                originalPosition = attachEl.style.position
                if (window.getComputedStyle(attachEl).position === 'static')
                    attachEl.style.position = 'relative'
                
                placeholder = document.createElement('div')
                placeholder.className = 'nui-tooltip-placeholder'
                
                placeholder.appendChild(tooltipEl)
                attachEl.appendChild(placeholder)
            }
        }
    })

    onUnmounted(() => {
        if (triggerEl)
            detachEvents(triggerEl)
        
        if (attachEl && originalPosition !== undefined)
            attachEl.style.position = originalPosition
        
        
        const tooltipEl = tooltipRef.value
        if (placeholder && tooltipEl && originalParent) {
            originalParent.insertBefore(tooltipEl, originalNextSibling)
            placeholder.parentNode?.removeChild(placeholder)
        }
    })

    watch(() => props.modelValue, (value) => {
        if (value !== null)
            isVisible.value = value
    })

    const handleMouseEnter = () => {
        if (props.modelValue !== null) return

        if (hideTimeoutId) clearTimeout(hideTimeoutId)
        if (showTimeoutId) clearTimeout(showTimeoutId)

        showTimeoutId = window.setTimeout(() => {
            isVisible.value = true
            emit('update:modelValue', true)
        }, props.showDelay)
    }

    const handleMouseLeave = () => {
        if (props.modelValue !== null) return
        if (props.persistent) return

        if (showTimeoutId) clearTimeout(showTimeoutId)
        if (hideTimeoutId) clearTimeout(hideTimeoutId)

        hideTimeoutId = window.setTimeout(() => {
            isVisible.value = false
            emit('update:modelValue', false)
        }, props.hideDelay)
    }

    const compClasses = computed(() => [
        'nui-tooltip',
        `nui-tooltip--position-${props.position}`,
        `nui-tooltip--size-${props.size}`,
        {
            'nui-tooltip--visible': isVisible.value
        }
    ])

    const compStyles = computed(() => {
        const [offsetX, offsetY] = props.offset

        return {
            '--tw-translate-x-offset': `${offsetX}px`,
            '--tw-translate-y-offset': `${offsetY}px`,
        }
    })

    const show = () => {
        isVisible.value = true
        emit('update:modelValue', true)
    }

    const hide = () => {
        isVisible.value = false
        emit('update:modelValue', false)
    }
    defineExpose({ show, hide })

</script>

<style lang="css">
@import "tailwindcss";
@import "../styles/index.css";
@import "../styles/components.css";

@layer components {
    .nui-tooltip {
        @apply absolute z-10
            bg-[var(--nui-tooltip-background)] text-[var(--nui-tooltip-text-color)]
            rounded-[var(--nui-tooltip-radius)]
            text-[length:var(--nui-tooltip-font-size)] leading-base
            px-[var(--nui-tooltip-padding-x)] py-[var(--nui-tooltip-padding-y)]
            font-normal
            whitespace-nowrap
            opacity-0
            transition duration-200 ease-in-out;

        /* Visible */
        &.nui-tooltip--visible {
            @apply opacity-100;
        }

        /* Top */
        &.nui-tooltip--position-top {
            @apply bottom-full left-1/2 mb-xs;
            @apply translate-x-[calc(-50%+var(--tw-translate-x-offset,0px))] translate-y-[calc(var(--tw-translate-y-offset,0px)+10px)];

            &.nui-tooltip--visible {
                @apply translate-x-[calc(-50%+var(--tw-translate-x-offset,0px))] translate-y-[var(--tw-translate-y-offset,0px)];
            }
        }

        /* Bottom */
        &.nui-tooltip--position-bottom {
            @apply top-full left-1/2 mt-xs;
            @apply translate-x-[calc(-50%+var(--tw-translate-x-offset,0px))] translate-y-[calc(var(--tw-translate-y-offset,0px)-10px)];

            &.nui-tooltip--visible {
                @apply translate-x-[calc(-50%+var(--tw-translate-x-offset,0px))] translate-y-[var(--tw-translate-y-offset,0px)];
            }
        }

        /* Left */
        &.nui-tooltip--position-left {
            @apply right-full top-1/2 mr-xs;
            @apply translate-x-[calc(var(--tw-translate-x-offset,0px)+10px)] translate-y-[calc(-50%+var(--tw-translate-y-offset,0px))];

            &.nui-tooltip--visible {
                @apply translate-x-[var(--tw-translate-x-offset,0px)] translate-y-[calc(-50%+var(--tw-translate-y-offset,0px))];
            }
        }

        /* Right */
        &.nui-tooltip--position-right {
            @apply left-full top-1/2 ml-xs;
            @apply translate-x-[calc(var(--tw-translate-x-offset,0px)-10px)] translate-y-[calc(-50%+var(--tw-translate-y-offset,0px))];

            &.nui-tooltip--visible {
                @apply translate-x-[var(--tw-translate-x-offset,0px)] translate-y-[calc(-50%+var(--tw-translate-y-offset,0px))];
            }
        }
    }
}
</style>