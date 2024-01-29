/* eslint no-undef: 0 */

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        VUE_APP_BRXM_ENDPOINT: process.env.VUE_APP_BRXM_ENDPOINT,
    },
    app: {
        head: {
            bodyAttrs: {
                class: 'd-flex flex-column h-100',
            },
            htmlAttrs: {
                class: 'h-100',
            },
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
                    integrity: 'sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor',
                    crossorigin: 'anonymous',
                },
            ],
            script: [
                {
                    src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js',
                    integrity: 'sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2',
                    crossorigin: 'anonymous',
                },
            ],
        },
    },
    modules: [
        '@pinia/nuxt',
    ],
    css: [
        '@/assets/styles/main.scss',
        '@visitscotland/component-library/components/style.css',
    ],
    build: {
        transpile: [
            'bootstrap-vue-next',
        ],
    },
});
