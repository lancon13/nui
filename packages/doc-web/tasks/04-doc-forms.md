# Task 04: Form Components Documentation

**Goal:** Document form inputs and controls (`NInputText`, `NCheckbox`, `NRadio`, `NToggle`, `NInputSelect`, `NInputCombo`).

## Context
*   **Pre-requisite:** Theme is set up.
*   **Source:** Corresponding `.stories.ts` and `.vue` files in `packages/ui/src/components`.

## Steps

1.  **Create Files**:
    *   `packages/doc-web/components/input.md` (Cover `NInputText` & `NInputField`).
    *   `packages/doc-web/components/checkbox.md`.
    *   `packages/doc-web/components/radio.md`.
    *   `packages/doc-web/components/toggle.md`.
    *   `packages/doc-web/components/select.md` (Cover `NInputSelect` & `NInputCombo`).

2.  **Content Requirements**:
    *   **v-model:** Explicitly show how `v-model` works for each. Use `<script setup>` in the markdown file to define ref variables for the examples.
        *   *Example in Markdown:*
            ```vue
            <script setup>
            import { ref } from 'vue'
            const text = ref('')
            </script>
            
            <NInputText v-model="text" label="Try me" />
            Output: {{ text }}
            ```
    *   **Validation/States:** Document `error`, `success`, `disabled` states based on the stories.
    *   **Props:** Document `label`, `message` (helper text), `icon`.

3.  **Navigation**:
    *   Update config to add a "Forms" sidebar group.

## Outcome
Documentation pages for all form elements with working `v-model` examples.
