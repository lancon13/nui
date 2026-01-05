# Radio

Radio buttons allow users to select exactly one option from a set.

<script setup>
import { ref } from 'vue'
const selected = ref('one')
const colorSelected = ref('brand')
const sizeSelected = ref('medium')
const disabledSelected = ref('one')
</script>

## Basic Usage

Radios should be used when only one choice is allowed. Bind them to the same `v-model`.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NRadio v-model="selected" name="basic-demo" value="one" label="Option One" />
    <NRadio v-model="selected" name="basic-demo" value="two" label="Option Two" />
    <div class="caption-text opacity-60">Selected: <code>{{ selected }}</code></div>
</div>

```vue
<script setup>
import { ref } from 'vue'
const selected = ref('one')
</script>

<template>
  <NRadio v-model="selected" value="one" label="Option One" />
  <NRadio v-model="selected" value="two" label="Option Two" />
</template>
```

## Colors

Apply semantic color classes to change the radio appearance.

<div class="grid grid-cols-3 gap-4 my-4 vp-raw">
    <NRadio v-model="colorSelected" name="color-demo" value="brand" label="Brand" class="brand" />
    <NRadio v-model="colorSelected" name="color-demo" value="success" label="Success" class="success" />
    <NRadio v-model="colorSelected" name="color-demo" value="error" label="Error" class="error" />
    <NRadio v-model="colorSelected" name="color-demo" value="warning" label="Warning" class="warning" />
    <NRadio v-model="colorSelected" name="color-demo" value="info" label="Info" class="info" />
</div>

```vue
<NRadio class="brand" label="Brand" />
<NRadio class="success" label="Success" />
<NRadio class="error" label="Error" />
```

## Sizes

Available sizes: `small`, `medium` (default), `large`.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NRadio v-model="sizeSelected" name="size-demo" value="small" label="Small" size="small" />
    <NRadio v-model="sizeSelected" name="size-demo" value="medium" label="Medium" size="medium" />
    <NRadio v-model="sizeSelected" name="size-demo" value="large" label="Large" size="large" />
</div>

```vue
<NRadio size="small" label="Small" />
<NRadio size="large" label="Large" />
```

## Descriptions & Helpers

Add `description` for clickable sub-text associated with the radio, and `helperText` for guidance below.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NRadio 
        v-model="selected" 
        value="desc" 
        label="With Description" 
        description="This text is also clickable." 
        helperText="Useful for providing extra context."
    />
</div>

```vue
<NRadio 
  label="Plan Pro" 
  description="$20/month, billed annually" 
  helperText="Best value for small teams"
/>
```

## Disabled State

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NRadio v-model="disabledSelected" value="one" label="Disabled Selected" disabled />
    <NRadio v-model="disabledSelected" value="two" label="Disabled Unselected" disabled />
</div>

```vue
<NRadio disabled label="Disabled" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `any` | - | The currently selected value. |
| `value` | `any` | - | **Required.** The unique value this radio button represents. |
| `label` | `string` | - | The label text. |
| `name` | `string` | `'nui-radio'` | Native input name attribute. |
| `description` | `string` | - | Secondary text next to the label (clickable). |
| `helperText` | `string` | - | Helper text displayed below the radio (alias for `message`). |
| `message` | `string` | - | Helper text displayed below the radio. |
| `disabled` | `boolean` | `false` | Disables the radio button. |
| `size` | `string` | `'medium'` | `small`, `medium`, `large`. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Custom content for description (overrides `description` prop). |
| `label` | Custom label content. |
| `helper` | Custom helper text content. |

## Recipes & FAQ

### How do I clear a radio selection?
Radio buttons are not designed to be "un-selected" individually by clicking them again. To clear a selection, you must set the `v-model` variable to a value that doesn't match any radio button (like `null` or `''`) programmatically.

### Can I stack them vertically?
Yes, `NRadio` is a block-level element wrapper. Placing them inside a standard `div` will stack them vertically. Use `flex-row` or grid for horizontal layouts.