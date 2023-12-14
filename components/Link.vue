<template>
    <a
        :href="formattedLink"
        :data-type="linkObj.label"
    >
        <img
            v-if="linkImage && showImage"
            :src="linkImage.getOriginal().getUrl()"
            alt=""
            style="max-width: 150px"
        />
        {{ linkObj.label }}
    </a>
</template>

<script lang="ts" setup>
    import { computed, inject} from 'vue';
    
    import { Link } from '@bloomreach/spa-sdk';
    
    const props = defineProps<{ linkObj: Link, showImage?: Boolean }>();
    const { linkObj } = props;

    const page = inject('page');

    // There is presumably a built in way to do this. Page.rewriteLinks seems to only work on
    // an html block rather than a string.
    const formattedLink = computed(() => linkObj.link.replace('/site/resourceapi', ''));

    let linkImage = {};

    if (page) {
        linkImage = page.getContent(linkObj.image.cmsImage.$ref);
    }
</script>