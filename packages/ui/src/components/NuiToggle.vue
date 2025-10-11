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
                <span class="nui-toggle-thumb" />
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
        () =>
            (attrs.id as string) ||
            `nui-toggle-${Math.random()
                .toString(36)
                .slice(2)}`,
    )

    export type NuiToggleSize = 'small' | 'medium' | 'large'
    export type NuiToggleColor =
        | 'primary'
        | 'success'
        | 'error'
        | 'warning'
        | 'current'
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
        helperText: undefined,
    })

    const wrapperClasses = computed(() => [
        'nui-toggle-wrapper',
        `nui-toggle-wrapper--size-${props.size}`,
        `nui-toggle-wrapper--color-${props.color}`,
        {
            'nui-toggle-wrapper--disabled': props.disabled,
        },
    ])
</script>

<style lang="css">
    @import 'tailwindcss';
    @import '../styles/index.css';
    @import '../styles/components.css';

    @layer components {
        .nui-toggle-wrapper {
            @apply flex flex-col gap-xs;

            .nui-toggle-label {
                @apply text-[length:var(--nui-toggle-label-font-size)] font-[var(--nui-toggle-label-font-weight)] text-[var(--nui-toggle-label-text-color)];
            }

            .nui-toggle-host {
                @apply flex items-center gap-xs self-start cursor-pointer;
            }

            .nui-toggle-host:has(.nui-toggle-input:focus-visible) .nui-toggle-display {
                @apply text-[--nui-toggle-label-text-color] ring-2 ring-current/50;
            }

            .nui-toggle-input {
                @apply sr-only;
            }

            /* Display */
            .nui-toggle-display {
                @apply relative inline-flex items-center shrink-0
                    bg-[var(--nui-toggle-background-color)]
                    rounded-[var(--nui-toggle-radius)]
                    border-[length:var(--nui-toggle-border-size)] border-[var(--nui-toggle-border-color)]
                    transition-all duration-250 ease-in-out;

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

                .nui-toggle-thumb {
                    @apply block pointer-events-none relative z-10
                        bg-[var(--nui-toggle-thumb-background-color)]
                        rounded-[var(--nui-toggle-radius)]
                        translate-x-[var(--nui-toggle-thumb-translate-x-start)]
                        transition-all duration-250 ease-in-out;
                }
            }
            
            .nui-toggle-input:checked ~ .nui-toggle-display .nui-toggle-thumb {
                @apply translate-x-[var(--nui-toggle-thumb-translate-x-end)] text-bg
                bg-current;
            }
            .nui-toggle-input:disabled ~ .nui-toggle-display {
                @apply border-[var(--nui-toggle-border-color)] cursor-not-allowed;
            }

            .nui-toggle-description {
                @apply text-[length:var(--nui-toggle-description-font-size)] font-[var(--nui-toggle-description-font-weight)] text-[var(--nui-toggle-description-color)] cursor-pointer;
                .nui-toggle-wrapper--disabled & {
                    @apply cursor-not-allowed;
                }
            }

            .nui-toggle-helper {
                @apply text-[length:var(--nui-toggle-helper-font-size)] font-[var(--nui-toggle-helper-font-weight)] text-[var(--nui-toggle-helper-text-color)];
            }

            /* Disabled */
            &.nui-toggle-wrapper--disabled {
                @apply cursor-not-allowed opacity-50;
            }

            /* --- Sizes --- */
            &.nui-toggle-wrapper--size-small {
                --nui-toggle-thumb-translate-x-end: var(--nui-toggle-thumb-translate-x-end-small);
                .nui-toggle-display {
                    @apply h-[var(--nui-toggle-track-height-small)] w-[var(--nui-toggle-track-width-small)];
                    .nui-toggle-content-on,
                    .nui-toggle-content-off {
                        @apply text-[length:var(--nui-toggle-slot-font-size-small)];
                    }
                }
                .nui-toggle-thumb {
                    @apply h-[var(--nui-toggle-thumb-size-small)] w-[var(--nui-toggle-thumb-size-small)];
                }
            }
            &.nui-toggle-wrapper--size-medium {
                --nui-toggle-thumb-translate-x-end: var(--nui-toggle-thumb-translate-x-end-medium);
                .nui-toggle-display {
                    @apply h-[var(--nui-toggle-track-height-medium)] w-[var(--nui-toggle-track-width-medium)];
                    .nui-toggle-content-on,
                    .nui-toggle-content-off {
                        @apply text-[length:var(--nui-toggle-slot-font-size-medium)];
                    }
                }
                .nui-toggle-thumb {
                    @apply h-[var(--nui-toggle-thumb-size-medium)] w-[var(--nui-toggle-thumb-size-medium)];
                }
            }
            &.nui-toggle-wrapper--size-large {
                --nui-toggle-thumb-translate-x-end: var(--nui-toggle-thumb-translate-x-end-large);
                .nui-toggle-display {
                    @apply h-[var(--nui-toggle-track-height-large)] w-[var(--nui-toggle-track-width-large)];
                    .nui-toggle-content-on,
                    .nui-toggle-content-off {
                        @apply text-[length:var(--nui-toggle-slot-font-size-large)];
                    }
                }
                .nui-toggle-thumb {
                    @apply h-[var(--nui-toggle-thumb-size-large)] w-[var(--nui-toggle-thumb-size-large)];
                }
            }

            /* --- Colors --- */
            &.nui-toggle-wrapper--color-primary {
                .nui-toggle-label,
                .nui-toggle-description {
                    @apply text-primary/95;
                }
                .nui-toggle-helper {
                    @apply text-primary;
                }
                .nui-toggle-input {
                    & ~ .nui-toggle-display {
                        @apply border-primary;
                    }
                    &:checked ~ .nui-toggle-display {
                        @apply bg-primary/80 border-primary;
                    }
                }
                .nui-toggle-host:has(.nui-toggle-input:focus-visible) .nui-toggle-display {
                    @apply text-primary;
                }
            }
            &.nui-toggle-wrapper--color-success {
                .nui-toggle-label,
                .nui-toggle-description {
                    @apply text-success/95;
                }
                .nui-toggle-helper {
                    @apply text-success;
                }
                .nui-toggle-input {
                    & ~ .nui-toggle-display {
                        @apply border-success;
                    }
                    &:checked ~ .nui-toggle-display {
                        @apply bg-success/80 border-success;
                    }
                }
                .nui-toggle-host:has(.nui-toggle-input:focus-visible) .nui-toggle-display {
                    @apply text-success;
                }
            }
            &.nui-toggle-wrapper--color-error {
                .nui-toggle-label,
                .nui-toggle-description {
                    @apply text-error/95;
                }
                .nui-toggle-helper {
                    @apply text-error;
                }
                .nui-toggle-input {
                    & ~ .nui-toggle-display {
                        @apply border-error;
                    }
                    &:checked ~ .nui-toggle-display {
                        @apply bg-error/80 border-error;
                    }
                }
                .nui-toggle-host:has(.nui-toggle-input:focus-visible) .nui-toggle-display {
                    @apply text-error;
                }
            }
            &.nui-toggle-wrapper--color-warning {
                .nui-toggle-label,
                .nui-toggle-description {
                    @apply text-warning/95;
                }
                .nui-toggle-helper {
                    @apply text-warning;
                }
                .nui-toggle-input {
                    & ~ .nui-toggle-display {
                        @apply border-warning;
                    }
                    &:checked ~ .nui-toggle-display {
                        @apply bg-warning/80 border-warning;
                    }
                }
                .nui-toggle-host:has(.nui-toggle-input:focus-visible) .nui-toggle-display {
                    @apply text-warning;
                }
            }
            &.nui-toggle-wrapper--color-current {
                .nui-toggle-label {
                    @apply text-current/95;
                }
                .nui-toggle-input {
                    &:checked ~ .nui-toggle-display {
                        @apply bg-text text-text-invert;
                    }
                }
                .nui-toggle-host:has(.nui-toggle-input:focus-visible) .nui-toggle-display {
                    @apply text-text;
                }
            }
        }
    }
</style>
