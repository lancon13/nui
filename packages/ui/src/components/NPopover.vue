<template>
    <transition v-if="props.stacked" name="n-popover">
        <component
            :is="props.tag"
            v-if="model"
            ref="contentRef"
            role="popover"
            :style="compStyles"
            :class="compClasses"
            v-bind="compBind"
            @mouseenter="handleContentHoverFocusIn"
            @mouseleave="handleContentHoverFocusOut"
            @focusin="handleContentHoverFocusIn"
            @focusout="handleContentHoverFocusOut"
        >
            <slot name="default" v-html="props.content"></slot>
        </component>
    </transition>

    <!-- Overlay -->
    <teleport v-else-if="isReady && props.overlay" to="#n-popovers-container">
        <transition name="n-popover-overlay">
            <div v-if="model" class="n-popover-overlay">
                <component
                    :is="props.tag"
                    ref="contentRef"
                    role="popover"
                    :style="compStyles"
                    :class="compClasses"
                    v-bind="compBind"
                    @mouseenter="handleContentHoverFocusIn"
                    @mouseleave="handleContentHoverFocusOut"
                    @focusin="handleContentHoverFocusIn"
                    @focusout="handleContentHoverFocusOut"
                >
                    <slot name="default" v-html="props.content"></slot>
                </component>
            </div>
        </transition>
    </teleport>

    <!-- Without Overlay -->
    <teleport v-else-if="isReady" to="#n-popovers-container">
        <transition name="n-popover">
            <component
                :is="props.tag"
                v-if="model"
                ref="contentRef"
                role="popover"
                :style="compStyles"
                :class="compClasses"
                v-bind="compBind"
                @mouseenter="handleContentHoverFocusIn"
                @mouseleave="handleContentHoverFocusOut"
                @focusin="handleContentHoverFocusIn"
                @focusout="handleContentHoverFocusOut"
            >
                <slot name="default" v-html="props.content"></slot>
            </component>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
    import type { Placement } from '@floating-ui/vue'
    import { computed, HTMLAttributes, onMounted, ref, useAttrs, useTemplateRef } from 'vue'
    import { useTeleportContainer } from '../composables/use-teleport-container'
    import { getElement, getParentElement } from '../helpers/dom'
    import { useFloating } from '../composables/use-floating'

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
        attachParent?: HTMLElement | string | null
        direction?: NPopoverDirection
        position?: NPopoverPosition
        margin?: number
        offset?: [number, number]
        autoReposition?: boolean
        stacked?: boolean
        overlay?: boolean
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
        direction: 'bottom',
        position: 'start',
        margin: 4,
        offset: () => [0, 0],
        autoReposition: true,
        stacked: false,
        overlay: false
    })

    const model = defineModel<boolean>({ default: false })
    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')
    const { isReady } = useTeleportContainer('n-popovers-container')

    const parentEl = ref<HTMLElement | null>(null)
    const attachParentEl = computed<HTMLElement | null>(() =>
        props.attachParent ? getElement(props.attachParent) : parentEl.value
    )

    const floatingPlacement = computed<Placement>(() => {
        const placement = `${props.direction}${props.position !== '' ? `-${props.position}` : ''}` as Placement
        return placement
    })

    const { show, hide, handleContentHoverFocusIn, handleContentHoverFocusOut, compStyles, placement } = useFloating(
        props,
        {
            model: computed<boolean>({
                get: () => model.value,
                set: (val: boolean) => {
                    model.value = val
                }
            }), // Pass the writable computed ref
            contentRef,
            attachParentEl,
            placement: floatingPlacement
        }
    )

    const compClasses = computed(() => {
        return ['n-popover', `n-popover--direction-${placement.value}`]
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })

    // Lifecycle hooks
    onMounted(() => {
        parentEl.value = getParentElement()
    })

    defineExpose({ show, hide })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-popover-overlay {
            @apply bg-bg-invert/50 fixed inset-0 grid place-content-center z-2000;

            &.n-popover-overlay-enter-active,
            &.n-popover-overlay-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
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
