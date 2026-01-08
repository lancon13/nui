# Formatting Helpers

A collection of utility functions for formatting strings, dates, numbers, and Vue classes.

## Import

```typescript
import { 
    toClassName, 
    toCamelCase, 
    toSnakeCase, 
    toDateString, 
    toCurrency 
} from '@nui/helpers'
```

## String Formatting

| Function | Description | Example Input | Example Output |
| --- | --- | --- | --- |
| `toCamelCase(str)` | Converts to camelCase. | `user_name` | `userName` |
| `toSnakeCase(str)` | Converts to snake_case. | `userName` | `user_name` |
| `toCapitalCase(str)` | Capitalizes first letter. | `hello world` | `Hello world` |
| `toInitial(str, limit)` | Extracts initials. | `John Doe` | `JD` |

## Date & Time

Powered by [Day.js](https://day.js.org/).

| Function | Default Format | Description |
| --- | --- | --- |
| `toDateString(date)` | `DD MMM YYYY (ddd)` | Readable date string. |
| `toDateInput(date)` | `YYYY/MM/DD` | Format suitable for date inputs. |
| `toTimeString(date)` | `hh:mm A` | Time string (e.g., 10:30 AM). |

## Numbers & Currency

| Function | Description | Example |
| --- | --- | --- |
| `toCurrency(val, currency)` | Formats as currency. | `toCurrency(100, 'USD')` → `$100.00` |
| `toNumber(val)` | Formats with locale separators. | `toNumber(10000)` → `10,000` |

## Vue Helpers

### `toClassName(binding)`
Normalizes various Vue class binding formats (string, array, object) into a single class string. Useful when building render functions or custom directives.

```typescript
toClassName('foo bar') // 'foo bar'
toClassName(['foo', 'bar']) // 'foo bar'
toClassName({ foo: true, bar: false }) // 'foo'
```

## Data Transformation

### `toData(obj)` (CamelCase)
Recursively converts all object keys to **camelCase**. Useful for normalizing API responses.

```typescript
const apiResponse = { user_id: 1, first_name: 'John' }
const data = toData(apiResponse)
// { userId: 1, firstName: 'John' }
```

### `fromData(obj)` (SnakeCase)
Recursively converts all object keys to **snake_case**. Useful for sending data to APIs.

```typescript
const payload = { userId: 1, firstName: 'John' }
const data = fromData(payload)
// { user_id: 1, first_name: 'John' }
```
