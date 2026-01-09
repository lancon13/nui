# @nui/helpers

General purpose TypeScript and Vue 3 helper functions for the NUI ecosystem.

## Installation

```bash
npm install @nui/helpers
# or
pnpm add @nui/helpers
```

## Modules

The library is organized into several modules, each providing specific functionality:

### 1. **Call (`useCall`)**
A powerful wrapper for asynchronous operations with built-in support for:
- Debouncing and Throttling.
- Automatic caching with configurable duration.
- Parameters-based refresh.
- Loading and execution states.

### 2. **Form (`useForm`)**
Zod-based form management with:
- Deep reactivity and history (undo/redo).
- Field-level validation and error tracking.
- Dirty/Changed state detection.
- Deep raw data extraction.

### 3. **Formatter**
- `toClassName(binding)`: Normalizes complex Vue-style class bindings.
- `toCamelCase` / `toSnakeCase` / `toCapitalCase`: String case transformations.
- `toData` / `fromData`: Recursive object key transformation (Camel/Snake).
- `toDateString` / `toCurrency` / `toNumber`: Locale-aware formatting.

### 4. **Data Utilities**
- `toRawDeep(data)`: Recursively unwraps Vue reactive objects to plain JS objects.
- `SnakeCase<T>` / `CamelCase<T>`: TypeScript types for key transformation.

### 5. **Enum Helpers**
Utilities to work with TypeScript enums:
- `getEnumKeys`, `getEnumValues`, `getEnumObject`.
- `findEnumIndex`, `findEnumKey`.

### 6. **File Utilities**
- `toDataURL` / `fromDataUrl`.
- `fromFileUrl`: Fetches a remote URL and converts it to a `File` object.
- `getMime`: extension-based MIME type detection.

### 7. **Component Helpers**
- `listChildComponentMethods`: Helper to expose methods from a child component ref.
- `asyncLoadComponent`: Wrapper for `defineAsyncComponent`.
- `renderComponent`: Programmatically render a Vue component into a DOM element.

### 8. **Constants**
- `currencyOptions`, `languageOptions`, `yearLevelOptions`, `subjectOptions`, `questionTypeOptions`.

### 9. **General Tools**
- `delay(ms)`: Promisified setTimeout.
- `debounce` / `throttle`: Standard performance utilities.
- `tryCall`: Tuple-based error handling for promises (`[error, result]`).
- `generatePseudoRandomKey`: Alphanumeric key generator.

## NUI Ecosystem

This package is part of the NUI ecosystem. If you are using `@nui/ui` alongside these helpers, please note that NUI components rely on **Material Design Icons (MDI)** for iconography.

To set up icons in your project:

1. Install the font:
   ```bash
   npm install @mdi/font
   ```
2. Import the CSS in your main entry file:
   ```typescript
   import '@mdi/font/css/materialdesignicons.css';
   ```

## Extension & Modification

When adding or modifying helpers:
1. **Shared Logic**: If a logic or utility is used across multiple components or could be useful to the user, place it in `@nui/helpers`.
2. **Type Safety**: Always provide proper TypeScript types and generics.
3. **Exports**: Ensure new files are added to `src/index.ts`.
4. **Dependencies**: If adding external dependencies, ensure they are listed in `packages/helpers/package.json`.