<template>
    <teleport to="body">
        <div
            v-for="(toasts, location) in toastsByLocations"
            :key="location"
            :class="groupClasses(location)"
        >
            <transition-group name="nui-toast-transition">
                <div
                    v-for="toast in toasts"
                    :key="toast.id"
                    class="nui-toast"
                    @mouseenter="pause(toast.id)"
                    @mouseleave="resume(toast.id)"
                    @focusin="pause(toast.id)"
                    @focusout="resume(toast.id)"
                >
                    <component :is="toast.content" :close="toast.close" />
                </div>
            </transition-group>
        </div>
    </teleport>
</template>

<script setup lang="ts">
    import { useNuiToast } from '../composables/useNuiToast'

    const { toastsByLocations, pause, resume } = useNuiToast()

    const groupClasses = (location: string) => {
        const [position, direction] = location.split('-')
        return [
            'nui-toast-group',
            `nui-toast-group--position-${position}`,
            `nui-toast-group--direction-${direction}`
        ]
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-toast-group {
            @apply fixed 
                flex flex-col gap-[var(--nui-toast-group-padding)]
                z-[var(--nui-toast-z-index)];

            .nui-toast {
                @apply max-w-[var(--nui-toast-max-width)];
            }

            .nui-toast-transition-enter-active,
            .nui-toast-transition-leave-active,
            .nui-toast-transition-move {
                @apply transition-all duration-500 ease-in-out;
            }
            .nui-toast-transition-enter-from,
            .nui-toast-transition-leave-to {
                @apply opacity-0;
            }
            .nui-toast-transition-leave-active:not(:last-child) {
                @apply fixed;
            }

            &.nui-toast-group--position-top {
                @apply top-0 pt-[var(--nui-toast-group-padding)];
                .nui-toast-transition-enter-from,
                .nui-toast-transition-leave-to {
                    @apply -translate-y-full;
                }
            }
            &.nui-toast-group--position-center {
                @apply top-1/2 -translate-y-1/2;
            }
            &.nui-toast-group--position-bottom {
                @apply bottom-0 pb-[var(--nui-toast-group-padding)];
                .nui-toast-transition-enter-from,
                .nui-toast-transition-leave-to {
                    @apply translate-y-full;
                }
            }
            &.nui-toast-group--direction-left {
                @apply left-0 pl-[var(--nui-toast-group-padding)];
                &.nui-toast-group--position-center {
                    .nui-toast-transition-enter-from,
                    .nui-toast-transition-leave-to {
                        @apply scale-y-0;
                    }
                }
            }
            &.nui-toast-group--direction-center {
                @apply left-1/2 -translate-x-1/2;
            }
            &.nui-toast-group--direction-right {
                @apply right-0 pr-[var(--nui-toast-group-padding)];
                &.nui-toast-group--position-center {
                    .nui-toast-transition-enter-from,
                    .nui-toast-transition-leave-to {
                        @apply translate-x-full;
                    }
                }
            }
        }
    }
</style>
