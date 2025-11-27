<template>
    <teleport v-if="isReady" to="#n-modals-container">
        <transition name="n-modal-overlay">
            <div
                v-if="model"
                :class="['n-modal-overlay', props.overlay ? 'n-modal-overlay--solid' : 'n-modal-overlay--empty']"
                tabindex="-1"
                @mousedown="handleOverlayClick"
            >
                <transition name="n-modal">
                    <component
                        :is="props.tag"
                        ref="contentRef"
                        role="dialog"
                        :class="compClasses"
                        v-bind="compBind"
                        @mousedown="handleModalMouseDown"
                        @mouseup="handleModalMouseUp"
                    >
                        <slot name="default" v-html="props.content"></slot>
                    </component>
                </transition>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
    import { useEventListener } from '@vueuse/core'
    import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
    import { computed, nextTick, onUnmounted, useAttrs, useTemplateRef, watch } from 'vue'
    import { useComponentStack } from '../composables/use-component-stack'
    import { useTeleportContainer } from '../composables/use-teleport-container'
    import { generatePseudoRandomKey } from '../helpers/tools'

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(
        defineProps<{
            tag?: string
            content?: string
            overlay?: boolean
            noOverlayHide?: boolean
            noEscHide?: boolean
        }>(),
        {
            tag: 'div',
            content: '',
            overlay: true,
            noOverlayHide: false,
            noEscHide: false
        }
    )

    const model = defineModel<boolean>({ default: false })
    const { isReady } = useTeleportContainer('n-modals-container')
    const { register, unregister, getZIndex, isTop } = useComponentStack('n-modal')
    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')
    const { hasFocus, activate, deactivate, pause, unpause } = useFocusTrap(contentRef)
    const modalId = Symbol(`modal-id-${generatePseudoRandomKey()}`)

    const compClasses = computed(() => {
        return ['n-modal']
    })
    const compBind = computed(() => {
        return {
            ...attrs,
            'z-index': getZIndex(modalId)
        }
    })

    useEventListener('keydown', e => {
        if (model.value && e.key === 'Escape' && !props.noEscHide && isTop(modalId)) {
            e.preventDefault()
            e.stopPropagation()
            hide()
        }
    })

    // Watcher
    watch(model, async value => {
        await nextTick() // Need it for focus-trap to work correctly for v-if
        try {
            if (value) {
                if (!hasFocus.value) activate()
                register(modalId)
            } else if (!value) {
                if (hasFocus.value) deactivate()
                unregister(modalId)
            }
            // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        } catch (error) {
            // ...
        }
    })

    onUnmounted(() => {
        unregister(modalId)
    })

    // Event handlers
    function handleOverlayClick(e: MouseEvent) {
        if (props.noOverlayHide) return
        const target = e.target as HTMLElement
        if (target.clientWidth < e.clientX || target.clientHeight < e.clientY) return
        hide()
    }
    function handleModalMouseDown() {
        pause()
    }
    function handleModalMouseUp() {
        unpause()
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
            @apply bg-bg-invert/50 fixed inset-0 grid place-content-center-safe z-1000 overflow-auto;
            &.n-modal-overlay--empty {
                @apply bg-transparent;
            }

            &.n-modal-overlay-enter-active,
            &.n-modal-overlay-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
            }
            &.n-modal-overlay-leave-active {
                @apply delay-200;
                .n-modal {
                    @apply delay-0;
                }
            }
            &.n-modal-overlay-enter-from,
            &.n-modal-overlay-leave-to {
                @apply opacity-0;
                .n-modal {
                    @apply opacity-0;
                    @apply translate-y-2;
                }
            }
            .n-modal {
                @apply transition-[opacity,translate] delay-200 duration-200 ease-in-out;
            }
        }
        .n-modal {
            @apply relative z-1000;

            &.n-modal-enter-active,
            &.n-modal-leave-active {
                @apply transition-[opacity,translate] duration-200 ease-in-out;
                @apply translate-x-0 translate-y-0;
            }

            &.n-modal-enter-from,
            &.n-modal-leave-to {
                @apply opacity-0;
                @apply translate-y-2;
            }
        }
    }
</style>
