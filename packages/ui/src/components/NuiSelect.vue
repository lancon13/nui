<template>
    <div :class="wrapperClasses">
        <slot v-if="props.label || $slots['label']" name="label">
            <label :for="inputId" class="nui-select-label">
                {{ props.label }}
            </label>
        </slot>
        <div class="nui-select-host">
            <div v-if="$slots.before" class="nui-select-before">
                <slot name="before" />
            </div>

            <div :class="outerClasses" ref="selectInputRef">
                <div v-if="$slots.prepend" class="nui-select-prepend">
                    <slot name="prepend" />
                </div>
                <input
                    :id="inputId"
                    :value="model"
                    :name="props.name"
                    :type="props.type"
                    :placeholder="props.placeholder"
                    :disabled="props.disabled || props.loading"
                    class="nui-select-input"
                    v-bind="$attrs"
                    readonly
                    @focus="showPopover = true"
                />
                <div v-if="loading" class="nui-select-loading">
                    <nui-icon name="loading" class="animate-spin" />
                </div>
                <div v-if="$slots.append" class="nui-select-append">
                    <slot name="append" />
                </div>
                <nui-icon name="chevron-down" class="nui-select-arrow" />
            </div>

            <div v-if="$slots.after" class="nui-select-after">
                <slot name="after" />
            </div>

            <NuiPopOver
                v-model="showPopover"
                :attach-parent="selectInputRef"
                display-position="bottom"
                anchor-position="start"
                :offset="[0, 8]"
                :auto-reposition="true"
            >
                <slot name="dropdown-content" />
            </NuiPopOver>
        </div>
        <slot v-if="props.helperText || $slots['helper']" name="helper">
            <p class="nui-select-helper">
                {{ props.helperText }}
            </p>
        </slot>
    </div>
</template>
<script setup lang="ts">
    import { computed, useAttrs, ref } from 'vue'
    import NuiIcon from './NuiIcon.vue'
    import NuiPopOver from './NuiPopOver.vue'

    defineOptions({ inheritAttrs: false })
    const model = defineModel<string | number>()
    const attrs = useAttrs()
    const inputId = computed(
        () => (attrs.id as string) || `nui-select-${Math.random().toString(36).slice(2)}`
    )

    const showPopover = ref(false)
    const selectInputRef = ref<HTMLElement | null>(null)

    export type NuiSelectSize = 'small' | 'medium' | 'large'
    export type NuiSelectColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'
    export interface NuiSelectProps {
        name?: string
        type?: string
        color?: NuiSelectColor
        size?: NuiSelectSize
        disabled?: boolean
        label?: string
        placeholder?: string
        helperText?: string
        pilled?: boolean
        loading?: boolean
    }
    const props = withDefaults(defineProps<NuiSelectProps>(), {
        name: undefined,
        type: 'text',
        color: 'current',
        size: 'medium',
        disabled: false,
        label: undefined,
        placeholder: undefined,
        helperText: undefined,
        pilled: false,
        loading: false
    })

    const wrapperClasses = computed(() => [
        'nui-select-wrapper',
        props.color && `nui-select-wrapper--color-${props.color}`,
        {
            'nui-select-wrapper--disabled': props.disabled || props.loading
        }
    ])
    const outerClasses = computed(() => [
        'nui-select-outer',
        `nui-select-outer--size-${props.size}`,
        {
            'nui-select-outer--pilled': props.pilled
        }
    ])
</script>
<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-select-wrapper {
            @apply flex flex-col gap-xs;

            /* Label, helper text */
            .nui-select-label {
                @apply text-[length:var(--nui-select-label-font-size)] font-[var(--nui-select-label-font-weight)];
            }
            .nui-select-helper {
                @apply text-[length:var(--nui-select-helper-font-size)] font-[var(--nui-select-helper-font-weight)];
            }

            .nui-select-host {
                @apply flex items-center gap-xs;
            }

            .nui-select-outer {
                @apply flex flex-nowrap items-center gap-xs grow
                    bg-[var(--nui-select-background-color)]
                    py-[var(--nui-select-padding-y)] px-[var(--nui-select-padding-x)]
                    rounded-[var(--nui-select-radius)]
                    border-[length:var(--nui-select-border-size)] border-[var(--nui-select-border-color)]
                    transition-all duration-250 ease-in-out;

                /* Focus */
                &:has(.nui-select-input:focus) {
                    @apply ring-2 ring-fg/50 ring-offset-2 ring-offset-bg;
                }

                &:has(input:is(:disabled)) {
                    @apply cursor-not-allowed;
                }

                .nui-select-input {
                    @apply grow w-auto bg-transparent
                       text-text
                       border-none ring-0 ring-offset-0 outline-none appearance-none
                       cursor-pointer; /* Indicate it's clickable */
                }

                .nui-select-arrow {
                    @apply transition-transform duration-200 ease-in-out;
                }

                /* --- Shape --- */
                &.nui-select-outer--pilled {
                    @apply rounded-full;
                }

                /* --- Sizes --- */
                &.nui-select-outer--size-small .nui-select-input {
                    @apply text-[length:var(--nui-select-size-small)] leading-[var(--nui-select-size-small)];
                }
                &.nui-select-outer--size-medium .nui-select-input {
                    @apply text-[length:var(--nui-select-size-medium)] leading-[var(--nui-select-size-medium)];
                }
                &.nui-select-outer--size-large .nui-select-input {
                    @apply text-[length:var(--nui-select-size-large)] leading-[var(--nui-select-size-large)];
                }
            }

            /* Before, Prepend, Append, After slots */
            .nui-select-before,
            .nui-select-prepend,
            .nui-select-append,
            .nui-select-after {
                @apply flex items-center;
            }

            /* --- Disabled State --- */
            &.nui-select-wrapper--disabled {
                @apply opacity-50 cursor-not-allowed;
                .nui-select-input {
                    @apply cursor-not-allowed;
                }
            }

            /* --- Colors --- */
            &.nui-select-wrapper--color-primary {
                .nui-select-label,
                .nui-select-helper,
                .nui-select-before,
                .nui-select-prepend,
                .nui-select-append,
                .nui-select-after {
                    @apply text-primary;
                }
                .nui-select-outer {
                    @apply border-primary text-primary;
                    &:has(.nui-select-input:focus) {
                        @apply ring-primary/50;
                    }
                }
            }
            &.nui-select-wrapper--color-success {
                .nui-select-label,
                .nui-select-helper,
                .nui-select-before,
                .nui-select-prepend,
                .nui-select-append,
                .nui-select-after {
                    @apply text-success;
                }
                .nui-select-outer {
                    @apply border-success text-success;
                    &:has(.nui-select-input:focus) {
                        @apply ring-success/50;
                    }
                }
            }
            &.nui-select-wrapper--color-error {
                .nui-select-label,
                .nui-select-helper,
                .nui-select-before,
                .nui-select-prepend,
                .nui-select-append,
                .nui-select-after {
                    @apply text-error;
                }
                .nui-select-outer {
                    @apply border-error text-error;
                    &:has(.nui-select-input:focus) {
                        @apply ring-error/50;
                    }
                }
            }
            &.nui-select-wrapper--color-warning {
                .nui-select-label,
                .nui-select-helper,
                .nui-select-before,
                .nui-select-prepend,
                .nui-select-append,
                .nui-select-after {
                    @apply text-warning;
                }
                .nui-select-outer {
                    @apply border-warning text-warning;
                    &:has(.nui-select-input:focus) {
                        @apply ring-warning/50;
                    }
                }
            }
            &.nui-select-wrapper--color-info {
                .nui-select-label,
                .nui-select-helper,
                .nui-select-before,
                .nui-select-prepend,
                .nui-select-append,
                .nui-select-after {
                    @apply text-info;
                }
                .nui-select-outer {
                    @apply border-info text-info;
                    &:has(.nui-select-input:focus) {
                        @apply ring-info/50;
                    }
                }
            }
            &.nui-select-wrapper--color-current {
                .nui-select-label,
                .nui-select-helper,
                .nui-select-before,
                .nui-select-prepend,
                .nui-select-append,
                .nui-select-after {
                    @apply text-current;
                }
            }
        }
    }
</style>
