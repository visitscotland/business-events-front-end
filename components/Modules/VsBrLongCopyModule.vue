<template>
    <VsContainer
        class="mb-10"
    >
        <VsRow>
            <VsCol
                cols="12"
                md="12"
                lg="7"
                xl="7"
                class="col-xxl-6"
            >
                <VsRichTextWrapper>
                    <div v-html="module.copy.value" />
                </VsRichTextWrapper>
            </VsCol>
        </VsRow>
    </VsContainer>
</template>

<script lang="ts" setup>

import {
    VsContainer,
    VsRow,
    VsCol,
    VsRichTextWrapper,
} from '@visitscotland/component-library/components';

const props = defineProps<{ module: Object }>();
const module: any = props.module;

</script>
