/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRefHistory, UseRefHistoryOptions } from '@vueuse/core'
import { cloneDeep, isEqual } from 'es-toolkit'
import { isEmpty } from 'es-toolkit/compat'
import { computed, ComputedRef, nextTick, Ref, ref, toRaw, watch } from 'vue'
import * as z from 'zod'
import { ZodObject, ZodType } from 'zod'
import { toRawDeep } from './data'
import { UseRefHistoryRecord } from '@vueuse/core'

export type UseFormOptions = {
    initialSchemas?: ZodObject<any>
    immediateValidate?: boolean
} & UseRefHistoryOptions<any, any>

export type UseFormFieldState = {
    value: any
    schema: ZodType<any, any, any>
    errors: z.ZodIssue[]
    errorMessage: string | null
    dirtyErrorMessage: string | null
    changeErrorMessage: string | null
    isValid: boolean
    isInvalid: boolean
    isClean: boolean
    isDirty: boolean
    isUnchanged: boolean
    isChanged: boolean
}

export type UseForm<T extends Record<string, any>> = {
    // --- State ---
    data: Ref<T>
    schemas: Ref<ZodObject<any>>

    // --- Computed State ---
    errors: ComputedRef<Record<string, z.ZodIssue[]>>
    changes: ComputedRef<Record<string, any>>
    modifies: ComputedRef<Record<string, any>>
    isValid: ComputedRef<boolean>
    isInvalid: ComputedRef<boolean>
    isClean: ComputedRef<boolean>
    isDirty: ComputedRef<boolean>
    isUnchanged: ComputedRef<boolean>
    isChanged: ComputedRef<boolean>
    errorMessages: ComputedRef<Record<string, string>>
    results: ComputedRef<Record<string, UseFormFieldState>>

    // --- History ---
    history: Ref<UseRefHistoryRecord<T>[]>
    undo: () => void
    redo: () => void
    clearHistory: () => void

    // --- Methods ---
    validate: () => void
    reset: (newData?: T) => Promise<void>
    clearErrors: () => void
    clearChanges: () => void
    clearModifies: () => void
    getRawData: () => T
}

export function useForm<T extends Record<string, any>>(
    initialData: T,
    options?: UseFormOptions
): UseForm<T> {
    const data = ref<T>(initialData)
    const baseData = ref(cloneDeep(data.value))

    options ??= {
        initialSchemas: z.object({}),
        immediateValidate: true
    }
    options.immediateValidate ??= true
    options.initialSchemas = z.object(
        Object.entries(data.value).reduce(
            (ss, [key]) => {
                ss[key] ??= z.any()
                return ss
            },
            options.initialSchemas?.shape ?? ({} as Record<string, ZodType<any>>)
        )
    )
    const schemas = ref<ZodObject<any>>(options.initialSchemas)

    const errors = ref<Record<string, z.ZodIssue[]>>({})
    const changes = ref<Record<string, any>>({})
    const modifies = ref<Record<string, any>>({})

    const { history, undo, redo, clear } = useRefHistory(data, {
        deep: true,
        ...options
    })

    const isValid = computed(() => isEmpty(errors.value))
    const isInvalid = computed(() => !isValid.value)
    const isClean = computed(() => isEmpty(modifies.value))
    const isDirty = computed(() => !isClean.value)
    const isUnchanged = computed(() => isEmpty(changes.value))
    const isChanged = computed(() => !isUnchanged.value)
    const errorMessages = computed(() =>
        Object.entries(errors.value).reduce(
            (es, [key, issues]) => {
                if (issues.length > 0 && typeof issues?.[0]?.message === 'string')
                    es[key] = issues?.[0]?.message
                return es
            },
            {} as Record<string, string>
        )
    )
    const results = computed(() => {
        return Object.fromEntries(
            Object.entries(schemas.value.shape).map(([key, schema]) => {
                // --- Define states in constants for clarity and reuse ---
                const isDirty = key in modifies.value
                const isChanged = key in changes.value
                const hasError = key in errors.value
                const errorMessage = errorMessages.value[key] ?? null

                const fieldState = {
                    value: (data.value as any)[key],
                    schema,
                    errors: errors.value[key] ?? [],
                    errorMessage,
                    dirtyErrorMessage: isDirty ? errorMessage : null,
                    changeErrorMessage: isChanged ? errorMessage : null,
                    isValid: !hasError,
                    isInvalid: hasError,
                    isClean: !isDirty,
                    isDirty,
                    isUnchanged: !isChanged,
                    isChanged
                }
                return [key, fieldState]
            })
        )
    })

    function validate() {
        const validator = toRaw(schemas.value)
        const result = validator.safeParse(toRaw(data.value))

        errors.value = !result.success
            ? result.error.issues.reduce(
                  (es, issue) => {
                      const basePath = issue.path.at(0)
                      if (typeof basePath === 'string') {
                          const joinedPaths = issue.path.join('.')
                          es[joinedPaths] ??= []
                          es[joinedPaths].push(issue)
                      }
                      return es
                  },
                  {} as Record<string, z.ZodIssue[]>
              )
            : {}
    }

    async function reset(newData?: T) {
        data.value = newData || cloneDeep(baseData.value)
        baseData.value = cloneDeep(data.value)
        return new Promise<void>(resolve => {
            nextTick(() => {
                clear()
                errors.value = {}
                changes.value = {}
                modifies.value = {}
                resolve()
            })
        })
    }

    function clearErrors() {
        errors.value = {}
    }
    function clearChanges() {
        changes.value = {}
    }
    function clearModifies() {
        modifies.value = {}
    }

    function getRawData() {
        return toRawDeep(data.value)
    }

    watch([data, schemas], validate, {
        deep: true,
        flush: 'post',
        immediate: !!options.immediateValidate
    })
    watch(history, () => {
        const latest = history.value.at(0)
        if (latest) {
            changes.value = {}
            Object.entries(baseData.value).forEach(([key, value]) => {
                if (!isEqual(latest.snapshot[key], baseData.value[key])) {
                    changes.value[key] = value
                    modifies.value[key] = value
                }
            })
        }
    })

    return {
        data: data as Ref<T, T>,
        schemas,

        errors: computed(() => errors.value),
        changes: computed(() => changes.value),
        modifies: computed(() => modifies.value),

        history,
        undo,
        redo,
        validate,
        reset,

        isValid,
        isInvalid,
        isClean,
        isDirty,
        isUnchanged,
        isChanged,

        errorMessages,
        results: results as ComputedRef<Record<string, UseFormFieldState>>,

        clearHistory: clear,
        clearErrors,
        clearChanges,
        clearModifies,

        getRawData
    }
}