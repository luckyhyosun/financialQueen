/**
 * Formats investment data for pie chart visualization
 * @param {Array} investments - Array of investment objects
 * @returns {Object} Formatted data and total
 */

export function formatDataForPieChartCB(investments) {
    // Ensure investments is an array
    const investmentsArray = Array.isArray(investments) ? investments : [];

    if (!investmentsArray || investmentsArray.length === 0) {
        return {
            data: [],
            total: 0,
        };
    }

    // Calculate total
    let total = 0;
    function addInvestmentAmountCB(item) {
        const amount = Number(item.amount) || 0;
        total += amount;
    }
    investmentsArray.forEach(addInvestmentAmountCB);

    // Format data for chart
    function formatInvestmentItemCB(item) {
        return {
            value: Number(item.amount) || 0,
            label: item.name || item.id || "Unnamed Investment",
        };
    }
    const data = investments.map(formatInvestmentItemCB);

    return { data, total };
}
