<template>
    <div
        class="vs-module-wrapper__outer"
        v-for="(item, index) in modules"
        :key="index"
        :id="`section-${index}`"
        :class="{ 'has-edit-button': page.isPreview() }"
    >
        <BrManageContentButton
            v-if="item.hippoBean && page"
            :content="page.getContent(item.hippoBean)"
        />

        <VsBrListLinksModule
            v-if="item.type === 'ListLinksModule'"
            :module="item"
            :theme="item.themeValue"
        />
        <VsBrMultiImageLinksModule
            v-else-if="item.type === 'MultiImageLinksModule'"
            :module="item"
            :theme="item.themeValue"
        />
        <VsBrSingleImageLinksModule
            v-else-if="item.type === 'SingleImageLinksModule'"
            :module="item"
            :theme="item.themeValue"
        />
        <VsBrArticleModule
            v-else-if="item.type === 'ArticleModule'"
            :module="item"
        />
        <span
            style="color: red"
            v-else
        >
            {{ item.type }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

import type { Page } from '@bloomreach/spa-sdk';
import { BrManageContentButton } from '@bloomreach/vue3-sdk';

import VsBrListLinksModule from '~/components/Modules/VsBrListLinksModule.vue';
import VsBrMultiImageLinksModule from '~/components/Modules/VsBrMultiImageLinksModule.vue';
import VsBrSingleImageLinksModule from '~/components/Modules/VsBrSingleImageLinksModule.vue';
import VsBrArticleModule from '~/components/Modules/VsBrArticleModule.vue';

import themeCalculator from '~/composables/themeCalculator.ts';

const props = defineProps<{
    modules: any[],
}>();

const { modules } = props;

const page: Page | undefined = inject('page');

const themeCount = 3;
let currentMegaLinkSection = -1;

if (modules) {
    for (let x = 0; x < modules.length; x++) {
        let newThemeIndex = 1;

        if (
            modules[x].type === 'ListLinksModule'
            || modules[x].type === 'MultiImageLinksModule'
            || modules[x].type === 'SingleImageLinksModule'
        ) {
            if (modules[x].title || currentMegaLinkSection === -1) {
                currentMegaLinkSection += 1;
            }

            newThemeIndex = currentMegaLinkSection % themeCount;
        }

        modules[x].themeIndex = newThemeIndex;
        modules[x].themeValue = themeCalculator(newThemeIndex, module);
    }
}
</script>
