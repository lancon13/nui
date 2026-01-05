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
                    :class="resolvedIconClasses"
                    aria-hidden="true"
                />

                <input
                    :id="inputId"
                    v-model="model"
                    :name="props.name"
                    type="checkbox"
                    :indeterminate.prop="model === null"
                    class="peer"
                    :class="props.inputClass"
                    v-bind="inputAttrs"
                />

                <div class="n-toggle-track">
                    <div class="n-toggle-thumb">
                        <n-icon
                            :name="props.uncheckedIcon"
                            :class="['n-toggle-display-unchecked', props.uncheckedIconClass]"
                            aria-hidden="true"
                        />
                        <n-icon
                            :name="props.checkedIcon"
                            :class="['n-toggle-display-checked', props.checkedIconClass]"
                            aria-hidden="true"
                        />
                        <n-icon
                            :name="props.indeterminateIcon"
                            :class="['n-toggle-display-indeterminate', props.indeterminateIconClass]"
                            aria-hidden="true"
                        />
                    </div>
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

                <div v-if="$slots['overlay']" class="n-toggle-overlay">
                    <slot name="overlay"></slot>
                </div>
            </component>

            <slot name="dropdown"></slot>
            <slot name="bottom"></slot>

            <div v-if="props.message || props.helperText" class="n-toggle-message">
                {{ props.message || props.helperText }}
            </div>
        </div>

        <template v-for="(node, index) in slotAfterNodes" :key="index">
            <component :is="node" />
        </template>
    </div>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { wrapTextNode, resolveClassProp } from '../helpers/dom'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import NIcon from './NIcon.vue'

    export type NToggleProps = Partial</* @vue-ignore */ HTMLAttributes> & {
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
    const props = withDefaults(defineProps<NToggleProps>(), {
        tag: 'label',
        name: '',
        label: '',
        inlineLabel: false,
        uncheckedIcon: 'mdi-close',
        checkedIcon: 'mdi-check',
        indeterminateIcon: 'mdi-minus',
        size: 'medium'
    })

    const [model, modifiers] = defineModel<boolean | null>({ default: null })

    const inputId = `input-id-${generatePseudoRandomKey()}`

    const resolvedIconClasses = computed(() => resolveClassProp(props.iconClass, props.prependIconClass))

    const compClasses = computed(() => ['n-toggle'])
    const containerClasses = computed(() => ['n-toggle-container'])
    const wrapperClasses = computed(() => [
        'n-toggle-wrapper',
        props.size ? `n-toggle--${props.size}` : ''
    ])
    const labelClasses = computed(() => ['n-toggle-label'])

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
        modifiers,
        inputId,
        modelValue: model.value
    }))

    const slotBeforeNodes = computed(() => wrapTextNode(slots.before?.(exportedProps.value) ?? [], 'span'))
    const slotAfterNodes = computed(() => wrapTextNode(slots.after?.(exportedProps.value) ?? [], 'span'))
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-toggle-wrapper {
            @apply inline-flex flex-row items-center gap-2 grow;

            .n-toggle-container {
                @apply flex flex-col flex-1;
            }

            .n-toggle {
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

                /* --- TRACK --- */
                .n-toggle-track {
                    @apply w-8 h-4 rounded-full
                           bg-input 
                           transition-colors duration-200 ease-in-out
                           flex items-center;

                    @apply peer-focus:outline-0 peer-focus:ring-2 peer-focus:ring-focus peer-focus:z-20;
                }

                /* --- THUMB --- */
                .n-toggle-thumb {
                    @apply h-full aspect-square bg-white rounded-full shadow;
                    @apply transform transition-transform duration-200 ease-in-out
                           flex items-center justify-center;

                    .n-icon {
                        @apply text-sm;
                    }
                    .n-toggle-display-unchecked {
                        @apply block;
                    }
                    .n-toggle-display-checked,
                    .n-toggle-display-indeterminate {
                        @apply hidden;
                    }
                }

                /* --- INPUT LOGIC --- */
                input[type='checkbox'] {
                    @apply appearance-none sr-only w-full h-full;

                    /* Checked */
                    &:checked {
                        & ~ .n-toggle-track {
                            @apply bg-brand;
                        }
                        & ~ .n-toggle-track .n-toggle-thumb {
                            @apply translate-x-[100%];
                            .n-toggle-display-checked {
                                @apply block;
                            }
                            .n-toggle-display-unchecked {
                                @apply hidden;
                            }
                        }
                    }

                    /* Indeterminate */
                    &:indeterminate {
                        & ~ .n-toggle-track .n-toggle-thumb {
                            @apply translate-x-[50%];
                            .n-toggle-display-indeterminate {
                                @apply block;
                            }
                            .n-toggle-display-unchecked {
                                @apply hidden;
                            }
                        }
                    }
                }

                /* --- COLOR VARIANTS --- */
                &.success input:checked ~ .n-toggle-track {
                    @apply bg-success;
                }
                &.error input:checked ~ .n-toggle-track {
                    @apply bg-error;
                }
                &.warning input:checked ~ .n-toggle-track {
                    @apply bg-warning;
                }
                &.info input:checked ~ .n-toggle-track {
                    @apply bg-info;
                }

                /* Thumb Icon Colors */
                &.success input:checked ~ .n-toggle-track .n-toggle-thumb .n-icon {
                    @apply text-success;
                }
                &.error input:checked ~ .n-toggle-track .n-toggle-thumb .n-icon {
                    @apply text-error;
                }
                &.warning input:checked ~ .n-toggle-track .n-toggle-thumb .n-icon {
                    @apply text-warning;
                }
                &.info input:checked ~ .n-toggle-track .n-toggle-thumb .n-icon {
                    @apply text-info;
                }
            }

            .n-toggle-label {
                @apply text-sm font-semibold;
                @apply mb-1;
            }
            .n-toggle-message {
                @apply text-sm;
            }
            .n-toggle-overlay {
                @apply absolute inset-0;
            }

            /* Color logic for text label */
            &:has(.n-toggle.brand) {
                @apply text-brand;
            }
            &:has(.n-toggle.success) {
                @apply text-success;
            }
            &:has(.n-toggle.error) {
                @apply text-error;
            }
            &:has(.n-toggle.warning) {
                @apply text-warning;
            }
            &:has(.n-toggle.info) {
                @apply text-info;
            }

            /* Sizes */
            &.n-toggle--small {
                .n-toggle-track {
                    @apply w-6 h-3;
                }
                .n-toggle-thumb .n-icon {
                    @apply text-[0.6rem];
                }
                .n-toggle-label {
                    @apply text-xs;
                }
            }

            &.n-toggle--large {
                .n-toggle-track {
                    @apply w-12 h-6;
                }
                .n-toggle-thumb .n-icon {
                    @apply text-base;
                }
                .n-toggle-label {
                    @apply text-base;
                }
            }
        }
    }
</style>
