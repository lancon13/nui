<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <template v-for="(node, index) in slotDefaultNodes" :key="index">
            <component :is="node" />
        </template>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    import { computed, Fragment, h, HTMLAttributes, useAttrs, useSlots, VNode } from 'vue'
    import { wrapTextNode } from '../helpers/dom'
    import NListItem, { NListItemProps } from './NListItem.vue'

    export type NListItemData = Record<string, any> & Partial<NListItemProps>
    export type NListProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        items?: NListItemData[]
    }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NListProps>(), {
        tag: 'ul'
    })

    const compClasses = computed(() => {
        return ['n-list']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })

    const slotDefaultNodes = computed(() => {
        return props.items && props.items.length
            ? createNodesFromData(props.items)
            : wrapTextNode(slots.default?.() ?? [], 'span')
    })

    function createNodesFromData(items: NListItemData[]): VNode[] {
        return items.map(item => {
            const { content, ...rest } = item
            return slots['item']
                ? h(Fragment, null, slots['item']?.(item) ?? [])
                : h(
                      NListItem,
                      { ...(rest as any) },
                      () => slots['item-content']?.(item) ?? [wrapTextNode(content, 'span')]
                  )
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
