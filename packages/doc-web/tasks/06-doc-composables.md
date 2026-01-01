# Task 06: Composables Documentation

**Goal:** Document the functional composables (`useDialog`, `useNotify`, `useModal`). This is often the primary way users interact with feedback components.

## Context
*   **Pre-requisite:** `Task 02` complete.
*   **Source:** `packages/ui/src/composables/*.stories.ts` provide usage examples.

## Steps

1.  **Create Files**:
    *   `packages/doc-web/composables/use-dialog.md`
    *   `packages/doc-web/composables/use-notify.md`
    *   `packages/doc-web/composables/use-modal.md`

2.  **Content Requirements**:
    *   **Usage:** Show how to import: `import { useDialog } from '@packages/ui'`.
    *   **Example:**
        ```vue
        <script setup>
        import { useDialog } from '@packages/ui'
        const { alert } = useDialog()
        </script>
        <NButton @click="alert('Hello', 'World')">Click me</NButton>
        ```
    *   **API:** List methods (`open`, `alert`, `confirm`, `prompt`) and options object structure.

3.  **Navigation**:
    *   Update config to add "Composables" sidebar group.

## Outcome
Documentation explaining the programmatic API for the UI library.
