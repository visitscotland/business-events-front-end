<template>
    <VsModuleWrapper theme="grey">
        <template #vs-module-wrapper-heading>
            Signpost Title
        </template>

        <VsContainer>
            <VsRow>
                <VsCol
                    cols="12"
                    sm="7"
                    md="6"
                    lg="5"
                    offset-lg="1"
                    class="text-center text-sm-start col-xxl-4"
                >
                    <VsRichTextWrapper
                        variant="lead"
                        class="mb-9 mb-lg-10"
                    >
                        <p>Signpost Text</p>
                    </VsRichTextWrapper>

                    <VsButton
                        href="#"
                    >
                        Signpost CTA
                    </VsButton>
                </VsCol>
                <VsCol
                    cols="10"
                    offset="1"
                    sm="5"
                    offset-sm="0"
                    md="6"
                    lg="5"
                    xl="5"
                    class="text-center text-lg-start col-xxl-5 offset-xxl-1"
                >
                    <VsImg
                        src="img"
                        class="mt-10 mt-sm-2 w-100 h-auto"
                        style="aspect-ratio:267/206"
                    />
                </VsCol>
            </VsRow>
        </VsContainer>
    </VsModuleWrapper>
</template>

<script lang="ts" setup>
import {
    VsModuleWrapper,
    VsContainer,
    VsRow,
    VsCol,
    VsRichTextWrapper,
    VsButton,
    VsImg,
} from '@visitscotland/component-library-export/components';

</script>
