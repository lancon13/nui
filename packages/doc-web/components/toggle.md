# Toggle

Toggles (switches) are used to quickly switch between two binary states, commonly used for settings.

<script setup>
import { ref } from 'vue'
const isEnabled = ref(true)
const inlineValue = ref(true)
</script>

## Basic Usage

A simple toggle switch with a label.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NToggle v-model="isEnabled" label="Enable Notifications" />
    <div class="caption-text opacity-60">Status: <code>{{ isEnabled }}</code></div>
</div>

```vue
<NToggle v-model="isEnabled" label="Auto-save" />
```

## Inline Label

Display the label next to the toggle instead of above it.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NToggle v-model="inlineValue" label="Inline Toggle" inlineLabel />
</div>

```vue
<NToggle v-model="value" label="Inline Label" inlineLabel />
```

## Colors

Apply semantic color classes to change the track color when the toggle is active.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NToggle class="brand" :modelValue="true" label="Brand" inlineLabel />
    <NToggle class="success" :modelValue="true" label="Success" inlineLabel />
    <NToggle class="error" :modelValue="true" label="Error" inlineLabel />
    <NToggle class="warning" :modelValue="true" label="Warning" inlineLabel />
    <NToggle class="info" :modelValue="true" label="Info" inlineLabel />
</div>

```vue
<NToggle class="success" label="Online" inlineLabel />
```

## Sizes

Available sizes: `small`, `medium` (default), `large`.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NToggle size="small" label="Small" :modelValue="true" inlineLabel />
    <NToggle size="medium" label="Medium" :modelValue="true" inlineLabel />
    <NToggle size="large" label="Large" :modelValue="true" inlineLabel />
</div>

```vue
<NToggle size="small" label="Small" />
<NToggle size="large" label="Large" />
```

## Icons in Thumb

Toggles can display icons inside the moving thumb to clearly indicate the state.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NToggle :modelValue="true" label="With Icons" inlineLabel />
    <NToggle 
        :modelValue="false" 
        label="Custom Icons" 
        checkedIcon="mdi-check" 
        uncheckedIcon="mdi-close" 
        inlineLabel 
    />
</div>

```vue
<NToggle 
  checkedIcon="mdi-check" 
  uncheckedIcon="mdi-close" 
  inlineLabel 
/>
```

## States

Toggles support `true`, `false`, and `null` (indeterminate).

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NToggle :modelValue="true" label="On" inlineLabel />
    <NToggle :modelValue="false" label="Off" inlineLabel />
    <NToggle :modelValue="null" label="Indeterminate" inlineLabel />
    <NToggle :modelValue="true" label="Disabled" disabled inlineLabel />
</div>

```vue
<NToggle v-model="val" disabled />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean \| null` | `null` | The toggle state. |
| `label` | `string` | - | The label text. |
| `name` | `string` | - | Native input name attribute. |
| `inlineLabel` | `boolean` | `false` | Whether to show the label next to the toggle. |
| `checkedIcon` | `string` | `'mdi-check'` | Icon inside the thumb when ON. |
| `uncheckedIcon` | `string` | `'mdi-close'` | Icon inside the thumb when OFF. |
| `indeterminateIcon` | `string` | `'mdi-minus'` | Icon inside the thumb when `null`. |
| `size` | `string` | `'medium'` | `small`, `medium`, `large`. |
| `helperText` | `string` | - | Helper text displayed below the toggle (alias for `message`). |
| `message` | `string` | - | Helper or error message shown below. |
| `disabled` | `boolean` | `false` | Disables the toggle. |
| `inputClass` | `string \| object` | - | CSS classes for the native input. |
| `tag` | `string` | `'label'` | Root HTML tag. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Content displayed next to the toggle (replaces/augments label). |
| `label` | Custom label content (if `inlineLabel` is false). |
| `inlineLabel` | Custom inline label content. |
| `message` | Custom message content. |
| `top` | Content above the toggle. |
| `bottom` | Content below the toggle. |
| `prepend` | Content before the toggle track. |
| `append` | Content after the toggle track. |

## Recipes & FAQ

### Checkbox vs. Toggle?
Use a **Checkbox** when the user is part of a form that requires a "Submit" button to apply changes. Use a **Toggle** for immediate effects (like switching to Dark Mode or enabling a feature in real-time).

### Can I change the size?
Yes, use the `size` prop to switch between `small`, `medium` (default), and `large`. You can also override the Tailwind classes in your theme if you need specific pixel values.
