import { createGlobalState } from '@vueuse/core'
import { reactive, computed, markRaw } from 'vue'
import type { Component } from 'vue'

export type ToastPosition = 'top' | 'center' | 'bottom'
export type ToastDirection = 'left' | 'center' | 'right'

export interface Toast {
    id: string
    content: string | Component
    position: ToastPosition
    direction: ToastDirection
    timeout: number
    close: () => void
}

export interface ToastOptions {
    content: string | Component
    position?: ToastPosition
    direction?: ToastDirection
    timeout?: number
}

export const useNuiToast = createGlobalState(() => {
    const toasts = reactive<Toast[]>([])

    const locations = computed(() => {
        return ['top', 'center', 'bottom']
            .map(p => ['left', 'center', 'right'].map(d => `${p}-${d}`))
            .flat()
            .filter(v => v !== 'center-center')
    })

    const toastsByLocations = computed(() => {
        return locations.value.reduce(
            (obj, pos) => {
                obj[pos] = toasts.filter(toast => `${toast.position}-${toast.direction}` === pos)
                return obj
            },
            {} as Record<string, Toast[]>
        )
    })

    const timers = new Map<string, number>()

    const remove = (id: string) => {
        const index = toasts.findIndex(t => t.id === id)
        if (index > -1) {
            toasts.splice(index, 1)
        }
        if (timers.has(id)) {
            clearTimeout(timers.get(id))
            timers.delete(id)
        }
    }

    const add = (options: ToastOptions) => {
        const id = `toast-${Date.now()}-${Math.random()}`
        const close = () => remove(id)

        const toast: Toast = {
            id,
            content:
                typeof options.content === 'object'
                    ? markRaw(options.content as Component)
                    : options.content,
            position: options.position || 'bottom',
            direction: options.direction || 'right',
            timeout: options.timeout || 5000,
            close
        }

        toasts.push(toast)

        if (toast.timeout > 0) {
            const timer = window.setTimeout(() => {
                remove(id)
            }, toast.timeout)
            timers.set(id, timer)
        }
    }

    const pause = (id: string) => {
        if (timers.has(id)) {
            clearTimeout(timers.get(id))
        }
    }

    const resume = (id: string) => {
        const toast = toasts.find(t => t.id === id)
        if (toast && toast.timeout > 0) {
            const timer = window.setTimeout(() => {
                remove(id)
            }, toast.timeout)
            // Restart timer, does not account for remaining time.
            timers.set(id, timer)
        }
    }

    return {
        toasts,
        locations,
        toastsByLocations,
        add,
        remove,
        pause,
        resume
    }
})
