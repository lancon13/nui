<template>
    <div ref="placeholderRef" class="hidden" />
    <teleport to="body">
        <transition name="nui-popover-fade">
            <div
                v-if="model"
                ref="floatingRef"
                class="nui-popover-content"
                :style="floatingStyles"
            >
                <slot />
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
    import { computed, onUnmounted, ref, watch } from 'vue'
    import { onClickOutside } from '@vueuse/core'
    import { autoUpdate, flip, offset, shift, useFloating, type Placement } from '@floating-ui/vue'
    
    const model = defineModel<boolean>()
    
    export type NuiPopOverDisplayPosition = 'top' | 'bottom' | 'left' | 'right'
    export type NuiPopOverAnchorPosition = 'start' | 'center' | 'end'

    export interface NuiPopOverProps {
        displayPosition?: NuiPopOverDisplayPosition
        anchorPosition?: NuiPopOverAnchorPosition
        offset?: [number, number]
        autoReposition?: boolean
        attachParent?: HTMLElement | string | null
        triggerParent?: HTMLElement | string | null
        shiftPadding?: number
    }
    const props = withDefaults(defineProps<NuiPopOverProps>(), {
        displayPosition: 'bottom',
        anchorPosition: 'start',
        offset: () => [0, 8],
        autoReposition: true,
        attachParent: null,
        triggerParent: null,
        shiftPadding: 8,
    })
    const placeholderRef = ref<HTMLElement | null>(null)
    const positionTarget = ref<HTMLElement | null>(null)
    const clickTrigger = ref<HTMLElement | null>(null)
    const floatingRef = ref<HTMLElement | null>(null)

    const placement = computed<Placement>(() => {
        if (props.anchorPosition === 'center')
            return props.displayPosition
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

    const { x, y, strategy } = useFloating(positionTarget, floatingRef, {
        placement,
        whileElementsMounted: autoUpdate,
        middleware,
    })

    const floatingStyles = computed(() => ({
        position: strategy.value,
        top: y.value != null ? `${y.value}px` : '',
        left: x.value != null ? `${x.value}px` : '',
    }))

    const toggle = () => {
        model.value = !model.value
    }

    const setup = () => {

        // Clean up old listener
        if (clickTrigger.value)
            clickTrigger.value.removeEventListener('click', toggle)

        // Determine position target
        let posTarget: HTMLElement | null = null
        if (props.attachParent)
            if (typeof props.attachParent === 'string')
                posTarget = document.querySelector(props.attachParent)
            else
                posTarget = props.attachParent
        else if (placeholderRef.value)
            posTarget = placeholderRef.value.parentElement
        positionTarget.value = posTarget



        // Determine click trigger
        let trig: HTMLElement | null = null
        if (props.triggerParent)
            if (typeof props.triggerParent === 'string')
                trig = document.querySelector(props.triggerParent)
            else
                trig = props.triggerParent
        else if (placeholderRef.value)
            trig = placeholderRef.value.parentElement
        clickTrigger.value = trig
        clickTrigger.value?.addEventListener('click', toggle)
    }

    // This single watcher handles initial setup and prop changes.
    // It runs after the DOM has been patched, ensuring elements are available.
    watch(
        () => [props.attachParent, props.triggerParent, placeholderRef.value],
        setup,
        { flush: 'post' },
    )

    onUnmounted(() => {
        if (clickTrigger.value)
            clickTrigger.value.removeEventListener('click', toggle)
    })

    onClickOutside(floatingRef, () => {
        model.value = false
    }, { ignore: [clickTrigger, positionTarget] })

    const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape')
            model.value = false
    }

    watch(model, (value) => {
        if (value)
            document.addEventListener('keydown', onKeydown)
        else
            document.removeEventListener('keydown', onKeydown)
    })



</script>

<style lang="css">
@import "tailwindcss";
@import "../styles/index.css";
@import "../styles/components.css";

@layer components {
    .nui-popover-content {
        @apply z-[var(--nui-popover-z-index)];
    }

    .nui-popover-fade-enter-active,
    .nui-popover-fade-leave-active {
        @apply transition-opacity duration-250 ease-in-out;
    }

    .nui-popover-fade-enter-from,
    .nui-popover-fade-leave-to {
        @apply opacity-0;
    }
}
</style>
