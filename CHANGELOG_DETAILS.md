# Detailed Changelog: NUI Component Refactoring

**Date:** December 24, 2025

This document details the specific changes made to each component within `@packages/ui/src/components/` during the refactoring and accessibility audit.

## Global Changes
- **Class Renaming:** Replaced all occurrences of `.primary` CSS class with `.brand`.
- **Loading Pattern:** Standardized props `loadingType` -> `loadingName` and ensured consistent use of `loadingClass`.
- **Icon Naming:** Standardized icon names to use `mdi-` prefix (e.g., `mdi-account` instead of `account`).

## Component Details

### NAvatar
- **New Features:** Added `src` and `alt` props for image avatars.
- **Sizing:** Implemented absolute positioning for images to ensure they fill the container without affecting layout size.
- **A11y:** Added `role="button"`, `tabindex="0"`, and `@keydown.enter.space.prevent` for clickable avatars. Added `aria-hidden` to label when image is present to prevent duplicate announcements.
- **Styles:** Simplified logic, removed redundant padding calculations for images.

### NBanner
- **Refactoring:** Simplified template structure and CSS nesting.
- **A11y:** Changed `role="banner"` to `role="status"`. Added `aria-live="polite"` and `aria-atomic="true"`.
- **Styles:** Consolidated color variant logic using the new `.brand` class.

### NButton
- **Props:** Renamed `loadingType` to `loadingName`.
- **Refactoring:** Consolidated Tailwind CSS `@apply` rules, grouping color variants.
- **A11y:** Added `aria-busy` for loading state, `aria-disabled` for non-button tags, and `aria-hidden="true"` for decorative icons.

### NCard
- **Props:** Renamed `loadingType` to `loadingName`.
- **Refactoring:** Cleaned up nested CSS logic for indentations.
- **A11y:** Added `role="button"` and `tabindex="0"` for clickable cards. Added keyboard interaction support.

### NCheckbox
- **Refactoring:** Significantly simplified `exportedProps` computed property by removing manual event mapping.
- **Styles:** Updated to use `.brand` class and simplified Tailwind logic.
- **A11y:** Ensured `aria-hidden="true"` on icons.

### NChip
- **Refactoring:** Simplified `exportedProps` and template structure.
- **Styles:** Updated color variants to use `.brand`.
- **A11y:** Added keyboard support for clickable chips and `aria-hidden` for icons. Improved removable logic.

### NDrawer
- **Refactoring:** Consolidated transition logic into a cleaner template structure.
- **A11y:** Changed `role="drawer"` (invalid) to `role="dialog"`. Added `aria-modal="true"` when overlay is present.
- **Styles:** Updated transitions and indentation.

### NForm
- **Refactoring:** Simplified `bannerIcon` logic using a map object.
- **Styles:** Updated to use `.brand` class.
- **A11y:** Ensured banner message announcements.

### NIcon
- **Refactoring:** Simplified `iconClasses` logic.
- **A11y:** Added `role="img"` or `role="button"` based on interactivity. Added `aria-disabled`.

### NInputField
- **Refactoring:** Renamed `loadingType` to `loadingName`. Simplified `exportedProps` reducing boilerplate.
- **Styles:** Updated to use `.brand` class.
- **A11y:** Added `aria-busy`, `aria-hidden` for icons, and `inputId` for label association.

### NInputSearch
- **Refactoring:** Simplified `compBind` and `processItems` logic.
- **Styles:** Updated to use `.brand` class.
- **A11y:** Added `role="combobox"`, `aria-autocomplete`, and `aria-expanded`. Added keyboard navigation support (arrows, enter, escape).

### NInputSelect
- **Refactoring:** Simplified `getSelectValue` and `compBind`.
- **Styles:** Updated to use `.brand` class.
- **A11y:** Ensure proper labeling and `aria-hidden` for icons.

### NInputText
- **Refactoring:** Simplified input event handling logic.
- **Styles:** Updated to use `.brand` class.

### NList / NListItem
- **Refactoring:** Consolidated template blocks in `NListItem`. Simplified `createNodesFromData` in `NList`.
- **A11y:** Added `role="list"` and `role="listitem"`. Added `role="button"`/`link` and keyboard support for interactive items.
- **Styles:** Updated to use `.brand` class.

### NLoading
- **Refactoring:** Replaced `switch` statement with a configuration map.
- **Styles:** Updated to use `.brand` class.

### NMenu
- **Refactoring:** Simplified `createNodesFromData` logic.
- **A11y:** Added `role="menu"` and `role="menuitem"`.
- **Styles:** Updated to use `.brand` class.

### NModal
- **Refactoring:** Simplified template and class application.
- **A11y:** Added `aria-modal="true"` when overlay is active.
- **Styles:** Updated to use `.brand` class.

### NPopover
- **Refactoring:** Consolidated template using a shared content block.
- **A11y:** Changed `role="popover"` to `role="presentation"` wrapper where appropriate, or ensured content handles roles.
- **Styles:** Updated to use `.brand` class.

### NRadio
- **Refactoring:** Simplified `exportedProps` and template.
- **Styles:** Updated to use `.brand` class.
- **A11y:** Added `aria-hidden="true"` to decorative icons.

### NTab / NTabs
- **Props:** Renamed `loadingType` to `loadingName`.
- **Refactoring:** significantly simplified CSS by grouping color variant logic (solid, flat, outlined, texted).
- **A11y:** Added `role="tablist"` and `role="tab"`. Added `aria-selected` and `aria-busy`.
- **Styles:** Updated to use `.brand` class.

### NToast
- **Refactoring:** Refined transition logic and template structure.
- **A11y:** Changed `role="log"` to `role="status"` with `aria-live="polite"` and `aria-atomic="true"`.
- **Styles:** Updated to use `.brand` class.

### NToggle
- **Refactoring:** Simplified template and `exportedProps`.
- **Styles:** Consolidated track and thumb color logic using `.brand`.
- **A11y:** Added `aria-hidden="true"` to thumb icons.

### NTooltip
- **Refactoring:** Consolidated template using a shared content block.
- **A11y:** Validated `role="tooltip"`.
- **Styles:** Updated to use `.brand` class.
