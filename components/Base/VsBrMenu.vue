<template>
    <div
        class="menu-container"
    >
        <ul>
            <li v-for="link in languageLinks">
                <a href="#" @click.prevent="toggleLanguage(link.url)">{{ link.displayName }}</a>
            </li>
        </ul>
        <hr>
        <ul>
            <VsBrMenuItem
                v-for="menuItem in menuItems"
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
        languageLinks : any = {};

    if (page.value) {
        menu = component.value.getModels().menu;
        menuData = page.value.getContent(menu.$ref);
        menuItems = menuData.items;

        languageLinks = component.value.getModels().localizedURLs;
    }

    function toggleLanguage(newUrl : string): void {
        console.log(newUrl);
    }
</script>

<style>
    .menu-container {
        border: 1px solid black;
        max-height: 300px;
        overflow-y: scroll;
    }
</style>