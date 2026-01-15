<template>
    <div :class="wrapperClasses">
        <template v-for="(node, index) in slotBeforeNodes" :key="index">
            <component :is="node" />
        </template>

        <div :class="containerClasses">
            <slot v-if="!props.inlineLabel && (props.label || $slots['label'])" name="label">
                <label :class="labelClasses" :for="inputId">{{ props.label }}</label>
            </slot>

            <slot name="top"></slot>

            <component :is="props.tag" :class="compClasses" v-bind="elementAttrs">
                <slot name="prepend"></slot>
                <n-icon
                    v-if="props.prependIcon || props.icon"
                    :name="(props.prependIcon || props.icon) as string"
                    :class="iconClasses"
                    aria-hidden="true"
                />

                <input
                    :id="inputId"
                    v-model="model"
                    :name="props.name"
                    type="checkbox"
                    class="peer"
                    :class="props.inputClass"
                    :indeterminate.prop="model === null"
                    v-bind="inputAttrs"
                />
                <div class="n-checkbox-display">
                    <n-icon
                        v-if="props.uncheckedIcon"
                        :name="props.uncheckedIcon"
                        :class="['n-checkbox-display-unchecked', props.uncheckedIconClass]"
                        aria-hidden="true"
                    />
                    <n-icon
                        v-if="props.checkedIcon"
                        :name="props.checkedIcon"
                        :class="['n-checkbox-display-checked', props.checkedIconClass]"
                        aria-hidden="true"
                    />
                    <n-icon
                        v-if="props.indeterminateIcon"
                        :name="props.indeterminateIcon"
                        :class="['n-checkbox-display-indeterminate', props.indeterminateIconClass]"
                        aria-hidden="true"
                    />
                </div>

                <slot name="default" v-bind="exportedProps"></slot>
                <slot v-if="props.inlineLabel && (props.label || $slots['label'])" name="inlineLabel">
                    <label :class="labelClasses" :for="inputId">{{ props.label }}</label>
                </slot>

                <n-icon
                    v-if="props.appendIcon"
                    :name="props.appendIcon"
                    :class="props.appendIconClass"
                    aria-hidden="true"
                />
                <slot name="append"></slot>

                <div v-if="$slots['overlay']" class="n-checkbox-overlay">
                    <slot name="overlay"></slot>
                </div>
            </component>

            <slot name="dropdown"></slot>
            <slot name="bottom"></slot>

            <div v-if="props.message || props.helperText" class="n-checkbox-message">
                {{ props.message || props.helperText }}
            </div>
        </div>

        <template v-for="(node, index) in slotAfterNodes" :key="index">
            <component :is="node" />
        </template>
    </div>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { resolveClassProp, wrapTextNode } from '../helpers/dom'
    import { cn } from '../helpers/classes'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import NIcon from './NIcon.vue'

    export type NCheckboxProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        name?: string
        label?: string
        inlineLabel?: boolean
        icon?: string
        iconClass?: string | object | string[]
        prependIcon?: string
        prependIconClass?: string | object | string[]
        appendIcon?: string
        appendIconClass?: string | object | string[]
        inputClass?: string | string[] | object
        message?: string
        helperText?: string
        uncheckedIcon?: string
        uncheckedIconClass?: string | object | string[]
        checkedIcon?: string
        checkedIconClass?: string | object | string[]
        indeterminateIcon?: string
        indeterminateIconClass?: string | object | string[]
        size?: 'small' | 'medium' | 'large'
    }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NCheckboxProps>(), {
        tag: 'label',
        name: '',
        label: '',
        inlineLabel: false,
        uncheckedIcon: '',
        checkedIcon: 'mdi-check-bold',
        indeterminateIcon: 'mdi-minus',
        size: 'medium'
    })

    const [model, modifiers] = defineModel<boolean | null>({ default: null })
    const inputId = `input-id-${generatePseudoRandomKey()}`

    const compClasses = computed(() => cn('n-checkbox', attrs.class as any))
    const containerClasses = computed(() => ['n-checkbox-container'])
    const wrapperClasses = computed(() => ['n-checkbox-wrapper', props.size ? `n-checkbox--${props.size}` : ''])
    const labelClasses = computed(() => ['n-checkbox-label'])
    const iconClasses = computed(() => resolveClassProp(props.iconClass, props.prependIconClass))

    // Split attributes: class/style go to wrapper, others to input
    const elementAttrs = computed(() => {
        const { class: className, style } = attrs
        return { style }
    })

    const inputAttrs = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { class: className, style, ...rest } = attrs
        return rest
    })

    const exportedProps = computed(() => ({
        ...props,
        modifiers,
        inputId,
        modelValue: model.value
    }))

    const slotBeforeNodes = computed(() => {
        return wrapTextNode(slots.before?.(exportedProps.value) ?? [], 'span')
    })
    const slotAfterNodes = computed(() => {
        return wrapTextNode(slots.after?.(exportedProps.value) ?? [], 'span')
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/components-index.css';

    @layer components {
        .n-checkbox-wrapper {
            @apply inline-flex flex-row items-center gap-2 grow;

            .n-checkbox-container {
                @apply flex flex-col flex-1;
            }

            .n-checkbox {
                @apply relative
                    flex-1
                    flex flex-row items-center gap-2
                    cursor-pointer;

                & > .n-icon:first-child {
                    @apply ml-2;
                }
                & > .n-icon:last-child {
                    @apply mr-2;
                }

                .n-checkbox-display {
                    @apply inline-flex items-center justify-center shrink-0
                        bg-input
                        border-2 border-transparent
                        rounded-element
                        transition-all duration-200
                        size-5;
                    @apply peer-focus:outline-0 peer-focus:ring-2 peer-focus:ring-focus peer-focus:z-20;

                    .n-checkbox-display-unchecked,
                    .n-checkbox-display-checked,
                    .n-checkbox-display-indeterminate {
                        @apply hidden;
                    }
                }

                input[type='checkbox'] {
                    @apply appearance-none sr-only w-full h-full;

                    &:not(:checked):not(:indeterminate) ~ .n-checkbox-display .n-checkbox-display-unchecked {
                        @apply block;
                    }
                    &:checked ~ .n-checkbox-display .n-checkbox-display-checked {
                        @apply block;
                    }
                    &:indeterminate ~ .n-checkbox-display .n-checkbox-display-indeterminate {
                        @apply block;
                    }
                }

                /* Colors applied to the display box */
                &.brand .n-checkbox-display {
                    @apply border-brand text-brand;
                }
                &.success .n-checkbox-display {
                    @apply border-success text-success;
                }
                &.error .n-checkbox-display {
                    @apply border-error text-error;
                }
                &.warning .n-checkbox-display {
                    @apply border-warning text-warning;
                }
                &.info .n-checkbox-display {
                    @apply border-info text-info;
                }
            }

            .n-checkbox-label {
                @apply text-sm font-semibold;
                @apply mb-1;
            }
            .n-checkbox-message {
                @apply text-sm;
            }
            .n-checkbox-overlay {
                @apply absolute inset-0;
            }

            /* Color logic for text label */
            &:has(.n-checkbox.brand) {
                @apply text-brand;
            }
            &:has(.n-checkbox.success) {
                @apply text-success;
            }
            &:has(.n-checkbox.error) {
                @apply text-error;
            }
            &:has(.n-checkbox.warning) {
                @apply text-warning;
            }
            &:has(.n-checkbox.info) {
                @apply text-info;
            }

            .n-loading-overlay {
                @apply -m-0.5;
            }

            /* Sizes */
            &.n-checkbox--small {
                .n-checkbox-display {
                    @apply size-4;
                }
                .n-checkbox-label {
                    @apply text-xs;
                }
            }

            &.n-checkbox--large {
                .n-checkbox-display {
                    @apply size-6;
                }
                .n-checkbox-label {
                    @apply text-base;
                }
            }
        }
    }
</style>
