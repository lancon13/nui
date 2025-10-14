<template>
    <teleport to="body">
        <div
            class="nui-modal"
            :style="compStyles"
        >
            <transition name="nui-modal-fade">
                <div
                    v-if="model && !props.noOverlay"
                    class="nui-modal-overlay"
                />
            </transition>
            <transition name="nui-modal-content-scale">
                <div
                    v-if="model"
                    class="nui-modal-content-wrapper"
                    tabindex="-1"
                    @mousedown="handleOverlayClick($event)"
                >
                    <div
                        ref="modalContentRef"
                        role="dialog"
                        aria-modal="true"
                        @mousedown.stop
                    >
                        <slot />
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script setup lang="ts">
    import { ref, watch, onUnmounted, nextTick, computed } from 'vue'
    import { createFocusTrap } from 'focus-trap'
    import type { FocusTrap } from 'focus-trap'

    const model = defineModel<boolean>()
    const emit = defineEmits(['show', 'hide'])

    export interface NuiModalProps {
        modelValue?: boolean;
        autoFocus?: boolean;
        noEscHide?: boolean;
        noClickHide?: boolean;
        noHide?: boolean;
        noOverlay?: boolean;
        level?: number;
    }

    const props = withDefaults(defineProps<NuiModalProps>(), {
        modelValue: false,
        autoFocus: true,
        noEscHide: false,
        noClickHide: false,
        noHide: false,
        noOverlay: false,
        level: 0,
    })

    const modalContentRef = ref<HTMLElement | null>(null)
    let trap: FocusTrap | null = null

    const compStyles = computed(() => ({
        zIndex: `calc(var(--nui-modal-z-index) + ${props.level})`,
    }))

    const handleOverlayClick = (e: MouseEvent) => {
        if (props.noOverlay || props.noHide || props.noClickHide) return

        const target = e.target as HTMLElement
        if (target.clientWidth < e.clientX || target.clientHeight < e.clientY)
            return
    
        model.value = false
    }

    watch(model, (newValue, oldValue) => {
        if (newValue) {
            nextTick(() => {
                if (modalContentRef.value) {
                    trap = createFocusTrap(modalContentRef.value, {
                        initialFocus: props.autoFocus ? undefined : false,
                        returnFocusOnDeactivate: props.autoFocus,
                        escapeDeactivates: () => !(props.noHide || props.noEscHide),
                        allowOutsideClick: false, // Allow clicks to pass through to our handler
                        onDeactivate: () => {
                            model.value = false
                        },
                    })
                    trap.activate()
                }
            })
            document.body.style.overflow = 'hidden'
            emit('show')
        } else {
            trap?.deactivate()
            trap = null
            document.body.style.overflow = ''
            if (oldValue)
                emit('hide')
            
        }
    })

    onUnmounted(() => {
        trap?.deactivate()
    })

    const show = () => {
        model.value = true
    }
    const hide = () => {
        model.value = false
    }

    defineExpose({
        show,
        hide,
    })
</script>

<style lang="css">
    @import "tailwindcss";
    @import "../styles/index.css";
    @import "../styles/components.css";

    @layer components {
        .nui-modal {
            @apply relative z-[var(--nui-modal-z-index)];

            .nui-modal-overlay {
                @apply fixed inset-0 bg-[var(--nui-modal-overlay-background-color)];
            }
            .nui-modal-content-wrapper {
                @apply fixed inset-0
                    grid w-screen h-screen place-items-center outline-0
                    overflow-auto p-[var(--nui-modal-content-padding)];
            }

            /* Overlay Fade Transition */
            .nui-modal-fade-enter-active,
            .nui-modal-fade-leave-active {
                @apply transition-opacity duration-250 ease-in-out;
            }

            .nui-modal-fade-enter-from,
            .nui-modal-fade-leave-to {
                @apply opacity-0;
            }

            /* Content Scale/Slide Transition */
            .nui-modal-content-scale-enter-active,
            .nui-modal-content-scale-leave-active {
                @apply transition-all duration-250 ease-in-out;
            }

            .nui-modal-content-scale-enter-from,
            .nui-modal-content-scale-leave-to {
                @apply opacity-0 translate-y-4;
            }
        }
    }
</style>