# useDialog <NChip class="text-xs flat brand">@nui/ui</NChip>

A composable to programmatically create dialogs, alerts, confirmations, and prompts.

## Basic Usage

<script setup>
import { useDialog, NButton } from '@nui/ui'

const { alert, confirm, prompt } = useDialog()

const showAlert = () => alert('Hello', 'This is an alert message!')
const showConfirm = async () => {
    const result = await confirm('Are you sure?', 'This action cannot be undone.')
    if (result === 'ok') {
        alert('Confirmed', 'You clicked OK.')
    }
}
const showPrompt = async () => {
    const name = await prompt('Enter Name', 'Please input your name:', 'Guest')
    if (name !== null) {
        alert('Hello', `Welcome, ${name}!`)
    }
}
</script>

<div class="flex gap-4 my-4 vp-raw">
    <NButton label="Alert" @click="showAlert" />
    <NButton label="Confirm" class="outlined brand" @click="showConfirm" />
    <NButton label="Prompt" class="texted brand" @click="showPrompt" />
</div>

```vue
<script setup>
import { useDialog } from '@nui/ui'
const { alert, confirm, prompt } = useDialog()

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
Shows a confirmation dialog with "Cancel" and "OK" buttons. Returns a promise that resolves to `'ok'` or `'cancel'`.

### `prompt(title, message, defaultValue?, options?)`
Shows a dialog with a text input. Returns a promise that resolves to the input string (if confirmed) or `null` (if cancelled).

### `create(options)`
Create a highly customized dialog. Returns an object with `show()` and `hide()` methods.

## Advanced Usage

You can use `create()` for fully custom dialogs with specific roles, actions, and styles.

```vue
<script setup>
import { useDialog } from '@nui/ui'
const { create } = useDialog()

const showCustom = async () => {
  const dialog = await create({
    title: 'Security Warning',
    content: 'Your session is about to expire.',
    role: 'alertdialog',
    actions: [
      { label: 'Logout', class: 'flat', onClick: ({ hide }) => hide() },
      { label: 'Renew Session', class: 'brand', onClick: ({ hide }) => hide() }
    ],
    cardClass: 'w-96 shadowed border-l-4 border-warning'
  })
  dialog.show()
}
</script>
```

## Options

The `options` object for `create` and helpers supports:

| Property | Type | Description |
| --- | --- | --- |
| `title` | `string` | Dialog title. |
| `content` | `string \| VNode` | Dialog body content. |
| `actions` | `Array` | List of button props for the footer. Each action can have an `onClick({ hide })` handler. |
| `overlay` | `boolean` | Whether to show background overlay. |
| `cardClass` | `string` | CSS classes for the inner NCard. |
| `cardHeaderClass` | `string` | CSS classes for the card header. |
| `closeButton` | `boolean` | Show a close icon in the header. |
| `role` | `string` | ARIA role (e.g. `alertdialog`). |
| `loading` | `boolean` | Show loading spinner state. |
| `loadingName` | `string` | Icon name for spinner. |
| `loadingClass` | `string` | Classes for spinner. |

## Recipes & FAQ

### How can I render HTML in the dialog message?
The `content` option supports raw HTML strings. Be careful with user input to avoid XSS vulnerabilities.

```javascript
alert('Terms', 'Please read our <a href="/terms" class="text-brand">Terms of Service</a>.')
```

### Can I change the button labels?
Yes! Use the `actions` option to override the default buttons even for `alert` and `confirm`.

```javascript
confirm('Delete Item?', 'This is permanent.', {
  actions: [
    { label: 'No, Keep It', class: 'flat', onClick: ({ hide }) => hide() },
    { label: 'Yes, Delete', class: 'error', onClick: ({ hide }) => { /* ... */ hide() } }
  ]
})
```

### Does useDialog work inside callbacks?
Yes, `useDialog` returns a promise-based API, making it perfect for use inside `async` functions or event handlers where you need to block execution until the user responds.
