<template>
    <component
        :is="props.tag"
        :class="compClasses"
        :to="props.to"
        :href="props.href"
        :target="props.target"
        v-bind="compBind"
    >
        <span v-if="props.loading && props.loadingType" class="n-card-loading-overlay">
            <slot name="loading">
                <n-loading :type="props.loadingType" :size="props.loadingSize" :class="props.loadingClass" />
            </slot>
        </span>

        <slot v-if="shouldNotAddWrapper" name="default"></slot>
        <template v-else>
            <div class="n-card-body"><slot name="default"> </slot></div>
        </template>
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
        loadingSize?: string
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

            &.n-card--loading {
                .n-card-loading-overlay {
                    @apply absolute top-0 left-0 w-full h-full flex items-center justify-center z-10;
                    & ~ * {
                        @apply opacity-50;
                    }
                }
            }
        }
    }
</style>
