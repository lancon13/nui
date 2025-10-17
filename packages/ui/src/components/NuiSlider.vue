<template>
    <div :class="wrapperClasses">
        <label v-if="props.label" :for="inputId" class="nui-slider-label">{{ props.label }}</label>
        <label
            ref="sliderElement"
            :for="inputId"
            class="nui-slider-host"
            @mousedown="handleSliderClick"
        >
            <template v-if="isRange && Array.isArray(model)">
                <input
                    :id="inputId + '-min'"
                    type="range"
                    class="nui-slider-input"
                    :min="props.min"
                    :max="model[1]"
                    :step="props.step"
                    :value="model[0]"
                    aria-label="Minimum value"
                    @input="model = [Number(($event.target as HTMLInputElement).value), model[1]]"
                    @focus="activeThumb = 'min'"
                    @blur="activeThumb = null"
                />
                <input
                    :id="inputId + '-max'"
                    type="range"
                    class="nui-slider-input"
                    :min="model[0]"
                    :max="props.max"
                    :step="props.step"
                    :value="model[1]"
                    aria-label="Maximum value"
                    @input="model = [model[0], Number(($event.target as HTMLInputElement).value)]"
                    @focus="activeThumb = 'max'"
                    @blur="activeThumb = null"
                />
            </template>
            <template v-else>
                <input
                    :id="inputId"
                    type="range"
                    class="nui-slider-input"
                    :min="props.min"
                    :max="props.max"
                    :step="props.step"
                    :value="model as number"
                    aria-label="Value"
                    @input="model = Number(($event.target as HTMLInputElement).value)"
                    @focus="activeThumb = 'min'"
                    @blur="activeThumb = null"
                />
            </template>
            <div class="nui-slider-track">
                <div v-if="props.markers" class="nui-slider-markers">
                    <span
                        v-for="(marker, index) in markers"
                        :key="index"
                        class="nui-slider-marker"
                        :style="{ left: `${marker}%` }"
                    ></span>
                </div>
                <div class="nui-slider-selection" :style="selectionStyle"></div>
                <div
                    ref="thumbMinRef"
                    class="nui-slider-thumb"
                    :class="{ 'nui-slider-thumb--focused': activeThumb === 'min' }"
                    :style="{ left: `${thumbMinPosition}%` }"
                    @mousedown.stop="handleThumbMouseDown('min')"
                >
                    <nui-tooltip v-if="props.tooltipVisibility !== false" v-bind="mergedTooltipPropsMin">
                        <slot
                            v-if="$slots['tooltip-content']"
                            name="tooltip-content"
                            :value="minVal"
                            thumb="min"
                        />
                    </nui-tooltip>
                </div>
                <!-- Max Thumb -->
                <div
                    v-if="isRange"
                    ref="thumbMaxRef"
                    class="nui-slider-thumb"
                    :class="{ 'nui-slider-thumb--focused': activeThumb === 'max' }"
                    :style="{ left: `${thumbMaxPosition}%` }"
                    @mousedown.stop="handleThumbMouseDown('max')"
                >
                    <nui-tooltip v-if="props.tooltipVisibility !== false" v-bind="mergedTooltipPropsMax">
                        <slot
                            v-if="$slots['tooltip-content']"
                            name="tooltip-content"
                            :value="maxVal"
                            thumb="max"
                        />
                    </nui-tooltip>
                </div>
            </div>
        </label>
        <span v-if="props.helperText" class="nui-slider-helper">{{ props.helperText }}</span>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, useAttrs } from 'vue'
    import NuiTooltip, { type NuiTooltipProps } from './NuiTooltip.vue'

    defineOptions({
        inheritAttrs: false
    })

    export type NuiSliderColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'current'
    export type NuiSliderSize = 'small' | 'medium' | 'large'

    export interface NuiSliderProps {
        modelValue?: number | number[]
        min?: number
        max?: number
        step?: number
        label?: string
        helperText?: string
        color?: NuiSliderColor
        size?: NuiSliderSize
        disabled?: boolean
        markers?: boolean
        thumbShadow?: boolean
        trackShadow?: boolean
        tooltipVisibility?: boolean
        tooltipProps?: NuiTooltipProps
    }

    const props = withDefaults(defineProps<NuiSliderProps>(), {
        modelValue: 0,
        min: 0,
        max: 100,
        step: 1,
        label: undefined,
        helperText: undefined,
        color: 'current',
        size: 'medium',
        disabled: false,
        markers: false,
        thumbShadow: true,
        trackShadow: false,
        tooltipVisibility: undefined,
        tooltipProps: undefined
    })

    const model = defineModel<number | number[]>()
    const attrs = useAttrs()
    const inputId = computed(
        () => (attrs.id as string) || `nui-slider-${Math.random().toString(36).slice(2)}`
    )

    const isRange = computed(() => Array.isArray(model.value))

    const sliderElement = ref<HTMLElement | null>(null)
    const thumbMinRef = ref<HTMLElement | null>(null)
    const thumbMaxRef = ref<HTMLElement | null>(null)
    const slidingThumb = ref<'min' | 'max' | null>(null)
    const activeThumb = ref<'min' | 'max' | null>(null)

    const valueToPercentage = (val: number) => {
        const range = props.max - props.min
        if (range === 0) {
            return 0
        }
        const clampedVal = Math.max(props.min, Math.min(val, props.max))
        return ((clampedVal - props.min) / range) * 100
    }

    const minVal = computed(() =>
        isRange.value ? (model.value as number[])[0] : (model.value as number)
    )

    const maxVal = computed(() =>
        isRange.value && Array.isArray(model.value) ? model.value[1] : 0
    )

    const mergedTooltipPropsMin = computed<NuiTooltipProps>(() => {
        return {
            text: `${minVal.value}`,
            displayPosition: 'top',
            noHover: props.tooltipVisibility === false,
            noFocus: props.tooltipVisibility === false,
            persistent: props.tooltipVisibility === true,
            modelValue: activeThumb.value === 'min' || props.tooltipVisibility === true,
            ...props.tooltipProps
        }
    })

    const mergedTooltipPropsMax = computed<NuiTooltipProps>(() => {
        return {
            text: `${maxVal.value}`,
            displayPosition: 'top',
            noHover: props.tooltipVisibility === false,
            noFocus: props.tooltipVisibility === false,
            persistent: props.tooltipVisibility === true,
            modelValue: activeThumb.value === 'max' || props.tooltipVisibility === true,
            ...props.tooltipProps
        }
    })

    const thumbMinPosition = computed(() => {
        const val = isRange.value ? (model.value as number[])[0] : (model.value as number)
        return valueToPercentage(val)
    })

    const thumbMaxPosition = computed(() => {
        if (!isRange.value || !Array.isArray(model.value)) return 0
        return valueToPercentage(model.value[1])
    })

    const selectionStyle = computed(() => {
        if (isRange.value && Array.isArray(model.value)) {
            return {
                left: `${thumbMinPosition.value}%`,
                width: `${thumbMaxPosition.value - thumbMinPosition.value}%`
            }
        }
        return {
            left: '0%',
            width: `${thumbMinPosition.value}%`
        }
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

    const updateValueFromPosition = (x: number, thumb: 'min' | 'max' | 'auto' = 'auto') => {
        if (!sliderElement.value || props.disabled) return

        const { left, width } = sliderElement.value.getBoundingClientRect()
        const percentage = Math.max(0, Math.min(1, (x - left) / width))
        const range = props.max - props.min
        let newValue = props.min + percentage * range

        if (props.step) {
            newValue = Math.round(newValue / props.step) * props.step
        }

        newValue = Math.max(props.min, Math.min(props.max, newValue))

        if (isRange.value && Array.isArray(model.value)) {
            let thumbToMove = thumb
            if (thumbToMove === 'auto') {
                const distToMin = Math.abs(newValue - model.value[0])
                const distToMax = Math.abs(newValue - model.value[1])
                thumbToMove = distToMin <= distToMax ? 'min' : 'max'
            }

            if (thumbToMove === 'min') {
                model.value = [Math.min(newValue, model.value[1]), model.value[1]]
            } else {
                // 'max'
                model.value = [model.value[0], Math.max(newValue, model.value[0])]
            }
        } else {
            model.value = newValue
        }
    }

    const handleSliderClick = (event: MouseEvent) => {
        updateValueFromPosition(event.clientX, 'auto')
    }

    const handleThumbMouseDown = (thumb: 'min' | 'max') => {
        if (props.disabled) return
        slidingThumb.value = thumb

        const onMouseMove = (event: MouseEvent) => {
            updateValueFromPosition(event.clientX, thumb)
        }

        const onMouseUp = () => {
            slidingThumb.value = null
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    const wrapperClasses = computed(() => [
        'nui-slider-wrapper',
        `nui-slider-wrapper--color-${props.color}`,
        `nui-slider-wrapper--size-${props.size}`,
        {
            'nui-slider-wrapper--disabled': props.disabled,
            'nui-slider-wrapper--thumb-shadow': props.thumbShadow,
            'nui-slider-wrapper--track-shadow': props.trackShadow
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

            .nui-slider-thumb.nui-slider-thumb--focused {
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

            &.nui-slider-wrapper--track-shadow {
                .nui-slider-track {
                    @apply shadow-lg;
                }
            }
            &.nui-slider-wrapper--thumb-shadow {
                .nui-slider-thumb {
                    @apply shadow-lg;
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
