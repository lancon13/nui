<template>
    <n-input-field :class="compClasses" v-bind="compBind">
        <template v-for="(index, name) in otherSlots" #[name]="data">
            <slot :name="name" v-bind="data" />
        </template>
        <template #="{ inputId, onUpdateModelValue, formattedModelValue, modifiers, onInput, onChange, format }">
            <select
                :id="inputId"
                :name="props.name"
                :value="formattedModelValue"
                :class="['peer', props.inputClass]"
                @change="
                    (e: Event) => {
                        onChange(e)
                        const input = e.target as HTMLInputElement
                        onUpdateModelValue(input.value)
                        input.value = formattedModelValue
                    }
                "
            >
                <template v-for="(node, index) in slotDefaultNodes" :key="index">
                    <component :is="node" />
                </template>
            </select>
        </template>
        <template #append>
            <n-icon :name="props.dropdownIcon" :class="props.dropdownIconClass" />
            <slot name="append"></slot>
        </template>
    </n-input-field>
</template>

<script setup lang="ts">
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    import { omit } from 'es-toolkit/object'
    import { computed, h, HTMLAttributes, useAttrs, useSlots, VNode } from 'vue'
    import { wrapTextNode } from '../helpers/dom'
    import NInputField, { NInputFieldProps } from './NInputField.vue'
    import NIcon from './NIcon.vue'

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
            dropdownIcon?: string
            dropdownIconClass?: string | object | string[]
            options?: NInputSelectOption[] | NInputSelectOptionGroup[]
            formatOption?: (value: string) => string
            formatOptGroup?: (value: string) => string
        }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NInputSelectProps>(), {
        dropdownIcon: 'menu-down',
        dropdownIconClass: 'text-xl animate-dropdown'
    })

    const otherSlots = computed(() => omit(slots, ['default', 'append']))
    const compClasses = computed(() => {
        return ['n-input-select']
    })
    const compBind = computed(() => {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { inputClass, dropdownIcon, dropdownIconClass, formatOption, formatOptGroup, ...rest } = {
            ...attrs,
            ...props
        }
        return {
            ...rest
        }
    })

    const createNodesFromData = (options: NInputSelectOption[] | NInputSelectOptionGroup[]): VNode[] => {
        return options.map(option => {
            if ('options' in option) {
                const { label, options: groupOptions, ...restGroup } = option as NInputSelectOptionGroup
                const children =
                    groupOptions?.map(childOption => {
                        const { label: childLabel, value, ...restChild } = childOption
                        return h(
                            'option',
                            {
                                ...restChild,
                                value,
                                label: typeof props.formatOption === 'function' ? props.formatOption(label) : label
                            },
                            childLabel
                        )
                    }) ?? []
                return h(
                    'optgroup',
                    {
                        ...restGroup,
                        label: typeof props.formatOptGroup === 'function' ? props.formatOptGroup(label) : label
                    },
                    children
                )
            } else {
                const { label, value, ...rest } = option as NInputSelectOption
                return h(
                    'option',
                    {
                        ...rest,
                        value,
                        label: typeof props.formatOption === 'function' ? props.formatOption(label) : label
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
    @reference '../styles/index.css';

    @layer components {
    }
</style>
