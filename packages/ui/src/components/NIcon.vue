<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind" />
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
            clickable?: boolean
            to?: string | object
            href?: string
            target?: string
        }>(),
        {
            tag: 'i',
            href: '#'
        }
    )

    const iconClasses = computed(() => {
        const name = props.name || 'mdi-account'
        const parts = name.split('-')

        // Assume short prefixes (e.g., 'fs', 'mdi', 'fa') for icon sets
        if (parts.length > 1 && parts[0] === 'mdi') return ['mdi', name]

        // Default to MDI for names without a recognizable prefix
        return ['mdi', `mdi-${name}`]
    })

    const compClasses = computed(() => {
        return ['n-icon', ...(props.clickable ? ['n-icon--clickable'] : []), ...iconClasses.value]
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
        .n-icon {
            @apply inline-block leading-none size-[1em] rounded-element;
        }
    }
</style>
