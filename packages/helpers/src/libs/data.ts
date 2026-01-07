/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject } from 'es-toolkit/compat'
import { isReactive, toRaw } from 'vue'

export function toRawDeep(data: any) {
    const rawData = isReactive(data) ? toRaw(data) : data

    if (isObject(rawData) || Array.isArray(rawData))
        for (const key in rawData)
            if (Object.prototype.hasOwnProperty.call(rawData, key)) {
                const value = (rawData as Record<string, any>)[key]
                if (
                    isReactive(value) ||
                    (isObject(value) && Object.keys(value).length > 0) ||
                    Array.isArray(value)
                )
                    (rawData as Record<string, any>)[key] = toRawDeep(value)
            }
    return rawData
}