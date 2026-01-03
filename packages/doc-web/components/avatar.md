# Avatar

Avatars are used to represent people, brands, or entities through images, icons, or initials.

## Basic Usage

Avatars support images, icons, and text labels (initials).

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NAvatar src="https://i.pravatar.cc/150?u=1" />
    <NAvatar icon="mdi-account" />
    <NAvatar label="JD" />
</div>

```vue
<!-- Image -->
<NAvatar src="https://i.pravatar.cc/150?u=1" />

<!-- Icon -->
<NAvatar icon="mdi-account" />

<!-- Label (Initials) -->
<NAvatar label="JD" />
```

## Colors

Avatars come with built-in color variants that match the system's semantic colors.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NAvatar icon="mdi-account" class="primary" />
    <NAvatar icon="mdi-account" class="success" />
    <NAvatar icon="mdi-account" class="error" />
    <NAvatar icon="mdi-account" class="warning" />
    <NAvatar icon="mdi-account" class="info" />
</div>

```vue
<NAvatar icon="mdi-account" class="primary" />
<NAvatar icon="mdi-account" class="success" />
<NAvatar icon="mdi-account" class="error" />
<NAvatar icon="mdi-account" class="warning" />
<NAvatar icon="mdi-account" class="info" />
```

## Shapes & Styles

Customize the appearance using standard NUI utility classes.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NAvatar src="https://i.pravatar.cc/150?u=2" class="pilled" />
    <NAvatar src="https://i.pravatar.cc/150?u=3" class="squared" />
    <NAvatar src="https://i.pravatar.cc/150?u=4" class="shadowed" />
</div>

```vue
<NAvatar class="pilled" src="..." />
<NAvatar class="squared" src="..." />
<NAvatar class="shadowed" src="..." />
```

## Sizes

Avatars are designed to scale with text. Use standard Tailwind `text-*` classes to control the size of the avatar.

<div class="flex flex-row items-end gap-4 my-4 vp-raw">
    <NAvatar icon="mdi-account" class="text-xs" />
    <NAvatar icon="mdi-account" class="text-sm" />
    <NAvatar icon="mdi-account" class="text-base" />
    <NAvatar icon="mdi-account" class="text-lg" />
    <NAvatar icon="mdi-account" class="text-xl" />
    <NAvatar icon="mdi-account" class="text-2xl" />
</div>

```vue
<NAvatar class="text-xs" icon="mdi-account" />
<NAvatar class="text-2xl" icon="mdi-account" />
```

## Interactivity

Avatars can act as buttons or links.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NAvatar icon="mdi-cursor-default-click" class="brand" href="#" @click.prevent />
    <NAvatar src="https://i.pravatar.cc/150?u=5" href="https://google.com" target="_blank" />
    <NAvatar icon="mdi-lock" disabled />
</div>

```vue
<!-- Link -->
<NAvatar href="https://example.com" src="..." />

<!-- Click Event -->
<NAvatar @click="handleAction" icon="mdi-account" />

<!-- Disabled -->
<NAvatar disabled icon="mdi-account" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | - | Image source URL. |
| `alt` | `string` | - | Alt text for the image. Defaults to label if not provided. |
| `icon` | `string` | - | Icon name (MDI). |
| `label` | `string` | - | Text initials to display. |
| `tag` | `string` | `'span'` | HTML tag to use. |
| `disabled` | `boolean` | `false` | Whether the avatar is disabled. |
| `to` | `string \| object` | - | Vue Router link. |
| `href` | `string` | - | External link URL. |
| `target` | `string` | - | Link target (e.g. `_blank`). |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Custom content to display inside (overrides `label`). |

## Events

| Event | Description |
| --- | --- |
| `click` | Emitted when clicked (if not disabled and interactive). |

## Recipes & FAQ

### Avatar inside a Button
Avatars are often used inside buttons for user profiles.

<div class="flex flex-row items-center gap-4 my-4 vp-raw">
    <NButton class="pilled">
        <NAvatar icon="mdi-account" class="text-xl" />
        <span class="mr-2">My Profile</span>
    </NButton>
</div>

```vue
<NButton class="pilled">
    <NAvatar icon="mdi-account" class="text-xl" />
    <span>My Profile</span>
</NButton>
```

### What happens if an image fails to load?
The avatar will fall back to displaying the `icon` or `label` if they are provided. It is a good practice to always provide a fallback icon.

### How do I use a custom size not in Tailwind?
You can use the `style` attribute or an arbitrary Tailwind value:
```vue
<NAvatar class="text-[48px]" icon="mdi-account" />
<!-- or -->
<NAvatar style="font-size: 3rem" icon="mdi-account" />
```