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

        <!-- TODO - Real breadcrumb data -->

        <template #vs-intro-breadcrumb>
            <VsBreadcrumb>
                <VsBreadcrumbItem
                    key="Place"
                    href="#"
                    text="Place"
                    :active="false"
                />
                <VsBreadcrumbItem
                    key="Holder"
                    href="#"
                    text="Holder"
                    :active="false"
                />
                <VsBreadcrumbItem
                    key="Breadcrumb"
                    href="#"
                    text="Breadcrumb"
                    :active="true"
                />
            </VsBreadcrumb>
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
import { toRefs } from 'vue';

import {
    VsPageIntro,
    VsBreadcrumb,
    VsBreadcrumbItem,
} from '@visitscotland/component-library/components';

import themeCalculator from '../../composables/themeCalculator.ts';

import VsBrImageWithCaption from './VsBrImageWithCaption.vue';

const props = defineProps<{
    content: any,
    lightBackground: boolean,
    heroImage?: any,
    itinerary?: any,
}>();

const { content, lightBackground, heroImage, itinerary } = toRefs(props);
</script>
