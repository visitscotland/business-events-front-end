<template>
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
</template>

<script setup>
/* eslint vue/component-name-in-template-casing: 0 */
/* eslint no-undef: 0 */

import axios from 'axios';

import VsBrMenu from './components/Base/VsBrMenu.vue';
import VsBrFooter from './components/Base/VsBrFooter.vue';
import VsBrMain from './components/Base/VsBrMain.vue';

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

let isMounted = false;

let deLocalisedRoute = route;

for (let x = 0; x < localeStrings.length; x++) {
    if (route.includes(localeStrings[x])) {
        locale = `/site/${localeStrings[x]}/resourceapi`;
        deLocalisedRoute = deLocalisedRoute.replace(`/${localeStrings[x]}`, '');
    }
}

const localisedEndpoint = endpoint.value + locale;

const configuration = {
    path: deLocalisedRoute,
    endpoint: localisedEndpoint,
    httpClient: axios,
};

const mapping = {
    menu: VsBrMenu,
    main: VsBrMain,
    footer: VsBrFooter,
};

onMounted(() => {
    isMounted = true;
});
</script>
