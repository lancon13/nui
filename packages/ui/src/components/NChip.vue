<template>
    <component
        :is="actualTag"
        :class="compClasses"
        :to="props.to"
        :href="props.href"
        :target="props.target"
        :role="isClickable && actualTag === 'span' ? 'button' : undefined"
        :tabindex="isClickable && actualTag === 'span' ? 0 : undefined"
        :aria-disabled="props.disabled ? 'true' : undefined"
        v-bind="compBind"
        @click="handleClick"
        @keydown.enter.space.prevent="handleClick"
    >
        <slot name="prepend"></slot>
        <n-icon
            v-if="props.prependIcon || props.icon"
            :name="(props.prependIcon || props.icon) as string"
            aria-hidden="true"
        />
        <span v-if="props.label || $slots['default']">
            <slot name="default">{{ props.label }}</slot>
        </span>
        <n-icon v-if="props.appendIcon" :name="props.appendIcon" aria-hidden="true" />
        <slot name="append"></slot>
        <slot v-if="props.removable" name="removable">
            <n-icon name="mdi-close" :class="props.removableClass" clickable @click.stop="handleRemovableClick" />
        </slot>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, HTMLAttributes, useAttrs } from 'vue'
    import NIcon from './NIcon.vue'

    export type NChipProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        icon?: string
        prependIcon?: string
        appendIcon?: string
        tag?: string
        label?: string
        removable?: boolean
        removableClass?: string | string[] | object
        clickable?: boolean
        to?: string | object
        href?: string
        target?: string
        disabled?: boolean
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NChipProps>(), {
        tag: 'span'
    })
    const emits = defineEmits<{ (event: 'click', e: MouseEvent | KeyboardEvent): void; (event: 'remove'): void }>()

    const isClickable = computed(() => {
        return !props.disabled && (props.to || props.href || !!attrs.onClick)
    })

    const actualTag = computed(() => {
        if (props.to && !props.disabled) return 'RouterLink'
        if (props.href && !props.disabled) return 'a'
        return props.tag
    })

    const compClasses = computed(() => {
        return ['n-chip', isClickable.value ? 'n-chip--clickable' : '', props.disabled ? 'n-chip--disabled' : '']
    })

    const compBind = computed(() => {
        return {
            ...attrs
        }
    })

    function handleRemovableClick() {
        emits('remove')
    }

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
        .n-chip {
            /* Base */
            @apply relative leading-none
                inline-flex flex-row gap-2 items-center
                bg-text text-text-invert
                text-center text-nowrap
                border-2 border-transparent
                px-2 py-1
                rounded-element
                transition-all duration-200 ease-in-out;

            /* Colors & Variants */
            &.brand {
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

            /* Variant: Flat */
            &.flat {
                @apply bg-current/20 text-current;
                &.brand {
                    @apply bg-brand-light text-brand;
                }
                &.success {
                    @apply bg-success-light text-success;
                }
                &.error {
                    @apply bg-error-light text-error;
                }
                &.warning {
                    @apply bg-warning-light text-warning;
                }
                &.info {
                    @apply bg-info-light text-info;
                }
            }

            /* Variant: Outlined */
            &.outlined {
                @apply border-current text-current;
                &:not(.flat) {
                    @apply bg-transparent;
                }
                &.brand {
                    @apply border-brand text-brand;
                }
                &.success {
                    @apply border-success text-success;
                }
                &.error {
                    @apply border-error text-error;
                }
                &.warning {
                    @apply border-warning text-warning;
                }
                &.info {
                    @apply border-info text-info;
                }
            }

            /* Variant: Texted */
            &.texted {
                @apply bg-transparent text-current;
                &.brand {
                    @apply text-brand;
                }
                &.success {
                    @apply text-success;
                }
                &.error {
                    @apply text-error;
                }
                &.warning {
                    @apply text-warning;
                }
                &.info {
                    @apply text-info;
                }

                &.shadowed {
                    @apply shadow-none text-shadow-outer;
                }
            }

            /* Interaction States */
            &.n-chip--clickable {
                @apply cursor-pointer hover:opacity-80;
            }

            /* Disabled State */
            &.n-chip--disabled {
                @apply opacity-50 cursor-not-allowed grayscale;
                @apply hover:opacity-50;
            }
        }
    }
</style>
