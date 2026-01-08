# useForm <NChip class="text-xs flat">@nui/helpers</NChip>

A powerful form management composable built on top of [Zod](https://zod.dev/) and [VueUse](https://vueuse.org/). It provides deep reactivity, field-level validation, change tracking, and undo/redo history.

## Basic Usage

<script setup>
import { ref } from 'vue'
import { useForm } from '@nui/helpers'

const { data, errors, validate, isValid } = useForm({
    name: '',
    email: ''
})

const handleSubmit = () => {
    validate()
    if (isValid.value) {
        alert('Form is valid: ' + JSON.stringify(data.value))
    }
}

const historyForm = useForm({ text: 'Initial' })
</script>

<div class="my-4 p-4 border border-border rounded bg-surface vp-raw w-full">
    <div class="flex flex-col gap-4">
        <NInputField label="Name" :helperText="errors.name?.[0]?.message" :class="{ error: errors.name }">
            <input v-model="data.name" class="w-full bg-transparent outline-none" placeholder="Enter name" />
        </NInputField>
        <NInputField label="Email" :helperText="errors.email?.[0]?.message" :class="{ error: errors.email }">
            <input v-model="data.email" class="w-full bg-transparent outline-none" placeholder="Enter email" />
        </NInputField>
        <NButton label="Validate & Submit" class="brand" @click="handleSubmit" />
    </div>
    <div class="mt-4 p-2 bg-surface-indent rounded text-xs font-mono">
        <div>isValid: {{ isValid }}</div>
        <div>Errors: {{ errors }}</div>
    </div>
</div>

```vue
<script setup>
import { useForm } from '@nui/helpers'
import * as z from 'zod'

const { data, validate, isValid, errors } = useForm({
  name: '',
  email: ''
}, {
  // Optional: Define Zod schema manually (auto-inferred if omitted)
  initialSchemas: z.object({
    name: z.string().min(3, 'Name must be at least 3 chars'),
    email: z.string().email('Invalid email address')
  })
})

const submit = () => {
  validate()
  if (isValid.value) {
    // submit(data.value)
  }
}
</script>
```

## Features

### Validation (Zod)

`useForm` uses Zod for schema validation. You can provide an `initialSchemas` object where keys match your data keys. If you don't provide a schema, it defaults to `z.any()` for all fields.

```typescript
const form = useForm({ age: 10 }, {
    initialSchemas: z.object({
        age: z.number().min(18, 'Must be 18+')
    })
})
```

### History (Undo/Redo)

State history is tracked automatically. You can undo changes or reset the form to its initial state.

<div class="my-4 p-4 border border-border rounded bg-surface vp-raw w-full">
    <div class="flex gap-2 mb-2">
        <NButton size="xs" label="Undo" :disabled="!historyForm.history.value.length" @click="historyForm.undo()" />
        <NButton size="xs" label="Redo" @click="historyForm.redo()" />
        <NButton size="xs" label="Reset" class="warning" @click="historyForm.reset()" />
    </div>
    <NInputField label="Type something...">
        <input v-model="historyForm.data.value.text" class="w-full bg-transparent outline-none" />
    </NInputField>
</div>

```typescript
const { undo, redo, reset, history } = useForm({ ... })

// Reset to initial state
reset()

// Reset to specific new state
reset({ name: 'New Name' })
```

### Dirty & Change Tracking

- **isDirty**: `true` if the form data is different from the last *committed* state (or initial state).
- **isChanged**: `true` if there are unsaved changes in the history stack.
- **changes**: An object containing only the fields that have changed.

## API

### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `initialSchemas` | `ZodObject` | `z.any()` | Zod schema definition. |
| `immediateValidate` | `boolean` | `true` | Validate on creation and on change. |
| ... | | | Supports all `useRefHistory` options (capacity, clone, etc). |

### Returns

| Property | Type | Description |
| --- | --- | --- |
| `data` | `Ref<T>` | The reactive form data. |
| `errors` | `Computed<Record<string, ZodIssue[]>>` | Validation errors grouped by field. |
| `isValid` | `Computed<boolean>` | True if no errors. |
| `isDirty` | `Computed<boolean>` | True if data differs from base state. |
| `validate()` | `Function` | Triggers validation manually. |
| `reset(newData?)` | `Function` | Resets form to initial or new state. |
| `undo()` | `Function` | Revert to previous state. |
| `redo()` | `Function` | Revert the undo. |
| `getRawData()` | `Function` | Returns deep raw object (unwrapped refs). |

## Recipes & FAQ

### How to use with NUI Input components?
Simply bind `v-model` to `data.fieldName`. To show errors, pass `errors.fieldName?.[0]?.message` to the `helperText` or `message` prop of the input, and check if the error exists to apply the `error` class.

```vue
<NInputText 
    v-model="data.username" 
    :helperText="errors.username?.[0]?.message" 
    :class="{ error: errors.username }" 
/>
```

### How to validate nested objects?
Zod supports nested schemas. Ensure your initial data structure matches the schema structure.

```typescript
const { data } = useForm({
    user: { name: 'John', address: { city: 'NY' } }
}, {
    initialSchemas: z.object({
        user: z.object({
            name: z.string(),
            address: z.object({ city: z.string() })
        })
    })
})
```

### How to get the raw data for API submission?
Use the `getRawData()` helper method. It unwraps all proxies and refs, returning a plain JavaScript object ready for JSON serialization.

```typescript
const payload = form.getRawData()
await api.post('/users', payload)
```