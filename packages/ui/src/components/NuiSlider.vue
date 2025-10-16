<template>
    <div :class="wrapperClasses">
        <label v-if="props.label" :for="inputId" class="nui-slider-label">{{ props.label }}</label>
        <label
            :for="inputId"
            ref="sliderElement"
            class="nui-slider-host"
            @mousedown="handleSliderClick"
            @mouseenter="handleHostEnter"
            @mouseleave="handleHostLeave"
        >
            <input
                :id="inputId"
                type="range"
                :min="props.min"
                :max="props.max"
                :step="props.step"
                :value="model"
                class="nui-slider-input"
                v-bind="$attrs"
                @input="model = Number(($event.target as HTMLInputElement).value)"
            />
            <div class="nui-slider-track">
                <div v-if="props.markers" class="nui-slider-markers">
                    <span
                        v-for="(marker, index) in markers"
                        :key="index"
                        class="nui-slider-marker"
                        :style="{ left: `${marker}%` }"
                    ></span>
                </div>
                <div class="nui-slider-selection" :style="{ width: `${selectionWidth}%` }"></div>
                <div
                    ref="thumbElement"
                    class="nui-slider-thumb"
                    :style="{ left: `${selectionWidth}%` }"
                    @mousedown.stop="handleThumbMouseDown"
                >
                    <NuiTooltip
                        v-if="props.tooltip"
                        v-model="showTooltip"
                        :text="`${model}`"
                        display-position="top"
                    >
                        <slot name="tooltip" :value="model"></slot>
                    </NuiTooltip>
                </div>
            </div>
        </label>
        <span v-if="props.helperText" class="nui-slider-helper">{{ props.helperText }}</span>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, useAttrs } from 'vue'
    import NuiTooltip from './NuiTooltip.vue'

    defineOptions({
        inheritAttrs: false
    })

    export type NuiSliderColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'
    export type NuiSliderSize = 'small' | 'medium' | 'large'

    export interface NuiSliderProps {
        modelValue?: number
        min?: number
        max?: number
        step?: number
        label?: string
        helperText?: string
        color?: NuiSliderColor
        size?: NuiSliderSize
        disabled?: boolean
        tooltip?: boolean
        markers?: boolean
    }

    const props = withDefaults(defineProps<NuiSliderProps>(), {
        modelValue: 0,
        min: 0,
        max: 100,
        step: 1,
        label: undefined,
        helperText: undefined,
        color: 'primary',
        size: 'medium',
        disabled: false,
        tooltip: true,
        markers: false
    })

    const model = defineModel<number>()
    const attrs = useAttrs()
    const inputId = computed(
        () => (attrs.id as string) || `nui-slider-${Math.random().toString(36).slice(2)}`
    )

    const sliderElement = ref<HTMLElement | null>(null)
    const thumbElement = ref<HTMLElement | null>(null)
    const isSliding = ref(false)
    const showTooltip = ref(false)

    const selectionWidth = computed(() => {
        const range = props.max - props.min
        if (range === 0) return 0
        return (((model.value ?? props.min) - props.min) / range) * 100
    })

    const markers = computed(() => {
        if (!props.markers || !props.step) return []
        const markerPositions: number[] = []
        const range = props.max - props.min
        if (range === 0) return []

        const steps = Math.floor(range / props.step)
        for (let i = 0; i <= steps; i++) {
            const value = props.min + i * props.step
            markerPositions.push(((value - props.min) / range) * 100)
        }
        return markerPositions
    })

    const updateValueFromPosition = (x: number) => {
        if (!sliderElement.value || props.disabled) return

        const { left, width } = sliderElement.value.getBoundingClientRect()
        const percentage = Math.max(0, Math.min(1, (x - left) / width))
        const range = props.max - props.min
        let newValue = props.min + percentage * range

        if (props.step) {
            newValue = Math.round(newValue / props.step) * props.step
        }

        model.value = Math.max(props.min, Math.min(props.max, newValue))
    }

    const handleSliderClick = (event: MouseEvent) => {
        updateValueFromPosition(event.clientX)
    }

    const handleThumbMouseDown = () => {
        if (props.disabled) return
        isSliding.value = true

        const onMouseMove = (event: MouseEvent) => {
            updateValueFromPosition(event.clientX)
        }

        const onMouseUp = () => {
            isSliding.value = false
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    const handleHostEnter = () => {
        showTooltip.value = true
    }
    const handleHostLeave = () => {
        if (!isSliding.value) {
            showTooltip.value = false
        }
    }

    const wrapperClasses = computed(() => [
        'nui-slider-wrapper',
        `nui-slider-wrapper--color-${props.color}`,
        `nui-slider-wrapper--size-${props.size}`,
        {
            'nui-slider-wrapper--disabled': props.disabled
        }
    ])
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-slider-wrapper {
            @apply flex flex-col gap-xs;

            .nui-slider-label {
                @apply text-[length:var(--nui-input-label-font-size)] font-[var(--nui-input-label-font-weight)];
            }
            .nui-slider-helper {
                @apply text-[length:var(--nui-input-helper-font-size)] font-[var(--nui-input-helper-font-weight)];
            }

            .nui-slider-host {
                @apply relative w-full py-sm cursor-pointer;
            }

            .nui-slider-input {
                @apply sr-only;
            }

            .nui-slider-host:has(.nui-slider-input:focus) .nui-slider-thumb {
                @apply ring-2 ring-offset-2 ring-offset-bg ring-fg/50;
            }

            .nui-slider-track {
                @apply relative w-full rounded-[var(--nui-slider-track-radius)] bg-[var(--nui-slider-track-background-color)] h-[var(--nui-slider-track-height)];
            }

            .nui-slider-markers {
                @apply absolute inset-0 w-full h-full;
            }
            .nui-slider-marker {
                @apply absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                size-[var(--nui-slider-marker-size)] rounded-full
                bg-[var(--nui-slider-marker-background-color)];
            }

            .nui-slider-selection {
                @apply absolute h-full rounded-[var(--nui-slider-track-radius)] bg-[var(--nui-slider-selection-background-color)];
            }

            .nui-slider-thumb {
                @apply absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                size-[var(--nui-slider-thumb-size)] rounded-[var(--nui-slider-thumb-radius)]
                bg-[var(--nui-slider-thumb-background-color)] shadow-[var(--nui-slider-thumb-shadow)]
                transition-shadow z-10;

                &:focus,
                &:hover {
                    @apply shadow-[var(--nui-slider-thumb-shadow-focus)];
                }
            }

            &.nui-slider-wrapper--disabled {
                @apply opacity-50 cursor-not-allowed;
                .nui-slider-host {
                    @apply cursor-not-allowed;
                }
            }

            &.nui-slider-wrapper--size-small {
                --nui-slider-track-height: var(--nui-slider-size-small-track-height);
                --nui-slider-thumb-size: var(--nui-slider-size-small-thumb-size);
            }
            &.nui-slider-wrapper--size-medium {
                --nui-slider-track-height: var(--nui-slider-size-medium-track-height);
                --nui-slider-thumb-size: var(--nui-slider-size-medium-thumb-size);
            }
            &.nui-slider-wrapper--size-large {
                --nui-slider-track-height: var(--nui-slider-size-large-track-height);
                --nui-slider-thumb-size: var(--nui-slider-size-large-thumb-size);
            }

            &.nui-slider-wrapper--color-primary {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-primary;
                }
            }
            &.nui-slider-wrapper--color-success {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-success;
                }
            }
            &.nui-slider-wrapper--color-error {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-error;
                }
            }
            &.nui-slider-wrapper--color-warning {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-warning;
                }
            }
            &.nui-slider-wrapper--color-info {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-info;
                }
            }
            &.nui-slider-wrapper--color-current {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-current;
                }
            }
        }

        .nui-slider-host:has(.nui-slider-input:focus) .nui-slider-thumb {
            .nui-slider-wrapper--color-primary & {
                @apply ring-primary/50;
            }
            .nui-slider-wrapper--color-success & {
                @apply ring-success/50;
            }
            .nui-slider-wrapper--color-error & {
                @apply ring-error/50;
            }
            .nui-slider-wrapper--color-warning & {
                @apply ring-warning/50;
            }
            .nui-slider-wrapper--color-info & {
                @apply ring-info/50;
            }
        }
    }
</style>
