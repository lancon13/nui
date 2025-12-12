<template>
    <n-input-field v-bind="compBind" v-model="inputValue" :class="compClasses">
        <template v-for="(_, name) in otherSlots" #[name]="data">
            <slot :name="name" v-bind="data" />
        </template>

        <template #="{ inputId, onUpdateModelValue, formattedModelValue, modifiers, onInput, onChange }">
            <input
                :id="inputId"
                ref="inputRef"
                :name="props.name"
                type="text"
                :class="props.inputClass"
                :value="formattedModelValue"
                autocomplete="off"
                @input="
                    (e: InputEvent) => {
                        const input = e.target as HTMLInputElement
                        onInput(e)
                        if (!dropdown) dropdown = true

                        // UPDATE 2: Only update parent model on input if Single Select
                        // (For multiple, typing is just searching, we don't overwrite the array)
                        if (!props.multiple && modifiers['input']) {
                            onUpdateModelValue(input.value)
                            input.value = formattedModelValue
                        }
                    }
                "
                @change="
                    (e: Event) => {
                        const input = e.target as HTMLInputElement
                        onChange(e)
                        // UPDATE 3: Same logic for change
                        if (!props.multiple && (modifiers['change'] || !modifiers['input'])) {
                            onUpdateModelValue(input.value)
                            input.value = formattedModelValue
                        }
                    }
                "
                @keydown.down.prevent="handleInputKeydown"
            />

            <n-popover
                v-model="dropdown"
                :class="props.popoverClass"
                fit
                :hover-trigger-anchor="inputRef"
                :focus-trigger-anchor="focusInputRef"
            >
                <n-list ref="listRef" :items="props.items" :class="props.listClass">
                    <slot name="default" />
                    <template #item="itemData">
                        <n-list-item
                            v-bind="itemData"
                            tabindex="0"
                            :class="{
                                'n-list-item--active': isSelected(itemData)
                            }"
                            @click="handleSelect(itemData, onUpdateModelValue)"
                            @keydown.enter.prevent="handleSelect(itemData, onUpdateModelValue)"
                            @keydown.space.prevent="handleSelect(itemData, onUpdateModelValue)"
                            @keydown.down.prevent="handleFocusNext"
                            @keydown.up.prevent="handleFocusPrev"
                            @keydown.esc.prevent="handleCloseDropdown"
                        >
                            <template #default>
                                <slot name="item-content" v-bind="itemData">
                                    {{ itemData[props.labelField] }}
                                </slot>
                            </template>
                        </n-list-item>
                    </template>
                </n-list>
            </n-popover>
        </template>

        <template #append>
            <n-icon :name="props.dropdownIcon" :class="props.dropdownIconClass" />
            <slot name="append"></slot>
        </template>
    </n-input-field>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, no-unused-vars  */
    import { omit } from 'es-toolkit/object'
    import { computed, HTMLAttributes, nextTick, ref, useAttrs, useSlots, useTemplateRef } from 'vue'
    import NIcon from './NIcon.vue'
    import NInputField, { NInputFieldProps } from './NInputField.vue'
    import NList, { NListItemData } from './NList.vue'
    import NListItem from './NListItem.vue'
    import NPopover from './NPopover.vue'

    export type NInputSearchProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NInputFieldProps & {
            multiple?: boolean
            closeOnSelect?: boolean
            items?: NListItemData[]
            dropdownIcon?: string
            dropdownIconClass?: string | object | string[]
            inputClass?: string | string[] | object
            popoverClass?: string | string[] | object
            listClass?: string | string[] | object
            labelField?: string
            valueField?: string
        }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()

    const props = withDefaults(defineProps<NInputSearchProps>(), {
        items: [] as any,
        listClass: 'bg-surface shadowed',
        labelField: 'label',
        valueField: 'value',
        dropdownIcon: 'menu-down',
        dropdownIconClass: 'text-xl animate-dropdown',
        multiple: false,
        closeOnSelect: undefined
    })

    const modelValue = defineModel<string | string[]>()
    const dropdown = defineModel('dropdown', { default: false })
    const inputRef = useTemplateRef('inputRef')
    const listRef = useTemplateRef('listRef')

    const focusPaused = ref(false)
    const focusInputRef = computed(() => (focusPaused.value ? null : inputRef.value))

    // UPDATE 4: Computed property to bridge Array Model -> String Input
    const inputValue = computed({
        get: () => {
            if (props.multiple && Array.isArray(modelValue.value)) {
                // If multiple, join array to satisfy String type check.
                // e.g., "Selection 1, Selection 2"
                return modelValue.value.join(', ')
            }
            return modelValue.value as string
        },
        set: (val: string) => {
            // Only update the model directly from the string input if NOT multiple.
            // In multiple mode, updates happen via selection, not typing (typing = search).
            if (!props.multiple) {
                modelValue.value = val as any
            }
        }
    })

    const isCloseOnSelect = computed(() => {
        if (typeof props.closeOnSelect === 'boolean') return props.closeOnSelect
        if (props.multiple === true) return false
        return true
    })

    const otherSlots = computed(() => omit(slots, ['default', 'item', 'item-content']))
    const compClasses = computed(() => ['n-input-search'])
    const compBind = computed(() => {
        const { inputClass, popoverClass, listClass, dropdownIcon, dropdownIconClass, items, ...rest } = {
            ...attrs,
            ...props
        }
        return rest
    })

    function isSelected(item: NListItemData): boolean {
        const val = item[props.valueField] ?? item[props.labelField]
        if (props.multiple && Array.isArray(modelValue.value)) {
            return modelValue.value.includes(val)
        }
        return modelValue.value === val
    }

    function handleSelect(item: NListItemData, updateModel: (value: any) => void) {
        const selectedValue = item[props.valueField] ?? item[props.labelField]
        console.log(props)

        if (props.multiple) {
            const currentList = Array.isArray(modelValue.value) ? [...modelValue.value] : []
            const index = currentList.indexOf(selectedValue)

            if (index > -1) {
                currentList.splice(index, 1)
            } else {
                currentList.push(selectedValue)
            }
            // Update the array model
            modelValue.value = currentList as any
        } else {
            // Update the string model
            updateModel(selectedValue)
        }

        if (isCloseOnSelect.value) handleCloseDropdown()
    }

    async function handleCloseDropdown() {
        focusPaused.value = true
        await nextTick()
        await nextTick()
        inputRef.value?.focus()
        dropdown.value = false
        await nextTick()
        await nextTick()
        focusPaused.value = false
    }

    function handleInputKeydown() {
        if (!dropdown.value) dropdown.value = true
        nextTick(() => {
            const listEl = listRef.value?.$el as HTMLElement
            if (listEl) {
                const firstItem = listEl.querySelector('[tabindex="0"]') as HTMLElement
                firstItem?.focus()
            }
        })
    }

    function handleFocusNext(e: KeyboardEvent) {
        const currentItem = e.target as HTMLElement
        const nextItem = currentItem.nextElementSibling as HTMLElement
        if (nextItem && nextItem.getAttribute('tabindex') !== null) {
            nextItem.focus()
        }
    }

    function handleFocusPrev(e: KeyboardEvent) {
        const currentItem = e.target as HTMLElement
        const prevItem = currentItem.previousElementSibling as HTMLElement
        if (prevItem && prevItem.getAttribute('tabindex') !== null) {
            prevItem.focus()
        } else {
            inputRef.value?.focus()
        }
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
    }
</style>
