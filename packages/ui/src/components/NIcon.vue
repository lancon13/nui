<template>
    <component
        :is="actualTag"
        :class="compClasses"
        :role="isClickable ? 'button' : 'img'"
        :tabindex="isClickable ? 0 : undefined"
        :aria-disabled="props.disabled ? 'true' : undefined"
        v-bind="compBind"
        @keydown.enter.space.prevent="handleKey"
    >
        <slot name="default" />
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, getCurrentInstance, type HTMLAttributes, useAttrs } from 'vue'

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
    const instance = getCurrentInstance()
    const props = withDefaults(defineProps<NIconProps>(), {
        tag: 'i'
    })

    const isClickable = computed(() => !props.disabled && (props.to || props.href || !!attrs.onClick))

    const actualTag = computed(() => {
        if (props.to && !props.disabled) return 'RouterLink'
        if (props.href && !props.disabled) return 'a'
        return props.tag
    })

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

    const compBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bind: any = { ...attrs }
        if (actualTag.value === 'RouterLink') {
            bind.to = props.to
            bind.target = props.target
        } else if (actualTag.value === 'a') {
            bind.href = props.href
            bind.target = props.target
        }
        return bind
    })

    function handleKey(e: KeyboardEvent) {
        if (props.disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        if (isClickable.value) instance?.emit('click', e)
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
                @apply opacity-50 cursor-not-allowed grayscale pointer-events-none;
                @apply hover:opacity-50;
            }
        }
    }
</style>
