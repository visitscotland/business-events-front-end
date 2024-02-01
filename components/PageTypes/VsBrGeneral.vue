<template>
    <template v-if="documentData.blog">
        <VsBrPageIntro
            :content="documentData"
            :light-background="true"
            :blog="documentData.blog"
        />

        <VsBrIntroImage
            :image="heroImage"
        />
    </template>

    <VsBrPageIntro
        v-else-if="documentData.theme === 'Top-Level'"
        :content="documentData"
        :hero-image="heroImage"
        :light-background="(productSearch.position === 'Top' || !firstModuleIsLink) ? true : false"
    />

    <template v-else-if="documentData.theme === 'Standard'">
        <VsBrPageIntro
            :content="documentData"
            :light-background="true"
        />

        <VsBrIntroImage
            :image="heroImage"
        />
    </template>

    <VsBrPageIntro
        v-else-if="documentData.theme === 'Simple'"
        :content="documentData"
        :light-background="true"
    />

    <!-- TODO - labels -->
    <VsBrProductSearch
        v-if="productSearch.position === 'Top'"
        class="mb-9 mb-lg-12 pt-9"
    />

    <VsBrModuleBuilder
        :modules="pageItems"
    />

    <!-- TODO - labels -->
    <VsBrProductSearch
        v-if="productSearch.position === 'Bottom'"
        class="mt-9 mt-lg-12"
    />
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import type { Component, Page } from '@bloomreach/spa-sdk';

import useConfigStore from '~/stores/configStore.ts';

import VsBrPageIntro from '../Modules/VsBrPageIntro.vue';
import VsBrIntroImage from '../Modules/VsBrIntroImage.vue';
import VsBrModuleBuilder from '../Modules/VsBrModuleBuilder.vue';
import VsBrProductSearch from '../Modules/VsBrProductSearch.vue';

const props = defineProps<{ component: Component, page: Page }>();

const { page } = toRefs(props);

let document : any = {
};
let documentData : any = {
};
let pageItems : any[] = [];
let productSearch : any = {
};
let heroImage = {
};

const configStore = useConfigStore();

let firstModuleIsLink = false;

if (page.value) {
    document = page.value.getDocument();
    documentData = document.getData();
    pageItems = configStore.pageItems;
    productSearch = configStore.productSearch;
    heroImage = documentData.heroImage;

    if (pageItems && pageItems.length
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
