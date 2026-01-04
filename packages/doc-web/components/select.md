# Select

Native browser selection control, ideal for simple choice lists and highly accessible mobile interfaces.

<script setup>
import { ref } from 'vue'
const selectedValue = ref('apple')
const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' }
]
const groupedOptions = [
    { label: 'Fruits', options: [{ label: 'Apple', value: 'a' }, { label: 'Pear', value: 'p' }] },
    { label: 'Vegetables', options: [{ label: 'Carrot', value: 'c' }] }
]
</script>

## Basic Usage

The component renders a native `<select>` element styled to match the NUI system.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputSelect v-model="selectedValue" :options="options" label="Select Fruit" />
    <div class="caption-text opacity-60">Selected: <code>{{ selectedValue }}</code></div>
</div>

```vue
<script setup>
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' }
]
</script>

<template>
  <NInputSelect v-model="val" :options="options" label="Choose" />
</template>
```

## Grouped Options

Native `optgroup` support via the `options` prop structure.

<div class="w-96 my-4 vp-raw">
    <NInputSelect :options="groupedOptions" label="Categorized List" />
</div>

```vue
<script setup>
const grouped = [
  { label: 'Group A', options: [{ label: 'A1', value: '1' }] }
]
</script>

<NInputSelect :options="grouped" />
```

## Multiple Selection

Enables native multi-select behavior. Note that on many desktop browsers, this requires holding Ctrl/Cmd.

<div class="w-96 my-4 vp-raw">
    <NInputSelect v-model="selectedValue" :options="options" multiple label="Select Multiple" />
</div>

```vue
<NInputSelect multiple :options="options" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `Array` | `[]` | List of items `{ label, value }` or groups. |
| `v-model` | `string \| Array` | - | The selected value(s). |
| `multiple` | `boolean` | `false` | Enable native multiple selection. |
| `label` | `string` | - | Field label. |
| `message` | `string` | - | Helper or error message. |
| `dropdownIcon` | `string` | `'mdi-menu-down'` | Custom icon for the arrow. |
| `loading` | `boolean` | `false` | Shows loading indicator. |
| `disabled` | `boolean` | `false` | Disables the select. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Manually provide `<option>` tags (if not using `options` prop). |
| `label` | Custom label content. |
| `append` | Content after the select element (e.g. custom icon). |

## Recipes & FAQ

### Custom formatting
Use the `formatOption` prop to transform labels dynamically before they are rendered in the options.
```vue
<NInputSelect :formatOption="(l) => `★ ${l}`" />
```

### Why use this over a Combobox?
Use **Select** for small, static lists (under 10 items) where mobile native pickers are desired. Use **Combobox** for long lists, searching, or multi-select with visible chips.