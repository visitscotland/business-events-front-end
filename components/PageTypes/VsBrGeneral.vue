<template>
    <h1>{{ documentData.displayName }}</h1>
    <div v-html="documentData.introduction.value" />

    <VsBrImage
        v-if="heroImage && documentData.theme !== 'simple'"
        :image=heroImage
        style="max-width: 50%"
    />

    <VsBrModuleBuilder
        :modules=pageItems
    />
</template>

<script lang="ts" setup>
    import { toRefs } from 'vue';
    import { Component, Page } from '@bloomreach/spa-sdk';

    import VsBrImage from '../Utils/VsBrImage.vue';

    import VsBrModuleBuilder from '../Modules/VsBrModuleBuilder.vue';

    const props = defineProps<{ component: Component, page: Page }>();

    const { component, page } = toRefs(props);

    let document : any = {},
        documentData : any = {},
        pageItems : any[] = [],
        heroImage = {};

    if (page.value) {
        document = page.value.getDocument();
        documentData = document.getData();
        pageItems = component.value.getModels().pageItems;
        heroImage = documentData.heroImage;
    }
</script>