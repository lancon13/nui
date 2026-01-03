# Select

Native selection control for picking items from a list.

<script setup>
import { ref } from 'vue'
const selected = ref('opt1')
const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' }
]
</script>

## Basic Usage

Uses the browser's native select element. Best for simple lists and mobile-friendly interfaces.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputSelect v-model="selected" :options="options" label="Pick an option" />
    <div class="text-sm">Value: <code>{{ selected }}</code></div>
</div>

```vue
<NInputSelect v-model="selected" :options="options" label="Select" />
```

## Grouped Options

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputSelect 
        label="Cars" 
        :options="[
            { label: 'German', options: [{ label: 'BMW', value: 'bmw' }, { label: 'Audi', value: 'audi' }] },
            { label: 'Swedish', options: [{ label: 'Volvo', value: 'volvo' }] }
        ]" 
    />
</div>

## Multiple Select

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputSelect multiple label="Native Multiple" :options="options" />
</div>

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `Array` | `[]` | List of options `{ label, value }` or groups. |
| `multiple` | `boolean` | `false` | Enable native multiple selection. |
| `label` | `string` | - | Input label. |
| `message` | `string` | - | Helper or error message. |
| `disabled` | `boolean` | `false` | Disable input. |
| `loading` | `boolean` | `false` | Show loading state. |
| `formatOption` | `Function` | - | Function to format option labels. |
| `dropdownIcon` | `string` | `'mdi-menu-down'` | Custom dropdown icon. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Custom options content (if not using `options` prop). |
| `append` | Content after the select element (e.g. icon). |
