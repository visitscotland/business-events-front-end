<template>
    <div>
        <p>This is the top</p>
    </div>
</template>

<script lang="ts" setup>
    import { Component, Page } from '@bloomreach/spa-sdk';

    const props = defineProps<{ component: Component, page: Page }>();
    const { component, page } = props;
</script>