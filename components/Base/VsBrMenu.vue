<template>
    <div
        class="menu-container"
    >
        <ul>
            <li v-for="(link, index) in languageLinks" :key="index">
                <a href="#" @click.prevent="toggleLanguage()">{{ link.displayName }}</a>
            </li>
        </ul>
        <hr>
        <ul>
            <VsBrMenuItem
                v-for="(menuItem, index) in menuItems"
                :key="index"
                :item="menuItem"
            />
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import type {
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
let languageLinks : any = {
};

if (page.value) {
    menu = component.value.getModels().menu;
    menuData = page.value.getContent(menu.$ref);
    menuItems = menuData.items;

    languageLinks = component.value.getModels().localizedURLs;
}

function toggleLanguage(): void {
    // console.log(newUrl);
}
</script>

<style>
    .menu-container {
        border: 1px solid black;
        max-height: 300px;
        overflow-y: scroll;
    }
</style>
