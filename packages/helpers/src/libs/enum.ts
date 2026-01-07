import type { EnumIndexes, EnumKeys, EnumObject, EnumValues } from '../types/enum'

/**
 * Gets an array of the keys (member names) from a TypeScript enum.
 *
 * @param targetEnum The enum object to get the keys from.
 * @returns An array of strings containing the enum keys.
 *
 * @example
 * const logLevelKeys = getEnumKeys(LogLevel);
 * // Output: ['DEBUG', 'INFO', 'WARN', 'ERROR']
 */
export function getEnumKeys<T extends object>(targetEnum: T): EnumKeys<T> {
    // For numeric enums, Object.keys returns both names and values as strings.
    // We filter out the numeric strings to get only the keys.
    return Object.keys(targetEnum).filter(key => isNaN(Number(key))) as Array<keyof T>
}

/**
 * Gets an array of the indexes (member indexes) from a TypeScript enum.
 *
 * @param targetEnum The enum object to get the keys from.
 * @returns An array of numbers containing the enum indexes.
 *
 * @example
 * const logLevelKeys = getEnumIndexes(LogLevel);
 * // Output: [0, 1, 2, 3]
 */
export function getEnumIndexes<T extends object>(targetEnum: T): EnumIndexes<T> {
    return getEnumKeys(targetEnum).map((_, index) => index)
}

/**
 * Gets an array of the values from a TypeScript enum.
 *
 * @param targetEnum The enum object to get the values from.
 * @returns An array of strings or numbers containing the enum values.
 *
 * @example
 * const logLevelValues = getEnumValues(LogLevel);
 * // Output: [0, 1, 2, 3]
 *
 * const httpMethodValues = getEnumValues(HttpMethod);
 * // Output: ['GET', 'POST', 'PUT', 'DELETE']
 */
export function getEnumValues<T extends object>(targetEnum: T): EnumValues<T> {
    // First, get the keys using our getEnumKeys function.
    const keys = getEnumKeys(targetEnum)
    // Then, map over the keys to get the corresponding values from the enum object.
    return keys.map(key => targetEnum[key as keyof T]) as EnumValues<T>
}

/**
 * Gets an object that maps enum keys to their corresponding values.
 *
 * @param targetEnum The enum object to process.
 * @returns An object mapping enum keys to their values.
 *
 * @example
 * const logLevelObject = getEnumObject(LogLevel);
 * // Output:
 * // {
 * //   DEBUG: 0,
 * //   INFO: 1,
 * //   WARN: 2,
 * //   ERROR: 3
 * // }
 */
export function getEnumObject<T extends object>(targetEnum: T): EnumObject<T> {
    // Get the keys first.
    const keys = getEnumKeys(targetEnum)
    // Use reduce to build an object from the keys and their corresponding values.
    return keys.reduce((acc, key) => {
        acc[key] = targetEnum[key as keyof T] as T[keyof T]
        return acc
    }, {} as EnumObject<T>)
}

export function findEnumIndex<T extends object>(targetEnum: T, key: keyof T): number | null {
    return getEnumKeys(targetEnum).findIndex(k => k === key)
}
export function findEnumKey<T extends object>(targetEnum: T, index: number): keyof T | null {
    return getEnumKeys(targetEnum).reduce(
        (found, key, i) => {
            if (i === index) return key
            return found
        },
        null as keyof T | null
    )
}