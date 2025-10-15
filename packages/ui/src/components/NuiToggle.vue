<template>
    <div :class="wrapperClasses">
        <slot v-if="props.label || $slots['label']" name="label">
            <label :for="inputId" class="nui-toggle-label">
                {{ props.label }}
            </label>
        </slot>
        <label :for="inputId" class="nui-toggle-host">
            <input
                :id="inputId"
                v-model="model"
                type="checkbox"
                :name="props.name"
                :disabled="props.disabled"
                class="nui-toggle-input"
                v-bind="$attrs"
            />
            <span class="nui-toggle-display">
                <span v-if="$slots.on" class="nui-toggle-content-on">
                    <slot name="on" />
                </span>
                <span v-if="$slots.off" class="nui-toggle-content-off">
                    <slot name="off" />
                </span>
                <span class="nui-toggle-thumb">
                    <slot name="thumb" />
                </span>
            </span>
            <span v-if="props.description || $slots.description" class="nui-toggle-description">
                <slot>{{ props.description }}</slot>
            </span>
        </label>
        <slot v-if="props.helperText || $slots['helper']" name="helper">
            <p class="nui-toggle-helper">
                {{ props.helperText }}
            </p>
        </slot>
    </div>
</template>

<script setup lang="ts">
    import { computed, useAttrs } from 'vue'

    defineOptions({ inheritAttrs: false })
    const model = defineModel<boolean | null>()
    const attrs = useAttrs()
    const inputId = computed(
        () => (attrs.id as string) || `nui-toggle-${Math.random().toString(36).slice(2)}`
    )

    export type NuiToggleSize = 'small' | 'medium' | 'large'
    export type NuiToggleColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'
    export interface NuiToggleProps {
        modelValue?: boolean | null
        label?: string
        name?: string
        description?: string
        disabled?: boolean
        color?: NuiToggleColor
        size?: NuiToggleSize
        helperText?: string
    }

    const props = withDefaults(defineProps<NuiToggleProps>(), {
        modelValue: false,
        label: undefined,
        name: undefined,
        description: undefined,
        disabled: false,
        color: 'current',
        size: 'medium',
        helperText: undefined
    })

    const wrapperClasses = computed(() => [
        'nui-toggle-wrapper',
        `nui-toggle-wrapper--size-${props.size}`,
        `nui-toggle-wrapper--color-${props.color}`,
        {
            'nui-toggle-wrapper--disabled': props.disabled
        }
    ])
</script>

<style lang="css">
    @import 'tailwindcss';
    @import '../styles/index.css';
    @import '../styles/components.css';

    @layer components {
        .nui-toggle-wrapper {
            @apply flex flex-col gap-xs;

            /* Label, description, helper text */
            .nui-toggle-label {
                @apply text-[length:var(--nui-toggle-label-font-size)] font-[var(--nui-toggle-label-font-weight)];
            }
            .nui-toggle-description {
                @apply text-[length:var(--nui-toggle-description-font-size)] font-[var(--nui-toggle-description-font-weight)] cursor-pointer;
            }
            .nui-toggle-helper {
                @apply text-[length:var(--nui-toggle-helper-font-size)] font-[var(--nui-toggle-helper-font-weight)];
            }

            /* Main interactive element */
            .nui-toggle-host {
                @apply flex items-center gap-xs self-start cursor-pointer;
            }

            /* Visually hidden input */
            .nui-toggle-input {
                @apply sr-only;
            }

            /* Visual representation of the toggle track */
            .nui-toggle-display {
                @apply relative inline-flex items-center shrink-0
                    bg-[var(--nui-toggle-background-color)]
                    rounded-[var(--nui-toggle-radius)]
                    border-[length:var(--nui-toggle-border-size)] border-[var(--nui-toggle-border-color)]
                    hover:opacity-70
                    transition-all duration-250 ease-in-out;
            }

            /* On/Off content slots */
            .nui-toggle-content-on,
            .nui-toggle-content-off {
                @apply absolute top-0 flex items-center h-full z-0;
            }
            .nui-toggle-content-on {
                @apply left-0 px-xxs text-bg;
            }
            .nui-toggle-content-off {
                @apply right-0 px-xxs;
            }

            /* Movable thumb */
            .nui-toggle-thumb {
                @apply inline-flex items-center justify-center pointer-events-none relative z-10
                    bg-[var(--nui-toggle-thumb-background-color)]
                    rounded-[var(--nui-toggle-radius)]
                    translate-x-[var(--nui-toggle-thumb-translate-x-start)]
                    transition-all duration-250 ease-in-out;
            }

            /* --- States --- */
            .nui-toggle-input:checked ~ .nui-toggle-display .nui-toggle-thumb {
                @apply translate-x-[var(--nui-toggle-thumb-translate-x-end)];
            }
            .nui-toggle-host:has(.nui-toggle-input:focus) .nui-toggle-display {
                @apply ring-2 ring-fg/50 ring-offset-2 ring-offset-bg;
            }
            &.nui-toggle-wrapper--disabled {
                @apply cursor-not-allowed opacity-50;
                .nui-toggle-description {
                    @apply cursor-not-allowed;
                }
            }
            .nui-toggle-input:disabled ~ .nui-toggle-display {
                @apply cursor-not-allowed;
            }
            /* --- Sizes --- */
            &.nui-toggle-wrapper--size-small {
                --nui-toggle-thumb-translate-x-end: var(--nui-toggle-thumb-translate-x-end-small);
                .nui-toggle-display {
                    @apply h-[var(--nui-toggle-track-height-small)] w-[var(--nui-toggle-track-width-small)];
                }
                .nui-toggle-thumb {
                    @apply h-[var(--nui-toggle-thumb-size-small)] w-[var(--nui-toggle-thumb-size-small)];
                }
                .nui-toggle-content-on,
                .nui-toggle-content-off {
                    @apply text-[length:var(--nui-toggle-slot-font-size-small)] leading-[var(--nui-toggle-slot-font-size-small)];
                }
            }
            &.nui-toggle-wrapper--size-medium {
                --nui-toggle-thumb-translate-x-end: var(--nui-toggle-thumb-translate-x-end-medium);
                .nui-toggle-display {
                    @apply h-[var(--nui-toggle-track-height-medium)] w-[var(--nui-toggle-track-width-medium)];
                }
                .nui-toggle-thumb {
                    @apply h-[var(--nui-toggle-thumb-size-medium)] w-[var(--nui-toggle-thumb-size-medium)];
                }
                .nui-toggle-content-on,
                .nui-toggle-content-off {
                    @apply text-[length:var(--nui-toggle-slot-font-size-medium)] leading-[var(--nui-toggle-slot-font-size-medium)];
                }
            }
            &.nui-toggle-wrapper--size-large {
                --nui-toggle-thumb-translate-x-end: var(--nui-toggle-thumb-translate-x-end-large);
                .nui-toggle-display {
                    @apply h-[var(--nui-toggle-track-height-large)] w-[var(--nui-toggle-track-width-large)];
                }
                .nui-toggle-thumb {
                    @apply h-[var(--nui-toggle-thumb-size-large)] w-[var(--nui-toggle-thumb-size-large)];
                }
                .nui-toggle-content-on,
                .nui-toggle-content-off {
                    @apply text-[length:var(--nui-toggle-slot-font-size-large)] leading-[var(--nui-toggle-slot-font-size-large)];
                }
            }

            /* --- Colors --- */
            /* Text colors for label, description, and helper */
            .nui-toggle-label,
            .nui-toggle-description,
            .nui-toggle-helper {
                .nui-toggle-wrapper--color-primary & {
                    @apply text-primary;
                }
                .nui-toggle-wrapper--color-success & {
                    @apply text-success;
                }
                .nui-toggle-wrapper--color-error & {
                    @apply text-error;
                }
                .nui-toggle-wrapper--color-warning & {
                    @apply text-warning;
                }
                .nui-toggle-wrapper--color-info & {
                    @apply text-info;
                }
            }

            /* Thumb icon color */
            .nui-toggle-thumb {
                .nui-toggle-wrapper--color-primary & {
                    @apply text-primary;
                }
                .nui-toggle-wrapper--color-success & {
                    @apply text-success;
                }
                .nui-toggle-wrapper--color-error & {
                    @apply text-error;
                }
                .nui-toggle-wrapper--color-warning & {
                    @apply text-warning;
                }
                .nui-toggle-wrapper--color-info & {
                    @apply text-info;
                }
            }

            /* Track colors (unchecked) */
            .nui-toggle-input ~ .nui-toggle-display {
                .nui-toggle-wrapper--color-primary & {
                    @apply bg-primary/20 border-primary;
                }
                .nui-toggle-wrapper--color-success & {
                    @apply bg-success/20 border-success;
                }
                .nui-toggle-wrapper--color-error & {
                    @apply bg-error/20 border-error;
                }
                .nui-toggle-wrapper--color-warning & {
                    @apply bg-warning/20 border-warning;
                }
                .nui-toggle-wrapper--color-info & {
                    @apply bg-info/20 border-info;
                }
            }

            /* Track colors (checked) */
            .nui-toggle-input:checked ~ .nui-toggle-display {
                .nui-toggle-wrapper--color-primary & {
                    @apply bg-primary border-primary;
                }
                .nui-toggle-wrapper--color-success & {
                    @apply bg-success border-success;
                }
                .nui-toggle-wrapper--color-error & {
                    @apply bg-error border-error;
                }
                .nui-toggle-wrapper--color-warning & {
                    @apply bg-warning border-warning;
                }
                .nui-toggle-wrapper--color-info & {
                    @apply bg-info border-info;
                }
                .nui-toggle-wrapper--color-current & {
                    @apply bg-text;
                }
            }

            /* Focus ring colors */
            .nui-toggle-host:has(.nui-toggle-input:focus) .nui-toggle-display {
                .nui-toggle-wrapper--color-primary & {
                    @apply ring-primary/50;
                }
                .nui-toggle-wrapper--color-success & {
                    @apply ring-success/50;
                }
                .nui-toggle-wrapper--color-error & {
                    @apply ring-error/50;
                }
                .nui-toggle-wrapper--color-warning & {
                    @apply ring-warning/50;
                }
                .nui-toggle-wrapper--color-info & {
                    @apply ring-info/50;
                }
            }
        }
    }
</style>
