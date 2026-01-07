# Input Field

A versatile wrapper component for form inputs that handles labels, icons, validation states, loading indicators, and complex slot layouts. It serves as the foundation for other input components like `NInputText` but can be used directly for custom implementations.

<script setup>
import { ref } from 'vue'
const text = ref('')
const loading = ref(true)
</script>

## Basic Usage

`NInputField` wraps a native input element (or any other content) and provides standard styling and features.

<div class="w-96 my-4 vp-raw">
    <NInputField v-model="text" label="Username">
        <input class="w-full bg-transparent outline-none px-2" v-model="text" placeholder="Enter username" />
    </NInputField>
</div>

```vue
<script setup>
    import { ref } from 'vue'
    const text = ref('')
</script>

<template>
    <NInputField label="Username">
        <input v-model="text" class="w-full bg-transparent outline-none px-2" placeholder="Enter username" />
    </NInputField>
</template>
```

## Colors & States

Apply semantic color classes to the component to indicate validation states. Use the `helperText` prop for additional context.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputField label="Default" placeholder="Default state" />
    <NInputField class="brand" label="Brand" placeholder="Brand state" />
    <NInputField class="success" label="Success" placeholder="Success state" helperText="Saved successfully" icon="mdi-check" />
    <NInputField class="error" label="Error" placeholder="Error state" helperText="Field is required" icon="mdi-alert-circle" />
</div>

```vue
<NInputField class="success" label="Success" helperText="Saved!" icon="mdi-check" />
<NInputField class="error" label="Error" helperText="Required field" icon="mdi-alert-circle" />
```

## Sizes & Shapes

Available sizes: `small`, `medium`, `large`. Use the `pilled` class for rounded edges.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputField size="small" label="Small">
        <input class="w-full bg-transparent outline-none px-2" placeholder="Small size" />
    </NInputField>
    <NInputField size="large" label="Large">
        <input class="w-full bg-transparent outline-none px-2" placeholder="Large size" />
    </NInputField>
    <NInputField class="pilled" label="Pilled">
        <input class="w-full bg-transparent outline-none px-2" placeholder="Rounded shape" />
    </NInputField>
</div>

```vue
<NInputField size="small" label="Small" />
<NInputField size="large" label="Large" />
<NInputField class="pilled" label="Pilled" />
```

## Icons

You can add icons to the left or right of the input content using `icon` (alias for prepend), `prependIcon`, and `appendIcon`.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputField icon="mdi-magnify" placeholder="Search..." />
    <NInputField prepend-icon="mdi-account" placeholder="User" />
    <NInputField append-icon="mdi-eye" placeholder="Password" />
</div>

```vue
<NInputField icon="mdi-magnify" placeholder="Search..." />
<NInputField append-icon="mdi-eye" placeholder="Password" />
```

## Input Types

You can specify the native input type using the `type` prop (e.g., `password`, `email`, `number`).

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputField type="password" label="Password" placeholder="Enter password" append-icon="mdi-eye" />
    <NInputField type="number" label="Number" placeholder="Enter amount" />
    <NInputField type="date" label="Date" />
    <NInputField type="email" label="Email" placeholder="user@example.com" />
</div>

```vue
<NInputField type="password" label="Password" />
<NInputField type="number" label="Number" />
<NInputField type="date" label="Date" />
<NInputField type="email" label="Email" />
```

## Loading State

The `loading` prop displays a spinner over the input area, blocking interaction. You can customize the spinner icon and class.

<div class="w-96 my-4 flex flex-col gap-4 vp-raw">
    <NInputField v-model="text" :loading="loading" loading-name="mdi-sync" loading-class="animate-spin" label="Data Field" class="brand" />
    <NButton size="xs" @click="loading = !loading" :label="loading ? 'Stop Loading' : 'Start Loading'" class="justify-center" />
</div>

```vue
<NInputField :loading="true" loading-name="mdi-sync" loading-class="animate-spin" />
```

## Disabled State

Disabled inputs have reduced opacity and block user interaction.

<div class="w-96 my-4 vp-raw">
    <NInputField disabled label="Disabled Field" placeholder="You cannot edit this" />
</div>

```vue
<NInputField disabled label="Disabled" />
```

## Custom Content & Slots

`NInputField` exposes numerous slots for advanced layouts.

<div class="w-96 my-4 flex flex-col gap-8 vp-raw">
    <NInputField label="Overlay Slot">
        <template #overlay>
            <div class="absolute inset-0 bg-brand/10 flex items-center justify-center text-brand font-bold">
                Overlay Content
            </div>
        </template>
    </NInputField>
    <NInputField label="Dropdown Slot">
        <template #dropdown>
            <div class="mt-1 p-2 border border-border rounded shadow-lg bg-surface text-sm">
                Dropdown content goes here.
            </div>
        </template>
    </NInputField>
</div>

```vue
<NInputField label="Custom Layout">
  <template #before>Prefix</template>
  <template #prepend>Icon</template>
  <template #default><input /></template>
  <template #append>Action</template>
  <template #dropdown>Menu</template>
</NInputField>
```

## Props

| Prop               | Type                        | Default     | Description                                                |
| ------------------ | --------------------------- | ----------- | ---------------------------------------------------------- |
| `label`            | `string`                    | -           | Field label text.                                          |
| `name`             | `string`                    | -           | Native input name attribute.                               |
| `type`             | `string`                    | `'text'`    | Native input type attribute (e.g. text, password, number). |
| `disabled`         | `boolean`                   | `false`     | Visual disabled state.                                     |
| `readonly`         | `boolean`                   | `false`     | Read-only state.                                           |
| `helperText`       | `string`                    | -           | Helper or error message shown below the input.             |
| `message`          | `string`                    | -           | Alias for `helperText`.                                    |
| `size`             | `string`                    | `'medium'`  | `small`, `medium`, `large`.                                |
| `icon`             | `string`                    | -           | Leading icon name (inside wrapper).                        |
| `iconClass`        | `string \| object \| Array` | -           | CSS class for the leading icon.                            |
| `prependIcon`      | `string`                    | -           | Alias for `icon`.                                          |
| `prependIconClass` | `string \| object \| Array` | -           | CSS class for the prepended icon.                          |
| `appendIcon`       | `string`                    | -           | Trailing icon name.                                        |
| `appendIconClass`  | `string \| object \| Array` | -           | CSS class for the appended icon.                           |
| `loading`          | `boolean`                   | `false`     | Shows loading overlay.                                     |
| `loadingName`      | `string`                    | `'loading'` | Icon name for the loading spinner.                         |
| `loadingClass`     | `string \| object \| Array` | -           | CSS class for the loading spinner.                         |
| `format`           | `(val: any) => string`      | -           | Function to format the display value.                      |
| `parse`            | `(val: string) => string`   | -           | Function to parse the input value before update.           |
| `tag`              | `string`                    | `'div'`     | HTML tag for the wrapper.                                  |

## Slots

| Slot       | Description                                                |
| ---------- | ---------------------------------------------------------- |
| `default`  | The main input element.                                    |
| `label`    | Custom label content.                                      |
| `helper`   | Custom helper text content.                                |
| `before`   | Content before the input wrapper (outside).                |
| `after`    | Content after the input wrapper (outside).                 |
| `top`      | Content between label and input wrapper.                   |
| `bottom`   | Content below the input wrapper (above message).           |
| `prepend`  | Content inside wrapper, before the input.                  |
| `append`   | Content inside wrapper, after the input.                   |
| `overlay`  | Absolute overlay on top of the input area.                 |
| `dropdown` | Content rendered below the input (e.g., for autocomplete). |
| `loading`  | Custom loading indicator content.                          |

## Recipes & FAQ

### How do I use a textarea?

Since `NInputField` slots the input element, you can simply put a `<textarea>` in the default slot.

```vue
<NInputField label="Comments">
  <textarea class="w-full bg-transparent resize-y min-h-[100px] outline-none" />
</NInputField>
```

### Can I format the displayed value?

Yes, use the `format` prop to transform the value for display (e.g., uppercase) without changing the underlying model value immediately, or use it in conjunction with `parse` for two-way transformations.

### How do I add a button inside the input?

Use the `append` slot to place an `NButton` inside the input border.

```vue
<NInputField>
  <template #append>
    <NButton icon="mdi-magnify" class="icon texted" />
  </template>
</NInputField>
```
