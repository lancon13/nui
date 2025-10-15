<template>
    <i :class="compClasses" :style="compStyles" />
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export type NuiIconSize = 'small' | 'medium' | 'large'
    export type NuiIconColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'

    export interface NuiIconProps {
        name: string
        size?: NuiIconSize | string
        color?: NuiIconColor
    }

    const props = withDefaults(defineProps<NuiIconProps>(), {
        size: undefined,
        color: 'current'
    })

    const iconClasses = computed(() => {
        const name = props.name
        const parts = name.split('-')

        // Assume short prefixes (e.g., 'fs', 'mdi', 'fa') for icon sets
        if (parts.length > 1 && parts[0] === 'mdi') return ['mdi', name]

        // Default to MDI for names without a recognizable prefix
        return ['mdi', `mdi-${name}`]
    })

    const compClasses = computed(() => [
        'nui-icon',
        ...iconClasses.value,
        {
            [`nui-icon--size-${props.size}`]:
                props.size && ['small', 'medium', 'large'].includes(props.size as string),
            [`nui-icon--color-${props.color}`]: props.color && props.color !== 'current'
        }
    ])

    const compStyles = computed(() => {
        const styles: Record<string, string> = {}
        if (props.size && !['small', 'medium', 'large'].includes(props.size as string))
            styles['font-size'] = props.size

        return styles
    })
</script>

<style lang="css">
    @import 'tailwindcss';
    @import '../styles/index.css';
    @import '../styles/components.css';

    @layer components {
        .nui-icon {
            @apply flex-shrink-0 inline-flex aspect-square leading-none;

            /* Colors */
            &.nui-icon--color-primary {
                @apply text-primary;
            }
            &.nui-icon--color-success {
                @apply text-success;
            }
            &.nui-icon--color-error {
                @apply text-error;
            }
            &.nui-icon--color-warning {
                @apply text-warning;
            }
            &.nui-icon--color-info {
                @apply text-info;
            }
            &.nui-icon--color-current {
                @apply text-current;
            }

            /* Sizes */
            &.nui-icon--size-small {
                @apply text-[length:var(--nui-icon-size-small)] leading-[var(--nui-icon-size-small)];
            }
            &.nui-icon--size-medium {
                @apply text-[length:var(--nui-icon-size-medium)] leading-[var(--nui-icon-size-medium)];
            }
            &.nui-icon--size-large {
                @apply text-[length:var(--nui-icon-size-large)] leading-[var(--nui-icon-size-large)];
            }
        }
    }
</style>
