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
        @click="handleClick"
    >
        <template v-if="props.loading">
            <slot name="loading">
                <nui-icon
                    v-if="props.loadingIcon"
                    :name="props.loadingIcon"
                    :size="props.size"
                    class="nui-button-loading-icon animate-spin"
                />
                <span v-if="props.loadingLabel" class="nui-button-loading-label">{{ props.loadingLabel }}</span>
                <slot name="default" />
            </slot>
        </template>

        <template v-else>
            <slot v-if="$slots['prepend'] || props.prependIcon" name="prepend">
                <nui-icon :name="props.prependIcon as string" :size="props.size" class="nui-button--prepend-icon" />
            </slot>

            <nui-icon v-if="props.icon" :name="props.icon" :size="props.size" class="nui-button-icon" />
            {{ props.label }}
            <slot name="default" />

            <slot v-if="$slots['append'] || props.appendIcon" name="append">
                <nui-icon :name="props.appendIcon as string" :size="props.size" class="nui-button--append-icon" />
            </slot>
        </template>
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import NuiIcon from './NuiIcon.vue'

    export type NuiButtonSize = 'small' | 'medium' | 'large'
    export type NuiButtonColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'
    export type NuiButtonVariant = 'solid' | 'outlined' | 'flat' | 'text'

    export interface NuiButtonProps {
        toggled?: boolean
        type?: 'button' | 'submit' | 'reset'
        variant?: NuiButtonVariant
        color?: NuiButtonColor
        size?: NuiButtonSize | string
        disabled?: boolean
        label?: string
        tag?: string
        prependIcon?: string
        appendIcon?: string
        icon?: string
        loading?: boolean
        loadingLabel?: string
        loadingIcon?: string
        rounded?: boolean
        pilled?: boolean
        to?: string | object
        href?: string
        target?: string
        shadow?: boolean
        noRounded?: boolean
    }

    const props = withDefaults(defineProps<NuiButtonProps>(), {
        type: 'button',
        variant: 'solid',
        color: 'current',
        size: 'medium',
        disabled: false,
        label: '',
        tag: 'button',
        prependIcon: undefined,
        appendIcon: undefined,
        icon: undefined,
        loading: false,
        loadingLabel: 'Loading...',
        loadingIcon: 'loading',
        rounded: false,
        pilled: false,
        to: undefined,
        href: undefined,
        target: undefined,
        shadow: false,
        noRounded: false
    })

    const emit = defineEmits(['click'])

    const handleClick = (e: MouseEvent) => {
        emit('click', e)
    }

    const isIconOnly = computed(() => props.icon && !props.label)

    const compClasses = computed(() => [
        'nui-button',
        `nui-button--variant-${props.variant}`,
        {
            [`nui-button--size-${props.size}`]:
                props.size && ['small', 'medium', 'large'].includes(props.size as string),
            [`nui-button--color-${props.color}`]:
                props.color &&
                ['primary', 'success', 'error', 'warning', 'info', 'current'].includes(props.color as string),
            'nui-button--icon-only': isIconOnly.value,
            'nui-button--rounded': props.rounded,
            'nui-button--pilled': props.pilled,
            'nui-button--loading': props.loading,
            'nui-button--disabled': props.disabled,
            'nui-button--shadow': props.shadow,
            'nui-button--toggled': props.toggled,
            'nui-button--no-rounded': props.noRounded
        }
    ])

    const compStyles = computed(() => {
        const styles: Record<string, string> = {}
        if (props.size && !['small', 'medium', 'large'].includes(props.size as string)) styles['font-size'] = props.size

        return styles
    })
</script>
<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-button {
            @apply relative box-border inline-flex items-center justify-center shrink gap-sm
                text-center no-underline whitespace-nowrap
                px-[var(--nui-button-padding-x)] py-[var(--nui-button-padding-y)]
                rounded-[var(--nui-button-radius)]
                border-[length:var(--nui-button-border-size)]
                cursor-pointer
                transition-all duration-250 ease-in-out
                hover:opacity-75
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

            /* Rounded (Circle) */
            &.nui-button--rounded {
                @apply rounded-full p-[var(--nui-button-padding-rounded)];
            }

            /* NoRounded */
            &.nui-button--no-rounded {
                @apply rounded-none;
            }

            /* Colors */
            &.nui-button--color-primary {
                @apply focus:ring-primary/50;
            }
            &.nui-button--color-success {
                @apply focus:ring-success/50;
            }
            &.nui-button--color-error {
                @apply focus:ring-error/50;
            }
            &.nui-button--color-warning {
                @apply focus:ring-warning/50;
            }
            &.nui-button--color-info {
                @apply focus:ring-info/50;
            }

            /* Variants */
            &.nui-button--variant-solid {
                @apply border-transparent;
                &.nui-button--color-primary {
                    @apply bg-primary text-input-highlight;
                }
                &.nui-button--color-success {
                    @apply bg-success text-input-highlight;
                }
                &.nui-button--color-error {
                    @apply bg-error text-input-highlight;
                }
                &.nui-button--color-warning {
                    @apply bg-warning text-input-highlight;
                }
                &.nui-button--color-info {
                    @apply bg-info text-input-highlight;
                }
                &.nui-button--color-current {
                    @apply bg-fg text-input-highlight;
                }
            }
            &.nui-button--variant-outlined {
                @apply bg-transparent;
                &.nui-button--color-primary {
                    @apply border-primary text-primary hover:bg-primary/15;
                }
                &.nui-button--color-success {
                    @apply border-success text-success hover:bg-success/15;
                }
                &.nui-button--color-error {
                    @apply border-error text-error hover:bg-error/15;
                }
                &.nui-button--color-warning {
                    @apply border-warning text-warning hover:bg-warning/15;
                }
                &.nui-button--color-info {
                    @apply border-info text-info hover:bg-info/15;
                }
                &.nui-button--color-current {
                    @apply border-current text-current hover:bg-current/15;
                }
            }
            &.nui-button--variant-flat {
                @apply border-transparent;
                &.nui-button--color-primary {
                    @apply text-primary bg-primary/20;
                }
                &.nui-button--color-success {
                    @apply text-success bg-success/20;
                }
                &.nui-button--color-error {
                    @apply text-error bg-error/20;
                }
                &.nui-button--color-warning {
                    @apply text-warning bg-warning/20;
                }
                &.nui-button--color-info {
                    @apply text-info bg-info/20;
                }
                &.nui-button--color-current {
                    @apply text-current bg-current/20;
                }
            }

            &.nui-button--variant-text {
                @apply border-transparent bg-transparent;
                &.nui-button--color-primary {
                    @apply text-primary hover:bg-primary/15;
                }
                &.nui-button--color-success {
                    @apply text-success hover:bg-success/15;
                }
                &.nui-button--color-error {
                    @apply text-error hover:bg-error/15;
                }
                &.nui-button--color-warning {
                    @apply text-warning hover:bg-warning/15;
                }
                &.nui-button--color-info {
                    @apply text-info hover:bg-info/15;
                }
                &.nui-button--color-current {
                    @apply text-current hover:bg-current/15;
                }
            }

            /* Shadow */
            &.nui-button--shadow {
                @apply shadow-lg;

                &.nui-button--variant-text {
                    @apply shadow-none text-shadow-[var(--nui-button-text-shadow)];
                }
            }

            /* Disabled */
            &.nui-button--disabled {
                @apply disabled:opacity-50;
            }

            /* Icons */
            .nui-icon {
                &.nui-icon--size-small {
                    @apply text-[length:var(--nui-button-font-size-small)] leading-[var(--nui-button-font-size-small)];
                }
                &.nui-icon--size-medium {
                    @apply text-[length:var(--nui-button-font-size-medium)] leading-[var(--nui-button-font-size-medium)];
                }
                &.nui-icon--size-large {
                    @apply text-[length:var(--nui-button-font-size-large)] leading-[var(--nui-button-font-size-large)];
                }
            }
            &.nui-button--icon-only {
                .nui-icon {
                    @apply mx-0;
                }
            }

            /* Toggled styles */
            &.nui-button--toggled {
                &.nui-button--variant-solid,
                &.nui-button--variant-outlined,
                &.nui-button--variant-flat,
                &.nui-button--variant-text {
                    @apply hover:opacity-50;
                    &.nui-button--color-primary {
                        @apply text-primary bg-input-highlight;
                    }
                    &.nui-button--color-success {
                        @apply text-success bg-input-highlight;
                    }
                    &.nui-button--color-error {
                        @apply text-error bg-input-highlight;
                    }
                    &.nui-button--color-warning {
                        @apply text-warning bg-input-highlight;
                    }
                    &.nui-button--color-info {
                        @apply text-info bg-input-highlight;
                    }
                }
            }
        }
    }
</style>
