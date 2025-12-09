<template>
    <forward-slots :slots="$slots">
        <n-input-field :class="compClasses" v-bind="compBind">
            <template
                #="{
                    inputId,
                    onUpdateModelValue,
                    modelValue,
                    formattedModelValue,
                    modifiers,
                    onInput,
                    onChange,
                    format,
                    ...slotProps
                }"
            >
                <input
                    v-bind="slotProps"
                    :id="inputId"
                    :name="props.name"
                    :type="props.type"
                    :value="formattedModelValue"
                    @input="
                        async (e: InputEvent) => {
                            onInput(e)
                            if (modifiers['input']) {
                                const input = e.target as HTMLInputElement
                                onUpdateModelValue(input.value)
                                input.value = formattedModelValue
                            }
                        }
                    "
                    @change="
                        (e: Event) => {
                            onChange(e)
                            if (modifiers['change'] || !modifiers['input']) {
                                const input = e.target as HTMLInputElement
                                onUpdateModelValue(input.value)
                                input.value = formattedModelValue
                            }
                        }
                    "
                />
            </template>
        </n-input-field>
    </forward-slots>
</template>

<script setup lang="ts">
    import { computed, HTMLAttributes, useAttrs } from 'vue'
    import { ForwardSlots } from 'vue-forward-slots'
    import NInputField, { NInputFieldProps } from './NInputField.vue'

    export type NInputTextProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NInputFieldProps & {
            type?: string
        }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NInputTextProps>(), {
        type: 'text'
    })

    const compClasses = computed(() => {
        return ['n-input-text']
    })
    const compBind = computed(() => {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { type, ...rest } = props
        return {
            ...attrs,
            ...rest
        }
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
    }
</style>
