import { reactive, readonly, computed, markRaw } from 'vue'
import type { Component } from 'vue'

export type NuiToastPosition = 'top' | 'center' | 'bottom'
export type NuiToastDirection = 'left' | 'center' | 'right'

export type NuiToastObj = {
    id: number
    content: Component
    duration?: number
    position?: NuiToastPosition
    direction?: NuiToastDirection
    close: () => void
}

export type NuiToastObjOptions = Omit<NuiToastObj, 'id' | 'close'>

const state = reactive<{
    toasts: NuiToastObj[]
}>({ toasts: [] })
let toastCount = 0

// --- Timer Logic ---
const timers = new Map<number, ReturnType<typeof createTimer>>()

function createTimer(callback: () => void, delay: number) {
    let timerId: number

    const pause = () => {
        window.clearTimeout(timerId)
    }

    const resume = () => {
        window.clearTimeout(timerId)
        timerId = window.setTimeout(callback, delay)
    }

    const clear = () => {
        window.clearTimeout(timerId)
    }

    resume()

    return { pause, resume, clear }
} // --- End Timer Logic ---

const remove = (id: number) => {
    const index = state.toasts.findIndex(t => t.id === id)
    if (index > -1) {
        state.toasts.splice(index, 1)
        if (timers.has(id)) {
            timers.get(id)?.clear()
            timers.delete(id)
        }
    }
}

const add = (options: NuiToastObjOptions) => {
    const id = toastCount++
    const close = () => remove(id)

    const toast: NuiToastObj = {
        id,
        duration: 3000,
        position: 'top',
        direction: 'right',
        ...options,
        content: markRaw(options.content),
        close
    }

    state.toasts.unshift(toast)

    if (toast.duration && toast.duration > 0) {
        timers.set(
            id,
            createTimer(() => remove(id), toast.duration)
        )
    }
}

const toastsByPosition = computed(() => {
    const groups: Record<string, NuiToastObj[]> = {}
    for (const toast of state.toasts) {
        const key = `${toast.position || 'top'}-${toast.direction || 'right'}`
        if (!groups[key]) {
            groups[key] = []
        }
        groups[key].push(toast)
    }
    return groups
})

const pause = (id: number) => {
    timers.get(id)?.pause()
}

const resume = (id: number) => {
    timers.get(id)?.resume()
}

export function useNuiToast() {
    return {
        toasts: readonly(state.toasts),
        toastsByPosition,
        add,
        remove,
        pause,
        resume
    }
}
