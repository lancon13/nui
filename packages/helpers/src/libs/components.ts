/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    type App,
    type AsyncComponentLoader,
    type Component,
    defineAsyncComponent,
    h,
    type Ref,
    render
} from 'vue'

export function listChildComponentMethods<T, K extends keyof T>(
    keys: K[],
    componentRef: Ref<T>
): Record<K, any> {
    return keys.reduce(
        (expose, methodName) => {
            expose[methodName] = (...args: any[]) => {
                const func = componentRef.value?.[methodName]
                if (typeof func === 'function') func.apply(componentRef.value, args)
            }
            return expose
        },
        {} as Record<K, any>
    )
}

export function asyncLoadComponent(
    params:
        | string
        | AsyncComponentLoader<any>
        | {
              component: string | AsyncComponentLoader<any>
              delay?: number
              timeout?: number
              loadingComponent?: Component
              errorComponent?: Component
          }
) {
    const {
        component,
        delay = 200,
        timeout = 3000,
        loadingComponent,
        errorComponent
    } = typeof params === 'string' || typeof params === 'function' ? { component: params } : params

    return defineAsyncComponent({
        loader:
            typeof component === 'string'
                ? () => {
                      /* @vite-ignore */
                      return import(/* @vite-ignore */ component as string)
                  }
                : (component as AsyncComponentLoader<any>),
        delay,
        timeout,
        loadingComponent: loadingComponent as Component,
        errorComponent: errorComponent as Component,
        onError: (error: Error) => {
            // TODO: handle error
            console.error(error)
            throw new Error('Request component not found.')
        }
    })
}

export default function renderComponent({
    app,
    el,
    component,
    props
}: {
    app: App
    el: Element
    component: Component
    props?: Record<string, any>
}) {
    const comp = h(component, props)
    comp.appContext = app._context
    render(comp, el)
    return {
        component: comp,
        unmount: () => {
            if (comp.el?.parentNode) render(null, comp.el.parentNode as Element)
        }
    }
}