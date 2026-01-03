# Utilities & Helpers

NUI provides a set of lightweight utility classes to help with common layout and state tasks without writing custom CSS.

## Spacer (.n-space)

The `.n-space` class is a simple helper that applies `flex-grow: 1`. It is extremely useful in flex containers to push elements apart.

<div class="flex items-center p-4 border border-border rounded bg-surface my-4 vp-raw">
    <span class="label-text">Logo / Brand</span>
    <div class="n-space"></div>
    <div class="flex gap-2">
        <NButton size="xs" label="Home" class="texted" />
        <NButton size="xs" label="Settings" class="texted" />
    </div>
</div>

```vue
<div class="flex items-center">
  <span class="label-text">Left content</span>
  <div class="n-space"></div>
  <span class="label-text">Right content</span>
</div>
```

## Separators (.n-separator, .n-divider)

Use `.n-separator` or `.n-divider` to create consistent visual breaks. They automatically use the theme's border color.

### Horizontal

The default behavior creates a horizontal line with a bottom border.

<div class="flex flex-col gap-2 my-4 vp-raw">
    <p class="body-text">Section Above</p>
    <div class="n-separator"></div>
    <p class="body-text">Section Below</p>
</div>

```vue
<div class="n-separator"></div>
```

### Vertical

Add the `.n-vertical` class to create a vertical line. Ensure the parent container has a height or uses `items-stretch`.

<div class="flex items-center gap-4 h-10 my-4 vp-raw">
    <NButton icon="mdi-format-align-left" class="icon texted" />
    <div class="n-separator n-vertical"></div>
    <NButton icon="mdi-format-align-center" class="icon texted" />
    <div class="n-separator n-vertical"></div>
    <NButton icon="mdi-format-align-right" class="icon texted" />
</div>

```vue
<div class="flex items-center h-10">
  <NButton icon="..." />
  <div class="n-separator n-vertical"></div>
  <NButton icon="..." />
</div>
```

## Placeholders (.n-placeholder)

The `.n-placeholder` class turns any element into a "Skeleton" loader. It hides existing text, applies a neutral background color, and adds a pulsing animation.

### Text Placeholders

Apply it directly to typography elements to maintain the correct layout while data is loading.

<div class="flex flex-col gap-4 my-4 vp-raw w-80">
    <h3 class="sub-title-text n-placeholder">Heading Placeholder</h3>
    <p class="body-text n-placeholder">This is a paragraph acting as a placeholder during a loading state to prevent layout shift.</p>
</div>

```vue
<h1 class="title-text n-placeholder">Loading Title</h1>
<p class="body-text n-placeholder">Longer description text that is pending...</p>
```

### Complex Layouts

You can combine utility classes to build full skeleton screens.

<div class="flex gap-4 my-4 vp-raw p-4 border border-border rounded bg-surface w-80">
    <div class="w-12 h-12 rounded-full n-placeholder shrink-0"></div>
    <div class="flex-1 flex flex-col gap-3">
        <div class="h-4 w-full n-placeholder"></div>
        <div class="h-4 w-2/3 n-placeholder"></div>
    </div>
</div>

```vue
<div class="flex gap-4">
  <div class="w-12 h-12 rounded-full n-placeholder"></div>
  <div class="flex-1">
    <div class="h-4 w-full n-placeholder mb-2"></div>
    <div class="h-4 w-2/3 n-placeholder"></div>
  </div>
</div>
```

### Component Support

Placeholders work on NUI components as well, maintaining their shape and size.

<div class="flex gap-4 my-4 vp-raw">
    <NButton class="n-placeholder" label="Button" />
    <NChip class="n-placeholder" label="Chip" />
    <NAvatar class="n-placeholder" />
</div>

```vue
<NButton class="n-placeholder" label="Action" />
```

## Recipes & FAQ

### When should I use .n-space vs gap?
Use `gap` (e.g., `gap-4`) when you want even spacing between all items in a list. Use `.n-space` when you want to group items on either side of a container (like a logo on the left and navigation on the right).

### Why doesn't my vertical separator show up?
Vertical separators (`.n-separator.n-vertical`) rely on having a defined height to be visible.
- If your flex container uses `items-stretch` (default), it will fill the height automatically.
- If not, you must manually provide a height utility like `h-10` or `h-full` to the separator or its container.

### Can I change the separator color?
By default, it uses the theme's `--color-border`. You can override this using Tailwind border color utilities:
```vue
<div class="n-separator border-brand/50"></div>
```

### Accessibility and Placeholders
When using `.n-placeholder`, keep in mind that the content is still technically in the DOM but hidden visually.
- **Screen Readers:** Screen readers may still read the "placeholder" text. It is recommended to add `aria-hidden="true"` to your skeleton components.
- **Buttons:** If you apply `.n-placeholder` to an `NButton`, remember to also apply the `disabled` prop to prevent users from interacting with a loading state.

### Using .n-space vertically
While primarily used for horizontal layouts, `.n-space` works in `flex-col` containers to push content to the top and bottom.
```vue
<div class="flex flex-col h-full">
  <header>Header</header>
  <div class="n-space"></div>
  <footer>Footer</footer>
</div>
```

