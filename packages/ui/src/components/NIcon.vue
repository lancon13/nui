<template>
    <i :class="compClasses" v-bind="$attrs" />
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    defineOptions({
        inheritAttrs: false
    })

    const props = defineProps<{
        name: string
    }>()

    const iconClasses = computed(() => {
        const name = props.name || 'mdi-account'
        const parts = name.split('-')

        // Assume short prefixes (e.g., 'fs', 'mdi', 'fa') for icon sets
        if (parts.length > 1 && parts[0] === 'mdi') return ['mdi', name]

        // Default to MDI for names without a recognizable prefix
        return ['mdi', `mdi-${name}`]
    })

    const compClasses = computed(() => {
        return ['n-icon', ...iconClasses.value]
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-icon {
            @apply relative leading-none;
            &::before {
                @apply !leading-0;
            }
        }
    }
</style>
