# Toast

Toasts are floating notifications used to provide non-intrusive feedback. In NUI, the `NToast` component handles positioning, stacking, and teleportation, while `NBanner` is used as the standard content wrapper.

<script setup>
import { useNotify } from '@nui/ui'
import { ref, reactive } from 'vue'

const { notify, success, error, info, warning } = useNotify()

const showComponentToast = ref(false)

// State for positions demo
const activeToasts = reactive({
    'top-left': false, 'top-center': false, 'top-right': false,
    'center-left': false, 'center-center': false, 'center-right': false,
    'bottom-left': false, 'bottom-center': false, 'bottom-right': false
})

const openPosToast = (p) => {
    activeToasts[p] = true
}
</script>

## Programmatic Usage (Recommended)

The `useNotify` composable is the preferred way to show notifications. It handles instance management automatically across all semantic colors.

<div class="flex flex-wrap gap-4 my-4 vp-raw">
    <NButton label="Default" @click="notify('General update notification.', { label: 'System' })"></NButton>
    <NButton label="Success" class="success" @click="success('Profile updated successfully.')"></NButton>
    <NButton label="Info" class="info outlined" @click="info('New features are now available.')"></NButton>
    <NButton label="Warning" class="warning texted" @click="warning('Your storage space is running low.')"></NButton>
    <NButton label="Error" class="error flat" @click="error('Failed to sync data with server.')"></NButton>
</div>

```vue
<script setup>
    import { useNotify } from '@nui/ui'
    const { success, error, info, warning, notify } = useNotify()

    const handleAction = async () => {
        // Simple usage
        success('Operation successful!')

        // Advanced usage with title and options
        const instance = await notify('Backup completed with warnings.', {
            label: 'Backup Status',
            icon: 'mdi-cloud-upload',
            duration: 5000,
            actions: [{ label: 'View Log', onClick: () => console.log('view') }]
        })

        // Programmatically close later if needed
        // instance.hide()
    }
</script>

<template>
    <NButton @click="handleAction">Trigger Toast</NButton>
</template>
```

## Component Usage

Use the `NToast` component directly in your templates when you need explicit control via `v-model`.

<div class="my-4 vp-raw">
    <NButton label="Toggle Component Toast" class="brand" @click="showComponentToast = !showComponentToast"></NButton>
    <NToast v-model="showComponentToast" position="top-right" :duration="4000">
        <NBanner 
            class="brand shadowed" 
            icon="mdi-information" 
            label="Notification Title"
        >
            I am a component-based toast notification with a body text.
            <template #actions>
                <NButton label="Close" class="texted" size="xs" @click="showComponentToast = false"></NButton>
            </template>
        </NBanner>
    </NToast>
</div>

```vue
<template>
    <NToast v-model="show" position="top-right" :duration="3000">
        <NBanner class="brand shadowed" icon="mdi-info" label="Hello World!">
            This is the detailed body text of the notification.
            <template #actions>
                <NButton label="Close" @click="show = false" />
            </template>
        </NBanner>
    </NToast>
</template>
```

## Colors & Variants

Appearance is defined by the content within the toast. Using `NBanner` provides access to all semantic color variants.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NBanner class="brand shadowed" icon="mdi-check" label="System Update">A new version is available.</NBanner>
    <NBanner class="success shadowed" icon="mdi-check-circle" label="Success">Your profile has been updated.</NBanner>
    <NBanner class="info flat shadowed" icon="mdi-information" label="Note">Please review the updated terms.</NBanner>
    <NBanner class="warning outlined shadowed" icon="mdi-alert" label="Attention">Your trial expires in 3 days.</NBanner>
    <NBanner class="error shadowed" icon="mdi-alert-circle" label="Error">Unable to connect to the server.</NBanner>
</div>

```vue
<NBanner class="success" label="Success">Solid Success</NBanner>
<NBanner class="info flat" label="Info">Flat Info</NBanner>
<NBanner class="warning outlined" label="Warning">Outlined Warning</NBanner>
```

## Positions

Toasts can be placed in any of the 9 standard screen locations. Multiple toasts in the same position will stack automatically.

<div class="my-4 p-8 w-full mx-auto vp-raw">
    <div class="grid grid-cols-3 gap-8 w-full">
        <NButton label="Top Left" class="text-[10px] justify-center h-12" @click="openPosToast('top-left')"></NButton>
        <NButton label="Top Center" class="text-[10px] justify-center h-12" @click="openPosToast('top-center')"></NButton>
        <NButton label="Top Right" class="text-[10px] justify-center h-12" @click="openPosToast('top-right')"></NButton>        
        <NButton label="Center Left" class="text-[10px] justify-center h-12" @click="openPosToast('center-left')"></NButton>
        <NButton label="Center Center" class="text-[10px] justify-center h-12" @click="openPosToast('center-center')"></NButton>
        <NButton label="Center Right" class="text-[10px] justify-center h-12" @click="openPosToast('center-right')"></NButton>
        <NButton label="Bottom Left" class="text-[10px] justify-center h-12" @click="openPosToast('bottom-left')"></NButton>
        <NButton label="Bottom Center" class="text-[10px] justify-center h-12" @click="openPosToast('bottom-center')"></NButton>
                <NButton label="Bottom Right" class="text-[10px] justify-center h-12" @click="openPosToast('bottom-right')"></NButton>
            </div>
        </div>
        <!-- Positional Toast Instances -->
        <NToast v-model="activeToasts['top-left']" position="top-left" :duration="2500"><NBanner class="info shadowed" label="Toast at top-left" /></NToast>
<NToast v-model="activeToasts['top-center']" position="top-center" :duration="2500"><NBanner class="info shadowed" label="Toast at top-center" /></NToast>
<NToast v-model="activeToasts['top-right']" position="top-right" :duration="2500"><NBanner class="info shadowed" label="Toast at top-right" /></NToast>
<NToast v-model="activeToasts['center-left']" position="center-left" :duration="2500"><NBanner class="info shadowed" label="Toast at center-left" /></NToast>
<NToast v-model="activeToasts['center-center']" position="center-center" :duration="2500"><NBanner class="info shadowed" label="Toast at center-center" /></NToast>
<NToast v-model="activeToasts['center-right']" position="center-right" :duration="2500"><NBanner class="info shadowed" label="Toast at center-right" /></NToast>
<NToast v-model="activeToasts['bottom-left']" position="bottom-left" :duration="2500"><NBanner class="info shadowed" label="Toast at bottom-left" /></NToast>
<NToast v-model="activeToasts['bottom-center']" position="bottom-center" :duration="2500"><NBanner class="info shadowed" label="Toast at bottom-center" /></NToast>
<NToast v-model="activeToasts['bottom-right']" position="bottom-right" :duration="2500"><NBanner class="info shadowed" label="Toast at bottom-right" /></NToast>

## Props

| Prop            | Type      | Default        | Description                                                                                                                                       |
| --------------- | --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v-model`       | `boolean` | `false`        | Controls visibility.                                                                                                                              |
| `position`      | `string`  | `'top-center'` | Placement: `top-left`, `top-center`, `top-right`, `center-left`, `center-center`, `center-right`, `bottom-left`, `bottom-center`, `bottom-right`. |
| `duration`      | `number`  | `0`            | Time in ms before auto-hiding. Set to `0` to keep open.                                                                                           |
| `overlay`       | `boolean` | `false`        | Shows a background overlay.                                                                                                                       |
| `noOverlayHide` | `boolean` | `false`        | If true, clicking the overlay won't close the toast.                                                                                              |
| `noEscHide` | `boolean` | `false` | If true, ESC key won't close. |
| `focusOnShow` | `boolean` | `true` | Whether to automatically focus the toast when shown. |
| `role`          | `string`  | `'status'`     | WAI-ARIA role.                                                                                                                                    |

## Slots

| Slot      | Description                                             |
| --------- | ------------------------------------------------------- |
| `default` | The content to display. Usually an `NBanner` component. |

## Events

| Event               | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `update:modelValue` | Emitted when visibility changes (via timer, ESC, or manual close). |

## Exposed Methods

| Method   | Description                           |
| -------- | ------------------------------------- |
| `show()` | Sets the visibility state to `true`.  |
| `hide()` | Sets the visibility state to `false`. |

## Recipes & FAQ

### How does automatic stacking work?

NUI uses a **decentralized stack manager** via the `useComponentStack` composable.

1.  **Registry:** Each `NToast` registers itself in a unique stack based on its `position`.
2.  **Order Index:** The manager assigns a CSS `order` and `z-index` to each toast.
3.  **Flexbox:** The global toast containers use `display: flex`. By applying the `order` property, the browser handles the visual sequence automatically without needing a master "Toast Manager" component.

### Can I change the stacking direction?

Yes. You can override the container's `flex-direction` in your global CSS. For example, to make `top-right` toasts stack downwards (newest at the top):

```css
#n-toasts-container--position-top-right {
    flex-direction: column-reverse !important;
}
```

### Interaction Pause

Toasts with a `duration` automatically **pause** their countdown when hovered or focused, and **resume** when the user leaves.
