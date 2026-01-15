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
                    :value="props.value"
                    :name="props.name"
                    type="radio"
                    class="peer"
                    :class="props.inputClass"
                    v-bind="inputAttrs"
                />

                <div class="n-radio-display">
                    <n-icon
                        :name="props.uncheckedIcon"
                        :class="['n-radio-display-unchecked', props.uncheckedIconClass]"
                        aria-hidden="true"
                    />
                    <n-icon
                        :name="props.checkedIcon"
                        :class="['n-radio-display-checked', props.checkedIconClass]"
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

                <div v-if="$slots['overlay']" class="n-radio-overlay">
                    <slot name="overlay"></slot>
                </div>
            </component>

            <slot name="dropdown"></slot>
            <slot name="bottom"></slot>

            <div v-if="props.message || props.helperText" class="n-radio-message">
                {{ props.message || props.helperText }}
            </div>
        </div>

        <template v-for="(node, index) in slotAfterNodes" :key="index">
            <component :is="node" />
        </template>
    </div>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars, @typescript-eslint/no-explicit-any */
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { resolveClassProp, wrapTextNode } from '../helpers/dom'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import NIcon from './NIcon.vue'

    export type NRadioProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        name?: string
        label?: string
        inlineLabel?: boolean
        value?: any
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
        color?: string
        size?: 'small' | 'medium' | 'large'
    }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NRadioProps>(), {
        tag: 'label',
        name: '',
        label: '',
        inlineLabel: false,
        uncheckedIcon: 'undefined',
        checkedIcon: 'mdi-circle',
        size: 'medium'
    })

    const model = defineModel<any>({ default: null })
    const inputId = `input-id-${generatePseudoRandomKey()}`

    const compClasses = computed(() => ['n-radio'])
    const containerClasses = computed(() => ['n-radio-container'])
    const wrapperClasses = computed(() => ['n-radio-wrapper', props.size ? `n-radio--${props.size}` : ''])
    const labelClasses = computed(() => ['n-radio-label'])
    const iconClasses = computed(() => resolveClassProp(props.iconClass, props.prependIconClass))

    // Split attributes: class/style go to wrapper, others to input
    const elementAttrs = computed(() => {
        const { class: className, style } = attrs
        return { class: className, style }
    })

    const inputAttrs = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { class: className, style, ...rest } = attrs
        return rest
    })

    const exportedProps = computed(() => ({
        ...props,
        inputId,
        modelValue: model.value
    }))

    const slotBeforeNodes = computed(() => wrapTextNode(slots.before?.(exportedProps.value) ?? [], 'span'))
    const slotAfterNodes = computed(() => wrapTextNode(slots.after?.(exportedProps.value) ?? [], 'span'))
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/components-index.css';

    @layer components {
        .n-radio-wrapper {
            @apply inline-flex flex-row items-center gap-2 grow;

            .n-radio-container {
                @apply flex flex-col flex-1;
            }

            .n-radio {
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

                .n-radio-display {
                    @apply inline-flex items-center justify-center shrink-0
                        bg-input
                        border-2 border-transparent
                        p-0.5
                        rounded-full
                        transition-all duration-200
                        size-5;

                    @apply peer-focus:outline-0 peer-focus:ring-2 peer-focus:ring-focus peer-focus:z-20;

                    .n-icon {
                        @apply text-xs;
                    }

                    .n-radio-display-unchecked,
                    .n-radio-display-checked {
                        @apply hidden;
                    }
                }

                input[type='radio'] {
                    @apply appearance-none sr-only w-full h-full;

                    &:not(:checked) ~ .n-radio-display .n-radio-display-unchecked {
                        @apply block;
                    }
                    &:checked ~ .n-radio-display .n-radio-display-checked {
                        @apply block;
                    }
                }

                /* Colors applied to display box */
                &.brand .n-radio-display {
                    @apply border-brand;
                }
                &.success .n-radio-display {
                    @apply border-success;
                }
                &.error .n-radio-display {
                    @apply border-error;
                }
                &.warning .n-radio-display {
                    @apply border-warning;
                }
                &.info .n-radio-display {
                    @apply border-info;
                }
            }

            .n-radio-label {
                @apply text-sm font-semibold;
                @apply mb-1;
            }
            .n-radio-message {
                @apply text-sm;
            }
            .n-radio-overlay {
                @apply absolute inset-0;
            }

            /* Color logic for text label */
            &:has(.n-radio.brand) {
                @apply text-brand;
            }
            &:has(.n-radio.success) {
                @apply text-success;
            }
            &:has(.n-radio.error) {
                @apply text-error;
            }
            &:has(.n-radio.warning) {
                @apply text-warning;
            }
            &:has(.n-radio.info) {
                @apply text-info;
            }

            /* Sizes */
            &.n-radio--small {
                .n-radio-display {
                    @apply size-4;
                }
                .n-radio-label {
                    @apply text-xs;
                }
            }

            &.n-radio--large {
                .n-radio-display {
                    @apply size-6;
                }
                .n-radio-label {
                    @apply text-base;
                }
            }
        }
    }
</style>
