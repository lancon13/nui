<template>
    <n-icon v-bind="compBind" />
</template>

<script setup lang="ts">
    import { computed, HTMLAttributes } from 'vue'
    import NIcon from './NIcon.vue'

    export type NLoadingProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        type?: string
        name?: string
        class?: string | string[] | object
    }

    const props = withDefaults(defineProps<NLoadingProps>(), {
        type: 'normal',
        class: 'text-3xl'
    })

    const compBind = computed(() => {
        let name = ''
        let iconClass = ''
        let animation = ''
        switch (props.type) {
            case 'normal':
                name = 'loading'
                animation = 'animate-spin'
                iconClass = ''
                break
        }

        return {
            name: props.name || name,
            class: [animation, iconClass, props.class]
        }
    })
</script>
