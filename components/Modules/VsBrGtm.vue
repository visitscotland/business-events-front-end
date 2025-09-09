<template>
    <template v-if="id && !isPreviewMode">
        <noscript>
            <iframe
            :src="`https://www.googletagmanager.com/ns.html?id=${id}${queryString}`"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
            ></iframe>
        </noscript>
    </template>
</template>

<script lang="ts" setup>
import useConfigStore from '~/stores/configStore.ts';

/* eslint no-undef: 0 */
import { inject } from 'vue';

import type { Page } from '@bloomreach/spa-sdk';

const configStore = useConfigStore();

const page: Page | undefined = inject('page');

let id = '';
let queryString = '';

if (configStore.gtm) {
    id = configStore.gtm['gtm.container-id'];
    queryString = configStore.gtm['gtm.is-production'] === 'true'
        ? ''
        : configStore.gtm['gtm.preview-query-string'];
}

let isPreviewMode = false;

if (page && page.isPreview()) {
    isPreviewMode = true;
}

const attachCivicEvents = (counter = 1) => {
    if (counter < 20) {
        if (typeof window !== 'undefined' && window.google_tag_manager) {
            // GTM can't call browser events directly, so we need to listen for events on the
            // datalayer and then latch our code onto those.
            const originalDataLayerPush = window.dataLayer.push;

            window.dataLayer.push = (arg : any) => {
                if (arg) {
                    originalDataLayerPush(arg);
                } else {
                    originalDataLayerPush();
                }

                if (arg && arg.event === 'cookie_permission_loaded') {
                    setTimeout(() => {
                        window.dispatchEvent(new Event('cookieManagerLoaded'));
                    });
                }

                if (arg && arg.event === 'cookie_permission_changed') {
                    setTimeout(() => {
                        window.dispatchEvent(new Event('cookiesUpdated'));
                    });
                }
            };
        } else {
            setTimeout(() => {
                attachCivicEvents(counter + 1);
            }, 500);
        }
    }
};

if (id && !isPreviewMode) {
    useHead({
        script: [
            `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '${queryString}';f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${id}');`,
        ],
    });

    attachCivicEvents();
}

if (isPreviewMode && window) {
    window.bypassCookiesRequired = true;
    window.bypassCookiesLoaded = true;
}

</script>
