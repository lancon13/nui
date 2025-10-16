<script setup lang="ts">
    import { computed } from 'vue'
    import { useNuiToast } from '../composables/useNuiToast'
    import NuiBadge, { type NuiBadgePosition, type NuiBadgeDirection } from './NuiBadge.vue'

    const { toastsByPosition, pause, resume } = useNuiToast()

    function getToastGroupKey(toast: any) {
        const content = toast.content
        if (typeof content === 'string') {
            return content
        }
        if (typeof content === 'object' && content !== null) {
            if (content.name) {
                return content.name
            }
            if (typeof content.template === 'string') {
                return content.template
            }
        }
        // Fallback to unique ID if no reliable key can be generated
        return toast.id
    }
    const groupedToastsByPosition = computed(() => {
        const result: Record<string, { key: string; toasts: any[] }[]> = {}

        for (const group in toastsByPosition.value) {
            const toasts = toastsByPosition.value[group]
            const subgroups = new Map<string, any[]>()

            toasts.forEach((toast: any) => {
                const key = getToastGroupKey(toast)
                if (!subgroups.has(key)) {
                    subgroups.set(key, [])
                }
                subgroups.get(key)!.push(toast)
            })

            result[group] = Array.from(subgroups.entries()).map(([key, toasts]) => ({
                key,
                toasts
            }))
        }

        return result
    })

    const groupClasses = (group: string) => {
        const [position, direction] = group.split('-')
        return [
            'nui-toast-group',
            `nui-toast-group--position-${position}`,
            `nui-toast-group--direction-${direction}`
        ]
    }

    const badgeProps = (
        group: string
    ): { position: NuiBadgePosition; direction: NuiBadgeDirection } => {
        const [position, direction] = group.split('-')

        const badgePos: NuiBadgePosition = position.startsWith('top') ? 'bottom' : 'top'
        let badgeDir: NuiBadgeDirection

        if (direction === 'left') {
            badgeDir = 'right'
        } else if (direction === 'right') {
            badgeDir = 'left'
        } else {
            // center
            badgeDir = 'right'
        }

        return {
            position: badgePos,
            direction: badgeDir
        }
    }
</script>

<template>
    <teleport to="body">
        <div
            v-for="(subgroups, group) in groupedToastsByPosition"
            :key="group"
            :class="groupClasses(group)"
        >
            <transition-group name="nui-toast-transition">
                <div v-for="subgroup in subgroups" :key="subgroup.key" class="nui-toast-container">
                    <div
                        v-if="subgroup.toasts.length > 1"
                        class="nui-toast-stack"
                        :class="{ 'items-end': group.startsWith('bottom-') }"
                    >
                        <nui-badge v-bind="badgeProps(group)" color="primary" pilled>
                            {{ subgroup.toasts.length }}
                        </nui-badge>
                        <transition-group name="nui-toast-fade">
                            <div
                                :key="subgroup.toasts[0].id"
                                class="nui-toast"
                                @mouseenter="pause(subgroup.toasts[0].id)"
                                @mouseleave="resume(subgroup.toasts[0].id)"
                                @focusin="pause(subgroup.toasts[0].id)"
                                @focusout="resume(subgroup.toasts[0].id)"
                            >
                                <component
                                    :is="subgroup.toasts[0].content"
                                    :close="subgroup.toasts[0].close"
                                />
                            </div>
                        </transition-group>
                    </div>
                    <div v-else-if="subgroup.toasts.length === 1" class="nui-toast">
                        <component
                            :is="subgroup.toasts[0].content"
                            :close="subgroup.toasts[0].close"
                            @mouseenter="pause(subgroup.toasts[0].id)"
                            @mouseleave="resume(subgroup.toasts[0].id)"
                            @focusin="pause(subgroup.toasts[0].id)"
                            @focusout="resume(subgroup.toasts[0].id)"
                        />
                    </div>
                </div>
            </transition-group>
        </div>
    </teleport>
</template>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-toast-group {
            @apply fixed flex flex-col p-[var(--nui-toast-group-padding)] z-[var(--nui-toast-z-index)];
            --toast-translate-x: 0rem;
            --toast-translate-y: 0rem;

            &.nui-toast-group--position-top {
                @apply top-0;
                --toast-translate-y: -1rem;
            }
            &.nui-toast-group--position-center {
                @apply top-1/2 -translate-y-1/2;
            }
            &.nui-toast-group--position-bottom {
                @apply bottom-0;
                --toast-translate-y: 1rem;
            }

            &.nui-toast-group--direction-left {
                @apply left-0;
                --toast-translate-x: -1rem;
            }
            &.nui-toast-group--direction-center {
                @apply left-1/2 -translate-x-1/2;
            }
            &.nui-toast-group--direction-right {
                @apply right-0;
                --toast-translate-x: 1rem;
            }

            &.nui-toast-group--position-top.nui-toast-group--direction-left,
            &.nui-toast-group--position-bottom.nui-toast-group--direction-left {
                @apply items-start;
            }
            &.nui-toast-group--position-top.nui-toast-group--direction-center,
            &.nui-toast-group--position-bottom.nui-toast-group--direction-center {
                @apply items-center;
            }
            &.nui-toast-group--position-top.nui-toast-group--direction-right,
            &.nui-toast-group--position-bottom.nui-toast-group--direction-right {
                @apply items-end;
            }
        }

        .nui-toast-container {
            @apply mt-[var(--nui-toast-spacing)];
        }

        .nui-toast-stack {
            @apply grid grid-cols-1 grid-rows-1;
        }

        .nui-toast {
            @apply max-w-[var(--nui-toast-max-width)] w-full transition-all duration-300 ease-in-out;
        }

        .nui-toast-stack .nui-toast {
            @apply col-start-1 row-start-1;
        }

        /* Main transition for the list */
        .nui-toast-transition-enter-active,
        .nui-toast-transition-leave-active,
        .nui-toast-transition-move {
            @apply transition-all duration-300 ease-in-out;
        }
        .nui-toast-transition-leave-active {
            @apply absolute;
        }
        .nui-toast-transition-enter-from,
        .nui-toast-transition-leave-to {
            @apply opacity-0;
        }
        .nui-toast-transition-enter-from .nui-toast,
        .nui-toast-transition-leave-to .nui-toast {
            @apply opacity-0;
            transform: translate(var(--toast-translate-x), var(--toast-translate-y)) scale(0.95);
        }


        /* Fade transition for toasts inside a z-stack */
        .nui-toast-fade-enter-active,
        .nui-toast-fade-leave-active {
            @apply transition-all duration-300;
        }
        .nui-toast-fade-enter-from,
        .nui-toast-fade-leave-to {
            @apply opacity-0;
            transform: translate(var(--toast-translate-x), var(--toast-translate-y)) scale(0.95);
        }
    }
</style>
