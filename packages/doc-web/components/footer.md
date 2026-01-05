# Footer

A semantic wrapper for page or section footers, providing a column flex container by default.

<script setup>
</script>

## Basic Usage

<div class="w-full rounded vp-raw">
    <NFooter class="p-8 bg-surface-indent">
        <div class="flex gap-4">
            <span class="font-bold">Company</span>
            <span class="font-bold">Product</span>
        </div>
        <div class="text-xs text-muted">
            &copy; 2025 NUI System. All rights reserved.
        </div>
    </NFooter>
</div>

```vue
<NFooter class="p-8 bg-surface-indent">
  <div class="flex gap-4">
    <span class="font-bold">Company</span>
    <span class="font-bold">Product</span>
  </div>
  <div class="text-xs text-muted">
    &copy; 2025 NUI System. All rights reserved.
  </div>
</NFooter>
```

## Props

| Prop  | Type     | Default    | Description             |
| ----- | -------- | ---------- | ----------------------- |
| `tag` | `string` | `'footer'` | The HTML tag to render. |

## Slots

| Slot      | Description            |
| --------- | ---------------------- |
| `default` | Content of the footer. |

## Recipes & FAQ

### How do I stick the footer to the bottom of the page?
In a flex column layout (like `min-h-screen flex flex-col`), you can push the footer to the bottom by giving the main content area `flex-1`.

```vue
<div class="min-h-screen flex flex-col">
  <header>...</header>
  <main class="flex-1">...</main>
  <NFooter>...</NFooter>
</div>
```

### Can I change the layout direction?
By default, `NFooter` uses `flex-col` with a gap. You can easily override this with utility classes like `flex-row` if you want a horizontal footer layout.

```vue
<NFooter class="flex-row justify-between items-center">
  <!-- Left -->
  <!-- Right -->
</NFooter>
```
