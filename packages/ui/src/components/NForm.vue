<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <slot name="message">
            <n-banner v-if="props.message" :icon="bannerIcon" :class="bannerClasses">{{ props.message }}</n-banner>
        </slot>
        <slot name="default"></slot>
    </component>
</template>

<script setup lang="ts">
    import { computed, HTMLAttributes, useAttrs } from 'vue'
    import NBanner from './NBanner.vue'

    export type NFormProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        message?: string
        status?: 'success' | 'error' | 'warning' | 'info'
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NFormProps>(), {
        tag: 'form',
        status: 'info'
    })

    const compClasses = computed(() => {
        return ['n-form']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })

    const bannerClasses = computed(() => {
        return [props.status]
    })
    const bannerIcon = computed(() => {
        switch (props.status) {
            case 'success':
                return 'check-circle'
            case 'error':
                return 'close-circle'
            case 'info':
                return 'information'
            case 'warning':
                return 'alert-circle'
            default:
                return ''
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
