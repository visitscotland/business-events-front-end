/* eslint no-undef: 0 */

import fs from 'node:fs';
import path from 'node:path';

function bufferFile(relPath: string) {
    return fs.readFileSync(path.join(__dirname, relPath), {
        encoding: 'utf8',
    });
}

const clVersion = bufferFile('.clversion');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        BR_RESOURCE_API_ENDPOINT: process.env.BR_RESOURCE_API_ENDPOINT,
        BR_X_FORWARDED_HOST: process.env.BR_X_FORWARDED_HOST,
        public: {
            BR_CMS_ORIGIN_LOCATION: process.env.BR_CMS_ORIGIN_LOCATION,
            BR_NUXT_APP_DEBUG: process.env.BR_NUXT_APP_DEBUG,
            COMP_LIBRARY_VERSION: clVersion,
            AWS_IDENTITY_POOL_ID: process.env.AWS_IDENTITY_POOL_ID,
            AWS_RUM_ENPOINT: process.env.AWS_RUM_ENPOINT,
            AWS_RUM_APPLICATION_ID: process.env.AWS_RUM_APPLICATION_ID,

        },
    },

    vite: {
        resolve: {
            preserveSymlinks: true,
        },
        build: {
            cssCodeSplit: false,
        },
    },

    experimental: {
        payloadExtraction: false,
        inlineSSRStyles: false,
    },

    future: {
        compatibilityVersion: 4,
    },

    vue: {
        runtimeCompiler: true,
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
        '@visitscotland/component-library/style.css',
    ],

    build: {
        transpile: [
            'bootstrap-vue-next',
            '@visitscotland/component-library',
        ],
    },

    typescript: {
        tsConfig: {
            compilerOptions: {
                noUncheckedIndexedAccess: false,
            },
        },
    },

    compatibilityDate: '2026-06-26',
});
