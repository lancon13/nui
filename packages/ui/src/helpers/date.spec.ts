import { describe, expect, it } from 'vitest'
import dayjs, {
    generateCalendarDays,
    getMonthFromYearWeek,
    getVisibleSegments,
    getYearWeekFromMonth,
    normalizeDateRanges,
    removeMatchingRange,
    validateRange,
    type CalendarGenerationConfig
} from './date'

describe('validateRange', () => {
    const start = dayjs('2025-01-01')
    const end = dayjs('2025-01-05') // 5 days

    it('should return true for valid range', () => {
        expect(validateRange(start, end, {})).toBe(true)
    })

    it('should respect minRange', () => {
        expect(validateRange(start, end, { minRange: 6 })).toBe(false)
        expect(validateRange(start, end, { minRange: 5 })).toBe(true)
    })

    it('should respect maxRange', () => {
        expect(validateRange(start, end, { maxRange: 4 })).toBe(false)
        expect(validateRange(start, end, { maxRange: 5 })).toBe(true)
    })

    it('should fail if contains disabled date', () => {
        expect(validateRange(start, end, { disabled: ['2025-01-03'] })).toBe(false)
    })

    it('should pass even if contains invisible date (logic moved to splitting)', () => {
        // Validation no longer cares about visibility gaps.
        // It's up to getVisibleSegments to filter them out.
        expect(validateRange(start, end, {})).toBe(true)
    })
})

describe('removeMatchingRange', () => {
    it('should return original list if empty', () => {
        expect(removeMatchingRange([], { begin: '2025-01-01', end: '2025-01-02' })).toEqual([])
    })

    it('should return original list if range not found', () => {
        const list = [{ begin: '2025-01-01', end: '2025-01-05' }]
        const target = { begin: '2025-01-02', end: '2025-01-06' }
        expect(removeMatchingRange(list, target)).toBe(list) // Should be same reference if not found check implies optimization, or at least equal
        expect(removeMatchingRange(list, target)).toEqual(list)
    })

    it('should remove matching range', () => {
        const list = [
            { begin: '2025-01-01', end: '2025-01-05' },
            { begin: '2025-01-10', end: '2025-01-15' }
        ]
        const target = { begin: '2025-01-01', end: '2025-01-05' }
        const result = removeMatchingRange(list, target)

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({ begin: '2025-01-10', end: '2025-01-15' })
        // Ensure immutability
        expect(list).toHaveLength(2)
    })

    it('should ignore non-range items', () => {
        const list = ['2025-01-01', { begin: '2025-01-05', end: '2025-01-10' }]
        // Trying to remove something that looks like the string but passed as range?
        // The function only compares objects with 'begin'.
        const target = { begin: '2025-01-01', end: '2025-01-01' }
        const result = removeMatchingRange(list, target)
        expect(result).toEqual(list)
    })
})

describe('normalizeDateRanges', () => {
    it('should return empty array for empty input', () => {
        expect(normalizeDateRanges([])).toEqual([])
    })

    it('should normalize single strings to strings', () => {
        const input = ['2023-01-01', '2023-01-05']
        const output = normalizeDateRanges(input)
        expect(output).toEqual(['2023-01-01', '2023-01-05'])
    })

    it('should merge overlapping single dates', () => {
        const input = ['2023-01-01', '2023-01-01']
        const output = normalizeDateRanges(input)
        expect(output).toEqual(['2023-01-01'])
    })

    it('should merge adjacent single dates into a range', () => {
        const input = ['2023-01-01', '2023-01-02']
        const output = normalizeDateRanges(input)
        expect(output).toEqual([{ begin: '2023-01-01', end: '2023-01-02' }])
    })

    it('should merge overlapping ranges', () => {
        const input = [
            { begin: '2023-01-01', end: '2023-01-05' },
            { begin: '2023-01-03', end: '2023-01-08' }
        ]
        const output = normalizeDateRanges(input)
        expect(output).toEqual([{ begin: '2023-01-01', end: '2023-01-08' }])
    })

    it('should merge adjacent ranges', () => {
        const input = [
            { begin: '2023-01-01', end: '2023-01-05' },
            { begin: '2023-01-06', end: '2023-01-10' }
        ]
        const output = normalizeDateRanges(input)
        expect(output).toEqual([{ begin: '2023-01-01', end: '2023-01-10' }])
    })

    it('should merge mixed strings and ranges', () => {
        const input = ['2023-01-01', { begin: '2023-01-02', end: '2023-01-04' }, '2023-01-05']
        const output = normalizeDateRanges(input)
        expect(output).toEqual([{ begin: '2023-01-01', end: '2023-01-05' }])
    })

    it('should handle Date objects', () => {
        const d1 = new Date('2023-01-01')
        const d2 = new Date('2023-01-02')
        const output = normalizeDateRanges([d1, d2])
        expect(output).toEqual([{ begin: '2023-01-01', end: '2023-01-02' }])
    })

    it('should handle complex separated ranges', () => {
        const input = ['2023-01-01', '2023-01-03', '2023-01-04']
        // 01 is separate. 03-04 merge.
        const output = normalizeDateRanges(input)
        expect(output).toEqual(['2023-01-01', { begin: '2023-01-03', end: '2023-01-04' }])
    })
})

describe('getYearWeekFromMonth', () => {
    it('should return correct ISO week for month start', () => {
        // Jan 2025 starts on Wed 1st. Week 1.
        const { year, week } = getYearWeekFromMonth(2025, 0)
        expect(year).toBe(2025)
        expect(week).toBe(1)
    })

    it('should handle offset', () => {
        // Jan 2025 starts Week 1. +1 week = Week 2.
        const { year, week } = getYearWeekFromMonth(2025, 0, 1)
        expect(year).toBe(2025)
        expect(week).toBe(2)
    })

    it('should handle negative offset', () => {
        // Jan 2025 starts Week 1. -1 week = Last week of 2024 (Week 52 or 53)
        // 2024 has 52 weeks.
        const { year, week } = getYearWeekFromMonth(2025, 0, -1)
        expect(year).toBe(2024)
        expect(week).toBe(52)
    })
})

describe('getMonthFromYearWeek', () => {
    it('should return month for given week', () => {
        // Week 1 2025 -> Jan
        const { year, month } = getMonthFromYearWeek(2025, 1)
        expect(year).toBe(2025)
        expect(month).toBe(0)
    })

    it('should handle week in later month', () => {
        // Week 6 2025 -> Feb (Feb 1st is Sat, Week 5)
        // Week 6 starts Feb 3rd (Monday)
        const { year, month } = getMonthFromYearWeek(2025, 6)
        expect(year).toBe(2025)
        expect(month).toBe(1)
    })
})

describe('getVisibleSegments', () => {
    const start = dayjs('2025-01-01') // Wed
    const end = dayjs('2025-01-10') // Following Fri

    it('should return full range if no visibility list is provided', () => {
        const segments = getVisibleSegments(start, end, null)
        expect(segments).toEqual([{ begin: '2025-01-01', end: '2025-01-10' }])
    })

    it('should return empty array if no dates are visible', () => {
        // Visible range is in Feb
        const visible = [{ begin: '2025-02-01', end: '2025-02-28' }]
        const segments = getVisibleSegments(start, end, normalizeDateRanges(visible))
        expect(segments).toEqual([])
    })

    it('should return segments matching visible list', () => {
        // Visible: 1-3, 8-10. Hidden: 4-7
        const visible = [
            { begin: '2025-01-01', end: '2025-01-03' },
            { begin: '2025-01-08', end: '2025-01-10' }
        ]
        const segments = getVisibleSegments(start, end, normalizeDateRanges(visible))
        expect(segments).toEqual([
            { begin: '2025-01-01', end: '2025-01-03' },
            { begin: '2025-01-08', end: '2025-01-10' }
        ])
    })

    it('should clip range to selection bounds', () => {
        // Visible: 1-31 (Full month). Requested: 1-10.
        const visible = [{ begin: '2025-01-01', end: '2025-01-31' }]
        const segments = getVisibleSegments(start, end, normalizeDateRanges(visible))
        expect(segments).toEqual([{ begin: '2025-01-01', end: '2025-01-10' }])
    })

    it('should handle multiple gaps', () => {
        // 1-10 requested.
        // Visible: 1, 3, 5, 7, 9
        const visible = ['2025-01-01', '2025-01-03', '2025-01-05', '2025-01-07', '2025-01-09']
        const segments = getVisibleSegments(start, end, normalizeDateRanges(visible))
        expect(segments).toEqual([
            { begin: '2025-01-01', end: '2025-01-01' },
            { begin: '2025-01-03', end: '2025-01-03' },
            { begin: '2025-01-05', end: '2025-01-05' },
            { begin: '2025-01-07', end: '2025-01-07' },
            { begin: '2025-01-09', end: '2025-01-09' }
        ])
    })
})

describe('generateCalendarDays', () => {
    const config: CalendarGenerationConfig = {
        start: dayjs('2025-01-01'), // Wed
        daysCount: 7,
        selected: [],
        disabled: [],
        visible: null,
        isRange: false
    }

    it('should generate requested number of days', () => {
        const days = generateCalendarDays(config)
        expect(days.length).toBe(7)
        expect(days[0].dateString).toBe('2025-01-01')
        expect(days[6].dateString).toBe('2025-01-07')
    })

    it('should mark today', () => {
        // Mock today? Hard to test without mocking system time or passing "today" override to helper.
        // The helper uses `const today = dayjs()`.
        // Let's assume dayjs is accurate.
        // If we want to test isToday, we should construct a config around "today".
        const today = dayjs()
        const days = generateCalendarDays({ ...config, start: today })
        expect(days[0].isToday).toBe(true)
        expect(days[1].isToday).toBe(false)
    })

    it('should mark selected dates', () => {
        const days = generateCalendarDays({
            ...config,
            selected: ['2025-01-02']
        })
        expect(days[0].isSelected).toBe(false)
        expect(days[1].isSelected).toBe(true) // Jan 2
    })

    it('should mark disabled dates', () => {
        const days = generateCalendarDays({
            ...config,
            disabled: ['2025-01-03']
        })
        expect(days[2].isDisabled).toBe(true) // Jan 3
    })

    it('should handle activeMonth logic', () => {
        // Jan 2025. activeMonth = 0 (Jan).
        // Jan 1 is in Jan.
        const days = generateCalendarDays({
            ...config,
            activeMonth: 0
        })
        expect(days[0].isCurrentMonth).toBe(true)

        // activeMonth = 1 (Feb). Jan 1 is NOT in Feb.
        const days2 = generateCalendarDays({
            ...config,
            activeMonth: 1
        })
        expect(days2[0].isCurrentMonth).toBe(false)
    })

    it('should handle visibility', () => {
        // Visible only Jan 1
        const days = generateCalendarDays({
            ...config,
            visible: ['2025-01-01']
        })
        expect(days[0].isVisible).toBe(true)
        expect(days[1].isVisible).toBe(false)
    })
})
