# useModal

A composable to programmatically create and control modals.

## Basic Usage

<script setup>
import { useModal, NButton } from '@nui/ui'

const { create, loading } = useModal()

const showSimple = async () => {
    const m = await create({
        content: '<div class="p-6 text-center">Hello from programmatic modal!</div>',
        class: 'bg-surface rounded-element shadowed'
    })
    m.show()
}

const showLoading = async () => {
    const loader = await loading('mdi-sync', 'Please wait...', {
        loadingClass: 'text-5xl animate-spin text-brand'
    })
    setTimeout(loader.hide, 2000)
}
</script>

<div class="flex gap-4 my-4 vp-raw">
    <NButton label="Simple Modal" @click="showSimple" />
    <NButton label="Loading Modal" class="outlined brand" @click="showLoading" />
</div>

```vue
<script setup>
import { useModal } from '@nui/ui'
const { create, loading } = useModal()

const openModal = async () => {
  const m = await create({ 
    content: 'Hello World',
    class: 'p-4 bg-white rounded'
  })
  m.show()
}
</script>
```

## API Methods

### `create(options)`
Creates a modal instance. Returns a promise resolving to an object with `show()` and `hide()`.

### `loading(icon, message, options?)`
A specialized helper to show a persistent loading modal. Useful for blocking interactions during async operations.

## Options

Supports all props from [NModal](../components/modal), plus:

| Property | Type | Description |
| --- | --- | --- |
| `content` | `string \| VNode \| VNode[]` | The content to render inside the modal. |
| `class` | `string` | CSS classes applied to the root element of the modal content (if simple string/HTML provided). |
| `loadingClass` | `string` | CSS classes for the loading icon (for `loading` helper). |
| `titleClass` | `string` | CSS classes for the message text (for `loading` helper). |

## Recipes & FAQ

### How do I close the modal programmatically?
The `create` method returns an object with a `hide()` function. You can call this function from anywhere in your closure.

```javascript
const modal = await create({ ... })
modal.show()
// Later...
modal.hide()
```

### Can I render a component inside the modal?
Yes! You can pass a Vue VNode (created with `h`) or an array of VNodes to the `content` option. This allows you to render full components dynamically.

```javascript
import { h } from 'vue'
import MyComponent from './MyComponent.vue'

create({
  content: h(MyComponent, { someProp: 'value' })
})
```

### What's the difference between useModal and useDialog?
- **useDialog** is higher-level and opinionated (Alerts, Confirms, Prompts). It typically renders an `NCard` with a specific structure.
- **useModal** is lower-level. It gives you a blank slate `NModal`. You are responsible for styling the content or providing your own card/wrapper.
