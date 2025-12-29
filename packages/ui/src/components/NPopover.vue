<template>
    <template v-if="props.stacked">
        <transition name="n-popover">
            <component
                :is="props.tag"
                v-if="model"
                ref="contentRef"
                :class="compClasses"
                :role="props.role"
                v-bind="compBind"
            >
                <slot name="default">
                    <span v-if="props.content" v-html="props.content" />
                </slot>
            </component>
        </transition>
    </template>

    <teleport v-else-if="isReady" to="#n-popovers-container">
        <transition :name="props.overlay ? 'n-popover-overlay' : 'n-popover'">
            <div v-if="model && props.overlay" class="n-popover-overlay" aria-hidden="true">
                <component :is="props.tag" ref="contentRef" :class="compClasses" :role="props.role" v-bind="compBind">
                    <slot name="default">
                        <span v-if="props.content" v-html="props.content" />
                    </slot>
                </component>
            </div>
            <component
                :is="props.tag"
                v-else-if="model"
                ref="contentRef"
                :class="compClasses"
                :role="props.role"
                v-bind="compBind"
            >
                <slot name="default">
                    <span v-if="props.content" v-html="props.content" />
                </slot>
            </component>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import type { Placement } from '@floating-ui/vue'
    import { computed, type HTMLAttributes, onMounted, ref, useAttrs, useTemplateRef } from 'vue'
    import { useFloating } from '../composables/use-floating'
    import { useTeleportContainer } from '../composables/use-teleport-container'
    import { getElement, getParentElement } from '../helpers/dom'

    export type NPopoverDirection = 'top' | 'bottom' | 'left' | 'right'
    export type NPopoverPosition = 'start' | '' | 'end'
    export type NPopoverProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        content?: string
        showDelay?: number
        hideDelay?: number
        persistent?: boolean
        hoverTriggerAnchor?: HTMLElement | string | null
        focusTriggerAnchor?: HTMLElement | string | null
        clickTriggerAnchor?: HTMLElement | string | null
        attachParent?: HTMLElement | string | null
        triggerByHover?: boolean
        triggerByFocus?: boolean
        triggerByInteraction?: boolean
        allowClickToHide?: boolean
        direction?: NPopoverDirection
        position?: NPopoverPosition
        margin?: number
        offset?: [number, number]
        autoReposition?: boolean
        stacked?: boolean
        overlay?: boolean
        fit?: boolean
        role?: string
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NPopoverProps>(), {
        tag: 'span',
        content: '',
        showDelay: 75,
        hideDelay: 250,
        persistent: false,
        triggerByHover: true,
        triggerByFocus: true,
        triggerByInteraction: true,
        allowClickToHide: false,
        direction: 'bottom',
        position: '',
        margin: 4,
        offset: () => [0, 0],
        autoReposition: true,
        stacked: false,
        overlay: false,
        fit: false,
        role: 'presentation'
    })

    const model = defineModel<boolean>({ default: false })
    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')
    const { isReady } = useTeleportContainer('n-popovers-container')

    const parentEl = ref<HTMLElement | null>(null)
    const attachParentEl = computed(() => (props.attachParent ? getElement(props.attachParent) : parentEl.value))

    const floatingPlacement = computed(() => {
        return `${props.direction}${props.position !== '' ? `-${props.position}` : ''}` as Placement
    })

    const floatingProps = computed(() => ({
        ...props,
        hoverTriggerAnchor: props.triggerByHover ? props.hoverTriggerAnchor : null,
        focusTriggerAnchor: props.triggerByFocus ? props.focusTriggerAnchor : null,
        clickTriggerAnchor: props.triggerByInteraction ? props.clickTriggerAnchor : null
    }))

    const {
        show,
        hide,
        handleContentHoverFocusIn,
        handleContentHoverFocusOut,
        compStyles: floatingStyles,
        placement,
        parentWidth
    } = useFloating(floatingProps, {
        model: computed({
            get: () => model.value,
            set: val => {
                model.value = val
            }
        }),
        contentRef,
        attachParentEl,
        placement: floatingPlacement
    })

    const compStyles = computed(() => {
        const styles: Record<string, any> = { ...floatingStyles.value }
        if (props.fit) {
            styles.width = `${parentWidth.value}px`
        }
        return styles
    })

    const compClasses = computed(() => ['n-popover', `n-popover--direction-${placement.value}`])

    const compBind = computed(() => {
        const {
            tag,
            content,
            showDelay,
            hideDelay,
            persistent,
            hoverTriggerAnchor,
            focusTriggerAnchor,
            clickTriggerAnchor,
            attachParent,
            triggerByHover,
            triggerByFocus,
            triggerByInteraction,
            direction,
            position,
            margin,
            offset,
            autoReposition,
            stacked,
            overlay,
            fit,
            role,
            ...rest
        } = props

        return {
            style: compStyles.value,
            onMouseenter: handleContentHoverFocusIn,
            onMouseleave: handleContentHoverFocusOut,
            onFocusin: handleContentHoverFocusIn,
            onFocusout: handleContentHoverFocusOut,
            ...(rest as any),
            ...attrs
        }
    })

    onMounted(() => {
        parentEl.value = getParentElement()
    })

    defineExpose({ show, hide, contentRef })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-popover-overlay {
            @apply bg-background-invert/50 fixed inset-0 grid place-content-center z-2000;

            &.n-popover-overlay-enter-active,
            &.n-popover-overlay-leave-active {
                @apply transition-opacity duration-200 ease-in-out;
            }
            &.n-popover-overlay-leave-active {
                @apply delay-200;
                .n-popover {
                    @apply delay-0;
                }
            }
            &.n-popover-overlay-enter-from,
            &.n-popover-overlay-leave-to {
                @apply opacity-0;
                .n-popover {
                    @apply opacity-0;
                    &.n-popover--direction-top {
                        @apply translate-y-2;
                    }
                    &.n-popover--direction-bottom {
                        @apply -translate-y-2;
                    }
                    &.n-popover--direction-left {
                        @apply translate-x-2;
                    }
                    &.n-popover--direction-right {
                        @apply -translate-x-2;
                    }
                }
            }

            .n-popover {
                @apply transition-[opacity,translate] delay-200 duration-200 ease-in-out;
                @apply translate-x-0 translate-y-0;
            }
        }

        .n-popover {
            @apply z-2000;

            &.n-popover-enter-active,
            &.n-popover-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
                @apply translate-x-0 translate-y-0;
            }

            &.n-popover-enter-from,
            &.n-popover-leave-to {
                @apply opacity-0;
                &.n-popover--direction-top {
                    @apply translate-y-2;
                }
                &.n-popover--direction-bottom {
                    @apply -translate-y-2;
                }
                &.n-popover--direction-left {
                    @apply translate-x-2;
                }
                &.n-popover--direction-right {
                    @apply -translate-x-2;
                }
            }
        }
    }
</style>
