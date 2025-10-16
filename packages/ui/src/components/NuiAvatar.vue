<template>
    <div :class="compClasses" :style="compStyles">
        <span v-if="props.text" class="nui-avatar-text">{{ props.text }}</span>
        <slot />
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export type NuiAvatarSize = 'small' | 'medium' | 'large'
    export type NuiAvatarColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'
    export type NuiAvatarVariant = 'solid' | 'flat' | 'outlined' | 'text'

    export interface NuiAvatarProps {
        text?: string
        variant?: NuiAvatarVariant
        color?: NuiAvatarColor
        size?: NuiAvatarSize | string
        squared?: boolean
        shadow?: boolean
    }

    const props = withDefaults(defineProps<NuiAvatarProps>(), {
        text: undefined,
        variant: 'solid',
        color: 'current',
        size: 'medium',
        squared: false,
        shadow: false
    })

    const compClasses = computed(() => [
        'nui-avatar',
        `nui-avatar--variant-${props.variant}`,
        `nui-avatar--color-${props.color}`,
        {
            [`nui-avatar--size-${props.size}`]:
                props.size && ['small', 'medium', 'large'].includes(props.size as string),
            'nui-avatar--squared': props.squared,
            'nui-avatar--shadow': props.shadow
        }
    ])

    const compStyles = computed(() => {
        const styles: Record<string, string> = {}
        if (props.size && !['small', 'medium', 'large'].includes(props.size as string)) {
            styles['height'] = props.size
            styles['width'] = props.size
            styles['font-size'] = `calc(${props.size} / 2)`
        }
        return styles
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-avatar {
            @apply relative inline-flex items-center justify-center shrink-0 align-middle overflow-hidden
                rounded-[var(--nui-avatar-radius)]
                border-[length:var(--nui-avatar-border-size)] border-transparent;

            /* Sizes */
            &.nui-avatar--size-small {
                @apply size-[calc(var(--nui-avatar-size-small)+var(--nui-avatar-font-size-small))] text-[length:var(--nui-avatar-font-size-small)] leading-[var(--nui-avatar-font-size-small)];
            }
            &.nui-avatar--size-medium {
                @apply size-[calc(var(--nui-avatar-size-medium)+var(--nui-avatar-font-size-medium))] text-[length:var(--nui-avatar-font-size-medium)] leading-[var(--nui-avatar-font-size-medium)];
            }
            &.nui-avatar--size-large {
                @apply size-[calc(var(--nui-avatar-size-large)+var(--nui-avatar-font-size-large))] text-[length:var(--nui-avatar-font-size-large)] leading-[var(--nui-avatar-font-size-large)];
            }

            /* Squared */
            &.nui-avatar--squared {
                @apply rounded-[var(--nui-avatar-radius-squared)];
            }

            /* Shadow */
            &.nui-avatar--shadow {
                @apply shadow-lg;
            }

            /* Variants */
            &.nui-avatar--variant-solid {
                @apply border-transparent;
                &.nui-avatar--color-primary {
                    @apply bg-primary text-input-highlight;
                }
                &.nui-avatar--color-success {
                    @apply bg-success text-input-highlight;
                }
                &.nui-avatar--color-error {
                    @apply bg-error text-input-highlight;
                }
                &.nui-avatar--color-warning {
                    @apply bg-warning text-input-highlight;
                }
                &.nui-avatar--color-info {
                    @apply bg-info text-input-highlight;
                }
                &.nui-avatar--color-current {
                    @apply bg-fg text-input-highlight;
                }
            }
            &.nui-avatar--variant-outlined {
                @apply bg-transparent;
                &.nui-avatar--color-primary {
                    @apply border-primary text-primary;
                }
                &.nui-avatar--color-success {
                    @apply border-success text-success;
                }
                &.nui-avatar--color-error {
                    @apply border-error text-error;
                }
                &.nui-avatar--color-warning {
                    @apply border-warning text-warning;
                }
                &.nui-avatar--color-info {
                    @apply border-info text-info;
                }
                &.nui-avatar--color-current {
                    @apply border-current text-current;
                }
            }
            &.nui-avatar--variant-flat {
                @apply border-transparent;
                &.nui-avatar--color-primary {
                    @apply bg-primary/20 text-primary;
                }
                &.nui-avatar--color-success {
                    @apply bg-success/20 text-success;
                }
                &.nui-avatar--color-error {
                    @apply bg-error/20 text-error;
                }
                &.nui-avatar--color-warning {
                    @apply bg-warning/20 text-warning;
                }
                &.nui-avatar--color-info {
                    @apply bg-info/20 text-info;
                }
                &.nui-avatar--color-current {
                    @apply bg-current/20 text-current;
                }
            }
            &.nui-avatar--variant-text {
                @apply border-transparent bg-transparent;
                &.nui-avatar--color-primary {
                    @apply text-primary;
                }
                &.nui-avatar--color-success {
                    @apply text-success;
                }
                &.nui-avatar--color-error {
                    @apply text-error;
                }
                &.nui-avatar--color-warning {
                    @apply text-warning;
                }
                &.nui-avatar--color-info {
                    @apply text-info;
                }
                &.nui-avatar--color-current {
                    @apply text-current;
                }
            }

            .nui-avatar-text {
                @apply font-[var(--nui-avatar-font-weight)];
            }
        }
    }
</style>
