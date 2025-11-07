<template>
    <div
        ref="wrapperRef"
        :class="wrapperClasses"
        @mouseenter="handleSliderMouseEnter"
        @mouseout="handlerSliderMouseOut"
    >
        <label v-if="props.label" :for="inputId" class="nui-slider-label">{{ props.label }}</label>
        <label
            ref="sliderRef"
            :for="inputId"
            class="nui-slider-host"
            @mousedown.stop="handleSliderMouseDown"
        >
            <div class="nui-slider-track">
                <div v-if="props.markers" class="nui-slider-markers">
                    <span
                        v-for="(marker, index) in markers"
                        :key="index"
                        class="nui-slider-marker"
                        :style="{ left: `${marker}%` }"
                    ></span>
                </div>
                <!-- Selection -->
                <div class="nui-slider-selection" :style="selectionStyle"></div>
                <!-- Min Thumb -->
                <label
                    ref="thumbMinRef"
                    :for="inputId + (isRange ? '-min' : '')"
                    class="nui-slider-thumb"
                    :style="{ left: `${thumbMinPosition}%` }"
                    @mousedown.stop="handleThumbMouseDown('min')"
                >
                    <input
                        v-if="isRange && Array.isArray(model)"
                        :id="inputId + '-min'"
                        ref="inputRangeMinRef"
                        type="range"
                        class="nui-slider-input"
                        :min="props.min"
                        :max="model[1]"
                        :step="props.step"
                        :value="model[0]"
                        aria-label="Minimum value"
                        @input="
                            model = [Number(($event.target as HTMLInputElement).value), model[1]]
                        "
                        @focus="() => (isThumbFocusing = true)"
                        @blur="() => (isThumbFocusing = false)"
                    />
                    <input
                        v-else
                        :id="inputId"
                        ref="inputRangeRef"
                        type="range"
                        class="nui-slider-input"
                        :min="props.min"
                        :max="props.max"
                        :step="props.step"
                        :value="model as number"
                        aria-label="Value"
                        @input="model = Number(($event.target as HTMLInputElement).value)"
                        @focus="() => (isThumbFocusing = true)"
                        @blur="() => (isThumbFocusing = false)"
                    />
                    <nui-tooltip
                        v-if="props.tooltipVisibility !== false"
                        v-bind="mergedTooltipPropsMin"
                    >
                        <slot
                            v-if="$slots['tooltip-content']"
                            name="tooltip-content"
                            :value="minVal"
                            thumb="min"
                        />
                    </nui-tooltip>
                </label>
                <!-- Max Thumb -->
                <label
                    v-if="isRange"
                    ref="thumbMaxRef"
                    :for="inputId + '-max'"
                    class="nui-slider-thumb"
                    :style="{ left: `${thumbMaxPosition}%` }"
                    @mousedown.stop="handleThumbMouseDown('max')"
                >
                    <input
                        v-if="isRange && Array.isArray(model)"
                        :id="inputId + '-max'"
                        ref="inputRangeMaxRef"
                        type="range"
                        class="nui-slider-input"
                        :min="model[0]"
                        :max="props.max"
                        :step="props.step"
                        :value="model[1]"
                        aria-label="Maximum value"
                        @input="
                            model = [model[0], Number(($event.target as HTMLInputElement).value)]
                        "
                        @focus="() => (isThumbFocusing = true)"
                        @blur="() => (isThumbFocusing = false)"
                    />
                    <nui-tooltip
                        v-if="props.tooltipVisibility !== false"
                        v-bind="mergedTooltipPropsMax"
                    >
                        <slot
                            v-if="$slots['tooltip-content']"
                            name="tooltip-content"
                            :value="maxVal"
                            thumb="max"
                        />
                    </nui-tooltip>
                </label>
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
    const isTooltipVisible = computed(() => isWrapperHovering.value || isThumbFocusing.value)

    const inputRangeRef = ref<HTMLElement | null>(null)
    const inputRangeMinRef = ref<HTMLElement | null>(null)
    const inputRangeMaxRef = ref<HTMLElement | null>(null)
    const wrapperRef = ref<HTMLElement | null>(null)
    const sliderRef = ref<HTMLElement | null>(null)
    const thumbMinRef = ref<HTMLElement | null>(null)
    const thumbMaxRef = ref<HTMLElement | null>(null)
    const isWrapperHovering = ref(false)
    const isThumbDragging = ref(false)
    const isThumbFocusing = ref(false)

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

    const mergedTooltipPropsMin = computed<NuiTooltipProps>(() => ({
        text: `${minVal.value}`,
        displayPosition: 'top',
        hoverTriggerParent: null,
        focusTriggerParent: null,
        modelValue:
            props.tooltipVisibility === true ||
            (props.tooltipVisibility !== false && isTooltipVisible.value),
        ...props.tooltipProps
    }))

    const mergedTooltipPropsMax = computed<NuiTooltipProps>(() => ({
        text: `${maxVal.value}`,
        displayPosition: 'top',
        hoverTriggerParent: null,
        focusTriggerParent: null,
        modelValue:
            props.tooltipVisibility === true ||
            (props.tooltipVisibility !== false && isTooltipVisible.value),
        ...props.tooltipProps
    }))

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
        if (!sliderRef.value || props.disabled) return model.value

        const { left, width } = sliderRef.value.getBoundingClientRect()
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
                // If min thumb is dragged past max thumb, push max thumb
                if (newValue > model.value[1]) {
                    return [newValue, newValue]
                }
                return [newValue, model.value[1]]
            } else {
                // 'max'
                // If max thumb is dragged past min thumb, push min thumb
                if (newValue < model.value[0]) {
                    return [newValue, newValue]
                }
                return [model.value[0], newValue]
            }
        } else {
            return newValue
        }
    }

    const handleSliderMouseEnter = () => {
        isWrapperHovering.value = true
    }
    const handlerSliderMouseOut = (event: MouseEvent) => {
        const relatedTarget = event.relatedTarget as HTMLElement | null
        if (!wrapperRef.value?.contains(relatedTarget)) {
            isWrapperHovering.value = false
        }
    }
    const handleSliderMouseDown = (event: MouseEvent) => {
        if (props.disabled) return

        // For range sliders, determine which thumb is closer to the click point
        // and lock it for the duration of the drag.
        let thumbToMove: 'min' | 'max' | 'auto' = 'auto'
        if (isRange.value && Array.isArray(model.value)) {
            const { left, width } = sliderRef.value!.getBoundingClientRect()
            const percentage = Math.max(0, Math.min(1, (event.clientX - left) / width))
            const clickedValue = props.min + percentage * (props.max - props.min)

            const distToMin = Math.abs(clickedValue - model.value[0])
            const distToMax = Math.abs(clickedValue - model.value[1])
            thumbToMove = distToMin <= distToMax ? 'min' : 'max'
        }

        model.value = updateValueFromPosition(event.clientX, thumbToMove)

        const onMouseMove = (moveEvent: MouseEvent) => {
            // For subsequent moves, continue moving the same thumb.
            model.value = updateValueFromPosition(moveEvent.clientX, thumbToMove)
        }

        const onMouseUp = () => {
            isThumbDragging.value = false
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
        isThumbDragging.value = true
    }

    const handleThumbMouseDown = (thumb: 'min' | 'max') => {
        if (props.disabled) return

        const onMouseMove = (event: MouseEvent) => {
            model.value = updateValueFromPosition(event.clientX, thumb)
        }

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
            isThumbDragging.value = false
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
        isThumbDragging.value = true
    }

    const wrapperClasses = computed(() => [
        'nui-slider-wrapper',
        `nui-slider-wrapper--color-${props.color}`,
        `nui-slider-wrapper--size-${props.size}`,
        {
            'nui-slider-wrapper--disabled': props.disabled,
            'nui-slider-wrapper--thumb-shadow': props.thumbShadow,
            'nui-slider-wrapper--track-shadow': props.trackShadow,
            'nui-slider-wrapper--thumb-dragging': isThumbDragging.value,
            'nui-slider-wrapper--tooltip-visible': isTooltipVisible.value
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
                @apply sr-only size-[var(--nui-slider-thumb-size)];
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
                bg-[var(--nui-slider-thumb-background-color)]
                z-10
                transition-[left] duration-250 ease-in-out
                cursor-pointer;

                &:focus-within {
                    @apply ring-2 ring-offset-2 ring-offset-bg ring-current/50;
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
                    @apply shadow-[var(--nui-slider-track-shadow-focus)];
                }
            }
            &.nui-slider-wrapper--thumb-shadow {
                .nui-slider-thumb {
                    @apply shadow-[var(--nui-slider-thumb-shadow-focus)];
                }
            }

            &.nui-slider-wrapper--thumb-dragging {
                .nui-slider-thumb {
                    @apply ring-2 ring-offset-2 ring-offset-bg ring-current/50
                    transition-none;
                }
            }

            /* Sizes */
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

            /* Colors */
            &.nui-slider-wrapper--color-primary {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-primary;
                }
                .nui-slider-thumb:focus-within {
                    @apply ring-primary/50;
                }
                &.nui-slider-wrapper--thumb-dragging {
                    .nui-slider-thumb {
                        @apply ring-primary/50;
                    }
                }
            }
            &.nui-slider-wrapper--color-success {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-success;
                }
                .nui-slider-thumb:focus-within {
                    @apply ring-success/50;
                }
                &.nui-slider-wrapper--thumb-dragging {
                    .nui-slider-thumb {
                        @apply ring-success/50;
                    }
                }
            }
            &.nui-slider-wrapper--color-error {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-error;
                }
                .nui-slider-thumb:focus-within {
                    @apply ring-error/50;
                }
                &.nui-slider-wrapper--thumb-dragging {
                    .nui-slider-thumb {
                        @apply ring-error/50;
                    }
                }
            }
            &.nui-slider-wrapper--color-warning {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-warning;
                }
                .nui-slider-thumb:focus-within {
                    @apply ring-warning/50;
                }
                &.nui-slider-wrapper--thumb-dragging {
                    .nui-slider-thumb {
                        @apply ring-warning/50;
                    }
                }
            }
            &.nui-slider-wrapper--color-info {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-info;
                }
                .nui-slider-thumb:focus-within {
                    @apply ring-info/50;
                }
                &.nui-slider-wrapper--thumb-dragging {
                    .nui-slider-thumb {
                        @apply ring-info/50;
                    }
                }
            }
            &.nui-slider-wrapper--color-current {
                .nui-slider-selection,
                .nui-slider-thumb {
                    @apply bg-current;
                }
            }
        }
    }
</style>
