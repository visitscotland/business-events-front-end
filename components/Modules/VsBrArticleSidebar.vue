<template>
    <!-- TODO - video -->
    <VsArticleSidebar
        :sidebar-align="alignment"
    >
        <template
            #vs-article-sidebar-img
            v-if="section.image"
        >
            <VsBrImageWithCaption
                :image="section.image.cmsImage"
            />
        </template>

        <template
            #vs-article-sidebar-quote
            v-if="section.quote"
        >
            <VsBrQuote
                :quote="section.quote"
            />
        </template>
    </VsArticleSidebar>
</template>

<script lang="ts" setup>
import { VsArticleSidebar } from '@visitscotland/component-library/components';

import VsBrImageWithCaption from './VsBrImageWithCaption.vue';
import VsBrQuote from './VsBrQuote.vue';

const props = defineProps<{ section: any, alignment: string }>();
const section: any = props.section;
const alignment: string = props.alignment;

</script>
