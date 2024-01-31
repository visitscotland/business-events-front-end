<template>
    <VsPageIntro
        :background="lightBackground ? themeCalculator(1) : themeCalculator(0)"
        :hero-intro="heroImage ? true : false"
        :is-itinerary="itinerary ? true : false"
    >
        <!-- TODO - Hero Video -->

        <template
            #vs-intro-hero
            v-if="heroImage"
        >
            <VsBrImageWithCaption
                :is-video="false"
                :is-hero="true"
                :use-lazy-loading="false"
                variant="large"
                :image="heroImage"
            />
        </template>

        <!-- TODO
            Social schema
            Breadcrumb schema
            Real breadcrumb data
            Home label
        -->

        <template #vs-intro-breadcrumb>
            <VsBrBreadcrumb
                :breadcrumb="breadcrumb"
                :is-home="isHome"
            />
        </template>

        <template #vs-intro-heading>
            {{ content.title }}
        </template>

        <!-- TODO - Blog Details -->

        <!-- TODO - Share Button -->

        <template
            #vs-intro-content
        >
            <div
                v-html="content.introduction.value"
            />
        </template>

        <!-- TODO - Itinerary Summary -->
    </VsPageIntro>
</template>

<script lang="ts" setup>
import { inject, toRefs } from 'vue';

import { VsPageIntro } from '@visitscotland/component-library/components';

import themeCalculator from '../../composables/themeCalculator.ts';

import VsBrImageWithCaption from './VsBrImageWithCaption.vue';
import VsBrBreadcrumb from './VsBrBreadcrumb.vue';

const page: any = inject('page');

const props = defineProps<{
    content: any,
    lightBackground: boolean,
    heroImage?: any,
    itinerary?: any,
}>();

const { content, lightBackground, heroImage, itinerary } = toRefs(props);

let breadcrumb;
let isHome;

if (page) {
    const pageContent : any = page.getContent(page.model.root);
    const pageModels : any = pageContent.models;

    isHome = pageModels.isHome;
    breadcrumb = pageModels.breadcrumb.items;
}
</script>
