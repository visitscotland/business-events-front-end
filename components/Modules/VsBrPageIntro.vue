<template>
    <VsPageIntro
        :background="lightBackground ? themeCalculator(1) : themeCalculator(0)"
        :hero-intro="heroImage ? true : false"
        :is-itinerary="itinerary ? true : false"
    >
        <template
            #vs-intro-hero
            v-if="heroImage"
        >
            <template
                v-if="heroVideo"
            >
                <VsBrVideoModal
                    :is-video-modal="true"
                    :close-btn-text="configStore.getLabel('essentials.global', 'close')"
                    :modal-id="youtubeId"
                    :video="heroVideo"
                />

                <VsBrImageWithCaption
                    :is-video="true"
                    :is-hero="true"
                    :use-lazy-loading="false"
                    variant="large"
                    :image="heroImage"
                    :video-id="youtubeId"
                    :video-title="heroVideo.displayName"
                    :video-btn="heroVideo.cta"
                />
            </template>
            <template
                v-else
            >
                <VsBrImageWithCaption
                    :is-video="false"
                    :is-hero="true"
                    :use-lazy-loading="false"
                    variant="large"
                    :image="heroImage"
                />
            </template>
        </template>

        <!-- TODO
            Social schema
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
            #vs-article-data
            v-if="blog"
        >
            <VsArticleDetails
                :article-author="blogAuthor"
                :article-publish-date="blogDate"
                :article-read-time="blogTime"
            />
        </template>

        <!-- TODO - Share Button -->

        <template
            #vs-intro-content
        >
            <VsBrRichText :input-content="content.introduction.value" />
        </template>

        <!-- TODO - Itinerary Summary -->
    </VsPageIntro>
</template>

<script lang="ts" setup>
import { inject, toRefs } from 'vue';

import { VsPageIntro, VsArticleDetails } from '@visitscotland/component-library/components';

import useConfigStore from '~/stores/configStore.ts';
import themeCalculator from '~/composables/themeCalculator.ts';
import extractYoutubeId from '~/composables/extractYoutubeId.ts';

import VsBrImageWithCaption from '~/components/Modules/VsBrImageWithCaption.vue';
import VsBrBreadcrumb from '~/components/Modules/VsBrBreadcrumb.vue';
import VsBrVideoModal from '~/components/Modules/VsBrVideoModal.vue';
import VsBrRichText from '~/components/Modules/VsBrRichText.vue';

const configStore = useConfigStore();

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

let heroVideo : any;
let youtubeId : string = '';

if (page) {
    const pageContent : any = page.getContent(page.model.root);
    const pageModels : any = pageContent.models;

    if (pageModels) {
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

        if (content.value.heroVideo) {
            const video = page.getContent(content.value.heroVideo.videoLink);
            if (video) {
                heroVideo = video.model.data;

                youtubeId = extractYoutubeId(heroVideo.url);
            }
        }
    }
}
</script>
