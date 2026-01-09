# @nui/ui

Modern, accessible Vue 3 UI components powered by Tailwind CSS v4.

## Features

- 🚀 **Vue 3 SFCs**: Optimized for the modern Vue ecosystem.
- 🎨 **Tailwind CSS v4**: Built with the latest Tailwind CSS for maximum flexibility.
- 📘 **TypeScript**: Full type safety for all components and props.
- 🧩 **Flexible Consumption**: Use pre-compiled CSS or process source SFCs with your own Tailwind setup.

## Installation

```bash
pnpm add @nui/ui
```

## Usage

### 1. Import Components and CSS

For standard projects, import the components and the bundled CSS:

```vue
<script setup lang="ts">
import { NButton } from '@nui/ui';
import '@nui/ui/dist/components.css';
</script>

<template>
  <NButton intent="primary">Click Me</NButton>
</template>
```

### 2. Setup Icons (Required)

NUI components use **Material Design Icons (MDI)** for iconography. To keep the package size minimal, **the icon font is not bundled**.

You must install and import the MDI CSS in your project:

```bash
pnpm add @mdi/font
```

In your main entry file (e.g., `main.ts`):

```typescript
import '@mdi/font/css/materialdesignicons.css';
```

## Tailwind CSS v4 Integration

If you are using Tailwind CSS v4 in your project, you can import the source components directly to allow for better tree-shaking and theme integration.

### Theme Setup

Import the NUI theme in your main CSS file:

```css
@import "tailwindcss";
@import "@nui/ui/styles/index.css";

/* Your custom theme overrides here */
```

### Source Processing

Add the NUI source to your Tailwind config (or use `@source` directive in v4):

```css
@source "../../node_modules/@nui/ui/src/components/**/*.vue";
```

## Documentation

Visit the [NUI Documentation](https://nui-system.pages.dev) for full component API and examples.
