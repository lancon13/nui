<template>
    <div :class="wrapperClasses">
        <slot v-if="props.label || $slots['label']" name="label">
            <label :for="inputId" class="nui-checkbox-label">
                {{ props.label }}
            </label>
        </slot>
        <label :for="inputId" class="nui-checkbox-host">
            <input
                :id="inputId"
                v-model="model"
                type="checkbox"
                :name="props.name"
                :disabled="props.disabled"
                :indeterminate="props.indeterminate"
                class="nui-checkbox-input"
                v-bind="$attrs"
            />
            <span class="nui-checkbox-display">
                <nui-icon name="check-bold" class="nui-checkbox-icon-checked" />
                <nui-icon name="minus" class="nui-checkbox-icon-indeterminate" />
            </span>
            <span v-if="props.description || $slots.description" class="nui-checkbox-description">
                <slot>{{ props.description }}</slot>
            </span>
        </label>
        <slot v-if="props.helperText || $slots['helper']" name="helper">
            <p class="nui-checkbox-helper">
                {{ props.helperText }}
            </p>
        </slot>
    </div>
</template>

<script setup lang="ts">
    import { computed, useAttrs } from 'vue'
    import NuiIcon from './NuiIcon.vue'

    defineOptions({ inheritAttrs: false })
    const model = defineModel<boolean | null>()
    const attrs = useAttrs()
    const inputId = computed(
        () =>
            (attrs.id as string) ||
            `nui-checkbox-${Math.random()
                .toString(36)
                .slice(2)}`,
    )

    export type NuiCheckboxSize = 'small' | 'medium' | 'large'
    export type NuiCheckboxColor =
        | 'primary'
        | 'success'
        | 'error'
        | 'warning'
        | 'info'
        | 'current'
    export interface NuiCheckboxProps {
        modelValue?: boolean | null
        label?: string
        name?: string
        description?: string
        disabled?: boolean
        indeterminate?: boolean
        color?: NuiCheckboxColor
        size?: NuiCheckboxSize
        helperText?: string
    }

    const props = withDefaults(defineProps<NuiCheckboxProps>(), {
        modelValue: false,
        label: undefined,
        name: undefined,
        description: undefined,
        disabled: false,
        indeterminate: false,
        color: 'current',
        size: 'medium',
        helperText: undefined,
    })

    const wrapperClasses = computed(() => [
        'nui-checkbox-wrapper',
        `nui-checkbox-wrapper--size-${props.size}`,
        `nui-checkbox-wrapper--color-${props.color}`,
        {
            'nui-checkbox-wrapper--indeterminate': props.indeterminate,
            'nui-checkbox-wrapper--disabled': props.disabled,
        },
    ])
</script>

<style lang="css">
    @import 'tailwindcss';
    @import '../styles/index.css';
    @import '../styles/components.css';

    @layer components {
        .nui-checkbox-wrapper {
            @apply flex flex-col gap-xs;

            /* Label, description, helper text */
            .nui-checkbox-label {
                @apply text-[length:var(--nui-checkbox-label-font-size)] font-[var(--nui-checkbox-label-font-weight)];
            }
            .nui-checkbox-description {
                @apply text-[length:var(--nui-checkbox-description-font-size)] font-[var(--nui-checkbox-description-font-weight)] cursor-pointer;
            }
            .nui-checkbox-helper {
                @apply text-[length:var(--nui-checkbox-helper-font-size)] font-[var(--nui-checkbox-helper-font-weight)];
            }

            /* Main interactive element */
            .nui-checkbox-host {
                @apply flex items-center gap-xs self-start cursor-pointer;
                &:has(.nui-checkbox-input:focus) .nui-checkbox-display {
                    @apply ring-2 ring-fg/50 ring-offset-2 ring-offset-bg;
                }
            }

            /* Visually hidden input */
            .nui-checkbox-input {
                @apply sr-only;
                &:checked ~ .nui-checkbox-display .nui-checkbox-icon-checked {
                    @apply block;
                }
                &:indeterminate ~ .nui-checkbox-display .nui-checkbox-icon-indeterminate {
                    @apply block;
                }
                &:disabled ~ .nui-checkbox-display {
                    @apply cursor-not-allowed;
                }
            }

            /* Visual representation of the checkbox */
            .nui-checkbox-display {
                @apply inline-flex items-center justify-center shrink-0
                    bg-[var(--nui-checkbox-background-color)]
                    rounded-[var(--nui-checkbox-radius)]
                    border-[length:var(--nui-checkbox-border-size)] border-[var(--nui-checkbox-border-color)]
                    hover:opacity-70
                    transition-all duration-250 ease-in-out;
            }
            
            /* Icons are hidden by default */
            .nui-checkbox-icon-checked,
            .nui-checkbox-icon-indeterminate {
                @apply hidden;
            }

            /* Disabled state */
            &.nui-checkbox-wrapper--disabled {
                @apply cursor-not-allowed opacity-50;
                .nui-checkbox-description {
                    @apply cursor-not-allowed;
                }
            }
            
            /* --- Sizes --- */
            &.nui-checkbox-wrapper--size-small {
                .nui-checkbox-display {
                    @apply h-[var(--nui-checkbox-size-small)] w-[var(--nui-checkbox-size-small)];
                }
                .nui-checkbox-icon-checked,
                .nui-checkbox-icon-indeterminate {
                    @apply text-[length:var(--nui-checkbox-icon-size-small)] leading-[var(--nui-checkbox-icon-size-small)];
                }
            }
            &.nui-checkbox-wrapper--size-medium {
                .nui-checkbox-display {
                    @apply h-[var(--nui-checkbox-size-medium)] w-[var(--nui-checkbox-size-medium)];
                }
                .nui-checkbox-icon-checked,
                .nui-checkbox-icon-indeterminate {
                    @apply text-[length:var(--nui-checkbox-icon-size-medium)] leading-[var(--nui-checkbox-icon-size-medium)];
                }
            }
            &.nui-checkbox-wrapper--size-large {
                .nui-checkbox-display {
                    @apply h-[var(--nui-checkbox-size-large)] w-[var(--nui-checkbox-size-large)];
                }
                .nui-checkbox-icon-checked,
                .nui-checkbox-icon-indeterminate {
                    @apply text-[length:var(--nui-checkbox-icon-size-large)] leading-[var(--nui-checkbox-icon-size-large)];
                }
            }

            /* --- Colors --- */
            /* Text colors for label, description, and helper */
            .nui-checkbox-label,
            .nui-checkbox-description,
            .nui-checkbox-helper {
                .nui-checkbox-wrapper--color-primary & { @apply text-primary; }
                .nui-checkbox-wrapper--color-success & { @apply text-success; }
                .nui-checkbox-wrapper--color-error & { @apply text-error; }
                .nui-checkbox-wrapper--color-warning & { @apply text-warning; }
                .nui-checkbox-wrapper--color-info & { @apply text-info; }
            }

            /* Focus ring colors */
            .nui-checkbox-host:has(.nui-checkbox-input:focus) .nui-checkbox-display {
                .nui-checkbox-wrapper--color-primary & { @apply ring-primary/50; }
                .nui-checkbox-wrapper--color-success & { @apply ring-success/50; }
                .nui-checkbox-wrapper--color-error & { @apply ring-error/50; }
                .nui-checkbox-wrapper--color-warning & { @apply ring-warning/50; }
                .nui-checkbox-wrapper--color-info & { @apply ring-info/50; }
            }

            /* Checked/Indeterminate state colors */
            .nui-checkbox-input:is(:checked, :indeterminate) ~ .nui-checkbox-display {
                .nui-checkbox-wrapper--color-primary & { @apply bg-primary border-primary; }
                .nui-checkbox-wrapper--color-success & { @apply bg-success border-success; }
                .nui-checkbox-wrapper--color-error & { @apply bg-error border-error; }
                .nui-checkbox-wrapper--color-warning & { @apply bg-warning border-warning; }
                .nui-checkbox-wrapper--color-info & { @apply bg-info border-info; }
                .nui-checkbox-wrapper--color-current & { @apply bg-text; }

                /* Tick color is consistent across variants */
                .nui-checkbox-icon-checked,
                .nui-checkbox-icon-indeterminate {
                    @apply text-[var(--nui-checkbox-tick-color)];
                }
            }
        }
    }
</style>