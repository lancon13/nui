# Theming

NUI is powered by Tailwind CSS v4 and uses CSS variables for easy customization.

## Core Colors

You can override these colors in your root CSS file:

```css
@layer base {
  :root {
    --color-brand: #3eaf7c;
    --color-success: #2ecc71;
    --color-error: #e74c3c;
    --color-warning: #f1c40f;
    --color-info: #3498db;
  }
}
```

## Surfaces

NUI uses a "surface" system for components like Cards. Surfaces support automatic indentation coloring when nested.

| Variable | Description |
| --- | --- |
| `--color-surface` | Base surface color (Cards, Modals). |
| `--color-surface-indent` | Color for nested surfaces. |
| `--color-background` | Global app background. |

## Typography

Text colors are controlled via:

- `--color-text`: Primary text.
- `--color-text-light`: Secondary/muted text.
- `--color-text-invert`: Text used on dark backgrounds (e.g., inside primary buttons).
