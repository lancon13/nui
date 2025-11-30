<template>
    <component
        :is="props.tag"
        :class="compClasses"
        :to="props.to"
        :href="props.href"
        :target="props.target"
        v-bind="compBind"
    >
        <slot v-if="shouldNotAddWrapper" name="default"></slot>
        <template v-else>
            <div class="n-card-body"><slot name="default"> </slot></div>
        </template>

        <slot name="loading">
            <transition name="n-loading-overlay">
                <n-loading v-if="props.loading" :overlay="true" :type="props.loadingType" :class="props.loadingClass" />
            </transition>
        </slot>
    </component>
</template>

<script setup lang="ts">
    import { computed, HTMLAttributes, useAttrs, useSlots } from 'vue'
    import { isVNodeClassContain } from '../helpers/dom'
    import NLoading from './NLoading.vue'

    defineOptions({
        inheritAttrs: false
    })

    export type NCardProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        loading?: boolean
        loadingType?: string
        loadingClass?: string | string[] | object
        clickable?: boolean
        to?: string | object
        href?: string
        target?: string
    }

    const slots = useSlots()
    const attrs = useAttrs()
    const props = withDefaults(defineProps<NCardProps>(), {
        tag: 'div',
        loadingType: 'normal'
    })
    const compClasses = computed(() => {
        return ['n-card', props.loading ? 'n-card--loading' : '', ...(props.clickable ? ['n-card--clickable'] : [])]
    })
    const compBind = computed(() => {
        return {
            ...(props.clickable
                ? { tabindex: 0, role: 'button', to: props.to, href: props.href, target: props.target }
                : {}),
            ...attrs
        }
    })

    const shouldNotAddWrapper = computed(() => {
        const nodes = slots['default']?.() ?? []
        if (nodes.length === 0) return false
        if (nodes.length > 0 && isVNodeClassContain(nodes[0], ['n-card-body'])) return true
        return nodes.length > 1
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-card {
            @apply relative
            bg-surface
            rounded-element
            flex flex-col
            overflow-hidden
            transition-all duration-200 ease-in-out;

            & > .n-card-body {
                @apply px-4 py-4;
                &:has(+ .n-card-footer) {
                    @apply pb-0;
                }

                & > .n-card {
                    @apply bg-surface-indent;
                    & > .n-card-body > .n-card {
                        @apply bg-surface-indent-indent;
                        & > .n-card-body > .n-card {
                            @apply bg-surface-indent-indent-indent;
                            & > .n-card-body > .n-card {
                                @apply bg-surface-indent-indent-indent-indent;
                            }
                        }
                    }
                }
            }

            & > .n-card-header {
                @apply px-4 py-4
                flex flex-row items-center gap-4;
                & + .n-card-body {
                    @apply pt-0;
                }
            }
            & > .n-card-footer {
                @apply px-4 py-4
                flex flex-row items-center gap-4;
            }

            .n-loading-overlay {
                &.n-loading-overlay-enter-active,
                &.n-loading-overlay-leave-active {
                    @apply transition-[opacity,translate] duration-200 ease-in-out;
                }

                &.n-loading-overlay-enter-from,
                &.n-loading-overlay-leave-to {
                    @apply opacity-0;
                }
            }
        }
    }
</style>
