<template>
    <div class="n-calendar" tabindex="-1" @keydown.esc="handleCancelPending">
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
        <div class="n-calendar-grid" role="grid" @mouseleave="handleHover(null)">
            <div
                v-for="day in gridDays"
                :key="day.dateString"
                :class="[
                    'n-calendar-cell',
                    {
                        'n-calendar-cell--outside': !day.isCurrentMonth,
                        'n-calendar-cell--today': day.isToday,
                        'n-calendar-cell--selected': day.isSelected,
                        'n-calendar-cell--disabled': day.isDisabled,
                        'n-calendar-cell--invalid': day.isInvalid,
                        'n-calendar-cell--range-start': day.isRangeStart,
                        'n-calendar-cell--range-end': day.isRangeEnd,
                        'n-calendar-cell--in-range': day.isInRange
                    }
                ]"
                role="gridcell"
                :aria-selected="day.isSelected"
                :aria-disabled="day.isDisabled"
                :tabindex="day.isDisabled ? -1 : 0"
                @click="handleDayClick(day, $event)"
                @mouseenter="handleHover(day.dateObject)"
                @focus="handleHover(day.dateObject)"
                @contextmenu.prevent="handleCancelPending"
                @keydown.enter.prevent="handleDayClick(day, $event)"
                @keydown.space.prevent="handleDayClick(day, $event)"
            >
                <slot name="cell" :day="day">
                    <span class="n-calendar-day-number">{{ day.dayOfMonth }}</span>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import dayjs from 'dayjs'
    import isoWeek from 'dayjs/plugin/isoWeek'
    import localeData from 'dayjs/plugin/localeData'
    import updateLocale from 'dayjs/plugin/updateLocale'
    import weekday from 'dayjs/plugin/weekday'
    import weekOfYear from 'dayjs/plugin/weekOfYear'
    import { computed, ref, toRefs } from 'vue'

    // Extend dayjs plugins
    dayjs.extend(weekOfYear)
    dayjs.extend(isoWeek)
    dayjs.extend(weekday)
    dayjs.extend(localeData)
    dayjs.extend(updateLocale)

    export type DateRange = {
        begin?: string | Date
        end?: string | Date
    }

    export interface NCalendarProps {
        modelValue?: (string | Date | DateRange)[] | string | Date | DateRange | null
        viewingYear?: number
        viewingWeek?: number // 1-52/53
        firstDayOfWeek?: number // 0 (Sun) - 6 (Sat)
        rows?: number
        weekDayNames?: string[]
        weekDayClass?: string[]
        multiple?: boolean
        selectable?: boolean
        range?: boolean
        maxRange?: number
        minRange?: number
        activeMonth?: number | null
        disabled?: (string | Date | DateRange)[]
    }

    const props = withDefaults(defineProps<NCalendarProps>(), {
        modelValue: () => [],
        viewingYear: () => dayjs().year(),
        viewingWeek: () => dayjs().week(),
        firstDayOfWeek: 1, // Default to Monday
        rows: 6,
        weekDayNames: undefined,
        weekDayClass: () => [],
        multiple: false,
        selectable: true,
        range: false,
        maxRange: 30,
        minRange: 1,
        activeMonth: undefined,
        disabled: () => []
    })

    const emits = defineEmits<{
        (e: 'update:modelValue', value: (string | Date | DateRange)[] | string | Date | DateRange | null): void
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
        range,
        maxRange,
        minRange,
        activeMonth,
        disabled
    } = toRefs(props)

    // --- State ---
    const internalPendingRange = ref<DateRange | null>(null)
    const hoveredDate = ref<dayjs.Dayjs | null>(null)

    // --- Date Logic ---

    const getWeekdayNumber = (index: number) => {
        return (firstDayOfWeek.value + index) % 7
    }

    const weekDayNames = computed(() => {
        if (customWeekNames.value && customWeekNames.value.length === 7) {
            const standard = [...customWeekNames.value]
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

    const getWeekDayClass = (index: number) => {
        if (Array.isArray(weekDayClass.value)) {
            const dayNum = getWeekdayNumber(index)
            return weekDayClass.value[dayNum] || ''
        }
        return ''
    }

    const gridStartDate = computed(() => {
        const isoMonday = dayjs(`${viewingYear.value}-01-01`).isoWeek(viewingWeek.value).startOf('isoWeek')
        const targetDay = firstDayOfWeek.value
        const currentIsoDay = 1
        let diff = currentIsoDay - targetDay
        if (diff < 0) diff += 7
        return isoMonday.subtract(diff, 'day')
    })

    const viewingMonth = computed(() => {
        return gridStartDate.value.add(3, 'day').month()
    })

    const normalizedModelValue = computed(() => {
        if (!modelValue.value) return []
        return Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value]
    })

    const checkDateInList = (date: dayjs.Dayjs, list: (string | Date | DateRange)[]) => {
        const dateStr = date.format('YYYY-MM-DD')
        for (const item of list) {
            if (typeof item === 'string' || item instanceof Date) {
                if (dayjs(item).format('YYYY-MM-DD') === dateStr) return true
            } else if (typeof item === 'object' && item !== null) {
                const rangeItem = item as DateRange
                let afterBegin = true
                let beforeEnd = true
                if (rangeItem.begin)
                    afterBegin =
                        date.isAfter(dayjs(rangeItem.begin), 'day') || date.isSame(dayjs(rangeItem.begin), 'day')
                if (rangeItem.end)
                    beforeEnd = date.isBefore(dayjs(rangeItem.end), 'day') || date.isSame(dayjs(rangeItem.end), 'day')
                if (afterBegin && beforeEnd && rangeItem.begin && rangeItem.end) return true
            }
        }
        return false
    }

    const isDateSelected = (date: dayjs.Dayjs) => {
        if (checkDateInList(date, normalizedModelValue.value)) return true
        if (range.value && internalPendingRange.value?.begin) {
            if (date.isSame(dayjs(internalPendingRange.value.begin), 'day')) return true
        }
        return false
    }

    const isDateDisabled = (date: dayjs.Dayjs) => checkDateInList(date, disabled.value)

    const isPendingRangeInvalid = computed(() => {
        if (!range.value || !internalPendingRange.value?.begin || !hoveredDate.value) return false

        const start = dayjs(internalPendingRange.value.begin)
        const end = hoveredDate.value
        const rangeStart = start.isBefore(end) ? start : end
        const rangeEnd = start.isBefore(end) ? end : start

        const diff = rangeEnd.diff(rangeStart, 'day') + 1
        if (diff < minRange.value || diff > maxRange.value) return true

        // Check if any disabled date exists in range
        let d = rangeStart
        while (d.isBefore(rangeEnd) || d.isSame(rangeEnd, 'day')) {
            if (isDateDisabled(d)) return true
            d = d.add(1, 'day')
        }
        return false
    })

    const gridDays = computed(() => {
        const days = []
        const totalDays = rows.value * 7
        let current = gridStartDate.value
        const currentActiveMonth = activeMonth.value
        const pendingInvalid = isPendingRangeInvalid.value

        for (let i = 0; i < totalDays; i++) {
            const isSelected = isDateSelected(current)
            const isDisabled = isDateDisabled(current)

            let isPendingInRange = false
            if (range.value && internalPendingRange.value?.begin && hoveredDate.value) {
                const start = dayjs(internalPendingRange.value.begin)
                const end = hoveredDate.value
                const rangeStart = start.isBefore(end) ? start : end
                const rangeEnd = start.isBefore(end) ? end : start
                if (
                    (current.isAfter(rangeStart, 'day') || current.isSame(rangeStart, 'day')) &&
                    (current.isBefore(rangeEnd, 'day') || current.isSame(rangeEnd, 'day'))
                ) {
                    isPendingInRange = true
                }
            }

            const prevDate = current.subtract(1, 'day')
            const nextDate = current.add(1, 'day')
            const isPrevSelected = isDateSelected(prevDate)
            const isNextSelected = isDateSelected(nextDate)

            let isCurrentMonth = true
            if (currentActiveMonth !== undefined) {
                if (currentActiveMonth === null) isCurrentMonth = false
                else isCurrentMonth = current.month() === currentActiveMonth
            }

            days.push({
                dateObject: current,
                dateString: current.format('YYYY-MM-DD'),
                dayOfMonth: current.date(),
                isCurrentMonth,
                isToday: current.isSame(dayjs(), 'day'),
                isSelected: isSelected || isPendingInRange,
                isDisabled,
                isInvalid: isPendingInRange && pendingInvalid,
                isRangeStart: isSelected && !isPrevSelected && isNextSelected,
                isRangeEnd: isSelected && !isNextSelected && isPrevSelected,
                isInRange:
                    isPendingInRange ||
                    (isSelected && isPrevSelected && isNextSelected) ||
                    (isSelected && (isPrevSelected || isNextSelected))
            })
            current = current.add(1, 'day')
        }
        return days
    })

    // --- Interaction ---

    function handleHover(date: dayjs.Dayjs | null) {
        hoveredDate.value = date
    }

    function handleCancelPending() {
        internalPendingRange.value = null
        hoveredDate.value = null
    }

    function handleDayClick(day: any, event: MouseEvent | KeyboardEvent) {
        if (!selectable.value) return
        if (day.isDisabled) return

        const dateStr = day.dateString
        let currentList = [...normalizedModelValue.value] as (DateRange | string | Date)[]

        if (range.value) {
            if (internalPendingRange.value && internalPendingRange.value.begin) {
                const start = dayjs(internalPendingRange.value.begin)
                const end = day.dateObject
                let finalBegin = start
                let finalEnd = end
                if (end.isBefore(start)) {
                    finalBegin = end
                    finalEnd = start
                }
                if (!multiple.value && currentList.length > 0) {
                    const r = currentList[0] as DateRange
                    if (typeof r === 'object' && r.begin === dateStr && r.end === dateStr && start.isSame(end, 'day')) {
                        emits('update:modelValue', null)
                        handleCancelPending()
                        return
                    }
                }
                const diff = finalEnd.diff(finalBegin, 'day') + 1
                let rangeValid = diff >= minRange.value && diff <= maxRange.value
                if (rangeValid) {
                    let d = finalBegin
                    while (d.isBefore(finalEnd) || d.isSame(finalEnd, 'day')) {
                        if (isDateDisabled(d)) {
                            rangeValid = false
                            break
                        }
                        d = d.add(1, 'day')
                    }
                }
                if (rangeValid) {
                    const finalizedRange = {
                        begin: finalBegin.format('YYYY-MM-DD'),
                        end: finalEnd.format('YYYY-MM-DD')
                    }
                    if (multiple.value) currentList.push(finalizedRange)
                    else currentList = [finalizedRange]
                    emits('update:modelValue', multiple.value ? currentList : finalizedRange)
                    handleCancelPending()
                } else {
                    // Invalid: cancel the range selection process
                    handleCancelPending()
                }
            } else {
                internalPendingRange.value = { begin: dateStr }
            }
            return
        }

        if (multiple.value) {
            const idx = currentList.findIndex(item => {
                const itemStr =
                    typeof item === 'string' || item instanceof Date ? dayjs(item).format('YYYY-MM-DD') : null
                return itemStr === dateStr
            })
            if (idx > -1) currentList.splice(idx, 1)
            else currentList.push(dateStr)
            emits('update:modelValue', currentList)
        } else {
            const currentStr = currentList.length > 0 ? dayjs(currentList[0] as any).format('YYYY-MM-DD') : null
            if (currentStr === dateStr) emits('update:modelValue', null)
            else emits('update:modelValue', dateStr)
        }
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-calendar {
            @apply flex flex-col w-full select-none outline-none;
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
                @apply relative h-10 w-full flex items-center justify-center text-sm cursor-pointer rounded-element transition-colors duration-100;
                @apply hover:bg-surface-indent;
                .n-calendar-day-number {
                    @apply z-10;
                }
            }
            .n-calendar-cell--outside {
                @apply text-text-light opacity-50;
            }
            .n-calendar-cell--disabled {
                @apply text-text-light opacity-30 cursor-not-allowed pointer-events-none bg-transparent;
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
            .n-calendar-cell--invalid {
                @apply bg-error text-text-invert opacity-80;
            }
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
    }
</style>
