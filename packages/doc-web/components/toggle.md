# Toggle

Toggles (switches) are used to quickly switch between two binary states, commonly used for settings.

<script setup>
import { ref } from 'vue'
const isEnabled = ref(true)
</script>

## Basic Usage

A simple toggle switch with a label.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NToggle v-model="isEnabled" label="Enable Notifications" inlineLabel />
    <div class="caption-text opacity-60">Status: <code>{{ isEnabled }}</code></div>
</div>

```vue
<NToggle v-model="isEnabled" label="Auto-save" inlineLabel />
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

## Icons in Thumb

Toggles can display icons inside the moving thumb to clearly indicate the state.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NToggle :modelValue="true" label="With Icons" inlineLabel />
    <NToggle :modelValue="false" label="Custom Icons" checkedIcon="mdi-check" uncheckedIcon="mdi-close" inlineLabel />
</div>

```vue
<NToggle 
  checkedIcon="mdi-check" 
  uncheckedIcon="mdi-close" 
  inlineLabel 
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean` | `null` | The toggle state. |
| `label` | `string` | - | The label text. |
| `inlineLabel` | `boolean` | `false` | Whether to show the label next to the toggle. |
| `checkedIcon` | `string` | `'mdi-check'` | Icon inside the thumb when ON. |
| `uncheckedIcon` | `string` | `'mdi-close'` | Icon inside the thumb when OFF. |
| `indeterminateIcon` | `string` | `'mdi-minus'` | Icon inside the thumb when `null`. |
| `message` | `string` | - | Helper or error message shown below. |
| `disabled` | `boolean` | `false` | Disables the toggle. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Content displayed next to the toggle. |
| `label` | Custom label content (if `inlineLabel` is false). |
| `inlineLabel` | Custom inline label content. |
| `message` | Custom message content. |

## Recipes & FAQ

### Checkbox vs. Toggle?
Use a **Checkbox** when the user is part of a form that requires a "Submit" button to apply changes. Use a **Toggle** for immediate effects (like switching to Dark Mode or enabling a feature in real-time).

### Can I change the size?
The toggle uses a fixed scale optimized for mobile touch targets and standard web form layouts. You can scale it using CSS `transform: scale()` if you need a larger version.