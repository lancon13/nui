import dayjs from 'dayjs'

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
    const intervals: { start: dayjs.Dayjs; end: dayjs.Dayjs }[] = []

    for (const item of values) {
        if (!item) continue

        let start: dayjs.Dayjs
        let end: dayjs.Dayjs

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
    const merged: { start: dayjs.Dayjs; end: dayjs.Dayjs }[] = []
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
export function checkDateInList(date: dayjs.Dayjs, list: CalendarValue[]): boolean {
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

            // If we have explicit range boundaries, check containment
            // Using dayjs comparison. Plugins might be needed if strictly used, but we can use basic comparisons.
            // Component ensures isSameOrAfter/Before plugins are loaded.

            // Assume we can use standard comparison or rely on the caller environment having plugins.
            // To be safe and dependency-free here, we can use simple comparisons if plugins aren't guaranteed in helper.
            // But since this is inside the project, we can assume dayjs is set up or use basic logic.

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
 * @param weekOffset Optional offset to add to the result week (can be negative)
 */
export function getYearWeekFromMonth(year: number, month: number, weekOffset: number = 0): { year: number; week: number } {
    let date = dayjs().year(year).month(month).startOf('month')
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
 * Uses the start of the week + 3 days (middle of week) to determine the month.
 * @param year ISO Week Year
 * @param week ISO Week number
 */
export function getMonthFromYearWeek(year: number, week: number): { year: number; month: number } {
    const date = dayjs().year(year).isoWeek(week).startOf('isoWeek').add(3, 'day')
    return {
        year: date.year(),
        month: date.month()
    }
}
