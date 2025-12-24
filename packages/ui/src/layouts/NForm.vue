<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <slot name="default"></slot>
    </component>
</template>

<script setup lang="ts">
    import { computed, HTMLAttributes, useAttrs } from 'vue'

    export type NFormProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NFormProps>(), {
        tag: 'form'
    })

    const compClasses = computed(() => {
        return ['n-form']
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
        .n-form {
            @apply w-full
                flex flex-col gap-4;
        }
    }
</style>
