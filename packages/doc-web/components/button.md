# Button

Buttons allow users to take actions, and make choices, with a single tap.

## Basic Usage

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton label="Default" />
    <NButton class="brand" label="Brand" />
    <NButton class="success" label="Success" />
    <NButton class="error" label="Error" />
    <NButton class="warning" label="Warning" />
    <NButton class="info" label="Info" />
</div>

```vue
<NButton label="Default" />
<NButton class="brand" label="Brand" />
<NButton class="success" label="Success" />
<NButton class="error" label="Error" />
<NButton class="warning" label="Warning" />
<NButton class="info" label="Info" />
```

## Variants

Buttons come in different styles to suit various contexts.

### Flat

Flat buttons have a background color but no elevation or border.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton class="flat" label="Default" />
    <NButton class="flat brand" label="Brand" />
    <NButton class="flat success" label="Success" />
    <NButton class="flat error" label="Error" />
    <NButton class="flat warning" label="Warning" />
    <NButton class="flat info" label="Info" />
</div>

```vue
<NButton class="flat" label="Default" />
<NButton class="flat brand" label="Brand" />
<NButton class="flat success" label="Success" />
<NButton class="flat error" label="Error" />
<NButton class="flat warning" label="Warning" />
<NButton class="flat info" label="Info" />
```

### Outlined

Outlined buttons have a transparent background with a colored border.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton class="outlined" label="Default" />
    <NButton class="outlined brand" label="Brand" />
    <NButton class="outlined success" label="Success" />
    <NButton class="outlined error" label="Error" />
    <NButton class="outlined warning" label="Warning" />
    <NButton class="outlined info" label="Info" />
</div>

```vue
<NButton class="outlined" label="Default" />
<NButton class="outlined brand" label="Brand" />
<NButton class="outlined success" label="Success" />
<NButton class="outlined error" label="Error" />
<NButton class="outlined warning" label="Warning" />
<NButton class="outlined info" label="Info" />
```

### Texted

Text buttons have no background or border, ideal for less prominent actions.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton class="texted" label="Default" />
    <NButton class="texted brand" label="Brand" />
    <NButton class="texted success" label="Success" />
    <NButton class="texted error" label="Error" />
    <NButton class="texted warning" label="Warning" />
    <NButton class="texted info" label="Info" />
</div>

```vue
<NButton class="texted" label="Default" />
<NButton class="texted brand" label="Brand" />
<NButton class="texted success" label="Success" />
<NButton class="texted error" label="Error" />
<NButton class="texted warning" label="Warning" />
<NButton class="texted info" label="Info" />
```

## Shapes & Sizes

### Shapes

Use utility classes like `pilled` or `squared` to change the button shape.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton class="pilled" label="Pilled" />
    <NButton class="squared" label="Squared" />
    <NButton class="shadowed" label="Shadowed" />
</div>

```vue
<NButton class="pilled" label="Pilled" />
<NButton class="squared" label="Squared" />
<NButton class="shadowed" label="Shadowed" />
```

### Sizes

Buttons inherit font size, so you can use Tailwind's text utilities to control size.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton class="text-xs" label="X-Small" />
    <NButton class="text-sm" label="Small" />
    <NButton class="text-base" label="Base" />
    <NButton class="text-lg" label="Large" />
    <NButton class="text-xl" label="X-Large" />
</div>

```vue
<NButton class="text-xs" label="X-Small" />
<NButton class="text-xl" label="X-Large" />
```

## Icons

Add icons to buttons using `icon`, `prependIcon`, or `appendIcon` props.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton prependIcon="mdi-arrow-left" class="flat" label="Prev" />
    <NButton appendIcon="mdi-arrow-right" class="flat" label="Next" />
    <NButton icon="mdi-magnify" class="icon brand" aria-label="Search" />
</div>

```vue
<NButton prependIcon="mdi-arrow-left" label="Prev" />
<NButton appendIcon="mdi-arrow-right" label="Next" />
<NButton icon="mdi-magnify" class="icon" />
```

## Loading State

Buttons can show a loading spinner, which disables interaction.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton loading label="Loading..." />
    <NButton class="brand" loading loadingName="mdi-sync" loadingClass="animate-spin" label="Syncing" />
</div>

```vue
<NButton loading label="Loading..." />
<NButton loading loadingName="mdi-sync" loadingClass="animate-spin" label="Syncing" />
```

## Links & Routing

Buttons can act as navigation links using `to` (Vue Router) or `href` (native link).

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton tag="a" href="https://example.com" target="_blank" label="External Link" class="outlined" appendIcon="mdi-open-in-new" />
    <!-- to="/" would work in a real app with router -->
    <NButton to="/" label="Router Link" class="brand" />
</div>

```vue
<NButton tag="a" href="https://example.com" target="_blank" label="External Link" />
<NButton to="/dashboard" label="Go to Dashboard" />
```

## Disabled State

Disabled buttons cannot be interacted with.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton disabled label="Disabled" />
    <NButton disabled class="texted error" label="Disabled Text" />
</div>

```vue
<NButton disabled label="Disabled" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | - | The text to display inside the button. |
| `icon` | `string` | - | Icon name (MDI) for icon-only buttons. |
| `iconClass` | `string \| object \| Array` | - | CSS class for the icon. |
| `prependIcon` | `string` | - | Icon to show before label. |
| `prependIconClass` | `string \| object \| Array` | - | CSS class for the prepended icon. |
| `appendIcon` | `string` | - | Icon to show after label. |
| `appendIconClass` | `string \| object \| Array` | - | CSS class for the appended icon. |
| `tag` | `string` | `'button'` | HTML tag to use (e.g. `a`, `div`). |
| `type` | `string` | `'button'` | Button type attribute. |
| `loading` | `boolean` | `false` | Whether the button is in loading state. |
| `loadingName` | `string` | `'loading'` | Icon name for the loading spinner. |
| `loadingClass` | `string \| object \| Array` | `'animate-spin'` | CSS class for the loading spinner. |
| `disabled` | `boolean` | `false` | Whether the button is disabled. |
| `to` | `string \| object` | - | Vue Router link destination. |
| `href` | `string` | - | External link URL. |
| `target` | `string` | - | Link target (e.g. `_blank`). |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Content of the button (overrides `label` prop). |
| `prepend` | Content before the label/default slot. |
| `append` | Content after the label/default slot. |
| `loading` | Custom loading overlay content. |

## Events

The component inherits standard DOM events like `click`, `focus`, `blur` because `inheritAttrs: false` is used but attributes are bound to the root element.

## Recipes & FAQ

### How do I use a custom icon set?
The `NButton` component uses `NIcon` internally, which supports MDI icons by default. To use other icons, you might need to customize `NIcon` or pass the full icon class string if your icon library supports class-based usage (e.g., FontAwesome).

### Why isn't my button navigating?
Ensure you are using the correct prop:
- Use `to` for internal Vue Router navigation.
- Use `href` for external links (and optionally set `tag="a"`).

### How do I make a block-level button?
Add the `w-full` utility class to the button:
```vue
<NButton class="w-full" label="Full Width" />
```

### Can I change the border radius?
Yes, use the `rounded-*` utility classes. `pilled` uses `rounded-full` and `squared` uses `rounded-none`.
```vue
<NButton class="rounded-lg" label="Custom Radius" />
```
