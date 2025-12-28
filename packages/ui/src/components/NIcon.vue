<template>
    <component
        :is="props.tag"
        :class="compClasses"
        :role="isClickable ? 'button' : 'img'"
        :tabindex="isClickable ? 0 : undefined"
        :aria-disabled="props.disabled ? 'true' : undefined"
        v-bind="compBind"
        @click="handleClick"
        @keydown.enter.space.prevent="handleClick"
    >
        <slot name="default" />
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, type HTMLAttributes, useAttrs } from 'vue'

    export type NIconProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        name: string
        tag?: string
        to?: string | object
        href?: string
        target?: string
        disabled?: boolean
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NIconProps>(), {
        tag: 'i'
    })

    const emits = defineEmits<(event: 'click', e: MouseEvent | KeyboardEvent) => void>()

    const isClickable = computed(() => !props.disabled && (props.to || props.href || !!attrs.onClick))

    const iconClasses = computed(() => {
        const name = props.name || 'mdi-account'
        if (name.startsWith('mdi-')) return ['mdi', name]
        return ['mdi', `mdi-${name}`]
    })

    const compClasses = computed(() => [
        'n-icon',
        isClickable.value ? 'n-icon--clickable' : '',
        props.disabled ? 'n-icon--disabled' : '',
        ...iconClasses.value
    ])

    const compBind = computed(() => ({
        ...(isClickable.value ? { to: props.to, href: props.href, target: props.target } : {}),
        ...attrs
    }))

    function handleClick(e: MouseEvent | KeyboardEvent) {
        if (props.disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        if (isClickable.value) emits('click', e)
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-icon {
            @apply inline-block leading-none size-[1em] transition-all duration-200;

            &.n-icon--clickable {
                @apply cursor-pointer hover:opacity-80;
            }

            &.n-icon--disabled {
                @apply opacity-50 cursor-not-allowed grayscale;
                @apply hover:opacity-50;
            }
        }
    }
</style>
