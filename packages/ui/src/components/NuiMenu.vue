<template>
    <nui-pop-over class="nui-menu" :offset="[0, 0]">
        <slot>
            <recursive-menu :items="props.items" :ancestors="[]" :parent-list-item-ref="null" />
        </slot>
    </nui-pop-over>
</template>

<script setup lang="ts">
    import { provide, ref, Ref } from 'vue'
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

    export interface NuiMenuProps {
        items?: NuiMenuItem[]
    }

    const props = withDefaults(defineProps<NuiMenuProps>(), {
        items: () => []
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
        // Renamed
        openSubmenus: Ref<Record<string, boolean>>
        submenuTimeouts: Ref<Record<string, number>>
        handleSubmenuMouseOver: (item: NuiMenuItem) => void
        handleSubmenuMouseOut: (item: NuiMenuItem) => void
    }

    // Provide them
    provide<RecursiveMenuState>('menu-state', {
        // Renamed key
        openSubmenus,
        submenuTimeouts, // Restored
        handleSubmenuMouseOver,
        handleSubmenuMouseOut
    })
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
