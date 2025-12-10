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
                    :class="resolvedIconClasses"
                />

                <input
                    :id="inputId.description"
                    v-model="model"
                    :name="props.name"
                    type="checkbox"
                    :indeterminate.prop="model === null"
                    class="peer"
                    :class="props.inputClass"
                />

                <div class="n-toggle-track">
                    <div class="n-toggle-thumb">
                        <n-icon
                            :name="props.uncheckedIcon"
                            :class="['n-toggle-display-unchecked', props.uncheckedIconClass]"
                        />
                        <n-icon
                            :name="props.checkedIcon"
                            :class="['n-toggle-display-checked', props.checkedIconClass]"
                        />
                        <n-icon
                            :name="props.indeterminateIcon"
                            :class="['n-toggle-display-indeterminate', , props.indeterminateIconClass]"
                        />
                    </div>
                </div>

                <slot name="default" v-bind="exportedProps"></slot>

                <n-icon v-if="props.appendIcon" :name="props.appendIcon" :class="props.appendIconClass" />
                <slot name="append"></slot>

                <div v-if="$slots['overlay']" class="n-toggle-overlay">
                    <slot name="overlay"></slot>
                </div>
            </component>

            <slot name="dropdown"></slot>
            <slot name="bottom"></slot>

            <div v-if="props.message" class="n-toggle-message">{{ props.message }}</div>
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
    import { resolveClassProp } from '../helpers/dom'
    import NIcon from './NIcon.vue'

    export type NToggleProps = Partial</* @vue-ignore */ HTMLAttributes> & {
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
        uncheckedIcon?: string
        uncheckedIconClass?: string | object | string[]
        checkedIcon?: string
        checkedIconClass?: string | object | string[]
        indeterminateIcon?: string
        indeterminateIconClass?: string | object | string[]
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
        uncheckedIcon: 'close',
        checkedIcon: 'check',
        indeterminateIcon: 'minus'
    })

    const [model, modifiers] = defineModel<boolean | null>({ default: null })

    const emits = defineEmits<{
        (event: 'update:modelValue', value: boolean | null): void
        (event: 'change', e: Event): void
        (event: 'blur', e: FocusEvent): void
        (event: 'focus', e: FocusEvent): void
        // ... (Include other standard events if needed)
    }>()

    const inputId = Symbol(`input-id-${generatePseudoRandomKey()}`)

    const resolvedIconClasses = computed(() => resolveClassProp(props.iconClass, props.prependIconClass))

    const compClasses = computed(() => ['n-toggle'])

    const compBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { class: _, ...rest } = { ...attrs, ...props }
        return rest
    })

    const containerClasses = computed(() => ['n-toggle-container'])
    const wrapperClasses = computed(() => ['n-toggle-wrapper'])
    const labelClasses = computed(() => ['n-toggle-label'])

    const exportedProps = computed(() => ({
        ...props,
        modifiers,
        inputId: inputId.description,
        modelValue: model.value,
        onUpdateModelValue: (value: boolean | null) => emits('update:modelValue', value),
        onChange: (e: Event) => emits('change', e),
        onFocus: (e: FocusEvent) => emits('focus', e),
        onBlur: (e: FocusEvent) => emits('blur', e)
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

            /* --- TEXT COLORS --- */
            &:has(.n-toggle.primary) {
                @apply text-primary;
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

                /* --- TRACK STYLING --- */
                .n-toggle-track {
                    /* Default "Off" State: Gray rounded pill */
                    @apply w-8 h-4 rounded-full
                           bg-input 
                           transition-colors duration-200 ease-in-out
                           flex items-center;

                    /* Focus ring (applied to track when input has focus) */
                    @apply peer-focus:outline-0 peer-focus:ring-2 peer-focus:ring-focus peer-focus:z-20;
                }

                /* --- THUMB STYLING --- */
                .n-toggle-thumb {
                    /* White circle inside the track */
                    @apply h-full aspect-square bg-white rounded-full shadow;
                    @apply transform transition-transform duration-200 ease-in-out
                           flex items-center justify-center;

                    /* Icon handling inside thumb */
                    .n-icon {
                        @apply text-sm; /* Tiny icons */
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

                    /* 1. CHECKED STATE */
                    &:checked {
                        & ~ .n-toggle-track {
                            @apply bg-primary;
                        }
                        /* Slide 100% of the thumb's own width to the right */
                        & ~ .n-toggle-track .n-toggle-thumb {
                            @apply translate-x-[100%];
                        }
                        & ~ .n-toggle-track .n-toggle-thumb .n-toggle-display-checked {
                            @apply block;
                        }
                        & ~ .n-toggle-track .n-toggle-thumb .n-toggle-display-unchecked {
                            @apply hidden;
                        }
                    }

                    /* 2. INDETERMINATE STATE */
                    &:indeterminate {
                        /* Slide 50% to sit in the center */
                        & ~ .n-toggle-track .n-toggle-thumb {
                            @apply translate-x-[50%];
                        }
                        & ~ .n-toggle-track .n-toggle-thumb .n-toggle-display-indeterminate {
                            @apply block;
                        }
                        & ~ .n-toggle-track .n-toggle-thumb .n-toggle-display-unchecked {
                            @apply hidden;
                        }
                    }
                }

                /* --- COLOR VARIANTS (Overrides Track Color) --- */
                /* When checked, these classes override the default bg-primary */
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

                /* Text color inside thumb matching variant */
                &.success input:checked ~ .n-toggle-track .n-toggle-thumb .n-icon {
                    @apply text-success;
                }
                &.error input:checked ~ .n-toggle-track .n-toggle-thumb .n-icon {
                    @apply text-error;
                }
            }

            .n-toggle-label {
                @apply text-sm font-semibold;
            }
            .n-toggle-message {
                @apply text-sm;
            }
            .n-toggle-overlay {
                @apply absolute inset-0;
            }
        }
    }
</style>
