<template>
    <component
        :is="actualTag"
        :class="compClasses"
        :type="props.type"
        :disabled="attrs.disabled || props.loading"
        :aria-disabled="attrs.disabled || props.loading ? 'true' : undefined"
        :aria-busy="props.loading ? 'true' : undefined"
        v-bind="compBind"
    >
        <slot name="loading">
            <transition name="n-loading-overlay">
                <n-loading
                    v-if="props.loading"
                    :overlay="true"
                    :name="props.loadingName"
                    :class="props.loadingClass"
                    aria-hidden="true"
                />
            </transition>
        </slot>

        <slot name="prepend"></slot>
        <n-icon
            v-if="props.prependIcon || props.icon"
            :name="(props.prependIcon || props.icon) as string"
            :class="iconClasses"
            aria-hidden="true"
        />

        <span v-if="props.label">{{ props.label }}</span>
        <template v-for="(node, index) in slotDefaultNodes" :key="index">
            <component :is="node" />
        </template>

        <n-icon v-if="props.appendIcon" :name="props.appendIcon" :class="props.appendIconClass" aria-hidden="true" />
        <slot name="append"></slot>
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { computed, useAttrs, useSlots } from 'vue'
    import { resolveClassProp, wrapTextNode } from '../helpers/dom'
    import { cn } from '../helpers/classes'
    import NIcon from './NIcon.vue'
    import NLoading from './NLoading.vue'

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(
        defineProps<{
            name?: string
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
            loadingName?: string
            loadingClass?: string | string[] | object
            to?: string | object
            href?: string
            target?: string
        }>(),
        {
            tag: 'button',
            type: 'button',
            loadingName: 'loading'
        }
    )

    const compClasses = computed(() => {
        return cn('n-tab', props.loading ? 'n-tab--loading' : '', attrs.class as any)
    })
    const actualTag = computed(() => {
        if (props.to) return 'RouterLink'
        if (props.href) return 'a'
        return props.tag
    })
    const iconClasses = computed(() => resolveClassProp(props.iconClass, props.prependIconClass))

    const compBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { class: _, ...bind } = attrs as any
        if (actualTag.value === 'RouterLink') {
            bind.to = props.to
            bind.target = props.target
        } else if (actualTag.value === 'a') {
            bind.href = props.href
            bind.target = props.target
        }
        return bind
    })
    const slotDefaultNodes = computed(() => {
        return wrapTextNode(slots.default?.() ?? [], 'span')
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/components-index.css';

    @layer components {
        .n-tab {
            /* Base */
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
                @apply disabled:grayscale disabled:contrast-50 disabled:opacity-50 disabled:hover:opacity-50
                    disabled:bg-text disabled:text-text-invert;
            }

            &:first-child {
                @apply rounded-s-element;
            }
            &:last-child {
                @apply rounded-e-element;
            }

            /* Active State */
            &.n-tab--active {
                @apply border-current bg-background text-text;
                &:not(.n-tab--loading) {
                    @apply disabled:border-current disabled:bg-background disabled:text-text;
                }
            }

            /* Colors (Solid) */
            &.brand,
            .brand & {
                @apply bg-brand;
                &.n-tab--active {
                    @apply bg-brand/15 text-brand;
                }
            }
            &.success,
            .success & {
                @apply bg-success;
                &.n-tab--active {
                    @apply bg-success/15 text-success;
                }
            }
            &.error,
            .error & {
                @apply bg-error;
                &.n-tab--active {
                    @apply bg-error/15 text-error;
                }
            }
            &.warning,
            .warning & {
                @apply bg-warning;
                &.n-tab--active {
                    @apply bg-warning/15 text-warning;
                }
            }
            &.info,
            .info & {
                @apply bg-info;
                &.n-tab--active {
                    @apply bg-info/15 text-info;
                }
            }

            /* Icon Variant */
            &.icon {
                @apply aspect-square p-2;
            }

            /* Loading State */
            &.n-tab--loading {
                @apply disabled:grayscale-0 disabled:contrast-100;
            }
            .n-loading-overlay {
                & ~ * {
                    @apply opacity-0;
                }
                /* Transition styles handled in NLoading.vue */
            }

            /* Variant: Flat */
            &.flat,
            .flat & {
                @apply bg-current/20 text-current;
                &.n-tab--active {
                    @apply border-text bg-text text-text-invert;
                    &:not(.n-tab--loading) {
                        @apply disabled:border-text disabled:bg-text disabled:text-text-invert;
                    }
                }

                &.brand,
                .brand & {
                    @apply bg-brand-light text-brand;
                    &.n-tab--active {
                        @apply border-brand bg-brand text-text-invert;
                    }
                }
                &.success,
                .success & {
                    @apply bg-success-light text-success;
                    &.n-tab--active {
                        @apply border-success bg-success text-text-invert;
                    }
                }
                &.error,
                .error & {
                    @apply bg-error-light text-error;
                    &.n-tab--active {
                        @apply border-error bg-error text-text-invert;
                    }
                }
                &.warning,
                .warning & {
                    @apply bg-warning-light text-warning;
                    &.n-tab--active {
                        @apply border-warning bg-warning text-text-invert;
                    }
                }
                &.info,
                .info & {
                    @apply bg-info-light text-info;
                    &.n-tab--active {
                        @apply border-info bg-info text-text-invert;
                    }
                }

                &:not(.n-tab--loading) {
                    @apply disabled:bg-current/20 disabled:text-current;
                }
            }

            /* Variant: Outlined */
            &.outlined,
            .outlined & {
                @apply border-current text-current hover:bg-current/10 hover:opacity-50;
                &:not(.flat) {
                    @apply bg-transparent;
                }
                &.n-tab--active {
                    @apply border-text bg-text text-text-invert;
                    &:not(.n-tab--loading) {
                        @apply disabled:border-text disabled:bg-text disabled:text-text-invert disabled:hover:bg-text;
                    }
                }

                &.brand,
                .brand & {
                    @apply border-brand text-brand;
                    &.n-tab--active {
                        @apply border-brand bg-brand text-text-invert;
                    }
                }
                &.success,
                .success & {
                    @apply border-success text-success;
                    &.n-tab--active {
                        @apply border-success bg-success text-text-invert;
                    }
                }
                &.error,
                .error & {
                    @apply border-error text-error;
                    &.n-tab--active {
                        @apply border-error bg-error text-text-invert;
                    }
                }
                &.warning,
                .warning & {
                    @apply border-warning text-warning;
                    &.n-tab--active {
                        @apply border-warning bg-warning text-text-invert;
                    }
                }
                &.info,
                .info & {
                    @apply border-info text-info;
                    &.n-tab--active {
                        @apply border-info bg-info text-text-invert;
                    }
                }

                &:not(.n-tab--loading) {
                    @apply disabled:bg-transparent disabled:border-current disabled:text-current disabled:hover:bg-transparent;
                }
            }

            /* Variant: Texted */
            &.texted,
            .texted & {
                @apply bg-transparent text-current hover:bg-current/10;
                &.n-tab--active {
                    @apply border-text bg-text text-text-invert;
                    &:not(.n-tab--loading) {
                        @apply disabled:border-text disabled:bg-text disabled:text-text-invert disabled:hover:bg-text;
                    }
                }

                &.brand,
                .brand & {
                    @apply text-brand;
                    &.n-tab--active {
                        @apply border-brand bg-brand text-text-invert;
                    }
                }
                &.success,
                .success & {
                    @apply text-success;
                    &.n-tab--active {
                        @apply border-success bg-success text-text-invert;
                    }
                }
                &.error,
                .error & {
                    @apply text-error;
                    &.n-tab--active {
                        @apply border-error bg-error text-text-invert;
                    }
                }
                &.warning,
                .warning & {
                    @apply text-warning;
                    &.n-tab--active {
                        @apply border-warning bg-warning text-text-invert;
                    }
                }
                &.info,
                .info & {
                    @apply text-info;
                    &.n-tab--active {
                        @apply border-info bg-info text-text-invert;
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

            /* Avatar Integration */
            &:has(.n-avatar) {
                @apply p-0;
                .n-avatar {
                    @apply bg-transparent text-current;
                }
            }
        }
    }
</style>
