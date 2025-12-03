<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind" @click="handleClick">
        <slot name="default"></slot>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, getCurrentInstance, HTMLAttributes, useAttrs } from 'vue'

    export type NIconProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        name: string
        tag?: string
        clickable?: boolean
        to?: string | object
        href?: string
        target?: string
        disabled?: boolean
    }

    defineOptions({
        inheritAttrs: false
    })

    const instance = getCurrentInstance()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NIconProps>(), {
        tag: 'i'
    })

    const emits = defineEmits<(event: 'click', e: MouseEvent) => void>()

    const isClickable = computed(() => {
        return props.to || props.href || !!instance?.vnode.props?.onClick
    })

    const iconClasses = computed(() => {
        const name = props.name || 'mdi-account'
        const parts = name.split('-')

        // Assume short prefixes (e.g., 'fs', 'mdi', 'fa') for icon sets
        if (parts.length > 1 && parts[0] === 'mdi') return ['mdi', name]

        // Default to MDI for names without a recognizable prefix
        return ['mdi', `mdi-${name}`]
    })

    const compClasses = computed(() => {
        return [
            'n-icon',
            isClickable.value ? 'n-icon--clickable' : '',
            props.disabled ? 'n-icon--disabled' : '',
            ...iconClasses.value
        ]
    })
    const compBind = computed(() => {
        return {
            ...(isClickable.value
                ? { tabindex: 0, role: 'button', to: props.to, href: props.href, target: props.target }
                : {}),
            ...attrs
        }
    })

    function handleClick(e: MouseEvent) {
        if (props.disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        emits('click', e)
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-icon {
            @apply inline-block leading-none size-[1em] rounded-element;

            &.n-icon--clickable {
                &.n-icon--disabled,
                [class*='--clickable']&.n-icon--disabled,
                a[href]&.n-icon--disabled {
                    @apply ring-0;
                    @apply opacity-80 hover:opacity-80 cursor-not-allowed contrast-0 grayscale;
                }
            }
        }
    }
</style>
