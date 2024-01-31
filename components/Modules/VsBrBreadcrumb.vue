<template>
    <VsBreadcrumb>
        <VsBreadcrumbItem
            key="home"
            href="/"
            text="Home"
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
import { toRefs } from 'vue';

import {
    VsBreadcrumb,
    VsBreadcrumbItem,
} from '@visitscotland/component-library/components';

const props = defineProps<{
    breadcrumb: any[],
    isHome: boolean,
}>();

const { breadcrumb, isHome } = toRefs(props);

const filteredBreadcrumb = breadcrumb.value.slice(1);

</script>
