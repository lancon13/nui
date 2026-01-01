# Task 05: Feedback & Overlay Components

**Goal:** Document complex overlay components (`NModal`, `NDrawer`, `NToast`, `NBanner`, `NTooltip`, `NPopover`).

## Context
*   **Pre-requisite:** Theme is set up.
*   **Complexity:** These components often require a state variable (`isOpen`) to control visibility or a target element to attach to.

## Steps

1.  **Create Files**:
    *   `packages/doc-web/components/modal.md`
    *   `packages/doc-web/components/drawer.md`
    *   `packages/doc-web/components/toast.md` (Focus on the component usage, see Task 06 for the composable).
    *   `packages/doc-web/components/tooltip.md`
    *   `packages/doc-web/components/popover.md`

2.  **Content Requirements**:
    *   **Triggers:** Show buttons that toggle the `v-model` for Modals/Drawers.
    *   **Tooltips/Popovers:** Show them wrapping a button or text.
    *   **Directives:** If `v-tooltip` exists as a directive, document it here.
    *   **Slots:** Document `header`, `footer`, `default` slots for Cards/Modals.

3.  **Navigation**:
    *   Update config to add "Feedback" and "Overlay" sidebar groups.

## Outcome
Interactive demos where clicking buttons opens modals/drawers or hovering triggers tooltips.
