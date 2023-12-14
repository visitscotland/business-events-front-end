export default defineEventHandler(() => {
    const { VUE_APP_BRXM_ENDPOINT } = useRuntimeConfig();
    return VUE_APP_BRXM_ENDPOINT;
})