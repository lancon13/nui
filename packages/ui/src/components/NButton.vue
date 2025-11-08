<template>
    <button :class="compClasses" v-bind="$attrs">
        <slot name="prepend"></slot>
        <n-icon v-if="props.prependIcon || props.icon" :name="(props.prependIcon || props.icon) as string" />
        <span v-if="props.label || $slots['default']">
            <slot name="default"><{{ props.label }}</slot>
        </span>
        <n-icon v-if="props.appendIcon" :name="props.appendIcon" />
        <slot name="append"></slot>
    </button>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import NIcon from './NIcon.vue'

    defineOptions({
        inheritAttrs: false
    })

    const props = defineProps<{
        icon?: string
        prependIcon?: string
        appendIcon?: string
        label?: string
        // tag?: string
        // type?: string
        // loading?: boolean
        // to?: string | object
        // href?: string
        // target?: string
        // prependIconClass?: string | object | string[]
        // appendIconClass?: string | object | string[]
        // iconClass?: string | object | string[]
    }>()

    const compClasses = computed(() => {
        return ['n-button']
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-button {
            @apply relative appearance-none
                cursor-pointer
                inline-flex flex-row gap-2 items-center
                bg-text text-text-invert
                font-semibold leading-none
                rounded-element
                border-2 border-transparent
                outline-0
                px-4 py-2
                transition-all duration-200 ease-in-out;
            @apply hover:opacity-80;
            @apply focus:ring-2 focus:ring-offset-2 focus:ring-text/50;
            @apply disabled:grayscale disabled:contrast-50 disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed;

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
            @apply disabled:bg-text disabled:text-text-invert;

            &.icon {
                @apply aspect-square p-2;
            }

            &.flat {
                @apply bg-current/20 text-current;
                &.primary {
                    @apply bg-primary-bright text-primary;
                }
                &.success {
                    @apply bg-success-bright text-success;
                }
                &.error {
                    @apply bg-error-bright text-error;
                }
                &.warning {
                    @apply bg-warning-bright text-warning;
                }
                &.info {
                    @apply bg-info-bright text-info;
                }
                @apply disabled:bg-current/20 disabled:text-current;
            }

            &.outlined {
                @apply bg-transparent border-2 border-current text-current
                    hover:bg-current/10 hover:opacity-50;
                &.primary {
                    @apply border-primary text-primary 
                        hover:bg-current/10;
                }
                &.success {
                    @apply border-success text-success
                        hover:bg-current/10;
                }
                &.error {
                    @apply border-error text-error
                        hover:bg-current/10;
                }
                &.warning {
                    @apply border-warning text-warning
                        hover:bg-current/10;
                }
                &.info {
                    @apply border-info text-info
                        hover:bg-current/10;
                }
                @apply disabled:bg-transparent disabled:border-current disabled:text-current disabled:hover:bg-transparent;
            }

            &.texted {
                @apply bg-transparent text-current
                    hover:bg-current/10 hover:opacity-50;
                &.primary {
                    @apply text-primary
                        hover:bg-current/10;
                }
                &.success {
                    @apply text-success
                        hover:bg-current/10;
                }
                &.error {
                    @apply text-error
                        hover:bg-current/10;
                }
                &.warning {
                    @apply text-warning
                        hover:bg-current/10;
                }
                &.info {
                    @apply text-info
                        hover:bg-current/10;
                }

                &.shadowed {
                    @apply shadow-none text-shadow-outer;
                }

                @apply disabled:bg-transparent disabled:text-current disabled:hover:bg-transparent;
            }

            &:has(.n-avatar) {
                @apply p-0;
                .n-avatar {
                    @apply bg-transparent text-current;
                }
            }
        }
    }
</style>
