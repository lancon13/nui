import dayjs from 'dayjs'
import { CamelCase, SnakeCase } from '../types/data'
import { isUUID } from './validation'

/**
 * Converts various Vue-style class bindings to a single string of space-separated class names.
 */
export function toClassName(classBinding: any): string {
    if (typeof classBinding === 'string') {
        return classBinding
    } else if (Array.isArray(classBinding)) {
        return classBinding
            .filter(item => item)
            .map(item => toClassName(item))
            .join(' ')
    } else if (typeof classBinding === 'object' && classBinding !== null) {
        return Object.entries(classBinding)
            .filter(([, value]) => value)
            .map(([key]) => key)
            .join(' ')
    }
    return ''
}

export function toCamelCase(str: string): string {
    if (typeof str !== 'string' || isUUID(str)) return str

    return str.replace(/([-_][a-z])/gi, $1 => {
        return $1.toUpperCase().replace('-', '').replace('_', '')
    })
}

export function toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

export function toCapitalCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function toDateString(
    date: Date | string | null,
    format: string = 'DD MMM YYYY (ddd)'
): string {
    return dayjs(date).format(format)
}

export function toDateInput(date: Date | string | null, format: string = 'YYYY/MM/DD'): string {
    return dayjs(date).format(format)
}

export function toTimeString(date: Date | string | null, format: string = 'hh:mm A'): string {
    return dayjs(date).format(format)
}

export function toCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export function toNumber(number: number): string {
    return new Intl.NumberFormat('en-US').format(number)
}

export function toInitial(str: string, limit = 2): string {
    return str
        .split(' ')
        .slice(0, limit)
        .map(word => word[0])
        .join('')
        .toUpperCase()
}

// Function to convert data keys from camelCase
export function fromData<T extends object | object[]>(data: T): SnakeCase<T> {
    if (typeof data !== 'object' || data === null) return data as SnakeCase<T>

    if (Array.isArray(data)) return data.map(item => fromData(item)) as unknown as SnakeCase<T>

    return Object.entries(data).reduce((newObject, [key, value]) => {
        ;(newObject as Record<string, unknown>)[toSnakeCase(key)] = fromData(value)
        return newObject
    }, {} as SnakeCase<T>)
}

// Function to convert data keys to camelCase
export function toData<T extends object | object[]>(data: T): CamelCase<T> {
    if (typeof data !== 'object' || data === null) return data as CamelCase<T>

    if (Array.isArray(data)) return data.map(item => toData(item)) as unknown as CamelCase<T>

    return Object.entries(data).reduce((newObject, [key, value]) => {
        ;(newObject as Record<string, unknown>)[toCamelCase(key)] = toData(value)
        return newObject
    }, {} as CamelCase<T>)
}
