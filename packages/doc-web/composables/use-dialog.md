# useDialog

A composable to programmatically create dialogs, alerts, and confirmations.

## Basic Usage

<script setup>
import { useDialog, NButton } from '@nui/ui'

const { alert, confirm } = useDialog()

const showAlert = () => alert('Hello', 'This is an alert message!')
const showConfirm = async () => {
    const result = await confirm('Are you sure?', 'This action cannot be undone.')
    alert('Result', `You clicked: ${result}`)
}
</script>

<div class="flex gap-4 my-4 vp-raw">
    <NButton label="Show Alert" @click="showAlert" />
    <NButton label="Show Confirm" class="outlined brand" @click="showConfirm" />
</div>

```vue
<script setup>
import { useDialog } from '@nui/ui'
const { alert, confirm } = useDialog()

const handleClick = async () => {
  const result = await confirm('Title', 'Message')
  if (result === 'ok') {
    // ...
  }
}
</script>
```

## API Methods

### `alert(title, message, options?)`
Shows a simple alert dialog with an "OK" button. Returns a promise that resolves when closed.

### `confirm(title, message, options?)`
Shows a confirmation dialog with "Cancel" and "OK" buttons. Returns a promise that resolves to `'ok'`, `'cancel'`, or `null`.

### `create(options)`
Create a highly customized dialog. Returns an object with `show()` and `hide()` methods.

## Options

The `options` object for `create` and helpers supports:

| Property | Type | Description |
| --- | --- | --- |
| `title` | `string` | Dialog title. |
| `content` | `string \| VNode` | Dialog body content. |
| `actions` | `Array` | List of button props for the footer. |
| `overlay` | `boolean` | Whether to show background overlay. |
| `cardClass` | `string` | CSS classes for the inner NCard. |
| `closeButton` | `boolean` | Show a close icon in the header. |
