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
            'nui-checkbox-wrapper--disabled': props.disabled,
            'nui-checkbox-wrapper--indeterminate': props.indeterminate,
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

            .nui-checkbox-label {
                @apply text-[length:var(--nui-checkbox-label-font-size)] font-[var(--nui-checkbox-label-font-weight)] text-[var(--nui-checkbox-label-text-color)];
            }

            .nui-checkbox-host {
                @apply flex items-center gap-xs self-start cursor-pointer;
            }

            .nui-checkbox-host:has(.nui-checkbox-input:focus-visible) .nui-checkbox-display {
                @apply text-[--nui-checkbox-label-text-color] ring-2 ring-current/50;
            }

            .nui-checkbox-input {
                @apply sr-only;
            }

            /* Display */
            .nui-checkbox-display {
                @apply inline-flex items-center justify-center shrink-0 text-text
                    bg-[var(--nui-checkbox-background-color)]
                    rounded-[var(--nui-checkbox-radius)]
                    border-[length:var(--nui-checkbox-border-size)] border-[var(--nui-checkbox-border-color)]
                    transition-all duration-250 ease-in-out;
            }
            .nui-checkbox-icon-checked,
            .nui-checkbox-icon-indeterminate {
                @apply hidden;
            }
            .nui-checkbox-input:checked ~ .nui-checkbox-display .nui-checkbox-icon-checked {
                @apply block;
            }
            .nui-checkbox-input:indeterminate ~ .nui-checkbox-display .nui-checkbox-icon-indeterminate {
                @apply block;
            }
            .nui-checkbox-input:disabled ~ .nui-checkbox-display {
                @apply border-[var(--nui-checkbox-border-color)] cursor-not-allowed;
            }

            .nui-checkbox-description {
                @apply text-[length:var(--nui-checkbox-description-font-size)] font-[var(--nui-checkbox-description-font-weight)] text-[var(--nui-checkbox-description-color)] cursor-pointer;
                .nui-checkbox-wrapper--disabled & {
                    @apply cursor-not-allowed;
                }
            }

            .nui-checkbox-helper {
                @apply text-[length:var(--nui-checkbox-helper-font-size)] font-[var(--nui-checkbox-helper-font-weight)] text-[var(--nui-checkbox-helper-text-color)];
            }

            /* Disabled */
            &.nui-checkbox-wrapper--disabled {
                @apply cursor-not-allowed opacity-50;
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
            &.nui-checkbox-wrapper--color-primary {
                .nui-checkbox-label { @apply text-primary/95; }
                .nui-checkbox-description { @apply text-primary/95; }
                .nui-checkbox-input:checked ~ .nui-checkbox-display,
                .nui-checkbox-input:indeterminate ~ .nui-checkbox-display {
                    @apply bg-primary/80 border-primary;
                    .nui-checkbox-icon-checked, .nui-checkbox-icon-indeterminate {
                        @apply text-[var(--nui-checkbox-tick-color)];
                    }
                }
                .nui-checkbox-helper {
                    @apply text-primary;
                }
                .nui-checkbox-host:has(.nui-checkbox-input:focus-visible) .nui-checkbox-display {
                    @apply text-primary;
                }
            }
            &.nui-checkbox-wrapper--color-success {
                .nui-checkbox-label { @apply text-success/95; }
                .nui-checkbox-description { @apply text-success/95; }
                .nui-checkbox-input:checked ~ .nui-checkbox-display,
                .nui-checkbox-input:indeterminate ~ .nui-checkbox-display {
                    @apply bg-success/80 border-success;
                    .nui-checkbox-icon-checked, .nui-checkbox-icon-indeterminate {
                        @apply text-[var(--nui-checkbox-tick-color)];
                    }
                }
                .nui-checkbox-helper {
                    @apply text-success;
                }
                .nui-checkbox-host:has(.nui-checkbox-input:focus-visible) .nui-checkbox-display {
                    @apply text-success;
                }
            }
            &.nui-checkbox-wrapper--color-error {
                .nui-checkbox-label { @apply text-error/95; }
                .nui-checkbox-description { @apply text-error/95; }
                .nui-checkbox-input:checked ~ .nui-checkbox-display,
                .nui-checkbox-input:indeterminate ~ .nui-checkbox-display {
                    @apply bg-error/80 border-error;
                    .nui-checkbox-icon-checked, .nui-checkbox-icon-indeterminate {
                        @apply text-[var(--nui-checkbox-tick-color)];
                    }
                }
                .nui-checkbox-helper {
                    @apply text-error;
                }
                .nui-checkbox-host:has(.nui-checkbox-input:focus-visible) .nui-checkbox-display {
                    @apply text-error;
                }
            }
            &.nui-checkbox-wrapper--color-warning {
                .nui-checkbox-label { @apply text-warning/95; }
                .nui-checkbox-description { @apply text-warning/95; }
                .nui-checkbox-input:checked ~ .nui-checkbox-display,
                .nui-checkbox-input:indeterminate ~ .nui-checkbox-display {
                    @apply bg-warning/80 border-warning;
                    .nui-checkbox-icon-checked, .nui-checkbox-icon-indeterminate {
                        @apply text-[var(--nui-checkbox-tick-color)];
                    }
                }
                .nui-checkbox-helper {
                    @apply text-warning;
                }
                .nui-checkbox-host:has(.nui-checkbox-input:focus-visible) .nui-checkbox-display {
                    @apply text-warning;
                }
            }
            &.nui-checkbox-wrapper--color-current {
                .nui-checkbox-label { @apply text-current/95; }
                .nui-checkbox-input:checked ~ .nui-checkbox-display,
                .nui-checkbox-input:indeterminate ~ .nui-checkbox-display {
                    @apply bg-text text-[var(--nui-checkbox-tick-color)] ring-text/50;
                }
            }
        }
    }
</style>