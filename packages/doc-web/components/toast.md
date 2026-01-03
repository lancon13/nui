# Toast

Toasts are floating notifications that provide feedback about an operation.

<script setup>
import { ref } from 'vue'
const showToast = ref(false)
const showPos = ref(false)
const pos = ref('top-center')
const openToast = (p) => {
    pos.value = p
    showPos.value = true
}
</script>

## Basic Usage

While you can use the `NToast` component directly, it is most commonly used via the `useNotify` composable.

<div class="my-4 vp-raw">
    <NButton label="Show Toast" class="brand" @click="showToast = true" />
    
    <NToast v-model="showToast" position="top-right" :duration="3000">
        <NBanner class="brand" icon="mdi-information">
            This is a toast message!
            <template #actions>
                <NButton label="Dismiss" class="texted" size="xs" @click="showToast = false" />
            </template>
        </NBanner>
    </NToast>
</div>

```vue
<NToast v-model="show" position="top-right" :duration="3000">
  <NBanner>...</NBanner>
</NToast>
```

## Positions

Toasts can be positioned in 9 different locations on the screen.

<div class="grid grid-cols-3 gap-2 my-4 vp-raw">
    <NButton v-for="p in ['top-left', 'top-center', 'top-right', 'center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right']" 
             :key="p" :label="p" class="text-xs" @click="openToast(p)" />
</div>

<NToast v-model="showPos" :position="pos" :duration="2000">
    <NBanner class="info" icon="mdi-map-marker">Toast at {{ pos }}</NBanner>
</NToast>

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean` | `false` | Whether the toast is visible. |
| `position` | `string` | `'top-center'` | Screen position (e.g., `top-right`, `bottom-left`). |
| `duration` | `number` | `0` | Auto-hide duration in ms. `0` to keep open. |
| `overlay` | `boolean` | `false` | Whether to show an overlay. |
| `noEscHide` | `boolean` | `false` | If true, ESC key won't close. |
| `role` | `string` | `'status'` | WAI-ARIA role. |