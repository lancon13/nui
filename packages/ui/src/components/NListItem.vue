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
        <slot name="prepend"></slot>
        <n-icon
            v-if="props.prependIcon || props.icon"
            :name="(props.prependIcon || props.icon) as string"
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

    const emits = defineEmits<(event: 'click', e: MouseEvent) => void>()

    const isClickable = computed(() => {
        return props.to || props.href || !!instance?.vnode.props?.onClick
    })

    const compClasses = computed(() => {
        return [
            'n-list-item',
            isClickable.value ? 'n-list-item--clickable' : '',
            props.disabled ? 'n-list-item--disabled' : ''
        ]
    })
    const compBind = computed(() => {
        return {
            ...(isClickable.value
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
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-list-item {
            @apply relative appearance-none
                flex items-baseline gap-2
                px-4 py-2;
            @apply disabled:opacity-80 disabled:hover:opacity-80 disabled:cursor-not-allowed;

            &.n-list-item--clickable {
                @apply transition-[backdrop-filter] duration-200 ease-in-out;
                @apply hover:backdrop-brightness-75;

                &.n-list-item--disabled,
                [class*='--clickable']&.n-list-item--disabled,
                a[href]&.n-list-item--disabled {
                    @apply backdrop-brightness-100;
                    @apply ring-0;
                    @apply opacity-50 hover:opacity-50 cursor-not-allowed grayscale;
                }
            }
        }
    }
</style>
