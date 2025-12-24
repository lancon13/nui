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

            <n-menu
                v-if="!props.disabled"
                ref="listRef"
                v-model="dropdown"
                class="n-input-search-menu"
                :popover-class="props.popoverClass"
                fit
                :items="processedItems"
                :content-field="props.labelField"
                :children-field="props.childrenField"
                :value-field="props.valueField"
                :hover-trigger-anchor="inputRef"
                :focus-trigger-anchor="focusInputRef"
            >
            </n-menu>
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
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { omit } from 'es-toolkit/object'
    import { computed, HTMLAttributes, nextTick, ref, useAttrs, useSlots, useTemplateRef } from 'vue'
    import { resolveClassProp } from '../helpers/dom'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import NChip from './NChip.vue'
    import NIcon from './NIcon.vue'
    import NInputField, { NInputFieldProps } from './NInputField.vue'
    import { NListItemData } from './NList.vue'
    import NMenu from './NMenu.vue'

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
            childrenField?: string
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
        childrenField: 'children',
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

    function findItemRecursive(items: any[], value: any): any {
        for (const item of items) {
            if (item[props.valueField] === value) {
                return item
            }
            if (item[props.childrenField] && Array.isArray(item[props.childrenField])) {
                const found = findItemRecursive(item[props.childrenField], value)
                if (found) return found
            }
        }
        return null
    }

    const selectedOptions = computed(() => {
        if (props.multiple) {
            if (!Array.isArray(modelValue.value)) return []
            return modelValue.value.map(
                val =>
                    findItemRecursive(props.items, val) || {
                        [props.valueField]: val,
                        [props.labelField]: val
                    }
            )
        }
        const value = modelValue.value
        return findItemRecursive(props.items, value) || null
    })

    const filteredItems = computed(() => {
        if (!inputValue.value) {
            return props.items
        }
        const search = inputValue.value.toLowerCase()
        return props.items.filter(item => {
            return (item[props.labelField] || '').toLowerCase().includes(search)
        })
    })

    const isCloseOnSelect = computed(() => {
        if (typeof props.closeOnSelect === 'boolean') return props.closeOnSelect
        return !props.multiple
    })

    // Transform items to inject event handlers and state classes
    function processItems(items: NListItemData[], parentId?: string): NListItemData[] {
        return items.map(item => {
            const isHeading = !!item.heading
            const isDisabled = !!item.disabled
            const isSel = isSelected(item)

            // Destructure children using props.childrenField
            const children = item[props.childrenField]
            const rest = { ...item }
            delete rest[props.childrenField]

            const itemId = generatePseudoRandomKey()
            const submenuId = children && children.length ? generatePseudoRandomKey() : undefined

            const processed: NListItemData = {
                ...rest,
                id: itemId,
                _submenuId: submenuId,
                class: resolveClassProp(item.class, isSel ? 'n-list-item--active' : ''),
                tabindex: isHeading || isDisabled ? undefined : '0',
                onClick: (e: MouseEvent) => {
                    if (isHeading || isDisabled) return
                    e.stopPropagation()
                    handleSelect(item)
                },
                onKeydown: (e: KeyboardEvent) => {
                    if (isHeading || isDisabled) return
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        handleSelect(item)
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault()
                        handleFocusNext(e)
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault()
                        handleFocusPrev(e)
                    } else if (e.key === 'Escape') {
                        e.preventDefault()
                        handleCloseDropdown()
                    } else if (e.key === 'ArrowRight') {
                        const itemEl = e.target as HTMLElement
                        const submenu = itemEl.querySelector('.n-menu')
                        if (submenu) {
                            e.preventDefault()
                            const firstItem = submenu.querySelector('[tabindex="0"]') as HTMLElement
                            if (firstItem) firstItem.focus()
                        }
                    } else if (e.key === 'ArrowLeft') {
                        e.preventDefault()
                        const itemEl = e.target as HTMLElement
                        const parentMenu = itemEl.closest('.n-menu')
                        const parentItem = parentMenu?.closest('.n-list-item') as HTMLElement
                        if (parentItem && parentItem.getAttribute('tabindex') === '0') {
                            parentItem.focus()
                        } else {
                            inputRef.value?.focus()
                        }
                    }
                }
            }

            if (children && Array.isArray(children)) {
                processed[props.childrenField] = processItems(children, itemId)
            }

            return processed
        })
    }

    const processedItems = computed(() => {
        if (filteredItems.value.length === 0) {
            return [
                {
                    [props.labelField]: slots.empty?.() || 'No results found',
                    heading: true,
                    value: 'empty-state'
                }
            ]
        }
        return processItems(filteredItems.value)
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
            childrenField,
            valueField,
            ...rest
        } = {
            ...attrs,
            ...props
        }
        return omit(rest as any, ['modelValue', 'class'])
    })
    const valueClasses = computed(() => ['n-input-search-value', ...resolveClassProp(props.valueClass)])
    const focusInputRef = computed(() => (focusPaused.value ? null : inputRef.value))

    const getItemLabel = (item: any) => (item ? item[props.labelField] : '')
    const getItemValue = (item: any) => (item ? item[props.valueField] : '')

    function isSelected(item: NListItemData): boolean {
        const value = item[props.valueField] as any
        if (props.multiple && Array.isArray(modelValue.value)) {
            return (modelValue.value as any[]).includes(value)
        }
        return modelValue.value === value
    }

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
        if (item.heading) return
        const val = item[props.valueField]
        if (props.multiple) {
            const current = Array.isArray(modelValue.value) ? [...modelValue.value] : []
            const idx = current.indexOf(val)
            if (idx > -1) current.splice(idx, 1)
            else current.push(val)
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
        if (dropdown.value && filteredItems.value.length > 0) {
            handleSelect(filteredItems.value[0])
        }
    }

    async function handleCloseDropdown() {
        focusPaused.value = true
        dropdown.value = false
        await nextTick()
        focusPaused.value = false
    }

    function handleInputKeydown() {
        if (!dropdown.value) dropdown.value = true
        nextTick(() => {
            const listEl = listRef.value?.popoverRef?.contentRef as HTMLElement
            if (!listEl) return
            const items = listEl.querySelectorAll('[tabindex="0"]')
            for (const item of items as any) {
                const el = item as HTMLElement
                if (!el.classList.contains('n-list-item--heading') && !el.classList.contains('n-list-item--disabled')) {
                    el.focus()
                    return
                }
            }
        })
    }

    function handleFocusNext(e: KeyboardEvent) {
        let currentItem = e.target as HTMLElement
        while (currentItem) {
            const nextItem = currentItem.nextElementSibling as HTMLElement
            if (!nextItem) break
            if (
                nextItem.getAttribute('tabindex') !== null &&
                !nextItem.classList.contains('n-list-item--heading') &&
                !nextItem.classList.contains('n-list-item--disabled')
            ) {
                nextItem.focus()
                break
            }
            currentItem = nextItem
        }
    }

    function handleFocusPrev(e: KeyboardEvent) {
        let currentItem = e.target as HTMLElement
        while (currentItem) {
            const prevItem = currentItem.previousElementSibling as HTMLElement
            if (!prevItem) {
                inputRef.value?.focus()
                break
            }
            if (
                prevItem.getAttribute('tabindex') !== null &&
                !prevItem.classList.contains('n-list-item--heading') &&
                !prevItem.classList.contains('n-list-item--disabled')
            ) {
                prevItem.focus()
                break
            }
            currentItem = prevItem
        }
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
                    flex flex-wrap items-center grow;

                .n-input-search-value {
                    @apply absolute
                       pointer-events-none truncate w-full
                       px-2 py-1;
                }

                .n-input-search-input {
                    @apply basis-full;
                }
            }
        }
    }
</style>
