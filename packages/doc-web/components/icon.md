# Icon

A simple wrapper for Material Design Icons that integrates seamlessly with the design system.

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
<NIcon name="mdi-star" class="text-warning" />
<NIcon name="mdi-check-circle" class="text-success" />
```

## Sizes

Icons inherit the font size of their parent, allowing you to use standard Tailwind text utility classes to control their size.

<div class="flex flex-row items-end gap-4 my-4 vp-raw">
    <NIcon name="mdi-magnify" class="text-sm" />
    <NIcon name="mdi-magnify" class="text-base" />
    <NIcon name="mdi-magnify" class="text-xl" />
    <NIcon name="mdi-magnify" class="text-2xl" />
    <NIcon name="mdi-magnify" class="text-[3rem]" />
</div>

```vue
<NIcon name="mdi-magnify" class="text-sm" />
<NIcon name="mdi-magnify" class="text-base" />
<NIcon name="mdi-magnify" class="text-xl" />
<NIcon name="mdi-magnify" class="text-2xl" />
<NIcon name="mdi-magnify" class="text-[3rem]" />
```

## Colors

You can colorize icons using standard Tailwind text color utilities or your theme's brand colors.

<div class="flex flex-row items-center gap-6 my-4 text-4xl vp-raw">
    <NIcon name="mdi-heart" class="text-text" />
    <NIcon name="mdi-heart" class="text-brand" />
    <NIcon name="mdi-heart" class="text-success" />
    <NIcon name="mdi-heart" class="text-error" />
    <NIcon name="mdi-heart" class="text-warning" />
    <NIcon name="mdi-heart" class="text-info" />
</div>

```vue
<NIcon name="mdi-heart" class="text-text" />
<NIcon name="mdi-heart" class="text-brand" />
<NIcon name="mdi-heart" class="text-success" />
<NIcon name="mdi-heart" class="text-error" />
<NIcon name="mdi-heart" class="text-warning" />
<NIcon name="mdi-heart" class="text-info" />
```

## Loading / Animations

Since icons are just text-based elements, standard CSS animations work perfectly.

<div class="flex items-center gap-4 my-4 vp-raw">
    <NIcon name="mdi-loading" class="text-4xl animate-spin" />
    <NIcon name="mdi-sync" class="text-4xl animate-spin text-brand" />
    <NIcon name="mdi-cog" class="text-4xl animate-spin text-muted" />
</div>

```vue
<NIcon name="mdi-loading" class="animate-spin" />
<NIcon name="mdi-sync" class="text-brand animate-spin" />
```

## Clickable & Links

Icons can be made interactive by adding a click listener or providing a `href`/`to` prop.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <div class="flex items-center gap-2">
        <NIcon name="mdi-cursor-default-click" href="#" class="text-2xl text-brand" @click.prevent />
        <span>Clickable (has onClick or href)</span>
    </div>
    <div class="flex items-center gap-2">
        <NIcon tag="a" href="https://google.com" target="_blank" name="mdi-open-in-new" class="text-2xl text-info" />
        <span>Link (tag="a", href="...")</span>
    </div>
</div>

```vue
<!-- Emits 'click' event -->
<NIcon name="mdi-cursor-default-click" @click="handleClick" />

<!-- Renders as an anchor tag -->
<NIcon tag="a" href="https://google.com" target="_blank" name="mdi-open-in-new" />
```

## Disabled State

Disabled icons have reduced opacity and `cursor-not-allowed`.

<div class="flex items-center gap-4 my-4 vp-raw">
    <NIcon name="mdi-account" class="text-4xl" />
    <NIcon name="mdi-account" disabled class="text-4xl" />
</div>

```vue
<NIcon name="mdi-account" disabled />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | - | Icon name. Prefixes `mdi-` automatically if missing. |
| `tag` | `string` | `'i'` | HTML tag to use. |
| `disabled` | `boolean` | `false` | Whether the icon is disabled. |
| `to` | `string \| object` | - | Vue Router link. |
| `href` | `string` | - | External link. |
| `target` | `string` | - | Link target (e.g., `_blank`). |

## Events

| Event | Description |
| --- | --- |
| `click` | Emitted when clicked (if not disabled and clickable). |

## Recipes & FAQ

### How can I precisely override the icon color?
While Tailwind classes are recommended, you can use the `style` attribute for specific color overrides. This will be applied directly to the icon element.

```vue
<NIcon name="heart" style="color: #ff00ff" />
```

### Do I need to include the 'mdi-' prefix?
No, the component automatically adds it if it's missing. `name="account"` is treated the same as `name="mdi-account"`.

### How do I use a different icon set?
Currently, `NIcon` is optimized for Material Design Icons (MDI). However, since it renders a class based on the name, you *could* technically pass a full class string if your other icon library uses a similar class-based approach (e.g. FontAwesome), but you might need to handle the font loading yourself.

### Can I use SVG icons directly?
`NIcon` is designed for font-based icons. For raw SVGs, you should use the `NImage` component or inline SVG tags.
