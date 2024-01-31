<template>
    <VsBrPageIntro
        v-if="documentData.theme === 'Top-Level'"
        :content="documentData"
        :hero-image="heroImage"
        :light-background="(productSearch.position === 'Top' || !firstModuleIsLink) ? true : false"
    />

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

    <!-- TODO - labels -->
    <VsProductSearch
        v-if="productSearch.position === 'Top'"
    >
        <template #vs-module-heading>
            {{ productSearch.title }}
        </template>

        <template #vs-module-intro>
            {{ productSearch.description }}
        </template>
    </VsProductSearch>

    <VsBrModuleBuilder
        :modules="pageItems"
    />

    <!-- TODO - labels -->
    <VsProductSearch
        v-if="productSearch.position === 'Bottom'"
    >
        <template #vs-module-heading>
            {{ productSearch.title }}
        </template>

        <template #vs-module-intro>
            {{ productSearch.description }}
        </template>
    </VsProductSearch>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import type { Component, Page } from '@bloomreach/spa-sdk';

import useConfigStore from '~/stores/configStore.ts';

import { VsProductSearch } from '@visitscotland/component-library/components';

import VsBrPageIntro from '../Modules/VsBrPageIntro.vue';
import VsBrIntroImage from '../Modules/VsBrIntroImage.vue';
import VsBrModuleBuilder from '../Modules/VsBrModuleBuilder.vue';

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
