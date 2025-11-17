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
        <span v-if="props.loading" class="loading-overlay">
            <slot name="loading">
                <n-icon :name="props.loadingIcon" :class="props.loadingIconClass" />
            </slot>
        </span>

        <slot name="prepend"></slot>
        <n-icon
            v-if="props.prependIcon || props.icon"
            :name="(props.prependIcon || props.icon) as string"
            :class="[...(props.iconClass || []), ...(props.prependIconClass || [])]"
        />
        <span v-if="props.label || $slots['default']">
            <slot name="default"><{{ props.label }}</slot>
        </span>
        <n-icon v-if="props.appendIcon" :name="props.appendIcon" :class="props.prependIconClass" />
        <slot name="append"></slot>
    </component>
</template>

<script setup lang="ts">
    import { computed, useAttrs } from 'vue'
    import NIcon from './NIcon.vue'

    defineOptions({
        inheritAttrs: false
    })

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
        return ['n-button', props.loading ? 'loading' : '']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
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
            &:not(.loading) {
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
            &:not(.loading) {
                @apply disabled:bg-text disabled:text-text-invert;
            }

            &.icon {
                @apply aspect-square p-2;
            }

            &.loading {
                @apply disabled:grayscale-0 disabled:contrast-100;
                .loading-overlay {
                    @apply absolute top-0 left-0 w-full h-full flex items-center justify-center;
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
                    @apply bg-primary-bright text-primary;
                }
                &.success {
                    @apply bg-success-bright text-success;
                }
                &.error {
                    @apply bg-error-bright text-error;
                }
                &.warning {
                    @apply bg-warning-bright text-warning;
                }
                &.info {
                    @apply bg-info-bright text-info;
                }
                &:not(.loading) {
                    @apply disabled:bg-current/20 disabled:text-current;
                }
            }

            &.outlined {
                @apply bg-transparent border-2 border-current text-current
                    hover:bg-current/10 hover:opacity-50;
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
                &:not(.loading) {
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

                &.loading {
                    @apply bg-current/10 hover:bg-current/10;
                }
                &:not(.loading) {
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
