# Tabs

Tabs allow users to switch between different views or functional aspects within a single context.

## Basic Usage

Use `NTabs` as a container and `NTab` for each option. The `v-model` tracks the `name` of the active tab.

<script setup>
import { ref } from 'vue'
const activeTab = ref('tab1')
const multiTabs = ref(['profile'])
const isLoading = ref(true)
</script>

<div class="my-4 vp-raw">
    <NTabs v-model="activeTab">
        <NTab name="tab1" label="Home" />
        <NTab name="tab2" label="Profile" />
        <NTab name="tab3" label="Settings" />
    </NTabs>
    <div class="mt-4 p-4 border border-border rounded bg-surface">
        <p class="body-text">Active Tab: <span class="label-text">{{ activeTab }}</span></p>
    </div>
</div>

```vue
<script setup>
const activeTab = ref('home')
</script>

<template>
  <NTabs v-model="activeTab">
    <NTab name="home" label="Home" />
    <NTab name="profile" label="Profile" />
    <NTab name="settings" label="Settings" />
  </NTabs>
</template>
```

## Variants

Tabs support several visual styles via classes applied to the `NTabs` container.

### Active Bottom Line

The most common tab style, featuring a highlight bar under the active item.

<div class="my-4 vp-raw">
    <NTabs v-model="activeTab" class="active-bottom-line brand">
        <NTab name="tab1" label="Home" />
        <NTab name="tab2" label="Profile" />
        <NTab name="tab3" label="Settings" />
    </NTabs>
</div>

```vue
<NTabs class="active-bottom-line brand">...</NTabs>
```

### Flat, Outlined & Texted

These variants follow the same logic as the [Button](./button) component.

<div class="flex flex-col gap-6 my-4 vp-raw">
    <div>
        <span class="caption-text opacity-60 mb-2 block uppercase">Flat</span>
        <NTabs v-model="activeTab" class="flat brand">
            <NTab name="tab1" label="Home" />
            <NTab name="tab2" label="Profile" />
        </NTabs>
    </div>
    <div>
        <span class="caption-text opacity-60 mb-2 block uppercase">Outlined</span>
        <NTabs v-model="activeTab" class="outlined brand">
            <NTab name="tab1" label="Home" />
            <NTab name="tab2" label="Profile" />
        </NTabs>
    </div>
    <div>
        <span class="caption-text opacity-60 mb-2 block uppercase">Texted</span>
        <NTabs v-model="activeTab" class="texted brand">
            <NTab name="tab1" label="Home" />
            <NTab name="tab2" label="Profile" />
        </NTabs>
    </div>
</div>

## Layout & Spacing

### Separator

Adds a vertical line between non-active tabs.

<div class="my-4 vp-raw">
    <NTabs v-model="activeTab" class="separator brand">
        <NTab name="tab1" label="Home" />
        <NTab name="tab2" label="Profile" />
        <NTab name="tab3" label="Settings" />
    </NTabs>
</div>

```vue
<NTabs class="separator brand">...</NTabs>
```

### Individual (Spaced)

Makes each tab a distinct element with gaps.

<div class="my-4 vp-raw">
    <NTabs v-model="activeTab" class="individual gap-2 brand">
        <NTab name="tab1" label="Home" />
        <NTab name="tab2" label="Profile" />
        <NTab name="tab3" label="Settings" />
    </NTabs>
</div>

```vue
<NTabs class="individual gap-2 brand">...</NTabs>
```

## Colors

All semantic colors are supported.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NTabs v-model="activeTab" class="brand"><NTab name="tab1" label="Brand" /><NTab name="x" label="Tab" /></NTabs>
    <NTabs v-model="activeTab" class="success"><NTab name="tab1" label="Success" /><NTab name="x" label="Tab" /></NTabs>
    <NTabs v-model="activeTab" class="error"><NTab name="tab1" label="Error" /><NTab name="x" label="Tab" /></NTabs>
    <NTabs v-model="activeTab" class="warning"><NTab name="tab1" label="Warning" /><NTab name="x" label="Tab" /></NTabs>
    <NTabs v-model="activeTab" class="info"><NTab name="tab1" label="Info" /><NTab name="x" label="Tab" /></NTabs>
</div>

## Icons

<div class="my-4 vp-raw">
    <NTabs v-model="activeTab" class="active-bottom-line brand">
        <NTab name="tab1" icon="mdi-home" label="Home" />
        <NTab name="tab2" icon="mdi-account" label="Profile" />
        <NTab name="tab3" appendIcon="mdi-cog" label="Settings" />
    </NTabs>
</div>

```vue
<NTab icon="mdi-home" label="Home" />
<NTab appendIcon="mdi-cog" label="Settings" />
```

## Advanced Features

### Multiple Selection

Enable `multiple` to allow selecting more than one tab. The `v-model` becomes an array.

<div class="my-4 vp-raw">
    <NTabs v-model="multiTabs" multiple class="brand separator">
        <NTab name="home" label="Home" />
        <NTab name="profile" label="Profile" />
        <NTab name="settings" label="Settings" />
    </NTabs>
    <div class="mt-2 caption-text">Selected: {{ multiTabs }}</div>
</div>

```vue
<NTabs v-model="selectedArray" multiple>...</NTabs>
```

### Loading & Disabled

<div class="my-4 vp-raw flex flex-col gap-4">
    <NTabs v-model="activeTab" class="brand">
        <NTab name="tab1" label="Normal" />
        <NTab name="p" label="Loading" :loading="isLoading" />
        <NTab name="s" label="Disabled" disabled />
    </NTabs>
    <NButton size="xs" :label="isLoading ? 'Stop' : 'Start'" @click="isLoading = !isLoading" />
</div>

## Navigation Tabs

If you provide `to` or `href`, the tab renders as a link. This is ideal for top-level navigation.

```vue
<NTabs>
  <NTab to="/dashboard" label="Dashboard" />
  <NTab to="/reports" label="Reports" />
  <NTab href="https://google.com" label="External" />
</NTabs>
```

## Tabbed Content View

You can use the `v-model` state to conditionally render content in a container like `NCard`.

<div class="my-4 vp-raw">
    <NTabs v-model="activeTab" class="active-bottom-line brand">
        <NTab name="tab1" label="Overview" />
        <NTab name="tab2" label="Security" />
        <NTab name="tab3" label="Billing" />
    </NTabs>
    <NCard class="mt-2 border border-border">
        <div v-if="activeTab === 'tab1'" class="n-card-body body-text">
            <h3 class="sub-title-text mb-2">Account Overview</h3>
            <p>Welcome back! Here is a summary of your recent activity.</p>
        </div>
        <div v-if="activeTab === 'tab2'" class="n-card-body body-text">
            <h3 class="sub-title-text mb-2">Security Settings</h3>
            <p>Manage your passwords and two-factor authentication.</p>
        </div>
        <div v-if="activeTab === 'tab3'" class="n-card-body body-text">
            <h3 class="sub-title-text mb-2">Billing & Invoices</h3>
            <p>View your plan details and download recent invoices.</p>
        </div>
    </NCard>
</div>

```vue
<script setup>
const active = ref('overview')
</script>

<template>
  <NTabs v-model="active" class="active-bottom-line brand">
    <NTab name="overview" label="Overview" />
    <NTab name="security" label="Security" />
  </NTabs>

  <NCard class="mt-2">
    <div v-if="active === 'overview'">...Content 1...</div>
    <div v-if="active === 'security'">...Content 2...</div>
  </NCard>
</template>
```

## Props (NTabs)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string \| Array` | - | Active tab name(s). |
| `multiple` | `boolean` | `false` | Allow multiple tabs to be active simultaneously. |
| `tag` | `string` | `'div'` | Root HTML tag. |

## Props (NTab)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | - | **Required.** Unique identifier for the tab. |
| `label` | `string` | - | Tab text. |
| `icon` | `string` | - | Leading icon name. |
| `prependIcon` | `string` | - | Alias for `icon`. |
| `appendIcon` | `string` | - | Trailing icon name. |
| `loading` | `boolean` | `false` | Shows loading spinner. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `to` | `string \| object` | - | Vue Router link. |
| `href` | `string` | - | External link URL. |
| `target` | `string` | - | Link target. |

## Slots (NTab)

| Slot | Description |
| --- | --- |
| `default` | Main content (overrides `label`). |
| `prepend` | Content before the label. |
| `append` | Content after the label. |
| `loading` | Custom loading indicator. |

## Events

`NTabs` manages selection internally via click events on its children. No custom events are emitted other than the standard `update:modelValue`.

## Recipes & FAQ

### Keyboard Support
`NTabs` supports standard WAI-ARIA keyboard interaction:
- **Left/Right Arrows:** Move focus between tabs.
- **Home/End:** Move focus to the first or last tab.
- **Space/Enter:** Activate the focused tab.

### Can I render components other than NTab inside NTabs?
No. `NTabs` specifically filters its children to only render `NTab` components. Any other elements will be ignored. This ensures the `tablist` ARIA structure remains valid.

### How do I use Avatars in Tabs?
You can easily place an `NAvatar` inside the default slot.

<div class="my-4 vp-raw">
    <NTabs v-model="activeTab" class="active-bottom-line brand">
        <NTab name="tab1">
            <NAvatar icon="mdi-account" class="text-xs" />
            <span class="ml-1 label-text">User</span>
        </NTab>
        <NTab name="tab2" label="Profile" />
    </NTabs>
</div>

```vue
<NTab name="user">
  <NAvatar icon="mdi-account" />
  <span>User</span>
</NTab>
```