# Page Layout

Learn how to combine NUI components to build a professional, responsive application shell.

<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)
</script>

## Standard Application Shell

A typical application layout consists of a fixed or relative header, a main content area (optionally with a sidebar or drawer), and a footer.

<div class="w-full border border-border rounded bg-surface overflow-hidden vp-raw">
    <!-- Header -->
    <NHeader class="p-4 border-b border-border bg-surface relative z-20">
        <NButton icon="mdi-menu" class="texted icon" @click="showDrawer = !showDrawer" />
        <span class="font-bold text-lg">NUI Dashboard</span>
        <div class="n-space"></div>
        <div class="hidden md:flex gap-2">
            <NButton label="Docs" class="texted" />
            <NButton label="Profile" class="brand pilled" />
        </div>
    </NHeader>

    <div class="flex relative h-96">
        <!-- Drawer (Sidebar) -->
        <NDrawer v-model="showDrawer" class="absolute inset-y-0 left-0 z-10">
            <div class="w-64 h-full bg-surface border-r border-border p-4">
                <NList>
                    <NListItem heading>Navigation</NListItem>
                    <NListItem icon="mdi-view-dashboard">Dashboard</NListItem>
                    <NListItem icon="mdi-cog">Settings</NListItem>
                </NList>
            </div>
        </NDrawer>

        <!-- Main Content -->
        <main class="flex-1 p-6 overflow-auto bg-surface-indent">
            <h2 class="title-text mb-4">Welcome back!</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NCard class="p-4">
                    <h3 class="font-bold mb-2">System Status</h3>
                    <p class="text-sm opacity-70">All systems are operational.</p>
                </NCard>
                <NCard class="p-4">
                    <h3 class="font-bold mb-2">Recent Activity</h3>
                    <p class="text-sm opacity-70">You updated the profile 2 hours ago.</p>
                </NCard>
            </div>
        </main>
    </div>

    <!-- Footer -->
    <NFooter class="p-6 border-t border-border bg-surface">
        <div class="flex flex-col md:flex-row justify-between gap-4">
            <span class="text-sm font-bold">&copy; 2025 NUI System</span>
            <div class="flex gap-4 text-xs">
                <a href="#" class="link-text">Privacy Policy</a>
                <a href="#" class="link-text">Terms of Service</a>
            </div>
        </div>
    </NFooter>
</div>

```vue
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <NHeader class="p-4 border-b bg-surface sticky top-0 z-30">
      <NButton icon="mdi-menu" class="texted icon" @click="drawer = !drawer" />
      <span class="font-bold">My App</span>
      <div class="n-space"></div>
      <NButton label="Log Out" class="texted" />
    </NHeader>

    <div class="flex flex-1 relative">
      <!-- Sidebar / Drawer -->
      <NDrawer v-model="drawer" overlay>
        <div class="w-64 bg-surface h-full border-r">
          <!-- Sidebar content -->
        </div>
      </NDrawer>

      <!-- Content -->
      <main class="flex-1 p-8 bg-neutral-50">
        <router-view />
      </main>
    </div>

    <!-- Footer -->
    <NFooter class="p-8 border-t bg-surface">
      <span>© 2025 Company</span>
    </NFooter>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>
```

## Key Composition Patterns

### Sticky Headers
Add `sticky top-0 z-30` to your `NHeader` to keep it visible while scrolling. Ensure you have a background color applied (`bg-surface`) so content doesn't bleed through.

### Using n-space
The `n-space` utility is a `flex-grow` div that pushes content to the edges of the flex container (the header).

### Responsive Layouts
NUI layouts are built with flexbox. Use Tailwind's responsive prefixes (`md:`, `lg:`) to switch between column and row layouts in your `NFooter` or content sections.

```html
<NFooter class="flex flex-col md:flex-row gap-4">
  <!-- Stacked on mobile, side-by-side on desktop -->
</NFooter>
```
