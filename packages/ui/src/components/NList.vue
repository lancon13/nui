<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind" role="list">
        <template v-for="(node, index) in slotDefaultNodes" :key="(node as VNode)?.key || index">
            <component :is="node" />
        </template>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    import { computed, Fragment, h, type HTMLAttributes, useAttrs, useSlots, type VNode } from 'vue'
    import { useMenuTransform } from '../composables/use-menu-transform'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import NList from './NList.vue'
    import NListItem, { type NListItemProps } from './NListItem.vue'

    export type NListItemData = Record<string, any> & Partial<NListItemProps>
    export type NListProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        items?: NListItemData[]
        valueField?: string
        childrenField?: string
        contentField?: string
    }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NListProps>(), {
        tag: 'ul',
        valueField: 'value',
        childrenField: 'children',
        contentField: 'content'
    })

    const { transformedNodes } = useMenuTransform(slots)
    const compClasses = computed(() => ['n-list'])
    const compBind = computed(() => ({ ...attrs }))

    const slotDefaultNodes = computed(() => {
        return props.items ? createNodesFromData(props.items) : transformedNodes.value
    })

    function createNodesFromData(items: NListItemData[]): VNode[] {
        if (items.length === 0) {
            return [
                slots['empty']
                    ? h(Fragment, null, slots['empty']({ items }) ?? [])
                    : h(NListItem, { key: 'empty' }, () => slots['empty-content']?.() ?? 'No item found.')
            ]
        }

        return items.map(item => {
            const content = item[props.contentField]
            const childrenData = item[props.childrenField]
            const rest = { ...item }
            delete rest[props.contentField]
            delete rest[props.childrenField]

            const key = item?.[props.valueField] || generatePseudoRandomKey()

            const childNodes =
                childrenData && Array.isArray(childrenData) && childrenData.length > 0
                    ? h(NList as any, {
                          items: childrenData,
                          tag: props.tag,
                          valueField: props.valueField,
                          childrenField: props.childrenField,
                          contentField: props.contentField,
                          class: 'w-full pl-4'
                      })
                    : null

            if (slots['item']) {
                return h(Fragment, { key }, slots['item']({ ...item, childrenNodes: childNodes }) ?? [])
            }

            const itemProps = { key, ...rest } as any
            const itemSlots: any = {
                default: () => slots['item-content']?.(item) ?? content
            }

            if (childNodes) {
                if (itemProps.expandable) {
                    itemSlots.content = () => childNodes
                } else {
                    const originalDefault = itemSlots.default
                    itemSlots.default = () => [originalDefault(), childNodes]
                }
            }

            return h(NListItem, itemProps, itemSlots)
        })
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-list {
            @apply relative appearance-none
                flex flex-col flex-nowrap;

            .n-list {
                @apply basis-full;
            }
        }
    }
</style>
