# Tooltip

Tooltips display informative text when users hover over, focus on, or tap an element. They provide context without cluttering the UI.

<script setup>
import { ref } from 'vue'
const showControlled = ref(false)
</script>

## Basic Usage

Tooltips automatically attach to their parent element.

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

Tooltips can be positioned on any side of the trigger element.

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
<NTooltip direction="top">Top</NTooltip>
<NTooltip direction="bottom">Bottom</NTooltip>
<NTooltip direction="left">Left</NTooltip>
<NTooltip direction="right">Right</NTooltip>
```

## Triggers

You can customize how the tooltip is triggered. By default, it shows on hover and focus.

<div class="flex flex-col gap-4 p-8 border border-border rounded items-center vp-raw">
    <NButton class="texted">
        Hover Only
        <NTooltip :triggerByFocus="false">I ignore focus</NTooltip>
    </NButton>
    <NButton class="texted">
        Focus Only
        <NTooltip :triggerByHover="false">Tab to me!</NTooltip>
    </NButton>
    <NButton class="texted">
        Click / Interaction
        <NTooltip :triggerByHover="false" :triggerByFocus="false" :triggerByInteraction="true">
            Clicked!
        </NTooltip>
    </NButton>
</div>

```vue
<!-- Disable focus trigger -->
<NTooltip :triggerByFocus="false">...</NTooltip>

<!-- Disable hover trigger -->
<NTooltip :triggerByHover="false">...</NTooltip>

<!-- Enable click/tap trigger -->
<NTooltip :triggerByInteraction="true">...</NTooltip>
```

## Persistent

Persistent tooltips stay visible as long as the mouse is over the trigger or the tooltip itself.

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="brand">
        Hover Me
        <NTooltip persistent>I won't disappear if you hover me.</NTooltip>
    </NButton>
</div>

```vue
<NTooltip persistent>...</NTooltip>
```

## Delays

Add delays to the show or hide actions to prevent flickering or accidental triggers.

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="outlined">
        Slow Tooltip
        <NTooltip :showDelay="500" :hideDelay="500">Wait for it...</NTooltip>
    </NButton>
</div>

```vue
<NTooltip :showDelay="500" :hideDelay="500">...</NTooltip>
```

## Controlled Visibility

You can manually control the tooltip using `v-model`.

<div class="my-4 p-8 flex flex-col items-center justify-center gap-4 border border-border rounded vp-raw">
    <NButton :label="showControlled ? 'Hide Tooltip' : 'Show Tooltip'" @click="showControlled = !showControlled" />
    <div class="p-4 border border-dashed border-brand relative">
        Target Element
        <NTooltip v-model="showControlled" :triggerByHover="false" :triggerByFocus="false">
            Manually Controlled
        </NTooltip>
    </div>
</div>

```vue
<script setup>
    const show = ref(false)
</script>

<template>
    <NButton @click="show = !show">Toggle</NButton>

    <div>
        Target
        <NTooltip v-model="show" :triggerByHover="false" :triggerByFocus="false"> Content </NTooltip>
    </div>
</template>
```

## Rich Content

Tooltips can contain any HTML or components.

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="texted brand">
        Rich HTML
        <NTooltip>
            <div class="text-left">
                <div class="font-bold mb-1">Formatted Title</div>
                <p class="opacity-80">This tooltip contains <strong>bold</strong> text and custom layout.</p>
            </div>
        </NTooltip>
    </NButton>
</div>

```vue
<NTooltip>
  <div class="font-bold">Title</div>
  <p>Description text</p>
</NTooltip>
```

## Explicit Attachment

While tooltips usually attach to their parent, you can explicitly attach them to another element using ID selectors or refs.

<div class="my-4 p-8 flex flex-col items-center justify-center gap-4 border border-border rounded vp-raw">
    <NButton id="custom-target-btn" label="I am the target" />
    <div class="text-xs opacity-50">
        (Tooltip component is declared down here)
        <NTooltip attachParent="#custom-target-btn" :hoverTriggerAnchor="'#custom-target-btn'">
            Attached by ID
        </NTooltip>
    </div>
</div>

```vue
<NButton id="my-btn">Target</NButton>
<NTooltip attachParent="#my-btn" hoverTriggerAnchor="#my-btn">...</NTooltip>
```

## Props

| Prop                   | Type                    | Default    | Description                                                              |
| ---------------------- | ----------------------- | ---------- | ------------------------------------------------------------------------ |
| `v-model`              | `boolean`               | `false`    | Controls visibility.                                                     |
| `content`              | `string`                | -          | Text content (alternative to default slot).                              |
| `direction`            | `string`                | `'bottom'` | Placement side: `top`, `bottom`, `left`, `right`.                        |
| `position`             | `string`                | `''`       | Alignment: `start`, `end`, or empty (center).                            |
| `showDelay`            | `number`                | `75`       | Delay before showing in ms.                                              |
| `hideDelay`            | `number`                | `250`      | Delay before hiding in ms.                                               |
| `persistent`           | `boolean`               | `false`    | Keeps tooltip open when hovering the content.                            |
| `triggerByHover`       | `boolean`               | `true`     | Show on hover.                                                           |
| `triggerByFocus`       | `boolean`               | `true`     | Show on focus.                                                           |
| `triggerByInteraction` | `boolean`               | `false`    | Show on click/tap.                                                       |
| `allowClickToHide`     | `boolean`               | `false`    | Close when clicking the trigger again (useful for interaction triggers). |
| `autoReposition`       | `boolean`               | `true`     | Automatically flip if out of viewport.                                   |
| `fit`                  | `boolean`               | `false`    | Force tooltip width to match parent width.                               |
| `overlay`              | `boolean`               | `false`    | Render as a full-screen overlay (mostly for mobile).                     |
| `attachParent`         | `string \| HTMLElement` | -          | Explicit element to attach to.                                           |
| `hoverTriggerAnchor`   | `string \| HTMLElement` | -          | Explicit element to listen for hover events.                             |
| `focusTriggerAnchor`   | `string \| HTMLElement` | -          | Explicit element to listen for focus events.                             |
| `clickTriggerAnchor`   | `string \| HTMLElement` | -          | Explicit element to listen for click events.                             |
| `offset`               | `[number, number]`      | `[0, 0]`   | Custom offset [x, y].                                                    |
| `margin`               | `number`                | `8`        | Spacing from trigger.                                                    |
| `tag`                  | `string`                | `'span'`   | HTML tag for the tooltip container.                                      |

## Slots

| Slot      | Description                 |
| --------- | --------------------------- |
| `default` | The content of the tooltip. |

## Exposed Methods

| Method   | Description                        |
| -------- | ---------------------------------- |
| `show()` | Programmatically show the tooltip. |
| `hide()` | Programmatically hide the tooltip. |

## Recipes & FAQ

### How do I use a tooltip on a disabled button?

Browsers usually don't fire mouse events on disabled elements. To make a tooltip work, wrap the disabled button in a `div` or `span` and place the tooltip inside the wrapper.

```vue
<div>
  <NButton disabled label="Action" />
  <NTooltip>Reason for disabled state</NTooltip>
</div>
```

### Can I style the tooltip manually?

Yes, you can override the `.n-tooltip` class in your CSS, or pass classes directly to the component if `inheritAttrs` allows (though `NTooltip` renders in a teleport, so global CSS is often safer).

### Why isn't my tooltip showing?

1. Ensure the parent element creates a layout context (is not `display: contents` or hidden).
2. Check z-index stacking if inside a modal.
3. If using `attachParent` with a selector string, ensure the element exists in the DOM when the tooltip mounts.

### How to implement a "Click to Copy" tooltip?

Use `triggerByInteraction` and auto-hiding logic.

```vue
<NButton @click="copyToClipboard">
  Copy
  <NTooltip :triggerByInteraction="true" :hideDelay="1000">
    Copied!
  </NTooltip>
</NButton>
```
