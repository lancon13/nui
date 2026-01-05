# Menu

Menus are versatile dropdown containers used to display a list of actions or navigation links. They support data-driven rendering, nested submenus, and custom layouts.

<script setup>
import { ref } from 'vue'
const menuItems = [
    { content: 'My Account', heading: true },
    { content: 'Profile', icon: 'mdi-account' },
    { content: 'Billing', icon: 'mdi-credit-card' },
    { class: 'my-1 border-t border-border' },
    {
        content: 'Preferences',
        icon: 'mdi-tune',
        items: [
            { content: 'Dark Mode', icon: 'mdi-weather-night' },
            { content: 'Light Mode', icon: 'mdi-weather-sunny' }
        ]
    },
    { content: 'Sign Out', icon: 'mdi-logout', class: 'text-error' }
]
</script>

## Basic Usage

Place `NMenu` inside a trigger component (like `NButton`). It automatically anchors to its parent.

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="brand">
        Open Menu
        <NMenu>
            <NListItem icon="mdi-account">Profile</NListItem>
            <NListItem icon="mdi-cog">Settings</NListItem>
            <NListItem class="my-1 border-t border-border" />
            <NListItem icon="mdi-logout" class="text-error">Logout</NListItem>
        </NMenu>
    </NButton>
</div>

```vue
<NButton class="brand">
  Open Menu
  <NMenu>
    <NListItem icon="mdi-account">Profile</NListItem>
    <NListItem icon="mdi-cog">Settings</NListItem>
    <NListItem class="my-1 border-t border-border" />
    <NListItem icon="mdi-logout" class="text-error">Logout</NListItem>
  </NMenu>
</NButton>
```

## Data Driven

You can pass an array of objects to the `items` prop. `NMenu` handles recursion for nested items automatically.

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="outlined brand">
        Actions
        <NMenu :items="menuItems" />
    </NButton>
</div>

```vue
<script setup>
const menuItems = [
  { content: 'Profile', icon: 'mdi-account' },
  { 
    content: 'Settings', 
    icon: 'mdi-cog',
    items: [
      { content: 'Privacy' },
      { content: 'Security' }
    ]
  }
]
</script>

<template>
  <NButton>
    Menu
    <NMenu :items="menuItems" />
  </NButton>
</template>
```

## Submenus (Nested)

`NMenu` supports deeply nested structures using the `items` prop or by nesting `NMenu` components within `NListItem`s in the slot.

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="brand">
        Nested Slots
        <NMenu>
            <NListItem>Static Item</NListItem>
            <NListItem>
                Submenu Parent
                <NMenu direction="right" position="start" stacked>
                    <NListItem>Sub Item A</NListItem>
                    <NListItem>
                        Deep Nested
                        <NMenu direction="right" position="start" stacked>
                            <NListItem>Level 3 Item 1</NListItem>
                            <NListItem>Level 3 Item 2</NListItem>
                        </NMenu>
                    </NListItem>
                </NMenu>
            </NListItem>
        </NMenu>
    </NButton>
</div>

```vue
<NMenu>
  <NListItem>Item 1</NListItem>
  <NListItem>
    Submenu
    <!-- Use stacked for nested menus -->
    <NMenu direction="right" position="start" stacked>
      <NListItem>Sub Item</NListItem>
    </NMenu>
  </NListItem>
</NMenu>
```

## Trigger Controls

Customize which events open the menu. By default, it responds to hover, focus, and interaction (click).

<div class="my-4 p-8 flex flex-wrap gap-4 items-center justify-center border border-border rounded vp-raw">
    <NButton class="texted brand">
        Click Only
        <NMenu :triggerByHover="false" :triggerByFocus="false">
            <NListItem>Item A</NListItem>
            <NListItem>Item B</NListItem>
        </NMenu>
    </NButton>
    <NButton class="texted brand">
        Hover Only
        <NMenu :triggerByInteraction="false" :triggerByFocus="false">
            <NListItem>Item A</NListItem>
            <NListItem>Item B</NListItem>
        </NMenu>
    </NButton>
</div>

```vue
<!-- Click only -->
<NMenu :triggerByHover="false" :triggerByFocus="false">...</NMenu>

<!-- Hover only -->
<NMenu :triggerByInteraction="false" :triggerByFocus="false">...</NMenu>
```

## Custom Layout

The `listClass` prop allows you to style the inner container for non-standard menu layouts.

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="brand">
        Custom Panel
        <NMenu list-class="p-4 w-72 bg-surface shadowed rounded-lg border border-border">
            <div class="flex flex-col items-center gap-3 text-center">
                <div class="p-3 bg-brand/10 rounded-full text-brand">
                    <NIcon name="mdi-star" class="text-2xl" />
                </div>
                <div>
                    <div class="font-bold text-lg text-text">Upgrade Plan</div>
                    <p class="text-xs text-text-light mt-1">Unlock all features by upgrading your account today.</p>
                </div>
                <NButton class="brand w-full justify-center" label="Upgrade Now" />
            </div>
        </NMenu>
    </NButton>
</div>

```vue
<NMenu list-class="p-4 w-72 bg-surface shadowed border rounded-lg">
  <div class="text-center">
    <h3>Custom Content</h3>
    <NButton label="Action" />
  </div>
</NMenu>
```

## Props

`NMenu` inherits all props from [NPopover](./popover).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `Array` | `[]` | Data-driven menu items. |
| `listTag` | `string` | `'ul'` | HTML tag for the menu container. |
| `listClass` | `string \| object \| Array` | `'bg-surface shadowed'` | CSS classes for the menu container. |
| `valueField` | `string` | `'value'` | Key for unique item identification. |
| `childrenField` | `string` | `'items'` | Key for nested items in data mode. |
| `contentField` | `string` | `'content'` | Key for display text in data mode. |
| `recursiveTriggers` | `boolean` | `false` | Apply trigger settings to all nested submenus. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Menu content (typically `NListItem`s). |
| `item` | Scoped slot to customize item rendering (`{ item }`). |
| `item-content` | Scoped slot for the label part of auto-generated items (`{ item }`). |
| `submenu` | Scoped slot for the submenu part of auto-generated items (`{ item }`). |

## Events

| Event | Description |
| --- | --- |
| `select` | Emitted when a menu item is clicked (`item`). |

## Exposed Methods

| Method | Description |
| --- | --- |
| `popoverRef` | Reference to the internal `NPopover` instance. |

## Recipes & FAQ

### How to add separators?
In slots, add an `NListItem` with custom classes. In data mode, add an item with a divider class.

```javascript
const items = [
  { content: 'Action 1' },
  { class: 'border-t border-border my-1' }, // Separator
  { content: 'Action 2' }
]
```

### Can I use Vue Router links?
Yes, `NListItem` (the default item wrapper) supports `to` and `href` props. In data mode, just include them in your item objects.

### My menu closes too fast on hover?
Check the `hideDelay` prop (inherited from Popover). Increasing it gives the user more time to move the mouse into the menu.
