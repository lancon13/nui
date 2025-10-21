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
        <svg class="nui-circular-progress-svg" :viewBox="`0 0 ${svgSize} ${svgSize}`">
            <circle
                class="nui-circular-progress-fill"
                :cx="svgSize / 2"
                :cy="svgSize / 2"
                :r="innerRadius"
                :fill="props.fillColor"
            />
            <circle
                class="nui-circular-progress-track"
                :cx="svgSize / 2"
                :cy="svgSize / 2"
                :r="radius"
                fill="none"
                :stroke-width="props.thickness"
            />
            <circle
                class="nui-circular-progress-bar"
                :cx="svgSize / 2"
                :cy="svgSize / 2"
                :r="radius"
                fill="none"
                :stroke-width="props.thickness"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="strokeDashOffset"
            />
        </svg>
        <div v-if="$slots.default" class="nui-circular-progress-content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, type CSSProperties } from 'vue'

    export type NuiCircularProgressColor =
        | 'primary'
        | 'success'
        | 'error'
        | 'warning'
        | 'info'
        | 'current'
    export type NuiCircularProgressSize = 'small' | 'medium' | 'large'

    export interface NuiCircularProgressProps {
        value?: number
        range?: [number, number]
        color?: NuiCircularProgressColor
        indeterminate?: boolean
        size?: NuiCircularProgressSize | string
        thickness?: number
        fillColor?: string // New prop
    }

    const props = withDefaults(defineProps<NuiCircularProgressProps>(), {
        value: undefined,
        range: () => [0, 1],
        color: 'current',
        indeterminate: false,
        size: 'medium',
        thickness: 16,
        fillColor: 'transparent' // Default to transparent
    })

    const isIndeterminate = computed(() => props.indeterminate || props.value === undefined)

    const svgSize = 100
    const radius = computed(() => svgSize / 3)
    const circumference = computed(() => 2 * Math.PI * radius.value)
    const innerRadius = computed(() => radius.value - (props.thickness / 2)) // Calculate inner radius for fill circle

    const progressPercentage = computed(() => {
        if (isIndeterminate.value) {
            return 25 // For the indeterminate animation
        }
        const [min, max] = props.range
        const boundedValue = Math.min(Math.max(props.value!, min), max)
        const range = max - min
        if (range === 0) {
            return props.value! >= max ? 100 : 0
        }
        return ((boundedValue - min) / range) * 100
    })

    const strokeDashOffset = computed(() => {
        const progress = progressPercentage.value
        return circumference.value - (progress / 100) * circumference.value
    })

    const isPresetSize = computed(() => ['small', 'medium', 'large'].includes(props.size!))

    const compClasses = computed(() => [
        'nui-circular-progress',
        `nui-circular-progress--color-${props.color}`,
        {
            'nui-circular-progress--indeterminate': isIndeterminate.value,
            [`nui-circular-progress--size-${props.size}`]: isPresetSize.value
        }
    ])

    const compStyles = computed<CSSProperties>(() => {
        if (isPresetSize.value) {
            return {}
        }

        return {
            width: props.size,
            height: props.size
        }
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-circular-progress {
            @apply relative inline-flex items-center justify-center;

            .nui-circular-progress-svg {
                @apply transform -rotate-90;
            }

            .nui-circular-progress-track {
                @apply text-[var(--nui-circular-progress-track-color)] stroke-current;
            }

            .nui-circular-progress-bar {
                @apply transition-all duration-250 ease-out stroke-current;
            }

            .nui-circular-progress-track,
            .nui-circular-progress-bar {
                /* @apply stroke-[length:var(--nui-circular-progress-thickness)]; */
            }

            .nui-circular-progress-content {
                @apply absolute inset-0 flex items-center justify-center;
            }

            /* Indeterminate */
            &.nui-circular-progress--indeterminate .nui-circular-progress-svg {
                @apply animate-spin;
            }

            /* Colors */
            &.nui-circular-progress--color-primary {
                @apply text-primary;
            }
            &.nui-circular-progress--color-success {
                @apply text-success;
            }
            &.nui-circular-progress--color-error {
                @apply text-error;
            }
            &.nui-circular-progress--color-warning {
                @apply text-warning;
            }
            &.nui-circular-progress--color-info {
                @apply text-info;
            }
            &.nui-circular-progress--color-current {
                @apply text-current;
            }

            /* Sizes */
            &.nui-circular-progress--size-small {
                @apply h-[var(--nui-circular-progress-size-small)] w-[var(--nui-circular-progress-size-small)];
            }
            &.nui-circular-progress--size-medium {
                @apply h-[var(--nui-circular-progress-size-medium)] w-[var(--nui-circular-progress-size-medium)];
            }
            &.nui-circular-progress--size-large {
                @apply h-[var(--nui-circular-progress-size-large)] w-[var(--nui-circular-progress-size-large)];
            }
        }
    }
</style>