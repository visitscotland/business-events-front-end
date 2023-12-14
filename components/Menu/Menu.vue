<template>
    <div
        class="menu-container"
    >
        <ul>
            <MenuItem
                v-for="menuItem in menuData.items"
                :item="menuItem"
            >
            </MenuItem>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { toRefs } from 'vue';
    import { Component, Page } from '@bloomreach/spa-sdk';

    import MenuItem from './MenuItem.vue';

    const props = defineProps<{ component: Component, page: Page }>();

    const { component, page } = toRefs(props);

    let menu = {},
        menuData = {};

    if (page.value) {
        menu = component.value.getModels().menu;
        menuData = page.value.getContent(menu.$ref);
    }
</script>

<style>
    .menu-container {
        border: 1px solid black;
        max-height: 300px;
        overflow-y: scroll;
    }
</style>