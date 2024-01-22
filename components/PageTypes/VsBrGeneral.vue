<template>
    <VsBrPageIntro
        v-if="documentData.theme === 'Top-Level'"
        :content="documentData"
        :hero-image="heroImage"
        :light-background="firstModuleIsLink ? false : true"
    />
    <!-- TODO - Background colour conditional on PSR -->

    <template v-if="documentData.theme === 'Standard'">
        <VsBrPageIntro
            v-if="documentData.theme === 'Standard'"
            :content="documentData"
            :light-background="true"
        />

        <VsBrIntroImage
            :image="heroImage"
        />
    </template>

    <VsBrPageIntro
        v-if="documentData.theme === 'Simple'"
        :content="documentData"
        :light-background="true"
    />
    <VsBrModuleBuilder
        :modules="pageItems"
    />
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import type { Component, Page } from '@bloomreach/spa-sdk';

import VsBrPageIntro from '../Modules/VsBrPageIntro.vue';
import VsBrIntroImage from '../Modules/VsBrIntroImage.vue';
import VsBrModuleBuilder from '../Modules/VsBrModuleBuilder.vue';

const props = defineProps<{ component: Component, page: Page }>();

const { component, page } = toRefs(props);

let document : any = {
};
let documentData : any = {
};
let pageItems : any[] = [];
let heroImage = {
};

let firstModuleIsLink = false;

if (page.value) {
    document = page.value.getDocument();
    documentData = document.getData();
    pageItems = component.value.getModels().pageItems;
    heroImage = documentData.heroImage;

    if (pageItems.length
        && (
            pageItems[0].type === 'ListLinksModule'
            || pageItems[0].type === 'MultiImageLinksModule'
            || pageItems[0].type === 'SingleImageLinksModule'
        )
    ) {
        firstModuleIsLink = true;
    }
}
</script>
