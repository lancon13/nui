import { createGlobalState } from '@vueuse/core'
import type { Component } from 'vue'
import { computed, markRaw, reactive } from 'vue'

import type { NuiBadgeProps } from '../components/NuiBadge.vue'

export type ToastPosition = 'top' | 'center' | 'bottom'
export type ToastDirection = 'left' | 'center' | 'right'
export type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface Toast {
    id: string
    content: Component
    props?: Record<string, unknown>
    position: ToastPosition
    direction: ToastDirection
    timeout: number
    close: () => void
    groupId?: string
    count: number
    order: number
    badgeProps?: NuiBadgeProps
    badgePosition?: BadgePosition
    progress: number
    paused: boolean
    noProgress?: boolean
    progressLocation?: 'top' | 'bottom'
    timerControls?: {
        start: () => void
        pause: () => void
        resume: () => void
        reset: () => void
        stop: () => void
    }
}

export interface ToastOptions {
    content: Component
    props?: Record<string, unknown>
    position?: ToastPosition
    direction?: ToastDirection
    timeout?: number
    groupId?: string
    badgeProps?: NuiBadgeProps
    badgePosition?: BadgePosition
    noProgress?: boolean
    progressLocation?: 'top' | 'bottom'
}

// eslint-disable-next-line no-unused-vars
function createToastTimer(toast: Toast, removeCallback: (id: string) => void) {
    let timerId: number | undefined
    let updaterId: number | undefined
    let startTime: number = 0 // When the current segment started
    let totalElapsedTime: number = 0 // Total time elapsed across all segments

    const stop = () => {
        if (timerId !== undefined) clearTimeout(timerId)
        if (updaterId !== undefined) clearInterval(updaterId)
        timerId = undefined
        updaterId = undefined
    }

    const updateProgress = () => {
        if (toast.timeout <= 0) {
            toast.progress = 100
            return
        }
        const currentSegmentElapsed = Date.now() - startTime
        const currentTotalElapsed = totalElapsedTime + currentSegmentElapsed
        toast.progress = (currentTotalElapsed / toast.timeout) * 100
        if (toast.progress >= 100) {
            toast.progress = 100 // Cap at 100
            stop()
        }
    }

    const start = () => {
        stop() // Clear any existing timers first
        if (toast.timeout <= 0) {
            toast.progress = 100
            return
        }

        toast.paused = false
        startTime = Date.now() // Start of this segment
        timerId = window.setTimeout(() => {
            removeCallback(toast.id)
            stop()
        }, toast.timeout - totalElapsedTime) // Timeout for remaining time
        updaterId = window.setInterval(updateProgress, 50)
    }

    const pause = () => {
        stop()
        toast.paused = true
        totalElapsedTime += Date.now() - startTime // Add elapsed time of current segment
    }

    const resume = () => {
        if (toast.paused) {
            start()
        }
    }

    const reset = () => {
        stop()
        totalElapsedTime = 0
        toast.progress = 0
        start()
    }

    // Initial start if not paused
    if (!toast.paused) {
        start()
    }

    return { start, pause, resume, reset, stop }
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
                obj[pos] = toasts
                    .filter(toast => `${toast.position}-${toast.direction}` === pos)
                    .sort((a, b) => b.order - a.order) // Sort by order, descending
                return obj
            },
            {} as Record<string, Toast[]>
        )
    })

    const remove = (id: string) => {
        const index = toasts.findIndex(t => t.id === id)
        if (index > -1) {
            const toast = toasts[index]
            toast.timerControls?.stop() // Stop timer before removing
            toasts.splice(index, 1)
        }
    }

    const add = (options: ToastOptions) => {
        if (options.groupId) {
            const existingToast = toasts.find(t => t.groupId === options.groupId)
            if (existingToast) {
                existingToast.count++
                existingToast.order = Date.now()
                existingToast.timerControls?.reset() // Reset timer for grouped toast
                return
            }
        }

        const id = `toast-${Date.now()}-${Math.random()}`
        const close = () => remove(id)
        const timeout = options.timeout || 5000

        const newToast: Toast = {
            id,
            content: markRaw(options.content),
            props: options.props,
            position: options.position || 'bottom',
            direction: options.direction || 'right',
            timeout,
            close,
            groupId: options.groupId,
            count: 1,
            order: Date.now(),
            badgeProps: options.badgeProps,
            badgePosition: options.badgePosition,
            progress: 0,
            paused: false,
            noProgress: options.noProgress ?? false,
            progressLocation: options.progressLocation ?? 'bottom'
        }

        toasts.push(newToast) // Push the raw object. Vue makes it reactive within the array.

        // Get the reactive proxy of the toast object from the array.
        const reactiveToast = toasts[toasts.length - 1]

        // Create and store timer controls, passing the reactive proxy.
        reactiveToast.timerControls = createToastTimer(reactiveToast, remove)
    }

    const pause = (id: string) => {
        const toast = toasts.find(t => t.id === id)
        if (toast) {
            toast.timerControls?.pause()
        }
    }

    const resume = (id: string) => {
        const toast = toasts.find(t => t.id === id)
        if (toast) {
            toast.timerControls?.resume()
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
