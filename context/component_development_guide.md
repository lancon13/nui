# Instructions for AI / LLM

Before creating a new component, it is crucial to understand the existing project context and conventions.

1.  **Review Project Context:**
    - Read the files in the `./context` directory, including `project_context.md` and this `component_development_guide.md`.

2.  **Analyze Existing Components:**
    - List the files in `packages/ui/src/components` to see what components already exist.
    - Read the source code of a few existing components (e.g., `NuiButton.vue`, `NuiInput.vue`) to understand the coding patterns, prop definitions, and overall structure.

3.  **Understand Styling and CSS Variables:**
    - Before writing any CSS, read `packages/ui/src/styles/index.css` and `packages/ui/src/styles/components.css` to learn the available CSS variables (theme tokens).
    - All styles must use these CSS variables with Tailwind CSS's `@apply` directive to ensure consistency with the design system.

4.  **Follow the Development Guide:**
    - Adhere strictly to the guidelines in this document for file structure, component implementation, styling, and Storybook integration.

5.  **Create Comprehensive Stories:**
    - For every new component, create a corresponding `.stories.ts` file.
    - Write multiple stories to demonstrate all features, variants, and states of the component.

---

# Nui Design System: Component Development Guide

This guide provides instructions for creating new primitive UI components for the `@nui/ui` package, ensuring consistency with the existing codebase.

**Note:** All components should be prefixed with `Nui`.

## 1. File Structure

For any new component, for example `NuiInput`, you must create the following files:

1.  **Component File:** `packages/ui/src/components/NuiInput.vue`
2.  **Storybook File:** `packages/ui/src/components/NuiInput.stories.ts`

## 2. Component Implementation (`NuiInput.vue`)

Follow the pattern established by existing components like `NuiButton.vue` and `NuiInput.vue`.

### Script (`<script setup lang="ts">`)

#### Props & Types

Always export reusable `type` aliases for props that have a fixed set of options. This promotes consistency and reusability across the design system.

**Good Example:**

```typescript
// In NuiButton.vue
export type NuiButtonVariant = 'solid' | 'outlined' | 'flat' | 'text'

export interface NuiButtonProps {
    variant?: NuiButtonVariant
    // ...
}
```

**Bad Example:**

```typescript
// Avoid defining types inline where they cannot be reused.
export interface NuiButtonProps {
    variant?: 'solid' | 'outlined' | 'flat' | 'text' // Not reusable
    // ...
}
```

#### State Management (`v-model`)

For components that require two-way data binding (like form inputs or toggleable components), use the `defineModel<Type>()` macro for a clean and standard implementation.

**Good Example:**

```typescript
// In a component like NuiCheckbox.vue
const model = defineModel<boolean>()
```

**Bad Example:**

```typescript
// Avoid manually implementing v-model unless necessary.
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
```

#### Dynamic Classes

Use a `computed` property (typically named `compClasses`) to build the class array. This keeps the `<template>` clean and centralizes the component's styling logic.

**Good Example:**

```typescript
const compClasses = computed(() => [
    'nui-button',
    `nui-button--variant-${props.variant}`,
    {
        'nui-button--loading': props.loading,
        'nui-button--disabled': props.disabled
    }
])
```

**Bad Example:**

```html
<!-- Avoid complex conditional logic directly in the :class binding -->
<button
    :class="[
    'nui-button',
    `nui-button--variant-${variant}`,
    loading ? 'nui-button--loading' : '',
    disabled ? 'nui-button--disabled' : '',
  ]"
>
    ...
</button>
```

### Template (`<template>`)

- The root element should be a native HTML element or another Vue component. A common pattern is to use `<component :is="props.tag">` to allow for tag polymorphism, where `tag` is a prop that defaults to a standard HTML element (e.g., 'div', 'button').
- Use the `compClasses` and `compStyles` computed properties on the root element: `:class="compClasses"` and `:style="compStyles"`.
- Make liberal use of `<slot>`s to allow for content projection. Common slot names include `default`, `prepend`, and `append`.

### Style (`<style lang="css">`)

- **Imports & Referencing:**
    - The actual CSS for the library is imported only once in `packages/ui/src/styles/main.css`.
    - To provide build-time context for the Tailwind compiler to resolve `@apply` directives with both default and custom-defined utilities (like `text-primary`), you **must** add `@reference` directives for Tailwind and your project's style files at the top of each component's `<style>` block. This does not duplicate the styles in the final output.

- **Scoping & Layers:**
    - Do NOT use the `scoped` attribute.
    - All component-specific styles must be placed within the `@layer components { ... }` block.

    **Good Example:**
    ```css
    <style lang="css">
        @reference 'tailwindcss';
        @reference '../styles/index.css';
        @reference '../styles/components.css';

        @layer components {
            .nui-button {
                @apply inline-flex text-primary;
            }
        }
    </style>
    ```

#### CSS Variables & `@apply`

Always prefer using CSS variables from the theme over arbitrary or "magic" numbers. This ensures that components adhere to the design system's tokens.

**Good Example:**

```css
.nui-button {
    @apply px-[var(--nui-button-padding-x)] rounded-[var(--nui-button-radius)];
}
```

**Bad Example:**

```css
.nui-button {
    /* Avoid arbitrary values that are not part of the theme */
    @apply px-[11px] rounded-[7px];
}
```

#### Class Naming & Structure

Use a nested BEM-like CSS structure for component modifiers and elements. This improves readability and prevents style conflicts.

**Good Example:**

```css
.nui-button {
    @apply inline-flex;

    // Base styles

    /* Modifier for variant */
    &.nui-button--variant-solid {
        @apply bg-primary;
    }

    /* Child element */
    .nui-button-icon {
        @apply mx-xs;
    }
}
```

**Bad Example:**

```css
/* Avoid overly specific or non-reusable selectors */
div > .nui-button.primary {
    background-color: blue;
}

/* Avoid style definitions outside the main component class */
.nui-button-icon-style {
    margin-left: 4px;
}
```

## 3. Storybook Integration (`NuiInput.stories.ts`)

- **Meta Configuration:**
    - Import `Meta` and `StoryObj` from `@storybook/vue3-vite`. **Note: This project uses Vite, so it is crucial to import from `@storybook/vue3-vite` and not `@storybook/vue3`**.
    - Import the component: `import NuiInput from './NuiInput.vue'`.
    - Define the `meta` object, specifying `title` (e.g., `'UI/NuiInput'`), `component`, `parameters: { layout: 'centered' }`, and `tags: ['autodocs']`.
- **Controls (`argTypes`):**
    - Define `argTypes` for all props to make them configurable in the Storybook UI. Use `control: 'select'` for props with a fixed set of options.
- **Stories:**
    - Define a `type Story = StoryObj<typeof meta>`.
    - Export a `Default` story.
    - Create separate, named exports for each major variant, size, and state of the component (e.g., `export const Outlined: Story = { ... }`, `export const Disabled: Story = { ... }`).
    - Use the `render` function for complex stories that need to show multiple component instances at once. When displaying multiple components, use a `grid` layout (e.g., `<div class="grid grid-cols-4 gap-sm">...</div>`) to ensure proper alignment and spacing.

## 4. Exporting the Component

- Open `packages/ui/src/components/index.ts`.
- Add a new line to export your component, keeping the list alphabetized: `export { default as NuiInput } from './NuiInput.vue'`.

By following these steps, the new component will integrate seamlessly into the existing design system architecture and tooling.