# useNotify

A composable to programmatically show toast notifications.

## Basic Usage

<script setup>
import { useNotify, NButton } from '@nui/ui'

const { notify, success, error } = useNotify()

const showNotify = () => notify('This is a default notification!')
const showSuccess = () => success('Settings saved successfully!')
const showError = () => error('Failed to upload file.')
</script>

<div class="flex flex-wrap gap-4 my-4 vp-raw">
    <NButton label="Default" @click="showNotify" />
    <NButton label="Success" class="success" @click="showSuccess" />
    <NButton label="Error" class="error" @click="showError" />
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

## API Methods

### `notify(message, options?)`
Shows a default toast.

### `success(message, options?)`
Shows a success toast (green).

### `error(message, options?)`
Shows an error toast (red).

### `warning(message, options?)`
Shows a warning toast (yellow).

### `info(message, options?)`
Shows an info toast (blue).

## Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | `number` | `3000` | Auto-hide delay in ms. |
| `position` | `string` | `'top-center'` | Screen position. |
| `showProgress` | `boolean` | `true` | Show a progress bar for the duration. |
| `actions` | `Array` | - | Custom buttons for the notification. |
