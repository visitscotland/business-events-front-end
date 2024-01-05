<template>
    <div>
        <General
            v-if="pageName === 'general-page'"
            :page=page
            :component=component
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
    import { Component, Page } from '@bloomreach/spa-sdk';

    import General from '../PageTypes/General.vue';

    const props = defineProps<{ component: Component, page: Page }>();

    const { component, page } = toRefs(props);

    let pageName = '';

    if (page.value) {
        pageName = page.value.getComponent().model.name;
    }

    provide('page', page.value);
</script>