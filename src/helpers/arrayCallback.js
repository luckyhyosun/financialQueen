/**
 * Filter Callback
 * check array item and remove if different with comparator
 * @param {any} comparator reference to compare
 * @returns {function} function callback for array method
 */
export function filterCB(comparator) {
    return function shouldWeKeepItemCB(arrayItem) {
        return comparator != arrayItem;
    };
}
