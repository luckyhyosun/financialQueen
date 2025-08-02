/**
 * Authentication validation utilities
 */

import { checkEmailMethodsACB } from "../../firebase/auth.js";

/**
 * Validates password fields
 * @param {string} password - Primary password
 * @param {string} confirmPassword - Confirmation password
 * @param {boolean} forSubmission - Whether this is for form submission
 * @returns {Object} Validation result with isValid and error
 */
export function validatePasswordsCB(password, confirmPassword, forSubmission = true) {
    if (!forSubmission && (!password || !confirmPassword)) {
        return { isValid: true, error: "" };
    }

    if (forSubmission && (!password || !confirmPassword)) {
        return { isValid: false, error: "Both password fields are required" };
    }

    if (password !== confirmPassword) {
        return { isValid: false, error: "Passwords do not match" };
    }

    if (password.length < 6) {
        return { isValid: false, error: "Password must be at least 6 characters" };
    }

    return { isValid: true, error: "" };
}
/**
 * Formats error messages for consistent display
 */
export function formatErrorMessageCB(error, fallback = "An unexpected error occurred") {
    if (typeof error === "string") return error;
    if (error?.message) return error.message;
    return fallback;
}

/**
 * Checks if email is already registered with Google
 */
export async function checkIfEmailUsedWithGoogleACB(email) {
    try {
        const checkFn = checkEmailMethodsACB(email);
        const { methods, success } = await checkFn();

        if (success && methods?.includes("google.com")) {
            return {
                isGoogleEmail: true,
                error: "This email is already registered with Google. Please use 'Continue with Google' instead.",
            };
        }

        return { isGoogleEmail: false, error: null };
    } catch (error) {
        console.error("Error checking email methods:", error);
        return { isGoogleEmail: false, error: null };
    }
}
