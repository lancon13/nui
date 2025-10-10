# Project Context: Nui

This project is a monorepo designed to develop and showcase the Nui Design System. It consists of several packages, primarily a UI component library and a documentation website.

## Purpose

The main purpose of this project is to:
*   **Develop a reusable UI component library (`@nui/ui`):** This package provides a set of standardized and accessible UI components built with Vue.js and styled with Tailwind CSS.
*   **Provide comprehensive documentation:** Storybook is integrated for interactive component documentation and development.
*   **Maintain code quality and consistency:** The project enforces strict linting and formatting rules using ESLint and Prettier, along with TypeScript for type safety.

## Structure

The project is organized as a pnpm monorepo with the following key packages and directories:

*   **`/` (Root):**
    *   `package.json`: Defines workspace dependencies and scripts.
    *   `pnpm-workspace.yaml`: Configures the pnpm workspace.
    *   `tsconfig.base.json`: Base TypeScript configuration for the entire monorepo.
    *   `eslint.config.mjs`: Central ESLint configuration for JavaScript, TypeScript, Vue, JSON, and CSS files, enforcing code style and best practices.
    *   `.prettierrc.json`: Prettier configuration for code formatting.

*   **`packages/ui/` (`@nui/ui`):**
    *   **Purpose:** The core UI component library.
    *   `package.json`: Contains metadata, dependencies (Vue, Tailwind CSS, VueUse, Day.js, Zod), and scripts for building, linting, formatting, and Storybook.
    *   `vite.config.ts`: Vite configuration for building the UI library.
    *   `src/`:
        *   `components/`: Contains individual Vue components (e.g., `NuiButton.vue`).
        *   `icons/`: Stores SVG icon files and an `index.ts` for exporting them as Vue components.
        *   `styles/`: Contains global styles, including Tailwind CSS configurations.
        *   `index.ts`: Main entry point for the UI library, exporting components and other utilities.
    *   `.storybook/`: Storybook configuration and stories for component documentation.

*   **`packages/doc-web/`:**
    *   Likely a documentation website for the design system.

## Key Technologies

*   **Monorepo Management:** pnpm
*   **Frontend Framework:** Vue.js (version 3)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Component Documentation:** Storybook
*   **Type Checking:** TypeScript
*   **Linting:** ESLint
*   **Formatting:** Prettier
*   **Icon Management:** Material Design Icons

## Component Development

To ensure consistency and quality when creating new UI components, a detailed guide has been prepared. It outlines the required file structure, coding patterns, styling conventions, and Storybook integration.

**All new component development must follow the instructions in the [Component Development Guide](./component_development_guide.md).**

## Component Examples

Here are some examples of how components are structured in this project.

### `NuiButton.vue`

This is an example of a basic button component.

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
    >
        <template v-if="props.loading">
            <slot name="loading">
                <nui-icon v-if="props.loadingIcon"
                          :name="props.loadingIcon"
                          :size="props.size"
                          class="nui-button--loading-icon animate-spin" />
                <span v-if="props.loadingLabel" class="nui-button--loading-label">{{ props.loadingLabel }}</span>
                <slot name="default" />
            </slot>
        </template>
        
        <template v-else>
            <slot v-if="$slots['prepend'] || props.prependIcon" name="prepend">
                <nui-icon :name="props.prependIcon as string" :size="props.size" class="nui-button--prepend-icon" />
            </slot>
            
            <nui-icon v-if="props.icon"
                      :name="props.icon"
                      :size="props.size"
                      class="nui-button--icon" />
            {{ props.label }}
            <slot name="default" />
            
            <slot v-if="$slots['append'] || props.appendIcon" name="append">
                <nui-icon :name="props.appendIcon as string" :size="props.size" class="nui-button--append-icon" />
            </slot>
        </template>
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import NuiIcon from './NuiIcon.vue'

    export type NuiButtonSize = 'small' | 'medium' | 'large';
    export type NuiButtonColor = 'primary' | 'success' | 'error' | 'warning' | 'current';

    export interface NuiButtonProps {
        type?: 'button' | 'submit' | 'reset';
        variant?: 'solid' | 'outlined' | 'flat' | 'text';
        color?: NuiButtonColor;
        size?: NuiButtonSize | string;
        disabled?: boolean;
        label?: string;
        tag?: string;
        prependIcon?: string;
        appendIcon?: string;
        icon?: string;
        loading?: boolean;
        loadingLabel?: string;
        loadingIcon?: string;
        rounded?: boolean;
        pilled?: boolean;
        to?: string | object;
        href?: string;
        target?: string;
    }

    const props = withDefaults(defineProps<NuiButtonProps>(), {
        type: 'button',
        variant: 'solid',
        color: 'primary',
        size: 'medium',
        disabled: false,
        label: '',
        tag: 'button',
        prependIcon: undefined,
        appendIcon: undefined,
        icon: undefined,
        loading: false,
        loadingLabel: 'Loading...',
        loadingIcon: 'loading',
        rounded: false,
        pilled: false,
        to: undefined,
        href: undefined,
        target: undefined,
    })

    const isIconOnly = computed(() => props.icon && !props.label)

    const compClasses = computed(() => [
        'nui-button',
        `nui-button--variant-${props.variant}`,
        {
            [`nui-button--size-${props.size}`]: props.size && ['small', 'medium', 'large'].includes(props.size as string),
            [`nui-button--color-${props.color}`]: props.color && ['primary', 'success', 'error', 'warning', 'current'].includes(props.color as string),
            'nui-button--icon-only': isIconOnly.value,
            'nui-button--rounded': props.rounded,
            'nui-button--pilled': props.pilled,
            'nui-button--loading': props.loading,
            'nui-button--disabled': props.disabled,
        },
    ])

    const compStyles = computed(() => {
        const styles: Record<string, string> = {}
        if (props.size && !['small', 'medium', 'large'].includes(props.size as string))
            styles['font-size'] = props.size

        return styles
    })

</script>
```

### `NuiButton.stories.ts`

This is an example of a Storybook story for the `NuiButton` component.

```typescript
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NuiButton from './NuiButton.vue'

const colors = ['primary', 'success', 'error', 'warning', 'current']
const variants = ['solid', 'outlined', 'flat', 'text']
const sizes = ['small', 'medium', 'large']

const meta = {
    title: 'UI/NuiButton',
    component: NuiButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'],
        },
        color: {
            control: 'select',
            options: colors,
        },
        variant: {
            control: 'select',
            options: variants,
        },
        size: {
            control: 'select',
            options: sizes,
        },
        disabled: { control: 'boolean' },
        label: { control: 'text' },
        tag: { control: 'text' },
        prependIcon: { control: 'text' },
        appendIcon: { control: 'text' },
        icon: { control: 'text' },
        loading: { control: 'boolean' },
        loadingLabel: { control: 'text' },
        loadingIcon: { control: 'text' },
        rounded: { control: 'boolean' },
        pilled: { control: 'boolean' },
        to: { control: 'text' },
        href: { control: 'text' },
        target: {
            control: 'select',
            options: ['_self', '_blank', '_parent', '_top'],
        },
    },
    args: {
        type: 'button',
        color: 'primary',
        variant: 'solid',
        size: 'medium',
        disabled: false,
        label: 'Button',
        tag: 'button',
        loading: false,
        loadingLabel: 'Loading...',
        loadingIcon: 'loading',
        rounded: false,
        pilled: false,
        to: undefined,
        href: undefined,
        target: undefined,
    },
} satisfies Meta<typeof NuiButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Button',
    },
    render: (args) => ({
        components: { NuiButton },
        setup() {
            return { args }
        },
        template: '<NuiButton v-bind="args" />',
    }),
}
```