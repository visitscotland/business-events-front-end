<template>
    <h1>{{ documentData.displayName }}</h1>
    <div v-html="documentData.introduction.value" />

    <Image
        v-if="heroImage && documentData.theme !== 'simple'"
        :image=imageRef
        style="max-width: 50%"
    />

    <div v-for="item in pageItems">
        <ListLinksModule
            v-if="item.type==='ListLinksModule'"
            :module="item"
        />
        <MultiImageLinksModule
            v-else-if="item.type==='MultiImageLinksModule'"
            :module="item"
        />
        <span
            style="color: red"
            v-else
        >
            {{ item.type }}
        </span>
    </div>
</template>

<script lang="ts" setup>
    import { toRefs, provide } from 'vue';
    import { Component, Page } from '@bloomreach/spa-sdk';

    import Image from '../Image.vue';

    import ListLinksModule from '../ListLinksModule.vue';
    import MultiImageLinksModule from '../MultiImageLinksModule.vue';

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

    provide('page', page.value);
</script>