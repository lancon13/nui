# Input Text

Standard text input fields for user interaction, supporting various types, validation states, and debouncing.

<script setup>
import { ref } from 'vue'
const text = ref('Hello NUI')
const password = ref('')
const numberValue = ref(42)
const debouncedValue = ref('')
const showPass = ref(false)
</script>

## Basic Usage

A simple text input with a label and placeholder.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText v-model="text" label="Username" placeholder="Enter your username" />
    <div class="caption-text opacity-60">Value: <code>{{ text }}</code></div>
</div>

```vue
<NInputText v-model="text" label="Username" />
```

## Input Types

`NInputText` supports all standard HTML input types like `password`, `number`, `email`, etc.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText v-model="password" :type="showPass ? 'text' : 'password'" label="Password" icon="mdi-lock">
        <template #append>
            <NIcon 
                :name="showPass ? 'mdi-eye-off' : 'mdi-eye'" 
                class="cursor-pointer hover:text-brand"
                @click="showPass = !showPass"
            />
        </template>
    </NInputText>
    <NInputText v-model="numberValue" type="number" label="Age" icon="mdi-numeric" />
</div>

```vue
<NInputText type="password" label="Password" icon="mdi-lock" />
<NInputText type="number" label="Age" />
```

## States & Validation

Use semantic color classes and the `message` prop to provide feedback.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText label="Success State" class="success" message="Username is available" icon="mdi-check" />
    <NInputText label="Error State" class="error" message="This field is required" icon="mdi-alert-circle" />
    <NInputText label="Disabled" disabled modelValue="Read-only content" />
    <NInputText label="Loading" loading modelValue="Fetching data..." />
</div>

```vue
<NInputText class="success" message="Success message" />
<NInputText class="error" message="Error message" />
```

## Debounce

The `debounce` prop delays updating the `v-model` until the user has stopped typing for the specified duration (in milliseconds).

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText v-model="debouncedValue" :debounce="500" label="Debounced Input (500ms)" placeholder="Type quickly..." />
    <div class="caption-text opacity-60">Model Value: <code>{{ debouncedValue }}</code></div>
</div>

```vue
<!-- v-model updates 500ms after last keystroke -->
<NInputText v-model="value" :debounce="500" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string \| number` | - | The input value. |
| `label` | `string` | - | Field label. |
| `type` | `string` | `'text'` | HTML input type (text, password, number, email, etc). |
| `placeholder` | `string` | - | Native placeholder text. |
| `message` | `string` | - | Helper or error message shown below the input. |
| `icon` | `string` | - | Leading icon name (inside the input). |
| `prependIcon` | `string` | - | Alias for `icon`. |
| `appendIcon` | `string` | - | Trailing icon name. |
| `debounce` | `number` | `0` | Debounce delay in milliseconds for `v-model` updates. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `readonly` | `boolean` | `false` | Makes the input read-only. |
| `loading` | `boolean` | `false` | Shows a loading spinner and disables interaction. |
| `loadingName` | `string` | `'loading'` | Icon name for the loading spinner. |
| `inputClass` | `string \| object` | - | CSS classes applied directly to the `input` element. |

## Slots

| Slot | Description |
| --- | --- |
| `label` | Custom label content. |
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
<NInputText inputClass="text-right font-mono" />
```

### Can I use this for multi-line text?
`NInputText` is designed for single-line inputs. For multi-line text, you should use a `textarea` element wrapped in an `NInputField`.

### Why does my number input return a string?
HTML number inputs often return values as strings in JavaScript. NUI preserves this native behavior. If you need a strict number, you may need to `parseFloat()` the result.
