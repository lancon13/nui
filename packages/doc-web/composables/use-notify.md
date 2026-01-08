# useNotify <NChip class="text-xs flat brand">@nui/ui</NChip>

A composable to programmatically show toast notifications.

## Basic Usage

<script setup>
import { useNotify, NButton } from '@nui/ui'

const { notify, success, error, warning, info } = useNotify()

const showNotify = () => notify('This is a default notification!')
const showSuccess = () => success('Settings saved successfully!')
const showError = () => error('Failed to upload file.')
const showWarning = () => warning('Disk space running low.')
const showInfo = () => info('New update available.')

const showActionToast = () => {
    notify('Do you want to undo?', {
        actions: [
            {
                label: 'Undo',
                class: 'texted brand',
                onClick: ({ hide }) => {
                    console.log('Undo clicked')
                    hide()
                }
            }
        ]
    })
}
</script>

<div class="flex flex-wrap gap-4 my-4 vp-raw">
    <NButton label="Default" @click="showNotify" />
    <NButton label="Success" class="success" @click="showSuccess" />
    <NButton label="Error" class="error" @click="showError" />
    <NButton label="Warning" class="warning" @click="showWarning" />
    <NButton label="Info" class="info" @click="showInfo" />
</div>

```vue
<script setup>
import { useNotify } from '@nui/ui'
const { success, error } = useNotify()

const onSave = () => {
  try {
    // save logic
    success('Saved!')
  } catch (e) {
    error('Error saving')
  }
}
</script>
```

## Advanced Usage

### Timed & Progress

You can set a custom duration and show a progress bar.

<div class="my-4 vp-raw">
    <NButton label="Show Timed (5s)" class="brand" @click="notify('Autoclose in 5s', { duration: 5000, showProgress: true })" />
</div>

```vue
notify('Autoclose in 5s', { duration: 5000, showProgress: true })
```

### Custom Positions

Notifications can be placed in any of the 9 standard positions.

<div class="my-4 vp-raw grid grid-cols-3 gap-2 w-full">
    <NButton size="xs" label="Top Left" @click="notify('Top Left', { position: 'top-left' })" />
    <NButton size="xs" label="Top Center" @click="notify('Top Center', { position: 'top-center' })" />
    <NButton size="xs" label="Top Right" @click="notify('Top Right', { position: 'top-right' })" />
    <NButton size="xs" label="Btm Left" @click="notify('Btm Left', { position: 'bottom-left' })" />
    <NButton size="xs" label="Btm Center" @click="notify('Btm Center', { position: 'bottom-center' })" />
    <NButton size="xs" label="Btm Right" @click="notify('Btm Right', { position: 'bottom-right' })" />
</div>

```vue
notify('Message', { position: 'bottom-right' })
```

### Custom Actions

Add interactive buttons to the notification.

<div class="my-4 vp-raw">
    <NButton label="With Actions" @click="showActionToast" />
</div>

```vue
notify('Message', {
  actions: [
    { 
      label: 'Undo', 
      onClick: ({ hide }) => hide() 
    }
  ]
})
```

## API Methods

### `notify(message, options?)`
Shows a default toast.

### `success(message, options?)`
Shows a success toast (green brand).

### `error(message, options?)`
Shows an error toast (red brand).

### `warning(message, options?)`
Shows a warning toast (orange brand).

### `info(message, options?)`
Shows an info toast (blue brand).

### `create(options)`
Low-level method to create a notification instance manually.

## Options

The `options` object supports all `NBanner` and `NToast` props:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | `number` | `3000` | Auto-hide delay in ms. |
| `position` | `string` | `'top-center'` | Screen position. |
| `showProgress` | `boolean` | `true` | Show a progress bar for the duration. |
| `overlay` | `boolean` | `false` | Show a background overlay. |
| `persistent` | `boolean` | `false` | Prevent auto-closing and user dismissal (if configured). |
| `actions` | `Array` | - | Custom buttons. Each action can have an `onClick` handler. |
| `bannerClass` | `string` | - | Classes for the inner `NBanner`. |
| `icon` | `string` | - | Icon to display. |

## Recipes & FAQ

### Can I force a notification to stay open?
Yes, set `duration` to `0`. The notification will stay visible until the user manually closes it or `hide()` is called programmatically.

```javascript
notify('Important Update', { duration: 0 })
```

### How do I update a notification that is already showing?
`useNotify` currently creates a *new* notification instance each time you call it. To update an existing one, you would typically `hide()` the old one (if you kept its reference) and show a new one.

### Can I use HTML in the message?
Yes, the `message` string is rendered as HTML. Ensure you sanitize any user input.

```javascript
success('Profile <strong>updated</strong> successfully.')
```
