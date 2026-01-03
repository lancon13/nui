# Icon

A simple wrapper for Material Design Icons.

## Basic Usage

<div class="flex flex-row items-center gap-6 my-4 text-3xl vp-raw">
    <NIcon name="mdi-account" />
    <NIcon name="mdi-heart" class="text-error" />
    <NIcon name="mdi-star" class="text-warning" />
    <NIcon name="mdi-check-circle" class="text-success" />
</div>

```vue
<NIcon name="mdi-account" />
<NIcon name="mdi-heart" class="text-error" />
```

## Sizes

Icons inherit the font size of their parent.

<div class="flex flex-row items-end gap-4 my-4 vp-raw">
    <NIcon name="mdi-magnify" class="text-sm" />
    <NIcon name="mdi-magnify" class="text-base" />
    <NIcon name="mdi-magnify" class="text-xl" />
    <NIcon name="mdi-magnify" class="text-2xl" />
    <NIcon name="mdi-magnify" class="text-[3rem]" />
</div>

```vue
<NIcon name="mdi-magnify" class="text-xl" />
```

## Clickable

Icons can be interactive links or buttons.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NIcon name="mdi-open-in-new" href="#" target="_blank" class="text-brand hover:opacity-80" />
    <NIcon name="mdi-bell" class="text-brand cursor-pointer" aria-label="Notifications" />
</div>

```vue
<NIcon name="mdi-open-in-new" href="https://google.com" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | - | Icon name. Prefixes `mdi-` automatically if missing. |
| `tag` | `string` | `'i'` | HTML tag to use. |
| `disabled` | `boolean` | `false` | Whether the icon is disabled. |
| `to` | `string \| object` | - | Vue Router link. |
| `href` | `string` | - | External link. |
| `target` | `string` | - | Link target. |

## Events

| Event | Description |
| --- | --- |
| `click` | Emitted when clicked (if not disabled and clickable). |

