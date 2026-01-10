# Calendar

A powerful, customizable calendar component for date picking, range selection, and multi-view scheduling.

<script setup>
import { ref } from 'vue'
import * as _dayjs from 'dayjs'

const dayjs = _dayjs.default || _dayjs

const date = ref(null)
const range = ref(null)
const multipleDates = ref(['2025-01-01', '2025-01-03'])
const isRangeMode = ref(false)

// Shared view state for basic examples
const viewingYear = ref(2025)
const viewingWeek = ref(1)

const disabledDates = ['2025-01-01', '2025-01-05']
</script>

## Design Concepts

### Why Week-Based Navigation?

Unlike traditional month-based calendars, `NCalendar` is built on an **ISO Week** grid system.

- **Stability**: It always renders a fixed number of rows (default 6). This prevents the UI from "jumping" in height when switching between months with 4, 5, or 6 weeks.
- **Continuity**: Time is continuous. A "Month" view is just a window into the continuous stream of weeks.
- **Precision**: Using `viewingYear` (ISO Year) and `viewingWeek` (ISO Week) ensures deterministic rendering, especially for days that cross year boundaries (e.g., Dec 29 - Jan 4).

While the internal engine works on weeks, we provide a `setMonth(month, year)` helper and props like `activeMonth` to bridge the gap for user-friendly "Month" navigation.

## Basic Usage

<div class="my-4 p-4 border border-border rounded bg-surface vp-raw w-96">
    <NCalendar v-model="date" :viewingYear="2025" :viewingWeek="1" />
    <div class="mt-4 text-xs">Selected: {{ date }}</div>
</div>

```vue
<script setup>
    import { ref } from 'vue'
    const date = ref(null)
</script>

<template>
    <NCalendar v-model="date" />
</template>
```

## Range Selection

Set the `range` prop to `true` to enable start/end date selection.

<div class="my-4 p-4 border border-border rounded bg-surface vp-raw w-96">
    <NCalendar v-model="range" range :viewingYear="2025" :viewingWeek="1" />
    <div class="mt-4 text-xs">Range: {{ range }}</div>
</div>

```vue
<NCalendar v-model="range" range />
```

## Multiple Selection

Allow picking multiple independent dates or multiple ranges.

<div class="my-4 p-4 border border-border rounded bg-surface vp-raw w-96">
    <div class="mb-4 flex items-center gap-2">
        <input type="checkbox" id="range-toggle" v-model="isRangeMode" class="cursor-pointer">
        <label for="range-toggle" class="text-sm cursor-pointer select-none">Enable Range Selection</label>
    </div>
    <NCalendar 
        v-model="multipleDates" 
        multiple 
        :range="isRangeMode"
        :viewingYear="2025" 
        :viewingWeek="1" 
    />
    <div class="mt-4 text-xs break-all">
        Selected: {{ multipleDates }}
    </div>
</div>

```vue
<script setup>
    import { ref } from 'vue'

    const dates = ref(['2025-01-01'])
    const isRange = ref(false)
</script>

<template>
    <label> <input type="checkbox" v-model="isRange" /> Range Mode </label>

    <NCalendar v-model="dates" multiple :range="isRange" />
</template>
```

## Disabled Dates

You can disable specific dates, ranges, or patterns using the `disabled` prop.
**Note:** In this example, we explicitly set the view to Jan 2025 to show the disabled dates.

<div class="my-4 p-4 border border-border rounded bg-surface vp-raw w-96">
    <NCalendar :disabled="disabledDates" :viewingYear="2025" :viewingWeek="1" />
    <div class="mt-2 text-xs text-muted">Disabled: 2025-01-01, 2025-01-05</div>
</div>

```vue
<script setup>
    const disabled = ['2025-01-01', { begin: '2025-01-10', end: '2025-01-15' }]
</script>

<template>
    <NCalendar :disabled="disabled" />
</template>
```

## View Navigation

Use `v-model:viewingYear` and `v-model:viewingWeek` to control the displayed timeframe.

<div class="my-4 p-4 border border-border rounded bg-surface vp-raw w-96">
    <div class="flex justify-between items-center mb-4">
        <NButton size="xs" label="<" @click="viewingWeek--" />
        <span class="text-sm font-bold">{{ viewingYear }} - W{{ viewingWeek }}</span>
        <NButton size="xs" label=">" @click="viewingWeek++" />
    </div>
    <NCalendar 
        v-model:viewingYear="viewingYear" 
        v-model:viewingWeek="viewingWeek" 
    />
</div>

```vue
<NCalendar v-model:viewingYear="year" v-model:viewingWeek="week" />
```

## Multi-View (Dual Calendar)

Display multiple months or weeks side-by-side using `numViews`.

<div class="my-4 p-4 border border-border rounded bg-surface vp-raw w-[600px]">
    <NCalendar :numViews="2" :rows="5" range :viewingYear="2025" :viewingWeek="1" />
</div>

```vue
<NCalendar :numViews="2" range />
```

## Custom Header, Slots & Events

Customize the header, cells, week labels, or footer.

<div class="my-4 p-4 border border-border rounded bg-surface vp-raw w-96">
    <NCalendar :viewingYear="2025" :viewingWeek="1">
        <template #calendar-header="{ startDate }">
            <div class="text-center font-bold text-brand py-2 bg-surface-indent mb-2 rounded">
                {{ startDate.add(14, 'day').format('MMMM YYYY') }}
            </div>
        </template>
        <template #week-label-0="{ day }">
           <span class="text-error">{{ day }}</span>
        </template>
        <template #cell="{ day }">
            <div class="flex flex-col items-center justify-center w-full h-full relative">
                <span :class="{ 'font-bold': day.isToday }">{{ day.dayOfMonth }}</span>
                <div v-if="day.dayOfMonth === 15" class="w-1 h-1 bg-error rounded-full mt-1"></div>
            </div>
        </template>
        <template #calendar-footer>
            <div class="text-[10px] text-center text-muted mt-2">
                *Events marked with red dot
            </div>
        </template>
    </NCalendar>
</div>

```vue
<NCalendar>
  <template #calendar-header="{ startDate }">
    <!-- Custom Header using dayjs object provided by slot -->
    {{ startDate.format('MMMM YYYY') }}
  </template>

  <!-- Custom Sunday Label -->
  <template #week-label-0="{ day }">
    <span class="text-red-500">{{ day }}</span>
  </template>
  
  <template #cell="{ day }">
    <span>{{ day.dayOfMonth }}</span>
    <span v-if="day.isToday" class="w-1 h-1 bg-brand"></span>
  </template>

  <template #calendar-footer>
    <div class="p-2">Footer Content</div>
  </template>
</NCalendar>
```

## Props

| Prop             | Type                        | Default          | Description                                                                 |
| ---------------- | --------------------------- | ---------------- | --------------------------------------------------------------------------- |
| `modelValue`     | `string \| Array \| Object` | `[]`             | Selected value(s). String for single, Object for range, Array for multiple. |
| `viewingYear`    | `number`                    | `dayjs().year()` | The ISO year currently being viewed.                                        |
| `viewingWeek`    | `number`                    | `dayjs().week()` | The ISO week currently being viewed.                                        |
| `rows`           | `number`                    | `6`              | Number of weeks to display per view.                                        |
| `numViews`       | `number`                    | `1`              | Number of calendar views to render side-by-side.                            |
| `views`          | `Array`                     | -                | Advanced configuration for independent views (see Stories).                 |
| `multiple`       | `boolean`                   | `false`          | Enable selecting multiple dates/ranges.                                     |
| `range`          | `boolean`                   | `false`          | Enable range selection mode.                                                |
| `disabled`       | `Array`                     | `[]`             | Dates or ranges to disable interaction.                                     |
| `visible`        | `Array`                     | -                | Whitelist of visible dates (others hidden).                                 |
| `firstDayOfWeek` | `number`                    | `1`              | 0 (Sun) to 6 (Sat).                                                         |
| `activeMonth`    | `number \| Array`           | -                | Highlight/restrict dates to specific month(s) (0-11).                       |
| `minRange`       | `number`                    | `1`              | Minimum days for a valid range.                                             |
| `maxRange`       | `number`                    | `30`             | Maximum days for a valid range.                                             |
| `selectable`     | `boolean`                   | `true`           | Enable selection interaction.                                               |
| `unselectable`   | `boolean`                   | `true`           | Allow deselection by clicking selected item.                                |

## Slots

| Slot                      | Description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| `calendar-header`         | Header content for all views. Receives `{ index, startDate, endDate }`. |
| `calendar-header-{index}` | Header content for a specific view index.                               |
| `cell`                    | Custom content for each day cell. Receives `{ day, calendarIndex }`.    |
| `week-label-container`    | Wrapper for the week day labels row.                                    |
| `week-label-{day}`        | Custom content for a specific weekday label (0-6).                      |
| `calendar-footer`         | Footer content below the grid.                                          |

## Events

| Event                | Payload         | Description                             |
| -------------------- | --------------- | --------------------------------------- |
| `update:modelValue`  | `CalendarValue` | Fired when selection changes.           |
| `update:viewingYear` | `number`        | Fired when navigation changes the year. |
| `update:viewingWeek` | `number`        | Fired when navigation changes the week. |

## Exposed Methods

| Method                   | Description                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| `setMonth(month, year?)` | Helper to update `viewingYear` and `viewingWeek` to show a specific month. |

## Recipes & FAQ

### How to use `setMonth`?

Because `NCalendar` uses a week-based system, navigating to a specific month isn't just "setting a prop"—it requires calculating the correct ISO year and week.
We provide an exposed method `setMonth(monthIndex, year)` for this. You can access it via a Template Ref.

```vue
<script setup>
    import { ref } from 'vue'

    const calendarRef = ref(null)

    // 0 = January, 11 = December
    const goToJune = () => {
        calendarRef.value?.setMonth(5, 2025)
    }
</script>

<template>
    <button @click="goToJune">Go to June 2025</button>
    <NCalendar ref="calendarRef" />
</template>
```

### How do I highlight today?

The `day` object in the `#cell` slot has an `isToday` boolean property. You can use this to apply conditional classes.

### How to format the header date?

Use the `calendar-header` slot. It provides `startDate` (of the grid view). You can use `dayjs` (or any library) to add 2 weeks to `startDate` to approximate the visible month, as grid starts often bleed into the previous month.

### Can I block weekends?

Yes, you can use the `disabled` prop with a function generator or simply pass ranges. However, `NCalendar` disabled prop currently expects explicit date strings or ranges. For repetitive patterns like weekends, you might need to generate the disabled list for the visible range or handle validation manually in `@update:modelValue`.
