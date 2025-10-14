
<template>
    <div :class="wrapperClasses">
        <slot v-if="props.label || $slots['label']" name="label">
            <label :for="inputId" class="nui-radio-label">
                {{ props.label }}
            </label>
        </slot>
        <label :for="inputId" class="nui-radio-host">
            <input
                :id="inputId"
                v-model="model"
                type="radio"
                :name="props.name"
                :value="props.value"
                :disabled="props.disabled"
                class="nui-radio-input"
                v-bind="$attrs"
            />
            <span class="nui-radio-display">
                <span class="nui-radio-dot"/>
            </span>
            <span v-if="props.description || $slots.description" class="nui-radio-description">
                <slot>{{ props.description }}</slot>
            </span>
        </label>
        <slot v-if="props.helperText || $slots['helper']" name="helper">
            <p class="nui-radio-helper">
                {{ props.helperText }}
            </p>
        </slot>
    </div>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    import { computed, useAttrs } from 'vue'

    defineOptions({ inheritAttrs: false })
    const model = defineModel<string | number | boolean | Record<string, any>>()
    const attrs = useAttrs()
    const inputId = computed(
        () =>
            (attrs.id as string) ||
            `nui-radio-${Math.random()
                .toString(36)
                .slice(2)}`,
    )

    export type NuiRadioSize = 'small' | 'medium' | 'large'
    export type NuiRadioColor =
        | 'primary'
        | 'success'
        | 'error'
        | 'warning'
        | 'info'
        | 'current'
    export interface NuiRadioProps {
        value: string | number | boolean | Record<string, any>
        modelValue?: string | number | boolean | Record<string, any>
        label?: string
        name?: string
        description?: string
        disabled?: boolean
        color?: NuiRadioColor
        size?: NuiRadioSize
        helperText?: string
    }

    const props = withDefaults(defineProps<NuiRadioProps>(), {
        modelValue: undefined,
        label: undefined,
        name: 'nui-radio',
        description: undefined,
        disabled: false,
        color: 'current',
        size: 'medium',
        helperText: undefined,
    })

    const wrapperClasses = computed(() => [
        'nui-radio-wrapper',
        `nui-radio-wrapper--size-${props.size}`,
        `nui-radio-wrapper--color-${props.color}`,
        {
            'nui-radio-wrapper--disabled': props.disabled,
        },
    ])
</script>

<style lang="css">
    @import 'tailwindcss';
    @import '../styles/index.css';
    @import '../styles/components.css';

    @layer components {
        .nui-radio-wrapper {
            @apply flex flex-col gap-xs;

            /* Label, description, helper text */
            .nui-radio-label {
                @apply text-[length:var(--nui-radio-label-font-size)] font-[var(--nui-radio-label-font-weight)];
            }
            .nui-radio-description {
                @apply text-[length:var(--nui-radio-description-font-size)] font-[var(--nui-radio-description-font-weight)] cursor-pointer;
            }
            .nui-radio-helper {
                @apply text-[length:var(--nui-radio-helper-font-size)] font-[var(--nui-radio-helper-font-weight)];
            }

            /* Main interactive element */
            .nui-radio-host {
                @apply flex items-center gap-xs self-start cursor-pointer;
                &:has(.nui-radio-input:focus) .nui-radio-display {
                    @apply ring-2 ring-fg/50 ring-offset-2 ring-offset-bg;
                }
            }

            /* Visually hidden input */
            .nui-radio-input {
                @apply sr-only;
                &:checked ~ .nui-radio-display .nui-radio-dot {
                    @apply block;
                }
                &:disabled ~ .nui-radio-display {
                    @apply cursor-not-allowed;
                }
            }

            /* Visual representation of the radio */
            .nui-radio-display {
                @apply inline-flex items-center justify-center shrink-0
                    bg-[var(--nui-radio-background-color)]
                    rounded-[var(--nui-radio-radius)]
                    border-[length:var(--nui-radio-border-size)] border-[var(--nui-radio-border-color)]
                    hover:opacity-70
                    transition-all duration-250 ease-in-out;
            }
            
            .nui-radio-dot {
                @apply hidden rounded-full;
            }

            /* Disabled state */
            &.nui-radio-wrapper--disabled {
                @apply cursor-not-allowed opacity-50;
                .nui-radio-description {
                    @apply cursor-not-allowed;
                }
            }
            
            /* --- Sizes --- */
            &.nui-radio-wrapper--size-small {
                .nui-radio-display {
                    @apply h-[var(--nui-radio-size-small)] w-[var(--nui-radio-size-small)];
                }
                .nui-radio-dot {
                    @apply h-[var(--nui-radio-dot-size-small)] w-[var(--nui-radio-dot-size-small)];
                }
            }
            &.nui-radio-wrapper--size-medium {
                .nui-radio-display {
                    @apply h-[var(--nui-radio-size-medium)] w-[var(--nui-radio-size-medium)];
                }
                .nui-radio-dot {
                    @apply h-[var(--nui-radio-dot-size-medium)] w-[var(--nui-radio-dot-size-medium)];
                }
            }
            &.nui-radio-wrapper--size-large {
                .nui-radio-display {
                    @apply h-[var(--nui-radio-size-large)] w-[var(--nui-radio-size-large)];
                }
                .nui-radio-dot {
                    @apply h-[var(--nui-radio-dot-size-large)] w-[var(--nui-radio-dot-size-large)];
                }
            }

            /* --- Colors --- */
            /* Text colors for label, description, and helper */
            .nui-radio-label,
            .nui-radio-description,
            .nui-radio-helper {
                .nui-radio-wrapper--color-primary & { @apply text-primary; }
                .nui-radio-wrapper--color-success & { @apply text-success; }
                .nui-radio-wrapper--color-error & { @apply text-error; }
                .nui-radio-wrapper--color-warning & { @apply text-warning; }
                .nui-radio-wrapper--color-info & { @apply text-info; }
            }

            /* Focus ring colors */
            .nui-radio-host:has(.nui-radio-input:focus) .nui-radio-display {
                .nui-radio-wrapper--color-primary & { @apply ring-primary/50; }
                .nui-radio-wrapper--color-success & { @apply ring-success/50; }
                .nui-radio-wrapper--color-error & { @apply ring-error/50; }
                .nui-radio-wrapper--color-warning & { @apply ring-warning/50; }
                .nui-radio-wrapper--color-info & { @apply ring-info/50; }
            }

            /* Checked state colors */
            .nui-radio-input:checked ~ .nui-radio-display {
                .nui-radio-wrapper--color-primary & { @apply border-primary; }
                .nui-radio-wrapper--color-success & { @apply border-success; }
                .nui-radio-wrapper--color-error & { @apply border-error; }
                .nui-radio-wrapper--color-warning & { @apply border-warning; }
                .nui-radio-wrapper--color-info & { @apply border-info; }
                .nui-radio-wrapper--color-current & { @apply border-text; }

                .nui-radio-dot {
                    .nui-radio-wrapper--color-primary & { @apply bg-primary; }
                    .nui-radio-wrapper--color-success & { @apply bg-success; }
                    .nui-radio-wrapper--color-error & { @apply bg-error; }
                    .nui-radio-wrapper--color-warning & { @apply bg-warning; }
                    .nui-radio-wrapper--color-info & { @apply bg-info; }
                    .nui-radio-wrapper--color-current & { @apply bg-text; }
                }
            }
        }
    }
</style>