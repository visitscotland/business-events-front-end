<template>
    <!-- TODO - theme, error-message, itinerary, themes -->
    <VsMegalinks
        :title="module.title"
        variant="link-list"
    >
        <template
            v-if="module.introduction"
            #vs-megalinks-intro
        >
            {{ module.introduction.value }}
        </template>

        <VsRow>
            <VsCol
                v-for="(link, index) in links"
                :key="index"
                cols="12"
                md="6"
            >
                <VsMegalinkLinkList
                    :img-src="link.image"
                    :theme="link.theme"
                    :link-type="link.type"
                    :link-url="link.url"
                    :error-message="link['error-message']"
                >
                    <template #vs-link-list-heading>
                        {{ link.label }}
                    </template>

                    <template
                        #vs-link-list-content
                    >
                        <p>{{ link.teaser }}</p>
                    </template>
                </VsMegalinkLinkList>
            </VsCol>
        </VsRow>
    </VsMegalinks>
</template>

<script lang="ts" setup>
/* eslint-disable import/no-import-module-exports */
import { inject } from 'vue';

import type { Page } from '@bloomreach/spa-sdk';

import {
    VsMegalinks,
    VsMegalinkLinkList,
    VsRow,
    VsCol,
} from '@visitscotland/component-library/dist/vs-component-library.mjs';

const props = defineProps<{ module: Object }>();
const module : any = props.module;
const page: Page | undefined = inject('page');
const links: any[] = [];

if (page && module.links) {
    for (let x = 0; x < module.links.length; x++) {
        const nextLink = module.links[x];

        const image: any = nextLink.image.cmsImage
            ? page.getContent(nextLink.image.cmsImage.$ref)
            : page.getContent(nextLink.image.externalImage.$ref);

        links.push({
            image: image?.getOriginal().getUrl(),
            theme: 'light',
            type: nextLink.type.toLowerCase(),
            url: nextLink.link,
            'error-message': '',
            label: nextLink.label,
            teaser: nextLink.teaser,
        });
    }
}

</script>

<style>
    div.link-list-module {
        span {
            display: block;
        }
    }
</style>
