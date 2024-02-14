import { defineStore } from 'pinia';

interface IConfigState {
    isBusinessEvents: boolean,
    productSearch: any,
    pageItems: any[],
    labels: any,
}

const useConfigStore = defineStore('configStore', {
    state: (): IConfigState => ({
        isBusinessEvents: false,
        productSearch: {
        },
        pageItems: [],
        labels: {
        },
    }),
});

export default useConfigStore;
