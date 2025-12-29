<template>
    <component
        :is="props.tag"
        :class="compClasses"
        :to="props.to"
        :href="props.href"
        :target="props.target"
        :role="itemRole"
        :tabindex="tabIndex"
        :aria-disabled="props.disabled ? 'true' : undefined"
        :aria-expanded="props.expandable ? model : undefined"
        v-bind="compBind"
        @click="handleClick"
        @keydown.enter.space.prevent="handleClick"
    >
        <div v-if="props.expandable" class="n-list-item-header" @click.stop="handleExpandableHeaderClick">
            <slot name="prepend" />
            <n-icon
                v-if="props.prependIcon || props.icon"
                :name="(props.prependIcon || props.icon)!"
                :class="resolvedIconClasses"
                aria-hidden="true"
            />

            <render-nodes :nodes="slotDefaultNodes" />

            <n-icon
                v-if="props.appendIcon"
                :name="props.appendIcon"
                :class="props.appendIconClass"
                aria-hidden="true"
            />
            <slot name="append" />
        </div>

        <template v-else>
            <slot name="prepend" />
            <n-icon
                v-if="props.prependIcon || props.icon"
                :name="(props.prependIcon || props.icon)!"
                :class="resolvedIconClasses"
                aria-hidden="true"
            />

            <render-nodes :nodes="slotDefaultNodes" />

            <n-icon
                v-if="props.appendIcon"
                :name="props.appendIcon"
                :class="props.appendIconClass"
                aria-hidden="true"
            />
            <slot name="append" />
        </template>

        <div
            v-if="props.expandable"
            :class="['n-list-item-content', model ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0']"
        >
            <div class="overflow-hidden">
                <div class="px-4 pb-2">
                    <render-nodes :nodes="slotContentNodes" />
                </div>
            </div>
        </div>
    </component>
</template>

<script setup lang="ts">
    import { computed, getCurrentInstance, type HTMLAttributes, useAttrs, useSlots, type VNode } from 'vue'
    import { resolveClassProp, wrapTextNode } from '../helpers/dom'
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
        heading?: boolean
        contentField?: string
    }

    defineOptions({ inheritAttrs: false })

    const instance = getCurrentInstance()
    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NListItemProps>(), {
        tag: 'li',
        contentField: 'content'
    })

    const model = defineModel<boolean>({ default: false })
    const emits = defineEmits<{
        // eslint-disable-next-line no-unused-vars
        (e: 'click', event: MouseEvent | KeyboardEvent): void
    }>()

    const isClickable = computed(() => !props.heading && (props.to || props.href || instance?.vnode.props?.onClick))
    const itemRole = computed(() => {
        if (props.heading) return 'presentation'
        if (props.to || props.href) return 'link'
        if (isClickable.value) return 'button'
        return 'listitem'
    })
    const tabIndex = computed(() => (isClickable.value || props.expandable ? 0 : undefined))

    const compClasses = computed(() => [
        'n-list-item',
        isClickable.value && !props.expandable ? 'n-list-item--clickable' : '',
        props.disabled ? 'n-list-item--disabled' : '',
        props.expandable ? 'n-list-item--expandable' : '',
        props.heading ? 'n-list-item--heading' : ''
    ])

    const compBind = computed(() => ({
        ...(isClickable.value && !props.expandable ? { to: props.to, href: props.href, target: props.target } : {}),
        ...attrs
    }))

    const resolvedIconClasses = computed(() => resolveClassProp(props.iconClass, props.prependIconClass))

    const slotDefaultNodes = computed<VNode[]>(() => {
        const defaultSlot = slots.default?.()
        if (defaultSlot && defaultSlot.length > 0) return wrapTextNode(defaultSlot, 'span')
        if (props.contentField && attrs[props.contentField])
            return wrapTextNode(attrs[props.contentField] as string, 'span')
        return []
    })

    const slotContentNodes = computed<VNode[]>(() => {
        const contentSlot = slots.content?.()
        if (contentSlot && contentSlot.length > 0) return wrapTextNode(contentSlot, 'span')
        return []
    })

    const RenderNodes = (props: { nodes: VNode[] }) => props.nodes

    function handleClick(e: MouseEvent | KeyboardEvent) {
        if (props.disabled || props.heading) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        if (isClickable.value) emits('click', e)
    }

    function handleExpandableHeaderClick() {
        model.value = !model.value
    }

    const expand = () => {
        model.value = true
    }
    const collapse = () => {
        model.value = false
    }
    defineExpose({ expand, collapse })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-list-item {
            /* Base */
            @apply relative appearance-none
                flex items-baseline gap-2 flex-wrap
                px-4 py-2
                transition-all duration-200 ease-in-out;

            /* Interaction States */
            &.n-list-item--clickable {
                @apply cursor-pointer hover:backdrop-brightness-95;
            }

            /* Disabled State */
            &.n-list-item--disabled {
                @apply opacity-50 cursor-not-allowed grayscale;
                @apply hover:backdrop-brightness-100;
            }

            /* Active State */
            &.n-list-item--active {
                @apply bg-brand text-text-invert;
            }

            /* Expandable Variant */
            &.n-list-item--expandable {
                @apply gap-0 p-0 flex flex-col items-stretch;

                .n-list-item-header {
                    @apply cursor-pointer flex items-baseline gap-2 flex-wrap px-4 py-2 hover:backdrop-brightness-95 transition-all;
                }

                .n-list-item-content {
                    @apply grid transition-all duration-300 ease-in-out;
                }
            }

            /* Heading Variant */
            &.n-list-item--heading {
                @apply text-xs font-bold uppercase text-text-dark/70 mt-2 mb-1 cursor-default px-4;
            }
        }
    }
</style>
