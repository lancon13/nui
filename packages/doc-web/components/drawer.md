# Drawer

Drawers are panels that slide in from the side of the screen.

<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)
const showDir = ref(false)
const direction = ref('left')
const openDrawer = (dir) => {
    direction.value = dir
    showDir.value = true
}
</script>

## Basic Usage

<div class="my-4 relative overflow-hidden h-64 border border-border vp-raw">
    <div class="p-4 flex items-center justify-center h-full">
        <NButton label="Open Left Drawer" class="brand" @click="showDrawer = true" />
    </div>
    
    <NDrawer v-model="showDrawer" direction="left">
        <NCard class="h-full w-64 shadowed border-r border-border">
            <div class="p-6">
                <h3 class="text-xl font-bold">Navigation</h3>
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
<NDrawer v-model="show" direction="left">
  <NCard class="h-full w-64">...</NCard>
</NDrawer>
```

## Directions

<div class="flex flex-wrap gap-2 my-4 vp-raw">
    <NButton label="Top" @click="openDrawer('top')" />
    <NButton label="Bottom" @click="openDrawer('bottom')" />
    <NButton label="Left" @click="openDrawer('left')" />
    <NButton label="Right" @click="openDrawer('right')" />
</div>

<div class="relative h-64 overflow-hidden border border-border vp-raw">
    <NDrawer v-model="showDir" :direction="direction">
        <NCard :class="['shadowed', direction === 'top' || direction === 'bottom' ? 'w-full h-32' : 'h-full w-48']">
            <div class="p-4 h-full flex flex-col items-center justify-center">
                <div class="font-bold capitalize">{{ direction }} Drawer</div>
                <NButton label="Close" class="mt-2" size="xs" @click="showDir = false" />
            </div>
        </NCard>
    </NDrawer>
</div>

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean` | `false` | Whether the drawer is visible. |
| `direction` | `string` | `'left'` | Slide-in direction: `top`, `bottom`, `left`, `right`. |
| `overlay` | `boolean` | `true` | Whether to show a darkened background. |
| `persist` | `boolean` | `false` | If true, clicking outside won't close the drawer. |
| `content` | `string` | - | Raw HTML content (alternative to slot). |