<template>
    <div>
        <VsBrSkeleton
            v-show="!isMounted"
        />
        <div
            class="hydrate"
            v-show="isMounted"
        >
            <br-page
                :configuration="configuration"
                :mapping="mapping"
            >
                <template #default>
                    <div
                        :class="!isMounted ? 'no-js' : ''"
                    >
                        <br-component component="menu" />
                        <br-component component="main" />
                        <br-component component="footer" />
                    </div>
                </template>
            </br-page>
        </div>
    </div>
</template>

<script setup>
/* eslint vue/component-name-in-template-casing: 0 */
/* eslint no-undef: 0 */

import axios from 'axios';

import {
    getCurrentInstance, ref, onMounted,
} from 'vue';
import mitt from 'mitt';

import VsBrMenu from '~/components/Base/VsBrMenu.vue';
import VsBrFooter from '~/components/Base/VsBrFooter.vue';
import VsBrMain from '~/components/Base/VsBrMain.vue';
import VsBrSkeleton from '~/components/Base/VsBrSkeleton.vue';

const app = getCurrentInstance();
const emitter = mitt();
app.appContext.config.globalProperties.emitter = emitter;

// Get url of current page.
const route = useRoute().path;

// Get API endpoint from the server side.
const { data: endpoint } = await useFetch('/api/getEndpoint');

let locale = '/site/resourceapi';

const localeStrings = [
    'fr-fr',
    'es-es',
    'nl-nl',
    'de-de',
];

const isMounted = ref(false);

onMounted(() => {
    isMounted.value = true;
});

let deLocalisedRoute = route;

for (let x = 0; x < localeStrings.length; x++) {
    if (route.includes(localeStrings[x])) {
        locale = `/site/${localeStrings[x]}/resourceapi`;
        deLocalisedRoute = deLocalisedRoute.replace(`/${localeStrings[x]}`, '');
    }
}

const localisedEndpoint = endpoint.value + locale;

const PREVIEW_TOKEN_KEY = 'token';
const PREVIEW_SERVER_ID_KEY = 'server-id';

let authorizationToken = '';
let serverId = '';

if (window && window.location) {
    const searchParams = new URLSearchParams(window.location.search);
    authorizationToken = searchParams.get(PREVIEW_TOKEN_KEY);
    serverId = searchParams.get(PREVIEW_SERVER_ID_KEY);
}

const runtimeConfig = useRuntimeConfig();

const configuration = {
    path: deLocalisedRoute,
    endpoint: localisedEndpoint,
    httpClient: axios,
    ...(authorizationToken ? {
        authorizationToken,
    } : {
    }),
    ...(serverId ? {
        serverId,
    } : {
    }),
    origin: runtimeConfig.public.BR_CMS_ORIGIN_LOCATION,
};

const mapping = {
    menu: VsBrMenu,
    main: VsBrMain,
    footer: VsBrFooter,
};
</script>

<style lang="scss">
    .has-edit-button {
        position: relative;

        &.vs-sticky-nav {
            top: 0;
        }
    }
</style>
