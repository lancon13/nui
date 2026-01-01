# Task 01: Scaffolding & Installation

**Goal:** Initialize the `packages/doc-web` workspace, install VitePress, and verify the dev server runs.

## Context
*   **Workspace:** We are in a monorepo. The target directory is `packages/doc-web`.
*   **Dependencies:** The root `package.json` uses `pnpm`.
*   **UI Library:** Located at `../ui`. It exports Vue components.

## Steps

1.  **Initialize `package.json`**:
    *   In `packages/doc-web`, create a `package.json`.
    *   Name: `@packages/doc-web`.
    *   Type: `module`.
    *   Scripts: `docs:dev` (`vitepress dev`), `docs:build` (`vitepress build`), `docs:preview` (`vitepress preview`).

2.  **Install Dependencies**:
    *   Install `vitepress` and `vue` as dev dependencies.
    *   Install `tailwindcss`, `postcss`, and `autoprefixer` (needed for UI library styles).
    *   **Crucial:** Add a local dependency to the UI library: `"@packages/ui": "workspace:*"`.

3.  **Create Directory Structure**:
    *   Create `packages/doc-web/.vitepress`.
    *   Create `packages/doc-web/.vitepress/config.ts` (Minimal config for now).
    *   Create `packages/doc-web/index.md` (Minimal "Hello World" content).

4.  **Verify**:
    *   Run `pnpm install` in the root to link the workspace.
    *   Run `pnpm --filter @packages/doc-web docs:dev` to ensure the server starts.

## Outcome
A running VitePress instance that displays "Hello World". No custom styling or components are expected yet.
