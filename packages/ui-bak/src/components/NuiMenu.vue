<template>
    <nui-pop-over
        ref="menuElement"
        v-model="model"
        class="nui-menu"
        :offset="[0, 0]"
        :nested="props.nested"
        :display-position="props.displayPosition"
        :anchor-position="props.anchorPosition"
    >
        <slot>
            <recursive-menu :items="props.items" :ancestors="[]" :parent-list-item-ref="null" />
        </slot>
    </nui-pop-over>
</template>

<script setup lang="ts">
    import { provide, ref, Ref, toRef } from 'vue'
    import NuiPopOver from './NuiPopOver.vue'
    import RecursiveMenu from './RecursiveMenu.vue'

    export interface NuiMenuItem {
        label: string
        value: string
        onClick?: (payload: MouseEvent) => void
        onFocus?: (payload: FocusEvent) => void
        onBlur?: (payload: FocusEvent) => void
        onMouseOver?: (payload: MouseEvent) => void
        onMouseOut?: (payload: MouseEvent) => void
        children?: NuiMenuItem[]
    }

    export type NuiPopOverDisplayPosition = 'top' | 'bottom' | 'left' | 'right'
    export type NuiPopOverAnchorPosition = 'start' | 'center' | 'end'

    export interface NuiMenuProps {
        items?: NuiMenuItem[]
        nested?: boolean
        displayPosition?: NuiPopOverDisplayPosition
        anchorPosition?: NuiPopOverAnchorPosition
    }

    const model = defineModel<boolean>()

    const props = withDefaults(defineProps<NuiMenuProps>(), {
        items: () => [],
        nested: false,
        displayPosition: 'bottom',
        anchorPosition: 'start'
    })

    // Define state and handlers
    const openSubmenus = ref<Record<string, boolean>>({})
    const submenuTimeouts = ref<Record<string, number>>({}) // Restored

    const handleSubmenuMouseOver = (item: NuiMenuItem) => {
        if (submenuTimeouts.value[item.value]) {
            clearTimeout(submenuTimeouts.value[item.value])
        }
        openSubmenus.value[item.value] = true
    }

    const handleSubmenuMouseOut = (item: NuiMenuItem) => {
        submenuTimeouts.value[item.value] = window.setTimeout(() => {
            openSubmenus.value[item.value] = false
        }, 750)
    }

    // Define the API interface for provide/inject
    interface RecursiveMenuState {
        openSubmenus: Ref<Record<string, boolean>>
        submenuTimeouts: Ref<Record<string, number>>
        handleSubmenuMouseOver: (item: NuiMenuItem) => void
        handleSubmenuMouseOut: (item: NuiMenuItem) => void
    }

    // Provide them
    provide<RecursiveMenuState>('menu-state', {
        openSubmenus,
        submenuTimeouts, // Restored
        handleSubmenuMouseOver,
        handleSubmenuMouseOut
    })

    const menuElement = ref<InstanceType<typeof NuiPopOver> | null>(null)
    import { useMenuHover } from '../composables/useMenuHover'
    useMenuHover(menuElement, toRef(props, 'nested'))
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-menu .nui-list {
            /* @apply py-[var(--nui-menu-list-padding-y)]; */
            @apply text-nowrap;
        }

        .nui-list-item.has-submenu {
            @apply flex items-center justify-between;

            .nui-menu__item-label {
                @apply grow;
            }

            .nui-menu__item-icon {
                @apply h-[var(--nui-menu-item-icon-size)] w-[var(--nui-menu-item-icon-size)] ml-[var(--nui-menu-item-icon-margin-x)];
            }
        }
    }
</style>
