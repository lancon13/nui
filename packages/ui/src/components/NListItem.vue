<template>
    <component
        :is="props.tag"
        :class="compClasses"
        :to="props.to"
        :href="props.href"
        :target="props.target"
        v-bind="compBind"
        @click="handleClick"
    >
        <div
            v-if="props.expandable"
            class="n-list-item-header n-list-item-header--clickable"
            tabindex="0"
            role="button"
            @click="handleExpandableHeaderClick"
            @keydown.enter.prevent="handleExpandableHeaderClick"
            @keydown.space.prevent="handleExpandableHeaderClick"
        >
            <slot name="prepend"></slot>
            <n-icon
                v-if="props.prependIcon || props.icon"
                :name="(props.prependIcon || props.icon)!"
                :class="[
                    ...(props.iconClass
                        ? ['string', 'object'].includes(typeof props.iconClass)
                            ? [props.iconClass]
                            : (props.iconClass as string[])
                        : []),
                    ...(props.prependIconClass
                        ? ['string', 'object'].includes(typeof props.prependIconClass)
                            ? [props.prependIconClass]
                            : (props.prependIconClass as string[])
                        : [])
                ]"
            />

            <template v-for="(node, index) in slotDefaultNodes" :key="index">
                <component :is="node" />
            </template>

            <n-icon v-if="props.appendIcon" :name="props.appendIcon" :class="props.prependIconClass" />
            <slot name="append"></slot>
        </div>
        <template v-else>
            <slot name="prepend"></slot>
            <n-icon
                v-if="props.prependIcon || props.icon"
                :name="(props.prependIcon || props.icon)!"
                :class="[
                    ...(props.iconClass
                        ? ['string', 'object'].includes(typeof props.iconClass)
                            ? [props.iconClass]
                            : (props.iconClass as string[])
                        : []),
                    ...(props.prependIconClass
                        ? ['string', 'object'].includes(typeof props.prependIconClass)
                            ? [props.prependIconClass]
                            : (props.prependIconClass as string[])
                        : [])
                ]"
            />

            <template v-for="(node, index) in slotDefaultNodes" :key="index">
                <component :is="node" />
            </template>

            <n-icon v-if="props.appendIcon" :name="props.appendIcon" :class="props.prependIconClass" />
            <slot name="append"></slot>
        </template>

        <!-- Expandable content -->
        <div
            v-if="props.expandable"
            :class="['n-list-item-content', model ? 'n-list-item-content--expanded' : 'n-list-item-content--collapsed']"
        >
            <slot name="content"></slot>
        </div>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, getCurrentInstance, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { wrapTextNode } from '../helpers/dom'
    import NIcon from './NIcon.vue'

    export type NListItemProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        to?: string | object
        href?: string
        target?: string
        icon?: string
        iconClass?: string | object | string[]
        prependIcon?: string
        prependIconClass?: string | object | string[]
        appendIcon?: string
        appendIconClass?: string | object | string[]
        disabled?: boolean
        expandable?: boolean
    }

    defineOptions({
        inheritAttrs: false
    })

    const instance = getCurrentInstance()
    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NListItemProps>(), {
        tag: 'li'
    })

    const model = defineModel<boolean>({ default: false })
    const emits = defineEmits<(event: 'click', e: MouseEvent) => void>()

    const isClickable = computed(() => {
        return props.to || props.href || !!instance?.vnode.props?.onClick
    })
    const compClasses = computed(() => {
        return [
            'n-list-item',
            isClickable.value && !props.expandable ? 'n-list-item--clickable' : '',
            props.disabled ? 'n-list-item--disabled' : '',
            props.expandable ? 'n-list-item--expandable' : ''
        ]
    })
    const compBind = computed(() => {
        return {
            ...(isClickable.value && !props.expandable
                ? { tabindex: 0, role: 'button', to: props.to, href: props.href, target: props.target }
                : {}),
            ...attrs
        }
    })
    const slotDefaultNodes = computed(() => {
        return wrapTextNode(slots.default?.() ?? [], 'span')
    })

    function handleClick(e: MouseEvent) {
        if (props.disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        emits('click', e)
    }
    function handleExpandableHeaderClick() {
        if (model.value) {
            collapse()
        } else {
            expand()
        }
    }

    function expand() {
        model.value = true
    }
    function collapse() {
        model.value = false
    }

    defineExpose({ expand, collapse })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-list-item {
            @apply relative appearance-none
                flex items-baseline gap-2 flex-wrap
                px-4 py-2;
            @apply disabled:opacity-80 disabled:hover:opacity-80 disabled:cursor-not-allowed;

            &.n-list-item--clickable,
            & > .n-list-item-header--clickable {
                @apply transition-[backdrop-filter] duration-200 ease-in-out;
                @apply hover:backdrop-brightness-85 hover:opacity-100;

                &.n-list-item--disabled,
                [class*='--clickable']&.n-list-item--disabled,
                a[href]&.n-list-item--disabled {
                    @apply backdrop-brightness-100;
                    @apply ring-0;
                    @apply opacity-50 hover:opacity-50 cursor-not-allowed grayscale;
                }
            }
            &.n-list-item--expandable {
                @apply gap-0 p-0
                    flex flex-col items-stretch;
                .n-list-item-header {
                    @apply appearance-none
                        flex items-baseline gap-2 flex-wrap
                        px-4 py-2;
                }
                .n-list-item-content {
                    @apply relative appearance-none
                        whitespace-normal
                        px-4 pb-2 
                        h-[calc-size(auto,size)] max-h-[9999px]
                        overflow-auto;
                    @apply transition-[padding,height,max-height] duration-200 ease-in-out;
                    &.n-list-item-content--collapsed {
                        @apply py-0 h-0 max-h-0 overflow-hidden;
                    }
                }
            }
        }
    }
</style>
