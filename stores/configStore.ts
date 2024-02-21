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
    actions: {
        getLabel(section: string, key: string) {
            if (!this.labels || !this.labels[section]) {
                return '';
            }

            if (this.labels[section][key]) {
                return this.labels[section][key];
            }

            return '';
        },
    },
});

export default useConfigStore;
