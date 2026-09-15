<template>
    <VsBrImageWithCaption
        v-if="videoId"
        :image="image"
        :variant="variant"
        :is-hero="isHero"
        :is-video="isVideo"
        :mobile-overlap="mobileOverlap"
        :alignment="alignment"
        :video-id="videoId"
        :video-title="videoTitle"
        :video-btn="videoBtn"
        :small-play-button="smallPlayButton"
        :use-lazy-loading="useLazyLoading"
        :no-alt-text="noAltText"
        :show-toggle="showToggle"
    />
    <figure
        v-else
        class="vs-br-media"
        :class="{ 'vs-br-media--mobile-overlap': mobileOverlap }"
    >
        <div class="vs-br-media__img-wrapper">
            <VsImg
                :src="imageSrc"
                :alt="altText"
                :use-lazy-loading="useLazyLoading"
                class="vs-br-media__img"
                :class="imageClasses"
            />
        </div>
        <figcaption>
            <VsMediaCaption
                v-if="imageData"
                :right-align="alignment === 'right'"
            >
                <template #caption>
                    {{ descriptionString }}
                </template>
                <template #credit>
                    <VsSocialCreditLink
                        v-if="imageData.source"
                        :credit="imageData.credit
                            ? imageData.credit
                            : configStore.getLabel('essentials.global', 'image.no.credit')"
                        :social-post-url="imageData.postUrl ? imageData.postUrl : ''"
                        :source="imageData.source"
                    />
                    <template v-else-if="imageData.credit">
                        &copy; {{ imageData.credit }}
                    </template>
                </template>
            </VsMediaCaption>
        </figcaption>
    </figure>
</template>

<script lang="ts" setup>
import { inject, toRefs } from 'vue';
import type { Page } from '@bloomreach/spa-sdk';
import {
    VsImg,
    VsMediaCaption,
    VsSocialCreditLink,
} from '@visitscotland/component-library/components';

import VsBrImageWithCaption from '~/components/Modules/VsBrImageWithCaption.vue';
import useConfigStore from '~/stores/configStore.ts';

const configStore = useConfigStore();

interface IProps {
    image?: any,
    imageString?: string,
    imageDescription?: string,
    imageClasses?: string,
    variant?: string,
    isHero?: boolean,
    isVideo?: boolean,
    mobileOverlap?: boolean,
    alignment?: string,
    videoId?: string,
    videoTitle?: string,
    videoBtn?: string,
    smallPlayButton?: boolean,
    useLazyLoading?: boolean,
    noAltText?: boolean,
    showToggle?: boolean,
}

const props = withDefaults(defineProps<IProps>(), {
    image: null,
    imageString: '',
    imageDescription: '',
    imageClasses: '',
    variant: 'fullwidth',
    isHero: false,
    isVideo: false,
    mobileOverlap: false,
    alignment: 'left',
    videoId: '',
    videoTitle: '',
    videoBtn: '',
    smallPlayButton: false,
    useLazyLoading: true,
    noAltText: false,
    showToggle: true,
});

const {
    image,
    imageString,
    imageDescription,
    imageClasses,
    variant,
    isHero,
    isVideo,
    mobileOverlap,
    alignment,
    videoId,
    videoTitle,
    videoBtn,
    smallPlayButton,
    useLazyLoading,
    noAltText,
    showToggle,
} = toRefs(props);

const page: Page | undefined = inject('page');
let imageData: any;
let imageSrc = 'https://static.visitscotland.com/img/fallback-img.png';
let descriptionString = '';
let altText = '';

if (page && image.value) {
    const imageValue: any = page.getContent(image.value.$ref);

    if (imageValue) {
        imageData = imageValue.model.data;
        imageSrc = imageValue.getOriginal().getUrl();
        altText = noAltText.value
            ? configStore.getLabel('essentials.global', 'default.alt-text')
            : imageData.altText;
        descriptionString = imageDescription.value || imageData.description;
    }
}

if (imageString.value) {
    imageSrc = imageString.value;
}
</script>

<style lang="scss">
    .vs-br-media__img-wrapper {
        position: relative;
        aspect-ratio: 3/2;

        @supports not (aspect-ratio: 3/2) {
            padding-bottom: 66.6%;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            align-self: flex-start;
            flex-shrink: 0;
        }
    }

    @media (min-width: 992px) {
        .vs-megalink-single-image .vs-br-media {
            margin: 0 0 calc(var(--negative-margin) - 4rem);
        }
    }
</style>
