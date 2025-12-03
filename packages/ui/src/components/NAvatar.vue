<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind" @click="handleClick">
        <n-icon v-if="props.icon" :name="props.icon" />
        <span v-else-if="props.label || $slots['default']">
            <slot name="default">{{ props.label }}</slot>
        </span>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, getCurrentInstance, HTMLAttributes, useAttrs } from 'vue'
    import NIcon from './NIcon.vue'

    export type NAvatarProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        icon?: string
        label?: string
        tag?: string
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
    const props = withDefaults(defineProps<NAvatarProps>(), {
        tag: 'span'
    })

    const emits = defineEmits<(event: 'click', e: MouseEvent) => void>()

    const isClickable = computed(() => {
        return props.to || props.href || !!instance?.vnode.props?.onClick
    })

    const compClasses = computed(() => {
        return ['n-avatar', isClickable.value ? 'n-avatar--clickable' : '', props.disabled ? 'n-avatar--disabled' : '']
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
        .n-avatar {
            @apply relative 
                aspect-square
                inline-flex items-center justify-center
                bg-text text-text-invert 
                text-center
                font-semibold leading-none
                p-2.5
                rounded-element;
            & > span {
                @apply block aspect-square w-[1em];
            }

            &.primary {
                @apply bg-primary;
            }
            &.success {
                @apply bg-success;
            }
            &.error {
                @apply bg-error;
            }
            &.warning {
                @apply bg-warning;
            }
            &.info {
                @apply bg-info;
            }

            &.n-avatar--clickable {
                &.n-avatar--disabled,
                [class*='--clickable']&.n-avatar--disabled,
                a[href]&.n-avatar--disabled {
                    @apply backdrop-brightness-100;
                    @apply ring-0;
                    @apply opacity-50 hover:opacity-50 cursor-not-allowed grayscale;
                }
            }
        }
    }
</style>
