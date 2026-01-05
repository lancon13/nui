# Popover

Popovers are small overlays that display additional information or actions, anchored to a trigger element.

<script setup>
import { ref } from 'vue'
const showNested = ref(false)
const showExplicit = ref(false)
</script>

## Basic Usage

Tooltips automatically attach to their parent element and show on hover/focus/click.

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="brand">
        Click Me
        <NPopover>
            <NCard class="w-48 shadowed border border-border">
                <div class="p-4">
                    <h3 class="font-bold">Popover Content</h3>
                    <p class="text-sm mt-2">You can put anything here!</p>
                </div>
            </NCard>
        </NPopover>
    </NButton>
</div>

```vue
<NButton class="brand">
  Click Me
  <NPopover>
    <NCard class="w-48 shadowed border border-border">
      <div class="p-4">
        <h3 class="font-bold">Popover Content</h3>
        <p class="text-sm mt-2">You can put anything here!</p>
      </div>
    </NCard>
  </NPopover>
</NButton>
```

## Positioning

You can control where the popover appears relative to the anchor using `direction` and `position`.

<div class="my-4 p-8 flex flex-col gap-8 items-center justify-center border border-border rounded vp-raw">
    <!-- Top Row -->
    <div class="flex gap-4">
        <NButton class="outlined brand">Top Start<NPopover direction="top" position="start"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Top Start</NCard></NPopover></NButton>
        <NButton class="outlined brand">Top Center<NPopover direction="top"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Top Center</NCard></NPopover></NButton>
        <NButton class="outlined brand">Top End<NPopover direction="top" position="end"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Top End</NCard></NPopover></NButton>
    </div>
    <!-- Bottom Row -->
    <div class="flex gap-4">
        <NButton class="outlined brand">Bottom Start<NPopover direction="bottom" position="start"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Bottom Start</NCard></NPopover></NButton>
        <NButton class="outlined brand">Bottom Center<NPopover direction="bottom"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Bottom Center</NCard></NPopover></NButton>
        <NButton class="outlined brand">Bottom End<NPopover direction="bottom" position="end"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Bottom End</NCard></NPopover></NButton>
    </div>
    <!-- Left Row -->
    <div class="flex gap-4">
        <NButton class="outlined brand">Left Start<NPopover direction="left" position="start"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Left Start</NCard></NPopover></NButton>
        <NButton class="outlined brand">Left Center<NPopover direction="left"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Left Center</NCard></NPopover></NButton>
        <NButton class="outlined brand">Left End<NPopover direction="left" position="end"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Left End</NCard></NPopover></NButton>
    </div>
    <!-- Right Row -->
    <div class="flex gap-4">
        <NButton class="outlined brand">Right Start<NPopover direction="right" position="start"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Right Start</NCard></NPopover></NButton>
        <NButton class="outlined brand">Right Center<NPopover direction="right"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Right Center</NCard></NPopover></NButton>
        <NButton class="outlined brand">Right End<NPopover direction="right" position="end"><NCard class="p-2 w-32 text-center text-xs shadowed border border-border">Right End</NCard></NPopover></NButton>
    </div>
</div>

```vue
<!-- Top -->
<NPopover direction="top" position="start">...</NPopover>
<NPopover direction="top">...</NPopover>
<NPopover direction="top" position="end">...</NPopover>

<!-- Bottom -->
<NPopover direction="bottom" position="start">...</NPopover>
<NPopover direction="bottom">...</NPopover>
<NPopover direction="bottom" position="end">...</NPopover>

<!-- Left -->
<NPopover direction="left" position="start">...</NPopover>
<NPopover direction="left">...</NPopover>
<NPopover direction="left" position="end">...</NPopover>

<!-- Right -->
<NPopover direction="right" position="start">...</NPopover>
<NPopover direction="right">...</NPopover>
<NPopover direction="right" position="end">...</NPopover>
```

## Nested Popovers

Popovers can be nested within each other.

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="brand">
        Root Trigger
        <NPopover v-model="showNested">
            <NCard class="w-64 border border-border shadowed">
                <div class="p-4 flex flex-col gap-2">
                    <span class="font-bold text-brand">Level 1 Content</span>
                    <NButton size="sm" class="outlined brand">
                        Open Level 2
                        <NPopover stacked direction="right">
                            <NCard class="w-48 border border-border shadowed bg-surface-indent">
                                <div class="p-4 text-sm">Level 2 Content</div>
                            </NCard>
                        </NPopover>
                    </NButton>
                </div>
            </NCard>
        </NPopover>
    </NButton>
</div>

```vue
<script setup>
    import { ref } from 'vue'
    const show = ref(false)
</script>

<template>
    <NButton class="brand">
        Root Trigger
        <NPopover v-model="show">
            <NCard class="w-64 border border-border shadowed">
                <div class="p-4 flex flex-col gap-2">
                    <span class="font-bold text-brand">Level 1 Content</span>
                    <NButton size="sm" class="outlined brand">
                        Open Level 2
                        <NPopover stacked direction="right">
                            <NCard class="w-48 border border-border shadowed bg-surface-indent">
                                <div class="p-4 text-sm">Level 2 Content</div>
                            </NCard>
                        </NPopover>
                    </NButton>
                </div>
            </NCard>
        </NPopover>
    </NButton>
</template>
```

## Explicit Attachment

You can attach the popover to a specific element by ID or ref using `attachParent` and `clickTriggerAnchor`.

<div class="my-4 p-8 flex flex-col items-center justify-center gap-4 border border-border rounded vp-raw">
    <div class="flex gap-4">
        <NButton id="popover-anchor" label="I am the Anchor" />
        <NButton id="popover-trigger" label="Click me to Trigger" class="brand" />
    </div>
    <NPopover v-model="showExplicit" attachParent="#popover-anchor" clickTriggerAnchor="#popover-trigger">
        <NCard class="shadowed p-4 w-48 text-center text-sm border border-border">
            Positioned to Anchor, but toggled by Trigger!
        </NCard>
    </NPopover>
</div>

```vue
<script setup>
    import { ref } from 'vue'
    const show = ref(false)
</script>

<template>
    <div class="flex gap-4">
        <NButton id="popover-anchor" label="I am the Anchor" />
        <NButton id="popover-trigger" label="Click me to Trigger" class="brand" />
    </div>

    <NPopover v-model="show" attachParent="#popover-anchor" clickTriggerAnchor="#popover-trigger">
        <NCard class="shadowed p-4 w-48 text-center text-sm border border-border">
            Positioned to Anchor, but toggled by Trigger!
        </NCard>
    </NPopover>
</template>
```

## Props

| Prop                   | Type                    | Default          | Description                                        |
| ---------------------- | ----------------------- | ---------------- | -------------------------------------------------- |
| `v-model`              | `boolean`               | `false`          | Controls visibility.                               |
| `content`              | `string`                | -                | Text content (alternative to default slot).        |
| `direction`            | `string`                | `'bottom'`       | Side to display: `top`, `bottom`, `left`, `right`. |
| `position`             | `string`                | `''`             | Alignment: `start`, `end`, or empty (center).      |
| `triggerByHover`       | `boolean`               | `true`           | Show on hover.                                     |
| `triggerByFocus`       | `boolean`               | `true`           | Show on focus.                                     |
| `triggerByInteraction` | `boolean`               | `true`           | Show on click/tap.                                 |
| `allowClickToHide`     | `boolean`               | `false`          | Close when clicking the trigger again.             |
| `persistent`           | `boolean`               | `false`          | Keep open when hovering the content.               |
| `showDelay`            | `number`                | `75`             | Delay before showing in ms.                        |
| `hideDelay`            | `number`                | `250`            | Delay before hiding in ms.                         |
| `margin`               | `number`                | `4`              | Spacing from trigger.                              |
| `offset`               | `[number, number]`      | `[0, 0]`         | Custom offset `[x, y]`.                            |
| `autoReposition`       | `boolean`               | `true`           | Automatically flip if out of viewport.             |
| `stacked`              | `boolean`               | `false`          | Use when nesting popovers without teleport.        |
| `overlay`              | `boolean`               | `false`          | Render as a full-screen overlay.                   |
| `fit`                  | `boolean`               | `false`          | Force popover width to match parent.               |
| `attachParent`         | `string \| HTMLElement` | -                | Element to position against.                       |
| `hoverTriggerAnchor`   | `string \| HTMLElement` | -                | Element for hover trigger.                         |
| `focusTriggerAnchor`   | `string \| HTMLElement` | -                | Element for focus trigger.                         |
| `clickTriggerAnchor`   | `string \| HTMLElement` | -                | Element for click trigger.                         |
| `tag`                  | `string`                | `'span'`         | Container tag.                                     |
| `role`                 | `string`                | `'presentation'` | ARIA role.                                         |

## Slots

| Slot      | Description      |
| --------- | ---------------- |
| `default` | Popover content. |

## Exposed Methods

| Method   | Description                        |
| -------- | ---------------------------------- |
| `show()` | Programmatically show the popover. |
| `hide()` | Programmatically hide the popover. |

## Recipes & FAQ

### How to close the popover programmatically?

You can bind `v-model` and set it to `false`, or access the component ref and call `hide()`.

```vue
<NPopover v-model="isOpen">
  <NButton @click="isOpen = false">Close</NButton>
</NPopover>
```

### Why is my popover cut off?

If `autoReposition` is false, it might go off-screen. If it is true, check `shiftPadding`. Also, ensure the z-index is high enough if inside other stacked contexts.

### Can I use this for a dropdown menu?

Yes! `NPopover` is the underlying primitive for dropdowns. Just put a list of buttons inside.
