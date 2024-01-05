<template>
    <img
        v-bind="$attrs"
        v-if="imageValue"
        :src="imageValue.getOriginal().getUrl()"
    />
</template>

<script lang="ts" setup>
    import { Content, Page } from '@bloomreach/spa-sdk';

    const props = defineProps<{
        imageRef: String,
    }>();

    const { imageRef } = props;

    const page: Page | undefined = inject('page');
    let imageValue: Content | undefined;

    if (page) {
        imageValue = page.getContent(imageRef);
    }
</script>