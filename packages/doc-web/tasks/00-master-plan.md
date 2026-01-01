# Master Task List: Documentation Site Build

This directory contains sequential task definitions for building the documentation site for the `@packages/ui` library using VitePress.

## Overview
The goal is to create a modern, Vue-native documentation site in `packages/doc-web`. The site must:
1.  Use **VitePress**.
2.  Consume components directly from `packages/ui`.
3.  Share Tailwind CSS styling with the UI library.
4.  Provide interactive examples based on existing Storybook stories.

## Task Sequence

1.  [Task 01: Scaffolding & Installation](./01-scaffold.md)
    *   Initialize `package.json`, install dependencies, and create basic directory structure.
2.  [Task 02: Theme & Tailwind Integration](./02-theme-setup.md)
    *   Configure VitePress theme to register UI components globally.
    *   Set up Tailwind CSS to scan both docs and UI packages.
3.  [Task 03: General Components Documentation](./03-doc-general.md)
    *   Create docs for `NButton`, `NIcon`, `NAvatar`, `NChip`.
4.  [Task 04: Form Components Documentation](./04-doc-forms.md)
    *   Create docs for `NInputText`, `NCheckbox`, `NRadio`, `NToggle`, `NInputSelect`.
5.  [Task 05: Feedback & Overlay Components](./05-doc-complex.md)
    *   Create docs for `NModal`, `NToast`, `NBanner`, `NTooltip`.
6.  [Task 06: Composables Documentation](./06-doc-composables.md)
    *   Create docs for `useDialog`, `useNotify`, `useModal`.
7.  [Task 07: Guides & Navigation](./07-guides-nav.md)
    *   Create "Getting Started" guide.
    *   Finalize Sidebar and Navbar configuration.
