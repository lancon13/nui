<template>
    <span v-if="props.overlay" class="n-loading-overlay">
        <n-icon v-bind="compBind" />
    </span>
    <n-icon v-else v-bind="compBind" />
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { computed, type HTMLAttributes, useAttrs } from 'vue'
    import { cn } from '../helpers/classes'
    import NIcon from './NIcon.vue'

    export type NLoadingProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        name?: string
        class?: string | string[] | object
        overlay?: boolean
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NLoadingProps>(), {})
    const compBind = computed(() => {
        return {
            name: props.name || 'loading',
            class: cn('animate-spin', props.class),
            ...attrs
        }
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/components-index.css';

    @layer components {
        .n-loading-overlay {
            @apply absolute inset-0
                flex items-center justify-center z-10
                bg-background-invert/50 text-text-invert;

            &.n-loading-overlay-enter-active,
            &.n-loading-overlay-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
            }
            &.n-loading-overlay-enter-from,
            &.n-loading-overlay-leave-to {
                @apply opacity-0;
            }
        }
    }
</style>
