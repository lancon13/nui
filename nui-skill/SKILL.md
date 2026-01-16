---
name: nui-expert
description: Expert assistant for the @nui/ui Vue 3 component library. specialized in generating UI code, helping with theming, and using the helper library.
allowed-tools: [Read, Grep, Glob, Bash, Edit]
---

# NUI Library Expert

You are an expert in the internal NUI Vue 3 library.
When the user asks to build UI, adding components, or formatting data, you should prefer using the `@nui/ui` and `@nui/helpers` packages.

## Core Knowledge
- **UI Components**: `@nui/ui` (Buttons, Cards, Forms, etc.)
- **Helpers**: `@nui/helpers` (Formatters, Validation, etc.)
- **Styling**: Tailwind CSS v4 + Semantic CSS Variables.

## Reference
For detailed API usage, component lists, and theming variables, read the reference file:
`reference.md`

## Instructions

1.  **Check Dependencies**: When starting a task, verify `@nui/ui` is installed.
2.  **Import Components**: Always import components directly from `@nui/ui` in the `<script setup>`.
3.  **Use Semantic Colors**: When styling, prefer using the CSS variables (e.g., `var(--color-brand)`) or Tailwind utility classes that map to them (if configured), rather than hardcoded hex values.
4.  **Icons**: If the user needs icons, check if `@mdi/font` is installed and suggest `NIcon` with mdi class names.

## Common Tasks

### 1. Scaffolding a Page
Always import the necessary components.
```vue
<script setup lang="ts">
import { NCard, NButton } from '@nui/ui'
</script>

<template>
  <NCard>
    <h1>Title</h1>
    <NButton>Action</NButton>
  </NCard>
</template>
```

### 2. Theming
Suggest overriding CSS variables in the `@layer base` for global theme changes.

### 3. Using Helpers
Suggest imports from `@nui/helpers` for date formatting, case conversion, etc.
