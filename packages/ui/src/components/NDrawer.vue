<template>
    <!-- Overlay -->
    <transition
        v-if="props.overlay"
        name="n-drawer-overlay"
        @before-enter="handleAnimationStart"
        @after-enter="handleAnimationStop"
        @before-leave="handleAnimationStart"
        @after-leave="handleAnimationStop"
    >
        <div v-if="model" class="n-drawer-overlay">
            <component
                :is="props.tag"
                ref="contentRef"
                v-on-click-outside="handleContentClickOutside"
                role="drawer"
                :style="compStyles"
                :class="compClasses"
                v-bind="compBind"
            >
                <slot name="default" v-html="props.content"></slot>
            </component>
        </div>
    </transition>

    <!-- Without Overlay -->
    <transition
        v-else
        name="n-drawer"
        @before-enter="handleAnimationStart"
        @after-enter="handleAnimationStop"
        @before-leave="handleAnimationStart"
        @after-leave="handleAnimationStop"
    >
        <component
            :is="props.tag"
            v-if="model"
            ref="contentRef"
            v-on-click-outside="handleContentClickOutside"
            role="drawer"
            :style="compStyles"
            :class="compClasses"
            v-bind="compBind"
        >
            <slot name="default" v-html="props.content"></slot>
        </component>
    </transition>
</template>

<script setup lang="ts">
    import { vOnClickOutside } from '@vueuse/components'
    import { computed, HTMLAttributes, ref, useAttrs, useTemplateRef } from 'vue'
    import { useFocusable } from '../composables'

    export type NDrawerDirection = 'top' | 'bottom' | 'left' | 'right'
    export type NDrawerProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        content?: string
        direction?: NDrawerDirection
        overlay?: boolean
        noClickOutsideHide?: boolean
        focusOnShow?: boolean
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NDrawerProps>(), {
        tag: 'aside',
        content: '',
        direction: 'left',
        overlay: false,
        noClickOutsideHide: false,
        focusOnShow: true
    })

    const model = defineModel<boolean>({ default: false })
    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')
    useFocusable(
        model,
        contentRef,
        computed(() => props.overlay),
        computed(() => props.focusOnShow)
    )

    const isAnimating = ref(false)
    const compClasses = computed(() => {
        return ['n-drawer', `n-drawer--direction-${props.direction}`]
    })
    const compStyles = computed(() => {
        return {}
    })
    const compBind = computed(() => {
        return { ...attrs }
    })

    // Event handlers
    function handleAnimationStart() {
        isAnimating.value = true
    }

    function handleAnimationStop() {
        setTimeout(() => {
            isAnimating.value = false
        }, 125)
    }

    function handleContentClickOutside(e: PointerEvent) {
        if (props.noClickOutsideHide) return
        const target = e.target as HTMLElement
        if (contentRef.value && target.querySelector('.n-drawer') === contentRef.value) {
            hide()
        }
    }

    function show() {
        model.value = true
    }
    function hide() {
        model.value = false
    }

    defineExpose({ show, hide })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-drawer-overlay {
            @apply bg-bg-invert/50
                absolute inset-0 z-2000
                overflow-hidden
                grid place-content-center;

            &.n-drawer-overlay-enter-active,
            &.n-drawer-overlay-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
            }
            &.n-drawer-overlay-leave-active {
                @apply delay-200;
                .n-drawer {
                    @apply delay-0;
                }
            }
            &.n-drawer-overlay-enter-from,
            &.n-drawer-overlay-leave-to {
                @apply opacity-0;
                .n-drawer {
                    @apply opacity-0;
                    &.n-drawer--direction-top {
                        @apply -translate-y-full;
                    }
                    &.n-drawer--direction-bottom {
                        @apply translate-y-full;
                    }
                    &.n-drawer--direction-left {
                        @apply -translate-x-full;
                    }
                    &.n-drawer--direction-right {
                        @apply translate-x-full;
                    }
                }
            }
        }

        .n-drawer {
            @apply absolute
                z-2000;
            @apply transition-[opacity,translate] delay-200 duration-200 ease-in-out;
            @apply translate-x-0 translate-y-0;

            &.n-drawer--direction-top {
                @apply w-full top-0 left-0;
            }
            &.n-drawer--direction-bottom {
                @apply w-full bottom-0 left-0;
            }
            &.n-drawer--direction-left {
                @apply h-full top-0 left-0;
            }
            &.n-drawer--direction-right {
                @apply h-full top-0 right-0;
            }

            &.n-drawer-enter-from,
            &.n-drawer-leave-to {
                @apply opacity-0;
                &.n-drawer--direction-top {
                    @apply -translate-y-full;
                }
                &.n-drawer--direction-bottom {
                    @apply translate-y-full;
                }
                &.n-drawer--direction-left {
                    @apply -translate-x-full;
                }
                &.n-drawer--direction-right {
                    @apply translate-x-full;
                }
            }
        }
    }
</style>
