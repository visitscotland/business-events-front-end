<template>
    <div>
        <VsBrSkeleton
            v-show="!hideSkeleton"
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
                        <NuxtLazyHydrate
                            :when-visible="{ rootMargin: '50px' }"
                        >
                            <br-component component="footer" />
                        </NuxtLazyHydrate>
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
import { AwsRum } from 'aws-rum-web';

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
const { data: xForwardedhost } = await useFetch('/api/getXForwardedHost');
const runtimeConfig = useRuntimeConfig();

// let locale = '/site/resourceapi';

// const localeStrings = [
//     'fr-fr',
//     'es-es',
//     'nl-nl',
//     'de-de',
// ];

const isMounted = ref(false);
const hideSkeleton = ref(false);

onMounted(() => {
    isMounted.value = true;
});

// implement AWS RUM scripts
// note that the identityPoolId, endpoint and APPLICATION_ID values
// will be overwritten by the prod build process
try {
    const config = {
        sessionSampleRate: 1,
        identityPoolId: runtimeConfig.public.AWS_IDENTITY_POOL_ID,
        endpoint: runtimeConfig.public.AWS_RUM_ENPOINT,
        telemetries: ['performance'],
        allowCookies: false,
        enableXRay: false,
    };

    const APPLICATION_ID = runtimeConfig.public.AWS_RUM_APPLICATION_ID;
    const APPLICATION_VERSION = '1.0.0';
    const APPLICATION_REGION = 'eu-west-2';

    /* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable no-unused-vars */
    const awsRum = new AwsRum(
        APPLICATION_ID,
        APPLICATION_VERSION,
        APPLICATION_REGION,
        config,
    );
    /* eslint-enable @typescript-eslint/no-unused-vars */ /* eslint-enable no-unused-vars */
} catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
}

// let deLocalisedRoute = route;

// for (let x = 0; x < localeStrings.length; x++) {
//     if (route.includes(localeStrings[x])) {
//         locale = `/site/${localeStrings[x]}/resourceapi`;
//         deLocalisedRoute = deLocalisedRoute.replace(`/${localeStrings[x]}`, '');
//     }
// }

// const localisedEndpoint = endpoint.value + locale;

const PREVIEW_TOKEN_KEY = 'token';
const PREVIEW_SERVER_ID_KEY = 'server-id';

let authorizationToken = '';
let serverId = '';

if (window && window.location) {
    const searchParams = new URLSearchParams(window.location.search);
    authorizationToken = searchParams.get(PREVIEW_TOKEN_KEY);
    serverId = searchParams.get(PREVIEW_SERVER_ID_KEY);
}

// const runtimeConfig = useRuntimeConfig();

if (process.server && xForwardedhost.value) {
    axios.defaults.headers.common.Host = xForwardedhost.value;
}

const configuration = {
    path: route,
    endpoint: endpoint.value,
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
    debug: runtimeConfig.public.BR_NUXT_APP_DEBUG === 'true',
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

    .hydrate {
        z-index: 2;
        position: relative;
        background-color: white;
    }
</style>
