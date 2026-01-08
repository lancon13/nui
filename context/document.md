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

### 2. Styling Constraints
- **Rule:** **DO NOT** use `max-w-*` utility classes (e.g., `max-w-md`, `max-w-4xl`) in documentation examples.
- **Why:** These constraints often conflict with the responsive container width of the documentation site, leading to inconsistent or cramped layouts. Use `w-full` or specific fixed widths if strictly necessary.

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

### 3. Shared Logic & Helpers
**Rule:** Any logic, utility function, or constant that is not strictly component-specific **MUST** be placed in `@nui/helpers`.
- **DRY:** Do not duplicate utility functions (like date formatting or string manipulation) inside component files.
- **Exposure:** If a helper is useful for the end-user (e.g., `useForm`, `toCurrency`), ensure it is exported in `@packages/helpers/src/index.ts` and mentioned in the documentation or README.
- **Standardization:** When writing documentation examples that require complex logic (e.g., a specific date format), use the functions from `@nui/helpers` instead of writing inline vanilla JS.
