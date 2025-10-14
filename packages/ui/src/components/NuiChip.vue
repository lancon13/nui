<template>
    <component :is="tag" :class="compClasses">
        <slot name="prepend" />
        <slot>
            {{ label }}
        </slot>
        <slot name="append" />
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export type NuiChipSize = 'small' | 'medium' | 'large';
    export type NuiChipColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current';
    export type NuiChipVariant = 'solid' | 'outlined' | 'flat' | 'text';

    export interface NuiChipProps {
        label?: string;
        color?: NuiChipColor;
        variant?: NuiChipVariant;
        size?: NuiChipSize;
        pilled?: boolean;
        clickable?: boolean;
        shadow?: boolean;
    }

    const props = withDefaults(defineProps<NuiChipProps>(), {
        label: '',
        color: 'current',
        variant: 'solid',
        size: 'medium',
        pilled: false,
        clickable: false,
        shadow: false,
    })

    const tag = computed(() => props.clickable ? 'button' : 'div')

    const compClasses = computed(() => [
        'nui-chip',
        `nui-chip--variant-${props.variant}`,
        `nui-chip--size-${props.size}`,
        `nui-chip--color-${props.color}`,
        {
            'nui-chip--pilled': props.pilled,
            'nui-chip--clickable': props.clickable,
            'nui-chip--shadow': props.shadow,
        }
    ])
</script>

<style lang="css">
    @import "tailwindcss";
    @import "../styles/index.css";
    @import "../styles/components.css";

    @layer components {
        .nui-chip {
            @apply inline-flex items-center gap-xs whitespace-nowrap
                px-[var(--nui-chip-padding-x)] py-[var(--nui-chip-padding-y)]
                rounded-[var(--nui-chip-radius)]
                border-[length:var(--nui-chip-border-size)];

            &.nui-chip--size-small {
                @apply text-[length:var(--nui-chip-font-size-small)] leading-[var(--nui-chip-font-size-small)];
            }
            &.nui-chip--size-medium {
                @apply text-[length:var(--nui-chip-font-size-medium)] leading-[var(--nui-chip-font-size-medium)];
            }
            &.nui-chip--size-large {
                @apply text-[length:var(--nui-chip-font-size-large)] leading-[var(--nui-chip-font-size-large)];
            }

            &.nui-chip--pilled {
                @apply rounded-full;
            }

            /* Shadow */
            &.nui-chip--shadow {
                @apply shadow-lg;
            }

            /* Clickable */
            &.nui-chip--clickable {
                @apply cursor-pointer hover:opacity-80;
            }

            /* Variants and Colors */
            &.nui-chip--variant-solid {
                @apply border-transparent;
                &.nui-chip--color-primary { @apply bg-primary text-input-highlight; }
                &.nui-chip--color-success { @apply bg-success text-input-highlight; }
                &.nui-chip--color-error { @apply bg-error text-input-highlight; }
                &.nui-chip--color-warning { @apply bg-warning text-input-highlight; }
                &.nui-chip--color-info { @apply bg-info text-input-highlight; }
                &.nui-chip--color-current { @apply bg-fg text-input-highlight; }
            }
            &.nui-chip--variant-outlined {
                @apply bg-transparent;
                &.nui-chip--color-primary { @apply border-primary text-primary; }
                &.nui-chip--color-success { @apply border-success text-success; }
                &.nui-chip--color-error { @apply border-error text-error; }
                &.nui-chip--color-warning { @apply border-warning text-warning; }
                &.nui-chip--color-info { @apply border-info text-info; }
                &.nui-chip--color-current { @apply border-current text-current; }
            }
            &.nui-chip--variant-flat {
                @apply border-transparent;
                &.nui-chip--color-primary { @apply text-primary bg-primary/20; }
                &.nui-chip--color-success { @apply text-success bg-success/20; }
                &.nui-chip--color-error { @apply text-error bg-error/20; }
                &.nui-chip--color-warning { @apply text-warning bg-warning/20; }
                &.nui-chip--color-info { @apply text-info bg-info/20; }
                &.nui-chip--color-current { @apply text-current bg-current/20; }
            }
            &.nui-chip--variant-text {
                @apply border-transparent bg-transparent;
                &.nui-chip--color-primary { @apply text-primary; }
                &.nui-chip--color-success { @apply text-success; }
                &.nui-chip--color-error { @apply text-error; }
                &.nui-chip--color-warning { @apply text-warning; }
                &.nui-chip--color-info { @apply text-info; }
                &.nui-chip--color-current { @apply text-current; }
            }
        }
    }
</style>