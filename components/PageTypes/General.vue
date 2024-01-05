<template>
    <h1>{{ documentData.displayName }}</h1>
    <div v-html="documentData.introduction.value" />

    <Image
        v-if="heroImage && documentData.theme !== 'simple'"
        :imageRef=heroImage
        style="max-width: 50%"
    />

    <ModuleBuilder
        :modules=pageItems
    />
</template>

<script lang="ts" setup>
    import { toRefs } from 'vue';
    import { Component, Page } from '@bloomreach/spa-sdk';

    import Image from '../Utils/Image.vue';

    import ModuleBuilder from '../Modules/ModuleBuilder.vue';

    const props = defineProps<{ component: Component, page: Page }>();

    const { component, page } = toRefs(props);

    let documentData = null,
        pageItems = [],
        heroImage = null;

    if (page.value) {
        documentData = page.value.getDocument().getData();
        pageItems = component.value.getModels().pageItems;
        heroImage = documentData.heroImage.$ref;
    }
</script>