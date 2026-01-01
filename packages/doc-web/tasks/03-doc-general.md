# Task 03: General Components Documentation

**Goal:** Document the foundational components (`NButton`, `NIcon`, `NAvatar`, `NChip`) to establish the documentation pattern.

## Context
*   **Pre-requisite:** `Task 02` is complete. Components render correctly in markdown.
*   **Source:**
    *   `packages/ui/src/components/NButton.stories.ts`
    *   `packages/ui/src/components/NIcon.stories.ts`
    *   `packages/ui/src/components/NAvatar.stories.ts`
    *   `packages/ui/src/components/NChip.stories.ts`

## Steps

1.  **Structure**:
    *   Create directory `packages/doc-web/components`.
    *   Create `packages/doc-web/components/button.md`.
    *   Create `packages/doc-web/components/icon.md`.
    *   Create `packages/doc-web/components/avatar.md`.
    *   Create `packages/doc-web/components/chip.md`.

2.  **Content Strategy (Per file)**:
    *   **Title & Description:** Brief description of what the component does.
    *   **Interactive Playground:** Use the code from the "Default" or "Colors" story. Use a Vue code block (::: demo) if available, or simply write the template code and render it live.
        *   *Example:*
            ```md
            # Button
            
            <div class="flex gap-2 my-4">
              <NButton>Default</NButton>
              <NButton class="brand">Brand</NButton>
            </div>
            
            ```
    *   **Props Table:** Manually or semi-automatically list key props (e.g., `label`, `icon`, `disabled`, `loading` for Button). Refer to the `.vue` file `defineProps` section.
    *   **Examples:** Port distinct stories (e.g., "Sizes", "Variants/Flat", "Loading") into sections.

3.  **Navigation**:
    *   Update `packages/doc-web/.vitepress/config.ts` to add these pages to the Sidebar under a "General" group.

## Outcome
Four pages populated with live examples matching the Storybook variations.
