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

### Multiple Selection (Chips)

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputCombo v-model="multiValue" :items="comboItems" multiple label="Tags" placeholder="Add fruits..." />
    <div class="text-sm">Value: <code>{{ multiValue }}</code></div>
</div>

```vue
<NInputCombo v-model="value" :items="items" multiple label="Tags" />
```

### Custom Item Content

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputCombo :items="comboItems" label="Custom Slot">
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
| `multiple` | `boolean` | `false` | Enable multiple selection with chips. |
| `useInput` | `boolean` | `false` | Enable text input for filtering. |
| `clearable` | `boolean` | `false` | Show a clear button. |
| `labelField` | `string` | `'label'` | Field to use for display text. |
| `valueField` | `string` | `'value'` | Field to use for value. |
| `fillInput` | `boolean` | `false` | Whether to fill the input with selection label/value. |
| `loading` | `boolean` | `false` | Show loading spinner. |
| `debounce` | `number` | `0` | Debounce time for filter events. |
| `closeDropdownOnSelected` | `boolean` | `true` (single) | Auto-close dropdown on selection. |

## Slots

| Slot | Description |
| --- | --- |
| `item` | Fully replace the list item rendering. |
| `item-content` | Customize the content inside the list item. |
| `chip` | Customize selected chips (for multiple mode). |
| `empty` | Content to show when no items match. |
| `prepend` | Content before input. |
| `append` | Content after input (e.g. search icon). |

## Events

| Event | Description |
| --- | --- |
| `update:modelValue` | Emitted when selection changes. |
| `filter` | Emitted when typing in the input (for async search). |
| `clear` | Emitted when clear button is clicked. |
