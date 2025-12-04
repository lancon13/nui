<template>
    <n-popover v-bind="$props" class="n-menu">
        <ul :class="['n-list', props.listClass]">
            <template v-for="(node, index) in wrappedSlotDefaultNodes" :key="index">
                <component :is="node" />
            </template>
        </ul>
    </n-popover>
</template>

<script setup lang="ts">
    import { computed, h, HTMLAttributes, useSlots, VNode } from 'vue'
    import NIcon from './NIcon.vue'
    import NListItem from './NListItem.vue'
    import NMenu from './NMenu.vue'
    import NPopover, { NPopoverProps } from './NPopover.vue'

    defineOptions({
        inheritAttrs: false
    })

    export type NMenuDirection = 'top' | 'bottom' | 'left' | 'right'
    export type NMenuPosition = 'start' | '' | 'end'
    export type NMenuProps = Partial</* @vue-ignore */ HTMLAttributes> &
        NPopoverProps & {
            listClass?: string | string[] | object
        }

    const slots = useSlots()
    const props = withDefaults(defineProps<NMenuProps>(), {
        tag: 'div',
        listClass: 'bg-surface shadowed'
    })

    const wrappedSlotDefaultNodes = computed(() => {
        const defaultNodes = slots.default?.() ?? []
        return defaultNodes.map(node => {
            if (node.type === NListItem) {
                return node
            }

            if (node.type === 'li') {
                const children: VNode[] = [node.children ?? []].flat() as VNode[]
                const subMenuNode = children.find(c => c?.type === 'ul') || null
                const liContent = children.filter(c => c?.type !== 'ul')

                if (subMenuNode) {
                    return h(
                        NListItem,
                        { ...node.props },
                        {
                            default: () => [
                                liContent,
                                h(
                                    NMenu,
                                    {
                                        ...props,
                                        direction: 'right',
                                        position: 'start',
                                        listClass: props.listClass,
                                        stacked: true
                                    },
                                    { default: () => (subMenuNode as VNode).children }
                                ),
                                h(NIcon, { name: 'i-heroicons-chevron-right-20-solid', class: 'ml-auto' })
                            ]
                        }
                    )
                }
            }

            return h(NListItem, { ...node.props }, { default: () => node.children })
        })
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-menu {
            /* TBA */
        }
    }
</style>
