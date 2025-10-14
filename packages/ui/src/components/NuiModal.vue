<template>
    <teleport to="body">
        <!-- Separate transition for the overlay -->
        <transition name="nui-modal-fade">
            <div
                v-if="model"
                class="nui-modal-overlay"
            />
        </transition>

        <!-- Separate transition for the content -->
        <transition name="nui-modal-content-scale">
            <div
                v-if="model"
                class="nui-modal-content-wrapper"
                tabindex="-1"
                @mousedown="handleOverlayClick"
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
    </teleport>
</template>

<script setup lang="ts">
    import { ref, watch, onUnmounted, nextTick } from 'vue'
    import { createFocusTrap } from 'focus-trap'
    import type { FocusTrap } from 'focus-trap'

    const model = defineModel<boolean>()

    export interface NuiModalProps {
        modelValue?: boolean;
        autoFocus?: boolean;
        noEscHide?: boolean;
        noClickHide?: boolean;
        noHide?: boolean;
    }

    const props = withDefaults(defineProps<NuiModalProps>(), {
        modelValue: false,
        autoFocus: true,
        noEscHide: false,
        noClickHide: false,
        noHide: false,
    })

    const modalContentRef = ref<HTMLElement | null>(null)
    let trap: FocusTrap | null = null

    const handleOverlayClick = () => {
        if (props.noHide || props.noClickHide) return
        model.value = false
    }

    watch(model, (newValue) => {
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
                        }
                    })
                    trap.activate()
                }
            })
            document.body.style.overflow = 'hidden'
        } else {
            trap?.deactivate()
            document.body.style.overflow = ''
        }
    })

    onUnmounted(() => {
        trap?.deactivate()
    })
</script>

<style lang="css">
    @import "tailwindcss";
    @import "../styles/index.css";
    @import "../styles/components.css";

    @layer components {
        .nui-modal-overlay {
            @apply fixed inset-0 z-[var(--nui-modal-overlay-z-index)]
                bg-[var(--nui-modal-overlay-background-color)];
        }

        .nui-modal-content-wrapper {
            @apply fixed inset-0 z-[var(--nui-modal-content-z-index)]
                flex items-center justify-center
                p-lg;
            outline: 0;
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
            @apply opacity-0 scale-95 translate-y-4;
        }
    }
</style>