# Header

A semantic wrapper for page or section headers, providing a flex container by default.

<script setup>
</script>

## Basic Usage

<div class="w-full rounded vp-raw">
    <NHeader class="p-4 border-b border-border bg-surface">
        <span class="font-bold text-lg">Logo</span>
        <div class="n-space"></div>
        <NButton label="Login" class="texted" />
        <NButton label="Sign Up" class="brand" />
    </NHeader>
</div>

```vue
<NHeader class="p-4 border-b border-border bg-surface">
  <span class="font-bold text-lg">Logo</span>
  <div class="n-space"></div> <!-- Spacer utility -->
  <NButton label="Login" class="texted" />
  <NButton label="Sign Up" class="brand" />
</NHeader>
```

## Props

| Prop  | Type     | Default    | Description             |
| ----- | -------- | ---------- | ----------------------- |
| `tag` | `string` | `'header'` | The HTML tag to render. |

## Slots

| Slot      | Description            |
| --------- | ---------------------- |
| `default` | Content of the header. |

## Recipes & FAQ

### How do I make the header sticky?
You can use standard Tailwind utility classes. Add `sticky top-0 z-50` to the header. Ensure you also set a background color like `bg-surface` so content doesn't scroll visibly behind it.

```vue
<NHeader class="sticky top-0 z-50 bg-surface border-b border-border p-4">
  <!-- Content -->
</NHeader>
```

### Can I use this inside a Card?
Yes! `NHeader` is just a flex container. While `NCard` has its own `.n-card-header` class, using `NHeader` inside it gives you the component flexibility if needed, though usually standard HTML or the card classes are preferred for cards.
