<template>
    <span v-if="props.overlay" class="n-loading-overlay">
        <n-icon v-bind="compBind" />
    </span>
    <n-icon v-else v-bind="compBind" />
</template>

<script setup lang="ts">
    import { computed, HTMLAttributes, useAttrs } from 'vue'
    import NIcon from './NIcon.vue'

    export type NLoadingProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        type?: string
        name?: string
        class?: string | string[] | object
        overlay?: boolean
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NLoadingProps>(), {
        type: 'normal',
        class: 'text-3xl'
    })

    const compBind = computed(() => {
        let name = ''
        let iconClass = ''
        let animation = ''
        switch (props.type) {
            case 'normal':
                name = 'loading'
                animation = 'animate-spin'
                iconClass = ''
                break
        }

        return {
            name: props.name || name,
            class: [animation, iconClass, props.class],
            ...attrs
        }
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-loading-overlay {
            @apply absolute inset-0  flex items-center justify-center z-10 bg-bg-invert/50 text-text-invert;
        }
    }
</style>
