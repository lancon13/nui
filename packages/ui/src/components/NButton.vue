<template>
    <component
        :is="props.tag"
        :class="compClasses"
        :to="props.to"
        :href="props.href"
        :target="props.target"
        :type="props.type"
        :disabled="attrs.disabled || props.loading"
        v-bind="compBind"
    >
        <span v-if="props.loading" class="n-button-loading-overlay">
            <slot name="loading">
                <n-icon :name="props.loadingIcon" :class="props.loadingIconClass" />
            </slot>
        </span>

        <slot name="prepend"></slot>
        <n-icon
            v-if="props.prependIcon || props.icon"
            :name="(props.prependIcon || props.icon) as string"
            :class="[
                ...(props.iconClass
                    ? ['string', 'object'].includes(typeof props.iconClass)
                        ? [props.iconClass]
                        : (props.iconClass as string[])
                    : []),
                ...(props.prependIconClass
                    ? ['string', 'object'].includes(typeof props.prependIconClass)
                        ? [props.prependIconClass]
                        : (props.prependIconClass as string[])
                    : [])
            ]"
        />

        <span v-if="props.label">{{ props.label }}</span>
        <template v-for="(node, index) in slotDefaultNodes" :key="index">
            <component :is="node" />
        </template>

        <n-icon v-if="props.appendIcon" :name="props.appendIcon" :class="props.prependIconClass" />
        <slot name="append"></slot>
    </component>
</template>

<script setup lang="ts">
    import { computed, useAttrs, useSlots } from 'vue'
    import { wrapTextNode } from '../helpers/dom'
    import NIcon from './NIcon.vue'

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(
        defineProps<{
            icon?: string
            iconClass?: string | object | string[]
            prependIcon?: string
            prependIconClass?: string | object | string[]
            appendIcon?: string
            appendIconClass?: string | object | string[]
            label?: string
            tag?: string
            type?: string
            loading?: boolean
            loadingIcon?: string
            loadingIconClass?: string | string[] | object
            to?: string | object
            href?: string
            target?: string
        }>(),
        {
            tag: 'button',
            type: 'button',
            loadingIcon: 'loading'
        }
    )

    const compClasses = computed(() => {
        return ['n-button', props.loading ? 'n-button--loading' : '']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })
    const slotDefaultNodes = computed(() => {
        return wrapTextNode(slots.default?.() ?? [], 'span')
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-button {
            @apply relative appearance-none
                cursor-pointer
                inline-flex flex-row gap-2 items-center
                bg-text text-text-invert
                font-semibold leading-none
                rounded-element
                border-2 border-transparent
                outline-0
                px-4 py-2
                transition-all duration-200 ease-in-out;
            @apply hover:opacity-80;
            @apply disabled:opacity-80 disabled:hover:opacity-80 disabled:cursor-not-allowed;
            &:not(.n-button--loading) {
                @apply disabled:grayscale disabled:contrast-50 disabled:opacity-50 disabled:hover:opacity-50;
            }

            &.primary {
                @apply bg-primary;
            }
            &.success {
                @apply bg-success;
            }
            &.error {
                @apply bg-error;
            }
            &.warning {
                @apply bg-warning;
            }
            &.info {
                @apply bg-info;
            }
            &:not(.n-button--loading) {
                @apply disabled:bg-text disabled:text-text-invert;
            }

            &.icon {
                @apply aspect-square p-2;
            }

            &.n-button--loading {
                @apply disabled:grayscale-0 disabled:contrast-100;
                .n-button-loading-overlay {
                    @apply absolute top-0 left-0 w-full h-full flex items-center justify-center z-10;
                    .n-icon {
                        @apply animate-spin;
                    }
                    & ~ * {
                        @apply opacity-0;
                    }
                }
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
                &:not(.n-button--loading) {
                    @apply disabled:bg-current/20 disabled:text-current;
                }
            }

            &.outlined {
                @apply border-2 border-current text-current
                    hover:bg-current/10 hover:opacity-50;
                &:not(.flat) {
                    @apply bg-transparent;
                }
                &.primary {
                    @apply border-primary text-primary 
                        hover:bg-current/10;
                }
                &.success {
                    @apply border-success text-success
                        hover:bg-current/10;
                }
                &.error {
                    @apply border-error text-error
                        hover:bg-current/10;
                }
                &.warning {
                    @apply border-warning text-warning
                        hover:bg-current/10;
                }
                &.info {
                    @apply border-info text-info
                        hover:bg-current/10;
                }
                &:not(.n-button--loading) {
                    @apply disabled:bg-transparent disabled:border-current disabled:text-current disabled:hover:bg-transparent;
                }
            }

            &.texted {
                @apply bg-transparent text-current
                    hover:bg-current/10;
                &.primary {
                    @apply text-primary
                        hover:bg-current/10;
                }
                &.success {
                    @apply text-success
                        hover:bg-current/10;
                }
                &.error {
                    @apply text-error
                        hover:bg-current/10;
                }
                &.warning {
                    @apply text-warning
                        hover:bg-current/10;
                }
                &.info {
                    @apply text-info
                        hover:bg-current/10;
                }

                &.shadowed {
                    @apply shadow-none text-shadow-outer;
                }

                &.n-button--loading {
                    @apply bg-current/10 hover:bg-current/10;
                }
                &:not(.n-button--loading) {
                    @apply disabled:bg-transparent disabled:text-current disabled:hover:bg-transparent;
                }
            }

            &:has(.n-avatar) {
                @apply p-0;
                .n-avatar {
                    @apply bg-transparent text-current;
                }
            }
        }
    }
</style>
