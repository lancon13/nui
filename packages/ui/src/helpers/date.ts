/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs/esm'
import advancedFormat from 'dayjs/esm/plugin/advancedFormat'
import isoWeek from 'dayjs/esm/plugin/isoWeek'
import isSameOrAfter from 'dayjs/esm/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/esm/plugin/isSameOrBefore'
import localeData from 'dayjs/esm/plugin/localeData'
import updateLocale from 'dayjs/esm/plugin/updateLocale'
import weekday from 'dayjs/esm/plugin/weekday'
import weekOfYear from 'dayjs/esm/plugin/weekOfYear'
import isLeapYear from 'dayjs/esm/plugin/isLeapYear'
import isoWeeksInYear from 'dayjs/esm/plugin/isoWeeksInYear'
import { type Dayjs } from 'dayjs'

// Apply all your specific plugins
dayjs.extend(advancedFormat)
dayjs.extend(isoWeek)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(localeData)
dayjs.extend(updateLocale)
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(isLeapYear)
dayjs.extend(isoWeeksInYear)

export type DateRange = {
    begin?: string | Date
    end?: string | Date
}

export type CalendarValue = string | Date | DateRange

/**
 * Combines a list of dates and date ranges into a minimal set of non-overlapping ranges/dates.
 * - overlapping or adjacent ranges are merged.
 * - Single day ranges are converted to 'YYYY-MM-DD' strings.
 * - Multi-day ranges are returned as DateRange objects with 'YYYY-MM-DD' strings.
 */
export function normalizeDateRanges(values: CalendarValue[]): CalendarValue[] {
    if (!values || values.length === 0) return []

    // 1. Normalize to [start, end] dayjs objects
    const intervals: { start: Dayjs; end: Dayjs }[] = []

    for (const item of values) {
        if (!item) continue

        let start: Dayjs
        let end: Dayjs

        if (typeof item === 'string' || item instanceof Date) {
            start = dayjs(item)
            end = start
        } else {
            // DateRange
            const r = item as DateRange
            if (!r.begin && !r.end) continue

            if (r.begin && !r.end) {
                start = dayjs(r.begin)
                end = start
            } else if (!r.begin && r.end) {
                start = dayjs(r.end)
                end = start
            } else {
                // Both exist
                const d1 = dayjs(r.begin)
                const d2 = dayjs(r.end)
                if (d1.isBefore(d2)) {
                    start = d1
                    end = d2
                } else {
                    start = d2
                    end = d1
                }
            }
        }

        if (!start.isValid() || !end.isValid()) continue
        intervals.push({ start: start.startOf('day'), end: end.startOf('day') })
    }

    if (intervals.length === 0) return []

    // 2. Sort by start date
    intervals.sort((a, b) => a.start.diff(b.start))

    // 3. Merge
    const merged: { start: Dayjs; end: Dayjs }[] = []
    let current = intervals[0]

    for (let i = 1; i < intervals.length; i++) {
        const next = intervals[i]

        // Check if overlaps or adjacent (end + 1 day >= next.start)
        // actually strictly adjacent means end.add(1, 'day').isSame(next.start) or isAfter.
        // Since we normalized to startOf('day'), we can check:
        // current.end >= next.start - 1 day

        const threshold = current.end.add(1, 'day')

        if (threshold.isAfter(next.start) || threshold.isSame(next.start)) {
            // Merge
            if (next.end.isAfter(current.end)) {
                current.end = next.end
            }
        } else {
            // Push current, start new
            merged.push(current)
            current = next
        }
    }
    merged.push(current)

    // 4. Convert back to output format
    return merged.map(interval => {
        if (interval.start.isSame(interval.end, 'day')) {
            return interval.start.format('YYYY-MM-DD')
        } else {
            return {
                begin: interval.start.format('YYYY-MM-DD'),
                end: interval.end.format('YYYY-MM-DD')
            }
        }
    })
}

/**
 * Checks if a given date exists in a list of dates/ranges.
 * Handles string dates, Date objects, and DateRange objects.
 */
export function checkDateInList(date: Dayjs, list?: CalendarValue[] | null): boolean {
    if (!list || list.length === 0) return false

    const dateStr = date.format('YYYY-MM-DD')

    for (const item of list) {
        if (!item) continue

        if (typeof item === 'string' || item instanceof Date) {
            if (dayjs(item).format('YYYY-MM-DD') === dateStr) return true
        } else {
            // DateRange
            const r = item as DateRange
            if (!r.begin && !r.end) continue

            const d = date
            let afterBegin = true
            let beforeEnd = true

            if (r.begin) {
                const begin = dayjs(r.begin)
                afterBegin = d.isAfter(begin, 'day') || d.isSame(begin, 'day')
            }
            if (r.end) {
                const end = dayjs(r.end)
                beforeEnd = d.isBefore(end, 'day') || d.isSame(end, 'day')
            }

            if (afterBegin && beforeEnd) return true
        }
    }
    return false
}

/**
 * Returns the ISO week and year for the start of a given month.
 * Useful for initializing calendar views.
 * @param year Calendar year
 * @param month Month index (0-11)
 */
export function getYearWeekFromMonth(
    year: number,
    month: number,
    weekOffset: number = 0
): { year: number; week: number } {
    // Construct date explicitly to avoid "current time" side effects
    let date = dayjs(`${year}-${String(month + 1).padStart(2, '0')}-01`)
    if (weekOffset !== 0) {
        date = date.add(weekOffset, 'week')
    }
    return {
        year: date.isoWeekYear(),
        week: date.isoWeek()
    }
}

/**
 * Returns the approximate Month index (0-11) and Year for a given ISO week.
 * @param year ISO Week Year
 * @param week ISO Week number
 */
export function getMonthFromYearWeek(year: number, week: number): { year: number; month: number } {
    const date = dayjs(`${year}-01-04`).isoWeek(week).startOf('isoWeek').add(3, 'day') // Look at Thursday (middle of week) to determine the month ownership

    return {
        year: date.year(),
        month: date.month()
    }
}

/**
 * Splits a requested date range into multiple visible segments based on a visibility list.
 * If visibleList is null or empty, the entire range is considered visible and returned as a single segment.
 */
export function getVisibleSegments(start: Dayjs, end: Dayjs, visibleList: CalendarValue[] | null): DateRange[] {
    if (!visibleList || visibleList.length === 0) {
        return [
            {
                begin: start.format('YYYY-MM-DD'),
                end: end.format('YYYY-MM-DD')
            }
        ]
    }

    const segments: DateRange[] = []
    let segmentStart: Dayjs | null = null

    // Ensure start is before end
    let d = start.clone() as any
    const limit = end.clone()

    if (d.isAfter(limit)) {
        return [] // Invalid range
    }

    while (d.isSameOrBefore(limit, 'day')) {
        const isVisible = checkDateInList(d, visibleList)

        if (isVisible) {
            if (!segmentStart) segmentStart = d.clone()
        } else {
            if (segmentStart) {
                segments.push({
                    begin: segmentStart.format('YYYY-MM-DD'),
                    end: d.subtract(1, 'day').format('YYYY-MM-DD')
                })
                segmentStart = null
            }
        }
        d = d.add(1, 'day')
    }

    if (segmentStart) {
        segments.push({
            begin: segmentStart.format('YYYY-MM-DD'),
            end: limit.format('YYYY-MM-DD')
        })
    }

    return segments
}

export interface CalendarDay {
    date: Dayjs
    dateString: string
    dayOfMonth: number
    ariaLabel: string
    isCurrentMonth: boolean
    isToday: boolean
    isSelected: boolean
    isDisabled: boolean
    isVisible: boolean
    isInvalid: boolean
    isSelecting: boolean
    isRangeStart: boolean
    isRangeEnd: boolean
    isInRange: boolean
}

export interface CalendarGenerationConfig extends RangeValidationConfig {
    start: Dayjs
    daysCount: number
    activeMonth?: number | number[] | null
    selected: CalendarValue[]
    isRange: boolean
    pendingStart?: Dayjs | null
    pendingEnd?: Dayjs | null
    pendingInvalid?: boolean
    hoveredDate?: Dayjs | null
    visible?: CalendarValue[] | null
}

export interface RangeValidationConfig {
    minRange?: number
    maxRange?: number
    disabled?: CalendarValue[]
}

/**
 * Validates if a range is allowed based on min/max length and disabled dates.
 * Note: Visibility is not checked here; ranges crossing hidden dates are considered valid
 * (they will just be split by getVisibleSegments later).
 */
export function validateRange(start: Dayjs, end: Dayjs, config: RangeValidationConfig): boolean {
    const diff = Math.abs(end.diff(start, 'day')) + 1
    if (config.minRange !== undefined && diff < config.minRange) return false
    if (config.maxRange !== undefined && diff > config.maxRange) return false

    const [rangeStart, rangeEnd] = start.isBefore(end) ? [start, end] : [end, start]

    let d = rangeStart.clone() as any
    while (d.isSameOrBefore(rangeEnd, 'day')) {
        if (config.disabled && checkDateInList(d, config.disabled)) return false
        d = d.add(1, 'day')
    }
    return true
}

export function generateCalendarDays(config: CalendarGenerationConfig): CalendarDay[] {
    const {
        start,
        daysCount,
        activeMonth,
        selected,
        disabled,
        visible,
        isRange,
        pendingStart,
        pendingEnd,
        pendingInvalid
    } = config

    const days: CalendarDay[] = []
    let current = start.clone()
    const today = dayjs()

    const isDateDisabled = (d: Dayjs) => checkDateInList(d, disabled)
    const isDateVisible = (d: Dayjs) => !visible || checkDateInList(d, visible)

    const isPending = (d: any) => {
        if (!pendingStart || !pendingEnd) return false
        return d.isSameOrAfter(pendingStart, 'day') && d.isSameOrBefore(pendingEnd, 'day')
    }

    const isDateSelected = (d: Dayjs) => {
        if (checkDateInList(d, selected)) return true
        // If range mode, check if it matches the exact pending start (anchor)
        // This is mainly for UI feedback before range is closed
        if (isRange && pendingStart && !pendingEnd) {
            return d.isSame(pendingStart, 'day')
        }
        return false
    }

    const isEffectiveSelected = (d: Dayjs) => isDateSelected(d) || isPending(d)

    for (let i = 0; i < daysCount; i++) {
        const isDisabled = isDateDisabled(current)
        const isVisible = isDateVisible(current)
        const isPendingInRange = isPending(current)

        const prevDate = current.subtract(1, 'day')
        const nextDate = current.add(1, 'day')

        const isSelfSelected = isEffectiveSelected(current)
        const isPrevSelected = isEffectiveSelected(prevDate)
        const isNextSelected = isEffectiveSelected(nextDate)

        let isCurrentMonth = true
        if (activeMonth !== undefined) {
            if (activeMonth === null) isCurrentMonth = false
            else if (Array.isArray(activeMonth)) isCurrentMonth = activeMonth.includes(current.month())
            else isCurrentMonth = current.month() === activeMonth
        }

        days.push({
            date: current,
            dateString: current.format('YYYY-MM-DD'),
            dayOfMonth: current.date(),
            ariaLabel: current.format('dddd, MMMM D, YYYY'),
            isCurrentMonth,
            isToday: current.isSame(today, 'day'),
            isSelected: isSelfSelected,
            isDisabled,
            isVisible,
            isInvalid: isPendingInRange && !!pendingInvalid,
            isSelecting: isPendingInRange,
            isRangeStart: isSelfSelected && !isPrevSelected && isNextSelected,
            isRangeEnd: isSelfSelected && !isNextSelected && isPrevSelected,
            isInRange: isSelfSelected && (isPrevSelected || isNextSelected)
        })
        current = current.add(1, 'day')
    }

    return days
}

/**
 * Removes a specific range from a list of calendar values if it exists.
 * Returns a new array with the range removed, or the original array if not found.
 * Does not modify the input array.
 */
export function removeMatchingRange(list: CalendarValue[], targetRange: DateRange): CalendarValue[] {
    if (!list || list.length === 0) return list

    // Check if we can find the index
    const idx = list.findIndex(item => {
        if (typeof item === 'object' && item !== null && 'begin' in item) {
            const r = item as DateRange
            return dayjs(r.begin).isSame(targetRange.begin, 'day') && dayjs(r.end).isSame(targetRange.end, 'day')
        }
        return false
    })

    if (idx === -1) return list

    // Return new list without the item
    const newList = [...list]
    newList.splice(idx, 1)
    return newList
}

export type { Dayjs } from 'dayjs'
export default dayjs as any
