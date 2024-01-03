<template>
    <div>
        <ul>
            <MenuItem
                v-for="menuItem in menuData.items"
                :item="menuItem"
            >
            </MenuItem>
        </ul>
        <hr>
        <ul>
            <MenuItem
                v-for="menuItem in utilityMenuData.items"
                :item="menuItem"
            >
            </MenuItem>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { toRefs, provide } from 'vue';
    import { Component, Page } from '@bloomreach/spa-sdk';

    import MenuItem from '../MenuItem.vue';

    const props = defineProps<{ component: Component, page: Page }>();

    const { component, page } = toRefs(props);

    let menu = {},
        menuData = {},
        utilityMenuData = {};

    if (page.value) {
        menu = component.value.getModels().menu;
        menuData = page.value.getContent(menu.$ref);

        const children = component.value.getChildren();

        for (let x = 0; x < children.length; x++) {
            if (children[x].model.name === 'utility') {
                utilityMenuData = page.value.getContent(children[x].model.models.menu.$ref);
            }
        }
    }
</script>