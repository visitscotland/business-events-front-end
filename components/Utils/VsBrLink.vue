<template>
    <a
        :href="formattedLink"
        :data-type="linkObj.label"
    >

        <VsBrImage
            v-if="linkImage && showImage"
            :image="linkImage"
            style="max-width: 150px"
        />

        {{ linkObj.label }}
    </a>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';

import VsBrImage from '~/components/Utils/VsBrImage.vue';

const props = defineProps<{ linkObj: any, showImage?: Boolean }>();
const { linkObj } = props;

const page = inject('page');

// There is presumably a built in way to do this. Page.rewriteLinks seems to only work on
// an html block rather than a string.
const formattedLink = computed(() => linkObj.link.replace('/site/resourceapi', ''));

let linkImage = {
};

if (page) {
    linkImage = linkObj.image.cmsImage;
}
</script>
