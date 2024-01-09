<template>
    <div>
        <ul>
            <VsBrMenuItem
                v-for="menuItem in menuItems"
                :item="menuItem"
            >
            </VsBrMenuItem>
        </ul>
        <hr>
        <ul>
            <VsBrMenuItem
                v-for="menuItem in utilityMenuItems"
                :item="menuItem"
            >
            </VsBrMenuItem>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { toRefs } from 'vue';
    import { Component, Page, MenuItem } from '@bloomreach/spa-sdk';

    import VsBrMenuItem from '../Utils/VsBrMenuItem.vue';

    const props = defineProps<{ component: Component, page: Page }>();

    const { component, page } = toRefs(props);

    let menu = {
            $ref: '',
        },
        menuData : any = {},
        menuItems : MenuItem[] = [],
        utilityData : any = {},
        utilityMenuItems : MenuItem[] = [];

    if (page.value) {
        menu = component.value.getModels().menu;
        if (menu) {
            menuData = page.value.getContent(menu.$ref);
            menuItems = menuData.items;
        }

        let children : any[] = [];

        children = component.value.getChildren();

        for (let x = 0; x < children.length; x++) {
            if (children[x].model.name === 'utility' && children[x].model.models.menu) {
                utilityData = page.value.getContent(children[x].model.models.menu.$ref);
                utilityMenuItems = utilityData.items;
            }
        }
    }
</script>