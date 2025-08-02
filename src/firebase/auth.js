// service-layer that directly interacts with Firebase Auth
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    fetchSignInMethodsForEmail,
    updateProfile,
} from "firebase/auth";
import { app } from "./index.js";

// Initialize Firebase auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Check if an email is already registered and with which methods
 * @param {string} email Email to check
 * @returns {Function} Function that when executed checks for auth methods
 */
export function checkEmailMethodsACB(email) {
    return async function executeACB() {
        try {
            // This returns an array of strings, representing the auth providers
            // Examples: ["password", "google.com", "facebook.com"]
            const methods = await fetchSignInMethodsForEmail(auth, email);
            return {
                methods,
                success: true,
            };
        } catch (error) {
            console.error("Error checking email auth methods:", error);
            return {
                error: error.message,
                success: false,
                methods: [],
            };
        }
    };
}

/**
 * Sign in with Google
 * @returns {Promise<Object>} Result with user data or error
 */
export function signInWithGoogleACB() {
    return async function executeACB() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return {
                user: result.user,
                success: true,
            };
        } catch (error) {
            console.error("Error signing in with Google:", error);
            // Handle popup closed by user
            if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
                return { success: false, error: "Sign-in was cancelled" };
            }
            return {
                error: "Google sign-in failed. Please try again.",
                success: false,
            };
        }
    };
}

/**
 * Sign in with email and password
 * @param {string} email User's email
 * @param {string} password User's password
 * @returns {Promise<Object>} Result with user data or error
 */
export function signInWithEmailACB(email, password) {
    return async function executeACB() {
        try {
            // First check what authentication methods this email uses
            const methodsResult = await checkEmailMethodsACB(email)();

            // If the email exists with Google but not password, direct them to Google sign-in
            if (
                methodsResult.success &&
                methodsResult.methods &&
                methodsResult.methods.includes("google.com") &&
                !methodsResult.methods.includes("password")
            ) {
                return {
                    error: "This email is registered with Google. Please use the 'Continue with Google' button instead.",
                    success: false,
                };
            }

            // Proceed with normal email/password sign-in
            const result = await signInWithEmailAndPassword(auth, email, password);
            return {
                user: result.user,
                success: true,
            };
        } catch (error) {
            console.error("Error signing in with email/password:", error);

            // Specific friendly error messages
            let errorMessage;

            if (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password"
            ) {
                errorMessage =
                    "Invalid email or password. If you signed up with Google, please use the Google Sign-In button instead.";
            } else if (error.code === "auth/too-many-requests") {
                errorMessage = "Too many failed login attempts. Please try again later.";
            } else {
                errorMessage = "Sign-in failed. Please try again.";
            }

            return {
                error: errorMessage,
                success: false,
            };
        }
    };
}

/**
 * Create new user with email and password
 * @param {string} email User's email
 * @param {string} password User's password
 * @param {string} name User's display name (optional)
 * @returns {Promise<Object>} Result with user data or error
 */
export function createUserWithEmailACB(email, password, name) {
    return async function executeACB() {
        try {
            // First check if the email already exists
            const methodsResult = await checkEmailMethodsACB(email)();

            // If the email exists, provide appropriate guidance
            if (methodsResult.success && methodsResult.methods && methodsResult.methods.length > 0) {
                if (methodsResult.methods.includes("google.com")) {
                    return {
                        error: "This email is already used with Google. Please use the 'Continue with Google' button instead.",
                        success: false,
                    };
                } else {
                    return {
                        error: "This email is already registered. Please sign in instead.",
                        success: false,
                    };
                }
            }

            // Create the user
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // If name is provided, update the profile
            if (name) {
                await updateProfile(result.user, {
                    displayName: name,
                });

                // Return the updated user
                return {
                    user: auth.currentUser, // Get fresh user data with updated profile
                    success: true,
                };
            }

            return {
                user: result.user,
                success: true,
            };
        } catch (error) {
            console.error("Error creating user with email/password:", error);

            // Friendly error messages
            let errorMessage;

            if (error.code === "auth/email-already-in-use") {
                errorMessage = "This email is already registered. Please sign in instead.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Please provide a valid email address.";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Password is too weak. Please choose a stronger password.";
            } else {
                errorMessage = "Sign-up failed. Please try again.";
            }

            return {
                error: errorMessage,
                success: false,
            };
        }
    };
}

/**
 * Sign out the current user
 * @returns {Promise<Object>} Result with success or error
 */
export function signOutACB() {
    return async function executeACB() {
        try {
            await firebaseSignOut(auth);
            return { success: true };
        } catch (error) {
            console.error("Error signing out:", error);
            return {
                error: "Sign out failed. Please try again.",
                success: false,
            };
        }
    };
}

// Export auth instance for listening to auth state changes
export { auth };
