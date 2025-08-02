/**
 * Local Storage utilities with CB naming convention
 */

// Keys used for localStorage
const STORAGE_KEYS = {
    USER_DATA: "userData",
    AUTH_FORM_STATE: "authFormState",
    REP_PRINCESS: "representativePrincessName",
    ANSWER_RATE: "sortedAnswerRate",
};

/**
 * Safely retrieves stored user data from localStorage
 * @returns {Object|null} User data or null if not found
 */
export function getStoredUserDataCB() {
    try {
        const userData = localStorage.getItem("userData");
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error("Error reading user data from localStorage:", error);
        return null;
    }
}

/**
 * Safely saves user data to localStorage
 * @param {Object} userData - User data to save
 */
export function saveUserDataCB(userData) {
    try {
        localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
        console.error("Error saving user data to localStorage:", error);
    }
}

/**
 * Removes user data from localStorage
 */
export function clearUserDataCB() {
    try {
        localStorage.removeItem("userData");
    } catch (error) {
        console.error("Error clearing user data from localStorage:", error);
    }
}

/**
 * Safely retrieves stored form state from localStorage
 * @returns {Object} Form state object with defaults
 */
export function getStoredFormStateCB() {
    try {
        const formState = localStorage.getItem("authFormState");
        return formState ? JSON.parse(formState) : getDefaultFormStateCB();
    } catch (error) {
        console.error("Error reading form state from localStorage:", error);
        return getDefaultFormStateCB();
    }
}

/**
 * Safely saves form state to localStorage (excluding sensitive fields)
 * @param {Object} formState - Form state to save
 */
export function saveFormStateCB(formState) {
    try {
        // Only save non-sensitive fields
        const safeState = {
            email: formState.email || "",
            name: formState.name || "",
            // Never save sensitive fields
            password: "",
            confirmPassword: "",
            formError: "",
            passwordMatchError: "",
        };

        localStorage.setItem(STORAGE_KEYS.AUTH_FORM_STATE, JSON.stringify(safeState));
    } catch (error) {
        console.error("Error saving form state to localStorage:", error);
    }
}

/**
 * Retrieves safe (non-sensitive) form state from localStorage
 * @returns {Object} Safe form state
 */
export function getSafeStoredFormStateCB() {
    const storedState = getStoredFormStateCB();
    return {
        email: storedState.email || "",
        name: storedState.name || "",
        // Always clear sensitive fields
        password: "",
        confirmPassword: "",
        formError: "",
        passwordMatchError: "",
    };
}

/**
 * Removes form state from localStorage
 */
export function clearFormStateCB() {
    try {
        localStorage.removeItem(STORAGE_KEYS.AUTH_FORM_STATE);
    } catch (error) {
        console.error("Error clearing form state from localStorage:", error);
    }
}

/**
 * Returns default form state structure
 * @returns {Object} Default form state
 */
function getDefaultFormStateCB() {
    return {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        formError: "",
        passwordMatchError: "",
    };
}

/**
 * Get stored quiz result
 */
export function getStoredQuizResult() {
    const storedRate = localStorage.getItem(STORAGE_KEYS.ANSWER_RATE) ?? null;
    let sortedAnswerRate = null;
    if (storedRate != undefined) {
        sortedAnswerRate = JSON.parse(storedRate);
    }
    const representativePrincessName = localStorage.getItem(STORAGE_KEYS.REP_PRINCESS);
    return {
        sortedAnswerRate: sortedAnswerRate ?? null,
        representativePrincessName: representativePrincessName ?? null,
    };
}

/**
 * Reset stored quiz
 */
export function resetStoredQuiz() {
    localStorage.removeItem(STORAGE_KEYS.ANSWER_RATE);
    localStorage.removeItem(STORAGE_KEYS.REP_PRINCESS);
}

/**
 * Completely clears all stored data
 */
export function clearAllStoredDataCB() {
    clearUserDataCB();
    clearFormStateCB();
}
