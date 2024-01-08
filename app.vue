<template>
    <br-page :configuration="configuration" :mapping="mapping">
        <template v-slot="props">
            <header>
                <br-component component="menu"/>
            </header>
            <hr>
            <section class="content">
                <br-component component="main"/>
            </section>
            <hr>
            <footer>
                <br-component component="footer"/>
            </footer>
        </template>
    </br-page>
</template>

<script setup>
import axios from 'axios';

import VsBrMenu from './components/Base/VsBrMenu.vue';
import VsBrFooter from './components/Base/VsBrFooter.vue';
import VsBrMain from './components/Base/VsBrMain.vue';

// Get url of current page.
const route = useRoute().path;

// Get API endpoint from the server side.
const { data: endpoint } = await useFetch('/api/getEndpoint');

const configuration = {
    path: route,
    endpoint: endpoint.value,
    httpClient: axios,
};

const mapping = {
    'menu': VsBrMenu,
    'main': VsBrMain,
    'footer': VsBrFooter,
};
</script>
