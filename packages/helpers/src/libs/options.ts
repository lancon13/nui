/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option } from '../types/options'

export function toOptions<T extends object>(
    options: T | T[],
    label: keyof T = 'label' as keyof T,
    value: keyof T = 'value' as keyof T
): Option[] {
    if (!options) return []

    if (Array.isArray(options))
        return options.map(option => {
            const labelKey = Array.isArray(label)
                ? (label as string[]).find(l => (option as any)[l])
                : (label as string)

            return {
                label: (labelKey ? (option as any)[labelKey] : '') ?? '',
                value: (option[value] as any) ?? '',
                data: option
            }
        })
    else
        return Object.entries(options).map(([value, label]) => ({
            label,
            value,
            data: value as unknown as T
        }))
}
