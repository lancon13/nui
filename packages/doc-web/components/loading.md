# Loading

Loading indicators and spinners are used to inform users that an action is being processed or data is being fetched.

## Basic Usage

The default loading component uses a standard spinner animation.

<div class="flex items-center gap-4 my-4 vp-raw">
    <NLoading class="text-2xl animate-spin" />
    <NLoading name="mdi-sync" class="text-2xl animate-spin text-brand" />
    <NLoading name="mdi-cog" class="text-2xl animate-spin text-muted" />
</div>

```vue
<NLoading class="animate-spin" />
<NLoading name="mdi-sync" class="text-brand animate-spin" />
```

## Sizes

Since `NLoading` is based on icons, it scales with font size. Use standard Tailwind text size utilities.

<div class="flex items-end gap-4 my-4 vp-raw">
    <NLoading class="text-xs animate-spin" />
    <NLoading class="text-base animate-spin" />
    <NLoading class="text-xl animate-spin" />
    <NLoading class="text-3xl animate-spin" />
    <NLoading class="text-5xl animate-spin" />
</div>

```vue
<NLoading class="text-xs animate-spin" />
<NLoading class="text-5xl animate-spin" />
```

## Colors

Apply any text color class to change the color of the spinner.

<div class="flex items-center gap-4 my-4 vp-raw">
    <NLoading class="text-3xl animate-spin text-brand" />
    <NLoading class="text-3xl animate-spin text-success" />
    <NLoading class="text-3xl animate-spin text-error" />
    <NLoading class="text-3xl animate-spin text-warning" />
    <NLoading class="text-3xl animate-spin text-info" />
</div>

```vue
<NLoading class="text-brand animate-spin" />
<NLoading class="text-error animate-spin" />
```

## Custom Icons & Animations

You can use any Material Design Icon and combine it with different animations.

<div class="flex items-center gap-4 my-4 vp-raw">
    <NLoading name="mdi-loading" class="text-3xl animate-spin" />
    <NLoading name="mdi-dots-horizontal" class="text-3xl animate-pulse text-brand" />
    <NLoading name="mdi-circle-outline" class="text-3xl animate-ping text-success" />
</div>

```vue
<NLoading name="mdi-dots-horizontal" class="animate-pulse" />
<NLoading name="mdi-circle-outline" class="animate-ping" />
```

## Overlay

The `overlay` prop creates a full-size translucent background that covers the parent container. The parent must have `position: relative` or `overflow: hidden`.

<div class="my-4 vp-raw">
    <NCard class="w-64 h-48 relative border border-border">
        <div class="n-card-body content-col gap-2">
            <div class="h-4 bg-surface-indent rounded w-full" />
            <div class="h-4 bg-surface-indent rounded w-2/3" />
            <div class="h-4 bg-surface-indent rounded w-full" />
            <div class="h-10 bg-brand/20 rounded w-full mt-auto" />
        </div>
        <NLoading overlay class="text-4xl animate-spin" />
    </NCard>
</div>

```vue
<div class="relative">
  <!-- Content -->
  <NLoading overlay class="text-4xl animate-spin" />
</div>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | `'loading'` | Icon name (MDI). |
| `overlay` | `boolean` | `false` | Whether to display as an absolute overlay covering the parent. |
| `class` | `string \| Array \| object` | `'animate-spin'` | CSS classes for animation, size, and color. |

## Recipes & FAQ

### How do I stop the animation?
Simply remove the `animate-spin` class (or whichever animation class you are using).

### Can I use this inside other components?
Yes! Most NUI components like `NButton`, `NCard`, and `NInputText` have a `loading` prop that uses `NLoading` internally. However, you can always manually place an `NLoading` component anywhere you need custom behavior.

### Why is the overlay not covering the whole container?
Ensure the container you want to cover has `position: relative` or `position: absolute`. The `overlay` mode uses `position: absolute; inset: 0`.

### How do I change the overlay background color?
The overlay background is controlled by the `.n-loading-overlay` class in CSS. By default, it uses a translucent version of the inverted background color. You can override it via CSS:
```css
.n-loading-overlay {
  background-color: rgba(255, 255, 255, 0.8);
}
```