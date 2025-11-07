<template>
    <div :class="compClasses">
        <slot v-if="!props.dot" />
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export type NuiBadgePosition = 'top' | 'center' | 'bottom'
    export type NuiBadgeDirection = 'left' | 'right'
    export type NuiBadgeColor = 'primary' | 'info' | 'success' | 'warning' | 'error' | 'current'
    export type NuiBadgeVariant = 'solid' | 'flat' | 'outlined' | 'text'

    export interface NuiBadgeProps {
        color?: NuiBadgeColor
        variant?: NuiBadgeVariant
        position?: NuiBadgePosition
        direction?: NuiBadgeDirection
        dot?: boolean
        pilled?: boolean
    }

    const props = withDefaults(defineProps<NuiBadgeProps>(), {
        color: 'current',
        variant: 'solid',
        position: 'center',
        dot: false,
        pilled: false
    })

    const compClasses = computed(() => [
        'nui-badge',
        `nui-badge--color-${props.color}`,
        `nui-badge--variant-${props.variant}`,
        { 'nui-badge--dot': props.dot, 'nui-badge--pilled': props.pilled },
        props.direction ? 'nui-badge--attached' : '',
        props.direction ? `nui-badge--position-${props.position}` : '',
        props.direction ? `nui-badge--direction-${props.direction}` : ''
    ])
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-badge {
            @apply inline-flex items-center justify-center 
                font-[var(--nui-badge-font-weight)] text-[length:var(--nui-badge-font-size)] leading-[var(--nui-badge-font-size)] 
                rounded-[var(--nui-badge-radius)]
                min-h-[var(--nui-badge-size)] min-w-[var(--nui-badge-size)]
                px-[var(--nui-badge-padding-x)] py-[var(--nui-badge-padding-y)];

            &.nui-badge-shake {
                @apply [animation:nui-badge-shake_0.82s_cubic-bezier(0.36,0.07,0.19,0.97)_both];
            }

            &.nui-badge--variant-solid {
                &.nui-badge--color-primary {
                    @apply bg-primary text-input-highlight;
                }
                &.nui-badge--color-info {
                    @apply bg-info text-input-highlight;
                }
                &.nui-badge--color-success {
                    @apply bg-success text-input-highlight;
                }
                &.nui-badge--color-warning {
                    @apply bg-warning text-input-highlight;
                }
                &.nui-badge--color-error {
                    @apply bg-error text-input-highlight;
                }
                &.nui-badge--color-current {
                    @apply bg-fg text-input-highlight;
                }
            }

            &.nui-badge--variant-flat {
                @apply border-transparent;
                &.nui-badge--color-primary {
                    @apply text-primary bg-primary/20;
                }
                &.nui-badge--color-success {
                    @apply text-success bg-success/20;
                }
                &.nui-badge--color-error {
                    @apply text-error bg-error/20;
                }
                &.nui-badge--color-warning {
                    @apply text-warning bg-warning/20;
                }
                &.nui-badge--color-info {
                    @apply text-info bg-info/20;
                }
                &.nui-badge--color-current {
                    @apply text-current bg-current/20;
                }
            }

            &.nui-badge--variant-outlined {
                @apply bg-transparent border-[length:var(--nui-badge-border-size)];
                &.nui-badge--color-primary {
                    @apply border-primary text-primary;
                }
                &.nui-badge--color-success {
                    @apply border-success text-success;
                }
                &.nui-badge--color-error {
                    @apply border-error text-error;
                }
                &.nui-badge--color-warning {
                    @apply border-warning text-warning;
                }
                &.nui-badge--color-info {
                    @apply border-info text-info;
                }
                &.nui-badge--color-current {
                    @apply border-current text-current;
                }
            }

            &.nui-badge--variant-text {
                @apply border-transparent bg-transparent;
                &.nui-badge--color-primary {
                    @apply text-primary;
                }
                &.nui-badge--color-info {
                    @apply text-info;
                }
                &.nui-badge--color-success {
                    @apply text-success;
                }
                &.nui-badge--color-warning {
                    @apply text-warning;
                }
                &.nui-badge--color-error {
                    @apply text-error;
                }
                &.nui-badge--color-current {
                    @apply text-current;
                }
            }

            &.nui-badge--pilled {
                @apply rounded-s-full rounded-e-full;
            }

            &.nui-badge--dot {
                @apply p-0 h-[var(--nui-badge-dot-size)] w-[var(--nui-badge-dot-size)] min-h-0 min-w-0;
            }

            &.nui-badge--attached {
                @apply absolute z-10;

                &.nui-badge--position-top {
                    @apply top-0;
                }
                &.nui-badge--position-center {
                    @apply top-1/2;
                }
                &.nui-badge--position-bottom {
                    @apply bottom-0;
                }
                &.nui-badge--direction-left {
                    @apply left-0;
                }
                &.nui-badge--direction-right {
                    @apply right-0;
                }

                &.nui-badge--position-top.nui-badge--direction-right {
                    --nui-badge-pos-translate-x: var(--nui-badge-translate-x);
                    --nui-badge-pos-translate-y: var(--nui-badge-translate-y);
                    transform: translate(
                        var(--nui-badge-pos-translate-x),
                        var(--nui-badge-pos-translate-y)
                    );
                }
                &.nui-badge--position-top.nui-badge--direction-left {
                    --nui-badge-pos-translate-x: calc(-1 * var(--nui-badge-translate-x));
                    --nui-badge-pos-translate-y: var(--nui-badge-translate-y);
                    transform: translate(
                        var(--nui-badge-pos-translate-x),
                        var(--nui-badge-pos-translate-y)
                    );
                }
                &.nui-badge--position-bottom.nui-badge--direction-right {
                    --nui-badge-pos-translate-x: var(--nui-badge-translate-x);
                    --nui-badge-pos-translate-y: calc(-1 * var(--nui-badge-translate-y));
                    transform: translate(
                        var(--nui-badge-pos-translate-x),
                        var(--nui-badge-pos-translate-y)
                    );
                }
                &.nui-badge--position-bottom.nui-badge--direction-left {
                    --nui-badge-pos-translate-x: calc(-1 * var(--nui-badge-translate-x));
                    --nui-badge-pos-translate-y: calc(-1 * var(--nui-badge-translate-y));
                    transform: translate(
                        var(--nui-badge-pos-translate-x),
                        var(--nui-badge-pos-translate-y)
                    );
                }
                &.nui-badge--position-center.nui-badge--direction-right {
                    --nui-badge-pos-translate-x: var(--nui-badge-translate-x);
                    --nui-badge-pos-translate-y: -50%;
                    transform: translate(
                        var(--nui-badge-pos-translate-x),
                        var(--nui-badge-pos-translate-y)
                    );
                }
                &.nui-badge--position-center.nui-badge--direction-left {
                    --nui-badge-pos-translate-x: calc(-1 * var(--nui-badge-translate-x));
                    --nui-badge-pos-translate-y: -50%;
                    transform: translate(
                        var(--nui-badge-pos-translate-x),
                        var(--nui-badge-pos-translate-y)
                    );
                }
            }
        }
    }
</style>
