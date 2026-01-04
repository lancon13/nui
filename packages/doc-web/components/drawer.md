# Drawer

Drawers are panels that slide in from the side of the screen, commonly used for navigation, details, or settings.

<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)
const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)
const showNoOverlay = ref(false)
const showPersistent = ref(false)
</script>

## Basic Usage

<div class="my-4 relative overflow-hidden h-64 border border-border vp-raw">
    <div class="p-4 flex items-center justify-center h-full">
        <NButton label="Open Left Drawer" class="brand" @click="showDrawer = true" />
    </div>
    <NDrawer v-model="showDrawer" direction="left">
        <NCard class="h-full w-64 shadowed border-r border-border">
            <div class="p-6 h-full flex flex-col">
                <h3 class="text-xl font-bold text-brand">Navigation</h3>
                <nav class="mt-4 flex flex-col gap-2">
                    <a href="#" class="p-2 hover:bg-brand/10 rounded">Home</a>
                    <a href="#" class="p-2 hover:bg-brand/10 rounded">Settings</a>
                </nav>
                <NButton label="Close" class="mt-auto texted brand w-full" @click="showDrawer = false" />
            </div>
        </NCard>
    </NDrawer>
</div>

```vue
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <NButton label="Open Left Drawer" class="brand" @click="show = true" />
  <NDrawer v-model="show" direction="left">
    <NCard class="h-full w-64 shadowed border-r border-border">
      <div class="p-6 h-full flex flex-col">
        <h3 class="text-xl font-bold text-brand">Navigation</h3>
        <nav class="mt-4 flex flex-col gap-2">
          <a href="#" class="p-2 hover:bg-brand/10 rounded">Home</a>
          <a href="#" class="p-2 hover:bg-brand/10 rounded">Settings</a>
        </nav>
        <NButton label="Close" class="mt-auto texted brand w-full" @click="show = false" />
      </div>
    </NCard>
  </NDrawer>
</template>
```

## Directions

Drawers can slide in from any of the four edges.

<div class="flex flex-wrap gap-2 my-4 vp-raw">
    <NButton label="Top" @click="showTop = true" />
    <NButton label="Bottom" @click="showBottom = true" />
    <NButton label="Left" @click="showLeft = true" />
    <NButton label="Right" @click="showRight = true" />
</div>
<div class="relative h-64 overflow-hidden border border-border vp-raw">
    <NDrawer v-model="showTop" direction="top">
        <NCard class="w-full h-32 shadowed border-b border-border">
            <div class="p-4 h-full flex flex-col items-center justify-center">
                <div class="font-bold">Top Drawer</div>
                <NButton label="Close" class="mt-2" size="xs" @click="showTop = false" />
            </div>
        </NCard>
    </NDrawer>
    <NDrawer v-model="showBottom" direction="bottom">
        <NCard class="w-full h-32 shadowed border-t border-border">
            <div class="p-4 h-full flex flex-col items-center justify-center">
                <div class="font-bold">Bottom Drawer</div>
                <NButton label="Close" class="mt-2" size="xs" @click="showBottom = false" />
            </div>
        </NCard>
    </NDrawer>
    <NDrawer v-model="showLeft" direction="left">
        <NCard class="h-full w-48 shadowed border-r border-border">
            <div class="p-4 h-full flex flex-col items-center justify-center">
                <div class="font-bold">Left Drawer</div>
                <NButton label="Close" class="mt-2" size="xs" @click="showLeft = false" />
            </div>
        </NCard>
    </NDrawer>
    <NDrawer v-model="showRight" direction="right">
        <NCard class="h-full w-48 shadowed border-l border-border">
            <div class="p-4 h-full flex flex-col items-center justify-center">
                <div class="font-bold">Right Drawer</div>
                <NButton label="Close" class="mt-2" size="xs" @click="showRight = false" />
            </div>
        </NCard>
    </NDrawer>
</div>

```vue
<NButton label="Top" @click="showTop = true" />
<NButton label="Bottom" @click="showBottom = true" />
<NButton label="Left" @click="showLeft = true" />
<NButton label="Right" @click="showRight = true" />

<NDrawer v-model="showTop" direction="top">
  <NCard class="w-full h-32 shadowed">
    <!-- Top Content -->
  </NCard>
</NDrawer>

<NDrawer v-model="showBottom" direction="bottom">
  <NCard class="w-full h-32 shadowed">
    <!-- Bottom Content -->
  </NCard>
</NDrawer>

<NDrawer v-model="showLeft" direction="left">
  <NCard class="h-full w-48 shadowed">
    <!-- Left Content -->
  </NCard>
</NDrawer>

<NDrawer v-model="showRight" direction="right">
  <NCard class="h-full w-48 shadowed">
    <!-- Right Content -->
  </NCard>
</NDrawer>
```

## No Overlay

You can disable the background overlay. In this mode, clicking outside usually closes the drawer unless `noClickOutsideHide` is set.

<div class="my-4 relative overflow-hidden h-64 border border-border vp-raw">
    <div class="p-4 flex items-center justify-center h-full">
        <NButton label="Toggle No-Overlay Drawer" class="outlined brand" @click="showNoOverlay = !showNoOverlay" />
    </div>
    <NDrawer v-model="showNoOverlay" :overlay="false" direction="right">
        <NCard class="h-full w-64 shadowed border-l border-border bg-surface">
            <div class="p-6">
                <h3 class="text-lg font-bold mb-4">Information</h3>
                <p class="text-sm text-text/70 italic">This drawer does not have an overlay.</p>
                <NButton label="Close" class="mt-4" size="sm" @click="showNoOverlay = false" />
            </div>
        </NCard>
    </NDrawer>
</div>

```vue
<NButton label="Toggle No-Overlay Drawer" @click="show = !show" />
<NDrawer v-model="show" :overlay="false" direction="right">
  <NCard class="h-full w-64 shadowed border-l border-border bg-surface">
    <div class="p-6">
      <h3 class="text-lg font-bold mb-4">Information</h3>
      <p class="text-sm text-text/70 italic">This drawer does not have an overlay.</p>
      <NButton label="Close" size="sm" @click="show = false" />
    </div>
  </NCard>
</NDrawer>
```

## Persistent

Persistent drawers do not close when clicking the overlay, outside the content, or pressing ESC.

<div class="my-4 relative overflow-hidden h-64 border border-border vp-raw">
    <div class="p-4 flex items-center justify-center h-full">
        <NButton label="Open Persistent Drawer" class="brand" @click="showPersistent = true" />
    </div>
    <NDrawer v-model="showPersistent" persist direction="left">
        <NCard class="h-full w-64 shadowed border-r border-border">
            <div class="p-6 flex flex-col h-full">
                <h3 class="text-xl font-bold text-brand">Persistent</h3>
                <p class="text-sm mt-4">This drawer will not close when clicking the overlay or pressing ESC.</p>
                <NButton label="Close Explicitly" class="mt-auto brand" @click="showPersistent = false" />
            </div>
        </NCard>
    </NDrawer>
</div>

```vue
<NButton label="Open Persistent Drawer" @click="show = true" />
<NDrawer v-model="show" persist direction="left">
  <NCard class="h-full w-64 shadowed border-r border-border">
    <div class="p-6 flex flex-col h-full">
      <h3 class="text-xl font-bold text-brand">Persistent</h3>
      <p class="text-sm mt-4">Must close explicitly via the button.</p>
      <NButton label="Close Explicitly" class="mt-auto brand" @click="show = false" />
    </div>
  </NCard>
</NDrawer>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean` | `false` | Whether the drawer is visible. |
| `direction` | `string` | `'left'` | Slide-in direction: `top`, `bottom`, `left`, `right`. |
| `overlay` | `boolean` | `true` | Whether to show a darkened background. |
| `noOverlayHide` | `boolean` | `false` | If true, clicking the overlay won't close the drawer. |
| `noClickOutsideHide` | `boolean` | `false` | If true, clicking outside (when no overlay) won't close. |
| `noEscHide` | `boolean` | `false` | If true, pressing ESC won't close the drawer. |
| `persist` | `boolean` | `false` | Combines all "no*Hide" props. |
| `focusOnShow` | `boolean` | `true` | Whether to automatically focus the first element. |
| `content` | `string` | - | Raw HTML content (alternative to slot). |
| `tag` | `string` | `'div'` | Wrapper tag. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Drawer content. |

## Events

| Event | Description |
| --- | --- |
| `update:modelValue` | Emitted when visibility changes. |

## Exposed Methods

| Method | Description |
| --- | --- |
| `show()` | Programmatically show the drawer. |
| `hide()` | Programmatically hide the drawer. |

## Recipes & FAQ

### How do I make the drawer push content instead of overlapping?
`NDrawer` uses absolute positioning. To "push" content, you would typically need a custom layout where the main content margin adapts to the drawer state.

### Can I use this inside a specific container?
Yes! `NDrawer` does NOT teleport by default. To restrict it to a specific container, ensure the container has `position: relative` and `overflow: hidden`.

### How to handle full-height drawers?
Ensure the parent container has a defined height. The drawer itself uses `h-full` for side directions.