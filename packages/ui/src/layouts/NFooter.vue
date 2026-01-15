<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <slot name="default"></slot>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { computed, HTMLAttributes, useAttrs } from 'vue'
    import { cn } from '../helpers/classes'

    export type NFooterProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NFooterProps>(), {
        tag: 'footer'
    })

    const compClasses = computed(() => {
        return cn('n-footer', attrs.class as any)
    })
    const compBind = computed(() => {
        const { class: _, ...bind } = attrs
        return bind
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/components-index.css';

    @layer components {
        .n-footer {
            @apply w-full
                flex flex-col gap-4;
        }
    }
</style>
