# Combobox

Advanced selection component with search, multiple selection (chips), and async loading.

<script setup>
import { ref } from 'vue'
const comboValue = ref('1')
const comboItems = [
    { label: 'Apple', value: '1' },
    { label: 'Banana', value: '2' },
    { label: 'Cherry', value: '3' }
]
const multiValue = ref(['1', '2'])
</script>

## Basic Usage

A more advanced, searchable, and customizable selection component with dropdowns.

### Searchable Single Select

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputCombo v-model="comboValue" :items="comboItems" label="Searchable Select" useInput clearable />
    <div class="text-sm">Value: <code>{{ comboValue }}</code></div>
</div>

```vue
<NInputCombo v-model="value" :items="items" useInput clearable label="Fruit" />
```

## Colors & States

Apply semantic color classes to indicate validation states.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputCombo :items="comboItems" class="brand" label="Brand" placeholder="Brand class" />
    <NInputCombo :items="comboItems" class="success" label="Success" helperText="Selection is valid" />
    <NInputCombo :items="comboItems" class="error" label="Error" helperText="Invalid choice detected" />
</div>

```vue
<NInputCombo class="success" label="Success" helperText="Valid!" />
<NInputCombo class="error" label="Error" helperText="Check this field" />
```

## Sizes & Shapes

Available sizes: `small`, `medium` (default), `large`.
Available shapes: `squared`, `normal` (default), `pilled`.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <div class="flex flex-col gap-2">
        <span class="text-xs font-bold text-muted">Sizes</span>
        <NInputCombo :items="comboItems" size="small" label="Small" />
        <NInputCombo :items="comboItems" size="medium" label="Medium" />
        <NInputCombo :items="comboItems" size="large" label="Large" />
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-xs font-bold text-muted">Shapes</span>
        <NInputCombo :items="comboItems" class="squared" label="Squared" />
        <NInputCombo :items="comboItems" label="Normal" />
        <NInputCombo :items="comboItems" class="pilled" label="Pilled" />
    </div>
</div>

```vue
<!-- Sizes -->
<NInputCombo size="small" label="Small" />
<NInputCombo size="medium" label="Medium" />
<NInputCombo size="large" label="Large" />

<!-- Shapes -->
<NInputCombo class="squared" label="Squared" />
<NInputCombo label="Normal" />
<NInputCombo class="pilled" label="Pilled" />
```

## Multiple Selection (Chips)

Allow users to select multiple items, displayed as removable chips.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputCombo v-model="multiValue" :items="comboItems" multiple label="Tags" placeholder="Add fruits..." />
    <div class="text-sm">Value: <code>{{ multiValue }}</code></div>
</div>

```vue
<NInputCombo v-model="value" :items="items" multiple label="Tags" />
```

## Custom Content Slots

Customize the dropdown items or the selected chips.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputCombo :items="comboItems" label="Custom Item Slot">
        <template #item-content="{ item }">
            <div class="flex items-center justify-between w-full">
                <span class="font-bold">{{ item.label }}</span>
                <span class="text-xs text-muted">ID: {{ item.value }}</span>
            </div>
        </template>
    </NInputCombo>
</div>

```vue
<NInputCombo :items="items">
  <template #item-content="{ item }">
    <div class="flex flex-col">
      <span>{{ item.label }}</span>
      <span class="text-xs">{{ item.value }}</span>
    </div>
  </template>
</NInputCombo>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `Array` | `[]` | List of items to display. |
| `v-model` | `any` | - | Selected value(s). |
| `multiple` | `boolean` | `false` | Enable multiple selection with chips. |
| `useInput` | `boolean` | `false` | Enable text input for filtering. |
| `clearable` | `boolean` | `false` | Show a clear button. |
| `label` | `string` | - | Field label. |
| `helperText` | `string` | - | Helper text below input. |
| `message` | `string` | - | Alias for `helperText`. |
| `size` | `string` | `'medium'` | `small`, `medium`, `large`. |
| `loading` | `boolean` | `false` | Show loading spinner. |
| `debounce` | `number` | `0` | Debounce time for filter events. |
| `placeholder` | `string` | - | Input placeholder. |
| `labelField` | `string` | `'label'` | Field to use for display text. |
| `valueField` | `string` | `'value'` | Field to use for value. |
| `fillInput` | `boolean \| string` | `false` | Whether to fill input with selection label/value. |
| `closeDropdownOnSelected` | `boolean` | - | Auto-close dropdown on selection. |
| `blurOnSelected` | `boolean` | `true` | Blur input after selection. |
| `chipProps` | `Object` | - | Props to pass to the `NChip` component. |
| `menuProps` | `Object` | - | Props to pass to the `NMenu` component. |
| `dropdownIcon` | `string` | `'mdi-menu-down'` | Icon for the dropdown arrow. |
| `dropdownIconClass` | `string \| object` | `'text-xl'` | Classes for the dropdown icon. |
| `inputClass` | `string \| object` | - | Classes for the inner input element. |
| `popoverClass` | `string \| object` | - | Classes for the dropdown popover. |
| `listClass` | `string \| object` | - | Classes for the list container. |
| `valueClass` | `string \| object` | - | Classes for the single value display. |

## Slots

| Slot | Description |
| --- | --- |
| `item` | Fully replace the list item rendering. |
| `item-content` | Customize the content inside the list item. |
| `chip` | Customize selected chips (for multiple mode). |
| `empty` | Content to show when no items match. |
| `label` | Custom label content. |
| `helper` | Custom helper text content. |
| `prepend` | Content inside input (left). |
| `append` | Content inside input (right). |
| `top` | Content above input. |
| `bottom` | Content below input. |
| `loading` | Custom loading indicator. |
| `overlay` | Absolute overlay on top of the input area. |
| `dropdown` | Content rendered below the input (used internally, can override). |

## Events

| Event | Description |
| --- | --- |
| `update:modelValue` | Emitted when selection changes. |
| `filter` | Emitted when typing in the input. |
| `clear` | Emitted when clear button is clicked. |

## Recipes & FAQ

### How do I handle async search?
Listen to the `@filter` event. Set the `loading` prop to `true` while fetching, then update the `items` prop with the results.

```vue
<NInputCombo 
  useInput 
  :loading="isLoading" 
  :items="apiResults" 
  @filter="searchApi" 
/>
```

### When should I use Combobox vs Select?
- Use **Select** (`NInputSelect`) for simple, static lists or when you want the native mobile picker experience.
- Use **Combobox** (`NInputCombo`) when you need searching/filtering, multiple selection with chips, or async data loading.

### How to use custom objects?
If your items are complex objects, ensure you set `labelField` (for display text) and `valueField` (for the unique ID) props correctly. By default, it expects `{ label, value }`.
