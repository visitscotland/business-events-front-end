/* eslint no-undef: 0 */

import fs from 'fs';
import path from 'path';

function bufferFile(relPath: string) {
    return fs.readFileSync(path.join(__dirname, relPath), {
        encoding: 'utf8',
    });
}

const clVersion = bufferFile('.clversion');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    hooks: {
        'build:manifest': (manifest) => {
            // find the app entry, css list
            const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css
            if (css) {
                // start from the end of the array and go to the beginning
                for (let i = css.length - 1; i >= 0; i--) {
                // if it starts with 'entry', remove it from the list
                    if (css[i].startsWith('entry')) css.splice(i, 1)
                }
            }
        },
    },
    runtimeConfig: {
        BR_RESOURCE_API_ENDPOINT: process.env.BR_RESOURCE_API_ENDPOINT,
        BR_X_FORWARDED_HOST: process.env.BR_X_FORWARDED_HOST,
        public: {
            BR_CMS_ORIGIN_LOCATION: process.env.BR_CMS_ORIGIN_LOCATION,
            BR_NUXT_APP_DEBUG: process.env.BR_NUXT_APP_DEBUG,
            COMP_LIBRARY_VERSION: clVersion,
        },
    },
    vite: {
        resolve: {
            preserveSymlinks: true,
        },
        build: {
            cssCodeSplit: true,
        },
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
    buildModules: [
        '@nuxtjs/dotenv',
    ],
    modules: [
        '@pinia/nuxt',
        'nuxt-jsonld',
        'nuxt-lazy-hydrate',
    ],
    'nuxt-jsonld': {
        disableOptionsAPI: true,
    },
    build: {
        transpile: [
            'bootstrap-vue-next',
            '@visitscotland/component-library',
        ],
    },
    experimental: {
        inlineSSRStyles: false,
    },
});
