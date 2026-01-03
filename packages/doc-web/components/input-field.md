# Input Field

A base wrapper component for form inputs, handling labels, icons, errors, and loading states. Typically used internally by other input components but can be used directly for custom inputs.

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>

## Basic Usage

<div class="w-96 my-4 vp-raw">
    <NInputField v-model="value" label="Custom Field">
        <input class="w-full bg-transparent outline-none px-2" v-model="value" placeholder="Raw input..." />
    </NInputField>
</div>

```vue
<NInputField label="Label">
  <input v-model="val" />
</NInputField>
```

## Slots Structure

`NInputField` provides numerous slots for layout customization around the input element.

<div class="w-96 my-4 vp-raw">
    <NInputField label="Slots Demo">
        <template #prepend><span class="text-brand pl-2">Pre</span></template>
        <template #append><span class="text-brand pr-2">App</span></template>
        <input class="w-full bg-transparent outline-none px-2" placeholder="Content" />
    </NInputField>
</div>

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | - | Field label. |
| `icon` | `string` | - | Leading icon inside wrapper. |
| `prependIcon` | `string` | - | Leading icon alias. |
| `appendIcon` | `string` | - | Trailing icon. |
| `message` | `string` | - | Helper/Error message. |
| `loading` | `boolean` | `false` | Show loading spinner. |
| `disabled` | `boolean` | `false` | Visual disabled state. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | The input element itself. |
| `label` | Custom label. |
| `prepend` | Before input (inside border). |
| `append` | After input (inside border). |
| `before` | Before wrapper (outside). |
| `after` | After wrapper (outside). |
| `top` | Between label and wrapper. |
| `bottom` | Below wrapper (above message). |
