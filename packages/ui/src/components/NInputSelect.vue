<template>
    <n-input-field v-model="model" :class="compClasses" v-bind="compBind">
        <template v-for="(_, name) in otherSlots" #[name]="data">
            <slot :name="name" v-bind="data" />
        </template>
        <template #="{ inputId }">
            <select
                :id="inputId"
                v-model="selectValue"
                :name="props.name"
                :multiple="props.multiple"
                :disabled="props.disabled"
                :size="1"
                :class="['peer', props.inputClass]"
                v-bind="attrsBind"
            >
                <template v-for="(node, index) in slotDefaultNodes" :key="index">
                    <component :is="node" />
                </template>
            </select>
        </template>
        <template #append>
            <n-icon
                :name="props.dropdownIcon"
                :class="[props.dropdownIconClass, 'n-input-select-dropdown-icon']"
                aria-hidden="true"
            />
            <slot name="append"></slot>
        </template>
    </n-input-field>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { omit } from 'es-toolkit/object'
    import { computed, h, type HTMLAttributes, useAttrs, useSlots, type VNode } from 'vue'
    import { resolveClassProp, wrapTextNode } from '../helpers/dom'
    import NIcon from './NIcon.vue'
    import NInputField, { type NInputFieldProps } from './NInputField.vue'

    export type NInputSelectOption = Record<string, any> & {
        label: string
        value: string
    }
    export type NInputSelectOptionGroup = Record<string, any> & {
        label: string
        options?: NInputSelectOption[]
    }
    export type NInputSelectProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NInputFieldProps & {
            inputClass?: string | string[] | object
            multiple?: boolean
            dropdownIcon?: string
            dropdownIconClass?: string | object | string[]
            options?: NInputSelectOption[] | NInputSelectOptionGroup[]
            formatOption?: (value: string) => string
            formatOptGroup?: (value: string) => string
            showCheckmark?: boolean
        }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NInputSelectProps>(), {
        multiple: false,
        dropdownIcon: 'mdi-menu-down',
        dropdownIconClass: 'text-xl',
        showCheckmark: true
    })

    const model = defineModel<string | string[]>()

    const selectValue = computed({
        get: () => {
            if (props.multiple) {
                if (!model.value) return []
                if (Array.isArray(model.value)) return model.value
                try {
                    // Handle potential stringified arrays if passed improperly
                    const parsed = JSON.parse(model.value as string)
                    return Array.isArray(parsed) ? parsed : []
                } catch {
                    return []
                }
            }
            return model.value
        },
        set: val => {
            model.value = val
        }
    })

    const otherSlots = computed(() => omit(slots, ['default', 'append']))
    const compClasses = computed(() => [
        'n-input-select',
        !props.showCheckmark ? 'n-input-select--no-checkmark' : '',
        ...resolveClassProp((attrs as any).class)
    ])

    // Bind props that belong to NInputField wrapper
    const compBind = computed(() => {
        // Exclude props that are consumed here or passed to select element
        const {
            inputClass,
            dropdownIcon,
            dropdownIconClass,
            formatOption,
            formatOptGroup,
            multiple,
            options,
            modelValue,
            modelModifiers,
            showCheckmark,
            ...rest
        } = props as any

        return { ...rest, style: (attrs as any).style }
    })

    // Bind attributes to the inner select element
    const attrsBind = computed(() => omit(attrs, ['class', 'style']))

    const createNodesFromData = (options: NInputSelectOption[] | NInputSelectOptionGroup[]): VNode[] => {
        return options.map(option => {
            if ('options' in option) {
                const group = option as NInputSelectOptionGroup
                const { label, options: groupOptions, ...rest } = group
                const children =
                    groupOptions?.map(child => {
                        const { label: childLabel, value: childValue, ...childRest } = child
                        return h(
                            'option',
                            {
                                value: childValue,
                                label:
                                    typeof props.formatOption === 'function'
                                        ? props.formatOption(childLabel)
                                        : childLabel,
                                ...childRest
                            },
                            childLabel
                        )
                    }) ?? []
                return h(
                    'optgroup',
                    {
                        label: typeof props.formatOptGroup === 'function' ? props.formatOptGroup(label) : label,
                        ...rest
                    },
                    children
                )
            } else {
                const opt = option as NInputSelectOption
                const { label, value, ...rest } = opt
                return h(
                    'option',
                    {
                        value: value,
                        label: typeof props.formatOption === 'function' ? props.formatOption(label) : label,
                        ...rest
                    },
                    label
                )
            }
        })
    }

    const slotDefaultNodes = computed(() => {
        return props.options && props.options.length
            ? createNodesFromData(props.options)
            : wrapTextNode(slots.default?.() ?? [], 'option')
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/components-index.css';

    @layer components {
        .n-input-select {
            select {
                @apply appearance-none;
                @apply cursor-pointer pr-8;
            }
            select[multiple] option::checkmark {
                @apply h-auto px-2;
            }

            .n-input-select-dropdown-icon {
                @apply transition-transform duration-200 ease-in-out pointer-events-none;
            }

            &:focus-within .n-input-select-dropdown-icon {
                @apply rotate-180;
            }
        }
    }
</style>
