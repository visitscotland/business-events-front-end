<template>
    <VsContainer
        class="mb-10"
    >
        <VsRow>
            <VsCol
                cols="12"
                md="10"
                lg="7"
                class="col-xxl-6"
            >
                <VsMarketoForm
                    :data-url="module.jsonUrl"
                    :messaging-url="configStore.getLabel('forms', 'form.messaging-url')"
                    :country-list-url="configStore.getLabel('forms', 'form.country-url')"
                    :recaptcha-key="configStore.getLabel('forms', 'form.recaptcha-key')"
                    language="en"
                    :marketo-instance="module.isProduction
                        ? configStore.getLabel('forms', 'form.marketo-instance-prod')
                        : configStore.getLabel('forms', 'form.marketo-instance-sandbox')"
                    :munchkin-id="module.isProduction
                        ? configStore.getLabel('forms', 'form.munchkin-prod')
                        : configStore.getLabel('forms', 'form.munchkin-sandbox')"
                    :is-prod="module.isProduction"
                    :recaptcha-textarea-label="configStore.getLabel('forms', 'form.recaptcha-textarea-label')"
                >
                    <template #no-js>
                        {{ configStore.getLabel('forms', 'form.no-js') }}
                    </template>

                    <template #submit-error>
                        {{ configStore.getLabel('forms', 'form.error') }}
                    </template>

                    <template #submitting>
                        {{ configStore.getLabel('forms', 'form.submitting') }}
                    </template>
                </VsMarketoForm>
            </VsCol>
        </VsRow>
    </VsContainer>
</template>

<script lang="ts" setup>
import useConfigStore from '~/stores/configStore.ts';

import {
    VsContainer,
    VsRow,
    VsCol,
    VsMarketoForm,
} from '@visitscotland/component-library-export/components';

const configStore = useConfigStore();

const props = defineProps<{ module: Object }>();
const module: any = props.module;

</script>
