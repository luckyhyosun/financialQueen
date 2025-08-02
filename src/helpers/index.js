export function getAssetsURL() {
    if (import.meta.env.MODE === "production") {
        return "https://once-upon-a-budget.web.app";
    }
    return "http://localhost:8080";
}

/**
 * Debounce Function
 * to delay calling some function
 * @param {function} fn function to execute after timeout
 * @param {number} delay time in miliseconds
 *
 */
export function debounceIt(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
