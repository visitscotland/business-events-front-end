<template>
    <VsContainer
        class="py-4"
    >
        <VsAlert>
            <div>
                <p class="text-danger pb-2">
                    <strong>CMS ERROR!</strong>
                </p>

                <VsList>
                    <li
                        v-for="(error, index) in messages"
                        :key="index"
                    >
                        {{ error }}
                    </li>
                </VsList>
            </div>
        </VsAlert>
    </VsContainer>
</template>

<script lang="ts" setup>
import {
    VsContainer,
    VsAlert,
    VsList,
} from '@visitscotland/component-library/components';

const props = defineProps<{ messages: string[], }>();

const messages : string[] = props.messages;
</script>
