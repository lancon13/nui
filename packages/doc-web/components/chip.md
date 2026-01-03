# Chip

Chips are compact elements that represent an input, attribute, or action.

## Basic Usage

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip>Default</NChip>
    <NChip class="brand">Brand</NChip>
    <NChip class="success">Success</NChip>
    <NChip class="error">Error</NChip>
</div>

```vue
<NChip>Default</NChip>
<NChip class="brand">Brand</NChip>
```

## Variants

### Flat
<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip class="flat">Default</NChip>
    <NChip class="flat brand">Brand</NChip>
    <NChip class="flat success">Success</NChip>
</div>

```vue
<NChip class="flat brand">Brand</NChip>
```

### Outlined
<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip class="outlined">Default</NChip>
    <NChip class="outlined brand">Brand</NChip>
    <NChip class="outlined success">Success</NChip>
</div>

```vue
<NChip class="outlined brand">Brand</NChip>
```

## Icons

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip icon="mdi-account" class="brand">User</NChip>
    <NChip prependIcon="mdi-star" class="warning">Star</NChip>
    <NChip appendIcon="mdi-chevron-down" class="outlined">Dropdown</NChip>
</div>

```vue
<NChip icon="mdi-account">User</NChip>
```

## Removable

<script setup>
import { ref } from 'vue'
const chips = ref(['Vue', 'React', 'Angular'])
const remove = (index) => chips.value.splice(index, 1)
</script>

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NChip v-for="(chip, i) in chips" :key="chip" class="brand flat" removable @remove="remove(i)">
        {{ chip }}
    </NChip>
    <NButton v-if="chips.length === 0" label="Reset" size="xs" @click="chips = ['Vue', 'React', 'Angular']" />
</div>

```vue
<NChip removable @remove="handleRemove">Removable Chip</NChip>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | - | The text to display. |
| `icon` | `string` | - | Icon name (displayed before label). |
| `prependIcon` | `string` | - | Icon to show before label/icon. |
| `appendIcon` | `string` | - | Icon to show after label. |
| `removable` | `boolean` | `false` | Whether to show a close icon. |
| `removableClass` | `string` | - | Class for the close icon. |
| `clickable` | `boolean` | `false` | Apply pointer cursor. |
| `tag` | `string` | `'span'` | HTML tag to use. |
| `disabled` | `boolean` | `false` | Whether the chip is disabled. |
| `to` | `string \| object` | - | Vue Router link. |
| `href` | `string` | - | External link. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Chip label content. |
| `prepend` | Content before label. |
| `append` | Content after label. |
| `removable` | Custom close button content. |

## Events

| Event | Description |
| --- | --- |
| `click` | Emitted when clicked. |
| `remove` | Emitted when the remove icon is clicked. |

