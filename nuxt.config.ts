/* eslint no-undef: 0 */

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        VUE_APP_BRXM_ENDPOINT: process.env.VUE_APP_BRXM_ENDPOINT,
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    modules: [
        '@pinia/nuxt',
        'nuxt-jsonld',
    ],
    'nuxt-jsonld': {
        disableOptionsAPI: true,
    },
    css: [
        '@/assets/styles/main.scss',
        '@visitscotland/component-library-export/components/style.css',
    ],
    build: {
        transpile: [
            'bootstrap-vue-next',
        ],
    },
});
