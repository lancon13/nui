# useCall <NChip class="text-xs flat">@nui/helpers</NChip>

A robust wrapper for asynchronous operations that handles loading states, errors, caching, debouncing, and throttling.

## Basic Usage

<script setup>
import { useCall } from '@nui/helpers'
import { ref } from 'vue'

// Mock async function
const mockApi = async (id) => {
    await new Promise(r => setTimeout(r, 1000))
    if (id === 'error') throw new Error('Simulated failure')
    return { id, title: `Result for ${id}`, timestamp: Date.now() }
}

const { call, result, isLoading, error } = useCall(mockApi)
</script>

<div class="my-4 p-4 border border-border rounded bg-surface vp-raw w-full">
    <div class="flex gap-2 mb-4">
        <NButton label="Fetch Data" class="brand" :loading="isLoading" @click="call('item-1')" />
        <NButton label="Trigger Error" class="error" :loading="isLoading" @click="call('error')" />
    </div>
    <div v-if="isLoading" class="p-4 bg-surface-indent rounded animate-pulse">
        Loading...
    </div>
    <div v-else-if="error" class="p-4 bg-error/10 text-error rounded">
        Error: {{ error.message }}
    </div>
    <div v-else-if="result" class="p-4 bg-success/10 text-success rounded">
        <pre class="text-xs">{{ result }}</pre>
    </div>
    <div v-else class="text-sm opacity-50">
        No data fetched yet.
    </div>
</div>

```typescript
import { useCall } from '@nui/helpers'

const fetchUser = async (id: string) => {
  return fetch(`/api/users/${id}`).then(r => r.json())
}

const { call, result, isLoading, error } = useCall(fetchUser)

// Execute
await call('123')
```

## Features

### Caching

By default, `useCall` caches results based on the arguments passed. If you call it again with the same arguments within the `cacheDuration` (default 5000ms), it returns the cached promise immediately without re-executing the function.

```typescript
const api = useCall(fetchData, { 
    useCache: true,
    cacheDuration: 10000 // 10 seconds
})

// First call: Network request
api.call('A') 

// Second call (immediate): Returns cached result
api.call('A')
```

### Debounce & Throttle

Prevent excessive calls (e.g., search inputs) using built-in debounce or throttle.

```typescript
const search = useCall(doSearch, {
    debounce: 500 // Wait 500ms after last call
})
```

### Reactive Parameters

You can pass `initialParams` as a ref. `useCall` can observe changes and auto-refresh.

```typescript
const filter = ref('active')

const api = useCall(fetchList, {
    initialParams: [filter], // Pass as array
    paramsChangedRefresh: true
})

// Now changing filter.value will automatically trigger the call
filter.value = 'archived'
```

## API

### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `initialParams` | `any[]` | `[]` | Default arguments for the function. |
| `initialResult` | `any` | `undefined` | Initial value for `result`. |
| `useCache` | `boolean` | `true` | Enable caching. |
| `cacheDuration` | `number` | `5000` | Cache TTL in milliseconds. |
| `debounce` | `number` | `0` | Debounce time in ms. |
| `throttle` | `number` | `0` | Throttle time in ms. |
| `paramsChangedRefresh` | `boolean` | `false` | Auto-re-execute when `initialParams` ref changes. |
| `onData` | `Function` | - | Callback on successful data. |
| `onError` | `Function` | - | Callback on error. |

### Returns

| Property | Type | Description |
| --- | --- | --- |
| `result` | `Ref<T>` | The successful result of the promise. |
| `error` | `Ref<Error>` | Error object if failed. |
| `isLoading` | `Ref<boolean>` | True while promise is pending. |
| `isExecuting` | `Ref<boolean>` | True during execution (debounced calls might not set this immediately). |
| `call(...args)` | `Function` | Manually execute the function. |
| `refresh()` | `Function` | Re-execute with the last used arguments. |
| `cache(flag)` | `Function` | Chainable: toggle caching for next call. |
| `immediate(flag)` | `Function` | Chainable: skip debounce for next call. |

## Recipes & FAQ

### How do I manually refresh data?
Use the `refresh()` method returned by the composable. It will re-execute the function using the last known arguments.

```typescript
const { refresh } = useCall(getData)
// ... later
refresh()
```

### Can I skip the cache for a specific call?
Yes, you can use the chainable `cache(false)` method before calling.

```typescript
const { call, cache } = useCall(getData)
// Force fresh request
call(params).cache(false) 
```

### How to use with TypeScript types?
You can provide generic types to `useCall`. The first generic is the array of arguments, the second is the return type.

```typescript
useCall<[string, number], User>(fetchUser)
```