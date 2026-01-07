import { Option } from '../types/options'

export function toOptions<T extends object>(
    options: T | T[],
    label: keyof T = 'label' as keyof T,
    value: keyof T = 'value' as keyof T
): Option[] {
    if (!options) return []

    if (Array.isArray(options))
        return options.map(option => ({
            label:
                (Array.isArray(label)
                    ? option[((label as string[]).find(l => option[l as keyof T]) as keyof T) ?? '']
                    : option[label]) ?? '',
            value: option[value] ?? '',
            data: option
        })) as { label: string; value: string; data: T }[]
    else
        return Object.entries(options).map(([value, label]) => ({
            label,
            value,
            data: value as unknown as T
        }))
}