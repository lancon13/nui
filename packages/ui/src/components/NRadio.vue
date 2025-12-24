<template>
    <div :class="wrapperClasses">
        <template v-for="(node, index) in slotBeforeNodes" :key="index">
            <component :is="node" />
        </template>

        <div :class="containerClasses">
            <slot v-if="props.inlineLabel === false && (props.label || $slots['label'])" name="label">
                <label :class="labelClasses" :for="inputId.description">{{ props.label }}</label>
            </slot>

            <slot name="top"></slot>

            <component :is="props.tag" :class="compClasses" v-bind="compBind">
                <slot name="prepend"></slot>

                <n-icon
                    v-if="props.prependIcon || props.icon"
                    :name="(props.prependIcon || props.icon) as string"
                    :class="iconClasses"
                />

                <input
                    :id="inputId.description"
                    v-model="model"
                    :value="props.value"
                    :name="props.name"
                    type="radio"
                    class="peer"
                    :class="props.inputClass"
                />

                <div class="n-radio-display">
                    <n-icon
                        :name="props.uncheckedIcon"
                        :class="['n-radio-display-unchecked', props.uncheckedIconClass]"
                    />
                    <n-icon :name="props.checkedIcon" :class="['n-radio-display-checked', props.checkedIconClass]" />
                </div>

                <slot name="default" v-bind="exportedProps"></slot>
                <slot v-if="props.inlineLabel === true && (props.label || $slots['label'])" name="inlineLabel">
                    <label :class="labelClasses" :for="inputId.description">{{ props.label }}</label>
                </slot>

                <n-icon v-if="props.appendIcon" :name="props.appendIcon" :class="props.appendIconClass" />
                <slot name="append"></slot>

                <div v-if="$slots['overlay']" class="n-radio-overlay">
                    <slot name="overlay"></slot>
                </div>
            </component>

            <slot name="dropdown"></slot>
            <slot name="bottom"></slot>

            <div v-if="props.message" class="n-radio-message">{{ props.message }}</div>
        </div>

        <template v-for="(node, index) in slotAfterNodes" :key="index">
            <component :is="node" />
        </template>
    </div>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars, @typescript-eslint/no-explicit-any */
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { wrapTextNode } from '../helpers/dom'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import { resolveClassProp } from '../helpers/dom'
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
        uncheckedIcon?: string
        uncheckedIconClass?: string | object | string[]
        checkedIcon?: string
        checkedIconClass?: string | object | string[]
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
        checkedIcon: 'circle'
    })

    // Radio model is usually string, number, or object, not just boolean
    const [model, modifiers] = defineModel<any>({ default: null })
    const emits = defineEmits<{
        (event: 'update:modelValue', value: any): void
        (event: 'change', e: Event): void
        (event: 'blur', e: FocusEvent): void
        (event: 'focus', e: FocusEvent): void
        (event: 'keydown', e: KeyboardEvent): void
        (event: 'keyup', e: KeyboardEvent): void
        (event: 'keypress', e: KeyboardEvent): void
        (event: 'mousedown', e: MouseEvent): void
        (event: 'mouseup', e: MouseEvent): void
        (event: 'mouseenter', e: MouseEvent): void
        (event: 'mouseleave', e: MouseEvent): void
        (event: 'mouseover', e: MouseEvent): void
        (event: 'mouseout', e: MouseEvent): void
        (event: 'mousemove', e: MouseEvent): void
    }>()
    const inputId = Symbol(`input-id-${generatePseudoRandomKey()}`)

    const compClasses = computed(() => ['n-radio'])

    const compBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { class: _, ...rest } = { ...attrs, ...props }
        return rest
    })

    const containerClasses = computed(() => ['n-radio-container'])
    const wrapperClasses = computed(() => ['n-radio-wrapper'])
    const labelClasses = computed(() => ['n-radio-label'])
    const iconClasses = computed(() => resolveClassProp(props.iconClass, props.prependIconClass))

    const exportedProps = computed(() => ({
        ...props,
        modifiers,
        inputId: inputId.description,
        modelValue: model.value,
        onUpdateModelValue: (value: any) => emits('update:modelValue', value),
        onChange: (e: Event) => emits('change', e),
        onFocus: (e: FocusEvent) => emits('focus', e),
        onBlur: (e: FocusEvent) => emits('blur', e),
        onKeydown: (e: KeyboardEvent) => {
            emits('keydown', e)
        },
        onKeyup: (e: KeyboardEvent) => {
            emits('keyup', e)
        },
        onKeypress: (e: KeyboardEvent) => {
            emits('keypress', e)
        },
        onMousedown: (e: MouseEvent) => {
            emits('mousedown', e)
        },
        onMouseup: (e: MouseEvent) => {
            emits('mouseup', e)
        },
        onMouseenter: (e: MouseEvent) => {
            emits('mouseenter', e)
        },
        onMouseleave: (e: MouseEvent) => {
            emits('mouseleave', e)
        },
        onMouseout: (e: MouseEvent) => {
            emits('mouseout', e)
        },
        onMouseover: (e: MouseEvent) => {
            emits('mouseover', e)
        },
        onMousemove: (e: MouseEvent) => {
            emits('mousemove', e)
        }
    }))

    const slotBeforeNodes = computed(() => wrapTextNode(slots.before?.(exportedProps.value) ?? [], 'span'))
    const slotAfterNodes = computed(() => wrapTextNode(slots.after?.(exportedProps.value) ?? [], 'span'))
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-radio-wrapper {
            @apply inline-flex flex-row items-center gap-2 grow;

            .n-radio-container {
                @apply flex flex-col flex-1;
            }

            /* --- TEXT COLORS --- */
            &:has(.n-radio.primary) {
                @apply text-primary;
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

                /* State Coloring - Applies to the border of the radio */
                &.primary {
                    @apply border-primary;
                }
                &.success {
                    @apply border-success;
                }
                &.error {
                    @apply border-error;
                }
                &.warning {
                    @apply border-warning;
                }
                &.info {
                    @apply border-info;
                }

                /* --- DISPLAY BOX STYLING --- */
                .n-radio-display {
                    @apply inline-flex items-center justify-center shrink-0
                        bg-input
                        border-2 border-transparent
                        p-0.5
                        rounded-full; /* CRITICAL: Makes it round */

                    @apply peer-focus:outline-0 peer-focus:ring-2 peer-focus:ring-focus peer-focus:z-20;

                    .n-icon {
                        @apply text-sm; /* Relative sizing for the inner dot */
                    }

                    .n-radio-display-unchecked,
                    .n-radio-display-checked {
                        @apply hidden;
                    }
                }

                /* --- INPUT LOGIC --- */
                input[type='radio'] {
                    @apply appearance-none sr-only w-full h-full;

                    /* 1. UNCHECKED STATE */
                    &:not(:checked) ~ .n-radio-display .n-radio-display-unchecked {
                        @apply block;
                    }

                    /* 2. CHECKED STATE */
                    &:checked {
                        /* Reveal the "Checked" icon (Dot) */
                        & ~ .n-radio-display .n-radio-display-checked {
                            @apply block;
                        }
                    }
                }
            }

            .n-radio-label {
                @apply text-sm font-semibold;
            }
            .n-radio-message {
                @apply text-sm;
            }
            .n-radio-overlay {
                @apply absolute inset-0;
            }
        }
    }
</style>