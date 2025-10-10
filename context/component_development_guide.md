# Nui Design System: Component Development Guide

This guide provides instructions for creating new primitive UI components for the `@nui/ui` package, ensuring consistency with the existing codebase.

**Note:** All components should be prefixed with `Nui`.

## 1. File Structure

For any new component, for example `NuiInput`, you must create the following files:

1.  **Component File:** `packages/ui/src/components/NuiInput.vue`
2.  **Storybook File:** `packages/ui/src/components/NuiInput.stories.ts`

## 2. Component Implementation (`NuiInput.vue`)

Follow the pattern established by `NuiButton.vue`.

### Script (`<script setup lang="ts">`)

*   **Props:**
    *   Define and export a TypeScript interface for the component's props (e.g., `export interface NuiInputProps { ... }`).
    *   Define props using `withDefaults(defineProps<NuiInputProps>(), { ... })` to provide default values.
    *   Export common `type` definitions related to props (e.g., `export type NuiInputVariant = 'solid' | 'outlined';`).
*   **Dynamic Classes & Styles:**
    *   Use `computed` from `vue` to create a `compClasses` computed property. This should return an array of classes, including the base component class (e.g., `'nui-input'`), variant classes, size classes, and state-based classes (e.g., `nui-input--disabled`).
    *   Use a `compStyles` computed property if you need to apply dynamic inline styles that can't be handled by classes (e.g., a custom size passed as a string like `'3rem'`).
*   **Logic:** Keep the component logic minimal and focused on presentation. Use computed properties to react to prop changes.

### Template (`<template>`)

*   The root element should be a native HTML element or another Vue component. A common pattern is to use `<component :is="props.tag">` to allow for tag polymorphism, where `tag` is a prop that defaults to a standard HTML element (e.g., 'div', 'button').
*   Use the `compClasses` and `compStyles` computed properties on the root element: `:class="compClasses"` and `:style="compStyles"`.
*   Make liberal use of `<slot>`s to allow for content projection. Common slot names include `default`, `prepend`, and `append`.

### Style (`<style lang="css">`)

*   **Imports:** Start your style block by importing the necessary stylesheets:
    ```css
    @import "tailwindcss";
    @import "../styles/index.css";
    @import "../styles/components.css";
    ```
*   **Scoping & Layers:**
    *   Do NOT use the `scoped` attribute.
    *   All styles must be within the `@layer components { ... }` block.
*   **Tailwind CSS & Nesting:**
    *   Use `@apply` to apply Tailwind CSS utilities.
    *   Reference the project's theme variables from `packages/ui/src/styles/index.css`.
    *   Use a nested CSS structure for component modifiers (e.g., `&.nui-input--variant`) and elements. This improves readability and organization.

    > **Note on Theme-Aware Utilities:** The Tailwind CSS integration is configured to generate utility classes directly from the CSS variables defined in `packages/ui/src/styles/index.css`. For example, to apply a small padding, use the `.p-sm` class, which corresponds to the `--spacing-sm` variable. Standard Tailwind numerical sizing classes (e.g., `p-4`) will not work. Always refer to `index.css` for the available scale (e.g., `xxs`, `xs`, `sm`, `md`).
*   **CSS Variables:**
    *   If the component requires specific styling values (e.g., padding, font-size), first check if an existing base variable from `index.css` can be used.
    *   Add new component-specific CSS variables to `packages/ui/src/styles/components.css` inside the `@layer components { @theme { ... } }` block.
    *   **Important:** When defining new component variables, they should reference existing base variables (e.g., `var(--spacing-sm)`, `var(--border-thin)`). Avoid using hardcoded, "arbitrary" values like `1px` or `#FFF`.

        **Good Example:**
        ```css
        /* NuiInput */
        --nui-input-padding-x: var(--spacing-sm);
        --nui-input-radius: var(--radius-xxs);
        --nui-input-border-width: var(--border-thin);
        ```
        **Bad Example:**
        ```css
        /* NuiInput */
        --nui-input-padding-x: 1rem; /* Use var(--spacing-sm) instead */
        --nui-input-border-width: 1px; /* Use var(--border-thin) instead */
        ```
    *   Use these variables within your component's style block. For example:
        ```css
        .nui-input {
            @apply p-[var(--nui-input-padding-y)] px-[var(--nui-input-padding-x)] rounded-[var(--nui-input-radius)];

            &.nui-input--bordered {
                @apply border-[var(--nui-input-border-width)];
            }
        }
        ```

## 3. Storybook Integration (`NuiInput.stories.ts`)

*   **Meta Configuration:**
    *   Import `Meta` and `StoryObj` from `@storybook/vue3-vite`.
    *   Import the component: `import NuiInput from './NuiInput.vue'`.
    *   Define the `meta` object, specifying `title` (e.g., `'UI/NuiInput'`), `component`, `parameters: { layout: 'centered' }`, and `tags: ['autodocs']`.
*   **Controls (`argTypes`):**
    *   Define `argTypes` for all props to make them configurable in the Storybook UI. Use `control: 'select'` for props with a fixed set of options.
*   **Stories:**
    *   Define a `type Story = StoryObj<typeof meta>`.
    *   Export a `Default` story.
    *   Create separate, named exports for each major variant, size, and state of the component (e.g., `export const Outlined: Story = { ... }`, `export const Disabled: Story = { ... }`).
    *   Use the `render` function for complex stories that need to show multiple component instances at once. When displaying multiple components, use a `grid` layout (e.g., `<div class="grid grid-cols-4 gap-sm">...</div>`) to ensure proper alignment and spacing.

## 4. Exporting the Component

*   Open `packages/ui/src/components/index.ts`.
*   Add a new line to export your component: `export { default as NuiInput } from './NuiInput.vue'`.

By following these steps, the new component will integrate seamlessly into the existing design system architecture and tooling.