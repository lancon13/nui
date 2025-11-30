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
        <span v-if="props.loading" class="n-tab-loading-overlay">
            <slot name="loading">
                <n-loading :type="props.loadingType" :class="props.loadingClass" />
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
    import NLoading from './NLoading.vue'

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(
        defineProps<{
            name: string
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
            loadingType?: string
            loadingClass?: string | string[] | object
            to?: string | object
            href?: string
            target?: string
        }>(),
        {
            tag: 'button',
            type: 'button'
        }
    )

    const compClasses = computed(() => {
        return ['n-tab', props.loading ? 'n-tab--loading' : '']
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
        .n-tab {
            @apply relative appearance-none
                cursor-pointer
                inline-flex flex-row gap-2 items-center
                flex-nowrap
                bg-text text-text-invert
                font-semibold leading-none
                border-2 border-r-0 border-transparent
                outline-0
                px-4 py-2
                transition-all duration-200 ease-in-out;
            @apply hover:opacity-80;
            @apply disabled:opacity-80 disabled:hover:opacity-80 disabled:cursor-not-allowed;
            &:not(.n-tab--loading) {
                @apply disabled:grayscale disabled:contrast-50 disabled:opacity-50 disabled:hover:opacity-50;
            }

            &:first-child {
                @apply rounded-s-element;
            }
            &:last-child {
                @apply rounded-e-element;
            }

            &.n-tab--active {
                @apply border-current bg-bg text-text;
                &:not(.n-tab--loading) {
                    @apply disabled:border-current disabled:bg-bg disabled:text-text;
                }
            }

            .primary &,
            &.primary {
                @apply bg-primary;
                &.n-tab--active {
                    @apply bg-primary/15 text-primary;
                }
            }
            .success &,
            &.success {
                @apply bg-success;
                &.n-tab--active {
                    @apply bg-success/15 text-success;
                }
            }
            .error &,
            &.error {
                @apply bg-error;
                &.n-tab--active {
                    @apply bg-error/15 text-error;
                }
            }
            .warning &,
            &.warning {
                @apply bg-warning;
                &.n-tab--active {
                    @apply bg-warning/15 text-warning;
                }
            }
            .info &,
            &.info {
                @apply bg-info;
                &.n-tab--active {
                    @apply bg-info/15 text-info;
                }
            }
            &:not(.n-tab--loading) {
                @apply disabled:bg-text disabled:text-text-invert;
            }
            &.icon {
                @apply aspect-square p-2;
            }

            &.n-tab--loading {
                @apply disabled:grayscale-0 disabled:contrast-100;
                .n-tab-loading-overlay {
                    @apply absolute top-0 left-0 w-full h-full flex items-center justify-center;
                    .n-icon {
                        @apply animate-spin;
                    }
                    & ~ * {
                        @apply opacity-0;
                    }
                }
            }

            .flat &,
            &.flat {
                @apply bg-current/20 text-current;
                &.n-tab--active {
                    @apply border-text bg-text text-bg;
                    &:not(.n-tab--loading) {
                        @apply disabled:border-text disabled:bg-text disabled:text-bg;
                    }
                }

                .primary &,
                &.primary {
                    @apply bg-primary-alt text-primary;
                    &.n-tab--active {
                        @apply border-primary bg-primary text-bg;
                    }
                }
                .success &,
                &.success {
                    @apply bg-success-alt text-success;
                    &.n-tab--active {
                        @apply border-success bg-success text-bg;
                    }
                }
                .error &,
                &.error {
                    @apply bg-error-alt text-error;
                    &.n-tab--active {
                        @apply border-error bg-error text-bg;
                    }
                }
                .warning &,
                &.warning {
                    @apply bg-warning-alt text-warning;
                    &.n-tab--active {
                        @apply border-warning bg-warning text-bg;
                    }
                }
                .info &,
                &.info {
                    @apply bg-info-alt text-info;
                    &.n-tab--active {
                        @apply border-info bg-info text-bg;
                    }
                }
                &:not(.n-tab--loading) {
                    @apply disabled:bg-current/20 disabled:text-current;
                }
            }

            .outlined &,
            &.outlined {
                @apply border-current text-current
                    hover:bg-current/10 hover:opacity-50;
                &:not(.flat) {
                    @apply bg-transparent;
                }
                &.n-tab--active {
                    @apply border-text bg-text text-bg;
                    &:not(.n-tab--loading) {
                        @apply disabled:border-text disabled:bg-text disabled:text-bg;
                        @apply disabled:hover:bg-text;
                    }
                }

                .primary &,
                &.primary {
                    @apply border-primary text-primary 
                        hover:bg-current/10;
                    &.n-tab--active {
                        @apply border-primary bg-primary text-bg;
                    }
                }

                .success &,
                &.success {
                    @apply border-success text-success
                        hover:bg-current/10;
                    &.n-tab--active {
                        @apply border-success bg-success text-bg;
                    }
                }

                .error &,
                &.error {
                    @apply border-error text-error
                        hover:bg-current/10;
                    &.n-tab--active {
                        @apply border-error bg-error text-bg;
                    }
                }

                .warning &,
                &.warning {
                    @apply border-warning text-warning
                        hover:bg-current/10;
                    &.n-tab--active {
                        @apply border-warning bg-warning text-bg;
                    }
                }

                .info &,
                &.info {
                    @apply border-info text-info
                        hover:bg-current/10;
                    &.n-tab--active {
                        @apply border-info bg-info text-bg;
                    }
                }
                &:not(.n-tab--loading) {
                    @apply disabled:bg-transparent disabled:border-current disabled:text-current disabled:hover:bg-transparent;
                }
            }

            .texted &,
            &.texted {
                @apply bg-transparent text-current
                    hover:bg-current/10;
                &.n-tab--active {
                    @apply border-text bg-text text-bg;
                    &:not(.n-tab--loading) {
                        @apply disabled:border-text disabled:bg-text disabled:text-bg;
                        @apply disabled:hover:bg-text;
                    }
                }

                .primary &,
                &.primary {
                    @apply text-primary
                        hover:bg-current/10;
                    &.n-tab--active {
                        @apply border-primary bg-primary text-bg;
                    }
                }

                .success &,
                &.success {
                    @apply text-success
                        hover:bg-current/10;
                    &.n-tab--active {
                        @apply border-success bg-success text-bg;
                    }
                }

                .error &,
                &.error {
                    @apply text-error
                        hover:bg-current/10;
                    &.n-tab--active {
                        @apply border-error bg-error text-bg;
                    }
                }

                .warning &,
                &.warning {
                    @apply text-warning
                        hover:bg-current/10;
                    &.n-tab--active {
                        @apply border-warning bg-warning text-bg;
                    }
                }

                .info &,
                &.info {
                    @apply text-info
                        hover:bg-current/10;
                    &.n-tab--active {
                        @apply border-info bg-info text-bg;
                    }
                }

                &.shadowed {
                    @apply shadow-none text-shadow-outer;
                }

                &.n-tab--loading {
                    @apply bg-current/10 hover:bg-current/10;
                }
                &:not(.n-tab--loading) {
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
