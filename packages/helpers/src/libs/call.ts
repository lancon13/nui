/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAsyncState, type UseAsyncStateOptions } from '@vueuse/core'
import { isEqual, toMerged } from 'es-toolkit'
import { debounce, isNumber, throttle } from 'es-toolkit/compat'
import { computed, reactive, ref, type Ref, toRef, watch } from 'vue'

export type UseCall<P extends any[] = any[], R = unknown> = {
    result: R
    error: Ref<Error | null>
    isExecuting: Ref<boolean>
    isLoading: Ref<boolean>
    isReady: Ref<boolean>
    call: (...args: P) => Promise<R>
    immediate: (flag: boolean) => UseCall<P, R>
    cache: (flag: boolean) => UseCall<P, R>
    refresh: () => Promise<R>
}

export type UseCallOptions<P, R> = {
    initialParams?: P | Ref<P>
    initialResult?: R | Ref<R>
    useCache?: boolean
    paramsChangedRefresh?: boolean
    debounce?: number
    throttle?: number
    cacheDuration?: number
    onBefore?: (params: P) => void
    onAfter?: (params: P, result: R) => void
    onData?: (params: P, result: R) => void
} & UseAsyncStateOptions<true, R>

export function useCall<P extends any[] = any[], R = unknown>(
    func: (...params: P) => Promise<R>,
    options?: UseCallOptions<P, R>
): UseCall<P, R> {
    options ??= {} as UseCallOptions<P, R>
    options.useCache ??= true
    options.onBefore ??= () => {}
    options.onAfter ??= () => {}
    options.onData ??= () => {}
    options.cacheDuration ??= 5000

    const caches = new Map<string, Promise<R>>()
    const paramsState = toRef(options.initialParams ?? []) as Ref<P>
    const resultState = toRef(options.initialResult ?? (undefined as R)) as Ref<R>
    const isExecuting = ref(false)
    const isImmediate = ref(false)
    const isWithoutCache = ref(false)

    const isShallow = ref(false)

    function shallow(flag: boolean = false) {
        isShallow.value = flag
        return self
    }
    function cache(flag: boolean = false) {
        isWithoutCache.value = flag
        return self
    }
    function immediate(flag: boolean = false) {
        isImmediate.value = flag
        return self
    }

    // Async call
    const { execute, state, isLoading, isReady, error } = useAsyncState<R, P, true>(
        async (...params: P) => {
            // 1. Prepare Parameters
            const execParams =
                Array.isArray(params) && params.length
                    ? isShallow.value
                        ? { ...paramsState.value, ...params }
                        : toMerged(paramsState.value, params)
                    : paramsState.value

            // 2. Get the Promise (either fresh or from cache)
            let implementationPromise: Promise<any>

            if (isWithoutCache.value) {
                implementationPromise = (isImmediate.value ? func : debouncedFunc)(...execParams)
            } else {
                const key = JSON.stringify(execParams)

                if (!caches.has(key)) {
                    const freshPromise = debouncedFunc(...execParams)
                    caches.set(key, freshPromise)
                    // Auto-expire cache
                    setTimeout(() => caches.delete(key), options?.cacheDuration || 1)
                }

                // We cast to Promise<any> here to ensure type safety when awaiting below
                implementationPromise = caches.get(key) as Promise<any>
            }

            // 3. Await Execution & Handle Side Effects
            isExecuting.value = true
            // Using a try/finally ensures isExecuting is reset even if the promise rejects
            try {
                const result = await implementationPromise

                // Trigger callback
                options?.onData?.(execParams, result)

                // 4. Normalize/Unwrap Result
                // Check if result is an object to safely access .data or .error
                if (result && typeof result === 'object') {
                    if ('error' in result && result.error) {
                        throw result.error
                    }
                    if ('data' in result) {
                        return result.data as R
                    }
                }

                return result as R
            } finally {
                // Ensures this is set to false even if the unwrapping logic above throws
                isExecuting.value = false
            }
        },
        options?.initialResult as R,
        {
            immediate: false,
            resetOnExecute: true,
            throwError: true,
            ...options // Spread options last to allow overrides if necessary
        }
    )

    // Throttled with Debounced
    const throttledFunc =
        isNumber(options.throttle) && options.throttle > 0 ? throttle(func, options.throttle) : func
    const debouncedFunc =
        isNumber(options.debounce) && options.debounce > 0
            ? (debounce(throttledFunc, options.debounce) as (...params: P) => Promise<R>)
            : throttledFunc

    // Watch the params and result change then refresh
    watch(
        paramsState,
        (newValue, oldValue) => {
            if (options.paramsChangedRefresh === true && !isEqual(newValue, oldValue))
                execute(1, ...paramsState.value)
        },
        { deep: true }
    )
    watch(state, result => (resultState.value = result), { deep: true })

    // Error state
    const errorState = computed({
        get: () => {
            if (!error.value) return null
            else if (!(error.value instanceof Error) || typeof error.value === 'object')
                return new Error(error.value.toString())
            return error.value
        },
        set: (newError: Error | null) => {
            error.value = newError
        }
    })

    const refresh = () => {
        return execute(1, ...(paramsState.value ?? []))
    }

    const self = {
        isExecuting,
        isLoading,
        isReady,
        result: resultState,
        error: errorState,
        call: (...params: P) => {
            return execute(1, ...params)
        },
        cache,
        immediate,
        shallow,
        refresh
    }

    return reactive(self) as unknown as UseCall<P, R>
}