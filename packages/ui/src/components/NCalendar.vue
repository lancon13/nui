<template>
    <div class="n-calendar" tabindex="-1" @keydown="handleRootKey">
        <div :class="containerClasses">
            <div v-for="(view, calIndex) in calendarsGrid" :key="calIndex" :class="view.viewClasses">
                <!-- Custom Header Slot -->
                <slot
                    :name="`calendar-header-${calIndex}`"
                    :index="calIndex"
                    :start-date="view.days[0]?.date"
                    :end-date="view.days[view.days.length - 1]?.date"
                >
                    <slot
                        name="calendar-header"
                        :index="calIndex"
                        :start-date="view.days[0]?.date"
                        :end-date="view.days[view.days.length - 1]?.date"
                    />
                </slot>

                <!-- Weekday Header -->
                <slot name="week-label-container" :calendar-index="calIndex">
                    <div :class="view.weekLabelContainerClasses" role="row">
                        <div
                            v-for="(dayName, index) in view.weekLabelNames"
                            :key="dayName"
                            :class="['n-calendar-view-week-label', view.weekLabelClasses[index]]"
                            role="columnheader"
                            :aria-label="dayName"
                        >
                            <slot
                                :name="`week-label-${getWeekdayNumber(index, view.firstDayOfWeek)}`"
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
                <div :class="view.gridClasses" role="grid" :aria-multiselectable="multiple" @mouseleave="handleHover(null)">
                    <div
                        v-for="day in view.days"
                        :key="day.dateString"
                        :ref="el => setCellRef(el, day.dateString)"
                        :class="[
                            'n-calendar-view-grid-cell',
                            ...view.extraGridCellClasses,
                            {
                                'n-calendar-view-grid-cell--outside': !day.isCurrentMonth,
                                'n-calendar-view-grid-cell--today': day.isToday,
                                'n-calendar-view-grid-cell--selected': day.isSelected,
                                'n-calendar-view-grid-cell--disabled': day.isDisabled,
                                'n-calendar-view-grid-cell--invalid': day.isInvalid,
                                'n-calendar-view-grid-cell--selecting': day.isSelecting,
                                'n-calendar-view-grid-cell--range-start': day.isRangeStart,
                                'n-calendar-view-grid-cell--range-end': day.isRangeEnd,
                                'n-calendar-view-grid-cell--in-range': day.isInRange,
                                'invisible pointer-events-none': !day.isVisible
                            }
                        ]"
                        role="gridcell"
                        :aria-label="day.ariaLabel"
                        :aria-selected="day.isSelected"
                        :aria-disabled="day.isDisabled"
                        :tabindex="day.dateString === currentFocusDate && day.isVisible ? 0 : -1"
                        @click="handleDayClick(day, $event)"
                        @mouseenter="handleHover(day.date)"
                        @focus="handleFocus(day)"
                        @contextmenu="handleContextMenu"
                        @keydown="handleKeyDown($event, day)"
                    >
                        <slot v-if="day.isVisible" name="cell" :day="day" :calendar-index="calIndex">
                            <span class="n-calendar-view-day-number">{{ day.dayOfMonth }}</span>
                        </slot>
                    </div>
                </div>

                <!-- Custom Footer Slot -->
                <slot
                    name="calendar-footer"
                    :index="calIndex"
                    :start-date="view.days[0]?.date"
                    :end-date="view.days[view.days.length - 1]?.date"
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
    import {
        checkDateInList,
        normalizeDateRanges,
        type CalendarValue,
        type DateRange,
        getVisibleSegments,
        getYearWeekFromMonth,
        generateCalendarDays
    } from '../helpers'
    import { resolveClassProp } from '../helpers/dom'

    // --- Plugins ---
    dayjs.extend(weekOfYear)
    dayjs.extend(isoWeek)
    dayjs.extend(weekday)
    dayjs.extend(localeData)
    dayjs.extend(updateLocale)
    dayjs.extend(isSameOrAfter)
    dayjs.extend(isSameOrBefore)

    // --- Props & Types ---
    export interface CalendarViewProps {
        viewingYear?: number
        viewingWeek?: number
        firstDayOfWeek?: number
        rows?: number
        weekLabelNames?: string[]
        weekLabelClass?: string[]
        activeMonth?: number | number[] | null
        disabled?: CalendarValue[]
        visible?: CalendarValue[]
        viewClass?: string | string[] | object
        weekLabelContainerClass?: string | string[] | object
        gridClass?: string | string[] | object
        gridCellClass?: string | string[] | object
    }

    export interface NCalendarProps extends CalendarViewProps {
        modelValue?: CalendarValue[] | CalendarValue | null
        multiple?: boolean
        selectable?: boolean
        unselectable?: boolean
        range?: boolean
        numViews?: number
        maxRange?: number
        minRange?: number
        views?: CalendarViewProps[]
        containerClass?: string | string[] | object
    }

    const props = withDefaults(defineProps<NCalendarProps>(), {
        modelValue: () => [],
        viewingYear: () => dayjs().year(),
        viewingWeek: () => dayjs().week(),
        firstDayOfWeek: 1,
        rows: 6,
        weekLabelNames: undefined,
        weekLabelClass: () => [],
        multiple: false,
        selectable: true,
        unselectable: true,
        range: false,
        numViews: 1,
        maxRange: 30,
        minRange: 1,
        activeMonth: undefined,
        disabled: () => [],
        visible: undefined,
        viewClass: undefined,
        containerClass: undefined,
        weekLabelContainerClass: undefined,
        gridClass: undefined,
        gridCellClass: undefined,
        views: undefined
    })

    const emits = defineEmits<{
        (e: 'update:modelValue', value: CalendarValue[] | CalendarValue | null): void
        (e: 'update:viewingWeek', value: number): void
        (e: 'update:viewingYear', value: number): void
    }>()

    const {
        modelValue,
        viewingYear,
        viewingWeek,
        firstDayOfWeek,
        rows,
        weekLabelNames: customWeekNames,
        weekLabelClass,
        multiple,
        selectable,
        unselectable,
        range,
        numViews,
        maxRange,
        minRange,
        activeMonth,
        disabled,
        visible,
        viewClass,
        containerClass,
        weekLabelContainerClass,
        gridClass,
        gridCellClass,
        views
    } = toRefs(props)

    // --- State ---
    const internalPendingRange = ref<DateRange | null>(null)
    const hoveredDate = ref<dayjs.Dayjs | null>(null)
    const currentFocusDate = ref<string>(dayjs().format('YYYY-MM-DD'))
    const cellRefs = new Map<string, HTMLElement>()

    // --- Class Resolution ---
    const containerClasses = computed(() => resolveClassProp('n-calendar-container', containerClass.value))

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
    const getWeekdayNumber = (index: number, firstDay: number) => (firstDay + index) % 7

    const normalizedModelValue = computed(() => {
        if (!modelValue.value) return []
        const list = Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value]
        return normalizeDateRanges(list)
    })

    const normalizedDisabled = computed(() => normalizeDateRanges(disabled.value))
    const normalizedVisible = computed(() => (visible.value ? normalizeDateRanges(visible.value) : null))

    const isPendingRangeInvalid = computed(() => {
        if (!range.value || !internalPendingRange.value?.begin || !hoveredDate.value) return false

        const start = dayjs(internalPendingRange.value.begin)
        const end = hoveredDate.value
        const [rangeStart, rangeEnd] = start.isBefore(end) ? [start, end] : [end, start]

        const diff = rangeEnd.diff(rangeStart, 'day') + 1
        if (diff < minRange.value || diff > maxRange.value) return true

        let d = rangeStart.clone()
        while (d.isSameOrBefore(rangeEnd, 'day')) {
            if (checkDateInList(d, normalizedDisabled.value)) return true
            d = d.add(1, 'day')
        }
        return false
    })

    // --- Grid Generation ---
    const calendarsGrid = computed(() => {
        const grids = []
        // Determine how many views to render
        const count = views.value && views.value.length > 0 ? views.value.length : Math.max(1, numViews.value)

        let globalStart: dayjs.Dayjs | null = null
        // Calculate global start only if not using per-view overrides logic for continuity fallback
        if (!views.value || views.value.length === 0) {
            const y = viewingYear.value ?? dayjs().year()
            const w = viewingWeek.value ?? dayjs().week()
            const fd = firstDayOfWeek.value ?? 1
            const isoMonday = dayjs().year(y).isoWeek(w).startOf('isoWeek')
            let diff = 1 - fd
            if (diff < 0) diff += 7
            globalStart = isoMonday.subtract(diff, 'day')
        }

        const pendingInvalid = isPendingRangeInvalid.value

        let pendingStart: dayjs.Dayjs | null = null
        let pendingEnd: dayjs.Dayjs | null = null
        if (range.value && internalPendingRange.value?.begin && hoveredDate.value) {
            const start = dayjs(internalPendingRange.value.begin)
            const end = hoveredDate.value
            pendingStart = start.isBefore(end) ? start : end
            pendingEnd = start.isBefore(end) ? end : start
        }

        for (let c = 0; c < count; c++) {
            // Merge global props with view-specific props
            const viewConfig = views.value?.[c] || {}

            // Resolve props with fallback to global
            const currentYear = viewConfig.viewingYear ?? viewingYear.value ?? dayjs().year()
            const currentWeek = viewConfig.viewingWeek ?? viewingWeek.value ?? dayjs().week()
            const currentFirstDay = viewConfig.firstDayOfWeek ?? firstDayOfWeek.value ?? 1
            const currentRows = viewConfig.rows ?? rows.value ?? 6
            const currentActive = viewConfig.activeMonth !== undefined ? viewConfig.activeMonth : activeMonth.value

            const currentDisabledRaw = viewConfig.disabled ?? disabled.value ?? []
            const currentDisabled = normalizeDateRanges(currentDisabledRaw)

            const currentVisibleRaw = viewConfig.visible ?? visible.value
            const currentVisible = currentVisibleRaw ? normalizeDateRanges(currentVisibleRaw) : null

            // Classes
            const currentViewClasses = resolveClassProp('n-calendar-view', viewConfig.viewClass ?? viewClass.value)
            const currentContainerClasses = resolveClassProp(
                'n-calendar-view-week-label-container',
                viewConfig.weekLabelContainerClass ?? weekLabelContainerClass.value
            )
            const currentGridClasses = resolveClassProp('n-calendar-view-grid', viewConfig.gridClass ?? gridClass.value)
            const currentExtraGridCellClasses = resolveClassProp(viewConfig.gridCellClass ?? gridCellClass.value)

            // Labels
            const currentWeekNamesRaw = viewConfig.weekLabelNames ?? customWeekNames.value
            let currentWeekNames: string[]
            if (currentWeekNamesRaw?.length === 7) {
                const standard = [...currentWeekNamesRaw]
                let startIndex = currentFirstDay - 1
                if (startIndex < 0) startIndex += 7
                currentWeekNames = Array.from({ length: 7 }, (_, i) => standard[(startIndex + i) % 7])
            } else {
                let d = dayjs().day(currentFirstDay)
                currentWeekNames = Array.from({ length: 7 }, () => {
                    const name = d.format('ddd')
                    d = d.add(1, 'day')
                    return name
                })
            }

            const currentWeekClassesRaw = viewConfig.weekLabelClass ?? weekLabelClass.value ?? []
            const currentWeekLabelClasses = Array.from({ length: 7 }, (_, i) => {
                const idx = (currentFirstDay + i) % 7
                return Array.isArray(currentWeekClassesRaw) ? currentWeekClassesRaw[idx] || '' : ''
            })

            // Calculate start date for this specific view
            let currentStart: dayjs.Dayjs
            if (views.value && (viewConfig.viewingYear !== undefined || viewConfig.viewingWeek !== undefined)) {
                // Independent start logic
                const isoMonday = dayjs().year(currentYear).isoWeek(currentWeek).startOf('isoWeek')
                let diff = 1 - currentFirstDay
                if (diff < 0) diff += 7
                currentStart = isoMonday.subtract(diff, 'day')
            } else {
                // Continuous logic
                if (!globalStart) {
                    // Should not happen if logic is correct, but safe fallback
                    const isoMonday = dayjs().year(currentYear).isoWeek(currentWeek).startOf('isoWeek')
                    let diff = 1 - currentFirstDay
                    if (diff < 0) diff += 7
                    globalStart = isoMonday.subtract(diff, 'day')
                }
                const daysPerCalendar = (rows.value ?? 6) * 7 // Use global rows for stride in legacy mode
                currentStart = globalStart.add(c * daysPerCalendar, 'day')
            }

            // Use the helper to generate day objects
            const days = generateCalendarDays({
                start: currentStart,
                daysCount: currentRows * 7,
                activeMonth: currentActive,
                selected: normalizedModelValue.value,
                disabled: currentDisabled,
                visible: currentVisible,
                isRange: range.value,
                pendingStart,
                pendingEnd,
                pendingInvalid,
                minRange: minRange.value,
                maxRange: maxRange.value,
                hoveredDate: hoveredDate.value
            })

            grids.push({
                days,
                viewClasses: currentViewClasses,
                weekLabelContainerClasses: currentContainerClasses,
                gridClasses: currentGridClasses,
                extraGridCellClasses: currentExtraGridCellClasses,
                weekLabelNames: currentWeekNames,
                weekLabelClasses: currentWeekLabelClasses,
                firstDayOfWeek: currentFirstDay,
                disabledList: currentDisabled,
                visibleList: currentVisible
            })
        }
        return grids
    })

    watch(() => calendarsGrid.value, focusCurrentDate)

    // --- Exposed Methods ---
    function setMonth(month: number, year?: number | string) {
        const targetYear = year !== undefined ? Number(year) : viewingYear.value
        const { year: y, week: w } = getYearWeekFromMonth(targetYear, month)
        emits('update:viewingYear', y)
        emits('update:viewingWeek', w)
    }

    defineExpose({
        setMonth
    })

    // --- Interaction ---
    function handleHover(date: dayjs.Dayjs | null) {
        hoveredDate.value = date
    }

    function handleFocus(day: any) {
        if (!day.isVisible) return
        handleHover(day.date)
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
        if (!day.isVisible) return
        const key = event.key
        if (key === 'Enter' || key === ' ') {
            event.preventDefault()
            handleDayClick(day, event)
            return
        }

        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) return
        event.preventDefault()

        const current = dayjs(day.date)
        let target = current.clone()

        if (key === 'ArrowUp') target = target.subtract(7, 'day')
        else if (key === 'ArrowDown') target = target.add(7, 'day')
        else if (key === 'ArrowLeft') target = target.subtract(1, 'day')
        else target = target.add(1, 'day')

        currentFocusDate.value = target.format('YYYY-MM-DD')

        const start = calendarsGrid.value[0].days[0].date
        const lastView = calendarsGrid.value[calendarsGrid.value.length - 1]
        const end = lastView.days[lastView.days.length - 1].date

        if (target.isBefore(start) || target.isSame(start) || target.isAfter(end) || target.isSame(end)) {
            let newRefDate = dayjs(`${viewingYear.value}-01-01`).isoWeek(viewingWeek.value)
            if (target.isBefore(start)) newRefDate = newRefDate.subtract(1, 'week')
            else if (target.isAfter(end.subtract(1, 'day'))) newRefDate = newRefDate.add(1, 'week')

            emits('update:viewingYear', newRefDate.isoWeekYear())
            emits('update:viewingWeek', newRefDate.isoWeek())
        }
    }

    function handleDayClick(day: any, _event?: MouseEvent | KeyboardEvent) {
        if (!selectable.value || day.isDisabled || !day.isVisible) return

        const dateStr = day.dateString
        let currentList = [...normalizedModelValue.value] as CalendarValue[]

        if (range.value) handleRangeSelection(day, currentList, dateStr)
        else handleSimpleSelection(currentList, dateStr)
    }

    function handleRangeSelection(day: any, currentList: CalendarValue[], dateStr: string) {
        if (internalPendingRange.value?.begin) {
            const start = dayjs(internalPendingRange.value.begin)
            const end = day.date
            const [finalBegin, finalEnd] = end.isBefore(start) ? [end, start] : [start, end]

            const finalizedRange = {
                begin: finalBegin.format('YYYY-MM-DD'),
                end: finalEnd.format('YYYY-MM-DD')
            }

            if (unselectable.value && tryDeselectRange(currentList, finalizedRange)) return

            const isVisibleGlobal = (d: dayjs.Dayjs) => {
                if (visible.value) return checkDateInList(d, normalizedVisible.value!)
                return true
            }

            const isDisabledGlobal = (d: dayjs.Dayjs) => checkDateInList(d, normalizedDisabled.value)

            if (validateRange(finalBegin, finalEnd, isDisabledGlobal)) {
                const segments = getVisibleSegments(finalBegin, finalEnd, normalizedVisible.value)

                if (segments.length > 0) {
                    if (multiple.value) {
                        currentList.push(...segments)
                    } else {
                        currentList = segments
                    }
                    
                    const normalized = normalizeDateRanges(currentList)
                    if (!multiple.value && normalized.length === 1) {
                         emits('update:modelValue', normalized[0])
                    } else {
                         emits('update:modelValue', normalized)
                    }
                }
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

    function validateRange(
        start: dayjs.Dayjs,
        end: dayjs.Dayjs,
        isDisabledFn?: (d: dayjs.Dayjs) => boolean,
        isVisibleFn?: (d: dayjs.Dayjs) => boolean
    ): boolean {
        const diff = end.diff(start, 'day') + 1
        if (diff < minRange.value || diff > maxRange.value) return false

        let d = start.clone()
        const checkDisabled = isDisabledFn || (d => checkDateInList(d, normalizedDisabled.value))
        const checkVisible =
            isVisibleFn || (d => !normalizedVisible.value || checkDateInList(d, normalizedVisible.value))

        while (d.isSameOrBefore(end, 'day')) {
            if (checkDisabled(d)) return false
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
                @apply flex flex-row gap-4 grow;
            }
            .n-calendar-view {
                @apply flex flex-col grow;
                .n-calendar-view-week-label-container {
                    @apply grid grid-cols-7 mb-2;
                }

                .n-calendar-view-week-label {
                    @apply text-center text-xs font-semibold 
                    text-text-light uppercase 
                    py-1;
                }

                .n-calendar-view-grid {
                    @apply grid grid-cols-7 gap-y-2;
                }

                .n-calendar-view-grid-cell {
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

                    &.n-calendar-view-grid-cell--outside {
                        @apply text-text-light;
                    }

                    &.n-calendar-view-grid-cell--disabled {
                        @apply cursor-not-allowed 
                        bg-neutral-light text-text-light
                        rounded-none;
                        @apply hover:opacity-100 hover:border-transparent hover:rounded-none;
                    }

                    &.n-calendar-view-grid-cell--today {
                        @apply font-bold text-brand;
                        &::after {
                            content: '';
                            @apply absolute bottom-1 w-1 h-1 bg-brand rounded-full;
                        }
                    }

                    &.n-calendar-view-grid-cell--selected {
                        @apply bg-brand text-text-invert rounded-element;
                    }

                    &.n-calendar-view-grid-cell--selecting {
                        @apply bg-brand-light text-brand rounded-element;
                    }

                    &.n-calendar-view-grid-cell--invalid {
                        @apply bg-error-light text-error cursor-not-allowed;
                    }

                    &.n-calendar-view-grid-cell--in-range {
                        &:not(.n-calendar-view-grid-cell--selected) {
                            @apply bg-brand-light text-text;
                        }
                        &:not(.n-calendar-view-grid-cell--range-start):not(.n-calendar-view-grid-cell--range-end) {
                            @apply rounded-none;
                        }
                    }

                    &.n-calendar-view-grid-cell--range-start {
                        @apply rounded-r-none;
                    }

                    &.n-calendar-view-grid-cell--range-end {
                        @apply rounded-l-none;
                    }
                }
            }
        }
    }
</style>
