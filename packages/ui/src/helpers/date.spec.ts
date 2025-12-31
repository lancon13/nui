import { describe, it, expect } from 'vitest'
import { normalizeDateRanges } from './date'

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
        const input = [
            '2023-01-01',
            { begin: '2023-01-02', end: '2023-01-04' },
            '2023-01-05'
        ]
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
        const input = [
             '2023-01-01',
             '2023-01-03',
             '2023-01-04'
        ]
        // 01 is separate. 03-04 merge.
        const output = normalizeDateRanges(input)
        expect(output).toEqual(['2023-01-01', { begin: '2023-01-03', end: '2023-01-04' }])
    })
})
