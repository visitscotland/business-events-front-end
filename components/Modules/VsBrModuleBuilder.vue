<template>
    <div v-for="item in modules">
        <VsBrListLinksModule
            v-if="item.type==='ListLinksModule'"
            :module="item"
        />
        <VsBrMultiImageLinksModule
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
    import VsBrListLinksModule from '../Modules/VsBrListLinksModule.vue';
    import VsBrMultiImageLinksModule from '../Modules/VsBrMultiImageLinksModule.vue';

    const props = defineProps<{
        modules: Object[],
    }>();

    const { modules } = props;
</script>