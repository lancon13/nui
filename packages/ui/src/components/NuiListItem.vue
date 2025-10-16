<template>
    <li class="nui-list-item">
        <slot />
    </li>
</template>

<script setup lang="ts">
    // This component is a simple wrapper for list content.
</script>

<style lang="css">
    @reference 'tailwindcss';
    @reference '../styles/index.css';
    @reference '../styles/components.css';

    @layer components {
        .nui-list-item {
            @apply flex items-center px-[var(--nui-list-item-padding-x)] py-[var(--nui-list-item-padding-y)];
        }
    }
</style>
