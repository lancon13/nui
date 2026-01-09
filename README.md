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

3.  **Setup Icons** (Required for icons):
    NUI components use [Material Design Icons (MDI)](https://materialdesignicons.com/) via CSS classes. To keep the library lightweight, **the icon font is not bundled with the library**. 

    If you use any component with icons (e.g., `NIcon`, `NButton`, `NInput`), you **must** include the MDI CSS in your project:

    ```bash
    npm install @mdi/font
    ```

    Then import it in your main entry file (e.g., `main.ts`):

    ```typescript
    import '@mdi/font/css/materialdesignicons.css';
    ```

## Tailwind CSS v4 Integration

For projects using Tailwind CSS v4, you can integrate NUI's theme variables directly:

```css
/* In your main CSS file */
@import "tailwindcss";
@import "@nui/ui/styles/theme.css"; /* NUI Theme Variables */

/* To process NUI components source */
@source "./node_modules/@nui/ui/src/components/**/*.vue";
```

## Local Consumption

Since this package is not published to npm, you can use it locally in other projects:

### Option 1: Local Path (Recommended for development)

1.  In your consumer project:
    ```bash
    pnpm add /path/to/nui/packages/ui
    # or
    npm install /path/to/nui/packages/ui
    ```

### Option 2: Packing (Recommended for sharing)

1.  Build the project:
    ```bash
    pnpm build
    ```

2.  Pack the UI library:
    ```bash
    cd packages/ui
    pnpm pack
    ```
    This will generate a `.tgz` file (e.g., `nui-ui-0.0.1.tgz`).

3.  In your consumer project, install the tarball:
    ```bash
    pnpm add /path/to/nui/packages/ui/nui-ui-0.0.1.tgz
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
    This will start the VitePress documentation site locally. Icons are pre-configured for the documentation site.

-   **Start Storybook**:
    ```bash
    pnpm ui:storybook
    ```
    This starts the Storybook environment. Icons are pre-configured for Storybook development.

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
