# Tabs

Tabs allow users to switch between different views or functional aspects.

<script setup>
import { ref } from 'vue'
const activeTab = ref('tab1')
</script>

## Basic Usage

<div class="my-4 vp-raw">
    <NTabs v-model="activeTab">
        <NTab name="tab1">Home</NTab>
        <NTab name="tab2">Profile</NTab>
        <NTab name="tab3">Messages</NTab>
    </NTabs>
    <div class="mt-4 p-4 border border-border rounded">
        Active: {{ activeTab }}
    </div>
</div>

```vue
<NTabs v-model="active">
  <NTab name="home">Home</NTab>
  <NTab name="profile">Profile</NTab>
</NTabs>
```

## Variants

<div class="flex flex-col gap-8 my-4 vp-raw">
    <NTabs v-model="activeTab" class="active-bottom-line brand">
        <NTab name="tab1">Bottom Line</NTab>
        <NTab name="tab2">Tab 2</NTab>
    </NTabs>

    <NTabs v-model="activeTab" class="separator">
        <NTab name="tab1">Separator</NTab>
        <NTab name="tab2">Tab 2</NTab>
    </NTabs>

    <NTabs v-model="activeTab" class="individual gap-2">
        <NTab name="tab1">Individual</NTab>
        <NTab name="tab2">Tab 2</NTab>
    </NTabs>
</div>

```vue
<NTabs class="active-bottom-line brand">...</NTabs>
<NTabs class="separator">...</NTabs>
<NTabs class="individual gap-2">...</NTabs>
```

## Icons

<div class="my-4 vp-raw">
    <NTabs v-model="activeTab" class="brand">
        <NTab name="tab1" icon="mdi-home">Home</NTab>
        <NTab name="tab2" icon="mdi-account">Profile</NTab>
    </NTabs>
</div>

```vue
<NTab icon="mdi-home">Home</NTab>
```

## Props (NTabs)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string \| Array` | - | Active tab name(s). |
| `multiple` | `boolean` | `false` | Allow multiple tabs to be active. |
| `tag` | `string` | `'div'` | Wrapper tag. |

## Props (NTab)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | - | Unique identifier for the tab. |
| `label` | `string` | - | Tab label (if not using slot). |
| `icon` | `string` | - | Leading icon. |
| `disabled` | `boolean` | `false` | Disable tab. |
| `loading` | `boolean` | `false` | Show loading spinner. |
| `to` | `string \| object` | - | Router link (acts as navigation). |

## Slots (NTab)

| Slot | Description |
| --- | --- |
| `default` | Tab label content. |
| `prepend` | Before label. |
| `append` | After label. |
