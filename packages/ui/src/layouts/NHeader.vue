<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <slot name="default"></slot>
    </component>
</template>

<script setup lang="ts">
    import { computed, HTMLAttributes, useAttrs } from 'vue'

    export type NHeaderProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NHeaderProps>(), {
        tag: 'header'
    })

    const compClasses = computed(() => {
        return ['n-header']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-header {
            @apply w-full
                flex flex-row items-center gap-4;
        }
    }
</style>
