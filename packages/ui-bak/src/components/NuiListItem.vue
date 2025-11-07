<template>
    <li :class="compClasses" :tabindex="tabIndex">
        <slot />
    </li>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export interface NuiListItemProps {
        hoverable?: boolean
        focusable?: boolean
        clickable?: boolean
    }

    const props = withDefaults(defineProps<NuiListItemProps>(), {
        hoverable: false,
        focusable: false,
        clickable: false
    })

    const compClasses = computed(() => [
        'nui-list-item',
        {
            'nui-list-item--hoverable': props.hoverable,
            'nui-list-item--focusable': props.focusable,
            'nui-list-item--clickable': props.clickable
        }
    ])

    const tabIndex = computed(() => (props.focusable ? 0 : undefined))
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-list-item {
            @apply flex items-center px-[var(--nui-list-item-padding-x)] py-[var(--nui-list-item-padding-y)] outline-none
                transition-all duration-250 ease-in-out relative;

            &.nui-list-item--hoverable {
                &:hover {
                    @apply bg-muted/50;
                }
            }

            &.nui-list-item--focusable {
                &:focus {
                    /* @apply ring-2 ring-fg/25 ring-inset ring-offset-2 ring-offset-[var(--nui-list-background-color)]; */
                    @apply ring-0 ring-offset-0;
                    @apply bg-muted/50;
                }
            }

            &.nui-list-item--clickable {
                @apply cursor-pointer;
            }
        }
    }
</style>
