<template>
    <n-input-field v-model="model" :class="compClasses" v-bind="compBind">
        <template v-for="(_, name) in otherSlots" #[name]="data">
            <slot :name="name" v-bind="data" />
        </template>
        <template #="{ inputId }">
            <input
                :id="inputId"
                v-model="model"
                :name="props.name"
                :type="props.type"
                :class="['peer', props.inputClass]"
                v-bind="attrsBind"
            />
        </template>
    </n-input-field>
</template>

<script setup lang="ts">
    import { omit } from 'es-toolkit/object'
    import { computed, type HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { resolveClassProp } from '../helpers/dom'
    import NInputField, { type NInputFieldProps } from './NInputField.vue'

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

    const model = defineModel<string | number>({ default: '' })

    const otherSlots = computed(() => omit(slots, ['default']))
    const compClasses = computed(() => ['n-input-text', ...resolveClassProp((attrs as any).class)])
    const compBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type, inputClass, modelValue, modelModifiers, ...rest } = props as any
        return { ...rest, style: (attrs as any).style }
    })
    const attrsBind = computed(() => omit(attrs, ['class', 'style']))
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
    }
</style>
