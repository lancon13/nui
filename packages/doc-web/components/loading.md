# Loading

Loading indicators and spinners.

## Basic Usage

<div class="flex items-center gap-4 my-4 vp-raw">
    <NLoading class="text-2xl animate-spin" />
    <NLoading name="mdi-sync" class="text-2xl animate-spin text-brand" />
    <NLoading name="mdi-dots-horizontal" class="text-2xl animate-pulse text-success" />
</div>

```vue
<NLoading class="animate-spin" />
<NLoading name="mdi-sync" class="text-brand animate-spin" />
```

## Overlay

Can be used as an overlay on top of other content.

<div class="relative w-32 h-32 border border-border bg-surface my-4 vp-raw">
    <div class="p-4">Content</div>
    <NLoading overlay class="text-3xl animate-spin" />
</div>

```vue
<div class="relative">
  <NLoading overlay />
</div>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | `'loading'` | Icon name. |
| `overlay` | `boolean` | `false` | Position absolute covering parent. |
| `class` | `string` | `'animate-spin'` | CSS classes for animation/color. |
