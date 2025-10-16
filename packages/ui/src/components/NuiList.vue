<template>
    <div ref="containerRef" :class="compClasses">
        <ul ref="measurementItemRef" class="nui-list-items nui-list-items--dummy">
            <nui-list-item v-if="props.virtual && props.items.length > 0">
                <slot name="item" :item="props.items[0]" :index="0">
                    {{ props.items[0] }}
                </slot>
            </nui-list-item>
        </ul>

        <slot name="before" />
        <div
            v-if="props.virtual"
            v-bind="containerProps"
            class="nui-list-virtual-scrollable-container"
        >
            <ul class="nui-list-items" v-bind="wrapperProps">
                <nui-list-item v-for="{ data, index } in list" :key="index">
                    <slot name="item" :item="data" :index="index">
                        {{ data }}
                    </slot>
                </nui-list-item>
            </ul>
        </div>

        <slot v-else>
            <ul class="nui-list-items">
                <nui-list-item v-for="(item, index) in items" :key="index">
                    <slot name="item" :item="item" :index="index">
                        {{ item }}
                    </slot>
                </nui-list-item>
            </ul>
        </slot>

        <slot name="after" />
    </div>
</template>

<script setup lang="ts">
    import { useElementBounding, useVirtualList } from '@vueuse/core'
    import { computed, ref, toRef, watch } from 'vue'
    import NuiListItem from './NuiListItem.vue'

    export interface NuiListProps {
        items?: unknown[]
        bordered?: boolean
        shadow?: boolean
        divider?: boolean
        virtual?: boolean
    }

    const props = withDefaults(defineProps<NuiListProps>(), {
        items: () => [],
        bordered: false,
        shadow: false,
        divider: false,
        virtual: false
    })

    const containerRef = ref<HTMLElement | null>(null)
    const measurementItemRef = ref<HTMLElement | null>(null)

    const itemWidth = ref(0)
    const itemHeight = ref(0)
    const { height: measuredItemHeight, width: measuredItemWidth } =
        useElementBounding(measurementItemRef)

    watch([measuredItemWidth, measuredItemHeight], ([newWidth, newHeight]) => {
        if (newWidth > 0 && itemWidth.value === 0) {
            itemWidth.value = newWidth
        }
        if (newHeight > 0 && itemHeight.value === 0) {
            itemHeight.value = newHeight
        }
    })

    const itemsRef = toRef(props, 'items')
    const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(itemsRef, {
        itemWidth: () => itemWidth.value,
        itemHeight: () => itemHeight.value
    })

    defineExpose({
        scrollTo
    })
    const compClasses = computed(() => [
        'nui-list',
        { 'nui-list--bordered': props.bordered },
        { 'nui-list--shadow': props.shadow },
        { 'nui-list--divided': props.divider },
        { 'nui-list--virtual-scrollable': props.virtual }
    ])
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-list {
            @apply bg-[var(--nui-list-background-color)] rounded-[var(--nui-list-radius)] overflow-hidden;

            &.nui-list--shadow {
                @apply shadow-[var(--nui-list-shadow)];
            }
            &.nui-list--bordered {
                @apply border-solid border-[length:var(--nui-list-border-size)] border-[var(--nui-list-border-color)];
            }

            &.nui-list--virtual-scrollable {
                .nui-list-virtual-scrollable-container {
                    @apply max-h-[var(--nui-list-virtual-scroll-max-height)];
                }
            }
            &.nui-list--divided .nui-list-items {
                @apply divide-y divide-[var(--nui-list-border-color)];
            }

            .nui-list-items--dummy {
                @apply absolute top-[-9999px] left-[-9999px] -z-10;
            }
        }
    }
</style>
