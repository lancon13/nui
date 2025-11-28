/* eslint-disable no-unused-vars */
import { createVNode, getCurrentInstance, h, nextTick, render } from 'vue'
import NBanner, { NBannerProps } from '../components/NBanner.vue'
import { NButtonProps } from '../components/NButton.vue'
import NToast, { NToastProps } from '../components/NToast.vue'
import { generatePseudoRandomKey } from '../helpers/tools'

// Options for the notify function
type NNotifyAction = Omit<NButtonProps, 'onClick'> & { onClick?: (params: { hide: () => Promise<void> }) => void }
type NNotifyOptions = Omit<NToastProps, 'tag' | 'onClick'> &
    Omit<NBannerProps, 'tag' | 'onClick' | 'actions'> & {
        toastTag?: NToastProps['tag']
        bannerTag?: NBannerProps['tag']
        showImmediate?: boolean
        hideOnDismiss?: boolean

        actions?: NNotifyAction[]

        onTimerBegin?: () => void
        onTimerEnd?: () => void
        onTimerPause?: () => void
        onTimerResume?: () => void
    }

export function useNotify() {
    const internalInstance = getCurrentInstance()
    if (!internalInstance) {
        throw new Error('useNotify must be called within setup() or a lifecycle hook.')
    }
    const appContext = internalInstance.appContext

    async function create(options: NNotifyOptions) {
        const container = document.createElement('div')
        container.id = `toast-app-${generatePseudoRandomKey()}`
        document.body.appendChild(container)

        options = options ?? {}
        options.showImmediate ??= false
        options.hideOnDismiss ??= true

        const toastProps = {
            tag: options['toastTag'],
            overlay: options['overlay'],
            noOverlayHide: options['noOverlayHide'],
            noEscHide: options['noEscHide'],
            position: options['position']
        }
        const bannerProps = {
            tag: options['bannerTag'],
            icon: options['icon'],
            iconClass: options['iconClass'],
            labelClass: options['labelClass'],
            actionsClass: options['actionsClass'],
            inlineActions: options['inlineActions'],
            duration: options['duration'],
            showProgress: options['showProgress'],
            actions: options['actions']
        }
        const eventCallbacks = new Map<string, (() => void)[]>()

        if (Array.isArray(bannerProps.actions)) {
            bannerProps.actions = bannerProps.actions.map(action => {
                const userProvidedOnClick = action.onClick as unknown as (params: { hide: () => Promise<void> }) => void
                const buttonOnClick = () => {
                    if (typeof userProvidedOnClick === 'function') {
                        userProvidedOnClick({ hide })
                    } else {
                        // Default actions if no userProvidedOnClick is supplied
                        if (action.label?.toLocaleLowerCase() === 'ok') {
                            executeCallbacks('ok')
                        } else if (action.label?.toLocaleLowerCase() === 'cancel') {
                            executeCallbacks('cancel')
                        }
                        executeCallbacks('dismiss')
                        if (options.hideOnDismiss) hide()
                    }
                }
                // Return a new action object with the NButtonProps compatible onClick
                return { ...action, onClick: buttonOnClick }
            })
        }

        const vnode = createVNode(NToast, toastProps, {
            default: () =>
                h(
                    NBanner,
                    {
                        ...bannerProps,
                        ...{
                            onTimerEnd: () => {
                                ;(options.onTimerEnd ?? hide)()
                            },
                            onTimerBegin: options.onTimerBegin,
                            onTimerPause: options.onTimerPause,
                            onTimerResume: options.onTimerResume
                        }
                    } as unknown as NBannerProps,
                    () => options.content || ''
                )
        })
        if (appContext) {
            vnode.appContext = appContext
        }
        render(vnode, container)
        await nextTick()

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

        function addCallbackToEvent(eventName: string, callback: () => void) {
            const callbacks = eventCallbacks.get(eventName) || []
            callbacks.push(callback)
            eventCallbacks.set(eventName, callbacks)
        }
        function executeCallbacks(eventName: string) {
            const callbacks = eventCallbacks.get(eventName) || []
            for (const callback of callbacks) {
                callback()
            }
        }

        function onHide(callback: () => void) {
            addCallbackToEvent('hide', callback)
        }
        function onDismiss(callback: () => void) {
            addCallbackToEvent('dismiss', callback)
        }
        function onCancel(callback: () => void) {
            addCallbackToEvent('cancel', callback)
        }
        function onOk(callback: () => void) {
            addCallbackToEvent('ok', callback)
        }
        function onShow(callback: () => void) {
            addCallbackToEvent('show', callback)
        }

        async function show() {
            const componentInstance = vnode.component
            componentInstance?.exposed?.show()
            await nextTick()
            executeCallbacks('show')

            return {
                hide,
                onHide,
                onDismiss,
                onCancel,
                onOk
            }
        }

        if (options.showImmediate) {
            await nextTick()
            show()
        }

        return {
            show,
            onShow
        }
    }

    const notify = async (options: NNotifyOptions) => {
        console.warn('alert is not implemented yet', options)
        return Promise.resolve({ hide: () => {} })
    }

    const alert = async (options: NNotifyOptions) => {
        console.warn('alert is not implemented yet', options)
        return Promise.resolve({ hide: () => {} })
    }

    const confirm = async (options: NNotifyOptions) => {
        console.warn('confirm is not implemented yet', options)
        return Promise.resolve({ hide: () => {} })
    }

    const prompt = async (options: NNotifyOptions) => {
        console.warn('prompt is not implemented yet', options)
        return Promise.resolve({ hide: () => {} })
    }
    return {
        create,

        notify,
        alert,
        confirm,
        prompt
    }
}
