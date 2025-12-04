<template>
    <transition v-if="props.stacked" name="n-tooltip">
        <component
            :is="props.tag"
            v-if="model"
            ref="contentRef"
            role="tooltip"
            :style="compStyles"
            :class="compClasses"
            v-bind="compBind"
            @mouseenter="handleContentHoverFocusIn"
            @mouseleave="handleContentHoverFocusOut"
            @focusin="handleContentHoverFocusIn"
            @focusout="handleContentHoverFocusOut"
        >
            <span v-if="props.content" v-html="props.content"></span>
            <template v-for="(node, index) in slotDefaultNodes" v-else :key="index">
                <component :is="node" />
            </template>
        </component>
    </transition>

    <!-- Overlay -->
    <teleport v-else-if="isReady && props.overlay" to="#n-tooltips-container">
        <transition name="n-tooltip-overlay">
            <div v-if="model" class="n-tooltip-overlay">
                <component
                    :is="props.tag"
                    ref="contentRef"
                    role="tooltip"
                    :style="compStyles"
                    :class="compClasses"
                    v-bind="compBind"
                    @mouseenter="handleContentHoverFocusIn"
                    @mouseleave="handleContentHoverFocusOut"
                    @focusin="handleContentHoverFocusIn"
                    @focusout="handleContentHoverFocusOut"
                >
                    <span v-if="props.content" v-html="props.content"></span>
                    <template v-for="(node, index) in slotDefaultNodes" v-else :key="index">
                        <component :is="node" />
                    </template>
                </component>
            </div>
        </transition>
    </teleport>

    <!-- Without Overlay -->
    <teleport v-else-if="isReady" to="#n-tooltips-container">
        <transition name="n-tooltip">
            <component
                :is="props.tag"
                v-if="model"
                ref="contentRef"
                role="tooltip"
                :style="compStyles"
                :class="compClasses"
                v-bind="compBind"
                @mouseenter="handleContentHoverFocusIn"
                @mouseleave="handleContentHoverFocusOut"
                @focusin="handleContentHoverFocusIn"
                @focusout="handleContentHoverFocusOut"
            >
                <span v-if="props.content" v-html="props.content"></span>
                <template v-for="(node, index) in slotDefaultNodes" v-else :key="index">
                    <component :is="node" />
                </template>
            </component>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
    import type { Placement } from '@floating-ui/vue'
    import { computed, HTMLAttributes, onMounted, ref, useAttrs, useSlots, useTemplateRef } from 'vue'
    import { useFloating } from '../composables/use-floating'
    import { useTeleportContainer } from '../composables/use-teleport-container'
    import { getElement, getParentElement, wrapTextNode } from '../helpers/dom'

    export type NTooltipDirection = 'top' | 'bottom' | 'left' | 'right'
    export type NTooltipProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        content?: string
        showDelay?: number
        hideDelay?: number
        persistent?: boolean
        hoverTriggerAnchor?: HTMLElement | string | null
        focusTriggerAnchor?: HTMLElement | string | null
        attachParent?: HTMLElement | string | null
        direction?: NTooltipDirection
        margin?: number
        offset?: [number, number]
        autoReposition?: boolean
        stacked?: boolean
        overlay?: boolean
    }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NTooltipProps>(), {
        tag: 'span',
        content: '',
        showDelay: 75,
        hideDelay: 250,
        persistent: false,
        direction: 'bottom',
        margin: 8,
        offset: () => [0, 0],
        autoReposition: true,
        stacked: false,
        overlay: false
    })

    const model = defineModel<boolean>({ default: false })
    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')
    const { isReady } = useTeleportContainer('n-tooltips-container')

    const parentEl = ref<HTMLElement | null>(null)
    const attachParentEl = computed<HTMLElement | null>(() =>
        props.attachParent ? getElement(props.attachParent) : parentEl.value
    )

    const { show, hide, handleContentHoverFocusIn, handleContentHoverFocusOut, compStyles, placement } = useFloating(
        props,
        {
            model: computed<boolean>({
                get: () => model.value,
                set: (val: boolean) => {
                    model.value = val
                }
            }),
            contentRef,
            attachParentEl,
            placement: computed<Placement>(() => props.direction)
        }
    )

    const compClasses = computed(() => {
        return ['n-tooltip', `n-tooltip--direction-${placement.value}`]
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })

    const slotDefaultNodes = computed(() => {
        return wrapTextNode(slots.default?.() ?? [], 'span')
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
        .n-tooltip-overlay {
            @apply bg-bg-invert/50 fixed inset-0 grid place-content-center z-2000;

            &.n-tooltip-overlay-enter-active,
            &.n-tooltip-overlay-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
            }
            &.n-tooltip-overlay-leave-active {
                @apply delay-200;
                .n-tooltip {
                    @apply delay-0;
                }
            }
            &.n-tooltip-overlay-enter-from,
            &.n-tooltip-overlay-leave-to {
                @apply opacity-0;
                .n-tooltip {
                    @apply opacity-0;
                    &.n-tooltip--direction-top {
                        @apply translate-y-2;
                    }
                    &.n-tooltip--direction-bottom {
                        @apply -translate-y-2;
                    }
                    &.n-tooltip--direction-left {
                        @apply translate-x-2;
                    }
                    &.n-tooltip--direction-right {
                        @apply -translate-x-2;
                    }
                }
            }

            .n-tooltip {
                @apply transition-[opacity,translate] delay-200 duration-200 ease-in-out;
                @apply translate-x-0 translate-y-0;
            }
        }

        .n-tooltip {
            @apply z-2000
                bg-bg-invert text-text-invert 
                text-center
                text-xs
                px-2 py-1
                rounded-element
                shadow
                max-w-1/3;

            &.n-tooltip-enter-active,
            &.n-tooltip-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
                @apply translate-x-0 translate-y-0;
            }

            &.n-tooltip-enter-from,
            &.n-tooltip-leave-to {
                @apply opacity-0;
                &.n-tooltip--direction-top {
                    @apply translate-y-2;
                }
                &.n-tooltip--direction-bottom {
                    @apply -translate-y-2;
                }
                &.n-tooltip--direction-left {
                    @apply translate-x-2;
                }
                &.n-tooltip--direction-right {
                    @apply -translate-x-2;
                }
            }
        }
    }
</style>
