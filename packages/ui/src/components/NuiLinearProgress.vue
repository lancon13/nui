<template>
    <div
        :class="compClasses"
        :style="compStyles"
        role="progressbar"
        :aria-valuenow="isIndeterminate ? undefined : props.value"
        :aria-valuemin="isIndeterminate ? undefined : props.range[0]"
        :aria-valuemax="isIndeterminate ? undefined : props.range[1]"
        :aria-busy="isIndeterminate"
    >
        <div class="nui-linear-progress-bar" :style="progressBarStyle"></div>
        <div v-if="$slots.default" class="nui-linear-progress-content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, type CSSProperties } from 'vue'

    export type NuiLinearProgressColor =
        | 'primary'
        | 'success'
        | 'error'
        | 'warning'
        | 'info'
        | 'current'
    export type NuiLinearProgressSize = 'small' | 'medium' | 'large'

    export interface NuiLinearProgressProps {
        value?: number
        range?: [number, number]
        color?: NuiLinearProgressColor
        indeterminate?: boolean
        reversed?: boolean
        pilled?: boolean
        size?: NuiLinearProgressSize | string
        bordered?: boolean
        striped?: boolean
    }

    const props = withDefaults(defineProps<NuiLinearProgressProps>(), {
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

    const isPresetSize = computed(() => ['small', 'medium', 'large'].includes(props.size!))

    const compClasses = computed(() => [
        'nui-linear-progress',
        `nui-linear-progress--color-${props.color}`,
        {
            'nui-linear-progress--indeterminate': isIndeterminate.value,
            'nui-linear-progress--reversed': props.reversed,
            'nui-linear-progress--pilled': props.pilled,
            'nui-linear-progress--bordered': props.bordered,
            'nui-linear-progress--striped': props.striped,
            [`nui-linear-progress--size-${props.size}`]: isPresetSize.value
        }
    ])

    const compStyles = computed<CSSProperties>(() => {
        if (isPresetSize.value) {
            return {}
        }
        return {
            height: props.size
        }
    })

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
        .nui-linear-progress {
            @apply relative w-full overflow-hidden

                bg-[var(--nui-linear-progress-background-color)]

                rounded-[var(--nui-linear-progress-radius)];

            &.nui-linear-progress--bordered {
                @apply border-solid border-[length:var(--nui-linear-progress-border-size)] border-[color:var(--nui-linear-progress-border-color)];
            }

            &.nui-linear-progress--size-small {
                @apply h-[var(--nui-linear-progress-height-small)];
            }

            &.nui-linear-progress--size-medium {
                @apply h-[var(--nui-linear-progress-height-medium)];
            }

            &.nui-linear-progress--size-large {
                @apply h-[var(--nui-linear-progress-height-large)];
            }

            &.nui-linear-progress--pilled {
                @apply rounded-full;
            }

            .nui-linear-progress-bar {
                @apply absolute top-0 left-0 h-full transition-all duration-200 ease-out bg-size-[1rem_1rem];
            }

            &.nui-linear-progress--reversed .nui-linear-progress-bar {
                @apply left-auto right-0;
            }

            .nui-linear-progress-content {
                @apply absolute inset-0 flex items-center justify-center

                    text-[length:var(--nui-linear-progress-content-font-size)]

                    text-[color:var(--nui-linear-progress-content-color)]

                    font-[var(--nui-linear-progress-content-font-weight)]

                    [mix-blend-mode:var(--nui-linear-progress-content-blend-mode)];
            }

            /* Striped */

            &.nui-linear-progress--striped .nui-linear-progress-bar {
                @apply bg-[linear-gradient(45deg,hsl(0_0%_100%/0.15)_25%,transparent_25%,transparent_50%,hsl(0_0%_100%/0.15)_50%,hsl(0_0%_100%/0.15)_75%,transparent_75%,transparent)];

                @apply [animation:nui-linear-progress-stripes_1s_linear_infinite];
            }

            /* Colors */

            &.nui-linear-progress--color-primary {
                @apply border-primary;

                .nui-linear-progress-bar {
                    @apply bg-primary;
                }
            }

            &.nui-linear-progress--color-success {
                @apply border-success;

                .nui-linear-progress-bar {
                    @apply bg-success;
                }
            }

            &.nui-linear-progress--color-error {
                @apply border-error;

                .nui-linear-progress-bar {
                    @apply bg-error;
                }
            }

            &.nui-linear-progress--color-warning {
                @apply border-warning;

                .nui-linear-progress-bar {
                    @apply bg-warning;
                }
            }

            &.nui-linear-progress--color-info {
                @apply border-info;

                .nui-linear-progress-bar {
                    @apply bg-info;
                }
            }

            &.nui-linear-progress--color-current {
                @apply border-[var(--nui-linear-progress-border-color)];

                .nui-linear-progress-bar {
                    @apply bg-current;
                }
            }

            /* Indeterminate */

            &.nui-linear-progress--indeterminate .nui-linear-progress-bar {
                @apply w-3/4 [animation:nui-linear-progress-indeterminate_1.5s_ease-in-out_infinite];
            }

            &.nui-linear-progress--indeterminate.nui-linear-progress--reversed
                .nui-linear-progress-bar {
                @apply [animation-name:nui-linear-progress-indeterminate-reversed];
            }
        }
    }
</style>
