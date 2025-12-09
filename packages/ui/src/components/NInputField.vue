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
                <slot name="loading">
                    <transition name="n-loading-overlay">
                        <n-loading
                            v-if="props.loading"
                            :overlay="true"
                            :type="props.loadingType"
                            :class="props.loadingClass"
                        />
                    </transition>
                </slot>

                <slot name="prepend"></slot>
                <n-icon
                    v-if="props.prependIcon || props.icon"
                    :name="(props.prependIcon || props.icon) as string"
                    :class="[
                        ...(props.iconClass
                            ? ['string', 'object'].includes(typeof props.iconClass)
                                ? [props.iconClass]
                                : (props.iconClass as string[])
                            : []),
                        ...(props.prependIconClass
                            ? ['string', 'object'].includes(typeof props.prependIconClass)
                                ? [props.prependIconClass]
                                : (props.prependIconClass as string[])
                            : [])
                    ]"
                />

                <slot name="default" v-bind="exportedProps">
                    <input :id="inputId.description" v-model="model" type="text" />
                </slot>

                <n-icon v-if="props.appendIcon" :name="props.appendIcon" :class="props.appendIconClass" />
                <slot name="append"></slot>

                <div v-if="$slots['overlay']" class="n-input-field-overlay">
                    <slot name="overlay"></slot>
                </div>
            </component>

            <slot name="dropdown"></slot>
            <slot name="bottom"></slot>

            <div v-if="props.message" class="n-input-field-message">{{ props.message }}</div>
        </div>

        <template v-for="(node, index) in slotAfterNodes" :key="index">
            <component :is="node" />
        </template>
    </div>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { wrapTextNode } from '../helpers/dom'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import NIcon from './NIcon.vue'
    import NLoading from './NLoading.vue'

    export type NInputFieldProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        name?: string
        label?: string
        icon?: string
        iconClass?: string | object | string[]
        prependIcon?: string
        prependIconClass?: string | object | string[]
        appendIcon?: string
        appendIconClass?: string | object | string[]
        message?: string
        loading?: boolean
        loadingType?: string
        loadingClass?: string | string[] | object
        format?: (value: string) => string
        parse?: (value: string) => string
    }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NInputFieldProps>(), {
        tag: 'div',
        name: '',
        label: ''
    })

    const [model, modifiers] = defineModel<string>({ default: '' })
    const emits = defineEmits<{
        (event: 'update:modelValue', value: string): void
        (event: 'input', e: InputEvent): void
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

    const formattedModelValue = computed(() => {
        return typeof props.format === 'function' ? props.format(model.value) : model.value
    })
    const compClasses = computed(() => {
        return ['n-input-field']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })
    const containerClasses = computed(() => {
        return ['n-input-field-container']
    })
    const wrapperClasses = computed(() => {
        return ['n-input-field-wrapper', props.loading ? 'n-input-field--loading' : '']
    })
    const labelClasses = computed(() => {
        return ['n-input-field-label']
    })
    const exportedProps = computed(() => {
        return {
            ...props,
            modifiers,
            inputId: inputId.description,
            modelValue: model.value,
            formattedModelValue: formattedModelValue.value,
            onUpdateModelValue: (value: string) => {
                emits('update:modelValue', typeof props.parse === 'function' ? props.parse(value) : value)
            },
            onChange: (e: Event) => {
                emits('change', e)
            },
            onInput: (e: InputEvent) => {
                emits('input', e)
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
        .n-input-field-wrapper {
            @apply inline-flex flex-row items-center gap-2 grow;

            .n-input-field-container {
                @apply flex flex-col flex-1;
            }

            .n-input-field {
                @apply relative
                    flex-1
                    flex flex-row items-center gap-2
                    border-2 border-transparent
                    rounded-element py-1 px-2
                    bg-input;
                @apply has-[:focus-visible]:outline-0 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-focus has-[:focus-visible]:z-20;

                input,
                select,
                textarea {
                    @apply appearance-none
                    focus:outline-0 focus:ring-0
                    box-border
                    w-full;
                }
                &:has(select) {
                    @apply p-0;
                }
                select {
                    @apply py-1 px-2;
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

            .n-input-field-label {
                @apply text-sm font-semibold;
            }
            .n-input-field-message {
                @apply text-sm;
            }
            .n-input-field-overlay {
                @apply absolute inset-0;
            }

            :has(.n-input-field.primary) {
                @apply text-primary;
            }
            :has(.n-input-field.success) {
                @apply text-success;
            }
            :has(.n-input-field.error) {
                @apply text-error;
            }
            :has(.n-input-field.warning) {
                @apply text-warning;
            }
            :has(.n-input-field.info) {
                @apply text-info;
            }

            .n-loading-overlay {
                @apply -m-0.5;
            }
        }
    }
</style>
