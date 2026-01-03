# Avatar

Avatars are used to represent people or objects.

## Basic Usage

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NAvatar src="https://i.pravatar.cc/150?u=1" />
    <NAvatar icon="mdi-account" class="primary" />
    <NAvatar label="JD" class="success" />
</div>

```vue
<NAvatar src="https://i.pravatar.cc/150?u=1" />
<NAvatar icon="mdi-account" class="primary" />
<NAvatar label="JD" class="success" />
```

## Shapes

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NAvatar src="https://i.pravatar.cc/150?u=2" class="pilled" />
    <NAvatar src="https://i.pravatar.cc/150?u=3" class="squared" />
    <NAvatar src="https://i.pravatar.cc/150?u=4" class="shadowed" />
</div>

```vue
<NAvatar class="pilled" src="..." />
<NAvatar class="squared" src="..." />
```

## Sizes

Avatars inherit font size, allowing for easy scaling using Tailwind text utility classes.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NAvatar icon="mdi-account" class="text-xs" />
    <NAvatar icon="mdi-account" class="text-sm" />
    <NAvatar icon="mdi-account" class="text-base" />
    <NAvatar icon="mdi-account" class="text-lg" />
    <NAvatar icon="mdi-account" class="text-xl" />
    <NAvatar icon="mdi-account" class="text-2xl" />
</div>

```vue
<NAvatar class="text-xl" icon="mdi-account" />
```

## Clickable

Avatars can be interactive when `to`, `href`, or `@click` is used.

<script setup>
const handleClick = () => alert('Avatar clicked!')
</script>

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NAvatar icon="mdi-cursor-default-click" class="brand" @click="handleClick" />
    <NAvatar src="https://i.pravatar.cc/150?u=5" href="#" target="_blank" />
</div>

```vue
<NAvatar @click="handleClick" />
<NAvatar href="https://example.com" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | - | Image source URL. |
| `alt` | `string` | - | Alt text for the image. |
| `icon` | `string` | - | Icon name to display if no image. |
| `label` | `string` | - | Text to display if no image/icon. |
| `tag` | `string` | `'span'` | HTML tag to use. |
| `disabled` | `boolean` | `false` | Whether the avatar is disabled. |
| `to` | `string \| object` | - | Vue Router link. |
| `href` | `string` | - | External link. |
| `target` | `string` | - | Link target. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Custom content to display inside the avatar (overrides label). |

## Events

| Event | Description |
| --- | --- |
| `click` | Emitted when clicked (if not disabled). |

