<template>
    <div>
        <p>This is a container</p>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps<{ component: Component, page: Page }>();
    const { component, page } = props;
</script>