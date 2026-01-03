# Calendar

A powerful calendar component supporting single, multiple, and range selection.

<script setup>
import { ref } from 'vue'
const date = ref(null)
const range = ref(null)
const year = ref(2025)
const week = ref(1)
</script>

## Basic Usage

<div class="w-96 my-4 p-4 border border-border rounded bg-surface vp-raw">
    <NCalendar v-model="date" />
    <div class="mt-4 text-xs">Selected: {{ date }}</div>
</div>

```vue
<NCalendar v-model="date" />
```

## Range Selection

<div class="w-96 my-4 p-4 border border-border rounded bg-surface vp-raw">
    <NCalendar v-model="range" range />
    <div class="mt-4 text-xs">Selected: {{ range }}</div>
</div>

```vue
<NCalendar v-model="range" range />
```

## View Navigation

Use `v-model:viewingYear` and `v-model:viewingWeek` (or `setMonth` method) to control the view.

<div class="w-96 my-4 p-4 border border-border rounded bg-surface vp-raw">
    <div class="mb-2 flex gap-2">
        <NButton size="xs" label="Prev Year" @click="year--" />
        <NButton size="xs" label="Next Year" @click="year++" />
        <span class="ml-auto text-sm font-bold">{{ year }}</span>
    </div>
    <NCalendar v-model="date" v-model:viewingYear="year" v-model:viewingWeek="week" />
</div>

```vue
<NCalendar v-model:viewingYear="year" v-model:viewingWeek="week" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `string \| Array \| Object` | - | Selected date(s) or range. |
| `multiple` | `boolean` | `false` | Allow multiple selections. |
| `range` | `boolean` | `false` | Enable range selection. |
| `viewingYear` | `number` | `dayjs().year()` | Year currently in view. |
| `viewingWeek` | `number` | `dayjs().week()` | ISO week currently in view. |
| `firstDayOfWeek` | `number` | `1` | 0=Sunday, 1=Monday... |
| `rows` | `number` | `6` | Number of weeks to display. |
| `numViews` | `number` | `1` | Number of consecutive months/views to show. |
| `disabled` | `Array` | `[]` | List of disabled dates/ranges. |
| `visible` | `Array` | - | List of visible date ranges (others hidden). |

## Slots

| Slot | Description |
| --- | --- |
| `calendar-header` | Content above the calendar grid. |
| `cell` | Custom content for each day cell (scoped: `{ day }`). |
| `calendar-footer` | Content below the calendar grid. |

## Methods

| Method | Description |
| --- | --- |
| `setMonth(month, year?)` | Navigate to a specific month/year. |