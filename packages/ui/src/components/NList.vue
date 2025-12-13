<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <template v-for="(node, index) in slotDefaultNodes" :key="(node as VNode)?.key || index">
            <component :is="node" />
        </template>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    import { computed, Fragment, h, HTMLAttributes, useAttrs, useSlots, VNode } from 'vue'
    import { useMenuTransform } from '../composables/use-menu-transform'
    import NListItem, { NListItemProps } from './NListItem.vue'
    import { generatePseudoRandomKey } from '../helpers/tools'

    export type NListItemData = Record<string, any> & Partial<NListItemProps>
    export type NListProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        items?: NListItemData[]
        valueField?: string
    }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NListProps>(), {
        tag: 'ul',
        valueField: 'value'
    })

    const { transformedNodes } = useMenuTransform(slots)
    const compClasses = computed(() => {
        return ['n-list']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })

    const slotDefaultNodes = computed(() => {
        return props.items ? createNodesFromData(props.items) : transformedNodes.value
    })

    function createNodesFromData(items: NListItemData[]): VNode[] {
        if (items.length === 0)
            return [
                slots['empty']
                    ? h(Fragment, null, slots['empty']({ items }) ?? [])
                    : h(NListItem, { items }, () => slots['empty-content']?.() ?? 'No item found.')
            ]

        return items.map(item => {
            const { content, ...rest } = item
            const key = item?.[props.valueField] || generatePseudoRandomKey()
            return slots['item']
                ? h(Fragment, { key }, slots['item'](item) ?? [])
                : h(NListItem, { key, ...(rest as any) }, () => slots['item-content']?.(item) ?? content)
        })
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-list {
            @apply relative appearance-none
                rounded-element
                text-nowrap
                flex flex-col flex-nowrap;
        }
    }
</style>
