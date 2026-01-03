# Image

The Image component provides a robust way to display images with built-in support for responsive aspect ratios, lazy loading, error handling, and custom placeholders.

## Basic Usage

A simple image with default settings.

<div class="my-4 vp-raw">
    <div class="w-64">
        <NImage src="https://picsum.photos/id/237/400/300" alt="A black dog" />
    </div>
</div>

```vue
<NImage src="https://picsum.photos/id/237/400/300" alt="A black dog" />
```

## Local Static Images

You can reference images stored locally within your documentation project. Vite will automatically bundle and optimize these assets.

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 vp-raw">
    <div>
        <span class="label-text mb-2 block uppercase opacity-60">Local SVG Square</span>
        <NImage src="./assets/sample-square.svg" aspect-ratio="1/1" />
    </div>
    <div>
        <span class="label-text mb-2 block uppercase opacity-60">Local SVG Wide</span>
        <NImage src="./assets/sample-widescreen.svg" aspect-ratio="16/9" />
    </div>
    <div>
        <span class="label-text mb-2 block uppercase opacity-60">Local SVG Portrait</span>
        <NImage src="./assets/sample-portrait.svg" aspect-ratio="3/4" />
    </div>
</div>

```vue
<!-- Using relative paths -->
<NImage src="./assets/sample-square.svg" aspect-ratio="1/1" />
<NImage src="./assets/sample-widescreen.svg" aspect-ratio="16/9" />
```

## Aspect Ratio

Forcing an aspect ratio is a common requirement for grid layouts to prevent layout shifts.

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 vp-raw">
    <div>
        <span class="label-text mb-2 block uppercase opacity-60">Square (1/1)</span>
        <NImage src="https://picsum.photos/id/10/400/400" aspect-ratio="1/1" />
    </div>
    <div>
        <span class="label-text mb-2 block uppercase opacity-60">Widescreen (16/9)</span>
        <NImage src="https://picsum.photos/id/10/600/400" aspect-ratio="16/9" />
    </div>
    <div>
        <span class="label-text mb-2 block uppercase opacity-60">Portrait (3/4)</span>
        <NImage src="https://picsum.photos/id/10/300/400" aspect-ratio="3/4" />
    </div>
</div>

```vue
<NImage aspect-ratio="1/1" src="..." />
<NImage aspect-ratio="16/9" src="..." />
<NImage aspect-ratio="3/4" src="..." />
```

## Fit Modes

The `fit` prop determines how the image should resize to fit its container. To make the differences obvious, we are using a **Widescreen (16:9)** image inside a **Fixed Height (h-48)** container.

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-4 vp-raw">
    <div class="flex flex-col items-center">
        <span class="caption-text uppercase opacity-60 mb-2">object-cover</span>
        <div class="h-48 w-full bg-brand/10 border border-brand/20 rounded overflow-hidden">
            <NImage src="https://picsum.photos/id/20/800/450" fit="cover" width="100%" height="100%" />
        </div>
    </div>
    <div class="flex flex-col items-center">
        <span class="caption-text uppercase opacity-60 mb-2">object-contain</span>
        <div class="h-48 w-full bg-brand/10 border border-brand/20 rounded overflow-hidden">
            <NImage src="https://picsum.photos/id/20/800/450" fit="contain" width="100%" height="100%" />
        </div>
    </div>
    <div class="flex flex-col items-center">
        <span class="caption-text uppercase opacity-60 mb-2">object-fill</span>
        <div class="h-48 w-full bg-brand/10 border border-brand/20 rounded overflow-hidden">
            <NImage src="https://picsum.photos/id/20/800/450" fit="fill" width="100%" height="100%" />
        </div>
    </div>
    <div class="flex flex-col items-center">
        <span class="caption-text uppercase opacity-60 mb-2">object-none</span>
        <div class="h-48 w-full bg-brand/10 border border-brand/20 rounded overflow-hidden">
            <NImage src="https://picsum.photos/id/20/800/450" fit="none" width="100%" height="100%" />
        </div>
    </div>
    <div class="flex flex-col items-center">
        <span class="caption-text uppercase opacity-60 mb-2">object-scale-down</span>
        <div class="h-48 w-full bg-brand/10 border border-brand/20 rounded overflow-hidden">
            <NImage src="https://picsum.photos/id/20/800/450" fit="scale-down" width="100%" height="100%" />
        </div>
    </div>
</div>

```vue
<!-- Container must have a defined height for object-fit to be visible -->
<div class="h-48 w-full overflow-hidden">
  <NImage src="..." fit="contain" width="100%" height="100%" />
</div>
```

## Lazy Loading

Optimize performance by only loading images when they are about to enter the viewport.

<div class="my-4 vp-raw">
    <NCard class="h-64 overflow-auto border border-border">
        <div class="n-card-body">
            <p class="body-text mb-4">Scroll down to trigger loading...</p>
            <div class="h-96 bg-surface-indent flex items-center justify-center label-text opacity-20 mb-4">
                SPACER
            </div>
            <div class="w-64">
                <NImage src="https://picsum.photos/800/600?lazy=1" lazy aspect-ratio="4/3" />
            </div>
        </div>
    </NCard>
</div>

```vue
<!-- Uses Intersection Observer to defer loading -->
<NImage src="..." lazy :threshold="0.1" />
```

## Error Handling

Gracefully handle broken image links with a custom error state.

<div class="my-4 vp-raw">
    <div class="w-64">
        <NImage src="https://broken-link.com/image.jpg" aspect-ratio="16/9" />
    </div>
</div>

```vue
<NImage src="invalid-url" />

<!-- Custom Error Slot -->
<NImage src="invalid-url">
  <template #error>
    <div class="bg-error-light text-error p-4 text-center">
       <NIcon name="mdi-alert" />
       <p class="caption-text">Image failed to load</p>
    </div>
  </template>
</NImage>
```

## Custom Placeholder

You can replace the default loading spinner with custom content. Use the `loading` prop to keep it visible while testing your design.

<script setup>
import { ref } from 'vue'
const isPlaceholderVisible = ref(true)
const isManualLoading = ref(true)
</script>

<div class="my-4 vp-raw flex flex-col items-center gap-4">
    <div class="w-64">
        <NImage src="https://picsum.photos/id/237/800/600" aspect-ratio="16/9" :loading="isPlaceholderVisible">
            <template #placeholder>
                <div class="w-full h-full flex flex-col items-center justify-center bg-brand/10 text-brand">
                    <NLoading class="text-3xl mb-2" />
                    <span class="caption-text font-bold uppercase">Processing Image...</span>
                </div>
            </template>
        </NImage>
    </div>
    <NButton 
        :label="isPlaceholderVisible ? 'Hide Placeholder' : 'Show Placeholder'" 
        class="brand"
        @click="isPlaceholderVisible = !isPlaceholderVisible" 
    />
</div>

```vue
<NImage :loading="true">
  <template #placeholder>
    <div class="custom-loader">
       <NLoading />
       <span>Loading...</span>
    </div>
  </template>
</NImage>
```

## Manual Loading Control

Sometimes you want to keep the loading state active even after the image has loaded.

<div class="my-4 vp-raw flex flex-col items-center gap-4">
    <div class="w-64">
        <NImage 
            src="https://picsum.photos/id/237/400/300" 
            :loading="isManualLoading" 
            loadingName="mdi-sync"
            loadingClass="text-brand text-4xl"
            aspect-ratio="4/3" 
        />
    </div>
    <NButton 
        :label="isManualLoading ? 'Finish Loading' : 'Reset Demo'" 
        class="brand"
        @click="isManualLoading = !isManualLoading" 
    />
</div>

```vue
<NImage :loading="true" loadingName="mdi-sync" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | **Required** | Source URL of the image. |
| `alt` | `string` | `''` | Alternative text for accessibility. |
| `srcset` | `string` | - | Native `srcset` attribute for responsive images. |
| `sizes` | `string` | - | Native `sizes` attribute. |
| `lazy` | `boolean` | `false` | Enable lazy loading via Intersection Observer. |
| `aspectRatio` | `string` | - | Force a specific aspect ratio (e.g. `'16/9'`). |
| `fit` | `string` | `'cover'` | CSS object-fit mode: `cover`, `contain`, `fill`, `none`, `scale-down`. |
| `width` | `string \| number` | - | Container width. |
| `height` | `string \| number` | - | Container height. |
| `containerClass` | `string \| object \| Array` | - | Classes for the root wrapper. |
| `placeholderClass` | `string \| object \| Array` | - | Classes for the loading container. |
| `errorClass` | `string \| object \| Array` | - | Classes for the error container. |
| `threshold` | `number` | `0.1` | Intersection Observer threshold for lazy loading. |
| `loading` | `boolean` | `false` | Manually force the loading state. |
| `loadingName` | `string` | `'loading'` | Icon name for the default loader. |
| `loadingClass` | `string \| object \| Array` | - | Classes for the default loader icon. |

## Slots

| Slot | Description |
| --- | --- |
| `placeholder` | Custom content to show while the image is loading. |
| `error` | Custom content to show if the image fails to load. |

## Events

| Event | Description |
| --- | --- |
| `load` | Emitted when the image successfully loads. |
| `error` | Emitted when the image fails to load. |

## Recipes & FAQ

### Image inside a Card (Gallery)
Common pattern for product or article cards.

<div class="my-4 vp-raw">
    <NCard class="w-64 shadowed p-0">
        <NImage src="https://picsum.photos/id/20/400/300" aspect-ratio="16/9" />
        <div class="n-card-body">
            <h3 class="label-text mb-1">Card with Image</h3>
            <p class="caption-text opacity-70">Perfect for galleries and grids.</p>
        </div>
    </NCard>
</div>

```vue
<NCard class="p-0">
  <NImage src="..." aspect-ratio="16/9" />
  <div class="n-card-body">
    <h3 class="label-text">Title</h3>
  </div>
</NCard>
```

### How do I use local static images?
In a VitePress project (like this documentation), you have two main ways to use local images:

1.  **Public Folder:** Place your images in `.vitepress/public/`. You can then reference them using an absolute path from the root.
    *   File: `.vitepress/public/logo.png`
    *   Usage: `<NImage src="/logo.png" />`

2.  **Relative Paths:** Place your images near your markdown files and reference them relatively. Vite will automatically process and bundle these images.
    *   File: `components/assets/my-image.jpg`
    *   Usage: `<NImage src="./assets/my-image.jpg" />`

### Why is my image height zero?
If you use `aspect-ratio` without specifying a `width`, `NImage` defaults the width to `100%` to ensure the height can be calculated. If the parent container also has no width, the image might not be visible.

### How do I use a custom spinner?
You can use the `#placeholder` slot or simply change the icon name via `loading-name`.
```vue
<NImage loading-name="mdi-sync" loading-class="animate-spin" />
```