<template>
    <n-input-field v-model="internalModel" :class="compClasses" v-bind="compBind">
        <template v-for="(_, name) in otherSlots" #[name]="data">
            <slot :name="name" v-bind="data" />
        </template>
        <template #="{ inputId }">
            <input
                :id="inputId"
                v-model="internalModel"
                :name="props.name"
                :type="props.type"
                :disabled="props.disabled"
                :readonly="props.readonly"
                :class="['peer', props.inputClass]"
                v-bind="attrsBind"
                @input="handleInput"
            />
        </template>
    </n-input-field>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { useDebounceFn } from '@vueuse/core'
    import { omit } from 'es-toolkit/object'
    import { computed, ref, useAttrs, useSlots, watch, type HTMLAttributes } from 'vue'
    import { resolveClassProp } from '../helpers/dom'
    import NInputField, { type NInputFieldProps } from './NInputField.vue'

    export type NInputTextProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NInputFieldProps & {
            type?: string
            inputClass?: string | string[] | object
            debounce?: number
        }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NInputTextProps>(), {
        type: 'text',
        debounce: 0
    })

    const model = defineModel<string | number>({ default: '' })

    // Internal model for immediate UI updates
    const internalModel = ref(model.value)

    const otherSlots = computed(() => omit(slots, ['default']))
    const compClasses = computed(() => ['n-input-text', ...resolveClassProp((attrs as any).class)])
    const compBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type, inputClass, modelValue, modelModifiers, debounce, ...rest } = props as any
        return { ...rest, style: (attrs as any).style }
    })
    const attrsBind = computed(() => omit(attrs, ['class', 'style']))

    // Debounced updater for the parent model
    const debouncedUpdate = useDebounceFn((value: string | number) => {
        model.value = value
    }, props.debounce)

    // Watch for external model changes to sync internal state
    watch(
        () => model.value,
        newValue => {
            if (newValue !== internalModel.value) {
                internalModel.value = newValue
            }
        }
    )

    function handleInput() {
        if (props.debounce > 0) {
            debouncedUpdate(internalModel.value)
        } else {
            model.value = internalModel.value
        }
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
    }
</style>
