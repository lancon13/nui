/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Generates a pseudo-random alphanumeric string.
 */
export function generatePseudoRandomKey() {
    return Math.random().toString(36).substring(2, 15)
}

/**
 * Returns a promise that resolves after a specified delay.
 */
export async function delay(ms = 1) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Debounces a function call.
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (this: any, ...args: Parameters<T>) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), delay)
    } as T
}

/**
 * Throttles a function call.
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number) {
    let inThrottle: boolean
    return function (this: any, ...args: Parameters<T>) {
        if (!inThrottle) {
            fn.apply(this, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    } as T
}

/**
 * Wraps a promise in a try/catch block and returns a [error, result] tuple.
 */
export async function tryCall<P extends any[], R>(
    // eslint-disable-next-line no-unused-vars
    func: (...args: P) => Promise<R>,
    ...args: P
): Promise<[Error | null, R | undefined]> {
    let error: Error | null = null
    let result: R | undefined

    try {
        result = await func(...args)
    } catch (e) {
        error = e instanceof Error ? e : new Error(String(e))
    }

    return [error, result]
}