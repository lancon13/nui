# Getting Started

Follow these steps to integrate the NUI library into your Vue 3 project.

## Prerequisites

Ensure your project is set up with:
- **Vue 3**
- **Tailwind CSS v4+** (Required as a peer dependency)

## Installation

Install the library alongside your existing dependencies:

::: code-group
```bash [npm]
npm install @nui/ui
```
```bash [pnpm]
pnpm add @nui/ui
```
:::

## Setup

Import the library's compiled CSS in your application's entry point (e.g., `main.ts` or `main.js`). This file contains all necessary component styles.

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import './style.css' // Your own styles

// Import NUI Library Styles
import '@nui/ui/dist/components.css'

createApp(App).mount('#app')
```

## Icons (Optional)

NUI relies on **Material Design Icons (MDI)** for its icon system. The font assets are **not included** in the main bundle to keep the size small.

If you plan to use `NIcon` or components that depend on icons (like Inputs with icons, Alerts, etc.), you must install and import the font manually.

1. **Install the package:**

::: code-group
```bash [npm]
npm install @mdi/font
```
```bash [pnpm]
pnpm add @mdi/font
```
:::

2. **Import the CSS** in your `main.ts` (before or after NUI styles):

```typescript
import '@mdi/font/css/materialdesignicons.css'
```

## Usage

You can now import and use components directly in your Vue files. Treeshaking is supported out of the box.

```vue
<script setup lang="ts">
import { NButton, NCard } from '@nui/ui'
</script>

<template>
  <NCard class="p-4">
    <h2 class="text-xl font-bold mb-4">Hello World</h2>
    <NButton class="brand">Click Me</NButton>
  </NCard>
</template>
```

## Theming

NUI uses modern CSS variables defined in the CSS `@theme` or `:root` scope. You can easily customize the look to match your brand by overriding these variables in your own global CSS.

**Example `src/style.css`:**

```css
@import "tailwindcss";

@layer base {
  :root {
    /* Override NUI Library Brand Color */
    --color-brand: oklch(0.6 0.15 200); /* Custom Blue */
    
    /* Override Border Radius */
    --radius-element: 0.5rem;
  }
}
```

For a full list of available variables, refer to the [Theming](./theming.md) guide.