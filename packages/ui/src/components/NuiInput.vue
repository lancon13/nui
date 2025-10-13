<template>
    <div :class="wrapperClasses">
        <slot v-if="props.label || $slots['label']" name="label">
            <label :for="inputId" class="nui-input-label">
                {{ props.label }}
            </label>
        </slot>
        <div class="nui-input-host">
            <div v-if="$slots.before" class="nui-input-before">
                <slot name="before" />
            </div>

            <div :class="outerClasses">
                <div v-if="$slots.prepend" class="nui-input-prepend">
                    <slot name="prepend" />
                </div>
                <input
                    :id="inputId"
                    v-model="model"
                    :name="props.name"
                    :type="props.type"
                    :placeholder="props.placeholder"
                    :disabled="props.disabled || props.loading"
                    class="nui-input"
                    v-bind="$attrs"
                />
                <div v-if="loading" class="nui-input-loading">
                    <nui-icon name="loading" class="animate-spin" />
                </div>
                <div v-if="$slots.append" class="nui-input-append">
                    <slot name="append" />
                </div>
            </div>

            <div v-if="$slots.after" class="nui-input-after">
                <slot name="after" />
            </div>
        </div>
        <slot v-if="props.helperText || $slots['helper']" name="helper">
            <p class="nui-input-helper">
                {{ props.helperText }}
            </p>
        </slot>
    </div>
</template>
<script setup lang="ts">
    import { computed, useAttrs } from 'vue'
    import NuiIcon from './NuiIcon.vue'

    defineOptions({ inheritAttrs: false })
    const model = defineModel<string | number>()
    const attrs = useAttrs()
    const inputId = computed(() => (attrs.id as string) || `nui-input-${Math.random()
        .toString(36)
        .slice(2)}`)

    export type NuiInputSize = 'small' | 'medium' | 'large'
    export type NuiInputColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'
    export interface NuiInputProps {
        name?: string
        type?: string
        color?: NuiInputColor
        size?: NuiInputSize
        disabled?: boolean
        label?: string
        placeholder?: string
        helperText?: string
        pilled?: boolean
        loading?: boolean
    }
    const props = withDefaults(defineProps<NuiInputProps>(), {
        name: undefined,
        type: 'text',
        color: 'current',
        size: 'medium',
        disabled: false,
        label: undefined,
        placeholder: undefined,
        helperText: undefined,
        pilled: false,
        loading: false,
    })

    const wrapperClasses = computed(() => [
        'nui-input-wrapper',
        props.color && `nui-input-wrapper--color-${props.color}`,
        {
            'nui-input-wrapper--disabled': props.disabled || props.loading,
        }
    ])
    const outerClasses = computed(() => [
        'nui-input-outer',
        `nui-input-outer--size-${props.size}`,
        {
            'nui-input-outer--pilled': props.pilled,
        },
    ])

</script>
<style lang="css">
@import "tailwindcss";
@import "../styles/index.css";
@import "../styles/components.css";

@layer components {
    .nui-input-wrapper {
        @apply flex flex-col gap-xs;

        /* Label, helper text */
        .nui-input-label {
            @apply text-[length:var(--nui-input-label-font-size)] font-[var(--nui-input-label-font-weight)];
        }
        .nui-input-helper {
            @apply text-[length:var(--nui-input-helper-font-size)] font-[var(--nui-input-helper-font-weight)];
        }
    
        .nui-input-host {
            @apply flex items-center gap-xs;
        }

        .nui-input-outer {
            @apply flex flex-nowrap items-center gap-xs grow
                    bg-[var(--nui-input-background-color)]
                    py-[var(--nui-input-padding-y)] px-[var(--nui-input-padding-x)]
                    rounded-[var(--nui-input-radius)]
                    border-[length:var(--nui-input-border-size)] border-[var(--nui-input-border-color)]
                    transition-all duration-250 ease-in-out;

            /* Focus */
            &:has(.nui-input:focus) {
                @apply ring-2 ring-fg/50 ring-offset-2 ring-offset-bg;
            }

            &:has(input:is(:disabled)) {
                @apply cursor-not-allowed;
            }

            .nui-input {
                @apply grow w-auto bg-transparent
                       text-text
                       border-none ring-0 ring-offset-0 outline-none appearance-none;
            }

            /* --- Shape --- */
            &.nui-input-outer--pilled {
                @apply rounded-full;
            }

            /* --- Sizes --- */
            &.nui-input-outer--size-small .nui-input {
                @apply text-[length:var(--nui-input-size-small)] leading-[var(--nui-input-size-small)];
            }
            &.nui-input-outer--size-medium .nui-input {
                @apply text-[length:var(--nui-input-size-medium)] leading-[var(--nui-input-size-medium)];
            }
            &.nui-input-outer--size-large .nui-input {
                @apply text-[length:var(--nui-input-size-large)] leading-[var(--nui-input-size-large)];
            }
        }
    
        /* Before, Prepend, Append, After slots */
        .nui-input-before,
        .nui-input-prepend,
        .nui-input-append,
        .nui-input-after {
            @apply flex items-center;
        }

        /* --- Disabled State --- */
        &.nui-input-wrapper--disabled {
            @apply opacity-50 cursor-not-allowed;
            .nui-input {
               @apply cursor-not-allowed;
            }
        }

        /* --- Colors --- */
        &.nui-input-wrapper--color-primary {
            .nui-input-label,
            .nui-input-helper,
            .nui-input-before,
            .nui-input-prepend,
            .nui-input-append,
            .nui-input-after {
                @apply text-primary;
            }
            .nui-input-outer {
                @apply border-primary text-primary;
                &:has(.nui-input:focus) {
                    @apply ring-primary/50;
                }
            }
        }
        &.nui-input-wrapper--color-success {
            .nui-input-label,
            .nui-input-helper,
            .nui-input-before,
            .nui-input-prepend,
            .nui-input-append,
            .nui-input-after {
                @apply text-success;
            }
            .nui-input-outer {
                @apply border-success text-success;
                &:has(.nui-input:focus) {
                    @apply ring-success/50;
                }
            }
        }
        &.nui-input-wrapper--color-error {
            .nui-input-label,
            .nui-input-helper,
            .nui-input-before,
            .nui-input-prepend,
            .nui-input-append,
            .nui-input-after {
                @apply text-error;
            }
            .nui-input-outer {
                @apply border-error text-error;
                &:has(.nui-input:focus) {
                    @apply ring-error/50;
                }
            }
        }
        &.nui-input-wrapper--color-warning {
            .nui-input-label,
            .nui-input-helper,
            .nui-input-before,
            .nui-input-prepend,
            .nui-input-append,
            .nui-input-after {
                @apply text-warning;
            }
            .nui-input-outer {
                @apply border-warning text-warning;
                &:has(.nui-input:focus) {
                    @apply ring-warning/50;
                }
            }
        }
        &.nui-input-wrapper--color-info {
            .nui-input-label,
            .nui-input-helper,
            .nui-input-before,
            .nui-input-prepend,
            .nui-input-append,
            .nui-input-after {
                @apply text-info;
            }
            .nui-input-outer {
                @apply border-info text-info;
                &:has(.nui-input:focus) {
                    @apply ring-info/50;
                }
            }
        }
        &.nui-input-wrapper--color-current {
            .nui-input-label,
            .nui-input-helper,
            .nui-input-before,
            .nui-input-prepend,
            .nui-input-append,
            .nui-input-after {
                @apply text-current;
            }
        }
    }
}
</style>

