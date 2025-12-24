<template>
    <n-input-field :class="compClasses" v-bind="compBind">
        <template v-for="(index, name) in otherSlots" #[name]="data">
            <slot :name="name" v-bind="data" />
        </template>
        <template #="{ inputId, onUpdateModelValue, formattedModelValue, modifiers, onInput, onChange, format }">
            <input
                :id="inputId"
                :name="props.name"
                :type="props.type"
                :class="props.inputClass"
                :value="formattedModelValue"
                v-bind="inputBind"
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
</template>

<script setup lang="ts">
    import { omit } from 'es-toolkit/object'
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import NInputField, { NInputFieldProps } from './NInputField.vue'

    export type NInputTextProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NInputFieldProps & {
            type?: string
            inputClass?: string | string[] | object
        }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NInputTextProps>(), {
        type: 'text'
    })

    const otherSlots = computed(() => omit(slots, ['default']))
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
    const inputBind = computed(() => {
        const { placeholder } = attrs
        return { placeholder: placeholder as string | undefined }
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
    }
</style>
