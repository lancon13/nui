# Form

A wrapper component for forms, providing layout structure, title, and status messages.

<script setup>
import { ref } from 'vue'
</script>

## Basic Usage

<div class="w-96 my-4 vp-raw">
    <NForm>
        <NInputText label="Username" />
        <NInputText label="Password" type="password" />
        <div class="flex justify-end pt-4">
            <NButton label="Submit" class="brand" />
        </div>
    </NForm>
</div>

```vue
<NForm>
  <NInputText label="Username" />
  <NInputText label="Password" type="password" />
  <NButton type="submit">Submit</NButton>
</NForm>
```

## Title & Message

<div class="w-96 my-4 vp-raw">
    <NForm title="Login" message="Please enter your credentials" status="info">
        <NInputText label="Email" />
    </NForm>
</div>

```vue
<NForm title="Login" message="Please enter credentials" status="info">
  ...
</NForm>
```

## Status States

<div class="grid grid-cols-2 gap-8 my-4 vp-raw">
    <NForm title="Success" message="Saved successfully" status="success" />
    <NForm title="Error" message="Validation failed" status="error" />
</div>

```vue
<NForm status="success" message="Saved" />
<NForm status="error" message="Failed" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | `string` | `'form'` | HTML tag. |
| `title` | `string` | - | Form title. |
| `titleTag` | `string` | `'h1'` | Tag for title. |
| `message` | `string` | - | Status message text. |
| `status` | `string` | `'info'` | `success`, `error`, `warning`, `info`. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Form content. |
| `title` | Custom title area. |
| `message` | Custom message area (replaces banner). |
