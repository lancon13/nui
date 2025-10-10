# Project Context: Whispli Design System

This project is a monorepo designed to develop and showcase the Whispli Design System (WDS). It consists of several packages, primarily a UI component library and a demo Single Page Application (SPA).

## Purpose

The main purpose of this project is to:
*   **Develop a reusable UI component library (`@whispli-design-system/ui`):** This package provides a set of standardized and accessible UI components built with Vue.js and styled with Tailwind CSS.
*   **Demonstrate UI component usage (`@whispli-design-system/demo-spa`):** This package is a Vue 3 SPA that consumes the UI library, serving as a practical example and testing ground for the components.
*   **Maintain code quality and consistency:** The project enforces strict linting and formatting rules using ESLint and Prettier, along with TypeScript for type safety.
*   **Provide comprehensive documentation:** Storybook is integrated for interactive component documentation and development.

## Structure

The project is organized as a pnpm monorepo with the following key packages and directories:

*   **`/` (Root):**
    *   `package.json`: Defines workspace dependencies and scripts.
    *   `pnpm-workspace.yaml`: Configures the pnpm workspace.
    *   `tsconfig.base.json`: Base TypeScript configuration for the entire monorepo, including path aliases for `@whispli-design-system/ui`.
    *   `eslint.config.mjs`: Central ESLint configuration for JavaScript, TypeScript, Vue, JSON, and CSS files, enforcing code style and best practices.
    *   `.prettierrc.json`: Prettier configuration for code formatting.

*   **`packages/ui/` (`@whispli-design-system/ui`):**
    *   **Purpose:** The core UI component library.
    *   `package.json`: Contains metadata, dependencies (Vue, Tailwind CSS, VueUse, Day.js, Zod), and scripts for building, linting, formatting, and Storybook.
    *   `vite.config.ts`: Vite configuration for building the UI library.
    *   `src/`:
        *   `components/`: Contains individual Vue components (e.g., `WButton.vue`).
        *   `icons/`: Stores SVG icon files (e.g., `add.svg`, `dashboard.svg`) and an `index.ts` for exporting them as Vue components. The `scripts/prepare-icons.ts` script likely processes these.
        *   `styles/`: Contains global styles, including Tailwind CSS configurations and font definitions (e.g., `theme.css`, `fonts/nunito-sans.css`).
        *   `index.ts`: Main entry point for the UI library, exporting components and other utilities.
    *   `scripts/`: Contains utility scripts, such as `prepare-icons.ts` for icon processing.
    *   `storybook/`: Storybook configuration and stories for component documentation.

*   **`packages/demo-spa/` (`@whispli-design-system/demo-spa`):**
    *   **Purpose:** A demo application showcasing the usage of components from `@whispli-design-system/ui`.
    *   `package.json`: Contains metadata, dependencies (Vue, Pinia, Vue Router, `@whispli-design-system/ui`), and scripts for development, building, testing (unit with Vitest, e2e with Playwright), type checking, linting, and formatting.
    *   `vite.config.ts`: Vite configuration for the demo application.
    *   `src/`:
        *   `App.vue`: The main application component, demonstrating the import and usage of WDS UI components.
        *   `main.ts`: Entry point for the Vue application.
        *   `router/`: Vue Router configuration.
        *   `stores/`: Pinia store definitions (e.g., `counter.ts`).
        *   `styles/`: Application-specific styles (e.g., `index.css`).
    *   `e2e/`: End-to-end tests using Playwright.
    *   `__tests__/`: Unit tests using Vitest.

*   **`packages/doc-web/`:** (Mentioned in file structure, but not explored in detail)
    *   Likely a documentation website for the design system.

## Key Technologies

*   **Monorepo Management:** pnpm
*   **Frontend Framework:** Vue.js (version 3)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **State Management:** Pinia (in `demo-spa`)
*   **Routing:** Vue Router (in `demo-spa`)
*   **Component Documentation:** Storybook
*   **Type Checking:** TypeScript
*   **Linting:** ESLint
*   **Formatting:** Prettier
*   **Testing:** Vitest (unit), Playwright (e2e)
*   **Icon Management:** SVG icons processed by a custom script.

This context provides a solid foundation for an LLM to understand the project's architecture, technologies, and development practices, enabling more effective assistance in development tasks.

## Component Development

To ensure consistency and quality when creating new UI components, a detailed guide has been prepared. It outlines the required file structure, coding patterns, styling conventions, and Storybook integration.

**All new component development must follow the instructions in the [Component Development Guide](./component_development_guide.md).**
