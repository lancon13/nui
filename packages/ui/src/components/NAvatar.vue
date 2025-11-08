<template>
    <div :class="compClasses" v-bind="$attrs">
        <n-icon v-if="props.icon" :name="props.icon" />
        <span v-else-if="props.label || $slots['default']">
            <slot name="default">{{ props.label }}</slot>
        </span>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import NIcon from './NIcon.vue'

    defineOptions({
        inheritAttrs: false
    })

    const props = defineProps<{
        icon?: string
        label?: string
        // tag?: string
        // iconClass?: string | object | string[]
        // labelClass?: string | object | string[]
    }>()

    const compClasses = computed(() => {
        return ['n-avatar']
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
