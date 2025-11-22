<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <slot name="default" />
    </component>
</template>

<script setup lang="ts">
    import { computed, useAttrs } from 'vue'

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(
        defineProps<{
            name: string
            tag?: string
        }>(),
        {
            tag: 'button'
        }
    )

    const compClasses = computed(() => {
        return ['n-tab']
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
        .n-tab {
            @apply relative appearance-none
                cursor-pointer
                inline-flex flex-row gap-2 items-center
                flex-nowrap
                bg-text text-text-invert
                font-semibold leading-none
                outline-0
                px-4 py-2
                transition-all duration-200 ease-in-out;
            @apply hover:opacity-80;
            @apply disabled:opacity-80 disabled:hover:opacity-80 disabled:cursor-not-allowed;

            &:first-child {
                @apply rounded-s-element;
            }
            &:last-child {
                @apply rounded-e-element;
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
            &.n-tab--active {
                @apply bg-text/50 z-10;
            }
        }
    }
</style>
