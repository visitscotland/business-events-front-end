<template>
    <div
        class="vs-module-wrapper__outer"
        v-for="(item, index) in modules"
        :key="index"
    >
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
        <span
            style="color: red"
            v-else
        >
            {{ item.type }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import VsBrListLinksModule from './VsBrListLinksModule.vue';
import VsBrMultiImageLinksModule from './VsBrMultiImageLinksModule.vue';
import VsBrSingleImageLinksModule from './VsBrSingleImageLinksModule.vue';

import themeCalculator from '../../composables/themeCalculator.ts';

const props = defineProps<{
    modules: any[],
}>();

const { modules } = props;

const themeCount = 3;
let currentMegaLinkSection = -1;

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
</script>
