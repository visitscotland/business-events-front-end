<template>
    <VsQuote
        :use-legacy="false"
        :quote-name="quote.authorName"
    >
        <template #quote-content>
            <VsBrRichText :input-content="quoteContent.value" />
        </template>

        <template
            #quote-details
            v-if="quote.authorTitle"
        >
            {{ quote.authorTitle }}
        </template>
    </VsQuote>
</template>

<script lang="ts" setup>
import { VsQuote } from '@visitscotland/component-library/components';
import VsBrRichText from '~/components/Modules/VsBrRichText.vue';

interface IProps {
    quote: any,
};

const props = defineProps<IProps>();

const quote: any = props.quote;

const quoteContent = quote.quote;
</script>
