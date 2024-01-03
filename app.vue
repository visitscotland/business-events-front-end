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

import { TYPE_CONTAINER_INLINE } from '@bloomreach/spa-sdk';

import Utility from './components/Base/Utility.vue';
import Menu from './components/Base/Menu.vue';
import Footer from './components/Base/Footer.vue';
import Main from './components/Base/Main.vue';

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
    'utility': Utility,
    'menu': Menu,
    'main': Main,
    'footer': Footer,
};
</script>
