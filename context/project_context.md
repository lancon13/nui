# Project Context: Nui

This project is a monorepo designed to develop and showcase the Nui Design System. It consists of several packages, primarily a UI component library and a documentation website.

## Purpose

The main purpose of this project is to:

- **Develop a reusable UI component library (`@nui/ui`):** This package provides a set of standardized and accessible UI components built with Vue.js and styled with Tailwind CSS.
- **Provide comprehensive documentation:** Storybook is integrated for interactive component documentation and development.
- **Maintain code quality and consistency:** The project enforces strict linting and formatting rules using ESLint and Prettier, along with TypeScript for type safety.

## Structure

The project is organized as a pnpm monorepo with the following key packages and directories:

- **`/` (Root):**
    - `package.json`: Defines workspace dependencies and scripts.
    - `pnpm-workspace.yaml`: Configures the pnpm workspace.
    - `tsconfig.base.json`: Base TypeScript configuration for the entire monorepo.
    - `eslint.config.mjs`: Central ESLint configuration for JavaScript, TypeScript, Vue, JSON, and CSS files, enforcing code style and best practices.
    - `.prettierrc.json`: Prettier configuration for code formatting.

- **`packages/ui/` (`@nui/ui`):**
    - **Purpose:** The core UI component library.
    - `package.json`: Contains metadata, dependencies (Vue, Tailwind CSS, VueUse, Day.js, Zod), and scripts for building, linting, formatting, and Storybook.
    - `vite.config.ts`: Vite configuration for building the UI library.
    - `src/`:
        - `components/`: Contains individual Vue components (e.g., `NuiButton.vue`).
        - `icons/`: Stores SVG icon files and an `index.ts` for exporting them as Vue components.
        - `styles/`: Contains global styles, including Tailwind CSS configurations.
        - `index.ts`: Main entry point for the UI library, exporting components and other utilities.
    - `.storybook/`: Storybook configuration and stories for component documentation.

- **`packages/doc-web/`:**
    - Likely a documentation website for the design system.

## Key Technologies

- **Monorepo Management:** pnpm
- **Frontend Framework:** Vue.js (version 3)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Component Documentation:** Storybook
- **Type Checking:** TypeScript
- **Linting:** ESLint
- **Formatting:** Prettier
- **Icon Management:** Material Design Icons

## Component Development

To ensure consistency and quality when creating new UI components, a detailed guide has been prepared. It outlines the required file structure, coding patterns, styling conventions, and Storybook integration.

**All new component development must follow the instructions in the [Component Development Guide](./component_development_guide.md).**

## Component Examples

Here are some examples of how components are structured in this project.

### `NuiButton.vue`

This is an example of a versatile button component that can also function as a link or a toggle.

```vue
<template>
    <component
        :is="props.tag"
        :type="props.tag === 'button' ? props.type : undefined"
        :to="props.tag !== 'button' ? props.to : undefined"
        :href="props.tag === 'a' ? props.href : undefined"
        :target="props.tag === 'a' ? props.target : undefined"
        :disabled="props.disabled || props.loading"
        :class="compClasses"
        :style="compStyles"
        @click="handleClick"
    >
        <!-- ... template logic for loading/default states and slots ... -->
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import NuiIcon from './NuiIcon.vue'

    const model = defineModel<boolean>()

    export type NuiButtonSize = 'small' | 'medium' | 'large'
    export type NuiButtonColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'
    export type NuiButtonVariant = 'solid' | 'outlined' | 'flat' | 'text'

    export interface NuiButtonProps {
        modelValue?: boolean
        toggle?: boolean
        // ... other props
    }

    const props = withDefaults(defineProps<NuiButtonProps>(), {
        // ... default values
    })

    const emit = defineEmits(['click'])
    const handleClick = (e: MouseEvent) => {
        emit('click', e)
        if (props.toggle) {
            // ... toggle logic
        }
    }

    const compClasses = computed(() => [
        'nui-button'
        // ... dynamic classes
    ])
</script>
```

### `NuiInput.vue`

This is an example of a form input component that uses `v-model` and has slots for icons.

```vue
<template>
    <div :class="wrapperClasses">
        <label v-if="props.label" :for="inputId" class="nui-input-label">
            {{ props.label }}
        </label>
        <div class="nui-input-host">
            <div v-if="$slots.prepend" class="nui-input-prepend">
                <slot name="prepend" />
            </div>
            <input
                :id="inputId"
                v-model="model"
                :disabled="props.disabled || props.loading"
                class="nui-input"
                v-bind="$attrs"
            />
            <div v-if="$slots.append" class="nui-input-append">
                <slot name="append" />
            </div>
        </div>
        <p v-if="props.helperText" class="nui-input-helper">
            {{ props.helperText }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { computed, useAttrs } from 'vue'
    import NuiIcon from './NuiIcon.vue'

    defineOptions({ inheritAttrs: false })
    const model = defineModel<string | number>()
    const attrs = useAttrs()
    const inputId = computed(() => (attrs.id as string) || /* ... random id ... */)

    export interface NuiInputProps {
        // ... props
    }
    const props = withDefaults(defineProps<NuiInputProps>(), {
        // ... default values
    })

    const wrapperClasses = computed(() => [
        'nui-input-wrapper',
        // ... dynamic classes
    ])
</script>
```
