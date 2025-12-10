<template>
    <div :class="wrapperClasses">
        <template v-for="(node, index) in slotBeforeNodes" :key="index">
            <component :is="node" />
        </template>

        <div :class="containerClasses">
            <slot v-if="props.label || $slots['label']" name="label">
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
                    :name="props.name"
                    type="checkbox"
                    class="peer"
                    :class="props.inputClass"
                    :indeterminate.prop="model === null"
                />
                <div class="n-checkbox-display">
                    <n-icon
                        :name="props.uncheckedIcon"
                        :class="['n-checkbox-display-unchecked', props.uncheckedIconClass]"
                    />
                    <n-icon :name="props.checkedIcon" :class="['n-checkbox-display-checked', props.checkedIconClass]" />
                    <n-icon
                        :name="props.indeterminateIcon"
                        :class="['n-checkbox-display-indeterminate', , props.indeterminateIconClass]"
                    />
                </div>

                <slot name="default" v-bind="exportedProps"></slot>

                <n-icon v-if="props.appendIcon" :name="props.appendIcon" :class="props.appendIconClass" />
                <slot name="append"></slot>

                <div v-if="$slots['overlay']" class="n-checkbox-overlay">
                    <slot name="overlay"></slot>
                </div>
            </component>

            <slot name="dropdown"></slot>
            <slot name="bottom"></slot>

            <div v-if="props.message" class="n-checkbox-message">{{ props.message }}</div>
        </div>

        <template v-for="(node, index) in slotAfterNodes" :key="index">
            <component :is="node" />
        </template>
    </div>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { resolveClassProp, wrapTextNode } from '../helpers/dom'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import NIcon from './NIcon.vue'

    export type NCheckboxProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        name?: string
        label?: string
        icon?: string
        iconClass?: string | object | string[]
        prependIcon?: string
        prependIconClass?: string | object | string[]
        appendIcon?: string
        appendIconClass?: string | object | string[]
        inputClass?: string | string[] | object
        message?: string
        uncheckedIcon: string
        uncheckedIconClass?: string | object | string[]
        checkedIcon: string
        checkedIconClass?: string | object | string[]
        indeterminateIcon: string
        indeterminateIconClass?: string | object | string[]
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
        uncheckedIcon: 'undefined',
        checkedIcon: 'check-bold',
        indeterminateIcon: 'minus'
    })

    const [model, modifiers] = defineModel<boolean | null>({ default: null })
    const emits = defineEmits<{
        (event: 'update:modelValue', value: boolean | null): void
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

    const compClasses = computed(() => {
        return ['n-checkbox']
    })
    const compBind = computed(() => {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { ...rest } = { ...attrs, ...props }
        return {
            ...rest
        }
    })
    const containerClasses = computed(() => {
        return ['n-checkbox-container']
    })
    const wrapperClasses = computed(() => {
        return ['n-checkbox-wrapper']
    })
    const labelClasses = computed(() => {
        return ['n-checkbox-label']
    })
    const iconClasses = computed(() => resolveClassProp(props.iconClass, props.prependIconClass))

    const exportedProps = computed(() => {
        return {
            ...props,
            modifiers,
            inputId: inputId.description,
            modelValue: model.value,
            onUpdateModelValue: (value: boolean | null) => {
                emits('update:modelValue', value)
            },
            onChange: (e: Event) => {
                emits('change', e)
            },
            onFocus: (e: FocusEvent) => {
                emits('focus', e)
            },
            onBlur: (e: FocusEvent) => {
                emits('blur', e)
            },
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
        }
    })

    const slotBeforeNodes = computed(() => {
        return wrapTextNode(slots.before?.(exportedProps.value) ?? [], 'span')
    })
    const slotAfterNodes = computed(() => {
        return wrapTextNode(slots.after?.(exportedProps.value) ?? [], 'span')
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

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
                        rounded-element;
                    @apply peer-focus:outline-0 peer-focus:ring-2 peer-focus:ring-focus peer-focus:z-20;

                    .n-checkbox-display-unchecked,
                    .n-checkbox-display-checked,
                    .n-checkbox-display-indeterminate {
                        @apply hidden;
                    }
                }
                input[type='checkbox'] {
                    @apply appearance-none;
                    @apply sr-only;
                    @apply w-full h-full;

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
            }

            .n-checkbox-label {
                @apply text-sm font-semibold;
            }
            .n-checkbox-message {
                @apply text-sm;
            }
            .n-checkbox-overlay {
                @apply absolute inset-0;
            }

            :has(.n-checkbox.primary) {
                @apply text-primary;
            }
            :has(.n-checkbox.success) {
                @apply text-success;
            }
            :has(.n-checkbox.error) {
                @apply text-error;
            }
            :has(.n-checkbox.warning) {
                @apply text-warning;
            }
            :has(.n-checkbox.info) {
                @apply text-info;
            }

            .n-loading-overlay {
                @apply -m-0.5;
            }
        }
    }
</style>
