<template>
    <div
        class="vs-module-wrapper__outer"
        v-for="(item, index) in modules"
        :key="index"
    >
        <VsBrListLinksModule
            v-if="item.type === 'ListLinksModule'"
            :module="item"
        />
        <VsBrMultiImageLinksModule
            v-else-if="item.type === 'MultiImageLinksModule'"
            :module="item"
        />
        <VsBrSingleImageLinksModule
            v-else-if="item.type === 'SingleImageLinksModule'"
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
import VsBrListLinksModule from './VsBrListLinksModule.vue';
import VsBrMultiImageLinksModule from './VsBrMultiImageLinksModule.vue';
import VsBrSingleImageLinksModule from './VsBrSingleImageLinksModule.vue';

const props = defineProps<{
    modules: any[],
}>();

const { modules } = props;
</script>
