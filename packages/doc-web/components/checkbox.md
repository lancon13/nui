# Checkbox

Checkboxes allow the user to select one or more items from a set.

## Basic Usage

<script setup>
import { ref } from 'vue'
const checked = ref(true)
const indeterminate = ref(null)
</script>

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox v-model="checked" label="Subscribe to newsletter" inlineLabel />
    <div class="text-sm">Value: <code>{{ checked }}</code></div>
    
    <NCheckbox v-model="indeterminate" label="Indeterminate state" inlineLabel />
    <div class="text-sm">Value: <code>{{ indeterminate }}</code></div>
</div>

```vue
<NCheckbox v-model="checked" label="Accept terms" inlineLabel />
```

## Colors

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox class="brand" :modelValue="true" label="Brand" inlineLabel />
    <NCheckbox class="success" :modelValue="true" label="Success" inlineLabel />
    <NCheckbox class="error" :modelValue="true" label="Error" inlineLabel />
</div>

```vue
<NCheckbox class="brand" label="Brand Color" inlineLabel />
```

## With Slot Content

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox :modelValue="false">
        I agree with the <a href="#" class="text-brand underline">terms and conditions</a>.
    </NCheckbox>
</div>

```vue
<NCheckbox v-model="agreed">
  I agree with the <a href="#">terms</a>.
</NCheckbox>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean \| null` | `null` | The checked state (null is indeterminate). |
| `label` | `string` | - | Checkbox label. |
| `inlineLabel` | `boolean` | `false` | Whether to show the label next to the checkbox. |
| `checkedIcon` | `string` | `'mdi-check-bold'` | Icon when checked. |
| `uncheckedIcon` | `string` | - | Icon when unchecked. |
| `indeterminateIcon` | `string` | `'mdi-minus'` | Icon when state is null. |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled. |
| `message` | `string` | - | Helper or error message. |
| `name` | `string` | - | Input name attribute. |
| `tag` | `string` | `'label'` | Wrapper tag. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Content displayed next to the checkbox (replaces/augments label). |
| `label` | Custom label content (if `inlineLabel` is false). |
| `inlineLabel` | Custom inline label content. |
| `message` | Custom message content. |

## Events

| Event | Description |
| --- | --- |
| `update:modelValue` | Emitted when the checked state changes. |

