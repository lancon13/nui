import { inject, type App, type InjectionKey } from 'vue'

export const systemProviderKey = Symbol('system-provider') as InjectionKey<App>

export function getSystemProvider() {
    return inject<App>(systemProviderKey) as App
}