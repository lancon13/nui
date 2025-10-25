<template>
    <div :class="wrapperClasses">
        <slot v-if="props.label || $slots['label']" name="label">
            <label :for="inputId" class="nui-select-label">
                {{ props.label }}
            </label>
        </slot>
        <div ref="attachParentRef" class="nui-select-host">
            <div v-if="$slots.before" class="nui-select-before">
                <slot name="before" />
            </div>

            <div ref="triggerParentRef" :class="outerClasses">
                <div v-if="$slots.prepend" class="nui-select-prepend">
                    <slot name="prepend" />
                </div>

                <div class="nui-select-display">
                    <slot name="selection" :selected="selectedOptions" :model="model">
                        <template v-if="!hasSelection">
                            <span class="nui-select-placeholder">
                                {{ props.placeholder }}
                            </span>
                        </template>
                        <template v-else-if="props.multiple">
                            <span>{{ selectedOptions.length }} items selected</span>
                        </template>
                        <template v-else>
                            <span>
                                {{ selectedOptions[0]?.label }}
                            </span>
                        </template>
                    </slot>
                </div>
                <select
                    :id="inputId"
                    v-model="model"
                    :class="[
                        'nui-select-native',
                        { 'nui-select-native--multiple': props.multiple }
                    ]"
                    :name="props.name"
                    :multiple="props.multiple"
                    :disabled="props.disabled || props.loading"
                    v-bind="$attrs"
                    size="1"
                    @mousedown.prevent
                    @keydown.space="onTrigger"
                    @keydown.enter="onTrigger"
                >
                    <option v-if="props.placeholder" value="" disabled :selected="!modelValue">
                        {{ props.placeholder }}
                    </option>
                    <option
                        v-for="option in props.options"
                        :key="option.value"
                        :value="option.value"
                        :selected="
                            Array.isArray(modelValue)
                                ? modelValue.includes(option.value)
                                : option.value === modelValue
                        "
                    >
                        {{ option.label }}
                    </option>
                </select>

                <div v-if="loading" class="nui-select-loading">
                    <nui-icon name="loading" class="animate-spin" />
                </div>

                <div class="nui-select-icon">
                    <nui-icon name="chevron-down" />
                </div>

                <div v-if="$slots.append" class="nui-select-append">
                    <slot name="append" />
                </div>

                <div
                    v-if="props.disabled || props.loading"
                    class="absolute inset-0 z-10 cursor-not-allowed"
                />
            </div>

            <div v-if="$slots.after" class="nui-select-after">
                <slot name="after" />
            </div>

            <nui-pop-over
                v-model="popoverOpen"
                :attach-parent="attachParentRef"
                :trigger-parent="triggerParentRef"
                display-position="bottom"
                anchor-position="start"
            >
                <div class="nui-select-popover-content" :style="{ width: `${triggerWidth}px` }">
                    <nui-list shadow>
                        <slot name="items">
                            <nui-list-item
                                v-for="option in props.options"
                                :key="option.value"
                                :focusable="true"
                                hoverable
                                clickable
                                :class="{ 'nui-list-item--active': isSelected(option.value) }"
                                @click="() => select(option.value)"
                            >
                                <slot
                                    name="item"
                                    :option="option"
                                    :selected="isSelected(option.value)"
                                >
                                    {{ option.label }}
                                </slot>
                            </nui-list-item>
                        </slot>
                    </nui-list>
                </div>
            </nui-pop-over>
        </div>
        <slot v-if="props.helperText || $slots['helper']" name="helper">
            <p class="nui-select-helper">
                {{ props.helperText }}
            </p>
        </slot>
    </div>
</template>

<script setup lang="ts">
    import { useElementSize } from '@vueuse/core'
    import { computed, ref, useAttrs } from 'vue'
    import NuiIcon from './NuiIcon.vue'
    import NuiList from './NuiList.vue'
    import NuiListItem from './NuiListItem.vue'
    import NuiPopOver from './NuiPopOver.vue'

    defineOptions({ inheritAttrs: false })
    const model = defineModel<string | string[]>()
    const attrs = useAttrs()
    const inputId = computed(
        () => (attrs.id as string) || `nui-select-${Math.random().toString(36).slice(2)}`
    )

    export interface NuiSelectOption {
        label: string
        value: string
        data?: unknown
    }

    export type NuiSelectSize = 'small' | 'medium' | 'large'
    export type NuiSelectColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'
    export interface NuiSelectProps {
        name?: string
        color?: NuiSelectColor
        size?: NuiSelectSize
        disabled?: boolean
        label?: string
        placeholder?: string
        helperText?: string
        pilled?: boolean
        loading?: boolean
        multiple?: boolean
        options?: NuiSelectOption[]
    }
    const props = withDefaults(defineProps<NuiSelectProps>(), {
        name: undefined,
        color: 'current',
        size: 'medium',
        disabled: false,
        label: undefined,
        placeholder: 'Select an option',
        helperText: undefined,
        pilled: false,
        loading: false,
        multiple: false,
        options: () => []
    })

    const attachParentRef = ref<HTMLElement | null>(null)
    const triggerParentRef = ref<HTMLElement | null>(null)
    const popoverOpen = ref(false)

    const { width: triggerWidth } = useElementSize(attachParentRef)

    const hasSelection = computed(() => {
        if (props.multiple) {
            return Array.isArray(model.value) && model.value.length > 0
        }
        return !!model.value
    })

    const selectedOptions = computed(() => {
        if (!hasSelection.value) return []
        const selectedValues = new Set(props.multiple ? (model.value as string[]) : [model.value])
        return props.options.filter(o => selectedValues.has(o.value))
    })

    const isSelected = (value: string) => {
        if (props.multiple) {
            return ((model.value as string[] | undefined) || []).includes(value)
        }
        return model.value === value
    }

    const select = (value: string) => {
        if (props.disabled || props.loading) return

        if (props.multiple) {
            const current = (model.value as string[] | undefined) || []
            if (current.includes(value)) {
                model.value = current.filter(v => v !== value)
            } else {
                model.value = [...current, value]
            }
        } else {
            model.value = value
            popoverOpen.value = false
        }
    }

    const onTrigger = (event: Event) => {
        event.preventDefault()
        if (!props.disabled && !props.loading) {
            popoverOpen.value = !popoverOpen.value
        }
    }

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
            'nui-select-outer--pilled': props.pilled,
            'nui-select-outer--active': popoverOpen.value
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

            .nui-select-label {
                @apply text-[length:var(--nui-select-label-font-size)] font-[var(--nui-select-label-font-weight)];
            }
            .nui-select-helper {
                @apply text-[length:var(--nui-select-helper-font-size)] font-[var(--nui-select-helper-font-weight)];
            }

            .nui-select-host {
                @apply flex items-center gap-xs relative;
            }

            .nui-select-outer {
                @apply relative text-left flex flex-nowrap items-center gap-xs grow cursor-pointer
                bg-[var(--nui-input-background-color)]
                py-[var(--nui-input-padding-y)] px-[var(--nui-input-padding-x)]
                rounded-[var(--nui-input-radius)]
                border-[length:var(--nui-input-border-size)] border-[var(--nui-input-border-color)]
                transition-all duration-250 ease-in-out;

                &.nui-select-outer--active,
                &:has(.nui-select-native:focus) {
                    @apply ring-2 ring-fg/50 ring-offset-2 ring-offset-bg;
                }

                .nui-select-native {
                    @apply grow opacity-0 appearance-none cursor-pointer;
                }

                .nui-select-display {
                    @apply absolute;
                }

                .nui-select-placeholder {
                    @apply text-text/50;
                }

                .nui-select-icon {
                    @apply transition-transform duration-250 ease-in-out;
                }
                &.nui-select-outer--active .nui-select-icon {
                    @apply rotate-180;
                }

                /* --- Shape --- */
                &.nui-select-outer--pilled {
                    @apply rounded-full;
                }

                /* --- Sizes --- */
                &.nui-select-outer--size-small {
                    @apply text-[length:var(--nui-input-size-small)] leading-[var(--nui-input-size-small)];
                }
                &.nui-select-outer--size-medium {
                    @apply text-[length:var(--nui-input-size-medium)] leading-[var(--nui-input-size-medium)];
                }
                &.nui-select-outer--size-large {
                    @apply text-[length:var(--nui-input-size-large)] leading-[var(--nui-input-size-large)];
                }
            }

            .nui-select-popover-content {
                @apply bg-[var(--nui-select-popover-background-color)]
                border-[length:var(--nui-select-popover-border-size)] border-[var(--nui-select-popover-border-color)]
                rounded-[var(--nui-select-popover-radius)]
                overflow-y-auto;

                max-height: var(--nui-list-virtual-scroll-max-height);

                .nui-list-item {
                    @apply px-[var(--nui-select-option-padding-x)] py-[var(--nui-select-option-padding-y)];
                    &.nui-list-item--active {
                        @apply bg-[var(--nui-select-option-selected-background-color)] text-[var(--nui-select-option-selected-text-color)];
                    }
                }
            }

            .nui-select-before,
            .nui-select-prepend,
            .nui-select-append,
            .nui-select-after {
                @apply flex items-center;
            }

            /* --- Disabled State --- */
            &.nui-select-wrapper--disabled {
                @apply opacity-50;
                .nui-select-outer {
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
                    &.nui-select-outer--active,
                    &:has(.nui-select-native:focus) {
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
                    &.nui-select-outer--active,
                    &:has(.nui-select-native:focus) {
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
                    &.nui-select-outer--active,
                    &:has(.nui-select-native:focus) {
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
                    &.nui-select-outer--active,
                    &:has(.nui-select-native:focus) {
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
                    &.nui-select-outer--active,
                    &:has(.nui-select-native:focus) {
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
