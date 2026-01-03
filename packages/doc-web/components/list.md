# List

Lists are used to display rows of information, such as user profiles, settings, or navigation menus.

## Basic Usage

A simple list of text items. By default, `NList` renders as a `<ul>` and `NListItem` as a `<li>`.

<div class="w-64 my-4 border border-border rounded bg-surface vp-raw">
    <NList>
        <NListItem>
            <span class="body-text">Option 1</span>
        </NListItem>
        <NListItem>
            <span class="body-text">Option 2</span>
        </NListItem>
        <NListItem>
            <span class="body-text">Option 3</span>
        </NListItem>
    </NList>
</div>

```vue
<NList>
  <NListItem>Option 1</NListItem>
  <NListItem>Option 2</NListItem>
</NList>
```

## Interactive Items

Items can act as links or buttons. Hover effects and appropriate ARIA roles are applied automatically.

<div class="w-64 my-4 border border-border rounded bg-surface vp-raw">
    <NList>
        <NListItem icon="mdi-account" href="#" @click.prevent>
            <span class="label-text">Profile</span>
        </NListItem>
        <NListItem icon="mdi-cog" href="#" @click.prevent>
            <span class="label-text">Settings</span>
        </NListItem>
        <NListItem icon="mdi-logout" class="text-error" href="#" @click.prevent>
            <span class="label-text">Logout</span>
        </NListItem>
    </NList>
</div>

```vue
<NListItem icon="mdi-account" href="/profile">Profile</NListItem>
<NListItem icon="mdi-cog" @click="openSettings">Settings</NListItem>
```

## Data Driven

Pass an array of objects to the `items` prop for automatic rendering.

<script setup>
import { ref } from 'vue'
const listItems = [
    { content: 'Dashboard', icon: 'mdi-view-dashboard' },
    { content: 'Analytics', icon: 'mdi-chart-bar' },
    { content: 'Users', icon: 'mdi-account-multiple' }
]

const isExpanded = ref(false)
const itemRef = ref(null)

const toggleManual = () => {
    if (isExpanded.value) itemRef.value?.collapse()
    else itemRef.value?.expand()
}
</script>

<div class="w-64 my-4 border border-border rounded bg-surface vp-raw">
    <NList :items="listItems" />
</div>

```vue
<script setup>
const items = [
    { content: 'Dashboard', icon: 'mdi-view-dashboard' },
    { content: 'Analytics', icon: 'mdi-chart-bar' }
]
</script>

<NList :items="items" />
```

## Grouped with Headings

Use the `heading` prop on `NListItem` to create section separators.

<div class="w-64 my-4 border border-border rounded bg-surface vp-raw">
    <NList>
        <NListItem heading>Personal</NListItem>
        <NListItem icon="mdi-account">Profile</NListItem>
        <NListItem heading>System</NListItem>
        <NListItem icon="mdi-cog">Settings</NListItem>
    </NList>
</div>

```vue
<NList>
  <NListItem heading>Section Title</NListItem>
  <NListItem>Item</NListItem>
</NList>
```

## Expandable & Nested

`NListItem` supports an `expandable` mode. By default, clicking the header toggles the content. You can use `v-model` to track or control this state.

<div class="w-80 my-4 border border-border rounded bg-surface vp-raw">
    <NList>
        <NListItem icon="mdi-folder" expandable v-model="isExpanded">
            <span class="label-text">Documents (State: {{ isExpanded ? 'Open' : 'Closed' }})</span>
            <template #content>
                <NList class="pl-4 bg-surface-indent">
                    <NListItem icon="mdi-file-document">
                        <span class="body-text">Resume.pdf</span>
                    </NListItem>
                    <NListItem icon="mdi-file-excel">
                        <span class="body-text">Budget.xlsx</span>
                    </NListItem>
                </NList>
            </template>
        </NListItem>
    </NList>
</div>

```vue
<script setup>
const isOpen = ref(false)
</script>

<template>
  <NListItem v-model="isOpen" expandable label="My Folder">
    <template #content>
       <NList>...</NList>
    </template>
  </NListItem>
</template>
```

### Manual Control (Methods)

You can also control expansion using the exposed `expand()` and `collapse()` methods via a template ref.

<div class="w-80 my-4 flex flex-col gap-2 vp-raw">
    <div class="flex gap-2">
        <NButton size="xs" label="Manual Expand" @click="itemRef?.expand()" />
        <NButton size="xs" label="Manual Collapse" @click="itemRef?.collapse()" />
    </div>
    <div class="border border-border rounded bg-surface">
        <NList>
            <NListItem ref="itemRef" icon="mdi-cog" expandable>
                <span class="label-text">Settings</span>
                <template #content>
                    <div class="p-2 caption-text">Expanded via button above!</div>
                </template>
            </NListItem>
        </NList>
    </div>
</div>

```vue
<script setup>
const item = ref(null)
</script>

<template>
  <NButton @click="item?.expand()">Open</NButton>
  <NListItem ref="item" expandable>...</NListItem>
</template>
```

## Custom Item Content

Use slots to build rich list items with multiple lines of text or custom components.

<div class="w-80 my-4 border border-border rounded bg-surface vp-raw">
    <NList>
        <NListItem class="items-center">
            <template #prepend>
                <NAvatar class="pilled brand text-xs">JD</NAvatar>
            </template>
            <div class="flex-1 flex flex-col">
                <span class="label-text">John Doe</span>
                <span class="caption-text opacity-60">Software Engineer</span>
            </div>
            <template #append>
                <NIcon name="mdi-chevron-right" class="opacity-40" />
            </template>
        </NListItem>
    </NList>
</div>

```vue
<NListItem>
  <template #prepend>
    <NAvatar label="JD" />
  </template>
  <div class="flex flex-col">
    <span class="label-text">John Doe</span>
    <span class="caption-text">Sub-text</span>
  </div>
</NListItem>
```

## Props (NList)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `Array` | - | Array of objects to render. |
| `tag` | `string` | `'ul'` | The HTML tag for the list container. |
| `valueField` | `string` | `'value'` | Key to use for items (for `v-for`). |
| `childrenField` | `string` | `'children'` | Field containing nested items. |
| `contentField` | `string` | `'content'` | Field containing the display text. |

## Props (NListItem)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean` | `false` | Controls the expansion state (when `expandable` is true). |
| `tag` | `string` | `'li'` | The HTML tag for the item. |
| `icon` | `string` | - | Icon name (MDI). |
| `prependIcon` | `string` | - | Alias for `icon`. |
| `appendIcon` | `string` | - | Icon to show at the end. |
| `expandable` | `boolean` | `false` | Enables click-to-expand behavior. |
| `heading` | `boolean` | `false` | Styles the item as a non-interactive header. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `to` | `string \| object` | - | Vue Router link. |
| `href` | `string` | - | External link. |
| `target` | `string` | - | Link target. |

## Slots (NList)

| Slot | Description |
| --- | --- |
| `default` | Custom content (usually `NListItem` components). |
| `item` | Scoped slot to customize item rendering from data (`{ item }`). |
| `item-content` | Scoped slot for the label part of auto-generated items. |
| `empty` | Content to show when the `items` array is empty. |

## Slots (NListItem)

| Slot | Description |
| --- | --- |
| `default` | The main content of the item. |
| `prepend` | Content before the main content (e.g. avatar). |
| `append` | After the main content. |
| `content` | The collapsible content (required if `expandable` is true). |

## Events (NListItem)

| Event | Description |
| --- | --- |
| `click` | Emitted when the item is clicked (if interactive). |

## Exposed (NListItem)

| Method | Description |
| --- | --- |
| `expand()` | Programmatically expand the item. |
| `collapse()` | Programmatically collapse the item. |

## Recipes & FAQ

### How do I manually control expansion?
You can use `v-model` for data-driven control, or access the component's internal methods (`expand()`, `collapse()`) using a Vue template `ref`. 

**Note:** When using a `ref` on an `NListItem` that is nested inside an `NList`, the library ensures that the reference is preserved even during internal node transformations.

```vue
<script setup>
const myItem = ref(null)
</script>

<template>
  <NButton @click="myItem?.expand()">Open Folder</NButton>
  <NListItem ref="myItem" expandable label="My Folder">...</NListItem>
</template>
```

### Why is expand/collapse not working?
If your list item isn't expanding, check the following:
1.  **Missing `expandable` prop:** Ensure you have added the `expandable` attribute to the `NListItem`.
2.  **Wrong Slot:** Ensure the content you want to hide/show is placed inside the `#content` slot. Content in the `default` slot is always visible (the header).
3.  **Ref usage:** If you are using a template `ref` to call `expand()`, ensure the ref is correctly bound and that the component has finished mounting before calling the method.

```vue
<!-- Correct Structure -->
<NListItem expandable>
  Header content (always visible)
  <template #content>
    Hidden content (toggled on click)
  </template>
</NListItem>
```

### How do I highlight the active item?
Add the `.n-list-item--active` class to an item to apply the brand background color.

### Can I change the indentation level?
Nested lists automatically receive `pl-4`. You can override this with Tailwind padding classes if needed.

### Is the list accessible?
Yes, `NList` uses `role="list"` and `NListItem` uses roles like `listitem`, `button`, or `link` depending on its props. Expandable items also handle `aria-expanded` automatically.