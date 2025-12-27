<template>
    <!-- Overlay -->
    <transition name="n-drawer-overlay">
        <div
            v-if="props.overlay && model"
            :class="overlayClasses"
            tabindex="-1"
            aria-hidden="true"
            @mousedown.self="handleOverlayClick"
        ></div>
    </transition>

    <!-- Drawer -->
    <component
        :is="props.tag"
        ref="contentRef"
        v-on-click-outside="handleContentClickOutside"
        role="dialog"
        :aria-modal="props.overlay ? 'true' : undefined"
        :class="drawerClasses"
        v-bind="drawerBind"
        @mousedown="handleDrawerMouseDown"
        @mouseup="handleDrawerMouseUp"
    >
        <slot name="default">
            <span v-if="props.content" v-html="props.content"></span>
        </slot>
    </component>
</template>

<script setup lang="ts">
    import { vOnClickOutside } from '@vueuse/components'
    import { useEventListener } from '@vueuse/core'
    import { computed, type HTMLAttributes, useAttrs, useTemplateRef } from 'vue'
    import { useFocusable } from '../composables/use-focusable'

    export type NDrawerDirection = 'top' | 'bottom' | 'left' | 'right'
    export type NDrawerProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        content?: string
        overlay?: boolean
        noOverlayHide?: boolean
        noClickOutsideHide?: boolean
        noEscHide?: boolean
        direction?: NDrawerDirection
        persist?: boolean
        focusOnShow?: boolean
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NDrawerProps>(), {
        tag: 'div',
        content: '',
        overlay: true,
        noOverlayHide: false,
        noClickOutsideHide: false,
        noEscHide: false,
        direction: 'left',
        persist: false,
        focusOnShow: true
    })

    const model = defineModel<boolean>({ default: false })
    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')

    const { pause, unpause } = useFocusable(
        model,
        contentRef,
        computed(() => props.overlay),
        computed(() => props.focusOnShow),
        props.overlay
            ? {
                  show: 300,
                  hide: 300
              }
            : undefined
    )

    const overlayClasses = computed(() => ['n-drawer-overlay'])
    const drawerClasses = computed(() => [
        'n-drawer',
        `n-drawer--direction-${props.direction}`,
        model.value ? 'n-drawer--active' : undefined
    ])
    const drawerBind = computed(() => ({ ...attrs }))

    useEventListener('keydown', e => {
        if (model.value && e.key === 'Escape' && !props.persist && !props.noEscHide) {
            e.preventDefault()
            e.stopPropagation()
            hide()
        }
    })

    function handleOverlayClick(e: MouseEvent) {
        if (props.persist || props.noOverlayHide) return
        const target = e.target as HTMLElement
        // Ignore clicks on scrollbars
        if (target.clientWidth < e.clientX || target.clientHeight < e.clientY) return
        hide()
    }

    function handleContentClickOutside() {
        if (props.persist || props.noClickOutsideHide) return
        hide()
    }

    function handleDrawerMouseDown() {
        if (props.persist) return
        pause()
    }

    function handleDrawerMouseUp() {
        if (props.persist) return
        unpause()
    }

    const show = () => {
        model.value = true
    }
    const hide = () => {
        model.value = false
    }
    defineExpose({ show, hide })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-drawer-overlay {
            @apply absolute inset-0 z-1000 bg-background-invert/50;
            @apply transition-[opacity] duration-200 ease-in-out;
            @apply opacity-100;

            &.n-drawer-overlay-enter-active {
                @apply delay-0;
                & + .n-drawer {
                    @apply delay-200;
                }
            }
            &.n-drawer-overlay-leave-active {
                @apply delay-200;
                & + .n-drawer {
                    @apply delay-0;
                }
            }

            &.n-drawer-overlay-enter-from,
            &.n-drawer-overlay-leave-to {
                @apply opacity-0;
            }
        }

        .n-drawer {
            @apply absolute z-1000;
            @apply transition-[opacity,translate] duration-200 ease-in-out;
            
            &.n-drawer--direction-top {
                @apply w-full top-0 left-0 -translate-y-full;
            }
            &.n-drawer--direction-bottom {
                @apply w-full bottom-0 left-0 translate-y-full;
            }
            &.n-drawer--direction-left {
                @apply h-full top-0 left-0 -translate-x-full;
            }
            &.n-drawer--direction-right {
                @apply h-full top-0 right-0 translate-x-full;
            }

            &.n-drawer--active {
                @apply translate-x-0 translate-y-0;
            }
        }
    }
</style>