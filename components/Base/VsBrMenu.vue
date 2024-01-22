<template>
    <div class="vs-sticky-nav">
        <header>
            <!-- TODO - dropdown label -->
            <VsGlobalMenu
                active-site="https://businessevents.visitscotland.com/"
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

            <!-- TODO
                Confirm href value
                All labels
            -->
            <VsMeganav
                href="/"
                menu-toggle-alt-text=""
                search-button-text=""
                search-label-text=""
                search-clear-button-text=""
                search-close-button-text=""
                logo-alt-text=""
            >
                <template #mega-nav-top-menu-items>
                    <VsMegaNavTopMenuItem
                        v-for="(menuItem, index) in menuItems"
                        :key="index"
                        :href="menuItem.getUrl()"
                        :cta-text="menuItem.model.cta"
                    >
                        <template #button-content>
                            {{ menuItem.model.title }}
                        </template>

                        <template #dropdown-content>
                            <VsMegaNavList
                                v-for="(childItem, childIndex) in menuItem.getChildren()"
                                :key="childIndex"
                                :list-heading="childItem.model.title"
                            >
                                <template #nav-list-items>
                                    <VsMegaNavListItem
                                        v-for="(
                                            grandChildItem,
                                            grandChildIndex
                                        ) in childItem.getChildren()"
                                        :key="grandChildIndex"
                                        :href="grandChildItem.getUrl()"
                                    >
                                        {{ grandChildItem.model.title }}
                                    </VsMegaNavListItem>
                                </template>

                                <template
                                    #nav-heading-cta-link
                                    v-if="childItem.cta"
                                >
                                    <VsMegaNavListItem
                                        :href="childItem.getUrl()"
                                        subheading-link
                                    >
                                        {{ childItem.cta }}
                                    </VsMegaNavListItem>
                                </template>
                            </VsMegaNavList>
                        </template>
                    </VsMegaNavTopMenuItem>
                </template>

                <template #mega-nav-accordion-items>
                    <VsAccordion>
                        <!-- TODO
                            analytics event
                            cmsCached?
                        -->
                        <VsMegaNavAccordionItem
                            v-for="(menuItem, index) in menuItems"
                            :key="index"
                            :title="menuItem.model.title"
                            level="1"
                            :control-id="`${index}`"
                            :cta-link="menuItem.getUrl()"
                            :cta-text="menuItem.model.cta"
                        >
                            <VsMegaNavAccordionItem
                                v-for="(childItem, childIndex) in menuItem.getChildren()"
                                :key="childIndex"
                                :title="childItem.model.title"
                                level="2"
                                :control-id="`${index}-${childIndex}`"
                            >
                                <VsMegaNavList>
                                    <template #nav-list-items>
                                        <VsMegaNavListItem
                                            v-for="(
                                                grandChildItem,
                                                grandChildIndex
                                            ) in childItem.getChildren()"
                                            :key="grandChildIndex"
                                            :href="grandChildItem.getUrl()"
                                        >
                                            {{ grandChildItem.model.title }}
                                        </VsMegaNavListItem>
                                    </template>

                                    <template
                                        #nav-heading-cta-link
                                        v-if="childItem.cta"
                                    >
                                        <VsMegaNavListItem
                                            :href="childItem.getUrl()"
                                            subheading-link
                                        >
                                            {{ childItem.cta }}
                                        </VsMegaNavListItem>
                                    </template>
                                </VsMegaNavList>
                            </VsMegaNavAccordionItem>
                        </VsMegaNavAccordionItem>
                    </VsAccordion>
                </template>
            </VsMeganav>
        </header>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import type { Component, Page } from '@bloomreach/spa-sdk';

import {
    VsGlobalMenu,
    VsGlobalMenuLanguage,
    VsGlobalMenuLanguageItem,
    VsMeganav,
    VsMegaNavTopMenuItem,
    VsMegaNavList,
    VsMegaNavListItem,
    VsAccordion,
    VsMegaNavAccordionItem,
} from '@visitscotland/component-library/dist/vs-component-library.mjs';

const props = defineProps<{ component: Component, page: Page }>();

const { component, page } = toRefs(props);

let menu = {
    $ref: '',
};
let menuData : any = {
};
let menuItems : any[] = [];
let languageLinks : any = {
};

if (page.value) {
    menu = component.value.getModels().menu;
    menuData = page.value.getContent(menu.$ref);
    menuItems = menuData.items;

    languageLinks = component.value.getModels().localizedURLs;
}
</script>
