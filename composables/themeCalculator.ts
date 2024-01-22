const themeCalculator = (
    themeIndex?: number,
    module?: any,
    colourSchemeParam?: string[],
) => {
    let colourScheme = [
        'dark',
        'light',
        'light',
    ];

    if (colourSchemeParam) {
        colourScheme = colourSchemeParam;
    };

    if (themeIndex !== undefined) {
        return colourScheme[themeIndex];
    }

    if (module) {
        if (module.type === 'ICentreModule') {
            return 'grey';
        }

        if (module.type === 'TravelInformationModule') {
            return 'grey';
        }
    }

    return 'light';
};

export default themeCalculator;
