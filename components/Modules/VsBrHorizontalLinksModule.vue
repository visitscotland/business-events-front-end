<template>
    <section
        :class="[
            'vs-module-wrapper',
            `vs-module-wrapper--${theme}`,
            'text-start',
        ]"
    >
        <VsBrSectionHeader
            :heading="module.title"
            :lede="module.introduction?.value"
        />

        <VsContainer>
            <VsRow>
                <VsCol>
                    <VsContentSwiper
                        :next-button-label="configStore.getLabel('essentials.pagination', 'page.next')"
                        :previous-button-label="configStore.getLabel('essentials.pagination', 'page.previous')"
                        :slides-per-view-xs="1"
                        :slides-per-view-sm="2"
                        :slides-per-view-lg="3"
                        :slides-per-view-xl="4"
                    >
                        <VsContentSwiperSlide
                            v-for="(link, index) in links"
                            :key="index"
                        >
                            <VsCard>
                                <template
                                    #vs-card-header
                                    v-if="link.image || link.category"
                                >
                                    <VsBrMedia
                                        v-if="link.image"
                                        :image-string="link.image"
                                        image-classes="w-100 aspect-ratio-3-2 rounded-1 object-fit-cover img-zoom-on-hover"
                                    />

                                    <VsDetail
                                        v-if="link.category"
                                        color="tertiary"
                                        class="mb-0"
                                    >
                                        {{ link.category }}
                                    </VsDetail>
                                </template>

                                <template #vs-card-body>
                                    <VsHeading
                                        level="3"
                                        heading-style="heading-xs"
                                        class="mt-050"
                                    >
                                        <VsLink
                                            :href="link.url"
                                            class="stretched-link"
                                            variant="secondary"
                                            :type="link.type"
                                        >
                                            {{ link.label }}
                                        </VsLink>
                                    </VsHeading>
                                </template>
                            </VsCard>
                        </VsContentSwiperSlide>
                    </VsContentSwiper>
                </VsCol>
            </VsRow>
        </VsContainer>
    </section>
</template>

<script lang="ts" setup>
 
import { inject } from 'vue';

import type { Page } from '@bloomreach/spa-sdk';

import {
    VsContainer,
    VsRow,
    VsCol,
    VsContentSwiper,
    VsContentSwiperSlide,
    VsCard,
    VsHeading,
    VsLink,
    VsDetail,
} from '@visitscotland/component-library/components';

import VsBrMedia from '~/components/Modules/VsBrMedia.vue';
import VsBrSectionHeader from '~/components/Modules/VsBrSectionHeader.vue';

import useConfigStore from '~/stores/configStore.ts';

import formatLink from '~/composables/formatLink.ts';

const configStore = useConfigStore();

const props = defineProps<{ module: object, theme: string }>();
const module: any = props.module;
const theme: string = props.theme;

const page: Page | undefined = inject('page');
const links: any[] = [];

if (page && module.links) {
    for (let x = 0; x < module.links.length; x++) {
        const nextLink = module.links[x];

        let image: any = '';

        if (nextLink.image.cmsImage) {
            image = page.getContent(nextLink.image.cmsImage.$ref);
            image = image?.getOriginal().getUrl();
        } else if (nextLink.image.externalImage) {
            if (nextLink.image.externalImage.$ref) {
                image = page.getContent(nextLink.image.externalImage.$ref);
                image = image?.getOriginal().getUrl();
            } else {
                image = nextLink.image.externalImage;
            }
        }

        links.push({
            image,
            type: nextLink.type.toLowerCase(),
            url: formatLink(nextLink.link),
            'error-message': '',
            label: nextLink.label,
            teaser: nextLink.teaser,
            category: nextLink.category,
        });
    }
}

</script>
