<template>
    <div :class="wrapperClasses">
        <template v-for="(node, index) in slotBeforeNodes" :key="index">
            <component :is="node" />
        </template>

        <div :class="containerClasses">
            <slot v-if="props.label || $slots['label']" name="label">
                <label :class="labelClasses" :for="inputId">{{ props.label }}</label>
            </slot>

            <slot name="top"></slot>

            <component :is="props.tag" :class="compClasses" v-bind="compBind">
                <slot name="loading">
                    <transition name="n-loading-overlay">
                        <n-loading
                            v-if="props.loading"
                            :overlay="true"
                            :name="props.loadingName"
                            :class="props.loadingClass"
                            aria-hidden="true"
                        />
                    </transition>
                </slot>

                <slot name="prepend"></slot>
                <n-icon
                    v-if="props.prependIcon || props.icon"
                    :name="(props.prependIcon || props.icon) as string"
                    :class="iconClasses"
                    aria-hidden="true"
                />

                <slot name="default" v-bind="exportedProps">
                    <input
                        :id="inputId"
                        v-model="model"
                        type="text"
                        :aria-busy="props.loading || undefined"
                        v-bind="inputBind"
                    />
                </slot>

                <n-icon
                    v-if="props.appendIcon"
                    :name="props.appendIcon"
                    :class="props.appendIconClass"
                    aria-hidden="true"
                />
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
    import { omit } from 'es-toolkit/object'
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { resolveClassProp, wrapTextNode } from '../helpers/dom'
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
        loadingName?: string
        loadingClass?: string | string[] | object
        format?: (value: string | number) => string
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
        label: '',
        loadingName: 'loading'
    })

    const [model, modifiers] = defineModel<string | number>({ default: '' })

    const inputId = `input-id-${generatePseudoRandomKey()}`

    const formattedModelValue = computed(() => {
        return typeof props.format === 'function' ? props.format(model.value) : model.value
    })
    const isDisabled = computed(() => attrs.disabled !== undefined && attrs.disabled !== false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compClasses = computed(() => ['n-input-field', ...resolveClassProp((attrs as any).class)])
    const containerClasses = computed(() => ['n-input-field-container'])
    const wrapperClasses = computed(() => [
        'n-input-field-wrapper',
        props.loading ? 'n-input-field--loading' : '',
        isDisabled.value ? 'n-input-field--disabled' : ''
    ])
    const labelClasses = computed(() => ['n-input-field-label'])
    const iconClasses = computed(() => resolveClassProp(props.iconClass, props.prependIconClass))

    const compBind = computed(() => omit(attrs, ['class']))
    const inputBind = computed(() => omit(attrs, ['class']))

    const exportedProps = computed(() => ({
        ...props,
        modifiers,
        inputId,
        modelValue: model.value,
        formattedModelValue: formattedModelValue.value
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
    @reference '../styles/index.css';

    @layer components {
        .n-input-field-wrapper {
            @apply inline-flex flex-row items-center gap-2 grow;

            .n-input-field-container {
                @apply flex flex-col grow;
            }

            .n-input-field {
                @apply relative
                    grow
                    flex flex-row items-center gap-2
                    border-2 border-transparent
                    rounded-element
                    bg-input
                    transition-all duration-200;

                @apply has-[:focus-visible]:outline-0 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-focus has-[:focus-visible]:z-20;

                & > .n-icon:first-child {
                    @apply ml-2;
                }
                & > .n-icon:last-child {
                    @apply mr-2;
                }

                input,
                select,
                textarea {
                    @apply appearance-none
                        focus:outline-0 focus:ring-0
                        py-1 px-2
                        box-border
                        w-full
                        bg-transparent;
                }

                /* Colors */
                &.brand {
                    @apply border-brand;
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

            /* Disabled State */
            &.n-input-field--disabled {
                @apply opacity-60 cursor-not-allowed;
                .n-input-field {
                    @apply bg-input/50 pointer-events-none;
                }
            }

            /* Color logic for text */
            &:has(.n-input-field.brand) {
                @apply text-brand;
            }
            &:has(.n-input-field.success) {
                @apply text-success;
            }
            &:has(.n-input-field.error) {
                @apply text-error;
            }
            &:has(.n-input-field.warning) {
                @apply text-warning;
            }
            &:has(.n-input-field.info) {
                @apply text-info;
            }

            .n-loading-overlay {
                @apply -m-0.5;
            }
        }
    }
</style>
