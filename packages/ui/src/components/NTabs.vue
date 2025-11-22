<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <template v-for="(node, index) in slotDefaultNodes" :key="index">
            <component
                :is="node"
                :class="[node.props?.name === modelValueName ? 'n-tab--active' : '']"
                @click="() => handleTabNodeClick(node)"
            />
        </template>
    </component>
</template>

<script setup lang="ts">
    import { computed, useAttrs, useSlots, VNode } from 'vue'
    import { isVNodeNameContain } from '../helpers/dom'

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const modelValueName = defineModel<string>()
    const props = withDefaults(
        defineProps<{
            tag?: string
        }>(),
        {
            tag: 'div'
        }
    )

    const compClasses = computed(() => {
        return ['n-tabs']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })

    const slotDefaultNodes = computed(() => {
        const nodes = slots.default?.() ?? []
        if (!nodes || nodes.length === 0) return []

        const nodeList = Array.isArray(nodes) ? nodes : [nodes]
        return nodeList
            .map(node => {
                return isVNodeNameContain(node, 'NTab') ? node : null
            })
            .filter(node => !!node)
    })

    // Event handler
    function handleTabNodeClick(tabNode: VNode) {
        modelValueName.value = tabNode.props?.name ?? ''
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-tabs {
            @apply relative
            flex flex-row items-center;

            &.individual > .n-tab {
                @apply rounded-element;
            }
        }
    }
</style>
