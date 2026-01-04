# Checkbox

Checkboxes allow users to select one or more items from a set, or toggle a single binary choice.

<script setup>
import { ref } from 'vue'
const checked = ref(true)
const indeterminate = ref(null)
const fruitTags = ref(['apple'])
</script>

## Basic Usage

A standard binary checkbox with a label.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox v-model="checked" label="I agree to the terms" inlineLabel />
    <div class="caption-text opacity-60">Value: <code>{{ checked }}</code></div>
</div>

```vue
<NCheckbox v-model="checked" label="Accept Terms" inlineLabel />
```

## Indeterminate State

Checkboxes support a three-state mode (Checked, Unchecked, Indeterminate) by setting the model to `null`.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox v-model="indeterminate" label="Select All (Mixed)" inlineLabel />
    <div class="flex gap-2">
        <NButton size="xs" label="Set Null" @click="indeterminate = null" />
        <NButton size="xs" label="Set True" @click="indeterminate = true" />
        <NButton size="xs" label="Set False" @click="indeterminate = false" />
    </div>
</div>

```vue
<!-- modelValue === null triggers indeterminate icon -->
<NCheckbox v-model="mixedState" label="Parent Task" inlineLabel />
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
<NCheckbox class="success" label="Correct" inlineLabel />
```

## Custom Content

You can use the default slot to include rich HTML or links in your checkbox label.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NCheckbox :modelValue="false">
        <span class="body-text">I have read the <a href="#" class="link-text text-brand underline">privacy policy</a>.</span>
    </NCheckbox>
</div>

```vue
<NCheckbox v-model="agreed">
  <span>Agree to <a href="#">Terms</a></span>
</NCheckbox>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean \| null` | `null` | The checked state. `null` represents the indeterminate state. |
| `label` | `string` | - | The label text. |
| `inlineLabel` | `boolean` | `false` | Whether to display the label immediately to the right of the checkbox. |
| `checkedIcon` | `string` | `'mdi-check-bold'` | Icon to show when checked. |
| `uncheckedIcon` | `string` | - | Icon to show when unchecked. |
| `indeterminateIcon` | `string` | `'mdi-minus'` | Icon to show when indeterminate (`null`). |
| `message` | `string` | - | Helper or error message shown below. |
| `disabled` | `boolean` | `false` | Disables the checkbox. |
| `tag` | `string` | `'label'` | The root HTML tag. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Content displayed next to the checkbox (replaces/augments label). |
| `label` | Custom label content (if `inlineLabel` is false). |
| `inlineLabel` | Custom inline label content. |
| `message` | Custom message content. |

## Recipes & FAQ

### How do I use this for a group of items?
You can manage an array of values in your parent component and bind each checkbox to a boolean logic.

```vue
<template>
  <NCheckbox 
    v-for="fruit in ['Apple', 'Banana']" 
    :label="fruit"
    :modelValue="selectedFruits.includes(fruit)"
    @update:modelValue="toggle(fruit)"
    inlineLabel
  />
</template>
```

### Can I change the checkbox size?
The checkbox box size is fixed at `size-5` (20px) by default to match standard form scales. You can override this in your theme or via custom CSS on the `.n-checkbox-display` class.