<template>
    <component
        :is="props.tag"
        :class="cn('n-form', attrs.class as any)"
        v-bind="compBind"
        :role="props.tag !== 'form' ? 'form' : undefined"
    >
        <slot name="title">
            <component
                :is="props.titleTag"
                v-if="props.title"
                :id="titleId"
                :class="['n-form-title', props.titleClass]"
            >
                {{ props.title }}
            </component>
        </slot>
        <slot name="message">
            <n-banner v-if="props.message" :icon="bannerIcon" :class="props.status">
                {{ props.message }}
            </n-banner>
        </slot>
        <slot />
    </component>
</template>

<script setup lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
    import { computed, type HTMLAttributes, useAttrs } from 'vue'
    import { cn } from '../helpers/classes'
    import { generatePseudoRandomKey } from '../helpers/tools'
    import NBanner from './NBanner.vue'

    const statusIcons: Record<string, string> = {
        success: 'mdi-check-circle',
        error: 'mdi-close-circle',
        info: 'mdi-information',
        warning: 'mdi-alert-circle'
    }

    export type NFormProps = Partial</* @vue-ignore */ HTMLAttributes> & {
        tag?: string
        title?: string
        titleTag?: string
        titleClass?: string | string[] | object
        message?: string
        status?: 'success' | 'error' | 'warning' | 'info'
    }

    defineOptions({
        inheritAttrs: false
    })

    const attrs = useAttrs()
    const props = withDefaults(defineProps<NFormProps>(), {
        tag: 'form',
        titleTag: 'h1',
        status: 'info'
    })

    const titleId = `n-form-title-${generatePseudoRandomKey()}`
    const bannerIcon = computed(() => statusIcons[props.status] || '')

    const compBind = computed(() => {
        const { class: _, ...bind } = attrs as any
        if (props.title && !bind['aria-labelledby']) {
            bind['aria-labelledby'] = titleId
        }
        return bind
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/components-index.css';

    @layer components {
        .n-form {
            @apply w-full flex flex-col gap-4;

            .n-form-title {
                @apply font-bold;
            }
        }
    }
</style>
