<template>
    <div :class="wrapperClasses">
        <label v-if="props.label" :for="inputId" class="nui-input-label">
            {{ props.label }}
        </label>
        <div :class="outerClasses">
            <div v-if="$slots.prepend" class="nui-input-prepend">
                <slot name="prepend" />
            </div>
            <div class="nui-input-inner">
                <input
                    :id="inputId"
                    v-model="model"
                    :type="props.type"
                    :placeholder="props.placeholder"
                    :disabled="props.disabled || props.loading"
                    class="nui-input"
                />
                <div v-if="loading" class="nui-input-loading">
                    <nui-icon name="loading" class="animate-spin" />
                </div>
            </div>
            <div v-if="$slots.append" class="nui-input-append">
                <slot name="append" />
            </div>
        </div>
        <p v-if="props.helperText" class="nui-input-helper">
            {{ props.helperText }}
        </p>
    </div>
</template>
<script setup lang="ts">
    import { computed, useAttrs, useSlots } from 'vue'
    import NuiIcon from './NuiIcon.vue'

    defineOptions({ inheritAttrs: false })
    const model = defineModel<string | number>()
    const attrs = useAttrs()
    const slots = useSlots()
    const inputId = computed(() => (attrs.id as string) || `nui-input-${Math.random()
        .toString(36)
        .slice(2)}`)

    export type NuiInputSize = 'small' | 'medium' | 'large'
    export type NuiInputColor = 'primary' | 'success' | 'error' | 'warning' | 'current'
    export interface NuiInputProps {
        type?: string
        color?: NuiInputColor
        size?: NuiInputSize
        disabled?: boolean
        label?: string
        placeholder?: string
        helperText?: string
        rounded?: boolean
        pilled?: boolean
        loading?: boolean
    }
    const props = withDefaults(defineProps<NuiInputProps>(), {
        type: 'text',
        color: 'current',
        size: 'medium',
        disabled: false,
        label: undefined,
        placeholder: undefined,
        helperText: undefined,
        rounded: false,
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
            'nui-input-outer--rounded': props.rounded && !props.pilled,
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

        .nui-input-label {
            @apply text-[length:var(--nui-input-label-font-size)] font-[var(--nui-input-label-font-weight)] text-[var(--nui-input-label-text-color)];
        }

        .nui-input-outer {
            @apply flex flex-nowrap items-center gap-xs;

            .nui-input-inner {
                @apply flex flex-nowrap items-center bg-[var(--nui-input-background-color)] gap-xs grow
                    py-[var(--nui-input-padding-y)] px-[var(--nui-input-padding-x)]
                    rounded-[var(--nui-input-radius)]
                    border-[length:var(--nui-input-border-size)] border-[var(--nui-input-border-color)]
                    outline-0 focus-within:ring-[length:var(--nui-input-border-size)] focus-within:ring-current/50
                    transition-all duration-250 ease-in-out;

                &:has(input:is(:disabled)) {
                    @apply border-[var(--nui-input-border-color)];
                }

                .nui-input {
                    @apply grow w-auto bg-transparent
                        text-text
                        border-none ring-0
                        focus:ring-0 focus:ring-offset-0 outline-none;
                }
            }

            /* Sizes */
            &.nui-input-outer--size-small .nui-input {
                @apply text-[length:var(--nui-input-font-size-small)];
            }
            &.nui-input-outer--size-medium .nui-input {
                @apply text-[length:var(--nui-input-font-size-medium)];
            }
            &.nui-input-outer--size-large .nui-input {
                @apply text-[length:var(--nui-input-font-size-large)];
            }
        }
        
        .nui-input-helper {
            @apply text-[length:var(--nui-input-helper-font-size)] font-[var(--nui-input-helper-font-weight)] text-[var(--nui-input-helper-text-color)];
        }

        .nui-input--prepend,
        .nui-input--append {
            @apply flex items-center;
        }

        /* Disabled */
        &.nui-input-wrapper--disabled {
            @apply opacity-50 cursor-not-allowed;
        }

        /* Colors */
        &.nui-input-wrapper--color-primary {
            @apply text-primary;
            .nui-input-label { @apply text-primary/95; }
            .nui-input-inner { @apply border-primary; }
            .nui-input-helper { @apply text-primary; }
        }
        &.nui-input-wrapper--color-success {
            @apply text-success;
            .nui-input-label { @apply text-success/95; }
            .nui-input-inner { @apply border-success; }
            .nui-input-helper { @apply text-success; }
        }
        &.nui-input-wrapper--color-error {
            @apply text-error;
            .nui-input-label { @apply text-error/95; }
            .nui-input-inner { @apply border-error; }
            .nui-input-helper { @apply text-error; }
        }
        &.nui-input-wrapper--color-warning {
            @apply text-warning;
            .nui-input-label { @apply text-warning/95; }
            .nui-input-inner { @apply border-warning; }
            .nui-input-helper { @apply text-warning; }
        }
        &.nui-input-wrapper--color-current {
            @apply text-current;
            .nui-input-label { @apply text-current/95; }
            .nui-input-helper { @apply text-current; }
        }
    }
}
</style>