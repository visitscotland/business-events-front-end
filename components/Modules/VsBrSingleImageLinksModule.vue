<template>
    <VsMegalinks
        :title="module.title"
        variant="single-image"
        :theme="theme"
        :cookie-link-text="configStore.getLabel('essentials.global', 'cookie.link-message')"
        :no-cookies-message="configStore.getLabel('video', 'video.no-cookies')"
        :no-js-message="configStore.getLabel('video', 'video.no-js')"
    >
        <template
            v-if="module.introduction"
            #vs-megalinks-intro
        >
            <VsBrRichText :input-content="module.introduction.value" />
        </template>

        <VsCol
            cols="12"
        >
            <VsMegalinkSingleImage
                :title="module.innerTitle"
                :button-link="module.cta && module.cta.link ? formatLink(module.cta.link) : ''"
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
                    v-if="module.innerIntroduction"
                >
                    <VsBrRichText :input-content="module.innerIntroduction.value" />
                </template>

                <template
                    #vs-single-image-button-text
                    v-if="module.cta && module.cta.label"
                >
                    {{ module.cta.label }}
                </template>

                <template #vs-single-image-links>
                    <template
                        v-for="(link, index) in module.links"
                        :key="index"
                    >
                        <VsLinkListItem
                            :type="link.type.toLowerCase()"
                            :href="link.youtubeId
                                ? '#'
                                : formatLink(link.link)
                            "
                            :video-id="link.youtubeId
                                ? link.youtubeId
                                : ''
                            "
                            :video-descriptor="configStore.getLabel('video', 'video.video-descriptor')"
                        >
                            {{ link.label }}
                        </VsLinkListItem>

                        <VsBrVideoModal
                            v-if="link.youtubeId"
                            :is-video-modal="true"
                            :close-btn-text="configStore.getLabel('essentials.global', 'close')"
                            :modal-id="link.youtubeId"
                            :video="link"
                        />
                    </template>
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
} from '@visitscotland/component-library/components';

import useConfigStore from '~/stores/configStore.ts';

import formatLink from '~/composables/formatLink.ts';

import VsBrImageWithCaption from '~/components/Modules/VsBrImageWithCaption.vue';
import VsBrRichText from '~/components/Modules/VsBrRichText.vue';

const configStore = useConfigStore();

const props = defineProps<{ module: Object, theme: string }>();
const module: any = props.module;
const theme: string = props.theme;

</script>

<style lang="scss">
</style>
