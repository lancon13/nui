# Checkbox

Checkboxes allow users to select one or more items from a set, or toggle a single binary choice.

<script setup>
import { ref } from 'vue'
const checked = ref(true)
const unchecked = ref(false)
const indeterminate = ref(null)
const inlineValue = ref(true)
</script>

## Basic Usage

A standard binary checkbox with a label.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox v-model="checked" label="I agree to the terms" />
    <div class="caption-text opacity-60">Value: <code>{{ checked }}</code></div>
</div>

```vue
<script setup>
import { ref } from 'vue'
const checked = ref(true)
</script>

<template>
  <NCheckbox v-model="checked" label="Accept Terms" />
</template>
```

## Inline Label

Use the `inlineLabel` prop to display the label text immediately next to the checkbox, rather than above it.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox v-model="inlineValue" label="Inline Checkbox" inlineLabel />
</div>

```vue
<NCheckbox v-model="value" label="Inline Checkbox" inlineLabel />
```

## States

Checkboxes support `true`, `false`, and `null` (indeterminate) states.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox v-model="checked" label="Checked" />
    <NCheckbox v-model="unchecked" label="Unchecked" />
    <NCheckbox v-model="indeterminate" label="Indeterminate" />
    <NCheckbox v-model="checked" label="Disabled Checked" disabled />
</div>

```vue
<NCheckbox v-model="checked" label="Checked" />
<NCheckbox v-model="indeterminate" label="Indeterminate" />
<NCheckbox v-model="checked" label="Disabled" disabled />
```

## Colors

Apply semantic color classes to change the checkbox appearance.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox class="brand" :modelValue="true" label="Brand" inlineLabel />
    <NCheckbox class="success" :modelValue="true" label="Success" inlineLabel />
    <NCheckbox class="error" :modelValue="true" label="Error" inlineLabel />
    <NCheckbox class="warning" :modelValue="true" label="Warning" inlineLabel />
    <NCheckbox class="info" :modelValue="true" label="Info" inlineLabel />
</div>

```vue
<NCheckbox class="brand" label="Brand" />
<NCheckbox class="success" label="Success" />
```

## Sizes

Available sizes: `small`, `medium` (default), `large`.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox size="small" label="Small" :modelValue="true" inlineLabel />
    <NCheckbox size="medium" label="Medium" :modelValue="true" inlineLabel />
    <NCheckbox size="large" label="Large" :modelValue="true" inlineLabel />
</div>

```vue
<NCheckbox size="small" label="Small" />
<NCheckbox size="large" label="Large" />
```

## Custom Content

You can use the default slot to include rich HTML or links in your checkbox label.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox :modelValue="false">
        <span class="body-text">I have read the <a href="#" class="link-text text-brand underline" @click.prevent>privacy policy</a>.</span>
    </NCheckbox>
</div>

```vue
<NCheckbox v-model="agreed">
  <span>Agree to <a href="#">Terms</a></span>
</NCheckbox>
```

## Messages & Validation

Use the `message` prop to display helper text or validation errors.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox label="Subscribe" message="We will send you weekly updates." />
    <NCheckbox class="error" :modelValue="false" label="Terms" message="You must accept the terms." />
</div>

```vue
<NCheckbox label="Subscribe" message="Helper text" />
<NCheckbox class="error" label="Terms" message="Error message" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean \| null` | `null` | The checked state. `null` represents the indeterminate state. |
| `label` | `string` | - | The label text. |
| `name` | `string` | - | Native input name attribute. |
| `inlineLabel` | `boolean` | `false` | Whether to display the label inline next to the checkbox. |
| `checkedIcon` | `string` | `'mdi-check-bold'` | Icon to show when checked. |
| `uncheckedIcon` | `string` | - | Icon to show when unchecked. |
| `indeterminateIcon` | `string` | `'mdi-minus'` | Icon to show when indeterminate (`null`). |
| `size` | `string` | `'medium'` | `small`, `medium`, `large`. |
| `message` | `string` | - | Helper or error message shown below. |
| `helperText` | `string` | - | Alias for `message`. |
| `disabled` | `boolean` | `false` | Disables the checkbox. |
| `inputClass` | `string \| object` | - | CSS classes for the native input element. |
| `tag` | `string` | `'label'` | The root HTML tag. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Content displayed next to the checkbox (replaces/augments label). |
| `label` | Custom label content (if `inlineLabel` is false). |
| `inlineLabel` | Custom inline label content. |
| `message` | Custom message content. |
| `top` | Content above the checkbox input. |
| `bottom` | Content below the checkbox input. |
| `prepend` | Content before the checkbox icon. |
| `append` | Content after the checkbox icon. |

## Recipes & FAQ

### How do I use this for a group of items?
You can manage an array of values in your parent component and bind each checkbox to a boolean logic.

```vue
<template>
  <div v-for="fruit in ['Apple', 'Banana']" :key="fruit">
    <NCheckbox 
      :label="fruit"
      :modelValue="selectedFruits.includes(fruit)"
      @update:modelValue="toggle(fruit)"
      inlineLabel
    />
  </div>
</template>
```

### Can I change the checkbox size?
Yes, use the `size` prop to switch between `small`, `medium` (default), and `large`. You can also override the `.n-checkbox-display` class in your theme for custom pixel-perfect sizing if needed.
