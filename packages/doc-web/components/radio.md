# Radio

Radio buttons allow users to select exactly one option from a set.

<script setup>
import { ref } from 'vue'
const selected = ref('A')
</script>

## Basic Usage

Radios should be used when only one choice is allowed. Bind them to the same `v-model`.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NRadio v-model="selected" value="A" label="Option A" inlineLabel />
    <NRadio v-model="selected" value="B" label="Option B" inlineLabel />
    <NRadio v-model="selected" value="C" label="Option C" inlineLabel />
    <div class="caption-text opacity-60">Selected Value: <code>{{ selected }}</code></div>
</div>

```vue
<script setup>
const choice = ref('A')
</script>

<template>
  <NRadio v-model="choice" value="A" label="Option A" inlineLabel />
  <NRadio v-model="choice" value="B" label="Option B" inlineLabel />
</template>
```

## Colors

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NRadio class="brand" :modelValue="'brand'" value="brand" label="Brand" inlineLabel />
    <NRadio class="success" :modelValue="'success'" value="success" label="Success" inlineLabel />
    <NRadio class="error" :modelValue="'error'" value="error" label="Error" inlineLabel />
</div>

```vue
<NRadio class="brand" label="Default" />
```

## Custom Layout

Radio buttons can contain rich content in their default slot.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NRadio v-model="selected" value="D">
        <div class="flex flex-col">
            <span class="label-text">Advanced Option</span>
            <span class="caption-text opacity-60">Extra details about this choice...</span>
        </div>
    </NRadio>
</div>

```vue
<NRadio value="advanced">
  <div class="flex flex-col">
    <span class="label-text">Title</span>
    <span class="caption-text">Description</span>
  </div>
</NRadio>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `any` | - | The currently selected value. |
| `value` | `any` | - | **Required.** The unique value this radio button represents. |
| `label` | `string` | - | The label text. |
| `inlineLabel` | `boolean` | `false` | Whether to display the label immediately to the right of the radio. |
| `checkedIcon` | `string` | `'mdi-circle'` | Icon name to show inside the radio when selected. |
| `disabled` | `boolean` | `false` | Disables the radio button. |
| `message` | `string` | - | Helper or error message shown below. |
| `name` | `string` | - | Native input `name` attribute. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Content displayed next to the radio (replaces/augments label). |
| `label` | Custom label content (if `inlineLabel` is false). |
| `inlineLabel` | Custom inline label content. |
| `message` | Custom message content. |

## Recipes & FAQ

### How do I clear a radio selection?
Radio buttons are not designed to be "un-selected" individually. To clear a selection, you must set the `v-model` variable to a value that doesn't match any radio button (like `null` or `''`).

### Can I change the circular indicator?
Yes, use the `checkedIcon` prop to use a different icon (e.g., `mdi-check`) instead of the default dot.
```vue
<NRadio checkedIcon="mdi-check" />
```