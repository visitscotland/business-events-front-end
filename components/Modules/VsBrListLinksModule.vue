<template>
    <div class="link-list-module">
        <h2>Link List Module</h2>
        <span>title = {{ module.title }}</span>
        <span v-if="module.introduction">introduction = {{ module.introduction.value }}</span>
        <span>links</span>
        <span>---</span>
        <div
            v-for="link in module.links"
        >
            <VsBrLink
                :linkObj="link"
            >
            </VsBrLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import VsBrLink from '../Utils/VsBrLink.vue';

    const props = defineProps<{ module: Object }>();
    const { module } = props;
    
</script>

<style>
    div.link-list-module {
        span {
            display: block;
        }
    }
</style>