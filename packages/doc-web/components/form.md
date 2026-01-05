# Form

A wrapper component for forms, providing layout structure, title, and status messages.

<script setup>
import { ref } from 'vue'

const loginData = ref({ username: '', password: '' })
const rememberMe = ref(false)

const formStatus = ref('info')
const formMessage = ref('Please enter your details.')

const setStatus = (s, m) => {
    formStatus.value = s
    formMessage.value = m
}

const handleSubmit = () => {
    setStatus('success', 'Form submitted successfully!')
    setTimeout(() => setStatus('info', 'Please enter your details.'), 3000)
}
</script>

## Basic Usage

<div class="w-96 my-4 vp-raw">
    <NForm @submit.prevent="handleSubmit">
        <NInputText v-model="loginData.username" label="Username" placeholder="Enter username" />
        <NInputText v-model="loginData.password" type="password" label="Password" placeholder="Enter password" />
        <NCheckbox v-model="rememberMe" label="Remember me" class="mt-2" />
        <div class="flex justify-end pt-4">
            <NButton type="submit" label="Login" class="brand" />
        </div>
    </NForm>
    <div class="mt-4 text-xs">
        Data: {{ loginData }} | Remember: {{ rememberMe }}
    </div>
</div>

```vue
<script setup>
    import { ref } from 'vue'

    const formData = ref({ username: '', password: '' })
    const handleSubmit = () => {
        // Handle submission
    }
</script>

<template>
    <NForm @submit.prevent="handleSubmit">
        <NInputText v-model="formData.username" label="Username" />
        <NInputText v-model="formData.password" type="password" label="Password" />
        <NButton type="submit" label="Login" />
    </NForm>
</template>
```

## Title & Message

You can provide a built-in title and status message using props.

<div class="w-96 my-4 vp-raw">
    <NForm 
        title="Account Access" 
        title-tag="h3"
        message="Secure login area." 
        status="info"
    >
        <NInputText label="Email" />
        <NButton class="mt-4 w-full justify-center" label="Continue" />
    </NForm>
</div>

```vue
<NForm title="Account Access" title-tag="h3" message="Secure login area." status="info">
  <NInputText label="Email" />
  <NButton class="mt-4 w-full justify-center" label="Continue" />
</NForm>
```

## Interactive Status States

Use the `status` prop to provide feedback to the user.

<div class="w-96 my-4 vp-raw">
    <div class="flex flex-wrap gap-2 mb-4">
        <NButton size="xs" label="Info" class="info" @click="setStatus('info', 'Please fill the form.')" />
        <NButton size="xs" label="Success" class="success" @click="setStatus('success', 'Saved successfully!')" />
        <NButton size="xs" label="Warning" class="warning" @click="setStatus('warning', 'Weak password.')" />
        <NButton size="xs" label="Error" class="error" @click="setStatus('error', 'Validation failed.')" />
    </div>
    <NForm title="User Profile" :status="formStatus" :message="formMessage">
        <NInputText label="Display Name" />
    </NForm>
</div>

```vue
<script setup>
    const status = ref('info')
    const message = ref('Please fill the form.')
</script>

<template>
    <NForm :status="status" :message="message">
        <NInputText label="Display Name" />
    </NForm>
</template>
```

## Custom Message Slot

For complex status messages or banners, use the `#message` slot.

<div class="w-96 my-4 vp-raw">
    <NForm>
        <template #message>
            <NBanner icon="mdi-gift" class="brand mb-4">
                <strong>Pro Tip:</strong> Sign up now for 20% off!
            </NBanner>
        </template>
        <NInputText label="Email" />
        <div class="flex justify-end pt-4">
            <NButton label="Sign Up" class="brand" />
        </div>
    </NForm>
</div>

```vue
<NForm>
  <template #message>
    <NBanner icon="mdi-gift" class="brand mb-4">
      <strong>Pro Tip:</strong> Sign up now for 20% off!
    </NBanner>
  </template>
  <NInputText label="Email" />
</NForm>
```

## Props

| Prop         | Type     | Default  | Description                                               |
| ------------ | -------- | -------- | --------------------------------------------------------- |
| `tag`        | `string` | `'form'` | HTML tag to render the wrapper.                           |
| `title`      | `string` | -        | Form title text.                                          |
| `titleTag`   | `string` | `'h1'`   | HTML tag for the title element.                           |
| `titleClass` | `string` | -        | Custom classes for the title element.                     |
| `message`    | `string` | -        | Status message text.                                      |
| `status`     | `string` | `'info'` | Status color/icon: `success`, `error`, `warning`, `info`. |

## Slots

| Slot      | Description                                           |
| --------- | ----------------------------------------------------- |
| `default` | Main form content.                                    |
| `title`   | Custom title area (replaces `title` prop).            |
| `message` | Custom message area (replaces `message` prop/banner). |

## Events

| Event    | Payload | Description                                                           |
| -------- | ------- | --------------------------------------------------------------------- |
| `submit` | `Event` | Native form submission event. Use `@submit.prevent` to handle in Vue. |

## Recipes & FAQ

### How to handle form submission?

Since `NForm` renders a native `<form>` tag by default, you can listen to the standard `@submit` event. It is best practice to use `@submit.prevent="handler"` to prevent the page from reloading.

### Can I change the root tag?

Yes. If you are using `NForm` strictly for layout (e.g., inside another form or a dialog) and don't want a nested `<form>` tag, you can set the `tag` prop to `div`.

```html
<NForm tag="div" title="Section Title">
    <!-- Content -->
</NForm>
```

### How to customize the status banner?

The default status message uses an internal banner style. If you need a completely custom look (e.g., an Alert component), use the `#message` slot. This slot replaces the default message banner entirely.
