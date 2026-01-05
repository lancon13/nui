# Input Text

Standard text input fields for user interaction, supporting various types, validation states, debouncing, and formatting.

<script setup>
import { ref } from 'vue'
const text = ref('')
const password = ref('')
const numberValue = ref(0)
const debouncedValue = ref('')
const showPass = ref(false)
const inputCount = ref(0)
const changeCount = ref(0)
</script>

## Basic Usage

A simple text input with a label and placeholder.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText v-model="text" label="Username" placeholder="Enter your username" />
    <div class="caption-text opacity-60">Value: <code>{{ text }}</code></div>
</div>

```vue
<script setup>
import { ref } from 'vue'
const text = ref('')
</script>

<template>
  <NInputText v-model="text" label="Username" placeholder="Enter username" />
</template>
```

## Colors & States

Apply semantic color classes to indicate validation states.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText label="Default" placeholder="Default state" />
    <NInputText class="brand" label="Brand" placeholder="Brand class" />
    <NInputText class="success" label="Success" placeholder="Success class" helperText="Username available" />
    <NInputText class="error" label="Error" placeholder="Error class" helperText="Field is required" />
</div>

```vue
<NInputText class="success" label="Success" helperText="Saved!" />
<NInputText class="error" label="Error" helperText="Invalid input" />
```

## Sizes & Shapes

Available sizes: `small`, `medium` (default), `large`.
Available shapes: `squared`, `normal` (default), `pilled`.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <div class="flex flex-col gap-2">
        <span class="text-xs font-bold text-muted">Sizes</span>
        <NInputText size="small" placeholder="Small" />
        <NInputText size="medium" placeholder="Medium" />
        <NInputText size="large" placeholder="Large" />
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-xs font-bold text-muted">Shapes</span>
        <NInputText class="squared" placeholder="Squared" />
        <NInputText placeholder="Normal" />
        <NInputText class="pilled" placeholder="Pilled" />
    </div>
</div>

```vue
<!-- Sizes -->
<NInputText size="small" placeholder="Small" />
<NInputText size="medium" placeholder="Medium" />
<NInputText size="large" placeholder="Large" />

<!-- Shapes -->
<NInputText class="squared" placeholder="Squared" />
<NInputText placeholder="Normal" />
<NInputText class="pilled" placeholder="Pilled" />
```

## Input Types

### Password

Use `type="password"` for sensitive data. You can toggle visibility using the `append` slot.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText v-model="password" :type="showPass ? 'text' : 'password'" label="Password" placeholder="••••••••">
        <template #prepend>
            <span>🔒</span>
        </template>
        <template #append>
            <span class="cursor-pointer hover:text-brand select-none" @click="showPass = !showPass">
                {{ showPass ? '👁️' : '🫣' }}
            </span>
        </template>
    </NInputText>
</div>

```vue
<NInputText :type="showPass ? 'text' : 'password'">
  <template #append>
    <span @click="showPass = !showPass">
      {{ showPass ? 'Hide' : 'Show' }}
    </span>
  </template>
</NInputText>
```

### Number

Use `type="number"` for numeric inputs.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText v-model="numberValue" type="number" label="Age" />
    <div class="caption-text opacity-60">Value: <code>{{ numberValue }}</code> (Type: {{ typeof numberValue }})</div>
</div>

```vue
<NInputText type="number" label="Age" />
```

## Events

Understand the difference between `input` (keystroke) and `change` (blur) events.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText placeholder="Type and blur..." @input="inputCount++" @change="changeCount++" />
    <div class="grid grid-cols-2 gap-4 text-center">
        <div class="p-2 bg-surface rounded border border-border">
            <div class="text-xs uppercase opacity-60 font-bold">Input</div>
            <div class="text-2xl font-black text-brand">{{ inputCount }}</div>
        </div>
        <div class="p-2 bg-surface rounded border border-border">
            <div class="text-xs uppercase opacity-60 font-bold">Change</div>
            <div class="text-2xl font-black text-success">{{ changeCount }}</div>
        </div>
    </div>
</div>

```vue
<NInputText @input="onInput" @change="onChange" />
```

## Advanced Features

### Debounce

The `debounce` prop delays updating the `v-model` until the user has stopped typing.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText v-model="debouncedValue" :debounce="500" label="Debounced Input (500ms)" placeholder="Type fast..." />
    <div class="caption-text opacity-60">Model Value: <code>{{ debouncedValue }}</code></div>
</div>

```vue
<NInputText v-model="value" :debounce="500" />
```

### Formatting

Use `format` (display) and `parse` (model) props to transform values.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText label="Uppercase Only" :format="(v) => v?.toUpperCase()" :parse="(v) => v?.toLowerCase()" placeholder="Types lowercase, shows uppercase" />
</div>

```vue
<NInputText :format="(val) => val.toUpperCase()" :parse="(val) => val.toLowerCase()" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string \| number` | - | The input value. |
| `label` | `string` | - | Field label. |
| `name` | `string` | - | Native input name attribute. |
| `type` | `string` | `'text'` | HTML input type (text, password, number, email, etc). |
| `placeholder` | `string` | - | Native placeholder text. |
| `helperText` | `string` | - | Helper or error message shown below the input. |
| `message` | `string` | - | Error message/helper alias. |
| `size` | `string` | `'medium'` | `small`, `medium`, `large`. |
| `debounce` | `number` | `0` | Debounce delay in milliseconds for `v-model` updates. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `readonly` | `boolean` | `false` | Makes the input read-only. |
| `loading` | `boolean` | `false` | Shows a loading spinner and disables interaction. |
| `loadingName` | `string` | `'loading'` | Icon name for the loading spinner. |
| `inputClass` | `string \| object` | - | CSS classes applied directly to the `input` element. |
| `format` | `(val: any) => string` | - | Function to format the display value. |
| `parse` | `(val: string) => string` | - | Function to parse the input value before update. |

## Slots

| Slot | Description |
| --- | --- |
| `label` | Custom label content. |
| `helper` | Custom helper text content. |
| `before` | Content before the input wrapper (outside). |
| `after` | Content after the input wrapper (outside). |
| `prepend` | Content inside the input wrapper, before the text. |
| `append` | Content inside the input wrapper, after the text. |
| `top` | Content between the label and the input wrapper. |
| `bottom` | Content below the input wrapper (above the message). |

## Events

| Event | Description |
| --- | --- |
| `update:modelValue` | Emitted when the value changes (respects debounce). |
| `input` | Emitted immediately on every keystroke. |
| `change` | Emitted when the input loses focus (blur). |

## Recipes & FAQ

### How do I use arbitrary Tailwind classes on the input?
Use the `inputClass` prop to target the native `input` element directly, while the `class` attribute targets the wrapper.
```vue
<NInputText inputClass="text-right font-mono text-xl" />
```

### Can I use this for multi-line text?
`NInputText` is designed for single-line inputs. For multi-line text, you should use a `textarea` element wrapped in an `NInputField` manually.

### Why does my number input return a string?
HTML number inputs often return values as strings in JavaScript. NUI preserves this native behavior. You can use the `.number` modifier on `v-model` (e.g. `v-model.number="val"`) or handle parsing manually.