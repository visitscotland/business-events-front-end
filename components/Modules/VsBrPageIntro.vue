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

        <template
            #vs-blog-data
            v-if="blog"
        >
            <VsBlogDetails
                :blog-author="blogAuthor"
                :blog-publish-date="blogDate"
                :blog-read-time="blogTime"
            />
        </template>

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

import { VsPageIntro, VsBlogDetails } from '@visitscotland/component-library/components';

import themeCalculator from '../../composables/themeCalculator.ts';

import VsBrImageWithCaption from './VsBrImageWithCaption.vue';
import VsBrBreadcrumb from './VsBrBreadcrumb.vue';

const page: any = inject('page');

const props = defineProps<{
    content: any,
    lightBackground: boolean,
    heroImage?: any,
    itinerary?: any,
    blog?: any,
}>();

const { content, lightBackground, heroImage, itinerary, blog } = toRefs(props);

let breadcrumb : [];
let isHome : boolean;

let blogAuthor : any;
let blogTime : string;
let blogDate : string;

if (page) {
    const pageContent : any = page.getContent(page.model.root);
    const pageModels : any = pageContent.models;

    isHome = pageModels.isHome;
    breadcrumb = pageModels.breadcrumb.items;

    if (blog.value) {
        blogAuthor = page.getContent(blog.value.author);

        if (blogAuthor && blogAuthor.model && blogAuthor.model.data) {
            blogAuthor = blogAuthor.model.data.displayName;
        }

        // TODO - localised labels for minute/s

        if (blog.value.readingTime > 1) {
            blogTime = `${blog.value.readingTime} minutes`;
        } else {
            blogTime = `${blog.value.readingTime} minute`;
        }

        blogDate = new Date(blog.value.publishDate).toLocaleString(
            'en-US',
            {
                year: 'numeric',
                day: 'numeric',
                month: 'long',
            },
        );
    }
}
</script>
