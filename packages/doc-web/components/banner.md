# Banner

Banners display important messages and related optional actions. They are versatile containers often used for alerts, notifications, or sticky headers.

<script setup>
import { ref } from 'vue'
const showBanner = ref(true)
const showTimer = ref(true)
</script>

## Basic Usage

<div class="my-4 vp-raw">
    <NBanner>This is a default banner message.</NBanner>
</div>

```vue
<NBanner>This is a default banner message.</NBanner>
```

## Colors

Banners support all semantic colors to indicate status.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NBanner class="brand" label="Brand: A new update is available." icon="mdi-star" />
    <NBanner class="success" label="Success: Profile updated." icon="mdi-check-circle" />
    <NBanner class="warning" label="Warning: Storage is low." icon="mdi-alert" />
    <NBanner class="error" label="Error: Connection failed." icon="mdi-alert-circle" />
    <NBanner class="info" label="Info: Read the documentation." icon="mdi-information" />
</div>

```vue
<NBanner class="brand" label="Brand Message" icon="mdi-star" />
<NBanner class="success" label="Success Message" icon="mdi-check-circle" />
```

## Variants

### Flat

Flat banners use a subtle background with colored text.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NBanner class="flat brand" label="Flat Brand" icon="mdi-star" />
    <NBanner class="flat error" label="Flat Error" icon="mdi-alert-circle" />
</div>

```vue
<NBanner class="flat brand" label="Flat Brand" />
```

### Outlined

Outlined banners have a transparent background with a colored border.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NBanner class="outlined brand" label="Outlined Brand" icon="mdi-star" />
    <NBanner class="outlined success" label="Outlined Success" icon="mdi-check" />
</div>

```vue
<NBanner class="outlined brand" label="Outlined Brand" />
```

## Actions

Banners can include action buttons. By default, actions are displayed inline.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <NBanner class="info" label="Update available">
        <template #actions>
            <NButton class="text-xs texted pilled" label="Later" />
            <NButton class="text-xs flat pilled brand" label="Update Now" />
        </template>
    </NBanner>
</div>

```vue
<NBanner class="info" label="Update available">
    <template #actions>
        <NButton class="text-xs texted" label="Later" />
        <NButton class="text-xs flat brand" label="Update" />
    </template>
</NBanner>
```

## Dismissible

You can use `v-model` to control the visibility of the banner.

<div class="my-4 vp-raw">
    <NButton v-if="!showBanner" @click="showBanner = true" label="Reset Banner" class="mb-4" />
    <NBanner v-model="showBanner" class="warning" label="This banner can be closed.">
        <template #actions>
            <NButton icon="mdi-close" class="texted icon" @click="showBanner = false" aria-label="Dismiss" />
        </template>
    </NBanner>
</div>

```vue
<script setup>
    const show = ref(true)
</script>

<template>
    <NBanner v-model="show" class="warning" label="Dismiss me">
        <template #actions>
            <NButton icon="mdi-close" @click="show = false" />
        </template>
    </NBanner>
</template>
```

## Progress & Timer

Banners can have a built-in timer with a progress bar. This is useful for auto-dismissing notifications (like in `NToast`).

<div class="my-4 vp-raw">
    <NButton v-if="!showTimer" @click="showTimer = true" label="Start Timer" class="mb-4" />
    <NBanner 
        v-if="showTimer"
        class="info" 
        label="This banner will close in 5 seconds." 
        :duration="5000" 
        showProgress
        @timer-end="showTimer = false"
    />
</div>

```vue
<NBanner :duration="5000" showProgress @timer-end="handleClose" label="Auto-close in 5s" />
```

## Props

| Prop            | Type                        | Default | Description                                                       |
| --------------- | --------------------------- | ------- | ----------------------------------------------------------------- |
| `v-model`       | `boolean`                   | `true`  | Controls visibility.                                              |
| `label`         | `string`                    | -       | The title/prefix content (supports HTML).                         |
| `icon`          | `string`                    | -       | Icon name (MDI) to display on the left.                           |
| `iconClass`     | `string \| object \| Array` | -       | CSS class for the icon.                                           |
| `labelClass`    | `string \| object \| Array` | -       | CSS class for the label container.                                |
| `actionsClass`  | `string \| object \| Array` | -       | CSS class for the actions container.                              |
| `inlineActions` | `boolean`                   | `true`  | Whether actions should try to stay on the same line.              |
| `duration`      | `number`                    | `0`     | Time in ms before `timer-end` is emitted.                         |
| `showProgress`  | `boolean`                   | `false` | Shows a progress bar (requires `duration` > 0).                   |
| `actions`       | `Array`                     | `[]`    | Array of button props to render as actions (alternative to slot). |
| `tag`           | `string`                    | `'div'` | HTML tag to render.                                               |

## Slots

| Slot       | Description                                        |
| ---------- | -------------------------------------------------- |
| `default`  | Main content (overrides `label`).                  |
| `icon`     | Custom icon content.                               |
| `actions`  | Content for the actions area (usually `NButton`s). |
| `progress` | Custom progress bar content.                       |

## Events

| Event               | Description                                  |
| ------------------- | -------------------------------------------- |
| `update:modelValue` | Emitted when visibility changes.             |
| `timer-begin`       | Emitted when the timer starts.               |
| `timer-end`         | Emitted when the timer finishes.             |
| `timer-pause`       | Emitted when the timer pauses (hover/focus). |
| `timer-resume`      | Emitted when the timer resumes.              |

## Recipes & FAQ

### How do I stack multiple banners?

`NBanner` is just a block element. You can place them inside a flex container with `flex-col` and `gap` to stack them.

### Can I use HTML in the label?

Yes, the `label` prop supports HTML strings (rendered via `v-html`). This is useful for adding simple formatting like `<strong>` or `<span>` directly to the title area.

<div class="my-4 vp-raw">
    <NBanner label="System <span class='text-brand-light opacity-50'>(v1.2.0)</span>" icon="mdi-information" class="brand">
        A new update is available for download.
    </NBanner>
</div>

```vue
<NBanner label="System <span class='text-brand-light opacity-50'>(v1.2.0)</span>" icon="mdi-information" class="brand">
    A new update is available for download.
</NBanner>
```

For more complex rich content or interactive elements, using the default slot is still the recommended approach.

### Does the timer pause on hover?

Yes, `NBanner` includes logic to pause the timer when the user hovers or focuses on the banner, ensuring they have time to read the content.
