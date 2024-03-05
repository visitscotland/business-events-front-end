/* eslint no-undef: 0 */

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        BR_RESOURCE_API_ENDPOINT: process.env.BR_RESOURCE_API_ENDPOINT,
        public: {
            BR_CMS_ORIGIN_LOCATION: process.env.BR_CMS_ORIGIN_LOCATION,
        },
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
