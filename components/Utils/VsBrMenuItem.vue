<template>
    <div>
        <li>
            <a
                :href="item.getUrl()"
            >
                {{ item.model.title }}
            </a>
            <ul>
                <li
                    v-for="childItem in item.getChildren()"
                >
                    <a
                        :href="childItem.getUrl()"
                    >
                        {{ childItem.model.title }}
                    </a>
                    <ul>
                        <li
                            v-for="grandChildItem in childItem.getChildren()"
                        >
                            <a
                                :href="grandChildItem.getUrl()"
                            >
                                {{ grandChildItem.model.title }}
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </div>
</template>

<script lang="ts" setup>
    import { toRefs } from 'vue';

    import { MenuItem } from '@bloomreach/spa-sdk';

    const props = defineProps<{ item : MenuItem }>();

    const { item } = toRefs(props);
</script>