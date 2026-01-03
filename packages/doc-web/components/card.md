# Card

Cards are versatile containers used to group related content and actions. They support structured layouts with headers, bodies, and footers, as well as automatic styling for nested cards.

## Basic Usage

By default, any content passed to `NCard` is automatically wrapped in a padded body container.

<div class="my-4 vp-raw">
    <NCard class="w-96">
        <p class="body-text">This is a simple card with default padding.</p>
    </NCard>
</div>

```vue
<NCard>
  <p class="body-text">This is a simple card with default padding.</p>
</NCard>
```

## Structured Layout

For more complex content, use the built-in layout classes: `.n-card-header`, `.n-card-body`, and `.n-card-footer`.

<div class="my-4 vp-raw">
    <NCard class="w-96">
        <div class="n-card-header">
            <h3 class="sub-title-text">Card Header</h3>
        </div>
        <div class="n-card-body">
            <p class="body-text">This is the main body content of the card.</p>
        </div>
        <div class="n-card-footer justify-end">
            <NButton label="Action" size="sm" class="brand" />
        </div>
    </NCard>
</div>

```vue
<NCard>
  <div class="n-card-header">
    <h3 class="sub-title-text">Card Header</h3>
  </div>
  <div class="n-card-body">
    <p class="body-text">This is the main body content of the card.</p>
  </div>
  <div class="n-card-footer justify-end">
    <NButton label="Action" size="sm" class="brand" />
  </div>
</NCard>
```

## Complex Examples

### Card with Hero Image

You can place an image or a colored block in the header with no padding by adding `p-0` to the header.

<div class="my-4 vp-raw">
    <NCard class="w-96 shadowed">
        <div class="n-card-header p-0">
            <div class="w-full h-40 bg-brand text-text-invert flex items-center justify-center label-text uppercase tracking-widest">
                HERO IMAGE / BANNER
            </div>
        </div>
        <div class="n-card-header">
            <h1 class="sub-title-text">Article Title</h1>
        </div>
        <div class="n-card-body">
            <p class="caption-text opacity-80">The card system supports complex nested layouts and automatic indentation colors.</p>
        </div>
        <div class="n-card-footer justify-end pt-4">
            <NButton label="Read More" class="texted brand" />
        </div>
    </NCard>
</div>

```vue
<NCard class="shadowed">
  <div class="n-card-header p-0">
    <img src="..." class="w-full h-40 object-cover" />
  </div>
  <div class="n-card-header">
    <h1 class="sub-title-text">Article Title</h1>
  </div>
  <div class="n-card-body">
    <p class="body-text">Summary text goes here...</p>
  </div>
  <div class="n-card-footer justify-end">
    <NButton label="Read More" class="texted brand" />
  </div>
</NCard>
```

## Nesting & Indentation

NUI Cards have a unique feature: when cards are nested inside the `.n-card-body` of another card, they automatically adjust their background color to create visual depth.

<div class="my-4 vp-raw">
    <NCard class="w-full">
        <div class="n-card-header label-text">Level 1 (Surface)</div>
        <div class="n-card-body content-col">
            <NCard>
                <div class="n-card-header label-text">Level 2 (Indent)</div>
                <div class="n-card-body">
                    <NCard>
                        <div class="n-card-header label-text">Level 3 (Indent-Indent)</div>
                        <div class="n-card-body">
                            <p class="body-text">Deeply nested card content.</p>
                        </div>
                    </NCard>
                </div>
            </NCard>
        </div>
    </NCard>
</div>

```vue
<NCard>
  <div class="n-card-header label-text">Level 1</div>
  <div class="n-card-body">
    <NCard>
      <div class="n-card-header label-text">Level 2</div>
      <div class="n-card-body">
        <NCard>Level 3</NCard>
      </div>
    </NCard>
  </div>
</NCard>
```

## Interactivity

Cards can behave as links or buttons when `href`, `to`, or `@click` is provided.

<div class="my-4 vp-raw">
    <div class="flex gap-4">
        <NCard class="w-48" href="#" @click.prevent>
            <div class="n-card-body text-center label-text">Clickable Link</div>
        </NCard>
        <NCard class="w-48" disabled>
            <div class="n-card-body text-center label-text">Disabled Card</div>
        </NCard>
    </div>
</div>

```vue
<NCard href="https://example.com" target="_blank">
  <span class="label-text">Clickable External Link</span>
</NCard>

<NCard @click="doAction">
  <span class="label-text">Clickable Action Card</span>
</NCard>
```

## Loading State

The `loading` prop shows a persistent overlay with a spinner.

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)
</script>

<div class="my-4 vp-raw flex flex-col items-center gap-4">
    <NCard class="w-96 h-32" :loading="isLoading">
        <div class="n-card-body body-text">This content is hidden by the loader.</div>
    </NCard>
    <NButton :label="isLoading ? 'Stop Loading' : 'Start Loading'" @click="isLoading = !isLoading" />
</div>

```vue
<NCard :loading="true" loadingName="mdi-sync" loadingClass="text-brand">
  Content...
</NCard>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | `string` | `'div'` | HTML tag to use for the root element. |
| `loading` | `boolean` | `false` | Whether to show the loading overlay. |
| `loadingName` | `string` | `'loading'` | Icon name for the loading spinner. |
| `loadingClass` | `string \| Array \| object` | - | CSS classes for the loading spinner. |
| `disabled` | `boolean` | `false` | Disables interaction and applies grayed-out styles. |
| `to` | `string \| object` | - | Vue Router link destination. |
| `href` | `string` | - | Native link destination. |
| `target` | `string` | - | Link target (e.g., `_blank`). |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Main content of the card. Automatically wrapped in `.n-card-body` if structured layout classes aren't detected. |
| `loading` | Custom content for the loading overlay. |

## Events

| Event | Description |
| --- | --- |
| `click` | Emitted when the card is clicked (if interactive and not disabled). |

## Recipes & FAQ

### When does the card automatically add padding?
`NCard` tries to be smart about padding. It will **NOT** wrap your content in an `.n-card-body` div if:
1. Your first child already has the `.n-card-body` class.
2. You provide multiple children (assuming you are using a mix of header/body/footer).

Otherwise, it wraps everything in a padded body for convenience.

### How do I remove the default background or border?
You can use Tailwind utility classes to override the card's styles:
```vue
<NCard class="bg-transparent shadow-none border-none">
  Clean Card
</NCard>
```

### Can I change the indentation colors?
Yes, these are controlled by CSS variables. You can override `--color-surface-indent`, `--color-surface-indent-indent`, etc., in your theme configuration. See the [Theming](../guide/theming) guide.