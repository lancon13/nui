<template>
    <component :is="props.tag" :class="['n-form']" v-bind="compBind" :role="props.tag !== 'form' ? 'form' : undefined">
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
    import { computed, type HTMLAttributes, useAttrs } from 'vue'
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
        const bind = { ...attrs }
        if (props.title && !bind['aria-labelledby']) {
            bind['aria-labelledby'] = titleId
        }
        return bind
    })
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-form {
            @apply w-full flex flex-col gap-4;

            .n-form-title {
                @apply font-bold;
            }
        }
    }
</style>
