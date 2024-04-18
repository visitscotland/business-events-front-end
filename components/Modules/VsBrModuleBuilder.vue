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
            :content="hippoContent[index]"
        />

        <template
            v-if="item.type === 'ListLinksModule'"
        >
            <VsBrListLinksModule
                v-if="hippoContent[index].model.data.layout === 'List'"
                :module="item"
                :theme="item.themeValue"
            />

            <VsBrHorizontalLinksModule
                v-if="hippoContent[index].model.data.layout === 'Horizontal Links'"
                :module="item"
                :theme="item.themeValue"
            />
        </template>

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

        <VsBrLongCopyModule
            v-else-if="item.type === 'LongCopyModule'"
            :module="item"
        />

        <VsBrForm
            v-else-if="item.type === 'FormModule'"
            :module="item"
        />

        <div
            v-else-if="item.type === 'ErrorModule'"
        >
            <VsBrPreviewError
                v-if="page.isPreview()"
                :messages="item.errorMessages"
            />
        </div>

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
import VsBrHorizontalLinksModule from '~/components/Modules/VsBrHorizontalLinksModule.vue';
import VsBrMultiImageLinksModule from '~/components/Modules/VsBrMultiImageLinksModule.vue';
import VsBrSingleImageLinksModule from '~/components/Modules/VsBrSingleImageLinksModule.vue';
import VsBrArticleModule from '~/components/Modules/VsBrArticleModule.vue';
import VsBrLongCopyModule from '~/components/Modules/VsBrLongCopyModule.vue';
import VsBrForm from '~/components/Modules/VsBrForm.vue';
import VsBrPreviewError from '~/components/Modules/VsBrPreviewError.vue';

import themeCalculator from '~/composables/themeCalculator.ts';

const props = defineProps<{
    modules: any[],
}>();

const { modules } = props;

const page: Page | undefined = inject('page');

const themeCount = 3;
let currentMegaLinkSection = -1;
const hippoContent : any = {
};

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
        modules[x].themeValue = themeCalculator(newThemeIndex, modules[x]);

        if (modules[x].hippoBean) {
            hippoContent[x] = page.getContent(modules[x].hippoBean);
        }
    }
}
</script>
