/**
 * Generates chart configuration based on screen size
 * @param {boolean} isMobileSm - Is small mobile device
 * @param {boolean} isMobile - Is mobile device
 * @returns {Object} Chart configuration object
 */
export function createChartConfig(isMobileSm, isMobile) {
    return {
        width: isMobileSm ? 280 : 300,
        height: isMobileSm ? 280 : 300,
        outerRadius: isMobileSm ? 90 : 100,
        legendHidden: isMobileSm,
    };
}
