<template>
    <!-- TODO - Preview warning, video -->
    <VsArticle
        :title="module.title"
        :anchor-link="module.anchor ? formatLink(module.anchor) : ''"
    >
        <template
            #vs-article-img
            v-if="module.image"
        >
            <VsBrImageWithCaption
                :image="module.image.cmsImage"
            />
        </template>

        <template #vs-article-intro>
            <div v-html="module.introduction.value" />
        </template>

        <VsArticleSection
            v-for="(section, index) in articleSections"
            :key="index"
            :sidebar-align="section.alignment"
        >
            <template
                #article-sidebar
                v-if="section.video || section.quote || section.image"
            >
                <VsBrArticleSidebar
                    :section="section"
                    :alignment="section.alignment"
                />
            </template>

            <div v-html="section.copy.value" />
        </VsArticleSection>
    </VsArticle>
</template>

<script lang="ts" setup>
/* eslint-disable import/no-import-module-exports */

import {
    VsArticle,
    VsArticleSection,
} from '@visitscotland/component-library-export/components';

import VsBrImageWithCaption from './VsBrImageWithCaption.vue';
import VsBrArticleSidebar from './VsBrArticleSidebar.vue';

import formatLink from '../../composables/formatLink.ts';

const props = defineProps<{ module: Object }>();
const module: any = props.module;

const articleSections: any[] = [];

for (let x = 0; x < module.sections.length; x++) {
    const nextSection = module.sections[x];
    let alignment = '';

    if (nextSection.quote || nextSection.image) {
        if (x % 2 !== 0) {
            alignment = 'left';
        } else {
            alignment = 'right';
        }
    } else {
        alignment = 'right';
    }

    nextSection.alignment = alignment;

    articleSections.push(nextSection);
}

</script>
