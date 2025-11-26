import { onMounted, ref } from 'vue'

export function useTeleportContainer(targetElementId: string) {
    const isReady = ref(false)

    onMounted(() => {
        let container = document.getElementById(targetElementId)

        if (!container) {
            container = document.createElement('div')
            container.id = targetElementId
            document.body.appendChild(container)
        }

        isReady.value = true
    })

    return { isReady }
}
