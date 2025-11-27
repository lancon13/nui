import { MaybeRefOrGetter, nextTick, ref, toValue, watch } from 'vue'
import { toClassName } from '../helpers/tools'

export function useTeleportContainer(
    targetElementId: MaybeRefOrGetter<string>,
    elementClass: MaybeRefOrGetter<string | string[] | object> = ''
) {
    const isReady = ref(false)

    watch<[string, string | string[] | object], true>(
        () => [toValue(targetElementId), toValue(elementClass)],
        async (newValue, oldValue) => {
            isReady.value = false
            if (Array.isArray(oldValue)) {
                const container = document.getElementById(oldValue[0])
                if (container && container.childElementCount === 0) document.body.removeChild(container)
            }
            await nextTick()
            if (!document.getElementById(newValue[0])) {
                const container = document.createElement('div')
                container.id = newValue[0]
                if (newValue[1]) container.className = toClassName(newValue[1])
                document.body.appendChild(container)
            }
            isReady.value = true
        },
        { immediate: true }
    )

    return { isReady }
}
