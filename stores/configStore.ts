import { defineStore } from 'pinia';

const useConfigStore = defineStore('configStore', {
    state: () => ({
        isBusinessEvents: false,
        socialLinks: {
        },
        productSearch: {
        },
        pageItems: [],
    }),
});

export default useConfigStore;
