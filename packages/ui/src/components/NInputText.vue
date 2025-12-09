<template>
    <forward-slots :slots="$slots">
        <n-input-field :class="compClasses" v-bind="compBind">
            <template #="{ inputId, onUpdateModelValue, formattedModelValue, modifiers, onInput, onChange, format }">
                <input
                    :id="inputId"
                    :name="props.name"
                    :type="props.type"
                    :class="props.inputClass"
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
            inputClass?: string | string[] | object
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
        const { type, inputClass, ...rest } = { ...attrs, ...props }
        return {
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
