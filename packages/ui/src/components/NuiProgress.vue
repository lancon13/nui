<template>
    <div
        :class="compClasses"
        role="progressbar"
        :aria-valuenow="isIndeterminate ? undefined : props.value"
        :aria-valuemin="isIndeterminate ? undefined : props.range[0]"
        :aria-valuemax="isIndeterminate ? undefined : props.range[1]"
        :aria-busy="isIndeterminate"
    >
        <div class="nui-progress-bar" :style="progressBarStyle"></div>
        <div v-if="$slots.default" class="nui-progress-content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export type NuiProgressColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'
    export type NuiProgressSize = 'small' | 'medium' | 'large'

    export interface NuiProgressProps {
        value?: number
        range?: [number, number]
        color?: NuiProgressColor
        indeterminate?: boolean
        reversed?: boolean
        pilled?: boolean
        size?: NuiProgressSize
        bordered?: boolean
        striped?: boolean
    }

    const props = withDefaults(defineProps<NuiProgressProps>(), {
        value: undefined,
        range: () => [0, 1],
        color: 'current',
        indeterminate: false,
        reversed: false,
        pilled: false,
        size: 'medium',
        bordered: false,
        striped: false
    })
    const isIndeterminate = computed(() => props.indeterminate || props.value === undefined)

    const compClasses = computed(() => [
        'nui-progress',
        `nui-progress--color-${props.color}`,
        `nui-progress--size-${props.size}`,
        {
            'nui-progress--indeterminate': isIndeterminate.value,
            'nui-progress--reversed': props.reversed,
            'nui-progress--pilled': props.pilled,
            'nui-progress--bordered': props.bordered,
            'nui-progress--striped': props.striped
        }
    ])
    const progressPercentage = computed(() => {
        if (isIndeterminate.value) {
            return undefined
        }
        const [min, max] = props.range
        const boundedValue = Math.min(Math.max(props.value!, min), max)
        const range = max - min
        if (range === 0) {
            return props.value! >= max ? 100 : 0
        }
        return ((boundedValue - min) / range) * 100
    })

    const progressBarStyle = computed(() => {
        if (progressPercentage.value === undefined) {
            return {}
        }
        return {
            width: `${progressPercentage.value}%`
        }
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-progress {
            @apply relative w-full overflow-hidden
            bg-[var(--nui-progress-background-color)]
            rounded-[var(--nui-progress-radius)];

            &.nui-progress--bordered {
                @apply border-solid border-[length:var(--nui-progress-border-size)] border-[color:var(--nui-progress-border-color)];
            }

            &.nui-progress--size-small {
                @apply h-[var(--spacing-xs)];
            }
            &.nui-progress--size-medium {
                @apply h-[var(--spacing-base)];
            }
            &.nui-progress--size-large {
                @apply h-[var(--spacing-md)];
            }

            &.nui-progress--pilled {
                @apply rounded-full;
            }

            .nui-progress-bar {
                @apply absolute top-0 left-0 h-full transition-all duration-200 ease-out bg-size-[1rem_1rem];
            }

            &.nui-progress--reversed .nui-progress-bar {
                @apply left-auto right-0;
            }

            .nui-progress-content {
                @apply absolute inset-0 flex items-center justify-center
                text-[length:var(--nui-progress-content-font-size)]
                text-[color:var(--nui-progress-content-color)]
                font-[var(--nui-progress-content-font-weight)]
                [mix-blend-mode:var(--nui-progress-content-blend-mode)];
            }

            /* Striped */

            &.nui-progress--striped .nui-progress-bar {
                @apply bg-[linear-gradient(45deg,hsl(0_0%_100%/0.15)_25%,transparent_25%,transparent_50%,hsl(0_0%_100%/0.15)_50%,hsl(0_0%_100%/0.15)_75%,transparent_75%,transparent)];
                @apply [animation:nui-progress-stripes_1s_linear_infinite];
            }

            /* Colors */

            &.nui-progress--color-primary {
                @apply border-primary;
                .nui-progress-bar {
                    @apply bg-primary;
                }
            }

            &.nui-progress--color-success {
                @apply border-success;
                .nui-progress-bar {
                    @apply bg-success;
                }
            }

            &.nui-progress--color-error {
                @apply border-error;
                .nui-progress-bar {
                    @apply bg-error;
                }
            }

            &.nui-progress--color-warning {
                @apply border-warning;
                .nui-progress-bar {
                    @apply bg-warning;
                }
            }

            &.nui-progress--color-info {
                @apply border-info;
                .nui-progress-bar {
                    @apply bg-info;
                }
            }

            &.nui-progress--color-current {
                @apply border-[var(--nui-progress-border-color)];
                .nui-progress-bar {
                    @apply bg-current;
                }
            }

            /* Indeterminate */
            &.nui-progress--indeterminate .nui-progress-bar {
                @apply w-3/4 [animation:nui-progress-indeterminate_1.5s_ease-in-out_infinite];
            }

            &.nui-progress--indeterminate.nui-progress--reversed .nui-progress-bar {
                @apply [animation-name:nui-progress-indeterminate-reversed];
            }
        }
    }
</style>
