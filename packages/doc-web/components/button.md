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
```

## Variants

### Flat

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton class="flat" label="Default" />
    <NButton class="flat brand" label="Brand" />
    <NButton class="flat success" label="Success" />
</div>

```vue
<NButton class="flat brand" label="Brand" />
```

### Outlined

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton class="outlined" label="Default" />
    <NButton class="outlined brand" label="Brand" />
    <NButton class="outlined success" label="Success" />
</div>

```vue
<NButton class="outlined brand" label="Brand" />
```

### Texted

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton class="texted" label="Default" />
    <NButton class="texted brand" label="Brand" />
    <NButton class="texted success" label="Success" />
</div>

```vue
<NButton class="texted brand" label="Brand" />
```

## Icons

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton prependIcon="mdi-arrow-left" class="flat" label="Prev" />
    <NButton appendIcon="mdi-arrow-right" class="flat" label="Next" />
    <NButton icon="mdi-magnify" class="icon brand" />
</div>

```vue
<NButton prependIcon="mdi-arrow-left" label="Prev" />
<NButton icon="mdi-magnify" class="icon" />
```

## Loading State

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton loading label="Loading..." />
    <NButton class="brand" loading loadingName="mdi-sync" label="Syncing" />
</div>

```vue
<NButton loading label="Loading..." />
<NButton loading loadingName="mdi-sync" label="Syncing" />
```

## Links & Routing

Buttons can act as links or Vue Router links.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton tag="a" href="https://example.com" target="_blank" label="External Link" class="outlined" appendIcon="mdi-open-in-new" />
    <!-- to="/" would work in a real app with router -->
    <NButton to="/" label="Router Link" class="brand" />
</div>

```vue
<NButton tag="a" href="https://example.com" label="External Link" />
<NButton to="/dashboard" label="Go to Dashboard" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | - | The text to display inside the button. |
| `icon` | `string` | - | Icon name (MDI). |
| `prependIcon` | `string` | - | Icon to show before label. |
| `appendIcon` | `string` | - | Icon to show after label. |
| `tag` | `string` | `'button'` | HTML tag to use (e.g. `a`, `div`). |
| `type` | `string` | `'button'` | Button type attribute. |
| `loading` | `boolean` | `false` | Whether the button is in loading state. |
| `loadingName` | `string` | - | Icon name for the loading spinner. |
| `loadingClass` | `string` | - | CSS class for the loading spinner. |
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

