# Getting Started

Follow these steps to install and use NUI in your Vue 3 project.

## Installation

Add `@nui/ui` to your project dependencies:

```bash
pnpm add @nui/ui
```

## Setup

In your `main.ts` or `main.js`, import the library's CSS:

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// Import NUI styles
import '@nui/ui/dist/components.css'

const app = createApp(App)
app.mount('#app')
```

## Usage

Import components directly in your Vue files:

```vue
<script setup>
import { NButton } from '@nui/ui'
</script>

<template>
  <NButton class="brand" label="Click Me" />
</template>
```
