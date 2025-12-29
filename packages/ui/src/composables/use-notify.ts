/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { createVNode, getCurrentInstance, h, nextTick, render } from 'vue'
import NBanner, { NBannerProps } from '../components/NBanner.vue'
import { NButtonProps } from '../components/NButton.vue'
import NToast, { NToastProps } from '../components/NToast.vue'
import { generatePseudoRandomKey } from '../helpers/tools'

// Options for the notify function
type NNotifyAction = Omit<NButtonProps, 'onClick'> & {
    onClick?: (params: { hide: () => Promise<void>; executeCallbacks(eventName: string): void }) => void
}
type NNotifyOptions = Omit<NToastProps, 'tag' | 'onClick'> &
    Omit<NBannerProps, 'tag' | 'onClick' | 'actions'> & {
        toastTag?: NToastProps['tag']
        bannerTag?: NBannerProps['tag']
        bannerClass?: string | string[] | object
        hideOnAction?: boolean

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
        options.hideOnAction ??= true

        const toastProps = {
            tag: options['toastTag'],
            overlay: options['overlay'],
            noOverlayHide: options['noOverlayHide'],
            noEscHide: options['noEscHide'],
            position: options['position'],
            focusOnShow: options['focusOnShow'],
            duration: options['duration'],
            role: options['role']
        }
        const bannerProps = {
            tag: options['bannerTag'],
            class: options['bannerClass'],
            icon: options['icon'],
            iconClass: options['iconClass'],
            labelClass: options['labelClass'],
            actionsClass: options['actionsClass'],
            inlineActions: options['inlineActions'],
            duration: options['duration'],
            showProgress: options['showProgress'],
            actions: options['actions']
        }
        const eventCallbacks = new Map<string, ((...params: any[]) => void)[]>()

        async function cleanup() {
            // Wait for animation if needed, or rely on NToast unmount?
            // NToast has transitions. If we destroy container immediately, transition cuts off?
            // createVNode renders NToast. NToast has `v-if="model"`.
            // When we set model=false, NToast transitions out.
            // We should wait for transition to finish before destroying container?
            // But we don't know when it finishes easily here.
            // However, previous code called destroy() immediately after hide().
            // Wait, previous code: hide() -> instance.hide() -> nextTick -> destroy().
            // If instance.hide() triggers transition, destroy() removes it from DOM immediately?
            // If we remove container, transition is gone.

            // To support exit transition, we should probably NOT destroy container until after delay?
            // OR rely on NToast "after-leave" event?
            // NToast uses <transition>. We can listen to `onAfterLeave` on the transition?
            // But NToast wraps content in transition. NToast itself is teleported.

            // For now, I will keep previous behavior (destroy after nextTick),
            // but effectively this might clip transitions if they are longer than one tick.
            // Ideally NToast should emit 'closed' after animation.

            executeCallbacks('hide')
            // Delay destroy slightly or just do it?
            // Since we use teleport, the container in body is just a placeholder anchor?
            // No, NToast teleports to `#n-toasts-container...`.
            // The `container` created here `document.createElement('div')` acts as the app root for `render()`.
            // NToast inside it teleports content OUT.
            // So destroying `container` unmounts `NToast`, which removes teleported content.

            // If we want animation, we must let NToast finish.
            // But `useNotify` is designed for "fire and forget" mostly?
            // Let's stick to simple logic for now: if model becomes false, we consider it done.
            // But to avoid clipping, maybe we setTimeout?

            setTimeout(() => destroy(), 300) // Rough transition time?
        }

        if (Array.isArray(bannerProps.actions)) {
            bannerProps.actions = bannerProps.actions.map(action => {
                const userProvidedOnClick = action.onClick as unknown as (params: {
                    hide: () => Promise<void>
                    executeCallbacks(eventName: string): void
                }) => void
                const buttonOnClick = () => {
                    if (typeof userProvidedOnClick === 'function') {
                        userProvidedOnClick({ hide, executeCallbacks })
                    } else {
                        // Default actions if no userProvidedOnClick is supplied
                        if (action.label?.toLocaleLowerCase() === 'ok') {
                            executeCallbacks('ok')
                        } else if (action.label?.toLocaleLowerCase() === 'cancel') {
                            executeCallbacks('cancel')
                        }
                        executeCallbacks('dismiss')
                        if (options.hideOnAction) hide()
                    }
                }
                // Return a new action object with the NButtonProps compatible onClick
                return { ...action, onClick: buttonOnClick }
            })
        }

        const vnode = createVNode(
            NToast,
            {
                ...toastProps,
                'onUpdate:modelValue': (val: boolean) => {
                    if (!val) {
                        cleanup()
                    }
                }
            },
            {
                default: () =>
                    h(
                        NBanner,
                        {
                            ...bannerProps,
                            ...{
                                onTimerBegin: options.onTimerBegin,
                                onTimerPause: options.onTimerPause,
                                onTimerResume: options.onTimerResume
                            }
                        } as unknown as NBannerProps,
                        () => options.content || ''
                    )
            }
        )
        if (appContext) {
            vnode.appContext = appContext
        }
        render(vnode, container)
        await nextTick()

        async function hide() {
            const componentInstance = vnode.component
            if (componentInstance?.exposed?.hide) {
                componentInstance.exposed.hide()
            }
            // Cleanup is handled by onUpdate:modelValue listener
        }
        async function destroy() {
            render(null, container) // Unmount VNode
            container.remove()
        }

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
        function onDismiss(callback: (...params: any[]) => void) {
            addCallbackToEvent('dismiss', callback)
        }
        function onCancel(callback: (...params: any[]) => void) {
            addCallbackToEvent('cancel', callback)
        }
        function onOk(callback: (...params: any[]) => void) {
            addCallbackToEvent('ok', callback)
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
                onHide,
                onDismiss,
                onCancel,
                onOk
            }
        }

        return {
            show,
            onShow
        }
    }

    const notify = async (message: string, options?: NNotifyOptions) => {
        const notification = await create({
            hideOnAction: true,
            content: message,
            actions: [
                {
                    label: 'OK',
                    class: 'flat'
                }
            ],
            duration: 3000,
            showProgress: true,
            focusOnShow: false,
            ...options
        })

        return notification.show()
    }

    const success = (message: string, options?: NNotifyOptions) => {
        return notify(message, { bannerClass: 'success', ...options })
    }

    const error = (message: string, options?: NNotifyOptions) => {
        return notify(message, { bannerClass: 'error', ...options })
    }

    const warning = (message: string, options?: NNotifyOptions) => {
        return notify(message, { bannerClass: 'warning', ...options })
    }

    const info = (message: string, options?: NNotifyOptions) => {
        return notify(message, { bannerClass: 'info', ...options })
    }

    return {
        create,

        notify,
        success,
        error,
        warning,
        info
    }
}
