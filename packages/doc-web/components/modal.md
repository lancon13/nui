# Modal

Modals are used to display content that requires user attention or interaction, overlaying the main content.

<script setup>
import { ref } from 'vue'
const showModal = ref(false)
const showDir = ref(false)
const direction = ref('center')
const openModal = (dir) => {
    direction.value = dir
    showDir.value = true
}
</script>

## Basic Usage

<div class="my-4 vp-raw">
    <NButton label="Open Modal" class="brand" @click="showModal = true" />
    <NModal v-model="showModal">
        <NCard class="w-96 shadowed">
            <div class="n-card-header">
                <h1 class="text-xl font-bold">Modal Title</h1>
            </div>
            <div class="n-card-body">
                <p>This is a modal content wrapped in an NCard.</p>
            </div>
            <div class="n-card-footer justify-end gap-2">
                <NButton label="Close" class="texted" @click="showModal = false" />
                <NButton label="Confirm" class="brand" @click="showModal = false" />
            </div>
        </NCard>
    </NModal>
</div>

```vue
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <NButton label="Open" @click="show = true" />

  <NModal v-model="show">
    <NCard class="w-96">
      <div class="n-card-header">Title</div>
      <div class="n-card-body">Content...</div>
      <div class="n-card-footer">
        <NButton @click="show = false">Close</NButton>
      </div>
    </NCard>
  </NModal>
</template>
```

## Directions

Modals can slide in from different edges, behaving like a dialog (center), banner (top/bottom), or drawer (left/right).

<div class="flex flex-wrap gap-2 my-4 vp-raw">
    <NButton label="Center" @click="openModal('center')" />
    <NButton label="Top" @click="openModal('top')" />
    <NButton label="Bottom" @click="openModal('bottom')" />
    <NButton label="Left" @click="openModal('left')" />
    <NButton label="Right" @click="openModal('right')" />
</div>
<NModal v-model="showDir" :direction="direction">
    <NCard :class="['shadowed', direction === 'center' ? 'w-96' : (direction === 'top' || direction === 'bottom' ? 'w-full h-48' : 'h-full w-64')]">
        <div class="p-6 h-full flex flex-col">
            <h2 class="text-xl font-bold capitalize">{{ direction }} Modal</h2>
            <p class="mt-4 grow">Content for {{ direction }} modal.</p>
            <NButton label="Close" class="brand mt-auto" @click="showDir = false" />
        </div>
    </NCard>
</NModal>

```vue
<NModal v-model="show" direction="right">
  <NCard class="h-full w-64">
    <!-- Right Drawer Content -->
  </NCard>
</NModal>
```

## No Overlay

You can hide the background overlay, which is useful for non-blocking floating panels.

```vue
<NModal v-model="show" :overlay="false">
  <NCard class="shadowed border border-border">
    <!-- Content -->
  </NCard>
</NModal>
```

## Persistent

Persistent modals do not close when clicking the overlay or pressing ESC.

```vue
<NModal v-model="show" persist>
  <NCard>
    <p>You must click the button to close me.</p>
    <NButton @click="show = false">Close</NButton>
  </NCard>
</NModal>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean` | `false` | Whether the modal is visible. |
| `direction` | `string` | `'center'` | Slide-in direction: `center`, `top`, `bottom`, `left`, `right`. |
| `overlay` | `boolean` | `true` | Whether to show a darkened background. |
| `persist` | `boolean` | `false` | If true, clicking outside or ESC won't close the modal. |
| `noEscHide` | `boolean` | `false` | If true, pressing ESC won't close the modal. |
| `noOverlayHide` | `boolean` | `false` | If true, clicking overlay won't close. |
| `focusOnShow` | `boolean` | `true` | Whether to automatically focus the first element. |
| `content` | `string` | - | Raw HTML content (alternative to slot). |
| `role` | `string` | `'dialog'` | WAI-ARIA role. |
| `tag` | `string` | `'div'` | Wrapper tag. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Modal content. |

## Events

| Event | Description |
| --- | --- |
| `update:modelValue` | Emitted when visibility changes (e.g. via overlay click or ESC). |

## Exposed Methods

| Method | Description |
| --- | --- |
| `show()` | Programmatically show the modal. |
| `hide()` | Programmatically hide the modal. |

## Recipes & FAQ

### How do I vertically center content in a fullscreen modal?
If you set `direction="top"` or use custom classes to make the modal full screen, you can use Flexbox utilities on the modal content or the card itself.

### My modal is behind other elements?
NUI Modals use a `z-index` management system. Ensure your modal is mounted correctly. The `NModal` uses a teleport to `#n-modals-container` by default to avoid stacking context issues.

### Can I use this for a sidebar?
Yes! Setting `direction="left"` or `direction="right"` effectively turns the modal into a sidebar/drawer. Ensure your inner content has `h-full`.

### How to handle loading states?
You can put `NLoading` inside the `NModal` content.

```vue
<NModal v-model="isLoading" persist>
  <div class="p-4 bg-white rounded flex items-center gap-4">
    <NLoading class="animate-spin text-brand" />
    <span>Processing...</span>
  </div>
</NModal>
```
