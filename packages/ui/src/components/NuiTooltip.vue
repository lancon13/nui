<template>
    <div ref="placeholderRef" style="display: none" />
    <teleport to="body">
        <div
            ref="tooltipRef"
            role="tooltip"
            :class="compClasses"
            :style="compStyles"
            @mouseenter="cancelHide"
            @mouseleave="startHide"
            @focusin="handleFocusIn"
            @focusout="handleFocusOut($event)" >
            <slot>
                <div v-if="html" v-html="html" />
                <div v-else>{{ text }}</div>
            </slot>
        </div>
    </teleport>
</template>

<script lang="ts" setup>
    import {
        computed,
        ref,
        watch,
        onMounted,
        onUnmounted,
        nextTick,
    } from 'vue'

    export interface NuiTooltipProps {
        text?: string
        html?: string
        position?: 'top' | 'bottom' | 'left' | 'right'
        modelValue?: boolean | null
        showDelay?: number
        hideDelay?: number
        persistent?: boolean
        triggerParent?: HTMLElement | string | null
        attachParent?: HTMLElement | string | null
        offset?: [string | number, string | number]
        size?: 'small' | 'medium' | 'large'
    }

    const props = withDefaults(defineProps<NuiTooltipProps>(), {
        text: '',
        html: '',
        position: 'bottom',
        modelValue: null,
        showDelay: 0,
        hideDelay: 125,
        persistent: false,
        triggerParent: null,
        attachParent: null,
        offset: () => [0, 0],
        size: 'medium',
    })

    const emit = defineEmits(['update:modelValue'])

    const tooltipRef = ref<HTMLElement>()
    const placeholderRef = ref<HTMLElement>()
    const isVisible = ref(false)
    const tooltipTop = ref(0)
    const tooltipLeft = ref(0)
    let showTimeoutId: number | undefined
    let hideTimeoutId: number | undefined

    let triggerEl: HTMLElement | null = null
    let attachEl: HTMLElement | null = null

    const startShow = () => {
        if (props.modelValue !== null) return

        if (hideTimeoutId) clearTimeout(hideTimeoutId)
        if (showTimeoutId) clearTimeout(showTimeoutId)

        showTimeoutId = window.setTimeout(() => {
            isVisible.value = true
            emit('update:modelValue', true)
        }, props.showDelay)
    }

    const startHide = () => {
        if (props.modelValue !== null) return
        if (props.persistent) return

        if (showTimeoutId) clearTimeout(showTimeoutId)
        if (hideTimeoutId) clearTimeout(hideTimeoutId)

        hideTimeoutId = window.setTimeout(() => {
            isVisible.value = false
            emit('update:modelValue', false)
        }, props.hideDelay)
    }

    const cancelHide = () => {
        if (hideTimeoutId) clearTimeout(hideTimeoutId)
    }

    const handleFocusIn = () => {
        cancelHide()
    }

    const handleFocusOut = (event: FocusEvent) => {
        const relatedTarget = event.relatedTarget as HTMLElement | null
        if (!tooltipRef.value?.contains(relatedTarget))
            startHide()
    }

    const attachEvents = (element: HTMLElement) => {
        element.addEventListener('mouseenter', startShow)
        element.addEventListener('mouseleave', startHide)
        element.addEventListener('focus', startShow)
        element.addEventListener('blur', startHide)
    }

    const detachEvents = (element: HTMLElement) => {
        element.removeEventListener('mouseenter', startShow)
        element.removeEventListener('mouseleave', startHide)
        element.removeEventListener('focus', startShow)
        element.removeEventListener('blur', startHide)
    }

    const updatePosition = () => {
        if (!attachEl || !tooltipRef.value) return

        const attachRect = attachEl.getBoundingClientRect()
        const tooltipEl = tooltipRef.value
        const margin = 4 // From tailwind 'xs'

        const { position } = props

        let top = 0
        let left = 0

        if (position === 'top') {
            top = attachRect.top + window.scrollY - tooltipEl.offsetHeight - margin
            left = attachRect.left + window.scrollX + attachRect.width / 2
        } else if (position === 'bottom') {
            top = attachRect.bottom + window.scrollY + margin
            left = attachRect.left + window.scrollX + attachRect.width / 2
        } else if (position === 'left') {
            top = attachRect.top + window.scrollY + attachRect.height / 2
            left = attachRect.left + window.scrollX - tooltipEl.offsetWidth - margin
        } else if (position === 'right') {
            top = attachRect.top + window.scrollY + attachRect.height / 2
            left = attachRect.right + window.scrollX + margin
        }

        tooltipTop.value = top
        tooltipLeft.value = left
    }

    onMounted(() => {
        // Determine trigger element
        if (props.triggerParent)
            if (typeof props.triggerParent === 'string')
                triggerEl = document.querySelector(props.triggerParent)
            else triggerEl = props.triggerParent
        else triggerEl = placeholderRef.value?.parentElement || null

        // Determine attach element
        if (props.attachParent)
            if (typeof props.attachParent === 'string')
                attachEl = document.querySelector(props.attachParent)
            else attachEl = props.attachParent
        else attachEl = placeholderRef.value?.parentElement || null

        if (triggerEl) attachEvents(triggerEl)

        window.addEventListener('resize', updatePosition)
        window.addEventListener('scroll', updatePosition, true)
    })

    onUnmounted(() => {
        if (triggerEl) detachEvents(triggerEl)

        window.removeEventListener('resize', updatePosition)
        window.removeEventListener('scroll', updatePosition, true)
    })

    watch(
        () => props.modelValue,
        (value) => {
            if (value !== null) isVisible.value = value
        },
    )

    watch(isVisible, (value) => {
        if (value)
            nextTick(() => {
                updatePosition()
            })
  
    })

    const compClasses = computed(() => [
        'nui-tooltip',
        `nui-tooltip--position-${props.position}`,
        `nui-tooltip--size-${props.size}`,
        {
            'nui-tooltip--visible': isVisible.value,
        },
    ])

    const compStyles = computed(() => {
        const [offsetX, offsetY] = props.offset
        const formatOffset = (val: string | number) =>
            typeof val === 'number' ? `${val}px` : val

        return {
            'top': `${tooltipTop.value}px`,
            'left': `${tooltipLeft.value}px`,
            '--tw-translate-x-offset': formatOffset(offsetX),
            '--tw-translate-y-offset': formatOffset(offsetY),
        }
    })

    const show = () => {
        isVisible.value = true
        emit('update:modelValue', true)
    }

    const hide = () => {
        isVisible.value = false
        emit('update:modelValue', false)
    }
    defineExpose({ show, hide })
</script>

<style lang="css">
@import 'tailwindcss';
@import '../styles/index.css';
@import '../styles/components.css';

@layer components {
  .nui-tooltip {
    @apply absolute z-10
      bg-[var(--nui-tooltip-background-color)] text-[var(--nui-tooltip-text-color)]
      rounded-[var(--nui-tooltip-radius)]
      text-[length:var(--nui-tooltip-font-size)] leading-base
      px-[var(--nui-tooltip-padding-x)] py-[var(--nui-tooltip-padding-y)]
      font-normal
      whitespace-nowrap
      opacity-0
      transition duration-200 ease-in-out;

    /* Visible */
    &.nui-tooltip--visible {
      @apply opacity-100;
    }

    /* Top */
    &.nui-tooltip--position-top {
      @apply translate-x-[calc(-50%+var(--tw-translate-x-offset,0px))] translate-y-[calc(var(--tw-translate-y-offset,0px)+10px)];

      &.nui-tooltip--visible {
        @apply translate-x-[calc(-50%+var(--tw-translate-x-offset,0px))] translate-y-[var(--tw-translate-y-offset,0px)];
      }
    }

    /* Bottom */
    &.nui-tooltip--position-bottom {
      @apply translate-x-[calc(-50%+var(--tw-translate-x-offset,0px))] translate-y-[calc(var(--tw-translate-y-offset,0px)-10px)];

      &.nui-tooltip--visible {
        @apply translate-x-[calc(-50%+var(--tw-translate-x-offset,0px))] translate-y-[var(--tw-translate-y-offset,0px)];
      }
    }

    /* Left */
    &.nui-tooltip--position-left {
      @apply translate-x-[calc(var(--tw-translate-x-offset,0px)+10px)] translate-y-[calc(-50%+var(--tw-translate-y-offset,0px))];

      &.nui-tooltip--visible {
        @apply translate-x-[var(--tw-translate-x-offset,0px)] translate-y-[calc(-50%+var(--tw-translate-y-offset,0px))];
      }
    }

    /* Right */
    &.nui-tooltip--position-right {
      @apply translate-x-[calc(var(--tw-translate-x-offset,0px)-10px)] translate-y-[calc(-50%+var(--tw-translate-y-offset,0px))];

      &.nui-tooltip--visible {
        @apply translate-x-[var(--tw-translate-x-offset,0px)] translate-y-[calc(-50%+var(--tw-translate-y-offset,0px))];
      }
    }
  }
}
</style>