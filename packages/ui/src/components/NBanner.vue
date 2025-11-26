<template>
    <component
        :is="props.tag"
        v-if="model"
        :class="compClasses"
        :style="compStyles"
        v-bind="compBind"
        role="banner"
        @mouseenter="handlePause"
        @mouseleave="handleResume"
        @focusin="handlePause"
        @focusout="handleResume"
    >
        <div :class="['n-banner-label', props.labelClass]">
            <slot name="icon">
                <n-icon v-if="props.icon" :name="props.icon" :class="props.iconClass" />
            </slot>
            <template v-for="(node, index) in slotDefaultNodes" :key="index">
                <component :is="node" />
            </template>
        </div>

        <div v-if="$slots['actions']" :class="['n-banner-actions', props.actionsClass]">
            <slot name="actions" />
        </div>

        <slot v-if="props.showProgress && props.duration > 0" name="progress">
            <div class="n-banner-progress">
                <div
                    class="n-banner-progress-bar"
                    :style="{ animationPlayState: timer.isPaused.value ? 'paused' : 'running' }"
                ></div>
            </div>
        </slot>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable no-unused-vars */
    import { computed, useAttrs, useSlots, watch } from 'vue'
    import { wrapTextNode } from '../helpers/dom'
    import { usePausableTimer } from '../composables/use-pausable-timer'
    import NIcon from './NIcon.vue'

    defineOptions({
        inheritAttrs: false
    })

    // --- Emits Definition ---
    const emits = defineEmits<{
        (e: 'timer-begin'): void
        (e: 'timer-end'): void
        (e: 'timer-pause'): void
        (e: 'timer-resume'): void
    }>()

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(
        defineProps<{
            tag?: string
            icon?: string
            iconClass?: string | object | string[]
            labelClass?: string | object | string[]
            actionsClass?: string | object | string[]
            inlineActions?: boolean
            duration?: number
            showProgress?: boolean
        }>(),
        {
            tag: 'div',
            inlineActions: true,
            duration: 0,
            showProgress: false
        }
    )

    const model = defineModel<boolean>({ default: true })

    // --- Timer Logic ---
    const timer = usePausableTimer(
        () => {
            // Callback when timer finishes
            emits('timer-end')
        },
        computed(() => props.duration),
        { immediate: false }
    )

    // --- Interaction Handlers ---
    // We wrap the timer calls to emit events
    const handlePause = () => {
        if (props.duration > 0 && !timer.isPaused.value) {
            timer.pause()
            emits('timer-pause')
        }
    }

    const handleResume = () => {
        if (props.duration > 0 && timer.isPaused.value) {
            timer.resume()
            emits('timer-resume')
        }
    }

    // Watch visibility to start/stop timer
    watch(
        model,
        isVisible => {
            if (isVisible && props.duration > 0) {
                timer.start()
                emits('timer-begin')
            } else {
                // If the model is turned off manually (not by timer), stop the timer
                timer.stop()
            }
        },
        { immediate: true }
    )

    // --- Computed Styles & Classes ---
    const compClasses = computed(() => {
        return ['n-banner', props.inlineActions ? 'n-banner--inline' : '']
    })

    const compBind = computed(() => ({ ...attrs }))

    const compStyles = computed(() => ({
        '--n-banner-duration': `${props.duration}ms`
    }))

    const slotDefaultNodes = computed(() => {
        return wrapTextNode(slots.default?.() ?? [], 'div')
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-banner {
            @apply relative
                flex flex-col gap-2 
                bg-text text-text-invert
                rounded-element
                border-2 border-transparent
                outline-0
                px-4 py-2
                transition-all duration-200 ease-in-out
                overflow-hidden;

            .n-banner-label {
                @apply flex flex-row gap-4 items-center;
            }
            .n-banner-actions {
                @apply flex flex-row gap-4 items-center justify-end;
            }
            &.n-banner--inline {
                @apply flex flex-row gap-4;
            }

            /* --- Progress Bar --- */
            .n-banner-progress {
                @apply absolute bottom-0 left-0 right-0 h-1 
                       w-full bg-current/25;

                .n-banner-progress-bar {
                    @apply h-full w-full origin-left bg-current/50;
                    animation: n-banner-progress-shrink linear forwards;
                    animation-duration: var(--n-banner-duration, 0ms);
                }
            }

            /* Colors & Variants (No changes) */
            &.primary {
                @apply bg-primary text-primary-alt;
            }
            &.success {
                @apply bg-success text-success-alt;
            }
            &.error {
                @apply bg-error text-error-alt;
            }
            &.warning {
                @apply bg-warning text-warning-alt;
            }
            &.info {
                @apply bg-info text-info-alt;
            }

            &.flat {
                @apply bg-current/20 text-current;
                &.primary {
                    @apply bg-primary-alt text-primary;
                }
                &.success {
                    @apply bg-success-alt text-success;
                }
                &.error {
                    @apply bg-error-alt text-error;
                }
                &.warning {
                    @apply bg-warning-alt text-warning;
                }
                &.info {
                    @apply bg-info-alt text-info;
                }
            }

            &.outlined {
                @apply border-2 border-current text-current;
                &:not(.flat) {
                    @apply bg-transparent;
                }
                &.primary {
                    @apply border-primary text-primary;
                }
                &.success {
                    @apply border-success text-success;
                }
                &.error {
                    @apply border-error text-error;
                }
                &.warning {
                    @apply border-warning text-warning;
                }
                &.info {
                    @apply border-info text-info;
                }
            }
        }
    }

    @keyframes n-banner-progress-shrink {
        from {
            transform: scaleX(1);
        }
        to {
            transform: scaleX(0);
        }
    }
</style>
