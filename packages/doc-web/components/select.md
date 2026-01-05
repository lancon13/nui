# Select

Native browser selection control, ideal for simple choice lists and highly accessible mobile interfaces.

<script setup>
import { ref } from 'vue'
const selectedValue = ref('1')
const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
]
const groupedOptions = [
    { label: 'Fruits', options: [{ label: 'Apple', value: 'a' }, { label: 'Pear', value: 'p' }] },
    { label: 'Vegetables', options: [{ label: 'Carrot', value: 'c' }] }
]
</script>

## Basic Usage

The component renders a native `<select>` element styled to match the NUI system.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputSelect v-model="selectedValue" :options="options" label="Select Option" />
    <div class="caption-text opacity-60">Selected: <code>{{ selectedValue }}</code></div>
</div>

```vue
<script setup>
import { ref } from 'vue'
const value = ref('1')
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' }
]
</script>

<template>
  <NInputSelect v-model="value" :options="options" label="Choose" />
</template>
```

## Colors

Apply semantic color classes using standard utility classes.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputSelect v-model="selectedValue" :options="options" class="brand" label="Brand" />
    <NInputSelect v-model="selectedValue" :options="options" class="success" label="Success" />
    <NInputSelect v-model="selectedValue" :options="options" class="error" label="Error" />
</div>

```vue
<NInputSelect class="brand" label="Primary" />
<NInputSelect class="success" label="Success" />
<NInputSelect class="error" label="Error" />
```

## Sizes & Shapes

Available sizes: `small`, `medium` (default), `large`.
Available shapes: `squared`, `normal` (default), `pilled`.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <div class="flex flex-col gap-2">
        <span class="text-xs font-bold text-muted">Sizes</span>
        <NInputSelect v-model="selectedValue" :options="options" size="small" label="Small" />
        <NInputSelect v-model="selectedValue" :options="options" size="medium" label="Medium" />
        <NInputSelect v-model="selectedValue" :options="options" size="large" label="Large" />
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-xs font-bold text-muted">Shapes</span>
        <NInputSelect v-model="selectedValue" :options="options" class="squared" label="Squared" />
        <NInputSelect v-model="selectedValue" :options="options" label="Normal" />
        <NInputSelect v-model="selectedValue" :options="options" class="pilled" label="Pilled" />
    </div>
</div>

```vue
<!-- Sizes -->
<NInputSelect size="small" label="Small" />
<NInputSelect size="medium" label="Medium" />
<NInputSelect size="large" label="Large" />

<!-- Shapes -->
<NInputSelect class="squared" label="Squared" />
<NInputSelect label="Normal" />
<NInputSelect class="pilled" label="Pilled" />
```

## Multiple Selection

Enables native multi-select behavior.

<div class="w-96 my-4 vp-raw">
    <NInputSelect :options="options" multiple label="Select Multiple" />
</div>

```vue
<NInputSelect multiple :options="options" />
```

## Custom Slots

Customize the input with `prepend` and `append` slots.

<div class="w-96 my-4 vp-raw">
    <NInputSelect v-model="selectedValue" :options="options" label="With Icons">
        <template #prepend>
            <span>👤</span>
        </template>
        <template #append>
            <span class="text-xs text-muted pr-6">Optional</span>
        </template>
    </NInputSelect>
</div>

```vue
<NInputSelect>
  <template #prepend>
    <NIcon name="user" />
  </template>
</NInputSelect>
```

## Formatting

Use `formatOption` to transform label text dynamically.

<div class="w-96 my-4 vp-raw">
    <NInputSelect 
        v-model="selectedValue" 
        :options="options" 
        label="Formatted Options" 
        :formatOption="(val) => `✦ ${val}`"
    />
</div>

```vue
<NInputSelect :formatOption="(l) => `✦ ${l}`" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `Array` | `[]` | List of items `{ label, value }` or groups. |
| `v-model` | `string \| Array` | - | The selected value(s). |
| `label` | `string` | - | Field label. |
| `placeholder` | `string` | `'Select an option'` | Placeholder text (disabled first option). |
| `helperText` | `string` | - | Helper text below the input. |
| `message` | `string` | - | Error message/helper alias. |
| `size` | `string` | `'medium'` | `small`, `medium`, `large`. |
| `loading` | `boolean` | `false` | Shows loading indicator. |
| `disabled` | `boolean` | `false` | Disables the select. |
| `multiple` | `boolean` | `false` | Enable native multiple selection. |
| `name` | `string` | - | Native input name attribute. |
| `dropdownIcon` | `string` | `'mdi-menu-down'` | Icon for the dropdown arrow. |
| `dropdownIconClass` | `string \| object` | `'text-xl'` | Classes for the dropdown icon. |
| `showCheckmark` | `boolean` | `true` | Whether to show checkmark style logic (styling only). |
| `formatOption` | `(val: string) => string` | - | Function to format option labels. |
| `formatOptGroup` | `(val: string) => string` | - | Function to format optgroup labels. |
| `inputClass` | `string \| object` | - | Classes applied to the native select element. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Manually provide `<option>` tags (if not using `options` prop). |
| `label` | Custom label content. |
| `helper` | Custom helper text content. |
| `before` | Content before the input wrapper. |
| `after` | Content after the input wrapper. |
| `prepend` | Content inside the input (left). |
| `append` | Content inside the input (right). |
| `top` | Content between label and input. |
| `bottom` | Content below input. |
| `loading` | Custom loading indicator. |
| `overlay` | Absolute overlay on top of the input area. |

## Recipes & FAQ

### How do I group options?
Pass a nested structure to the `options` prop. Each group object should have a `label` and an `options` array.

```js
const grouped = [
  { 
    label: 'Fruits', 
    options: [{ label: 'Apple', value: 'a' }] 
  }
]
```

### Can I clear the selection?
If `multiple` is false, `NInputSelect` behaves like a native select. To allow clearing, include an option with a `null` or empty string value, or control the `v-model` externally.