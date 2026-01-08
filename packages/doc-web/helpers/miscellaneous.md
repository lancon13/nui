# Miscellaneous Helpers

A collection of system tools, enum helpers, and validation utilities.

## Tools

General purpose JavaScript utilities.

```typescript
import { delay, debounce, throttle, tryCall, generatePseudoRandomKey } from '@nui/helpers'
```

### `delay(ms)`
Promisified `setTimeout`.
```typescript
await delay(1000) // Wait 1 second
```

### `tryCall(func)`
Wraps an async function in a try-catch block and returns a `[error, result]` tuple (Go-style error handling).
```typescript
const [err, data] = await tryCall(apiFunction)
if (err) console.error(err)
else console.log(data)
```

### `generatePseudoRandomKey()`
Generates a random alphanumeric string (e.g., `x7z9a2b`). Useful for temporary unique IDs.

## Enum Helpers

Utilities for working with TypeScript Enums.

```typescript
import { getEnumKeys, getEnumValues, getEnumObject } from '@nui/helpers'

enum Status {
    Active = 'active',
    Inactive = 'inactive'
}

getEnumKeys(Status) // ['Active', 'Inactive']
getEnumValues(Status) // ['active', 'inactive']
getEnumObject(Status) // { Active: 'active', Inactive: 'inactive' }
```

## Constants & Options

Pre-defined lists commonly used in applications.

```typescript
import { 
    currencyOptions, 
    languageOptions, 
    subjectOptions,
    questionTypeOptions
} from '@nui/helpers'
```

- **currencyOptions**: List of world currencies with symbols.
- **languageOptions**: List of common languages/locales.
- **subjectOptions**: School subjects.

## Validation

### `isUUID(str)`
Checks if a string is a valid UUID (v1-v5).

```typescript
import { isUUID } from '@nui/helpers'

isUUID('123e4567-e89b-12d3-a456-426614174000') // true
```

## Component Helpers

### `renderComponent`
Programmatically renders a Vue component into a DOM element.

```typescript
import { renderComponent } from '@nui/helpers'
import MyComponent from './MyComponent.vue'

const { component, unmount } = renderComponent({
    app: myVueApp,
    el: document.body,
    component: MyComponent,
    props: { title: 'Hello' }
})
```
