import { describe, expect, it } from 'vitest'
import { getMonthFromYearWeek, getYearWeekFromMonth, normalizeDateRanges } from './date'

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
