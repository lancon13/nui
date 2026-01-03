# Radio

Radio buttons allow the user to select one option from a set.

## Basic Usage

<script setup>
import { ref } from 'vue'
const picked = ref('A')
</script>

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NRadio v-model="picked" value="A" label="Option A" inlineLabel />
    <NRadio v-model="picked" value="B" label="Option B" inlineLabel />
    <div class="text-sm">Value: <code>{{ picked }}</code></div>
</div>

```vue
<NRadio v-model="picked" value="A" label="Option A" inlineLabel />
<NRadio v-model="picked" value="B" label="Option B" inlineLabel />
```

## Colors

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NRadio class="brand" :modelValue="'brand'" value="brand" label="Brand" inlineLabel />
    <NRadio class="success" :modelValue="'success'" value="success" label="Success" inlineLabel />
    <NRadio class="error" :modelValue="'error'" value="error" label="Error" inlineLabel />
</div>

```vue
<NRadio class="brand" label="Brand Color" inlineLabel />
```

## With Slot Content

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NRadio v-model="picked" value="C">
        Option C with <span class="text-brand font-bold">Custom Styling</span>
    </NRadio>
</div>

```vue
<NRadio value="custom">Custom Content</NRadio>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `any` | - | The currently selected value. |
| `value` | `any` | - | The value represented by this radio button. |
| `label` | `string` | - | Radio label. |
| `inlineLabel` | `boolean` | `false` | Whether to show the label next to the radio. |
| `checkedIcon` | `string` | `'mdi-circle'` | Icon when checked. |
| `uncheckedIcon` | `string` | `'undefined'` | Icon when unchecked. |
| `disabled` | `boolean` | `false` | Whether the radio is disabled. |
| `message` | `string` | - | Helper or error message. |
| `name` | `string` | - | Input name attribute. |
| `tag` | `string` | `'label'` | Wrapper tag. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Content displayed next to the radio (replaces/augments label). |
| `label` | Custom label content (if `inlineLabel` is false). |
| `inlineLabel` | Custom inline label content. |
| `message` | Custom message content. |

## Events

| Event | Description |
| --- | --- |
| `update:modelValue` | Emitted when the selected value changes. |

