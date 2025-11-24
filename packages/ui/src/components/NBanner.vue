<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind" role="banner">
        <div :class="['n-banner-label', props.labelClass]">
            <slot name="icon">
                <n-icon v-if="props.icon" :name="props.icon" :class="props.iconClass" />
            </slot>
            <template v-for="(node, index) in slotDefaultNodes" :key="index">
                <component :is="node" />
            </template>
        </div>
        <div :class="['n-banner-actions', props.actionsClass]">
            <slot name="actions" />
        </div>
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
            tag?: string
            icon?: string
            iconClass?: string | object | string[]
            labelClass?: string | object | string[]
            actionsClass?: string | object | string[]
            inlineActions?: boolean
        }>(),
        {
            tag: 'div',
            inlineActions: true
        }
    )

    const compClasses = computed(() => {
        return ['n-banner', props.inlineActions ? 'n-banner--inline' : '']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })

    const slotDefaultNodes = computed(() => {
        return wrapTextNode(slots.default?.() ?? [], 'div')
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-banner {
            @apply relative
                flex flex-col gap-2 
                bg-text text-text-invert
                rounded-element
                border-2 border-transparent
                outline-0
                px-4 py-2
                transition-all duration-200 ease-in-out;

            .n-banner-label {
                @apply flex flex-row gap-4 items-center;
            }
            .n-banner-actions {
                @apply flex flex-row gap-4 items-center justify-end;
            }
            &.n-banner--inline {
                @apply flex flex-row gap-4;
            }

            &.primary {
                @apply bg-primary text-primary-alt;
            }
            &.success {
                @apply bg-success text-success-alt;
            }
            &.error {
                @apply bg-error text-error-alt;
            }
            &.warning {
                @apply bg-warning text-warning-alt;
            }
            &.info {
                @apply bg-info text-info-alt;
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
            }

            &.outlined {
                @apply border-2 border-current text-current;
                &:not(.flat) {
                    @apply bg-transparent;
                }
                &.primary {
                    @apply border-primary text-primary;
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
            }
        }
    }
</style>
