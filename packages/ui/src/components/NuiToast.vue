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
                    <component :is="toast.content" :close="toast.close" v-bind="toast.props" />
                    <slot
                        v-if="toast.timeout > 0 && !toast.noProgress"
                        name="progress"
                        :toast="toast"
                    >
                        <div
                            class="nui-toast-progress-track"
                            :class="[
                                `nui-toast-progress-track--location-${toast.progressLocation}`
                            ]"
                        >
                            <div
                                class="nui-toast-progress-bar"
                                :style="{
                                    width: `${100 - toast.progress}%`
                                }"
                            />
                        </div>
                    </slot>
                    <nui-badge
                        v-if="toast.count > 1"
                        :key="toast.count"
                        v-bind="{
                            ...badgePosition(toast.badgePosition),
                            ...toast.badgeProps
                        }"
                        class="absolute nui-badge-shake"
                    >
                        {{ toast.count }}
                    </nui-badge>
                </div>
            </transition-group>
        </div>
    </teleport>
</template>

<script setup lang="ts">
    import { useNuiToast } from '../composables/useNuiToast'
    import NuiBadge from './NuiBadge.vue'

    const { toastsByLocations, pause, resume } = useNuiToast()

    const groupClasses = (location: string) => {
        const [position, direction] = location.split('-')
        return [
            'nui-toast-group',
            `nui-toast-group--position-${position}`,
            `nui-toast-group--direction-${direction}`
        ]
    }

    const badgePosition = (
        position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right'
    ) => {
        const [y, x] = position.split('-')
        return {
            position: y as 'top' | 'center' | 'bottom',
            direction: x as 'left' | 'right'
        }
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
                @apply relative max-w-[var(--nui-toast-max-width)];
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

            .nui-toast-progress-track {
                @apply absolute left-0 w-full h-[var(--nui-toast-progress-size)];

                &.nui-toast-progress-track--location-top {
                    @apply top-0;
                }

                &.nui-toast-progress-track--location-bottom {
                    @apply bottom-0;
                }

                .nui-toast-progress-bar {
                    @apply h-full bg-input-highlight/50;
                }
            }
        }
    }
</style>
