<template>
    <div>
        <VsBrGeneral
            v-if="pageName === 'general-page'"
            :page="page"
            :component="component"
        />
        <VsBr404
            v-else-if="pageName === 'pagenotfound'"
            :page="page"
            :component="component"
        />
        <div
            v-else
        >
            <span
                style="color: red"
            >
                Page type: {{ pageName }}
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { toRefs, provide } from 'vue';
import type { Component, Page } from '@bloomreach/spa-sdk';

import VsBrGeneral from '../PageTypes/VsBrGeneral.vue';
import VsBr404 from '../PageTypes/VsBr404.vue';

const props = defineProps<{ component: Component, page: Page }>();

const { component, page } = toRefs(props);

let pageComponent : any = {
};
let pageName = '';

if (page.value) {
    pageComponent = page.value.getComponent();
    pageName = pageComponent.model.name;
}

provide('page', page.value);
</script>
