<template>
    <VsContainer>
        <VsRow>
            <VsCol
                cols="12"
                lg="8"
                offset-lg="2"
            >
                <VsBrImageWithCaption
                    :is-video="false"
                    :is-hero="false"
                    variant="fullwidth"
                    :image="image"
                />
            </VsCol>
        </VsRow>
    </VsContainer>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

import {
    VsContainer, VsRow, VsCol,
} from '@visitscotland/component-library/dist/vs-component-library.mjs';

import VsBrImageWithCaption from './VsBrImageWithCaption.vue';

const props = defineProps<{
    image?: any,
}>();

const { image } = toRefs(props);
</script>
