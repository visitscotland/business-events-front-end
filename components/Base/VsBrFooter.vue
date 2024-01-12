<template>
    <div>
        <ul>
            <VsBrMenuItem
                v-for="(menuItem, index) in menuItems"
                :key="index"
                :item="menuItem"
            />
        </ul>
        <hr>
        <ul>
            <VsBrMenuItem
                v-for="(menuItem, index) in utilityMenuItems"
                :key="index"
                :item="menuItem"
            />
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import {
    Component, Page, MenuItem,
} from '@bloomreach/spa-sdk';

import VsBrMenuItem from '../Utils/VsBrMenuItem.vue';

const props = defineProps<{ component: Component, page: Page }>();

const { component, page } = toRefs(props);

let menu = {
    $ref: '',
};
let menuData : any = {
};
let menuItems : MenuItem[] = [];
let utilityData : any = {
};
let utilityMenuItems : MenuItem[] = [];

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
