import { defineStore } from 'pinia';

const useConfigStore = defineStore('configStore', {
    state: () => ({
        isBusinessEvents: false,
    }),
});

export default useConfigStore;
