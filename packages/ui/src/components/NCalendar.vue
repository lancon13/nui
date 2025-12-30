<template>
    <div class="n-calendar">
        <!-- Calendar Header: Week Days -->
        <slot name="header">
            <div class="n-calendar-header">
                <div
                    v-for="(dayName, index) in weekDayNames"
                    :key="dayName"
                    :class="['n-calendar-weekday', getWeekDayClass(index)]"
                >
                    <slot :name="`header-${getWeekdayNumber(index)}`" :day="dayName" :index="index">
                        {{ dayName }}
                    </slot>
                </div>
            </div>
        </slot>

        <!-- Calendar Grid -->
        <div class="n-calendar-grid" role="grid">
            <div
                v-for="day in gridDays"
                :key="day.dateString"
                :class="[
                    'n-calendar-cell',
                    {
                        'n-calendar-cell--outside': !day.isCurrentMonth,
                        'n-calendar-cell--today': day.isToday,
                        'n-calendar-cell--selected': day.isSelected,
                        'n-calendar-cell--range-start': day.isRangeStart,
                        'n-calendar-cell--range-end': day.isRangeEnd,
                        'n-calendar-cell--in-range': day.isInRange
                    }
                ]"
                role="gridcell"
                :aria-selected="day.isSelected"
                tabindex="0"
                @click="handleDayClick(day, $event)"
                @keydown.enter.prevent="handleDayClick(day, $event)"
                @keydown.space.prevent="handleDayClick(day, $event)"
            >
                <span class="n-calendar-day-number">{{ day.dayOfMonth }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs'
    import isoWeek from 'dayjs/plugin/isoWeek'
    import localeData from 'dayjs/plugin/localeData'
    import updateLocale from 'dayjs/plugin/updateLocale'
    import weekday from 'dayjs/plugin/weekday'
    import weekOfYear from 'dayjs/plugin/weekOfYear'
    import { computed, toRefs } from 'vue'

    // Extend dayjs plugins
    dayjs.extend(weekOfYear)
    dayjs.extend(isoWeek)
    dayjs.extend(weekday)
    dayjs.extend(localeData)
    dayjs.extend(updateLocale)

    export interface NCalendarProps {
        modelValue?: (string | Date)[] // Array of ISO date strings 'YYYY-MM-DD' or Date objects
        viewingYear?: number
        viewingWeek?: number // 1-52/53
        firstDayOfWeek?: number // 0 (Sun) - 6 (Sat)
        rows?: number
        activeMonth?: number // 0-11
        onlyActiveDatesSelectable?: boolean
        weekDayNames?: string[]
        weekDayClass?: string[]
    }

    const props = withDefaults(defineProps<NCalendarProps>(), {
        modelValue: () => [],
        viewingYear: () => dayjs().year(),
        viewingWeek: () => dayjs().week(),
        firstDayOfWeek: 1, // Default to Monday
        rows: 6,
        activeMonth: undefined,
        onlyActiveDatesSelectable: true,
        weekDayNames: undefined,
        weekDayClass: () => []
    })

    const emits = defineEmits<{
        (e: 'update:modelValue', value: string[]): void
        (e: 'update:activeMonth', value: number): void
    }>()

    const {
        viewingYear,
        viewingWeek,
        firstDayOfWeek,
        rows,
        modelValue,
        activeMonth: propsActiveMonth,
        onlyActiveDatesSelectable,
        weekDayNames: customWeekNames,
        weekDayClass
    } = toRefs(props)

    // --- Date Logic ---

    // Helper to get the actual weekday number (0=Sun, 1=Mon...6=Sat) for a given column index (0-6)

    const getWeekdayNumber = (index: number) => {
        return (firstDayOfWeek.value + index) % 7
    }

    // Generate weekday names based on firstDayOfWeek

    const weekDayNames = computed(() => {
        if (customWeekNames.value && customWeekNames.value.length === 7) {
            const standard = [...customWeekNames.value]

            // Reorder based on firstDayOfWeek

            // If firstDayOfWeek=1 (Mon), we want the array to start with index 1 (Mon).

            // But wait, the previous logic assumed customWeekNames was ALWAYS Mon->Sun?

            // "check to ensure it has 7 elements for the representation of 7 days of a week (starting from Monday to Sunday)"

            // Yes. So index 0 is Mon, index 6 is Sun.

            // My getWeekdayNumber returns standard JS day (0=Sun, 1=Mon).

            // So if input is [Mon, Tue... Sun].

            // Map: 0->Mon(1), 1->Tue(2)... 5->Sat(6), 6->Sun(0).

            // Input Array Index = (WeekdayNum + 6) % 7 ?

            // Let's rely on standard rotation logic previously established if the input is strictly Mon->Sun.

            // Standard input: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]

            // We want to display starting at `firstDayOfWeek`.

            // If firstDayOfWeek = 1 (Mon), we start at index 0.

            // If firstDayOfWeek = 0 (Sun), we start at index 6.

            let startIndex = firstDayOfWeek.value - 1

            if (startIndex < 0) startIndex += 7

            const reordered = []

            for (let i = 0; i < 7; i++) {
                reordered.push(standard[(startIndex + i) % 7])
            }

            return reordered
        }

        const names: string[] = []

        let d = dayjs().day(firstDayOfWeek.value)

        for (let i = 0; i < 7; i++) {
            names.push(d.format('ddd'))

            d = d.add(1, 'day')
        }

        return names
    })

    // Resolve class for a specific column index

    const getWeekDayClass = (index: number) => {
        if (Array.isArray(weekDayClass.value)) {
            // weekDayClass array is expected to map to 0=Sun, 1=Mon... 6=Sat?

            // "weekDayClass[0] would be a class that apply to ... sunday"

            // Yes. So we use getWeekdayNumber(index) to lookup.

            const dayNum = getWeekdayNumber(index)

            return weekDayClass.value[dayNum] || ''
        }

        return ''
    }

    // Calculate the start date of the grid
    const gridStartDate = computed(() => {
        // Strategy:
        // 1. Find the Monday of the requested ISO week.
        // We anchor to Jan 1st of the requested year to ensure we are targeting the correct ISO year context.
        const isoMonday = dayjs(`${viewingYear.value}-01-01`).isoWeek(viewingWeek.value).startOf('isoWeek')

        // 2. Adjust for firstDayOfWeek.
        const targetDay = firstDayOfWeek.value
        const currentIsoDay = 1 // Monday

        let diff = currentIsoDay - targetDay
        if (diff < 0) {
            diff += 7
        }

        return isoMonday.subtract(diff, 'day')
    })

    const calculatedActiveMonth = computed(() => {
        return gridStartDate.value.add(3, 'day').month()
    })

    const internalActiveMonth = computed({
        get: () => propsActiveMonth.value ?? calculatedActiveMonth.value,
        set: val => emits('update:activeMonth', val)
    })

    const selectedStrings = computed(() => {
        return (modelValue.value || []).map(v => dayjs(v).format('YYYY-MM-DD'))
    })

    const gridDays = computed(() => {
        const days = []
        const totalDays = rows.value * 7
        let current = gridStartDate.value

        const selectedSet = new Set(selectedStrings.value)

        for (let i = 0; i < totalDays; i++) {
            const dateStr = current.format('YYYY-MM-DD')
            const isSelected = selectedSet.has(dateStr)

            const prevDate = current.subtract(1, 'day').format('YYYY-MM-DD')
            const nextDate = current.add(1, 'day').format('YYYY-MM-DD')

            const isPrevSelected = selectedSet.has(prevDate)
            const isNextSelected = selectedSet.has(nextDate)

            const isRangeStart = isSelected && !isPrevSelected && isNextSelected
            const isRangeEnd = isSelected && !isNextSelected && isPrevSelected
            const isInRange = isSelected && isPrevSelected && isNextSelected

            days.push({
                dateObject: current,
                dateString: dateStr,
                dayOfMonth: current.date(),
                isCurrentMonth: current.month() === internalActiveMonth.value,
                isToday: current.isSame(dayjs(), 'day'),
                isSelected,
                isRangeStart,
                isRangeEnd,
                isInRange: isInRange || (isSelected && (isPrevSelected || isNextSelected)) // Connected
            })
            current = current.add(1, 'day')
        }
        return days
    })

    // --- Interaction ---

    function handleDayClick(day: any, event: MouseEvent | KeyboardEvent) {
        if (onlyActiveDatesSelectable.value && !day.isCurrentMonth) {
            return
        }

        const dateStr = day.dateString
        // Start with current selection as strings
        let newSelection = [...selectedStrings.value]

        const isShift = (event as any).shiftKey
        const isCtrl = (event as any).ctrlKey || (event as any).metaKey

        if (isShift && newSelection.length > 0) {
            // Range Selection
            const lastSelected = newSelection[newSelection.length - 1]
            const start = dayjs(lastSelected)
            const end = day.dateObject

            const rangeStart = start.isBefore(end) ? start : end
            const rangeEnd = start.isBefore(end) ? end : start

            let curr = rangeStart
            const daysToAdd = []
            while (curr.isBefore(rangeEnd) || curr.isSame(rangeEnd, 'day')) {
                // Check restriction for range members too?
                // Usually range select implies contiguous block. If block crosses month and selectOnlyActiveDate is true,
                // should we exclude non-active days?
                // Logic: "only allow user to select the date on active month only".
                // We should probably filter.

                if (!onlyActiveDatesSelectable.value || curr.month() === internalActiveMonth.value) {
                    daysToAdd.push(curr.format('YYYY-MM-DD'))
                }
                curr = curr.add(1, 'day')
            }

            for (const d of daysToAdd) {
                if (!newSelection.includes(d)) {
                    newSelection.push(d)
                }
            }
        } else if (isCtrl) {
            // Toggle
            if (newSelection.includes(dateStr)) {
                newSelection = newSelection.filter(d => d !== dateStr)
            } else {
                newSelection.push(dateStr)
            }
        } else {
            // Single Select (Replace)
            newSelection = [dateStr]
        }

        emits('update:modelValue', newSelection)
    }

    // Watch for external activeMonth changes to update week if needed
    // This allows "jumping" to a month.
    // Removed per user request to handle this logic in the parent (Story)
    // watch(propsActiveMonth, (newMonth) => { ... }) removed.
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-calendar {
            @apply flex flex-col w-full select-none;
            .n-calendar-header {
                @apply grid grid-cols-7 mb-2;
            }

            .n-calendar-weekday {
                @apply text-center text-xs font-semibold text-text-light uppercase py-1;
            }

            .n-calendar-grid {
                @apply grid grid-cols-7 gap-1;
            }

            .n-calendar-cell {
                @apply relative
                h-10 w-full
                flex items-center justify-center
                text-sm cursor-pointer
                rounded-element
                transition-colors duration-100;

                /* Default hover */
                @apply hover:bg-surface-indent;

                /* Numbers */
                .n-calendar-day-number {
                    @apply z-10;
                }
            }

            /* States */
            .n-calendar-cell--outside {
                @apply text-text-light opacity-50;
            }

            .n-calendar-cell--today {
                @apply font-bold text-brand;
                &::after {
                    content: '';
                    @apply absolute bottom-1 w-1 h-1 bg-brand rounded-full;
                }
            }

            .n-calendar-cell--selected {
                @apply bg-brand text-text-invert;
            }

            /* Range Styling - Connectors */
            .n-calendar-cell--range-start {
                @apply rounded-r-none;
            }
            .n-calendar-cell--range-end {
                @apply rounded-l-none;
            }
            .n-calendar-cell--in-range {
                @apply rounded-none;
                &:not(.n-calendar-cell--selected) {
                    @apply bg-brand-light text-text;
                }
            }
        }

        /* Refined Selected + Range Logic */
        /* If simply selected (array of dates), we use the solid brand color.
           If we want to show 'range' visual connection, we'd need the 'in-range' classes to be smarter 
           or the grid to have no gap. 
           Let's stick to discrete selection for MVP unless 'no gap' is preferred. 
           With gap-1, rounded corners look distinct.
        */
    }
</style>
