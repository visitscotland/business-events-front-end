<template>
    <!-- TODO - latitude, longitude, toggle-button-text, video, play-button-text -->
    <VsImageWithCaption
        :variant="variant"
        :is-hero-image="isHero"
        :mobile-overlap="mobileOverlap"
        :is-video="isVideo"
        :show-toggle="showToggle"
    >
        <!-- TODO - Move all srcset logic into component library with mixin for consistency -->
        <VsImg
            :src="imageValue.getOriginal().getUrl()"
            :alt="noAltText ? '' : imageData.altText"
            :use-lazy-loading="useLazyLoading"
        />

        <template
            #img-caption
        >
            <!-- TODO - latitude & longitude don't seem to be available for hero images, it comes
            down as a raw ImageSet without that info. Images in links have them but we need them
            here-->
            <VsCaption
                :variant="variant"
                :text-align="alignment"
            >
                <template
                    #caption
                >
                    {{ imageData.description }}
                </template>

                <template
                    v-if="imageData.source"
                    #toggle-icon
                >
                    <VsIcon
                        :name="imageData.source + '-filled'"
                        size="md"
                    />
                </template>

                <template
                    #credit
                >
                    <template
                        v-if="imageData.source"
                    >
                        <VsSocialCreditLink
                            :credit="imageData.credit"
                            :social-post-url="imageData.postUrl || ''"
                            :source="imageData.source"
                        />
                    </template>
                    <template
                        v-if="!imageData.source"
                    >
                        &copy; {{ imageData.credit }}
                    </template>
                </template>

                <!-- TODO - image source -->
            </VsCaption>
        </template>
    </VsImageWithCaption>
</template>

<script lang="ts" setup>
import { toRefs, inject } from 'vue';

import type { Page } from '@bloomreach/spa-sdk';

import {
    VsImageWithCaption,
    VsImg,
    VsCaption,
    VsSocialCreditLink,
    VsIcon,
} from '@visitscotland/component-library/dist/vs-component-library.mjs';

const props = defineProps<{
    image: any,
    variant: {
        type: string,
        default: 'fullwidth',
    },
    isHero: {
        type: boolean,
        default: false,
    },
    isVideo: {
        type: boolean,
        default: false,
    },
    mobileOverlap: {
        type: boolean,
        default: false,
    },
    alignment: {
        type: string,
        default: 'left',
    },
    videoId?: string,
    videoTitle?: string,
    smallPlayButton: {
        type: boolean,
        default: false,
    },
    useLazyLoading: {
        type: boolean,
        default: true,
    },
    noAltText: {
        type: boolean,
        default: false,
    },
    showToggle: {
        type: boolean,
        default: true,
    },
}>();

const {
    image,
    variant,
    isHero,
    isVideo,
    mobileOverlap,
    alignment,
    // videoId,
    // videoTitle,
    // smallPlayButton,
    useLazyLoading,
    noAltText,
    showToggle,
} = toRefs(props);

const page: Page | undefined = inject('page');
let imageValue: any;
let imageData: any;

if (page) {
    imageValue = page.getContent(image.value.$ref);
    imageData = imageValue.model.data;
}

</script>
