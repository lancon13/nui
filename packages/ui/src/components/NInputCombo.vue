<template>
    <n-input-field v-bind="inputFieldProps" :class="compClasses">
        <template v-for="(_, name) in filteredSlots" #[name]="data">
            <slot :name="name" v-bind="data" />
        </template>

        <template #default="{ inputId: fieldInputId }">
            <div class="n-input-combo-display-container" @click="handleContainerClick">
                <div v-if="hasSelectedOptions" class="n-input-combo-chips-container">
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
                    :disabled="props.disabled"
                    :readonly="!props.useInput || props.readonly"
                    type="text"
                    :class="['n-input-combo-input', props.inputClass, shouldHideInput ? 'sr-only' : '']"
                    :value="inputValue"
                    autocomplete="off"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-haspopup="menu"
                    :placeholder="inputPlaceholder"
                    :aria-expanded="dropdown"
                    :aria-controls="menuId"
                    v-bind="inputBind"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @keydown.down.prevent="handleInputKeydown"
                    @keydown.enter.prevent="handleEnter"
                    @keydown.backspace="handleBackspace"
                    @keydown.esc="handleCloseDropdown"
                />
            </div>

            <n-menu
                v-if="!props.disabled && !props.loading"
                :id="menuId"
                ref="menuRef"
                v-model="dropdown"
                :class="['n-input-combo-menu', props.popoverClass]"
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
                <template v-if="$slots['item']" #item="itemData">
                    <slot name="item" :item="itemData" />
                </template>
                <template v-if="$slots['item-content']" #item-content="itemData">
                    <slot name="item-content" :item="itemData" />
                </template>
            </n-menu>
        </template>

        <template #append>
            <n-icon
                v-if="isClearable"
                name="mdi-close"
                class="cursor-pointer hover:text-error transition-colors"
                @click.stop="handleClearSelection"
            />
            <n-icon :name="props.dropdownIcon" :class="[props.dropdownIconClass, dropdown ? 'rotate-180' : '']" />
            <slot name="append"></slot>
        </template>
    </n-input-field>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { useDebounceFn } from '@vueuse/core'
    import { omit } from 'es-toolkit/object'
    import { computed, nextTick, ref, useAttrs, useSlots, useTemplateRef, watch, type HTMLAttributes } from 'vue'
    import { resolveClassProp } from '../helpers/dom'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import NChip from './NChip.vue'
    import NIcon from './NIcon.vue'
    import NInputField, { type NInputFieldProps } from './NInputField.vue'
    import { type NListItemData } from './NList.vue'
    import NMenu from './NMenu.vue'

    // --- Types ---

    export type NInputComboProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NInputFieldProps & {
            multiple?: boolean
            closeDropdownOnSelected?: boolean
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
            fillInput?: boolean | 'label' | 'value'
            blurOnSelected?: boolean
            chipProps?: Record<string, any>
            menuProps?: Record<string, any>
            disabled?: boolean
            valueClass?: string | string[] | object
            debounce?: number
        }

    defineOptions({ inheritAttrs: false })

    // --- Props & Emits ---

    const props = withDefaults(defineProps<NInputComboProps>(), {
        items: () => [],
        listClass: 'bg-surface shadowed overflow-auto',
        labelField: 'label',
        childrenField: 'children',
        valueClass: '',
        valueField: 'value',
        dropdownIcon: 'mdi-menu-down',
        dropdownIconClass: 'text-xl animate-dropdown',
        multiple: false,
        closeDropdownOnSelected: undefined,
        blurOnSelected: true,
        useInput: false,
        clearable: false,
        fillInput: false,
        disabled: false,
        chipProps: () => ({ class: 'text-xs' }),
        loadingName: 'loading',
        debounce: 0
    })

    const emits = defineEmits<{
        (e: 'filter', value: string): void
        (e: 'clear'): void
    }>()

    const slots = useSlots()
    const attrs = useAttrs()

    // --- State ---

    const modelValue = defineModel<string | string[] | number | number[]>()
    const inputValue = defineModel<string>('inputValue', { default: '' })
    const dropdown = defineModel('dropdown', { default: false })

    const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
    const menuRef = useTemplateRef<InstanceType<typeof NMenu>>('menuRef')
    const isFocusing = ref(false)
    const focusPaused = ref(false)
    const menuId = `menu-${generatePseudoRandomKey()}`

    // Internal cache to resolve labels for selected items that might be filtered out
    const itemRegistry = ref(new Map<any, any>())

    // --- Helpers ---

    function updateRegistry(items: any[]) {
        for (const item of items) {
            const val = item[props.valueField]
            if (val !== undefined && val !== null) {
                itemRegistry.value.set(val, item)
            }
            if (item[props.childrenField] && Array.isArray(item[props.childrenField])) {
                updateRegistry(item[props.childrenField])
            }
        }
    }

    const findItemRecursive = (items: any[], value: any): any => {
        // 1. Try to find in current props.items (most up-to-date)
        for (const item of items) {
            if (item[props.valueField] === value) {
                return item
            }
            if (item[props.childrenField] && Array.isArray(item[props.childrenField])) {
                const found = findItemRecursive(item[props.childrenField], value)
                if (found) return found
            }
        }
        // 2. Fallback to registry
        return itemRegistry.value.get(value) || null
    }

    const getItemLabel = (item: any) => (item ? item[props.labelField] : '')
    const getItemValue = (item: any) => (item ? item[props.valueField] : '')

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
        if (!inputValue.value) return props.items
        const search = inputValue.value.toLowerCase()
        return props.items.filter(item => {
            return (item[props.labelField] || '').toLowerCase().includes(search)
        })
    })

    const processedItems = computed(() => {
        if (filteredItems.value.length === 0) {
            const hasEmptySlot = !!slots.empty
            return [
                {
                    [props.labelField]: slots.empty?.() || 'No results found',
                    heading: !hasEmptySlot,
                    disabled: true,
                    value: 'empty-state',
                    class: hasEmptySlot ? '' : 'text-muted italic px-4 py-2'
                }
            ]
        }
        return processItemsRecursive(filteredItems.value)
    })

    const isCloseDropdownOnSelected = computed(() => {
        if (typeof props.closeDropdownOnSelected === 'boolean') return props.closeDropdownOnSelected
        return !props.multiple
    })

    const isClearable = computed(() => {
        if (!props.clearable) return false
        if (!modelValue.value) return false
        if (Array.isArray(modelValue.value) && modelValue.value.length === 0) return false
        return true
    })

    const shouldShowValueLabel = computed(() => {
        if (props.multiple) return false
        return (selectedOptions.value && !inputValue.value && !isFocusing.value) || !props.useInput
    })

    const shouldHideInput = computed(() => {
        return props.multiple && !props.useInput && hasSelectedOptions.value
    })

    const filteredSlots = computed(() =>
        omit(slots, ['default', 'item', 'item-content', 'chip', 'append', 'no-option'])
    )

    const compClasses = computed(() => ['n-input-combo', ...resolveClassProp((attrs as any).class)])

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
            closeDropdownOnSelected,
            blurOnSelected,
            useInput,
            ...rest
        } = props

        // Filter out event listeners to prevent duplication on wrapper
        const safeAttrs = Object.fromEntries(Object.entries(attrs).filter(([key]) => !key.startsWith('on')))

        return {
            ...omit(safeAttrs, ['class', 'modelValue']),
            ...omit(rest as any, ['modelValue', 'modelModifiers'])
        }
    })

    const inputBind = computed(() => {
        return omit(attrs, ['class', 'style', 'modelValue', 'placeholder']) as any
    })

    const inputPlaceholder = computed(() => {
        return getItemLabel(selectedOptions.value) ? '' : attrs['placeholder'] || ''
    })

    const valueClasses = computed(() => ['n-input-combo-value', ...resolveClassProp(props.valueClass)])

    const focusInputRef = computed(() => (focusPaused.value ? null : inputRef.value))

    // --- Watchers ---
    watch(
        () => props.items,
        newItems => {
            updateRegistry(newItems)
        },
        { immediate: true, deep: true }
    )

    watch(
        () => modelValue.value,
        newVal => {
            if (!props.multiple && props.fillInput) {
                const item = findItemRecursive(props.items, newVal)
                if (item) {
                    inputValue.value = props.fillInput === 'value' ? getItemValue(item) : getItemLabel(item)
                } else {
                    inputValue.value = ''
                }
            }
        },
        { immediate: true }
    )

    // --- Methods: Navigation & Interaction ---

    const debouncedFilter = useDebounceFn((value: string) => {
        emits('filter', value)
    }, props.debounce)

    function handleItemKeydown(e: KeyboardEvent) {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            focusNextItem(e.target as HTMLElement)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            focusPrevItem(e.target as HTMLElement)
        } else if (e.key === 'Escape') {
            e.preventDefault()
            handleCloseDropdown()
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            // Return focus to input if at root level or close submenu
            // const itemEl = e.target as HTMLElement
            // If in a submenu, NMenu logic might differ, but generally:
            inputRef.value?.focus()
        }
    }

    function focusNextItem(current: HTMLElement) {
        let next = current.nextElementSibling as HTMLElement
        while (next) {
            if (next.getAttribute('tabindex') === '0') {
                next.focus()
                return
            }
            next = next.nextElementSibling as HTMLElement
        }
    }

    function focusPrevItem(current: HTMLElement) {
        let prev = current.previousElementSibling as HTMLElement
        while (prev) {
            if (prev.getAttribute('tabindex') === '0') {
                prev.focus()
                return
            }
            prev = prev.previousElementSibling as HTMLElement
        }
        // If no previous item, focus input
        inputRef.value?.focus()
    }

    function processItemsRecursive(items: NListItemData[]): NListItemData[] {
        return items.map(item => {
            const isHeading = !!item.heading
            const isDisabled = !!item.disabled
            const isSel = isSelected(item)

            // Process children
            const children = item[props.childrenField]
            const processedChildren = children && Array.isArray(children) ? processItemsRecursive(children) : undefined

            return {
                ...item,
                [props.childrenField]: processedChildren,
                class: resolveClassProp(item.class, isSel ? 'n-list-item--active' : ''),
                tabindex: isHeading || isDisabled ? undefined : '0',
                onKeydown: (e: KeyboardEvent) => {
                    if (isHeading || isDisabled) return
                    handleItemKeydown(e)
                },
                onMousedown: (e: MouseEvent) => {
                    // Prevent focus loss on click (optional, but good UX)
                    if (isHeading || isDisabled) e.preventDefault()
                }
            }
        })
    }

    function isSelected(item: NListItemData): boolean {
        const val = item[props.valueField]
        if (props.multiple && Array.isArray(modelValue.value)) {
            return (modelValue.value as any[]).includes(val)
        }
        return modelValue.value === val
    }

    function removeItem(index: number | string) {
        const val = modelValue.value
        if (props.multiple && Array.isArray(val)) {
            const newVal = [...val]
            newVal.splice(Number(index), 1)
            modelValue.value = newVal as any
        }
    }

    function handleContainerClick() {
        inputRef.value?.focus()
        if (!dropdown.value) dropdown.value = true
    }

    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement
        inputValue.value = target.value
        if (!dropdown.value) dropdown.value = true

        if (props.debounce > 0) {
            debouncedFilter(inputValue.value)
        } else {
            emits('filter', inputValue.value)
        }
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
            inputValue.value = props.fillInput === 'value' ? getItemValue(item) : getItemLabel(item)

            if (props.fillInput) {
                nextTick(() => {
                    inputRef.value?.dispatchEvent(new Event('change', { bubbles: true }))
                })
            }
        }

        if (isCloseDropdownOnSelected.value) {
            handleCloseDropdown()
        }

        if (props.blurOnSelected) {
            inputRef.value?.blur()
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
            // Select first filtered item if hitting enter
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
            const menuComponent = menuRef.value
            if (!menuComponent) return
            // Access the underlying popover's content ref if available, or finding element
            // NMenu exposes popoverRef. NPopover exposes contentRef presumably?
            // Fallback: look for the menu ID in DOM
            const listEl = document.getElementById(menuId)
            if (!listEl) return

            const firstItem = listEl.querySelector('[tabindex="0"]') as HTMLElement
            if (firstItem) firstItem.focus()
        })
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-input-combo {
            .n-input-combo-chips-container {
                @apply relative
                    flex flex-wrap items-center gap-2
                    px-2 py-1;
            }
            .n-input-combo-display-container {
                @apply relative
                    flex flex-wrap items-center grow
                    cursor-text;

                .n-input-combo-value {
                    @apply absolute
                       pointer-events-none truncate w-full
                       px-2 py-1;
                }

                .n-input-combo-input {
                    @apply basis-full;
                    &[readonly] {
                        @apply cursor-default;
                    }
                }
            }

            .animate-dropdown {
                @apply transition-transform duration-200 ease-in-out pointer-events-none;
            }

            &:focus-within .animate-dropdown {
                @apply rotate-180;
            }
        }
    }
</style>
