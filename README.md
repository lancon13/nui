# NUI

NUI is a modern, comprehensive Vue 3 UI component library powered by Tailwind CSS. It provides a set of reusable, accessible, and customizable components to build consistent user interfaces.

## Features

-   🚀 **Vue 3**: Built for the latest Vue ecosystem.
-   🎨 **Tailwind CSS**: Styled with Tailwind CSS for flexibility and performance.
-   📘 **TypeScript**: Fully typed for better developer experience.
-   🧩 **Rich Component Set**: Includes Buttons, Forms, Overlays, Data Display, and more.
-   🛠 **Composables**: Useful composition functions like `useDialog`, `useNotify`, etc.

## Installation

```bash
npm install @nui/ui
# or
pnpm add @nui/ui
# or
yarn add @nui/ui
```

## Usage

1.  **Import the CSS**:
    Import the library's CSS in your main entry file (e.g., `main.ts` or `App.vue`).

    ```typescript
    import '@nui/ui/dist/components.css';
    ```

2.  **Import and use components**:

    ```vue
    <script setup lang="ts">
    import { NButton } from '@nui/ui';
    </script>

    <template>
      <NButton intent="primary">Click Me</NButton>
    </template>
    ```

## Development

This project is a monorepo managed with [pnpm](https://pnpm.io/).

### Prerequisites

-   Node.js (>=18)
-   pnpm (>=9)

### Setup

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd nui
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Running the Project

-   **Start Development Server (Documentation)**:
    ```bash
    pnpm dev
    ```
    This will start the VitePress documentation site locally.

-   **Start Storybook**:
    ```bash
    pnpm ui:storybook
    ```
    This starts the Storybook environment for developing and testing components in isolation.

### Building

-   **Build all packages**:
    ```bash
    pnpm build
    ```

### Linting & Formatting

-   **Format code**:
    ```bash
    pnpm format
    ```

## License

ISC
