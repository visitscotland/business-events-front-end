<template>
    <img
        v-bind="$attrs"
        v-if="imageValue"
        :src="imageValue.getOriginal().getUrl()"
        :alt="imageValue.altText"
    >
</template>

<script lang="ts" setup>
/* eslint no-undef: 0 */

import type { Page } from '@bloomreach/spa-sdk';

const props = defineProps<{
    image: any,
}>();

const { image } = props;

const page: Page | undefined = inject('page');
let imageValue: any;

if (page) {
    imageValue = page.getContent(image.$ref);
}
</script>
