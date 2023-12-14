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
            <Link
                :linkObj="link"
            >
            </Link>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { inject } from 'vue';

    import Link from './Link.vue';

    const props = defineProps<{ module: Object }>();
    const { module } = props;

    const page = inject('page');
    
</script>

<style>
    div.link-list-module {
        span {
            display: block;
        }
    }
</style>