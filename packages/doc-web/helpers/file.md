# File Utilities

Helpers for handling File objects, data URLs, and MIME types.

## Import

```typescript
import { toDataURL, fromDataUrl, fromFileUrl, getMime } from '@nui/helpers'
```

## Methods

### `toDataURL(file: File): Promise<string>`
Converts a `File` object to a base64 Data URL.

```typescript
const file = event.target.files[0]
const base64 = await toDataURL(file)
// "data:image/png;base64,iVBORw0KGgo..."
```

### `fromDataUrl(dataUrl: string, fileName: string): Promise<File>`
Converts a base64 Data URL back into a `File` object.

```typescript
const file = await fromDataUrl(base64String, 'image.png')
```

### `fromFileUrl(url: string, fileName?: string): Promise<File>`
Fetches a file from a remote URL and converts it into a `File` object.

```typescript
const file = await fromFileUrl('https://example.com/logo.png', 'logo.png')
```

### `getMime(file: File): string`
Robustly determines the MIME type of a file. It first checks `file.type`, and falls back to checking the file extension if the type is missing or generic (`application/octet-stream`).

```typescript
const mime = getMime(myFile)
// "image/jpeg"
```
