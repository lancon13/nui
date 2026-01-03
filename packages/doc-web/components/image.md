# Image

Display images with lazy loading, placeholders, and error handling.

<script setup>
import { ref } from 'vue'
</script>

## Basic Usage

<div class="my-4 vp-raw">
    <NImage src="https://picsum.photos/400/300" />
</div>

```vue
<NImage src="https://picsum.photos/400/300" />
```

## Aspect Ratio

<div class="grid grid-cols-3 gap-4 my-4 vp-raw">
    <NImage src="https://picsum.photos/400/400?r=1" aspect-ratio="1/1" />
    <NImage src="https://picsum.photos/600/400?r=2" aspect-ratio="16/9" />
    <NImage src="https://picsum.photos/300/400?r=3" aspect-ratio="3/4" />
</div>

```vue
<NImage src="..." aspect-ratio="16/9" />
```

## Fit Modes

<div class="flex flex-wrap gap-4 my-4 vp-raw">
    <div class="w-32 h-32 border border-border bg-surface-indent">
        <NImage src="https://picsum.photos/600/400" fit="cover" width="100%" height="100%" />
    </div>
    <div class="w-32 h-32 border border-border bg-surface-indent">
        <NImage src="https://picsum.photos/600/400" fit="contain" width="100%" height="100%" />
    </div>
</div>

```vue
<NImage src="..." fit="cover" width="100%" height="100%" />
```

## Lazy Loading

Images can be lazy-loaded when they enter the viewport.

```vue
<NImage src="..." lazy />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | - | Image source URL. |
| `alt` | `string` | `''` | Alt text. |
| `lazy` | `boolean` | `false` | Enable lazy loading. |
| `aspectRatio` | `string` | - | CSS aspect-ratio (e.g. `16/9`). |
| `fit` | `string` | `'cover'` | Object fit mode. |
| `width` | `string \| number` | - | Image width. |
| `height` | `string \| number` | - | Image height. |
| `loading` | `boolean` | `false` | Force loading state. |
| `threshold` | `number` | `0.1` | Intersection observer threshold. |

## Slots

| Slot | Description |
| --- | --- |
| `placeholder` | Content shown while loading. |
| `error` | Content shown if load fails. |

## Events

| Event | Description |
| --- | --- |
| `load` | Emitted when image loads. |
| `error` | Emitted when image fails to load. |
