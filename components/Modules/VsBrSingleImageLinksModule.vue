<template>
    <VsMegalinks
        :title="module.title"
        variant="single-image"
    >
        <template
            v-if="module.introduction"
            #vs-megalinks-intro
        >
            <div
                v-html="module.introduction.value"
            />
        </template>

        <VsCol
            cols="12"
        >
            <!-- TODO - theme calc -->

            <VsMegalinkSingleImage
                :title="module.innerTitle"
                theme="dark"
                :button-link="module.cta && module.cta.link ? module.cta.link : ''"
                :alternate="module.alignment === 'left' ? true : false"
            >
                <template
                    #vs-single-image
                    v-if="module.image"
                >
                    <VsBrImageWithCaption
                        :mobile-overlap="true"
                        :alignment="module.alignment"
                        :image="module.image.cmsImage
                            ? module.image.cmsImage
                            : module.image.externalImage"
                    />
                </template>

                <template
                    #vs-single-image-content
                    v-if="module.introduction"
                >
                    <div v-html="module.innerIntroduction.value" />
                </template>

                <template
                    #vs-single-image-button-text
                    v-if="module.cta && module.cta.label"
                >
                    {{ module.cta.label }}
                </template>

                <template #vs-single-image-links>
                    <!-- TODO - Video links -->
                    <VsLinkListItem
                        v-for="(link, index) in module.links"
                        variant="on-dark"
                        :key="index"
                        :type="link.type.toLowerCase()"
                        :href="link.link"
                    >
                        {{ link.label }}
                    </VsLinkListItem>
                </template>
            </VsMegalinkSingleImage>
        </VsCol>
    </VsMegalinks>
</template>

<script lang="ts" setup>
import {
    VsMegalinks,
    VsMegalinkSingleImage,
    VsCol,
    VsLinkListItem,
} from '@visitscotland/component-library/dist/vs-component-library.mjs';

import VsBrImageWithCaption from './VsBrImageWithCaption.vue';

const props = defineProps<{ module: Object }>();
const module : any = props.module;

</script>

<style>
</style>
