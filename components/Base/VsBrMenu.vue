<template>
    <div>
        <header>
            <!-- TODO - dropdown label -->
            <VsGlobalMenu
                active-site="https://www.visitscotland.com"
            >
                <template #third-menu-item>
                    <VsGlobalMenuLanguage>
                        <VsGlobalMenuLanguageItem
                            v-for="link in languageLinks"
                            :key="link.language"
                            :language-link="link.url"
                            :language-name="link.displayName"
                            :language="link.locale"
                        />
                    </VsGlobalMenuLanguage>
                </template>
            </VsGlobalMenu>
            <ul>
                <VsBrMenuItem
                    v-for="(menuItem, index) in menuItems"
                    :key="index"
                    :item="menuItem"
                />
            </ul>
        </header>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import type {
    Component, Page, MenuItem,
} from '@bloomreach/spa-sdk';

import {
    VsGlobalMenu,
    VsGlobalMenuLanguage,
    VsGlobalMenuLanguageItem,
} from '@visitscotland/component-library/dist/vs-component-library.mjs';

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
</script>
