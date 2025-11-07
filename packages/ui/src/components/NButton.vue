<template>
    <button :class="compClasses" v-bind="$attrs">
        <slot name="prepend"></slot>
        <slot name="default" />
        <slot name="append"></slot>
    </button>
</template>

<script lang="ts" setup>
    import { computed } from 'vue'

    defineOptions({
        inheritAttrs: false
    })

    const props = defineProps<{}>()

    const compClasses = computed(() => {
        return ['n-button']
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-button {
            @apply relative appearance-none;
        }
    }
</style>
