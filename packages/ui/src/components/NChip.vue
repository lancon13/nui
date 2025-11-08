<template>
    <span :class="compClasses" v-bind="$attrs">
        <slot name="prepend"></slot>
        <n-icon v-if="props.prependIcon || props.icon" :name="(props.prependIcon || props.icon) as string" />
        <span v-if="props.label || $slots['default']">
            <slot name="default"><{{ props.label }}</slot>
        </span>
        <n-icon v-if="props.appendIcon" :name="props.appendIcon" />
        <slot name="append"></slot>
    </span>
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
    }>()

    const compClasses = computed(() => {
        return ['n-chip']
    })
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
            }

            &.outlined {
                @apply bg-transparent border-2 border-current text-current;
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
        }
    }
</style>
