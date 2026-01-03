# List

Lists are used to display rows of information, such as user profiles, settings, or logs.

<script setup>
import { ref } from 'vue'

const items = [
    { content: 'Inbox', icon: 'mdi-inbox' },
    { content: 'Sent', icon: 'mdi-send' },
    { content: 'Trash', icon: 'mdi-delete' }
]
</script>

## Basic Usage

<div class="w-64 my-4 border border-border rounded bg-surface vp-raw">
    <NList>
        <NListItem>Option 1</NListItem>
        <NListItem>Option 2</NListItem>
        <NListItem>Option 3</NListItem>
    </NList>
</div>

```vue
<NList>
  <NListItem>Option 1</NListItem>
  <NListItem>Option 2</NListItem>
</NList>
```

## Icons & Links

<div class="w-64 my-4 border border-border rounded bg-surface vp-raw">
    <NList>
        <NListItem icon="mdi-account" href="#">Profile</NListItem>
        <NListItem icon="mdi-cog" href="#">Settings</NListItem>
        <NListItem icon="mdi-logout" class="text-error">Logout</NListItem>
    </NList>
</div>

```vue
<NListItem icon="mdi-account" href="/profile">Profile</NListItem>
```

## Data Driven

You can pass an array of items directly to `NList`.

<div class="w-64 my-4 border border-border rounded bg-surface vp-raw">
    <NList :items="items" />
</div>

```vue
<NList :items="items" />
```

## Expandable & Nested

<div class="w-64 my-4 border border-border rounded bg-surface vp-raw">
    <NList>
        <NListItem icon="mdi-folder" expandable>
            Documents
            <template #content>
                <NList class="pl-4 bg-surface-indent">
                    <NListItem icon="mdi-file">Resume.pdf</NListItem>
                    <NListItem icon="mdi-file">Notes.txt</NListItem>
                </NList>
            </template>
        </NListItem>
        <NListItem icon="mdi-star">Favorites</NListItem>
    </NList>
</div>

```vue
<NListItem expandable>
  Parent
  <template #content>
    <NList>...</NList>
  </template>
</NListItem>
```

## Props (NList)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | `string` | `'ul'` | HTML tag. |
| `items` | `Array` | - | Array of item objects. |
| `valueField` | `string` | `'value'` | Field for key/id. |
| `childrenField` | `string` | `'children'` | Field for nested items. |
| `contentField` | `string` | `'content'` | Field for display text. |

## Props (NListItem)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | `string` | `'li'` | HTML tag. |
| `icon` | `string` | - | Leading icon. |
| `prependIcon` | `string` | - | Alias for icon. |
| `appendIcon` | `string` | - | Trailing icon. |
| `to` | `string \| object` | - | Vue Router link. |
| `href` | `string` | - | External link. |
| `disabled` | `boolean` | `false` | Disable interaction. |
| `expandable` | `boolean` | `false` | Enable accordion behavior. |
| `heading` | `boolean` | `false` | Style as a section heading. |

## Slots (NList)

| Slot | Description |
| --- | --- |
| `default` | List content. |
| `item` | Custom item renderer (scoped: `{ item }`). |
| `item-content` | Custom content inside auto-generated items. |
| `empty` | Custom empty state. |

## Slots (NListItem)

| Slot | Description |
| --- | --- |
| `default` | Main content. |
| `prepend` | Before content (icon area). |
| `append` | After content. |
| `content` | Expanded content (if `expandable`). |