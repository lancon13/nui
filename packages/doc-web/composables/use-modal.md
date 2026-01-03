# useModal

A composable to programmatically create and control modals.

## Basic Usage

<script setup>
import { useModal, NButton, NCard } from '@nui/ui'
import { h } from 'vue'

const { create, loading } = useModal()

const showSimple = async () => {
    const m = await create({
        content: 'Programmatic modal content!',
        class: 'p-8 bg-surface rounded shadowed'
    })
    m.show()
}

const showLoading = async () => {
    const loader = await loading('mdi-sync', 'Please wait...', {
        loadingClass: 'text-5xl animate-spin'
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
  const m = await create({ content: 'Hello' })
  m.show()
}
</script>
```

## API Methods

### `create(options)`
Creates a modal instance. Returns an object with `show()` and `hide()`.

### `loading(icon, message, options?)`
A specialized helper to show a persistent loading modal.

## Options

Supports all props from [NModal](../components/modal), plus:

| Property | Type | Description |
| --- | --- | --- |
| `content` | `string \| VNode \| VNode[]` | The content to render inside the modal. |
