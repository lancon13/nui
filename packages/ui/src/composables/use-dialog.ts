/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
import { createVNode, getCurrentInstance, h, nextTick, render, VNode } from 'vue'
import NButton, { NButtonProps } from '../components/NButton.vue'
import NCard, { NCardProps } from '../components/NCard.vue'
import NModal, { NModalProps } from '../components/NModal.vue'
import { generatePseudoRandomKey } from '../helpers/tools'

// Options for the dialog function
type NDialogAction = Omit<NButtonProps, 'onClick'> & {
    onClick?: (params: { hide: () => Promise<void>; executeCallbacks(eventName: string): void }) => void
}
export type NDialogOptions = Omit<NModalProps, 'tag' | 'content'> &
    Omit<NCardProps, 'tag' | 'clickable' | 'to' | 'href' | 'target'> & {
        modalTag?: NModalProps['tag']
        cardTag?: NCardProps['tag']
        cardClass?: string | string[] | object
        title?: string
        content?: string | VNode
        hideOnAction?: boolean
        loadingType?: string
        loadingClass?: string | string[] | object
        actions?: NDialogAction[]
        closeButton?: boolean
    }

export function useDialog() {
    const internalInstance = getCurrentInstance()
    if (!internalInstance) {
        throw new Error('useDialog must be called within setup() or a lifecycle hook.')
    }
    const appContext = internalInstance.appContext

    async function create(dialogOptions: NDialogOptions = {}) {
        const container = document.createElement('div')
        container.id = `dialog-app-${generatePseudoRandomKey()}`
        document.body.appendChild(container)

        const options = dialogOptions ?? {}
        options.hideOnAction ??= true

        const modalProps = {
            tag: options['modalTag'],
            overlay: options['overlay'],
            noOverlayHide: options['noOverlayHide'],
            noEscHide: options['noEscHide'],
            focusOnShow: options['focusOnShow']
        }
        const cardProps = {
            tag: options['cardTag'],
            class: options['cardClass'],
            loading: options['loading'],
            loadingType: options['loadingType'],
            loadingClass: options['loadingClass']
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

        let cardActions: VNode[] = []
        if (Array.isArray(options.actions)) {
            cardActions = options.actions.map(action => {
                const userProvidedOnClick = action.onClick
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
                return h(NButton, { ...action, onClick: buttonOnClick })
            })
        }

        const vnode = createVNode(
            NModal,
            {
                ...modalProps
            },
            {
                default: () =>
                    h(
                        NCard,
                        {
                            ...cardProps
                        },
                        {
                            default: () =>
                                [
                                    options.title
                                        ? h('div', { class: 'n-card-header' }, [
                                              h('h1', { class: 'title-text text-xl' }, options.title),
                                              options.closeButton
                                                  ? h(NButton, {
                                                        icon: 'close',
                                                        class: 'icon pilled text-xs',
                                                        onClick: () => hide()
                                                    })
                                                  : null
                                          ])
                                        : null,
                                    h('div', { class: 'n-card-body' }, options.content || ''),
                                    cardActions.length > 0
                                        ? h('div', { class: 'n-card-footer justify-end gap-2' }, cardActions)
                                        : null
                                ].filter(Boolean) as VNode[]
                        }
                    )
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

    const dialog = async (options: NDialogOptions) => {
        const dialogInstance = await create(options)
        return await dialogInstance.show()
    }

    const alert = async (title: string, message: string, options?: Omit<NDialogOptions, 'title' | 'content'>) => {
        const dialogShown = await dialog({
            title,
            content: message,
            actions: [
                {
                    label: 'OK',
                    onClick: ({ hide }) => {
                        hide()
                    }
                }
            ],
            cardClass: 'shadowed',
            noOverlayHide: true,
            ...(options || {})
        })
        return new Promise<void>(resolve => {
            dialogShown.onHide(resolve)
        })
    }

    const confirm = async (title: string, message: string, options?: Omit<NDialogOptions, 'title' | 'content'>) => {
        const dialogShown = await dialog({
            ...(options || {}),
            title,
            content: message,
            actions: [
                {
                    label: 'Cancel',
                    class: 'flat',
                    onClick: ({ hide, executeCallbacks }) => {
                        executeCallbacks('cancel')
                        hide()
                    }
                },
                {
                    label: 'OK',
                    onClick: ({ hide, executeCallbacks }) => {
                        executeCallbacks('ok')
                        hide()
                    }
                }
            ],
            hideOnAction: false,
            noOverlayHide: true,
            noEscHide: true
        })
        return new Promise<'ok' | 'cancel' | null>(resolve => {
            let result: 'ok' | 'cancel' | null = null
            dialogShown.onOk(() => (result = 'ok'))
            dialogShown.onCancel(() => (result = 'cancel'))
            dialogShown.onHide(() => resolve(result))
        })
    }

    const prompt = (
        title: string,
        message: string,
        defaultValue = ''
        // options?: Omit<NDialogOptions, 'title' | 'content' | 'actions'>
    ) => {
        return new Promise<string | null>(async resolve => {
            // A real implementation would show a dialog with an input field.
            // For now, we simulate user input using window.prompt.
            const input = window.prompt(`${title}\n${message}`, defaultValue)
            resolve(input)
        })
    }

    return {
        create,
        dialog,

        alert,
        confirm,
        prompt
    }
}
