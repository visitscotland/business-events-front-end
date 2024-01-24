<template>
    <VsFooter :class="{ 'has-edit-button': page.isPreview() }">
        <template #accordion-items>
            <VsCol
                v-for="(menuItem, index) in menuItems"
                :key="index"
                cols="12"
                md="4"
                lg="3"
            >
                <VsFooterAccordionItem
                    :title="menuItem.model.title"
                    variant="dark"
                    :control-id="`footer_accordion_item${index}`"
                >
                    <template #icon-open>
                        <VsIcon
                            name="chevron"
                            variant="light"
                            size="xs"
                        />
                    </template>

                    <template #icon-closed>
                        <VsIcon
                            name="chevron"
                            orientation="down"
                            variant="light"
                            size="xs"
                        />
                    </template>

                    <VsList
                        v-if="menuItem.loadedChildren.length"
                        unstyled
                        role="menu"
                    >
                        <template
                            v-for="(childItem, childIndex) in menuItem.loadedChildren"
                            :key="childIndex"
                        >
                            <VsFooterNavListItem
                                v-if="childItem.model.title"
                                :href="childItem.getUrl()"
                                :link-text="childItem.model.title"
                                :type="childItem.model.links.site && childItem.model.links.site.type === 'external'
                                    ? childItem.model.links.site.type
                                    : 'default'"
                            />
                        </template>
                    </VsList>
                </VsFooterAccordionItem>
            </VsCol>
        </template>

        <span style="color: white">Test menu button</span>
        <BrManageMenuButton :menu="menuData" />

        <template #social-menu>
            <!-- TODO - Social labels -->
            <VsFooterSocialMenu>
                <template #title>
                    Find us on
                </template>

                <VsFooterSocialItem
                    v-for="(item, index) in socialMenu"
                    :key="index"
                    :href="item.url"
                    :icon="item.icon"
                />
            </vsfootersocialmenu>
        </template>

        <template
            v-for="(utilityMenu, index) in utilityMenuItems"
            :key="index"
        >
            <VsFooterUtilityList>
                <BrManageMenuButton :menu="utilityData" />
                <VsFooterNavListItem
                    v-for="(utilityItem, childIndex) in utilityMenu.children"
                    :key="childIndex"
                    :href="utilityItem.getUrl()"
                    :link-text="utilityItem.model.title"
                    :type="utilityItem.model.links.site && utilityItem.model.links.site.type === 'external'
                        ? utilityItem.model.links.site.type
                        : 'default'"
                />
            </VsFooterUtilityList>
        </template>

        <!-- TODO - copyright labels -->
        <VsFooterCopyright
            href="https://www.scotland.org/"
            link-alt-text=""
        >
            <template #copyright>
                VisitScotland. All rights reserved.
            </template>
        </VsFooterCopyright>
    </VsFooter>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import type { Component, Page } from '@bloomreach/spa-sdk';
import { BrManageMenuButton } from '@bloomreach/vue3-sdk';

import {
    VsFooter,
    VsFooterAccordionItem,
    VsFooterNavListItem,
    VsFooterSocialMenu,
    VsFooterSocialItem,
    VsFooterCopyright,
    VsFooterUtilityList,
    VsList,
    VsIcon,
    VsCol,
} from '@visitscotland/component-library/dist/vs-component-library.mjs';

const props = defineProps<{ component: Component, page: Page }>();

const { component, page } = toRefs(props);

let menu = {
    $ref: '',
};
let menuData : any = {
};
let menuItems : any[] = [];
let utilityData : any = {
};
let utilityMenuItems : any[] = [];

if (page.value) {
    menu = component.value.getModels().menu;
    if (menu) {
        menuData = page.value.getContent(menu.$ref);
        menuItems = menuData.items;

        for (let x = 0; x < menuItems.length; x++) {
            menuItems[x].loadedChildren = menuItems[x].getChildren();
        }
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

const socialMenu = [
    {
        url: 'https://www.facebook.com/visitscotland/',
        icon: 'facebook',
    },
    {
        url: 'https://twitter.com/VisitScotland',
        icon: 'twitter',
    },
    {
        url: 'https://www.youtube.com/channel/UC1FdvQG5MFwzv0PY6dMsaFg',
        icon: 'youtube',
    },
    {
        url: 'https://www.instagram.com/visitscotland/',
        icon: 'instagram',
    },
];

</script>
