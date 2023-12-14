<template>
    <div class="multi-image-links-module">
        <h2>Multi Image Link Module</h2>
        <span>title = {{ module.title }}</span>
        <span v-if="module.introduction">introduction = {{ module.introduction.value }}</span>
        <span>links</span>
        <span>---</span>
        <div
            v-for="link in module.links"
            class="image-link"
        >
            <Link
                :linkObj="link"
                showImage="true"
            >
            </Link>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Link from './Link.vue';

    const props = defineProps<{ module: Object }>();
    const { module } = props;
    
</script>

<style>
    div.multi-image-links-module {
        span {
            display: block;
        }

        .image-link {
            padding: 1rem;
        }
    }
</style>