<template>
    <component
        :is="props.tag"
        :type="props.tag === 'button' ? props.type : undefined"
        :to="props.tag !== 'button' ? props.to : undefined"
        :href="props.tag === 'a' ? props.href : undefined"
        :target="props.tag === 'a' ? props.target : undefined"
        :disabled="props.disabled || props.loading"
        :class="compClasses"
        :style="compStyles"
    >
        <template v-if="props.loading">
            <slot name="loading">
                <i v-if="props.loadingIcon" :class="['nui-button--loading-icon', 'nui-icon', props.loadingIcon]" />
                <span v-if="props.loadingLabel" class="nui-button--loading-label">{{ props.loadingLabel }}</span>
                <slot name="default" />
            </slot>
        </template>
        
        <template v-else>
            <slot v-if="$slots['prepend'] || props.prependIcon" name="prepend">
                <i :class="['nui-button--prepend-icon', 'nui-icon', props.prependIcon]" />
            </slot>
            
            <i v-if="props.icon" :class="['nui-button--icon', 'nui-icon', props.icon]" />
            {{ props.label }}
            <slot name="default" />
            
            <slot v-if="$slots['append'] || props.appendIcon" name="append">
                <i :class="['nui-button--append-icon', 'nui-icon', props.appendIcon]" />
            </slot>
        </template>
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export type NuiButtonSize = 'small' | 'medium' | 'large';
    export type NuiButtonColor = 'primary' | 'success' | 'error' | 'warning' | 'current';

    export interface NuiButtonProps {
        type?: 'button' | 'submit' | 'reset';
        variant?: 'solid' | 'outlined' | 'flat' | 'text';
        color?: NuiButtonColor;
        size?: NuiButtonSize | string;
        disabled?: boolean;
        label?: string;
        tag?: string;
        prependIcon?: string;
        appendIcon?: string;
        icon?: string;
        loading?: boolean;
        loadingLabel?: string;
        loadingIcon?: string;
        rounded?: boolean;
        pilled?: boolean;
        to?: string | object;
        href?: string;
        target?: string;
    }

    const props = withDefaults(defineProps<NuiButtonProps>(), {
        type: 'button',
        variant: 'solid',
        color: 'primary',
        size: 'medium',
        disabled: false,
        label: '',
        tag: 'button',
        prependIcon: undefined,
        appendIcon: undefined,
        icon: undefined,
        loading: false,
        loadingLabel: 'Loading...',
        loadingIcon: 'wds-spinner animate-spin',
        rounded: false,
        pilled: false,
        to: undefined,
        href: undefined,
        target: undefined,
    })

    const isIconOnly = computed(() => props.icon && !props.label)

    const compClasses = computed(() => [
        'nui-button',
        `nui-button--variant-${props.variant}`,
        {
            [`nui-button--size-${props.size}`]: props.size && ['small', 'medium', 'large'].includes(props.size as string),
            [`nui-button--color-${props.color}`]: props.color && ['primary', 'success', 'error', 'warning', 'current'].includes(props.color as string),
            'nui-button--icon-only': isIconOnly.value,
            'nui-button--rounded': props.rounded,
            'nui-button--pilled': props.pilled,
            'nui-button--loading': props.loading,
            'nui-button--disabled': props.disabled,
        },
    ])

    const compStyles = computed(() => {
        const styles: Record<string, string> = {}
        if (props.size && !['small', 'medium', 'large'].includes(props.size as string))
            styles['font-size'] = props.size

        return styles
    })

</script>

<style lang="css">
    @import "tailwindcss";
    @import "../styles/index.css";
    @import "../styles/components.css";

    @layer components {
        .nui-button {
            @apply relative inline-flex items-center justify-center text-center no-underline whitespace-nowrap
                text-[length:var(--nui-button-font-size-medium)] font-[var(--nui-button-font-weight)]
                px-[var(--nui-button-padding-x)] py-[var(--nui-button-padding-y)]
                rounded-[var(--nui-button-radius)]
                border-[length:var(--nui-button-border-size)]
                gap-[var(--spacing-xs)]
                cursor-pointer
                transition-all duration-200 ease-in-out
                disabled:cursor-not-allowed;

            /* Sizes */
            &.nui-button--size-small {
                @apply text-[length:var(--nui-button-font-size-small)] leading-[var(--nui-button-font-size-small)];
                &.nui-button--rounded {
                    @apply rounded-full size-[var(--nui-button-icon-only-size-small)];
                }
            }
             &.nui-button--size-medium {
                @apply text-[length:var(--nui-button-font-size-medium)] leading-[var(--nui-button-font-size-medium)];
                &.nui-button--rounded {
                    @apply rounded-full size-[var(--nui-button-icon-only-size-medium)];
                }
            }
            &.nui-button--size-large {
                @apply text-[length:var(--nui-button-font-size-large)] leading-[var(--nui-button-font-size-large)];
                &.nui-button--rounded {
                    @apply rounded-full size-[var(--nui-button-icon-only-size-large)];
                }
            }

            /* Pilled */
            &.nui-button--pilled {
                @apply rounded-s-full rounded-e-full;
            }

             /* Rounded */
            &.nui-button--rounded {
                @apply rounded-full p-[var(--nui-button-padding-rounded)];
            }

            /* Variants */
            &.nui-button--variant-solid {
                @apply border-transparent;
                &.nui-button--color-primary { @apply bg-primary text-white focus:ring-primary/50 hover:opacity-80 }
                &.nui-button--color-success { @apply bg-success text-white focus:ring-success/50 hover:opacity-80 }
                &.nui-button--color-error { @apply bg-error text-white focus:ring-error/50 hover:opacity-80 }
                &.nui-button--color-warning { @apply  bg-warning text-white focus:ring-warning/50 hover:opacity-80 }
                &.nui-button--color-current { @apply bg-fg text-white focus:ring-fg/50 hover:opacity-80 }
            }
            &.nui-button--variant-outlined {
                @apply bg-transparent;
                &.nui-button--color-primary { @apply border-primary text-primary hover:bg-primary/5; }
                &.nui-button--color-success { @apply border-success text-success hover:bg-success/5; }
                &.nui-button--color-error { @apply border-error text-error hover:bg-error/5; }
                &.nui-button--color-warning { @apply border-warning text-warning hover:bg-warning/5; }
                &.nui-button--color-current { @apply border-current text-current hover:bg-current/5; }
            }
            &.nui-button--variant-flat {
                @apply border-transparent;
                &.nui-button--color-primary { @apply text-primary bg-primary/10 hover:bg-primary/5; }
                &.nui-button--color-success { @apply text-success bg-success/10 hover:bg-success/5; }
                &.nui-button--color-error { @apply text-error bg-error/10 hover:bg-error/5;  }
                &.nui-button--color-warning { @apply text-warning bg-warning/10 hover:bg-warning/5; }
                &.nui-button--color-current { @apply text-current bg-current/10 hover:bg-current/5; }
            }

            &.nui-button--variant-text {
                @apply border-transparent bg-transparent;
                &.nui-button--color-primary { @apply text-primary hover:bg-primary/5; }
                &.nui-button--color-success { @apply text-success hover:bg-success/5; }
                &.nui-button--color-error { @apply text-error hover:bg-error/5; }
                &.nui-button--color-warning { @apply text-warning hover:bg-warning/5; }
                &.nui-button--color-current { @apply text-current hover:bg-current/5; }
            }

            /* Disabled */
            &.nui-button--disabled {
                @apply disabled:opacity-50;
            }
        }
    }
</style>
