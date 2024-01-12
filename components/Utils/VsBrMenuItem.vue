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
                    v-for="(childItem, index) in item.getChildren()"
                    :key="index"
                >
                    <a
                        :href="childItem.getUrl()"
                    >
                        {{ childItem.model.title }}
                    </a>
                    <ul>
                        <li
                            v-for="(grandChildItem, grandChildIndex) in childItem.getChildren()"
                            :key="grandChildIndex"
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
import type { MenuItem } from '@bloomreach/spa-sdk';

const props = defineProps<{ item : MenuItem }>();

const item : any = props.item;
</script>
