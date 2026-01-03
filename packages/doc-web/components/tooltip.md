# Tooltip

Tooltips display informative text when users hover over, focus on, or tap an element.

## Basic Usage

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="brand">
        Hover Me
        <NTooltip>This is a simple tooltip</NTooltip>
    </NButton>
</div>

```vue
<NButton>
  Hover Me
  <NTooltip>Tooltip content</NTooltip>
</NButton>
```

## Directions

<div class="flex flex-wrap items-center gap-8 p-8 border border-border rounded justify-center vp-raw">
    <NButton class="outlined brand">
        Top
        <NTooltip direction="top">Tooltip on Top</NTooltip>
    </NButton>
    <NButton class="outlined brand">
        Bottom
        <NTooltip direction="bottom">Tooltip on Bottom</NTooltip>
    </NButton>
    <NButton class="outlined brand">
        Left
        <NTooltip direction="left">Tooltip on Left</NTooltip>
    </NButton>
    <NButton class="outlined brand">
        Right
        <NTooltip direction="right">Tooltip on Right</NTooltip>
    </NButton>
</div>

```vue
<NTooltip direction="top">...</NTooltip>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `string` | `'bottom'` | Tooltip placement: `top`, `bottom`, `left`, `right`. |
| `showDelay` | `number` | `75` | Delay before showing in ms. |
| `hideDelay` | `number` | `250` | Delay before hiding in ms. |
| `triggerByHover` | `boolean` | `true` | Show on hover. |
| `triggerByFocus` | `boolean` | `true` | Show on focus. |
| `tag` | `string` | `'span'` | HTML tag for the tooltip container. |
