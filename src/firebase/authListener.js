import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import { authSuccess, signOutSuccess, authFailed, fetchUser } from "../store/slices/userSlice";

/**
 * Initialize auth state listener
 * @param {Object} store Redux store
 * @returns {Function} Unsubscribe function
 */
export function initAuthListenerACB(store) {
    return function setupListenerACB() {
        return onAuthStateChanged(
            auth,
            async function authStateChangedACB(user) {
                if (user) {
                    try {
                        // Wait for the ID token to ensure the user is fully authenticated
                        await user.getIdToken();

                        // First dispatch auth success to set user authentication state
                        store.dispatch(
                            authSuccess({
                                uid: user.uid,
                                email: user.email,
                                displayName: user.displayName,
                                photoURL: user.photoURL,
                            })
                        );

                        // Then fetch user data from Firestore
                        // This will be handled by the middleware and will set isReady to true
                        store.dispatch(fetchUser({ id: user.uid }));
                    } catch (error) {
                        console.error("Error getting ID token:", error);
                        store.dispatch(authFailed("Authentication token error"));
                    }
                } else {
                    // User is signed out
                    store.dispatch(signOutSuccess());
                }
            },
            function authErrorCB(error) {
                console.error("Auth state change error:", error);
                store.dispatch(authFailed(error.message));
            }
        );
    };
}
