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
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { wrapTextNode } from '../helpers/dom'
    import NIcon from './NIcon.vue'
    import NLoading from './NLoading.vue'

    export type NButtonProps = Partial</* @vue-ignore */ HTMLAttributes> & {
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
    }

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NButtonProps>(), {
        tag: 'button',
        type: 'button'
    })

    const compClasses = computed(() => {
        return ['n-button', props.loading ? 'n-button--loading' : '']
    })
    const actualTag = computed(() => {
        if (props.to) return 'RouterLink'
        if (props.href) return 'a'
        return props.tag
    })
    const compBind = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bind: any = { ...attrs }
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
        .n-button {
            @apply relative appearance-none
                cursor-pointer
                inline-flex flex-row gap-2 items-center
                bg-background-invert text-text-invert
                font-semibold leading-none
                rounded-element
                border-2 border-transparent
                outline-0
                px-4 py-2
                transition-all duration-200 ease-in-out;

            /* Interaction States */
            @apply hover:opacity-80;
            @apply disabled:opacity-80 disabled:hover:opacity-80 disabled:cursor-not-allowed;

            &:not(.n-button--loading) {
                @apply disabled:grayscale disabled:contrast-50 disabled:opacity-50 disabled:hover:opacity-50
                    disabled:bg-text disabled:text-text-invert;
            }

            /* Loading State */
            &.n-button--loading {
                @apply disabled:grayscale-0 disabled:contrast-100;
            }

            /* Colors */
            &.brand {
                @apply bg-brand;
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

            /* Icon Button */
            &.icon {
                @apply aspect-square p-2;
            }

            /* Loading Overlay */
            /* Styles handled in NLoading.vue */

            /* Variants */
            &.flat {
                @apply bg-current/20 text-current;

                &.brand {
                    @apply bg-brand-light text-brand;
                }
                &.success {
                    @apply bg-success-light text-success;
                }
                &.error {
                    @apply bg-error-light text-error;
                }
                &.warning {
                    @apply bg-warning-light text-warning;
                }
                &.info {
                    @apply bg-info-light text-info;
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

                &.brand {
                    @apply border-brand text-brand;
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

                &:not(.n-button--loading) {
                    @apply disabled:bg-transparent disabled:border-current disabled:text-current disabled:hover:bg-transparent;
                }
            }

            &.texted {
                @apply bg-transparent text-current
                    hover:bg-current/10;

                &.brand {
                    @apply text-brand;
                }
                &.success {
                    @apply text-success;
                }
                &.error {
                    @apply text-error;
                }
                &.warning {
                    @apply text-warning;
                }
                &.info {
                    @apply text-info;
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
