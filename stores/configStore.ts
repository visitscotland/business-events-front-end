import { defineStore } from 'pinia';

interface IConfigState {
    isBusinessEvents: boolean,
    productSearch: any,
    otyml: any,
    pageItems: any[],
    labels: any,
    newsletterSignpost: any,
    locale: string,
    pageMetaData: any,
}

const useConfigStore = defineStore('configStore', {
    state: (): IConfigState => ({
        isBusinessEvents: false,
        productSearch: {
        },
        otyml: null,
        pageItems: [],
        labels: {
        },
        newsletterSignpost: {
        },
        locale: '',
        pageMetaData: {
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
