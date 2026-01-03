# Input Text

Standard text input fields for user interaction.

<script setup>
import { ref } from 'vue'
const text = ref('Hello')
const password = ref('secret')
const email = ref('user@example.com')
const debouncedValue = ref('')
const showPass = ref(false)
</script>

## Basic Usage

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText v-model="text" label="Username" placeholder="Enter your username" />
    <div class="text-sm">Value: <code>{{ text }}</code></div>
</div>

```vue
<NInputText v-model="text" label="Username" />
```

## Input Types

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText v-model="email" type="email" label="Email" icon="mdi-email" />
    <NInputText v-model="password" :type="showPass ? 'text' : 'password'" label="Password" icon="mdi-lock">
        <template #append>
            <NIcon 
                :name="showPass ? 'mdi-eye-off' : 'mdi-eye'" 
                class="cursor-pointer hover:text-brand"
                @click="showPass = !showPass"
            />
        </template>
    </NInputText>
</div>

```vue
<NInputText type="password" label="Password" icon="mdi-lock" />
```

## States & Validation

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText label="Success" class="success" message="Username is available" icon="mdi-check" />
    <NInputText label="Error" class="error" message="This field is required" icon="mdi-alert-circle" />
    <NInputText label="Disabled" disabled modelValue="I am disabled" />
    <NInputText label="Loading" loading loadingName="mdi-sync" loadingClass="animate-spin" modelValue="Fetching..." />
</div>

```vue
<NInputText class="error" message="Error message" />
```

## Debounce

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputText v-model="debouncedValue" :debounce="500" label="Debounced (500ms)" placeholder="Type fast..." />
    <div class="text-sm">Model Value: <code>{{ debouncedValue }}</code></div>
</div>

```vue
<NInputText v-model="value" :debounce="500" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string \| number` | - | Input value. |
| `label` | `string` | - | Input label. |
| `type` | `string` | `'text'` | Native input type (text, password, etc). |
| `message` | `string` | - | Helper or error message. |
| `icon` | `string` | - | Icon name (inside input). |
| `prependIcon` | `string` | - | Icon at the start (outside input). |
| `appendIcon` | `string` | - | Icon at the end (outside input). |
| `debounce` | `number` | `0` | Debounce time in ms for v-model updates. |
| `disabled` | `boolean` | `false` | Whether input is disabled. |
| `readonly` | `boolean` | `false` | Whether input is readonly. |
| `loading` | `boolean` | `false` | Shows a loading indicator. |
| `loadingName` | `string` | - | Loading icon name. |
| `loadingClass` | `string` | - | Loading icon class. |
| `inputClass` | `string \| object` | - | Classes applied directly to the `input` element. |

## Slots

| Slot | Description |
| --- | --- |
| `prepend` | Content before the input wrapper. |
| `append` | Content after the input wrapper. |
| `top` | Content above the input (below label). |
| `bottom` | Content below the input. |
| `label` | Custom label content. |

## Events

| Event | Description |
| --- | --- |
| `update:modelValue` | Emitted when input value changes (respects debounce). |
| `input` | Native input event (emitted immediately). |
| `change` | Native change event (emitted on blur). |