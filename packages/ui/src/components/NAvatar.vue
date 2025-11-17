<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <n-icon v-if="props.icon" :name="props.icon" />
        <span v-else-if="props.label || $slots['default']">
            <slot name="default">{{ props.label }}</slot>
        </span>
    </component>
</template>

<script setup lang="ts">
    import { computed, useAttrs } from 'vue'
    import NIcon from './NIcon.vue'

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(
        defineProps<{
            icon?: string
            label?: string
            tag?: string
            clickable?: boolean
            to?: string | object
            href?: string
            target?: string
        }>(),
        {
            tag: 'span',
            href: '#'
        }
    )

    const compClasses = computed(() => {
        return ['n-avatar', ...(props.clickable ? ['n-avatar--clickable'] : [])]
    })
    const compBind = computed(() => {
        return {
            ...(props.clickable
                ? { tabindex: 0, role: 'button', to: props.to, href: props.href, target: props.target }
                : {}),
            ...attrs
        }
    })
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
        }
    }
</style>
