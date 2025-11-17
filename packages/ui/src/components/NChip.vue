<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <slot name="prepend"></slot>
        <n-icon v-if="props.prependIcon || props.icon" :name="(props.prependIcon || props.icon) as string" />
        <span v-if="props.label || $slots['default']">
            <slot name="default"><{{ props.label }}</slot>
        </span>
        <n-icon v-if="props.appendIcon" :name="props.appendIcon" />
        <slot name="append"></slot>
        <slot v-if="props.removable" name="removable">
            <n-icon name="close" :class="props.removableClass" clickable @click="handleRemovableClick" />
        </slot>
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
            prependIcon?: string
            appendIcon?: string
            tag?: string
            label?: string
            removable?: boolean
            removableClass?: string | string[] | object
            clickable?: boolean
            to?: string | object
            href?: string
            target?: string
        }>(),
        {
            tag: 'span',
            href: '#'
        }
    )
    const emits = defineEmits<{
        remove: []
    }>()

    const compClasses = computed(() => {
        return ['n-chip', ...(props.clickable ? ['n-chip--clickable'] : [])]
    })
    const compBind = computed(() => {
        return {
            ...(props.clickable
                ? { tabindex: 0, role: 'button', to: props.to, href: props.href, target: props.target }
                : {}),
            ...attrs
        }
    })

    function handleRemovableClick() {
        emits('remove')
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-chip {
            @apply relative leading-none
                inline-flex flex-row gap-2 items-center
                bg-text text-text-invert 
                text-center
                px-2 py-1
                rounded-element;

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
            }

            &.outlined {
                @apply bg-transparent border-2 border-current text-current;
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

            &.texted {
                @apply bg-transparent text-current;
                &.primary {
                    @apply text-primary;
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
            }
        }
    }
</style>
