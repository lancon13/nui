# Toggle

Toggles are used to switch between two states, often used for settings.

## Basic Usage

<script setup>
import { ref } from 'vue'
const enabled = ref(true)
</script>

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NToggle v-model="enabled" label="Enable notifications" inlineLabel />
    <div class="text-sm">Value: <code>{{ enabled }}</code></div>
</div>

```vue
<NToggle v-model="enabled" label="Enable notifications" inlineLabel />
```

## Colors

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NToggle class="brand" :modelValue="true" label="Brand" inlineLabel />
    <NToggle class="success" :modelValue="true" label="Success" inlineLabel />
    <NToggle class="error" :modelValue="true" label="Error" inlineLabel />
</div>

```vue
<NToggle class="brand" label="Brand Color" inlineLabel />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | - | Toggle label. |
| `inlineLabel` | `boolean` | `false` | Whether to show the label next to the toggle. |
| `checkedIcon` | `string` | `'mdi-check'` | Icon inside the thumb when checked. |
| `uncheckedIcon` | `string` | `'mdi-close'` | Icon inside the thumb when unchecked. |
| `indeterminateIcon` | `string` | `'mdi-minus'` | Icon inside the thumb when state is null. |
| `disabled` | `boolean` | `false` | Whether the toggle is disabled. |
| `message` | `string` | - | Helper or error message. |
