<template>
    <component
        :is="props.tag"
        ref="tabListRef"
        :class="compClasses"
        v-bind="compBind"
        role="tablist"
        @keydown="handleKeydown"
    >
        <template v-for="(node, index) in slotDefaultNodes" :key="index">
            <component
                :is="node"
                :id="getTabId(node, index)"
                :ref="(el: any) => setTabRef(el, index)"
                :class="[isActive(node) ? 'n-tab--active' : '']"
                role="tab"
                :aria-selected="isActive(node) ? 'true' : 'false'"
                :tabindex="isActive(node) ? 0 : -1"
                @click="() => handleTabNodeClick(node)"
            />
        </template>
    </component>
</template>

<script setup lang="ts">
    import { computed, ref, useAttrs, useSlots, VNode, type ComponentPublicInstance } from 'vue'
    import { isVNodeNameContain } from '../helpers/dom'
    import { generatePseudoRandomKey } from '../helpers/tools'

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const model = defineModel<string | string[]>()
    const props = withDefaults(
        defineProps<{
            tag?: string
            multiple?: boolean
        }>(),
        {
            tag: 'div',
            multiple: false
        }
    )

    const tabsId = generatePseudoRandomKey()
    const tabRefs = ref<HTMLElement[]>([])
    const tabListRef = ref<HTMLElement | null>(null)

    const compClasses = computed(() => {
        return ['n-tabs']
    })
    const compBind = computed(() => {
        return {
            ...attrs
        }
    })

    const slotDefaultNodes = computed(() => {
        const nodes = slots.default?.() ?? []
        if (!nodes || nodes.length === 0) return []

        const nodeList = Array.isArray(nodes) ? nodes : [nodes]
        const renderedNodeList = nodeList
            .map(node => {
                return isVNodeNameContain(node, 'NTab') ? node : null
            })
            .filter(node => !!node)
        return renderedNodeList as VNode[]
    })

    function isActive(node: VNode) {
        if (!node.props?.name) return false
        if (props.multiple && Array.isArray(model.value)) {
            return model.value.includes(node.props?.name)
        }
        return node.props?.name === model.value
    }

    function getTabId(node: VNode, index: number) {
        return node.props?.id || `n-tab-${tabsId}-${index}`
    }

    function setTabRef(el: Element | ComponentPublicInstance | null, index: number) {
        if (el) {
            // Retrieve the underlying DOM element if it's a component
            tabRefs.value[index] = (el as ComponentPublicInstance).$el || el
        }
    }

    // Event handler
    function handleTabNodeClick(tabNode: VNode) {
        if (!tabNode.props?.name) return
        if (props.multiple && Array.isArray(model.value)) {
            const index = model.value.indexOf(tabNode.props?.name)
            if (index >= 0) {
                model.value = model.value.toSpliced(index, 1)
            } else {
                model.value = [...model.value, tabNode.props?.name]
            }
        } else {
            model.value = tabNode.props?.name ?? ''
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        const tabs = tabRefs.value.filter(
            el => !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true'
        )
        if (tabs.length === 0) return

        const currentFocus = document.activeElement as HTMLElement
        const currentIndex = tabs.indexOf(currentFocus)

        let nextIndex = -1

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown': // Optional: handle vertical tabs if supported later
                nextIndex = (currentIndex + 1) % tabs.length
                e.preventDefault()
                break
            case 'ArrowLeft':
            case 'ArrowUp':
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
                e.preventDefault()
                break
            case 'Home':
                nextIndex = 0
                e.preventDefault()
                break
            case 'End':
                nextIndex = tabs.length - 1
                e.preventDefault()
                break
        }

        if (nextIndex !== -1) {
            tabs[nextIndex].focus()
            // Optional: automatically select the tab on focus for single selection mode
            // if (!props.multiple) {
            //     // We need to map the DOM element back to the node name to update model
            //     // This might be tricky without storing mapping.
            //     // For now, let's stick to manual selection with Enter/Space (handled by button default or NTab click)
            //     // OR: simulate click?
            //     tabs[nextIndex].click()
            // }
            // Standard behavior often involves automatic activation for tabs.
            // Let's trigger click to activate.
            if (!props.multiple) {
                tabs[nextIndex].click()
            }
        }
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-tabs {
            @apply relative flex flex-row items-center transition-all duration-200;

            & > .n-tab:last-child {
                @apply border-r-2;
            }

            &.individual > .n-tab {
                @apply rounded-element border-r-2;
            }

            &.separator > .n-tab:not(.n-tab--active) + .n-tab {
                @apply border-l-current;
            }

            &.active-bottom-line {
                & > .n-tab {
                    @apply text-text-invert border-2;
                    &.n-tab--active {
                        @apply border-transparent border-b-current bg-text text-text-invert;
                        @apply disabled:bg-text disabled:text-text-invert;
                    }
                }

                /* Solid active colors */
                &.brand > .n-tab.n-tab--active {
                    @apply bg-brand   text-text-invert;
                }
                &.success > .n-tab.n-tab--active {
                    @apply bg-success text-text-invert;
                }
                &.error > .n-tab.n-tab--active {
                    @apply bg-error   text-text-invert;
                }
                &.warning > .n-tab.n-tab--active {
                    @apply bg-warning text-text-invert;
                }
                &.info > .n-tab.n-tab--active {
                    @apply bg-info    text-text-invert;
                }

                /* Flat variant overrides */
                &.flat {
                    & > .n-tab {
                        @apply text-current/45;
                        &.n-tab--active {
                            @apply bg-current/20 text-current;
                            @apply disabled:bg-current/20 disabled:text-current;
                        }
                    }
                    &.brand > .n-tab.n-tab--active {
                        @apply bg-brand-light text-brand;
                    }
                    &.success > .n-tab.n-tab--active {
                        @apply bg-success-light text-success;
                    }
                    &.error > .n-tab.n-tab--active {
                        @apply bg-error-light text-error;
                    }
                    &.warning > .n-tab.n-tab--active {
                        @apply bg-warning-light text-warning;
                    }
                    &.info > .n-tab.n-tab--active {
                        @apply bg-info-light text-info;
                    }
                }

                /* Texted variant overrides */
                &.texted {
                    & > .n-tab {
                        @apply text-current/50;
                        &.n-tab--active {
                            @apply bg-transparent text-current;
                            @apply disabled:bg-transparent disabled:text-current;
                        }
                    }
                    &.brand > .n-tab.n-tab--active {
                        @apply text-brand;
                    }
                    &.success > .n-tab.n-tab--active {
                        @apply text-success;
                    }
                    &.error > .n-tab.n-tab--active {
                        @apply text-error;
                    }
                    &.warning > .n-tab.n-tab--active {
                        @apply text-warning;
                    }
                    &.info > .n-tab.n-tab--active {
                        @apply text-info;
                    }
                }
            }
        }
    }
</style>
