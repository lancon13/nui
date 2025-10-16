<template>
    <component
        :is="props.tag"
        :class="compClasses"
        :href="props.tag === 'a' ? props.href : undefined"
        :target="props.tag === 'a' ? props.target : undefined"
        :to="props.tag !== 'div' ? props.to : undefined"
        @click="() => emits('click')"
        @focus="() => emits('focus')"
        @blur="() => emits('blur')"
    >
        <slot name="content">
            <slot name="media" />

            <header v-if="$slots.header" class="nui-card--header">
                <slot name="header" />
            </header>
            <main class="nui-card--content">
                <slot />
            </main>
            <footer v-if="$slots.footer" class="nui-card--footer">
                <slot name="footer" />
            </footer>
        </slot>
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export interface NuiCardProps {
        shadow?: boolean
        bordered?: boolean
        clickable?: boolean
        tag?: string
        to?: string | object
        href?: string
        target?: string
    }

    const props = withDefaults(defineProps<NuiCardProps>(), {
        shadow: true,
        bordered: false,
        clickable: false,
        tag: 'div'
    })

    const emits = defineEmits<{
        // eslint-disable-next-line no-unused-vars
        (event: 'click'): void
        // eslint-disable-next-line no-unused-vars
        (event: 'focus'): void
        // eslint-disable-next-line no-unused-vars
        (event: 'blur'): void
    }>()

    const compClasses = computed(() => [
        'nui-card',
        { 'nui-card--shadow': props.shadow },
        { 'nui-card--bordered': props.bordered },
        { 'nui-card--clickable': props.clickable }
    ])
</script>

<style lang="css">
    @import 'tailwindcss';
    @import '../styles/index.css';
    @import '../styles/components.css';

    @layer components {
        .nui-card {
            @apply flex flex-col bg-[var(--nui-card-background-color)] rounded-[var(--nui-card-radius)] overflow-hidden
            transition-all duration-250 ease-in-out;

            &.nui-card--shadow {
                @apply shadow-[var(--nui-card-shadow)];
            }

            &.nui-card--bordered {
                @apply border-solid border-[length:var(--nui-card-border-size)] border-[var(--nui-card-border-color)];
            }

            &.nui-card--clickable {
                @apply cursor-pointer
                    hover:shadow-[var(--nui-card-shadow-hover)] hover:-translate-y-px
                    focus:shadow-[var(--nui-card-shadow-hover)]
                    focus-visible:shadow-[var(--nui-card-shadow-hover)];
            }

            .nui-card--header {
                @apply flex justify-between gap-sm px-[var(--nui-card-padding)] pt-[var(--nui-card-padding)];
            }
            .nui-card--content {
                @apply p-[var(--nui-card-padding)] flex-grow;
            }
            .nui-card--footer {
                @apply flex justify-end gap-sm px-[var(--nui-card-padding)] pb-[var(--nui-card-padding)];
            }
        }
    }
</style>
