# Agent Skill: NUI (Vue 3 UI Library)

**Description:**
NUI is a Vue 3 component library built on top of Tailwind CSS v4. It provides a set of pre-styled, customizable components and utility helpers for building modern web applications. It uses a semantic color system and CSS variables for theming.

## 1. Installation & Setup

### Dependencies
- **Vue 3**
- **Tailwind CSS v4+**
- **@mdi/font** (Optional, for icons)

### Shell Commands
```bash
# Install UI library
npm install @nui/ui

# Install Icons (Optional)
npm install @mdi/font
```

### Entry Point Configuration (`main.ts`)
```typescript
import { createApp } from 'vue'
import App from './App.vue'

// 1. Import NUI Styles
import '@nui/ui/dist/components.css'

// 2. Import Icons (if used)
import '@mdi/font/css/materialdesignicons.css'

createApp(App).mount('#app')
```

## 2. Usage Patterns

### Component Import
Components are tree-shakable. Import them directly from `@nui/ui`.

```vue
<script setup lang="ts">
import { NButton, NCard, NInputText } from '@nui/ui'
</script>

<template>
  <NCard>
    <NInputText placeholder="Enter name" />
    <NButton class="brand">Submit</NButton>
  </NCard>
</template>
```

### Theming (CSS Variables)
NUI uses CSS variables for customization. Override them in your global CSS (e.g., within `@layer base`).

| Category | Variables | Description |
| :--- | :--- | :--- |
| **Brand** | `--color-brand`, `--color-brand-light`, `--color-brand-dark` | Primary action color. |
| **Status** | `--color-success`, `--color-warning`, `--color-error`, `--color-info` | Status indicators. |
| **Text** | `--color-text`, `--color-text-light`, `--color-text-invert` | Typography colors. |
| **Surface** | `--color-surface`, `--color-surface-indent` | Backgrounds & nesting levels. |
| **Radius** | `--radius-element`, `--radius-container`, `--radius-full` | Rounded corners. |
| **Spacing** | `--spacing-base`, `--spacing-xs`, `--spacing-md` | Layout spacing units. |

## 3. Component Reference

### Forms & Input
- **`NButton`**: Standard button.
- **`NInputText`**: Text input field.
- **`NInputCombo`**: ComboBox/Autocomplete style input.
- **`NInputSelect`**: Dropdown select.
- **`NCheckbox`**: Checkbox input.
- **`NRadio`**: Radio button.
- **`NToggle`**: Switch/Toggle input.
- **`NForm`**: Wrapper for form handling.

### Display & Feedback
- **`NAvatar`**: User profile image/initials.
- **`NCard`**: Content container.
- **`NBanner`**: Alert/Notification banner.
- **`NChip`**: Compact element for tags/status.
- **`NIcon`**: Wrapper for MDI icons.
- **`NLoading`**: Loading spinner/indicator.
- **`NToast`**: Toast notifications.
- **`NTooltip`**: Hover tooltips.

### Navigation & Overlays
- **`NMenu`**: Dropdown or side menu.
- **`NTabs` / `NTab`**: Tabbed interface.
- **`NModal`**: Dialog modal.
- **`NDrawer`**: Side panel drawer.
- **`NPopover`**: Floating content.

## 4. Helper Library (`@nui/helpers`)

NUI includes a suite of utility functions.

### Formatters
```typescript
import { toCurrency, toDateString, toCamelCase, toSnakeCase } from '@nui/helpers'

toCurrency(1000) // "$1,000.00"
toDateString(new Date()) // "16 Jan 2026 (Fri)"
toCamelCase('user_name') // "userName"
toSnakeCase('userName') // "user_name"
```

### Tools
```typescript
import { delay, debounce, throttle, tryCall } from '@nui/helpers'

await delay(1000) // Wait 1 second
const safeCall = await tryCall(asyncFunction) // Returns [error, result]
```

### Validation
```typescript
import { isUUID } from '@nui/helpers'
```
