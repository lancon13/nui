<template>
    <n-input-field v-bind="compBind" :class="compClasses">
        <template v-for="(_, name) in otherSlots" #[name]="data">
            <slot :name="name" v-bind="data" />
        </template>

        <template
            #="{
                inputId,
                onUpdateModelValue: _parentUpdate,
                modifiers,
                onInput: _parentInput,
                onChange: _parentChange
            }"
        >
            <div class="n-input-search-display-container" @click="handleContainerClick">
                <div v-if="selectedOptions && selectedOptions.length" class="n-input-search-chips-container">
                    <template
                        v-for="(item, index) in selectedOptions"
                        v-if="props.multiple && Array.isArray(selectedOptions)"
                        :key="getItemValue(item)"
                    >
                        <slot name="chip" :item="item" :index="index" :remove="() => removeItem(index)">
                            <n-chip
                                :label="getItemLabel(item)"
                                removable
                                v-bind="props.chipProps"
                                @remove="removeItem(index)"
                                @click.stop
                            />
                        </slot>
                    </template>
                </div>

                <span
                    v-if="(!props.multiple && selectedOptions && !inputValue && !isFocusing) || !props.useInput"
                    :class="valueClasses"
                >
                    {{ getItemLabel(selectedOptions as NListItemData) }}
                </span>

                <input
                    :id="inputId"
                    ref="inputRef"
                    :name="props.name"
                    :readonly="!props.useInput"
                    type="text"
                    :class="['n-input-search-input', props.inputClass]"
                    :value="inputValue"
                    autocomplete="off"
                    @input="handleInput"
                    @focus="() => (isFocusing = true)"
                    @blur="() => (isFocusing = false)"
                    @keydown.down.prevent="handleInputKeydown"
                    @keydown.enter.prevent="handleEnter"
                    @keydown.backspace="handleBackspace"
                />
            </div>

            <n-popover
                v-if="!props.disabled"
                v-model="dropdown"
                :class="props.popoverClass"
                fit
                :hover-trigger-anchor="inputRef"
                :focus-trigger-anchor="focusInputRef"
            >
                <n-list ref="listRef" :items="filteredItems" :class="props.listClass">
                    <template #item="itemData">
                        <n-list-item
                            v-bind="itemData"
                            tabindex="0"
                            :class="{
                                'n-list-item--active': isSelected(itemData)
                            }"
                            @click="handleSelect(itemData)"
                            @keydown.enter.prevent="handleSelect(itemData)"
                            @keydown.space.prevent="handleSelect(itemData)"
                            @keydown.down.prevent="handleFocusNext"
                            @keydown.up.prevent="handleFocusPrev"
                            @keydown.esc.prevent="handleCloseDropdown"
                        >
                            <template #default>
                                <slot name="item-content" v-bind="itemData">
                                    {{ getItemLabel(itemData) }}
                                </slot>
                            </template>
                        </n-list-item>
                    </template>
                    <template #empty-content>
                        <slot name="empty">No results found</slot>
                    </template>
                </n-list>
            </n-popover>
        </template>

        <template #append>
            <n-icon
                v-if="clearable && modelValue && (Array.isArray(modelValue) ? modelValue.length > 0 : true)"
                name="close"
                @click.stop="handleClearSelection"
            />
            <n-icon :name="props.dropdownIcon" :class="props.dropdownIconClass" />
            <slot name="append"></slot>
        </template>
    </n-input-field>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any, no-unused-vars */
    import { omit } from 'es-toolkit/object'
    import { computed, HTMLAttributes, nextTick, ref, useAttrs, useSlots, useTemplateRef } from 'vue'
    import { resolveClassProp } from '../helpers/dom'
    import NChip from './NChip.vue'
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
            dropdownIconClass?: string | string[] | object
            inputClass?: string | string[] | object
            popoverClass?: string | string[] | object
            listClass?: string | string[] | object
            labelField?: string
            valueField?: string
            useInput?: boolean
            clearable?: boolean
            chipProps?: Record<string, any>
            disabled?: boolean
            valueClass?: string | string[] | object
        }

    defineOptions({ inheritAttrs: false })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NInputSearchProps>(), {
        items: () => [],
        listClass: 'bg-surface shadowed overflow-auto',
        labelField: 'label',
        valueClass: '',
        valueField: 'value',
        dropdownIcon: 'menu-down',
        dropdownIconClass: 'text-xl animate-dropdown',
        multiple: false,
        closeOnSelect: undefined,
        useInput: false,
        clearable: false,
        disabled: false,
        chipProps: () => ({ class: 'text-xs' })
    })

    const emits = defineEmits<{
        (e: 'filter', value: string): void
        (e: 'update:modelValue', value: any): void
        (e: 'clear'): void
    }>()

    const modelValue = defineModel<string | string[] | number | number[]>()
    const dropdown = defineModel('dropdown', { default: false })
    const inputRef = useTemplateRef('inputRef')
    const listRef = useTemplateRef('listRef')
    const inputValue = ref('')
    const isFocusing = ref(false)
    const focusPaused = ref(false)

    const selectedOptions = computed(() => {
        if (props.multiple) {
            if (!Array.isArray(modelValue.value)) return []
            return modelValue.value.map(
                val =>
                    props.items.find(i => i[props.valueField] === val) || {
                        [props.valueField]: val,
                        [props.labelField]: val
                    }
            )
        }
        const value = modelValue.value
        return props.items.find(item => item[props.valueField] === value) || null
    })

    // Placeholder logic: Show standard placeholder if empty, or hide it if items selected (in multiple mode)
    // const displayPlaceholder = computed(() => {
    //     if (props.multiple && Array.isArray(modelValue.value) && modelValue.value.length > 0) {
    //         return ''
    //     }
    //     return attrs.placeholder as string
    // })

    const filteredItems = computed(() => {
        if (!inputValue.value) {
            return props.items
        }
        const search = inputValue.value.toLowerCase()
        return props.items.filter(item => {
            return (item[props.valueField] || '').toLowerCase().includes(search)
        })
    })

    const isCloseOnSelect = computed(() => {
        if (typeof props.closeOnSelect === 'boolean') return props.closeOnSelect
        return !props.multiple
    })

    const otherSlots = computed(() => omit(slots, ['default', 'item', 'item-content', 'chip', 'append', 'no-option']))
    const compClasses = computed(() => ['n-input-search'])
    const compBind = computed(() => {
        const {
            inputClass,
            popoverClass,
            listClass,
            valueClass,
            dropdownIcon,
            dropdownIconClass,
            items,
            chipProps,
            clearable,
            labelField,
            valueField,
            ...rest
        } = {
            ...attrs,
            ...props
        }
        return omit(rest, ['modelValue', 'class']) // Prevent standard bindings from interfering
    })
    const valueClasses = computed(() => ['n-input-search-value', ...resolveClassProp(props.valueClass)])
    const focusInputRef = computed(() => (focusPaused.value ? null : inputRef.value))

    const getItemLabel = (item: any) => (item ? item[props.labelField] : '')
    const getItemValue = (item: any) => (item ? item[props.valueField] : '')

    function isSelected(item: NListItemData): boolean {
        const value = item[props.valueField] as any
        if (props.multiple && Array.isArray(modelValue.value)) {
            return modelValue.value.includes(value)
        }
        return modelValue.value === value
    }

    // Event Handlers
    function handleContainerClick() {
        inputRef.value?.focus()
        if (!dropdown.value) dropdown.value = true
    }
    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement
        inputValue.value = target.value
        dropdown.value = true
        emits('filter', inputValue.value)
    }

    function handleSelect(item: NListItemData) {
        const val = item[props.valueField]
        if (props.multiple) {
            const current = Array.isArray(modelValue.value) ? [...modelValue.value] : []
            const idx = current.indexOf(val)
            if (idx > -1)
                current.splice(idx, 1) // Toggle off
            else current.push(val) // Toggle on
            modelValue.value = current as any
            inputValue.value = ''
        } else {
            modelValue.value = val
            inputValue.value = ''
        }
        if (isCloseOnSelect.value) handleCloseDropdown()
    }

    function removeItem(index: number) {
        if (props.multiple && Array.isArray(modelValue.value)) {
            const newVal = [...modelValue.value]
            newVal.splice(index, 1)
            modelValue.value = newVal as any
        }
    }

    function handleClearSelection() {
        modelValue.value = props.multiple ? [] : undefined
        inputValue.value = ''
        emits('clear')
    }

    // Handle Backspace to remove last tag in multiple mode
    function handleBackspace() {
        if (
            props.multiple &&
            inputValue.value === '' &&
            Array.isArray(modelValue.value) &&
            modelValue.value.length > 0
        ) {
            const newVal = [...modelValue.value]
            newVal.pop()
            modelValue.value = newVal as any
        }
    }

    function handleEnter() {
        // If one item matches exactly or is highlighted, select it (simplified logic)
        if (dropdown.value && filteredItems.value.length > 0) {
            handleSelect(filteredItems.value[0])
        }
    }

    // --- Navigation Logic (Preserved from your code) ---
    async function handleCloseDropdown() {
        focusPaused.value = true
        dropdown.value = false
        await nextTick()
        focusPaused.value = false
    }

    function handleInputKeydown() {
        if (!dropdown.value) dropdown.value = true
        nextTick(() => {
            const listEl = listRef.value?.$el as HTMLElement
            const firstItem = listEl?.querySelector('[tabindex="0"]') as HTMLElement
            firstItem?.focus()
        })
    }

    function handleFocusNext(e: KeyboardEvent) {
        const currentItem = e.target as HTMLElement
        const nextItem = currentItem.nextElementSibling as HTMLElement
        if (nextItem && nextItem?.getAttribute('tabindex') !== null) nextItem.focus()
    }

    function handleFocusPrev(e: KeyboardEvent) {
        const currentItem = e.target as HTMLElement
        const prevItem = currentItem.previousElementSibling as HTMLElement
        if (prevItem && prevItem?.getAttribute('tabindex') !== null) {
            prevItem.focus()
        } else inputRef.value?.focus()
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-input-search {
            .n-input-search-chips-container {
                @apply relative
                    flex flex-wrap items-center gap-2
                    px-2 py-1;
            }
            .n-input-search-display-container {
                @apply relative
                    flex flex-wrap items-center;

                .n-input-search-value {
                    @apply absolute
                       pointer-events-none truncate w-full
                       px-2 py-1;
                }

                .n-input-search-input {
                    @apply w-auto grow;
                }
            }
        }
    }
</style>
