# Documentation Context & Guidelines

This document serves as a context provider for LLMs working on documentation files (Markdown) within this project.

## Critical Rendering Rules

### 1. HTML/Vue Components in Markdown
**Issue:** Markdown parsers (like VitePress/VuePress) often treat blank lines within HTML blocks as separators for new paragraphs or code blocks. This breaks the rendering of Vue components embedded in Markdown.

**Rule:** **NEVER** leave blank lines (line gaps) inside the opening and closing tags of a Vue component or HTML element in the examples. Keep the HTML structure compact.

**BAD Example (Breaks Rendering):**
```html
<NCard>

    <div class="content">
        Content
    </div>

</NCard>
```

**GOOD Example (Correct):**
```html
<NCard>
    <div class="content">
        Content
    </div>
</NCard>
```

## Interactive Examples

### 1. Reactivity
- **Rule:** Documentation examples must be interactive. Use `<script setup>` with `ref` or `reactive` variables to bind to components (`v-model`, props).
- **Goal:** Users should see the value change or the component react when they interact with the demo.

### 2. Deterministic State
- **Rule:** For time-sensitive components (like Calendars), explicitly set state (e.g., `viewingYear`, `viewingWeek`) to a fixed date (e.g., Jan 2025) in the example.
- **Why:** This ensures the documentation looks the same for every user and disabled dates/events appear correctly, regardless of the actual current date.

## API Documentation Standards

Ensure every component document includes the following sections using the project's table format:

1.  **Props**: Name, Type, Default, Description.
2.  **Slots**: Name, Description, Scoped props (if any).
3.  **Events**: Name, Payload Type, Description.
4.  **Exposed Methods** (if applicable): Method signature and description.

## Practical Guidance

### 1. Recipes & FAQ
**Rule:** Every component page **MUST** include a "Recipes & FAQ" section.
- **Goal:** Address common implementation hurdles, edge cases, and best practices.
- **Content:** Include short code snippets for common tasks (e.g., "How to change themes?", "How to handle custom validation?") and answers to frequent questions found during development or testing.

## Component Updates

### 1. Synchronized Updates
**Rule:** When modifying or adding features to a component (e.g., new props, slots, or events), you **MUST** also update:
- **Storybook:** The respective `*.stories.ts` file must be updated to include a story demonstrating the new feature.
- **Documentation:** The respective `*.md` file must be updated with new interactive examples, updated API tables (Props, Slots, Events), and relevant FAQ entries.
- **Consistency:** Ensure the prop naming, default values, and descriptions are consistent across the code, Storybook, and documentation.

### 2. Input Components Inheritance
**Rule:** When updating input components (e.g., `NInputText`, `NSelect`, `NInputCombo`), **ALWAYS** check `@packages/ui/src/components/NInputField.vue` first.
- **Inheritance:** Most inputs wrap `NInputField`. Features like `size`, `color`, `helperText`, and layout slots are often implemented in `NInputField` and inherited.
- **Side Effects:** modifying `NInputField` affects all derived inputs. Ensure changes are compatible across all consumers.
- **Implementation:** Prefer implementing shared features in `NInputField` rather than duplicating logic in each wrapper, unless the feature is specific to the wrapper.
