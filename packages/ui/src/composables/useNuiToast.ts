import { createGlobalState } from '@vueuse/core'
import { reactive, computed, markRaw, defineComponent } from 'vue'
import type { Component } from 'vue'

import type { NuiBadgeProps } from '../components/NuiBadge.vue'
import NuiButton from '../components/NuiButton.vue'
import NuiBanner from '../components/NuiBanner.vue'

export type ToastPosition = 'top' | 'center' | 'bottom'
export type ToastDirection = 'left' | 'center' | 'right'
export type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface Toast {
    id: string
    content: Component
    position: ToastPosition
    direction: ToastDirection
    timeout: number
    close: () => void
    groupId?: string
    count: number
    order: number
    badgeProps?: NuiBadgeProps
    badgePosition?: BadgePosition
}

export interface ToastOptions {
    content: string
    position?: ToastPosition
    direction?: ToastDirection
    timeout?: number
    groupId?: string
    badgeProps?: NuiBadgeProps
    badgePosition?: BadgePosition
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
        if (options.groupId) {
            const existingToast = toasts.find(t => t.groupId === options.groupId)
            if (existingToast) {
                existingToast.count++
                existingToast.order = Date.now() // Update order to move to top
                // Reset timer for the grouped toast
                if (timers.has(existingToast.id)) {
                    clearTimeout(timers.get(existingToast.id))
                }
                if (existingToast.timeout > 0) {
                    const timer = window.setTimeout(() => {
                        remove(existingToast.id)
                    }, existingToast.timeout)
                    timers.set(existingToast.id, timer)
                }
                return
            }
        }

        const id = `toast-${Date.now()}-${Math.random()}`
        const close = () => remove(id)

        const content = defineComponent({
            components: { NuiBanner, NuiButton },
            template: options.content,
            setup() {
                return { close }
            }
        })

        const toast: Toast = {
            id,
            content: markRaw(content),
            position: options.position || 'bottom',
            direction: options.direction || 'right',
            timeout: options.timeout || 5000,
            close,
            groupId: options.groupId,
            count: 1,
            order: Date.now(),
            badgeProps: options.badgeProps,
            badgePosition: options.badgePosition
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
