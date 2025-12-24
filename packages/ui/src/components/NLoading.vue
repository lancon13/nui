<template>
    <span v-if="props.overlay" class="n-loading-overlay">
        <n-icon v-bind="compBind" />
    </span>
    <n-icon v-else v-bind="compBind" />
</template>

<script setup lang="ts">
    import { computed, type HTMLAttributes, useAttrs } from 'vue'
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
            class: props.class || 'animate-spin',
            ...attrs
        }
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-loading-overlay {
            @apply absolute inset-0
                flex items-center justify-center z-10
                bg-background-invert/50 text-text-invert;
        }
    }
</style>
