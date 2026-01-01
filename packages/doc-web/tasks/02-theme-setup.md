# Task 02: Theme & Tailwind Integration

**Goal:** Configure VitePress to use the `@packages/ui` library and apply Tailwind CSS correctly so components render with their styles.

## Context
*   **Pre-requisite:** `Task 01` is complete. VitePress is installed.
*   **Challenge:** VitePress uses a default theme. We need to "extend" it to register our Vue components globally.
*   **Styling:** The UI library uses Tailwind. We must ensure the docs build process processes Tailwind classes found in `packages/ui`.

## Steps

1.  **Tailwind Configuration**:
    *   Create `packages/doc-web/tailwind.config.mjs`.
    *   It should import/preset from `packages/ui/tailwind.config.js` (if it exists) OR replicate the config.
    *   **Important:** Set `content` to include:
        *   `./.vitepress/**/*.{js,ts,vue}`
        *   `./**/*.md`
        *   `../ui/src/**/*.{vue,js,ts,jsx,tsx}` (This ensures Tailwind sees classes used inside the library).

2.  **PostCSS Configuration**:
    *   Create `packages/doc-web/postcss.config.mjs` registering `tailwindcss` and `autoprefixer`.

3.  **VitePress Theme Setup**:
    *   Create `packages/doc-web/.vitepress/theme/index.ts`.
    *   Import `DefaultTheme` from `vitepress/theme`.
    *   Import the UI library styling: `import '@packages/ui/src/styles/index.css'` (or the built css if available, but source css is preferred for dev).
    *   Import Tailwind base styles if not already in the UI index css.
    *   Export the theme with an `enhanceApp` function.
    *   Inside `enhanceApp({ app })`:
        *   Import specific components (e.g., `NButton`) from `@packages/ui` and `app.component('NButton', NButton)`.
        *   *Alternatively*, if `@packages/ui` exports a plugin, `app.use()` it.

4.  **Update Config**:
    *   In `packages/doc-web/.vitepress/config.ts`, ensure `vite` options are configured to handle the `@packages/ui` alias if necessary (often `pnpm` workspace handles this, but sometimes `resolve.alias` is needed).

## Outcome
When using `<NButton>Test</NButton>` inside `index.md`, it renders a styled button, not a plain HTML element.
