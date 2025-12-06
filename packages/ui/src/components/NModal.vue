<template>
    <teleport v-if="isReady" to="#n-modals-container">
        <!-- Overlay -->
        <transition name="n-modal-overlay">
            <div
                v-if="props.overlay && model"
                :class="overlayClasses"
                :style="overlayStyles"
                tabindex="-1"
                @mousedown="handleOverlayClick"
            ></div>
        </transition>

        <!-- Modal -->
        <transition name="n-modal">
            <component
                :is="props.tag"
                v-if="model"
                ref="contentRef"
                role="dialog"
                :class="modalClasses"
                :style="modalStyles"
                v-bind="modalBind"
                @mousedown="handleModalMouseDown"
                @mouseup="handleModalMouseUp"
            >
                <slot name="default" v-html="props.content"></slot>
            </component>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
    import { useEventListener } from '@vueuse/core'
    import { computed, HTMLAttributes, nextTick, onUnmounted, useAttrs, useTemplateRef, watch } from 'vue'
    import { useComponentStack } from '../composables/use-component-stack'
    import { useTeleportContainer } from '../composables/use-teleport-container'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import { useFocusable } from '../composables/use-focusable'

    export type NModalDirection = 'center' | 'top' | 'bottom' | 'left' | 'right'
    export type NModalProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        content?: string
        overlay?: boolean
        noOverlayHide?: boolean
        noEscHide?: boolean
        direction?: NModalDirection
        persist?: boolean
        focusOnShow?: boolean
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NModalProps>(), {
        tag: 'div',
        content: '',
        overlay: true,
        noOverlayHide: false,
        noEscHide: false,
        direction: 'center',
        persist: false,
        focusOnShow: true
    })

    const model = defineModel<boolean>({ default: false })
    const { isReady } = useTeleportContainer('n-modals-container')

    const modalId = Symbol(`modal-id-${generatePseudoRandomKey()}`)
    const { register, unregister, getZIndex, isTop } = useComponentStack('n-modal')
    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')
    const { pause, unpause } = useFocusable(
        model,
        contentRef,
        computed(() => props.overlay),
        computed(() => props.focusOnShow)
    )

    const stackZIndex = computed(() => getZIndex(modalId))

    const overlayClasses = computed(() => {
        return ['n-modal-overlay']
    })
    const overlayStyles = computed(() => {
        return {
            zIndex: stackZIndex.value
        }
    })
    const modalClasses = computed(() => {
        return ['n-modal', `n-modal--direction-${props.direction}`]
    })
    const modalStyles = computed(() => {
        return {
            zIndex: stackZIndex.value
        }
    })
    const modalBind = computed(() => {
        return {
            ...attrs
        }
    })

    useEventListener('keydown', e => {
        if (model.value && e.key === 'Escape' && !props.persist && !props.noEscHide && isTop(modalId)) {
            e.preventDefault()
            e.stopPropagation()
            hide()
        }
    })

    // Watcher
    watch(model, async value => {
        await nextTick() // Need it for focus-trap to work correctly for v-if
        if (value) {
            register(modalId)
        } else if (!value) {
            unregister(modalId)
        }
    })

    onUnmounted(() => {
        unregister(modalId)
    })

    // Event handlers
    function handleOverlayClick(e: MouseEvent) {
        if (props.persist) return
        if (props.noOverlayHide) return
        const target = e.target as HTMLElement
        if (target.clientWidth < e.clientX || target.clientHeight < e.clientY) return
        hide()
    }
    function handleModalMouseDown() {
        if (props.persist) return
        pause() // To allows text highlight
    }
    function handleModalMouseUp() {
        if (props.persist) return
        unpause() // To disable text highlight
    }

    // Methods
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
        .n-modal-overlay {
            @apply fixed inset-0 z-1000 bg-bg-invert/50;

            &.n-modal-overlay-enter-active,
            &.n-modal-overlay-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
            }

            &.n-modal-overlay-leave-active {
                @apply delay-200;
                & + .n-modal {
                    @apply delay-0;
                }
            }
            &.n-modal-overlay-enter-from,
            &.n-modal-overlay-leave-to {
                @apply opacity-0;
                .n-modal {
                    @apply opacity-0;
                    &.n-modal--direction-center {
                        @apply translate-y-2;
                    }
                    &.n-modal--direction-top {
                        @apply -translate-y-full;
                    }
                    &.n-modal--direction-bottom {
                        @apply translate-y-full;
                    }
                    &.n-modal--direction-left {
                        @apply -translate-x-full;
                    }
                    &.n-modal--direction-right {
                        @apply translate-x-full;
                    }
                }
            }
        }

        .n-modal {
            @apply absolute z-1000 w-auto;
            @apply transition-[opacity,translate] delay-200 duration-200 ease-in-out;
            @apply translate-x-0 translate-y-0;

            &.n-modal--direction-top {
                @apply w-full top-0 left-0;
            }
            &.n-modal--direction-bottom {
                @apply w-full bottom-0 left-0;
            }
            &.n-modal--direction-left {
                @apply h-full top-0 left-0;
            }
            &.n-modal--direction-right {
                @apply h-full top-0 right-0;
            }

            &.n-modal-enter-from,
            &.n-modal-leave-to {
                @apply opacity-0;
                &.n-modal--direction-center {
                    @apply translate-y-2;
                }
                &.n-modal--direction-top {
                    @apply -translate-y-full;
                }
                &.n-modal--direction-bottom {
                    @apply translate-y-full;
                }
                &.n-modal--direction-left {
                    @apply -translate-x-full;
                }
                &.n-modal--direction-right {
                    @apply translate-x-full;
                }
            }
        }
    }
</style>
