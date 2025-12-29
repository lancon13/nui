<template>
    <n-input-field v-bind="inputFieldProps" :class="compClasses">
        <template v-for="(_, name) in otherSlots" #[name]="data">
            <slot :name="name" v-bind="data" />
        </template>

        <template #default="{ inputId: fieldInputId, modifiers }">
            <div class="n-input-search-display-container" @click="handleContainerClick">
                <div v-if="hasSelectedOptions" class="n-input-search-chips-container">
                    <template v-for="(item, index) in selectedOptions" :key="getItemValue(item)">
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

                <span v-if="shouldShowValueLabel" :class="valueClasses">
                    {{ getItemLabel(selectedOptions as NListItemData) }}
                </span>

                <input
                    :id="fieldInputId"
                    ref="inputRef"
                    :name="props.name"
                    :readonly="!props.useInput"
                    type="text"
                    :class="['n-input-search-input', props.inputClass]"
                    :value="inputValue"
                    autocomplete="off"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-haspopup="menu"
                    :aria-expanded="dropdown"
                    :aria-controls="menuId"
                    v-bind="inputBind"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @keydown.down.prevent="handleInputKeydown"
                    @keydown.enter.prevent="handleEnter"
                    @keydown.backspace="handleBackspace"
                />
            </div>

            <n-menu
                v-if="!props.disabled && !props.loading"
                :id="menuId"
                ref="listRef"
                v-model="dropdown"
                :class="['n-input-search-menu', props.popoverClass]"
                fit
                :items="processedItems"
                :content-field="props.labelField"
                :children-field="props.childrenField"
                :value-field="props.valueField"
                :hover-trigger-anchor="inputRef"
                :focus-trigger-anchor="focusInputRef"
                v-bind="props.menuProps"
                @select="handleSelect"
            >
            </n-menu>
        </template>

        <template #append>
            <n-icon v-if="isClearable" name="mdi-close" class="cursor-pointer" @click.stop="handleClearSelection" />
            <n-icon :name="props.dropdownIcon" :class="props.dropdownIconClass" />
            <slot name="append"></slot>
        </template>
    </n-input-field>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { omit } from 'es-toolkit/object'
    import { computed, nextTick, ref, useAttrs, useSlots, useTemplateRef, watch, type HTMLAttributes } from 'vue'
    import { resolveClassProp } from '../helpers/dom'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import NChip from './NChip.vue'
    import NIcon from './NIcon.vue'
    import NInputField, { type NInputFieldProps } from './NInputField.vue'
    import { type NListItemData } from './NList.vue'
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
            fillInput?: boolean
            chipProps?: Record<string, any>
            menuProps?: Record<string, any>
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
        dropdownIcon: 'mdi-menu-down',
        dropdownIconClass: 'text-xl animate-dropdown',
        multiple: false,
        closeOnSelect: undefined,
        useInput: false,
        clearable: false,
        fillInput: true,
        disabled: false,
        chipProps: () => ({ class: 'text-xs' }),
        loadingName: 'loading'
    })

    const emits = defineEmits<{
        (e: 'filter', value: string): void
        (e: 'update:modelValue', value: any): void
        (e: 'clear'): void
    }>()

    const modelValue = defineModel<string | string[] | number | number[]>()
    const dropdown = defineModel('dropdown', { default: false })

    const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
    const listRef = useTemplateRef<InstanceType<typeof NMenu>>('listRef')

    const inputValue = ref('')
    const isFocusing = ref(false)
    const focusPaused = ref(false)
    const menuId = `menu-${generatePseudoRandomKey()}`

    // --- Helpers ---
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

    const getItemLabel = (item: any) => (item ? item[props.labelField] : '')
    const getItemValue = (item: any) => (item ? item[props.valueField] : '')

    // --- Sync Input Value ---
    watch(
        () => modelValue.value,
        newVal => {
            if (!props.multiple && props.fillInput) {
                const item = findItemRecursive(props.items, newVal)
                inputValue.value = item ? getItemLabel(item) : ''
            }
        },
        { immediate: true }
    )

    function isSelected(item: NListItemData): boolean {
        const value = item[props.valueField] as any
        if (props.multiple && Array.isArray(modelValue.value)) {
            return (modelValue.value as any[]).includes(value)
        }
        return modelValue.value === value
    }

    // --- Computed ---
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

    const hasSelectedOptions = computed(() => {
        return props.multiple && Array.isArray(selectedOptions.value) && selectedOptions.value.length > 0
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

    const isClearable = computed(() => {
        if (!props.clearable) return false
        if (!modelValue.value) return false
        if (Array.isArray(modelValue.value) && modelValue.value.length === 0) return false
        return true
    })

    const shouldShowValueLabel = computed(() => {
        return (!props.multiple && selectedOptions.value && !inputValue.value && !isFocusing.value) || !props.useInput
    })

    const otherSlots = computed(() => omit(slots, ['default', 'item', 'item-content', 'chip', 'append', 'no-option']))

    const compClasses = computed(() => ['n-input-search', ...resolveClassProp((attrs as any).class)])

    const inputFieldProps = computed(() => {
        const {
            inputClass,
            popoverClass,
            listClass,
            valueClass,
            dropdownIcon,
            dropdownIconClass,
            items,
            chipProps,
            menuProps,
            clearable,
            labelField,
            childrenField,
            valueField,
            multiple,
            closeOnSelect,
            useInput,
            ...rest
        } = props

        return {
            ...omit(attrs, ['class', 'modelValue']),
            ...omit(rest as any, ['modelValue', 'modelModifiers'])
        }
    })

    const inputBind = computed(() => {
        return omit(attrs, ['class', 'style', 'modelValue'])
    })

    const valueClasses = computed(() => ['n-input-search-value', ...resolveClassProp(props.valueClass)])
    const focusInputRef = computed(() => (focusPaused.value ? null : inputRef.value))

    function removeItem(index: number | string) {
        const val = modelValue.value
        if (props.multiple && Array.isArray(val)) {
            const newVal = [...val]
            newVal.splice(Number(index), 1)
            modelValue.value = newVal as any
        }
    }

    // --- Item Processing ---
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
                onMousedown: (e: MouseEvent) => {
                    if (isHeading || isDisabled) return
                    e.preventDefault()
                },
                onClick: () => {
                    // Defined to trigger NListItem clickable style/role
                },
                onKeydown: (e: KeyboardEvent) => {
                    if (isHeading || isDisabled) return
                    if (e.key === 'ArrowDown') {
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

    // --- Handlers ---
    function handleContainerClick() {
        inputRef.value?.focus()
        if (!dropdown.value) dropdown.value = true
    }

    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement
        inputValue.value = target.value
        if (!dropdown.value) dropdown.value = true
        emits('filter', inputValue.value)
    }

    function handleFocus() {
        isFocusing.value = true
    }

    function handleBlur() {
        isFocusing.value = false
    }

    function handleSelect(item: any) {
        if (item.heading || item.disabled) return
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
            inputValue.value = props.fillInput ? getItemLabel(item) : ''
        }
        if (isCloseOnSelect.value) handleCloseDropdown()
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
        } else if (!dropdown.value) {
            dropdown.value = true
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
                // Ensure we don't focus disabled items, though querySelectorAll catches them if they have tabindex=0
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
                    flex flex-wrap items-center grow
                    cursor-text;

                .n-input-search-value {
                    @apply absolute
                       pointer-events-none truncate w-full
                       px-2 py-1;
                }

                .n-input-search-input {
                    @apply basis-full;
                    &[readonly] {
                        @apply cursor-default;
                    }
                }
            }
        }
    }
</style>
