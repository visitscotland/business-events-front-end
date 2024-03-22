<template>
    <div
        :class="{ 'has-edit-button': page.isPreview() }"
    >
        <BrManageContentButton
            :content="document"
        />

        <VsBrGtm />

        <VsBrPageViewEvent
            :data="document.model.data"
            :page-type="pageName"
        />

        <VsBrGeneral
            v-if="pageName === 'general-page'"
            :page="page"
            :component="component"
        />
        <VsBr404
            v-else-if="pageName === 'pagenotfound'"
            :page="page"
            :component="component"
        />
        <VsBr500
            v-else-if="pageName === 'servererror'"
            :page="page"
            :component="component"
        />
        <div
            v-else
        >
            <span
                style="color: red"
            >
                Page type: {{ pageName }}
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
/* eslint no-undef: 0 */

import { toRefs, provide } from 'vue';
import type { Component, Page } from '@bloomreach/spa-sdk';
import { BrManageContentButton } from '@bloomreach/vue3-sdk';

import useConfigStore from '~/stores/configStore.ts';

import VsBrGeneral from '~/components/PageTypes/VsBrGeneral.vue';
import VsBr404 from '~/components/PageTypes/VsBr404.vue';
import VsBr500 from '~/components/PageTypes/VsBr500.vue';

import VsBrGtm from '~/components/Modules/VsBrGtm.vue';

import VsBrPageViewEvent from '~/components/Utils/VsBrPageViewEvent.vue';

const props = defineProps<{ component: Component, page: Page }>();

const { component, page } = toRefs(props);

let pageComponent : any = {
};
let pageName : string = '';

let document : any = {
};

const configStore = useConfigStore();

if (page.value) {
    pageComponent = page.value.getComponent();
    pageName = pageComponent.model.name;

    const event = useRequestEvent();

    if (pageName === 'pagenotfound') {
        setResponseStatus(event, 404, 'Page Not Found');
    }

    if (pageName === 'servererror') {
        setResponseStatus(event, 500, 'Something Went Wrong');
    }

    const componentModels = component.value.getModels();

    configStore.isBusinessEvents = componentModels['business-events'];
    configStore.productSearch = componentModels.psrWidget;
    configStore.pageItems = componentModels.pageItems;
    configStore.labels = componentModels.labels;
    configStore.newsletterSignpost = componentModels.newsletterSignpost;

    document = page.value.getDocument();

    configStore.locale = document.model.data.localeString;

    let langString = '';

    switch (configStore.locale) {
    case 'fr':
        langString = 'fr-fr';
        break;
    case 'nl':
        langString = 'nl-nl';
        break;
    case 'de':
        langString = 'de-de';
        break;
    case 'it':
        langString = 'it-it';
        break;
    case 'es':
        langString = 'es-es';
        break;
    case 'en':
    default:
        langString = 'en-gb';
        break;
    }

    useHead({
        htmlAttrs: {
            lang: langString,
            'data-version': '',
        },
        link: [
            {
                rel: 'icon',
                href: '/favicon.ico',
                sizes: 'any',
            },
            {
                rel: 'icon',
                href: '/icons/favicon.svg',
                type: 'image/svg+xml',
            },
            {
                rel: 'apple-touch-icon',
                href: '/icons/apple-touch-icon-180-180.svg',
                sizes: 'any',
            },
            {
                rel: 'manifest',
                href: 'manifest.webmanifest',
            },
        ],
    });
}

provide('page', page.value);
</script>
