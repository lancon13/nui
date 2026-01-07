<template>
    <component
        :is="props.tag"
        :class="compClasses"
        :role="isClickable && props.tag === 'div' ? 'button' : undefined"
        :tabindex="isClickable && props.tag === 'div' ? 0 : undefined"
        :aria-disabled="props.disabled ? 'true' : undefined"
        :aria-busy="props.loading ? 'true' : undefined"
        v-bind="compBind"
        @click="handleClick"
        @keydown="handleKeydown"
    >
        <slot v-if="shouldNotAddWrapper" name="default"></slot>
        <div v-else class="n-card-body">
            <slot name="default"></slot>
        </div>

        <slot name="loading">
            <transition name="n-loading-overlay">
                <n-loading
                    v-if="props.loading"
                    :overlay="true"
                    :name="props.loadingName"
                    :class="props.loadingClass"
                    aria-hidden="true"
                />
            </transition>
        </slot>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { isVNodeClassContain } from '../helpers/dom'
    import NLoading from './NLoading.vue'

    export type NCardProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        loading?: boolean
        loadingName?: string
        loadingClass?: string | string[] | object
        to?: string | object
        href?: string
        target?: string
        disabled?: boolean
        onClick?: (e: MouseEvent | KeyboardEvent) => void
    }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NCardProps>(), {
        tag: 'div'
    })

    const isClickable = computed(() => {
        return !props.disabled && (props.to || props.href || !!props.onClick || !!attrs.onClick)
    })

    const compClasses = computed(() => {
        return [
            'n-card',
            props.loading ? 'n-card--loading' : '',
            props.disabled ? 'n-card--disabled' : '',
            isClickable.value ? 'n-card--clickable' : ''
        ]
    })

    const compBind = computed(() => {
        return {
            ...(isClickable.value ? { to: props.to, href: props.href, target: props.target } : {}),
            ...attrs
        }
    })

    // Logic to detect if we should wrap content in .n-card-body
    const shouldNotAddWrapper = computed(() => {
        const nodes = slots['default']?.() ?? []
        if (nodes.length === 0) return false
        if (nodes.length > 0 && isVNodeClassContain(nodes[0], ['n-card-body'])) return true
        return nodes.length > 1
    })

    function handleClick(e: MouseEvent | KeyboardEvent) {
        if (props.disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        if (isClickable.value) {
            props.onClick?.(e)
            // If it's still in attrs (e.g. if we didn't use defineEmits)
            if (attrs.onClick && typeof attrs.onClick === 'function' && attrs.onClick !== props.onClick) {
                ;(attrs.onClick as Function)(e)
            }
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (!isClickable.value) return
        if (['Enter', ' '].includes(e.key)) {
            const target = e.target as HTMLElement
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
                return
            }
            e.preventDefault()
            handleClick(e)
        }
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-card {
            @apply relative
                bg-surface
                rounded-element
                flex flex-col
                overflow-hidden
                transition-all duration-200 ease-in-out;

            /* Content Areas */
            & > .n-card-body {
                @apply px-4 py-4;
                &:has(+ .n-card-footer) {
                    @apply pb-0;
                }
            }

            & > .n-card-header {
                @apply px-4 py-4
                flex flex-row items-center gap-4;
                & + .n-card-body {
                    @apply pt-0;
                }
            }

            & > .n-card-footer {
                @apply px-4 py-4
                flex flex-row items-center gap-4;
            }

            /* Nested Cards Indentation Logic */
            & > .n-card-body > .n-card {
                @apply bg-surface-indent;
                & > .n-card-body > .n-card {
                    @apply bg-surface-indent-indent;
                    & > .n-card-body > .n-card {
                        @apply bg-surface-indent-indent-indent;
                        & > .n-card-body > .n-card {
                            @apply bg-surface-indent-indent-indent-indent;
                        }
                    }
                }
            }

            /* Interaction States */
            &.n-card--clickable {
                @apply cursor-pointer hover:backdrop-brightness-95; /* Subtler hover */
            }

            /* Disabled State */
            &.n-card--disabled {
                @apply opacity-50 cursor-not-allowed grayscale;
                @apply hover:backdrop-brightness-100; /* Reset hover */
            }

            /* Loading State */
            /* Styles handled in NLoading.vue */
        }
    }
</style>
