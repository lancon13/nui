<template>
    <component :is="props.tag" :class="compClasses" v-bind="compBind">
        <template v-for="(node, index) in slotDefaultNodes" :key="index">
            <component
                :is="node"
                :class="[
                    props.multiple && Array.isArray(modelValueName)
                        ? modelValueName?.includes(node.props?.name)
                            ? 'n-tab--active'
                            : ''
                        : node.props?.name === modelValueName
                          ? 'n-tab--active'
                          : ''
                ]"
                @click="() => handleTabNodeClick(node)"
            />
        </template>
    </component>
</template>

<script setup lang="ts">
    import { computed, useAttrs, useSlots, VNode } from 'vue'
    import { isVNodeNameContain } from '../helpers/dom'

    defineOptions({
        inheritAttrs: false
    })

    const slots = useSlots()
    const attrs = useAttrs()
    const modelValueName = defineModel<string | string[]>()
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
        return renderedNodeList
    })

    // Event handler
    function handleTabNodeClick(tabNode: VNode) {
        if (!tabNode.props?.name) return
        if (props.multiple && Array.isArray(modelValueName.value)) {
            if (modelValueName.value.indexOf(tabNode.props?.name) >= 0) {
                modelValueName.value = modelValueName.value.toSpliced(
                    modelValueName.value.indexOf(tabNode.props?.name),
                    1
                )
            } else {
                modelValueName.value = [...modelValueName.value, tabNode.props?.name]
            }
        } else modelValueName.value = tabNode.props?.name ?? ''
    }
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';

    @layer components {
        .n-tabs {
            @apply relative
            flex flex-row items-center;

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
                & {
                    & > .n-tab {
                        @apply text-bg/50;
                        &.n-tab--active {
                            @apply border-transparent border-b-current bg-text text-bg;
                            @apply disabled:border-transparent disabled:border-b-current disabled:bg-text disabled:text-bg;
                        }
                    }
                    &.primary > .n-tab.n-tab--active {
                        @apply bg-primary text-text-invert;
                        @apply disabled:bg-text disabled:text-text-invert;
                    }
                    &.success > .n-tab.n-tab--active {
                        @apply bg-success text-text-invert;
                        @apply disabled:bg-text disabled:text-text-invert;
                    }
                    &.error > .n-tab.n-tab--active {
                        @apply bg-error text-text-invert;
                        @apply disabled:bg-text disabled:text-text-invert;
                    }
                    &.warning > .n-tab.n-tab--active {
                        @apply bg-warning text-text-invert;
                        @apply disabled:bg-text disabled:text-text-invert;
                    }
                    &.info > .n-tab.n-tab--active {
                        @apply bg-info text-text-invert;
                        @apply disabled:bg-text disabled:text-text-invert;
                    }
                }

                &.flat {
                    & > .n-tab {
                        @apply text-current/45;
                        &.n-tab--active {
                            @apply border-transparent border-b-current bg-current/20 text-current;
                            @apply disabled:border-transparent disabled:border-b-current disabled:bg-current/20 disabled:text-current;
                        }
                    }
                    &.primary > .n-tab.n-tab--active {
                        @apply bg-primary-alt text-primary;
                        @apply disabled:bg-current/20 disabled:text-current;
                    }
                    &.success > .n-tab.n-tab--active {
                        @apply bg-success text-text-invert;
                        @apply disabled:bg-current/20 disabled:text-current;
                    }
                    &.error > .n-tab.n-tab--active {
                        @apply bg-error text-text-invert;
                        @apply disabled:bg-current/20 disabled:text-current;
                    }
                    &.warning > .n-tab.n-tab--active {
                        @apply bg-warning text-text-invert;
                        @apply disabled:bg-current/20 disabled:text-current;
                    }
                    &.info > .n-tab.n-tab--active {
                        @apply bg-info text-text-invert;
                        @apply disabled:bg-current/20 disabled:text-current;
                    }
                }

                &.texted {
                    & > .n-tab {
                        @apply text-current/50;
                        &.n-tab--active {
                            @apply border-transparent border-b-current bg-transparent text-current;
                            @apply disabled:border-transparent disabled:border-b-current disabled:bg-transparent disabled:text-current;
                        }
                    }
                    &.primary > .n-tab.n-tab--active {
                        @apply text-primary;
                        @apply disabled:text-current;
                    }
                    &.success > .n-tab.n-tab--active {
                        @apply text-text-invert;
                        @apply disabled:text-current;
                    }
                    &.error > .n-tab.n-tab--active {
                        @apply text-text-invert;
                        @apply disabled:text-current;
                    }
                    &.warning > .n-tab.n-tab--active {
                        @apply text-text-invert;
                        @apply disabled:text-current;
                    }
                    &.info > .n-tab.n-tab--active {
                        @apply text-text-invert;
                        @apply disabled:text-current;
                    }
                }
            }
        }
    }
</style>
