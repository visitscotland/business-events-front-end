// Loaded only by the failure diagnostic to identify native addon load crashes.
const originalDlopen = process.dlopen;
process.dlopen = function(module, filename, ...args) {
    console.error(`Native addon loading: ${filename}`);
    const result = Reflect.apply(originalDlopen, this, [module, filename, ...args]);
    console.error(`Native addon loaded: ${filename}`);
    return result;
};
