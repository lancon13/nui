# Task 07: Guides & Navigation

**Goal:** Polish the site structure, add a landing page, and ensure navigation is logical.

## Context
*   **Pre-requisite:** All component docs are created.

## Steps

1.  **Home Page (`index.md`)**:
    *   Use VitePress "Home" layout (YAML frontmatter).
    *   Add a Hero section: "NUI - Vue 3 Tailwind UI Library".
    *   Add Features list: "Accessible", "Customizable", "TypeScript".
    *   Add "Get Started" button linking to the guide.

2.  **Getting Started (`guide/getting-started.md`)**:
    *   Explain how to install the package (mock command `pnpm add @packages/ui`).
    *   Explain how to register the styles in `main.ts` or `App.vue`.

3.  **Theming (`guide/theming.md`)**:
    *   Explain the CSS variables used (e.g., `--n-brand`, `--n-bg`).
    *   Show how to override them in Tailwind config or CSS.

4.  **Navigation**:
    *   Finalize `config.ts`. Ensure the `nav` bar has links to "Guide", "Components", "Composables".
    *   Ensure the `sidebar` is collapsible and well-ordered.

## Outcome
A complete, navigable documentation site ready for deployment.
