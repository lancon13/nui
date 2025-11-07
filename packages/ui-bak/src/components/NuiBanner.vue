<template>
    <div :class="compClasses">
        <div class="nui-banner-content" :class="{ 'nui-banner-content--block': !props.inline }">
            <slot name="before" />
            <div class="nui-banner-main">
                <slot name="icon">
                    <nui-icon v-if="props.icon" :name="props.icon" />
                </slot>
                <div class="nui-banner-message">
                    <slot />
                </div>
            </div>
            <slot name="actions">
                <div v-if="props.actions" class="nui-banner-actions">
                    <nui-button
                        v-for="(action, index) in props.actions"
                        :key="index"
                        v-bind="action"
                    />
                </div>
            </slot>
            <slot name="after" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import type { NuiButtonProps } from './NuiButton.vue'
    import NuiButton from './NuiButton.vue'
    import NuiIcon from './NuiIcon.vue'

    export type NuiBannerColor = 'primary' | 'info' | 'success' | 'warning' | 'error' | 'current'

    export interface NuiBannerProps {
        color?: NuiBannerColor
        icon?: string
        actions?: NuiButtonProps[]
        inline?: boolean
        shadow?: boolean
        noRounded?: boolean
    }

    const props = withDefaults(defineProps<NuiBannerProps>(), {
        color: 'current',
        icon: undefined,
        actions: undefined,
        inline: true,
        shadow: false,
        noRounded: false
    })

    const compClasses = computed(() => [
        'nui-banner',
        `nui-banner--color-${props.color}`,
        { 'nui-banner--shadow': props.shadow, 'nui-banner--no-rounded': props.noRounded }
    ])
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-banner {
            @apply rounded-[var(--nui-banner-radius)] p-[var(--nui-banner-padding)];

            &.nui-banner--no-rounded {
                @apply rounded-none;
            }

            .nui-banner-content {
                @apply flex items-center justify-between gap-sm;

                &.nui-banner-content--block {
                    @apply flex-col items-stretch;

                    .nui-banner-actions {
                        @apply self-end;
                    }
                }
            }

            .nui-banner-main {
                @apply flex items-center gap-sm grow;
            }

            .nui-banner-message {
                @apply grow inline-flex flex-nowrap;
            }

            .nui-banner-actions {
                @apply flex items-center gap-sm;
            }

            &.nui-banner--color-primary {
                @apply bg-primary text-input-highlight;
            }
            &.nui-banner--color-info {
                @apply bg-info text-input-highlight;
            }
            &.nui-banner--color-success {
                @apply bg-success text-input-highlight;
            }
            &.nui-banner--color-warning {
                @apply bg-warning text-input-highlight;
            }
            &.nui-banner--color-error {
                @apply bg-error text-input-highlight;
            }
            &.nui-banner--color-current {
                @apply bg-fg text-input-highlight;
            }

            &.nui-banner--shadow {
                @apply shadow-[var(--nui-button-shadow)];
            }
        }
    }
</style>
