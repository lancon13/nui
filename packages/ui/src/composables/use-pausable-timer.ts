import { getCurrentScope, onScopeDispose, ref, unref, type MaybeRefOrGetter } from 'vue'

export interface UsePausableTimerOptions {
    immediate?: boolean
}

export function usePausableTimer(
    cb: () => void,
    interval: MaybeRefOrGetter<number>,
    options: UsePausableTimerOptions = {}
) {
    const { immediate = false } = options

    const isPending = ref(false) // True if timer is active (running OR paused)
    const isPaused = ref(false) // True specifically if currently paused

    let timerId: ReturnType<typeof setTimeout> | null = null
    let startTime: number = 0
    let remainingTime: number = 0

    const stop = () => {
        isPending.value = false
        isPaused.value = false
        remainingTime = 0
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
    }

    const start = () => {
        // Reset everything
        stop()

        const duration = unref(interval) as number
        if (duration <= 0) return

        isPending.value = true
        isPaused.value = false
        remainingTime = duration
        startTime = Date.now()

        timerId = setTimeout(() => {
            isPending.value = false
            cb()
        }, remainingTime)
    }

    const pause = () => {
        // Can only pause if running and not already paused
        if (!isPending.value || isPaused.value || !timerId) return

        isPaused.value = true
        clearTimeout(timerId)
        timerId = null

        // Calculate remaining time
        const elapsed = Date.now() - startTime
        remainingTime -= elapsed
    }

    const resume = () => {
        // Can only resume if pending and paused
        if (!isPending.value || !isPaused.value) return

        isPaused.value = false
        startTime = Date.now()

        timerId = setTimeout(() => {
            isPending.value = false
            cb()
        }, remainingTime)
    }

    // Lifecycle: Auto-stop if the component using this is unmounted
    if (getCurrentScope()) {
        onScopeDispose(stop)
    }

    // Init
    if (immediate) start()

    return {
        start,
        stop,
        pause,
        resume,
        isPending,
        isPaused
    }
}
