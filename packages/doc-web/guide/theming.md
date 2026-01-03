# Theming

NUI is powered by Tailwind CSS v4 and uses CSS variables for easy customization. You can override these variables in your project's global CSS file (where you import Tailwind) to match your brand's design system.

## Colors

NUI uses a semantic color system. Each color (except Focus) has a base, light, and dark variant.

### Brand & Status Colors

These control the primary look of buttons, alerts, badges, and other interactive elements.

| Variable | Description | Default (OKLCH/Hex) |
| :--- | :--- | :--- |
| `--color-brand` | Primary brand color. | `oklch(0.65 0.079 250.44)` |
| `--color-brand-light` | Light variant (e.g. hover backgrounds). | Mixed with white |
| `--color-brand-dark` | Dark variant (e.g. active states). | Mixed with black |
| `--color-neutral` | Neutral grays for UI elements. | `oklch(0.65 0 0)` |
| `--color-success` | Success states (green). | `#009d44` |
| `--color-warning` | Warning states (yellow/orange). | `#d58000` |
| `--color-error` | Error/Destructive states (red). | `#a6192e` |
| `--color-info` | Information states (blue). | `#0057b8` |
| `--color-focus` | Ring color for focus states. | `#0066ff` |

### Text & Backgrounds

These control the global application appearance.

| Variable | Description | Default |
| :--- | :--- | :--- |
| `--color-text` | Primary text color. | `oklch(0.25 0 0)` |
| `--color-text-light` | Secondary/Muted text color. | Mixed with white |
| `--color-text-dark` | Darker text variant. | Mixed with black |
| `--color-text-invert` | Text on dark backgrounds (e.g. primary buttons). | High contrast mix |
| `--color-background` | Global page background. | `oklch(0.85 0 0)` |
| `--color-background-invert` | Inverted background (e.g. tooltips). | High contrast mix |

### UI Elements

Specific variables for form inputs and borders.

| Variable | Description | Default |
| :--- | :--- | :--- |
| `--color-input` | Background for input fields. | `oklch(0.75 0 0)` |
| `--color-border` | Default border color. | `oklch(0.6 0 0)` |

## Surfaces & Nesting

NUI uses a "surface" system for components like Cards and Modals. Surfaces support automatic indentation coloring when nested, creating visual depth without explicit classes.

| Variable | Description |
| :--- | :--- |
| `--color-surface` | Base surface color (Cards, Modals, Panels). |
| `--color-surface-indent` | 1st level nested surface (slightly darker/lighter). |
| `--color-surface-indent-indent` | 2nd level nested surface. |
| `--color-surface-indent-indent-indent` | 3rd level nested surface. |
| `--color-surface-indent-indent-indent-indent` | 4th level nested surface. |

## Layout & Spacing

Customize the scale of your application.

| Variable | Value | Description |
| :--- | :--- | :--- |
| `--spacing-0` | `0` | |
| `--spacing-xxs` | `0.125rem` | Extra extra small spacing. |
| `--spacing-xs` | `0.25rem` | Extra small spacing. |
| `--spacing-sm` | `0.5rem` | Small spacing. |
| `--spacing-base` | `1rem` | **Base unit.** Most components use multiples of this. |
| `--spacing-md` | `2rem` | Medium spacing. |
| `--spacing-lg` | `4rem` | Large spacing. |
| `--spacing-xl` | `8rem` | Extra large spacing. |
| `--spacing-xxl` | `16rem` | Huge spacing. |

## Radius (Rounded Corners)

Control the roundness of UI elements.

| Variable | Value | Usage |
| :--- | :--- | :--- |
| `--radius-square` | `0` | Square elements. |
| `--radius-element` | `0.5rem` | **Default.** Buttons, Inputs, Chips. |
| `--radius-container` | `0.5rem` | Cards, Modals, Dialogs. |
| `--radius-full` | `infinity` | Pills, Avatars. |

## Shadows & Effects

| Variable | Description |
| :--- | :--- |
| `--shadow-outer` | Default drop shadow for floating elements (Cards, Popovers). |
| `--shadow-inner` | Inner shadow style. |
| `--text-shadow-outer` | Text shadow style. |
| `--font-ratio` | Font scaling ratio (default: `1`). |

## Example Override

To customize your theme, simply add a `@layer base` block to your main CSS file:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* Change Brand Color to Purple */
    --color-brand: oklch(0.6 0.15 300);
    
    /* Make buttons and cards square */
    --radius-element: 0px;
    --radius-container: 0px;

    /* Increase base spacing */
    --spacing-base: 1.25rem;
  }
}
```