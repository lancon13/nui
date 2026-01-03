# Card

Cards are versatile containers for grouping content.

## Basic Usage

<div class="my-4 vp-raw">
    <NCard class="w-96">
        <div class="n-card-header">
            <h3 class="text-lg font-bold">Card Title</h3>
        </div>
        <div class="n-card-body">
            <p>This is the card body content.</p>
        </div>
        <div class="n-card-footer">
            <NButton label="Action" size="sm" class="brand" />
        </div>
    </NCard>
</div>

```vue
<NCard>
  <div class="n-card-header">Header</div>
  <div class="n-card-body">Body</div>
  <div class="n-card-footer">Footer</div>
</NCard>
```

## Clickable

Cards can be interactive.

<div class="my-4 vp-raw">
    <NCard class="w-96" href="#" hoverable>
        <div class="n-card-body">
            <p class="font-bold">Clickable Card</p>
            <p class="text-sm">Acts as a link or button.</p>
        </div>
    </NCard>
</div>

```vue
<NCard to="/details" hoverable>...</NCard>
```

## Loading State

<div class="my-4 vp-raw">
    <NCard class="w-96 h-32" loading>
        <div class="n-card-body">Content hidden while loading</div>
    </NCard>
</div>

```vue
<NCard loading>...</NCard>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | `string` | `'div'` | HTML tag to use. |
| `to` | `string \| object` | - | Vue Router link. |
| `href` | `string` | - | External link. |
| `disabled` | `boolean` | `false` | Disable interaction. |
| `loading` | `boolean` | `false` | Show loading overlay. |
| `loadingName` | `string` | - | Loading icon name. |
| `loadingClass` | `string` | - | Loading icon class. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Card content. |
| `loading` | Custom loading overlay. |
