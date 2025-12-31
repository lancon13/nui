<template>
    <div class="n-calendar" tabindex="-1" @keydown="handleRootKey">
        <div class="n-calendar-container flex flex-row gap-4">
            <div v-for="(gridDays, calIndex) in calendarsGrid" :key="calIndex" class="n-calendar-view flex flex-col">
                <!-- Custom Header Slot -->
                <slot
                    :name="`calendar-header-${calIndex}`"
                    :index="calIndex"
                    :start-date="gridDays[0]?.dateObject"
                    :end-date="gridDays[gridDays.length - 1]?.dateObject"
                >
                    <slot
                        name="calendar-header"
                        :index="calIndex"
                        :start-date="gridDays[0]?.dateObject"
                        :end-date="gridDays[gridDays.length - 1]?.dateObject"
                    />
                </slot>

                <!-- Weekday Header -->
                <slot name="weekday" :calendar-index="calIndex">
                    <div class="n-calendar-view-header" role="row">
                        <div
                            v-for="(dayName, index) in weekDayNames"
                            :key="dayName"
                            :class="['n-calendar-view-weekday', getWeekDayClass(index)]"
                            role="columnheader"
                            :aria-label="dayName"
                        >
                            <slot
                                :name="`weekday-${getWeekdayNumber(index)}`"
                                :day="dayName"
                                :index="index"
                                :calendar-index="calIndex"
                            >
                                {{ dayName }}
                            </slot>
                        </div>
                    </div>
                </slot>

                <!-- Calendar Grid -->
                <div
                    class="n-calendar-view-grid"
                    role="grid"
                    :aria-multiselectable="multiple"
                    @mouseleave="handleHover(null)"
                >
                    <div
                        v-for="day in gridDays"
                        :key="day.dateString"
                        :ref="el => setCellRef(el, day.dateString)"
                        :class="[
                            'n-calendar-view-cell',
                            {
                                'n-calendar-view-cell--outside': !day.isCurrentMonth,
                                'n-calendar-view-cell--today': day.isToday,
                                'n-calendar-view-cell--selected': day.isSelected,
                                'n-calendar-view-cell--disabled': day.isDisabled,
                                'n-calendar-view-cell--invalid': day.isInvalid,
                                'n-calendar-view-cell--selecting': day.isSelecting,
                                'n-calendar-view-cell--range-start': day.isRangeStart,
                                'n-calendar-view-cell--range-end': day.isRangeEnd,
                                'n-calendar-view-cell--in-range': day.isInRange
                            }
                        ]"
                        role="gridcell"
                        :aria-label="day.ariaLabel"
                        :aria-selected="day.isSelected"
                        :aria-disabled="day.isDisabled"
                        :tabindex="day.dateString === currentFocusDate ? 0 : -1"
                        @click="handleDayClick(day, $event)"
                        @mouseenter="handleHover(day.dateObject)"
                        @focus="handleFocus(day)"
                        @contextmenu="handleContextMenu"
                        @keydown="handleKeyDown($event, day)"
                    >
                        <slot name="cell" :day="day" :calendar-index="calIndex">
                            <span class="n-calendar-view-day-number">{{ day.dayOfMonth }}</span>
                        </slot>
                    </div>
                </div>

                <!-- Custom Footer Slot -->
                <slot
                    name="calendar-footer"
                    :index="calIndex"
                    :start-date="gridDays[0]?.dateObject"
                    :end-date="gridDays[gridDays.length - 1]?.dateObject"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import dayjs from 'dayjs'
    import isoWeek from 'dayjs/plugin/isoWeek'
    import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
    import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
    import localeData from 'dayjs/plugin/localeData'
    import updateLocale from 'dayjs/plugin/updateLocale'
    import weekday from 'dayjs/plugin/weekday'
    import weekOfYear from 'dayjs/plugin/weekOfYear'
    import { computed, nextTick, ref, toRefs, watch } from 'vue'
    import { checkDateInList, normalizeDateRanges, type CalendarValue, type DateRange } from '../helpers'

    // --- Plugins ---
    dayjs.extend(weekOfYear)
    dayjs.extend(isoWeek)
    dayjs.extend(weekday)
    dayjs.extend(localeData)
    dayjs.extend(updateLocale)
    dayjs.extend(isSameOrAfter)
    dayjs.extend(isSameOrBefore)

    // --- Props & Types ---
    export interface NCalendarProps {
        modelValue?: CalendarValue[] | CalendarValue | null
        viewingYear?: number
        viewingWeek?: number
        firstDayOfWeek?: number
        rows?: number
        weekDayNames?: string[]
        weekDayClass?: string[]
        multiple?: boolean
        selectable?: boolean
        unselectable?: boolean
        range?: boolean
        numCalendars?: number
        maxRange?: number
        minRange?: number
        activeMonth?: number | number[] | null
        disabled?: CalendarValue[]
    }

    const props = withDefaults(defineProps<NCalendarProps>(), {
        modelValue: () => [],
        viewingYear: () => dayjs().year(),
        viewingWeek: () => dayjs().week(),
        firstDayOfWeek: 1,
        rows: 6,
        weekDayNames: undefined,
        weekDayClass: () => [],
        multiple: false,
        selectable: true,
        unselectable: true,
        range: false,
        numCalendars: 1,
        maxRange: 30,
        minRange: 1,
        activeMonth: undefined,
        disabled: () => []
    })

    const emits = defineEmits<{
        (e: 'update:modelValue', value: CalendarValue[] | CalendarValue | null): void
        (e: 'update:viewingWeek', value: number): void
        (e: 'update:viewingYear', value: number): void
    }>()

    const {
        viewingYear,
        viewingWeek,
        firstDayOfWeek,
        rows,
        modelValue,
        weekDayNames: customWeekNames,
        weekDayClass,
        multiple,
        selectable,
        unselectable,
        range,
        numCalendars,
        maxRange,
        minRange,
        activeMonth,
        disabled
    } = toRefs(props)

    // --- State ---
    const internalPendingRange = ref<DateRange | null>(null)
    const hoveredDate = ref<dayjs.Dayjs | null>(null)
    const currentFocusDate = ref<string>(dayjs().format('YYYY-MM-DD'))
    const cellRefs = new Map<string, HTMLElement>()

    // --- Focus Management ---
    const setCellRef = (el: any, date: string) => {
        if (el) cellRefs.set(date, el as HTMLElement)
        else cellRefs.delete(date)
    }

    const focusCurrentDate = async () => {
        await nextTick()
        const el = cellRefs.get(currentFocusDate.value)
        if (el) el.focus()
    }

    watch(currentFocusDate, focusCurrentDate)

    // --- Computed Helpers ---
    const getWeekdayNumber = (index: number) => (firstDayOfWeek.value + index) % 7

    const weekDayNames = computed(() => {
        if (customWeekNames.value?.length === 7) {
            const standard = [...customWeekNames.value]
            let startIndex = firstDayOfWeek.value - 1
            if (startIndex < 0) startIndex += 7
            return Array.from({ length: 7 }, (_, i) => standard[(startIndex + i) % 7])
        }
        let d = dayjs().day(firstDayOfWeek.value)
        return Array.from({ length: 7 }, () => {
            const name = d.format('ddd')
            d = d.add(1, 'day')
            return name
        })
    })

    const getWeekDayClass = (index: number) => {
        if (Array.isArray(weekDayClass.value)) {
            return weekDayClass.value[getWeekdayNumber(index)] || ''
        }
        return ''
    }

    const gridStartDate = computed(() => {
        const isoMonday = dayjs(`${viewingYear.value}-01-01`).isoWeek(viewingWeek.value).startOf('isoWeek')
        let diff = 1 - firstDayOfWeek.value
        if (diff < 0) diff += 7
        return isoMonday.subtract(diff, 'day')
    })

    const normalizedModelValue = computed(() => {
        if (!modelValue.value) return []
        const list = Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value]
        return normalizeDateRanges(list)
    })

    const normalizedDisabled = computed(() => normalizeDateRanges(disabled.value))

    // --- Selection Logic ---
    const isDateSelected = (date: dayjs.Dayjs) => {
        if (checkDateInList(date, normalizedModelValue.value)) return true
        if (range.value && internalPendingRange.value?.begin) {
            return date.isSame(dayjs(internalPendingRange.value.begin), 'day')
        }
        return false
    }

    const isDateDisabled = (date: dayjs.Dayjs) => checkDateInList(date, normalizedDisabled.value)

    const isPendingRangeInvalid = computed(() => {
        if (!range.value || !internalPendingRange.value?.begin || !hoveredDate.value) return false

        const start = dayjs(internalPendingRange.value.begin)
        const end = hoveredDate.value
        const [rangeStart, rangeEnd] = start.isBefore(end) ? [start, end] : [end, start]

        const diff = rangeEnd.diff(rangeStart, 'day') + 1
        if (diff < minRange.value || diff > maxRange.value) return true

        let d = rangeStart.clone()
        while (d.isSameOrBefore(rangeEnd, 'day')) {
            if (isDateDisabled(d)) return true
            d = d.add(1, 'day')
        }
        return false
    })

    // --- Grid Generation ---
    const calendarsGrid = computed(() => {
        const grids = []
        const count = Math.max(1, numCalendars.value)
        const daysPerCalendar = rows.value * 7
        let globalStart = gridStartDate.value

        const currentActive = activeMonth.value
        const pendingInvalid = isPendingRangeInvalid.value

        // Pre-calculate pending bounds
        let pendingStart: dayjs.Dayjs | null = null
        let pendingEnd: dayjs.Dayjs | null = null
        if (range.value && internalPendingRange.value?.begin && hoveredDate.value) {
            const start = dayjs(internalPendingRange.value.begin)
            const end = hoveredDate.value
            pendingStart = start.isBefore(end) ? start : end
            pendingEnd = start.isBefore(end) ? end : start
        }

        const isPending = (d: dayjs.Dayjs) => {
            if (!pendingStart || !pendingEnd) return false
            return d.isSameOrAfter(pendingStart, 'day') && d.isSameOrBefore(pendingEnd, 'day')
        }

        const isEffectiveSelected = (d: dayjs.Dayjs) => isDateSelected(d) || isPending(d)

        for (let c = 0; c < count; c++) {
            const days = []
            let current = globalStart.add(c * daysPerCalendar, 'day')

            for (let i = 0; i < daysPerCalendar; i++) {
                const isDisabled = isDateDisabled(current)
                const isPendingInRange = isPending(current)

                // Check selection of current and neighbors for styling
                const prevDate = current.subtract(1, 'day')
                const nextDate = current.add(1, 'day')
                const isSelfSelected = isEffectiveSelected(current)
                const isPrevSelected = isEffectiveSelected(prevDate)
                const isNextSelected = isEffectiveSelected(nextDate)

                // Active month check
                let isCurrentMonth = true
                if (currentActive !== undefined) {
                    if (currentActive === null) isCurrentMonth = false
                    else if (Array.isArray(currentActive)) isCurrentMonth = currentActive.includes(current.month())
                    else isCurrentMonth = current.month() === currentActive
                }

                days.push({
                    dateObject: current,
                    dateString: current.format('YYYY-MM-DD'),
                    dayOfMonth: current.date(),
                    ariaLabel: current.format('dddd, MMMM D, YYYY'),
                    isCurrentMonth,
                    isToday: current.isSame(dayjs(), 'day'),
                    isSelected: isSelfSelected,
                    isDisabled,
                    isInvalid: isPendingInRange && pendingInvalid,
                    isSelecting: isPendingInRange,
                    isRangeStart: isSelfSelected && !isPrevSelected && isNextSelected,
                    isRangeEnd: isSelfSelected && !isNextSelected && isPrevSelected,
                    isInRange: isSelfSelected && (isPrevSelected || isNextSelected)
                })
                current = current.add(1, 'day')
            }
            grids.push(days)
        }
        return grids
    })

    watch(() => calendarsGrid.value, focusCurrentDate)

    // --- Interaction ---
    function handleHover(date: dayjs.Dayjs | null) {
        hoveredDate.value = date
    }

    function handleFocus(day: any) {
        handleHover(day.dateObject)
        currentFocusDate.value = day.dateString
    }

    function handleCancelPending() {
        internalPendingRange.value = null
        hoveredDate.value = null
    }

    function handleRootKey(event: KeyboardEvent) {
        if (event.key === 'Escape') handleCancelPending()
    }

    function handleContextMenu(event: MouseEvent) {
        if (range.value && internalPendingRange.value?.begin) {
            event.preventDefault()
            handleCancelPending()
        }
    }

    function handleKeyDown(event: KeyboardEvent, day: any) {
        const key = event.key
        if (key === 'Enter' || key === ' ') {
            event.preventDefault()
            handleDayClick(day, event)
            return
        }

        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) return
        event.preventDefault()

        const current = dayjs(day.dateObject)
        let target = current.clone()

        if (key === 'ArrowUp') target = target.subtract(7, 'day')
        else if (key === 'ArrowDown') target = target.add(7, 'day')
        else if (key === 'ArrowLeft') target = target.subtract(1, 'day')
        else target = target.add(1, 'day')

        currentFocusDate.value = target.format('YYYY-MM-DD')

        const start = gridStartDate.value
        const totalDaysVisible = Math.max(1, numCalendars.value) * rows.value * 7
        const end = start.add(totalDaysVisible, 'day')

        if (target.isBefore(start) || target.isSame(start) || target.isAfter(end) || target.isSame(end)) {
            let newRefDate = dayjs(`${viewingYear.value}-01-01`).isoWeek(viewingWeek.value)
            if (target.isBefore(start)) newRefDate = newRefDate.subtract(1, 'week')
            else if (target.isAfter(end.subtract(1, 'day'))) newRefDate = newRefDate.add(1, 'week')

            emits('update:viewingYear', newRefDate.isoWeekYear())
            emits('update:viewingWeek', newRefDate.isoWeek())
        }
    }

    function handleDayClick(day: any, _event?: MouseEvent | KeyboardEvent) {
        if (!selectable.value || day.isDisabled) return

        const dateStr = day.dateString
        let currentList = [...normalizedModelValue.value] as CalendarValue[]

        if (range.value) handleRangeSelection(day, currentList, dateStr)
        else handleSimpleSelection(currentList, dateStr)
    }

    function handleRangeSelection(day: any, currentList: CalendarValue[], dateStr: string) {
        if (internalPendingRange.value?.begin) {
            const start = dayjs(internalPendingRange.value.begin)
            const end = day.dateObject
            const [finalBegin, finalEnd] = end.isBefore(start) ? [end, start] : [start, end]

            const finalizedRange = {
                begin: finalBegin.format('YYYY-MM-DD'),
                end: finalEnd.format('YYYY-MM-DD')
            }

            if (unselectable.value && tryDeselectRange(currentList, finalizedRange)) return

            if (validateRange(finalBegin, finalEnd)) {
                if (multiple.value) currentList.push(finalizedRange)
                else currentList = [finalizedRange]

                emits('update:modelValue', multiple.value ? normalizeDateRanges(currentList) : finalizedRange)
                handleCancelPending()
            } else {
                handleCancelPending()
            }
        } else {
            internalPendingRange.value = { begin: dateStr }
        }
    }

    function handleSimpleSelection(currentList: CalendarValue[], dateStr: string) {
        if (multiple.value) {
            const idx = currentList.findIndex(item => checkDateInList(dayjs(dateStr), [item]))

            if (idx > -1) {
                if (unselectable.value) currentList.splice(idx, 1)
            } else {
                currentList.push(dateStr)
            }
            emits('update:modelValue', normalizeDateRanges(currentList))
        } else {
            const currentStr =
                currentList.length > 0
                    ? dayjs((currentList[0] as any).begin || currentList[0]).format('YYYY-MM-DD')
                    : null

            if (currentStr === dateStr) {
                if (unselectable.value) emits('update:modelValue', null)
            } else {
                emits('update:modelValue', dateStr)
            }
        }
    }

    function tryDeselectRange(currentList: CalendarValue[], finalizedRange: DateRange): boolean {
        // Find if this specific range already exists in the list
        const idx = currentList.findIndex(item => {
            if (typeof item === 'object' && item !== null && 'begin' in item) {
                return (
                    dayjs(item.begin).isSame(finalizedRange.begin, 'day') &&
                    dayjs(item.end).isSame(finalizedRange.end, 'day')
                )
            }
            return false
        })

        if (idx > -1) {
            if (multiple.value) {
                currentList.splice(idx, 1)
                emits('update:modelValue', normalizeDateRanges(currentList))
            } else {
                emits('update:modelValue', null)
            }
            handleCancelPending()
            return true
        }
        return false
    }

    function validateRange(start: dayjs.Dayjs, end: dayjs.Dayjs): boolean {
        const diff = end.diff(start, 'day') + 1
        if (diff < minRange.value || diff > maxRange.value) return false

        // Check if any date in range is disabled
        // Optimization: checkDateInList might iterate full disabled list.
        // If disabled list is sorted, we can optimize, but simple loop is robust.
        // We can use the helper checkDateInList for the range itself?
        // No, checkDateInList checks if ONE date is in LIST.
        // We need to check if ANY date in RANGE is in DISABLED list.

        // Let's iterate the range days.
        let d = start.clone()
        while (d.isSameOrBefore(end, 'day')) {
            if (checkDateInList(d, normalizedDisabled.value)) return false
            d = d.add(1, 'day')
        }
        return true
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-calendar {
            @apply w-full select-none outline-none;

            .n-calendar-container {
                @apply flex flex-col grow;
            }
            .n-calendar-view {
                @apply grow;
                .n-calendar-view-header {
                    @apply grid grid-cols-7 mb-2;
                }

                .n-calendar-view-weekday {
                    @apply text-center text-xs font-semibold 
                    text-text-light uppercase 
                    py-1;
                }

                .n-calendar-view-grid {
                    @apply grid grid-cols-7 gap-y-2;
                }

                .n-calendar-view-cell {
                    @apply relative 
                    flex items-center justify-center 
                    aspect-square
                    text-sm 
                    cursor-pointer
                    border-2 border-transparent
                    transition-colors duration-200 ease-in-out;
                    @apply hover:border-brand hover:opacity-50;

                    .n-calendar-view-day-number {
                        @apply z-10;
                    }

                    &.n-calendar-view-cell--outside {
                        @apply text-text-light;
                    }

                    &.n-calendar-view-cell--disabled {
                        @apply cursor-not-allowed 
                        bg-neutral-light text-text-light
                        rounded-none;
                        @apply hover:opacity-100 hover:border-transparent hover:rounded-none;
                    }

                    &.n-calendar-view-cell--today {
                        @apply font-bold text-brand;
                        &::after {
                            content: '';
                            @apply absolute bottom-1 w-1 h-1 bg-brand rounded-full;
                        }
                    }

                    &.n-calendar-view-cell--selected {
                        @apply bg-brand text-text-invert rounded-element;
                    }

                    &.n-calendar-view-cell--selecting {
                        @apply bg-brand-light text-brand rounded-element;
                    }

                    &.n-calendar-view-cell--invalid {
                        @apply bg-error-light text-error cursor-not-allowed;
                    }

                    &.n-calendar-view-cell--in-range {
                        &:not(.n-calendar-view-cell--selected) {
                            @apply bg-brand-light text-text;
                        }
                        &:not(.n-calendar-view-cell--range-start):not(.n-calendar-view-cell--range-end) {
                            @apply rounded-none;
                        }
                    }

                    &.n-calendar-view-cell--range-start {
                        @apply rounded-r-none;
                    }

                    &.n-calendar-view-cell--range-end {
                        @apply rounded-l-none;
                    }
                }
            }
        }
    }
</style>
