<template>
    <div ref="placeholderRef" class="hidden" />
    <div>{{ floatingStyles }}</div>
    <teleport to="body">
        <div
            v-if="isMounted"
            ref="floatingRef"
            :class="[
                'nui-popover-content',
                `nui-popover--placement-${placementDirection}`,
                { 'nui-popover--visible': isVisible }
            ]"
            :style="floatingStyles"
        >
            <slot />
        </div>
    </teleport>
</template>

<script setup lang="ts">
    import { computed, onUnmounted, ref, watch, nextTick } from 'vue'
    import { onClickOutside } from '@vueuse/core'
    import { autoUpdate, flip, offset, shift, useFloating, type Placement } from '@floating-ui/vue'

    const model = defineModel<boolean>()

    export type NuiPopOverDisplayPosition = 'top' | 'bottom' | 'left' | 'right'
    export type NuiPopOverAnchorPosition = 'start' | 'center' | 'end'

    export interface NuiPopOverProps {
        displayPosition?: NuiPopOverDisplayPosition
        anchorPosition?: NuiPopOverAnchorPosition
        autoReposition?: boolean
        attachParent?: HTMLElement | string | null
        triggerParent?: HTMLElement | string | null
        offset?: [number, number]
        shiftPadding?: number
    }
    const props = withDefaults(defineProps<NuiPopOverProps>(), {
        displayPosition: 'bottom',
        anchorPosition: 'start',
        autoReposition: true,
        attachParent: null,
        triggerParent: null,
        offset: () => [0, 8],
        shiftPadding: 8
    })

    const isMounted = ref(false)
    const isVisible = ref(false)

    const placeholderRef = ref<HTMLElement | null>(null)
    const positionTarget = ref<HTMLElement | null>(null)
    const clickTrigger = ref<HTMLElement | null>(null)
    const floatingRef = ref<HTMLElement | null>(null)

    const placement = computed<Placement>(() => {
        if (props.anchorPosition === 'center') return props.displayPosition
        return `${props.displayPosition}-${props.anchorPosition}`
    })

    const middleware = computed(() => {
        const [cross, main] = props.offset
        const list = [offset({ crossAxis: cross, mainAxis: main })]
        if (props.autoReposition) {
            list.push(flip())
            list.push(shift({ padding: props.shiftPadding }))
        }
        return list
    })

    const {
        x,
        y,
        strategy,
        placement: finalPlacement
    } = useFloating(positionTarget, floatingRef, {
        placement,
        whileElementsMounted: autoUpdate,
        middleware
    })

    const placementDirection = computed(() => finalPlacement.value.split('-')[0])

    const floatingStyles = computed(() => ({
        position: strategy.value,
        top: y.value != null ? `${y.value}px` : '-9999px',
        left: x.value != null ? `${x.value}px` : '-9999px'
    }))

    const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') model.value = false
    }

    watch(model, async value => {
        if (value) {
            isMounted.value = true
            document.addEventListener('keydown', onKeydown)
            await nextTick()
            isVisible.value = true
        } else {
            isVisible.value = false
            document.removeEventListener('keydown', onKeydown)
            setTimeout(() => {
                isMounted.value = false
            }, 250) // NOTE: duration-250
        }
    })

    const toggle = () => {
        model.value = !model.value
    }

    const setup = () => {
        // Clean up old listener
        if (clickTrigger.value) clickTrigger.value.removeEventListener('click', toggle)

        // Determine position target
        let posTarget: HTMLElement | null = null
        if (props.attachParent)
            if (typeof props.attachParent === 'string')
                posTarget = document.querySelector(props.attachParent)
            else posTarget = props.attachParent
        else if (placeholderRef.value) posTarget = placeholderRef.value.parentElement
        positionTarget.value = posTarget

        // Determine click trigger
        let trig: HTMLElement | null = null
        if (props.triggerParent)
            if (typeof props.triggerParent === 'string')
                trig = document.querySelector(props.triggerParent)
            else trig = props.triggerParent
        else if (placeholderRef.value) trig = placeholderRef.value.parentElement
        clickTrigger.value = trig
        clickTrigger.value?.addEventListener('click', toggle)
    }

    // This single watcher handles initial setup and prop changes.
    // It runs after the DOM has been patched, ensuring elements are available.
    watch(() => [props.attachParent, props.triggerParent, placeholderRef.value], setup, {
        flush: 'post'
    })

    onUnmounted(() => {
        if (clickTrigger.value) clickTrigger.value.removeEventListener('click', toggle)
    })

    onClickOutside(
        floatingRef,
        () => {
            model.value = false
        },
        { ignore: [clickTrigger, positionTarget] }
    )
</script>

<style lang="css">
    @import 'tailwindcss';
    @import '../styles/index.css';
    @import '../styles/components.css';

    @layer components {
        .nui-popover-content {
            @apply z-[var(--nui-popover-z-index)] opacity-0 duration-250 ease-in-out transition-opacity transition-transform;
        }

        /* Visible state */
        .nui-popover-content.nui-popover--visible {
            @apply opacity-100;
        }

        /* Top */
        .nui-popover-content.nui-popover--placement-top {
            @apply translate-y-2;
        }

        .nui-popover-content.nui-popover--placement-top.nui-popover--visible {
            @apply translate-y-0;
        }

        /* Bottom */
        .nui-popover-content.nui-popover--placement-bottom {
            @apply -translate-y-2;
        }

        .nui-popover-content.nui-popover--placement-bottom.nui-popover--visible {
            @apply translate-y-0;
        }

        /* Left */
        .nui-popover-content.nui-popover--placement-left {
            @apply translate-x-2;
        }

        .nui-popover-content.nui-popover--placement-left.nui-popover--visible {
            @apply translate-x-0;
        }

        /* Right */
        .nui-popover-content.nui-popover--placement-right {
            @apply -translate-x-2;
        }

        .nui-popover-content.nui-popover--placement-right.nui-popover--visible {
            @apply translate-x-0;
        }
    }
</style>
