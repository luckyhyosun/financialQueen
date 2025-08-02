/**
 * Date Formatter
 * convert JS milimeter format to human readable date format
 * @param {string} mmDate Date in miliseconds
 * @returns {string|null} Date format or null if invalid input presented
 */
export function formatHumanDate(mmDate) {
    const dateObj = new Date(mmDate);
    if (isFinite(dateObj.valueOf())) {
        const dateOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return dateObj.toLocaleDateString("en-GB", dateOptions);
    }
    return null;
}
