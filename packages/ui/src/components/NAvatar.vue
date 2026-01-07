<template>
    <component
        :is="actualTag"
        :class="compClasses"
        :role="isClickable && actualTag === 'span' ? 'button' : undefined"
        :tabindex="isClickable && actualTag === 'span' ? 0 : undefined"
        :aria-disabled="props.disabled ? 'true' : undefined"
        v-bind="compBind"
        @click="handleClick"
        @keydown.enter.space.prevent="handleClick"
    >
        <!-- Content / Sizer -->
        <n-icon v-if="props.icon" :name="props.icon" :class="{ 'opacity-0': props.src }" aria-hidden="true" />
        <span
            v-else-if="props.label || $slots['default']"
            class="n-avatar-label"
            :class="{ 'opacity-0': props.src }"
            :aria-hidden="props.src ? 'true' : undefined"
        >
            <slot>{{ props.label }}</slot>
        </span>
        <span v-else class="n-avatar-sizer" aria-hidden="true">&nbsp;</span>

        <!-- Image Overlay -->
        <img v-if="props.src" :src="props.src" :alt="props.alt || props.label || ''" class="n-avatar-image" />
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, HTMLAttributes, useAttrs } from 'vue'
    import NIcon from './NIcon.vue'

    export type NAvatarProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        src?: string
        alt?: string
        icon?: string
        label?: string
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
    const props = withDefaults(defineProps<NAvatarProps>(), {
        tag: 'span'
    })

    const emits = defineEmits<(event: 'click', e: MouseEvent | KeyboardEvent) => void>()

    const isClickable = computed(() => {
        return !props.disabled && (props.to || props.href || !!attrs.onClick)
    })

    const actualTag = computed(() => {
        if (props.to && !props.disabled) return 'RouterLink'
        if (props.href && !props.disabled) return 'a'
        return props.tag
    })

    const compClasses = computed(() => {
        return ['n-avatar', isClickable.value ? 'n-avatar--clickable' : '', props.disabled ? 'n-avatar--disabled' : '']
    })

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

    function handleClick(e: MouseEvent | KeyboardEvent) {
        if (props.disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        if (isClickable.value) {
            emits('click', e)
        }
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-avatar {
            /* Base */
            @apply relative
                aspect-square
                inline-flex items-center justify-center
                bg-text text-text-invert
                text-center
                font-semibold leading-none
                rounded-element
                overflow-hidden
                p-2.5
                transition-all duration-200 ease-in-out;

            /* Sizer */
            .n-avatar-sizer {
                @apply inline-block w-[1em] h-[1em];
            }

            /* Image */
            .n-avatar-image {
                @apply absolute inset-0 h-full w-full object-cover;
            }

            /* Label */
            .n-avatar-label {
                @apply block w-full truncate;
            }

            /* Colors */
            &.primary {
                @apply bg-brand;
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

            /* Interaction States */
            &.n-avatar--clickable {
                @apply cursor-pointer hover:opacity-80;
            }

            /* Disabled State */
            &.n-avatar--disabled {
                @apply opacity-50 cursor-not-allowed grayscale;
                /* Reset hover opacity for disabled */
                @apply hover:opacity-50;
            }
        }
    }
</style>
