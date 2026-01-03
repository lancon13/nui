# Chip

Chips are compact elements that represent an input, attribute, or action. They are commonly used for tags, categories, or filtering.

## Basic Usage

Chips support built-in color variants matching the system's semantic colors.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip>Default</NChip>
    <NChip class="brand">Brand</NChip>
    <NChip class="success">Success</NChip>
    <NChip class="error">Error</NChip>
    <NChip class="warning">Warning</NChip>
    <NChip class="info">Info</NChip>
</div>

```vue
<NChip>Default</NChip>
<NChip class="brand">Brand</NChip>
<NChip class="success">Success</NChip>
<NChip class="error">Error</NChip>
<NChip class="warning">Warning</NChip>
<NChip class="info">Info</NChip>
```

## Variants

### Flat

Flat chips use a subtle background color.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip class="flat">Default</NChip>
    <NChip class="flat brand">Brand</NChip>
    <NChip class="flat success">Success</NChip>
    <NChip class="flat error">Error</NChip>
    <NChip class="flat warning">Warning</NChip>
    <NChip class="flat info">Info</NChip>
</div>

```vue
<NChip class="flat" label="Default" />
<NChip class="flat brand" label="Brand" />
```

### Outlined

Outlined chips have a transparent background and a colored border.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip class="outlined">Default</NChip>
    <NChip class="outlined brand">Brand</NChip>
    <NChip class="outlined success">Success</NChip>
    <NChip class="outlined error">Error</NChip>
    <NChip class="outlined warning">Warning</NChip>
    <NChip class="outlined info">Info</NChip>
</div>

```vue
<NChip class="outlined" label="Default" />
<NChip class="outlined brand" label="Brand" />
```

### Texted

Texted chips have no background or border.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip class="texted">Default</NChip>
    <NChip class="texted brand">Brand</NChip>
    <NChip class="texted success">Success</NChip>
    <NChip class="texted error">Error</NChip>
    <NChip class="texted warning">Warning</NChip>
    <NChip class="texted info">Info</NChip>
</div>

```vue
<NChip class="texted" label="Default" />
<NChip class="texted brand" label="Brand" />
```

## Icons

Chips can include icons at the start or end.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip prependIcon="mdi-account" class="flat">User</NChip>
    <NChip appendIcon="mdi-check" class="brand">Approved</NChip>
    <NChip icon="mdi-heart" class="error">Favorite</NChip>
</div>

```vue
<NChip prependIcon="mdi-account">User</NChip>
<NChip appendIcon="mdi-check">Approved</NChip>
<NChip icon="mdi-heart">Favorite</NChip>
```

## Shapes & Sizes

### Shapes

Use utility classes to modify the border radius or add shadows.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip class="pilled">Pilled</NChip>
    <NChip class="squared">Squared</NChip>
    <NChip class="shadowed">Shadowed</NChip>
</div>

```vue
<NChip class="pilled">Pilled</NChip>
<NChip class="squared">Squared</NChip>
<NChip class="shadowed">Shadowed</NChip>
```

### Sizes

Chips scale with the font size.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip class="text-xs">Extra Small</NChip>
    <NChip class="text-base">Normal</NChip>
    <NChip class="text-lg">Large</NChip>
</div>

```vue
<NChip class="text-xs">XS Chip</NChip>
```

## Removable

Removable chips include a close icon that emits a `remove` event.

<script setup>
import { ref } from 'vue'
const visible = ref(true)
const tags = ref(['Vue', 'Tailwind', 'Vite'])
const removeTag = (index) => tags.value.splice(index, 1)
</script>

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip v-for="(tag, i) in tags" :key="tag" class="brand flat" removable @remove="removeTag(i)">
        {{ tag }}
    </NChip>
    <NButton v-if="tags.length === 0" label="Reset Tags" size="xs" @click="tags = ['Vue', 'Tailwind', 'Vite']" />
</div>

```vue
<NChip removable @remove="handleRemove">Removable Tag</NChip>
```

## Interactivity

Chips can act as buttons or navigation links.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip href="#" class="brand" @click.prevent>Click Me</NChip>
    <NChip to="/guide/getting-started" class="outlined brand">Link Chip</NChip>
    <NChip disabled class="flat">Disabled</NChip>
</div>

```vue
<!-- Emits click event -->
<NChip @click="onAction">Action</NChip>

<!-- Navigation -->
<NChip href="https://example.com">External</NChip>
<NChip to="/dashboard">Internal</NChip>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | - | The text content. |
| `icon` | `string` | - | Leading icon name (alias for `prependIcon`). |
| `prependIcon` | `string` | - | Icon name to show before text. |
| `appendIcon` | `string` | - | Icon name to show after text. |
| `removable` | `boolean` | `false` | Shows a close icon. |
| `removableClass` | `string \| object \| Array` | - | CSS class for the close icon. |
| `tag` | `string` | `'span'` | HTML tag to render. |
| `disabled` | `boolean` | `false` | Disables interaction and applies gray styles. |
| `to` | `string \| object` | - | Vue Router link destination. |
| `href` | `string` | - | Native anchor link destination. |
| `target` | `string` | - | Link target (e.g., `_blank`). |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Main content (overrides `label`). |
| `prepend` | Content before the label/icon. |
| `append` | Content after the label. |
| `removable` | Custom close button content. |

## Events

| Event | Description |
| --- | --- |
| `click` | Emitted when the chip is clicked (if interactive and not disabled). |
| `remove` | Emitted when the close icon is clicked. |

## Recipes & FAQ

### How do I use chips for a multi-select list?
You can render a list of chips and toggle their active state based on a selected array.

```vue
<template>
  <div class="flex gap-2">
    <NChip 
      v-for="opt in options" 
      :key="opt"
      :class="selected.includes(opt) ? 'brand' : 'flat'"
      @click="toggle(opt)"
    >
      {{ opt }}
    </NChip>
  </div>
</template>
```

### Can I change the color of the close icon?
Yes, use the `removable-class` prop to apply colors or other styles to the removal icon.
```vue
<NChip removable removable-class="text-error" label="Delete Me" />
```

### Why isn't my chip clickable?
A chip becomes "clickable" automatically if you provide an `@click` listener, `href`, or `to` prop. If you need it to look clickable without those, you can add the `.n-chip--clickable` class manually, though it's recommended to use the built-in props.