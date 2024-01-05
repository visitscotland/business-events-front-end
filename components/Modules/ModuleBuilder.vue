<template>
    <div v-for="item in modules">
        <ListLinksModule
            v-if="item.type==='ListLinksModule'"
            :module="item"
        />
        <MultiImageLinksModule
            v-else-if="item.type==='MultiImageLinksModule'"
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
    import ListLinksModule from '../Modules/ListLinksModule.vue';
    import MultiImageLinksModule from '../Modules/MultiImageLinksModule.vue';

    const props = defineProps<{
        modules: Object[],
    }>();

    const { modules } = props;
</script>