/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-unused-vars */
import { createVNode, getCurrentInstance, h, nextTick, render, VNode } from 'vue'
import NLoading from '../components/NLoading.vue'
import NModal, { NModalProps } from '../components/NModal.vue'
import { generatePseudoRandomKey } from '../helpers/tools'

// Options for the modal function
export type NModalOptions = Omit<NModalProps, 'tag' | 'content'> & {
    content?: string | VNode | VNode[]
}
export type NModalLoadingOptions = NModalOptions & {
    titleClass?: string | string[] | object
    loadingClass?: string | string[] | object
}

export function useModal() {
    const internalInstance = getCurrentInstance()
    if (!internalInstance) {
        throw new Error('useModal must be called within setup() or a lifecycle hook.')
    }
    const appContext = internalInstance.appContext

    async function create(options: NModalOptions) {
        const container = document.createElement('div')
        container.id = `modal-app-${generatePseudoRandomKey()}`
        document.body.appendChild(container)

        options = options ?? {}

        const modalProps = {
            ...options
        }
        const eventCallbacks = new Map<string, ((...params: any[]) => void)[]>()

        // Helper to destroy the component
        async function hide() {
            const componentInstance = vnode.component
            componentInstance?.exposed?.hide()
            await nextTick()
            executeCallbacks('hide')
            destroy()
        }
        async function destroy() {
            render(null, container) // Unmount VNode
            container.remove()
        }

        const vnode = createVNode(
            NModal,
            {
                ...modalProps
            },
            {
                default: () => options.content || ''
            }
        )

        if (appContext) {
            vnode.appContext = appContext
        }
        render(vnode, container)
        await nextTick()

        function addCallbackToEvent(eventName: string, callback: (...params: any[]) => void) {
            const callbacks = eventCallbacks.get(eventName) || []
            callbacks.push(callback)
            eventCallbacks.set(eventName, callbacks)
        }
        function executeCallbacks(eventName: string, ...params: any[]) {
            const callbacks = eventCallbacks.get(eventName) || []
            for (const callback of callbacks) {
                callback(params)
            }
        }

        function onHide(callback: (...params: any[]) => void) {
            addCallbackToEvent('hide', callback)
        }

        function onShow(callback: (...params: any[]) => void) {
            addCallbackToEvent('show', callback)
        }

        async function show() {
            const componentInstance = vnode.component
            componentInstance?.exposed?.show()
            await nextTick()
            executeCallbacks('show')

            return {
                hide,
                onHide
            }
        }

        return {
            show,
            onShow
        }
    }
    const modal = async (options: NModalOptions) => {
        const modalInstance = await create(options)
        return await modalInstance.show()
    }

    const loading = async (type: string, message: string, options?: NModalLoadingOptions) => {
        const modalOptions: NModalOptions = {
            ...options,
            class: 'flex flex-col items-center gap-4 text-text-invert',
            persist: true,
            content: [
                h('div', { class: options?.titleClass }, message),
                h(NLoading, { type, class: options?.loadingClass })
            ] as VNode[]
        }
        return await modal(modalOptions)
    }

    return {
        create,
        loading
    }
}
