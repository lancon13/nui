# Using NUI: Context & Best Practices

This guide provides the necessary context for an LLM to generate correct, idiomatic code using the NUI library.

## 1. Core Philosophy

NUI is a **Vue 3** component library built on **Tailwind CSS**.

- **Utility-First**: It relies heavily on utility classes for layout (`flex`, `grid`) and spacing.
- **Semantic Classes**: It uses specific class names (`brand`, `success`) for theming rather than props for colors.
- **Props for Logic**: It uses props for functional behavior (`loading`, `disabled`, `modelValue`).

## 2. Global Styling Conventions

### Colors (Class-based)

**DO NOT** use a `color` prop for most components. Apply semantic classes directly to the component.

- **Classes:** `brand`, `success`, `error`, `warning`, `info`.
- **Target:** `NButton`, `NInputText`, `NInputSelect`, `NInputCombo`, `NCheckbox`, `NRadio`, `NToggle`.

**Correct:**

```html
<NButton class="brand" label="Submit" /> <NInputText class="error" helperText="Invalid" />
```

**Incorrect:**

```html
<NButton color="brand" ... />
<!-- WRONG -->
```

### Shapes (Class-based)

**DO NOT** use a `shape` prop. Use utility classes.

- **Pilled (Fully Rounded):** Use class `pilled` (idiomatic) or `rounded-full`.
- **Squared:** Use class `squared` or `rounded-none`.

**Correct:**

```html
<NButton class="pilled" label="Round Button" /> <NInputText class="pilled" />
```

### Sizes (Mixed Strategy)

Be careful! Sizing depends on the component type.

1.  **Form Inputs (`NInput*`, `NCheckbox`, `NRadio`, `NToggle`):**
    - **Use Prop:** `size="small" | "medium" | "large"`.
    - Default is `medium`.
    - **Example:** `<NInputText size="large" />`

2.  **Buttons (`NButton`):**
    - **Use Utility Classes:** Buttons inherit text size. Use Tailwind text utilities.
    - **Example:** `<NButton class="text-xs" label="Tiny Button" />`

## 3. Form Components

### Common API

All form inputs (`NInputText`, `NInputSelect`, `NInputCombo`) share a common base:

- **Label:** `label="My Label"` prop.
- **Helper Text:** `helperText="Hint text"` prop (replaces old `message` prop).
- **Icons:** `icon` (leading), `prependIcon` (left of input), `appendIcon` (right of input).
- **Slots:** `#prepend`, `#append`, `#label`, `#helper`.

### Component Selection Guide

- **`NInputText`**: Standard text/password/number input.
- **`NInputSelect`**: Wrapper for native HTML `<select>`. Use for simple lists, mobile-first UI, or when you don't need search.
- **`NInputCombo`**: Rich dropdown. Use for:
    - Searching/Filtering (`useInput`).
    - Multiple Selection with Chips (`multiple`).
    - Async data loading.
    - Complex item rendering (`#item-content` slot).

## 4. Specific Component Notes

### NButton

- **Block Buttons:** When using `w-full`, **ALWAYS** add `justify-center` to ensure text alignment.
    ```html
    <NButton class="w-full justify-center" label="Full Width" />
    ```

### NCalendar

- **Navigation:** Uses **ISO Week** logic (`viewingYear`, `viewingWeek`), not months.
- **Set Month:** Use the exposed `setMonth(monthIndex, year)` method via template ref for month-based navigation.

### NCheckbox / NRadio / NToggle

- **Inline Labels:** Use `inlineLabel` prop to put the text next to the control instead of above it.
- **Size:** Use `size` prop.

## 5. Icons

- NUI uses **MDI (Material Design Icons)** string names.
- **Setup Required:** The font assets are **not bundled** by default. You must install `@mdi/font` and import its CSS (`import '@mdi/font/css/materialdesignicons.css';`) in your application entry point.
- Example: `mdi-check`, `mdi-alert-circle`, `mdi-loading`.
- Components often have `loadingName` props defaulting to `mdi-loading` or `loading` (custom mapping).

## 6. Example: A Complete Form

```vue
<script setup>
    import { ref } from 'vue'

    const formData = ref({
        name: '',
        role: 'user',
        notifications: true
    })

    const roles = [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' }
    ]
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <!-- Input: Class for color, Prop for size -->
        <NInputText v-model="formData.name" label="Full Name" size="large" class="brand" placeholder="John Doe" />

        <!-- Select: Native behavior -->
        <NInputSelect v-model="formData.role" :options="roles" label="Role" helperText="Select permission level" />

        <!-- Toggle: Size prop -->
        <NToggle v-model="formData.notifications" label="Enable Notifications" inlineLabel size="small" />

        <!-- Button: Utility class for size/width -->
        <div class="flex justify-end mt-4">
            <NButton class="brand pilled px-8 py-3" label="Save Changes" />
        </div>
    </div>
</template>
```

## 7. Styles & Theming

Refer to `@packages/ui/src/styles/` for base definitions.

### Colors (`palettes.css`)

NUI uses semantic OKLCH colors. These are exposed as Tailwind classes.

- **Brand:** `brand` (Primary action color)
- **Feedback:** `success`, `error`, `warning`, `info`
- **Neutrals:** `neutral`, `surface`, `background`, `text`

### Theme Variables (`theme.css`)

- **Spacing:** `--spacing-xs` (0.25rem) to `--spacing-xxl` (16rem).
- **Radius:** `--radius-element` (default), `--radius-full` (pilled).
- **Shadows:** `--shadow-outer`.

### Typography (`typography.css`)

Use these utility classes for consistent text styling:

- **Headers:** `title-text`, `sub-title-text`
- **Body:** `body-text` (default text), `label-text` (font-semibold)
- **Small:** `caption-text` (xs, bold)
- **Links:** `link-text` (cursor pointer, hover effects)
