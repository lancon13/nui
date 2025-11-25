<template>
    <div ref="placeholderRef">Modal</div>
</template>

<script setup lang="ts">
    import { computed, useAttrs, useSlots } from 'vue'
    import { wrapTextNode } from '../helpers/dom'
    import NIcon from './NIcon.vue'

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(
        defineProps<{
            tag?: string
        }>(),
        {
            tag: 'dialog'
        }
    )

    const compClasses = computed(() => {
        return ['n-modal']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })
</script>

<style lang="css"></style>
