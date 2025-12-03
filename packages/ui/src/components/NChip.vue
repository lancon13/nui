<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind" @click="handleClick">
        <slot name="prepend"></slot>
        <n-icon v-if="props.prependIcon || props.icon" :name="(props.prependIcon || props.icon) as string" />
        <span v-if="props.label || $slots['default']">
            <slot name="default"><{{ props.label }}</slot>
        </span>
        <n-icon v-if="props.appendIcon" :name="props.appendIcon" />
        <slot name="append"></slot>
        <slot v-if="props.removable" name="removable">
            <n-icon name="close" :class="props.removableClass" clickable @click="handleRemovableClick" />
        </slot>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, getCurrentInstance, HTMLAttributes, useAttrs } from 'vue'
    import NIcon from './NIcon.vue'

    export type NCardProps = Partial</* @vue-ignore */ HTMLAttributes> & {
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

    const instance = getCurrentInstance()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NCardProps>(), {
        tag: 'span'
    })
    const emits = defineEmits<{ (event: 'click', e: MouseEvent): void; (event: 'remove'): void }>()

    const isClickable = computed(() => {
        return props.to || props.href || !!instance?.vnode.props?.onClick
    })
    const compClasses = computed(() => {
        return ['n-chip', isClickable.value ? 'n-chip--clickable' : '', props.disabled ? 'n-chip--disabled' : '']
    })
    const compBind = computed(() => {
        return {
            ...(isClickable.value
                ? { tabindex: 0, role: 'button', to: props.to, href: props.href, target: props.target }
                : {}),
            ...attrs
        }
    })

    function handleRemovableClick() {
        emits('remove')
    }
    function handleClick(e: MouseEvent) {
        if (props.disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        emits('click', e)
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-chip {
            @apply relative leading-none
                inline-flex flex-row gap-2 items-center
                bg-text text-text-invert
                text-center
                border-2 border-transparent
                px-2 py-1
                rounded-element;

            &.primary {
                @apply bg-primary;
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

            &.flat {
                @apply bg-current/20 text-current;
                &.primary {
                    @apply bg-primary-alt text-primary;
                }
                &.success {
                    @apply bg-success-alt text-success;
                }
                &.error {
                    @apply bg-error-alt text-error;
                }
                &.warning {
                    @apply bg-warning-alt text-warning;
                }
                &.info {
                    @apply bg-info-alt text-info;
                }
            }

            &.outlined {
                @apply border-current text-current;
                &:not(.flat) {
                    @apply bg-transparent;
                }
                &.primary {
                    @apply border-primary text-primary;
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

            &.texted {
                @apply bg-transparent text-current;
                &.primary {
                    @apply text-primary;
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

            &.n-chip--clickable {
                @apply transition-[backdrop-filter] duration-200 ease-in-out;
                @apply hover:backdrop-brightness-75;

                &.n-chip--disabled,
                [class*='--clickable']&.n-chip--disabled,
                a[href]&.n-chip--disabled {
                    @apply backdrop-brightness-100;
                    @apply ring-0;
                    @apply opacity-50 hover:opacity-50 cursor-not-allowed grayscale;
                }
            }
        }
    }
</style>
