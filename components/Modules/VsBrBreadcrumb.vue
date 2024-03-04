<template>
    <VsBreadcrumb>
        <VsBreadcrumbItem
            key="home"
            :href="rootUrl + '/'"
            :text="configStore.getLabel('essentials.global', 'home')"
            :active="isHome"
        />

        <VsBreadcrumbItem
            v-for="(item, index) in filteredBreadcrumb"
            :key="index"
            :href="item.link.href"
            :text="item.title"
            :active="index === filteredBreadcrumb.length - 1"
        />
    </VsBreadcrumb>
</template>

<script lang="ts" setup>
/* eslint no-undef: 0 */
/* eslint vue/html-indent: 0 */
import { toRefs } from 'vue';

import {
    VsBreadcrumb,
    VsBreadcrumbItem,
} from '@visitscotland/component-library-export/components';

import useConfigStore from '~/stores/configStore.ts';

const configStore = useConfigStore();

const props = defineProps<{
    breadcrumb: any[],
    isHome: boolean,
}>();

const rootUrl = window ? window.location.origin : '';

const { breadcrumb, isHome } = toRefs(props);

const filteredBreadcrumb = breadcrumb.value
    ? breadcrumb.value.slice(1)
    : [];

let itemList : any[] = [
    {
        '@type': 'ListItem',
        position: 1,
        item: {
            '@id': `${ rootUrl }/`,
            name: configStore.getLabel('essentials.global', 'home'),
        },
    },
];

for (let x = 0; x < filteredBreadcrumb.length; x++) {
    itemList = itemList.concat({
        '@type': 'ListItem',
        position: x + 2,
        item: {
            '@id': `${ rootUrl }${ filteredBreadcrumb[x].link.href }`,
            name: filteredBreadcrumb[x].title,
        },
    });
}

useJsonld({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemList,
});

</script>
