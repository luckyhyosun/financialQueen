import { createSlice } from "@reduxjs/toolkit";
import { getStoredUserDataCB, saveUserDataCB, clearAllStoredDataCB } from "../../helpers/localStorage";

// Initialize state from localStorage
const storedUserData = getStoredUserDataCB();

export const userSlice = createSlice({
    name: "currentUser",
    initialState: {
        // User authentication state
        id: storedUserData?.id || null,
        email: storedUserData?.email || null,
        displayName: storedUserData?.displayName || null,
        photoURL: storedUserData?.photoURL || null,
        quizResult: storedUserData?.quizResult || [],

        // Application state
        isReady: false, // Start as false, becomes true after auth state is determined
        isAuthenticated: false, // Start as false, set to true only after Firebase confirms auth
        isLoading: false,
        error: null,
    },
    reducers: {
        /**
         * Start Google sign-in process
         */
        googleSignInStart(state) {
            state.isLoading = true;
            state.error = null;
        },

        /**
         * Start email sign-in process
         */
        emailSignInStart(state, action) {
            state.isLoading = true;
            state.error = null;
            // Store credentials temporarily for middleware to use
            state._pendingAuth = {
                type: "emailSignIn",
                email: action.payload.email,
                password: action.payload.password,
            };
        },

        /**
         * Start email sign-up process
         */
        emailSignUpStart(state, action) {
            state.isLoading = true;
            state.error = null;
            // Store credentials temporarily for middleware to use
            state._pendingAuth = {
                type: "emailSignUp",
                email: action.payload.email,
                password: action.payload.password,
                name: action.payload.name,
            };
        },

        /**
         * Clear pending auth data (for security)
         */
        clearPendingAuth(state) {
            delete state._pendingAuth;
        },

        // === Firestore Operations ===

        /**
         * Start fetching user data from Firestore
         */
        fetchUser(state) {
            state.isLoading = true;
            state.error = null;
            // Don't set isReady to false here if already true
        },

        /**
         * Start updating quiz result in Firestore
         */
        updateQuizResult(state) {
            state.isLoading = true;
            state.error = null;
        },

        /**
         * Handle successful user data load from Firestore
         */
        userLoaded(state, action) {
            const { id, quizResult } = action.payload;

            state.id = id;
            state.quizResult = quizResult;
            state.isReady = true;
            state.isLoading = false;
            state.isAuthenticated = true;
            state.error = null;

            // Update localStorage with complete user data
            const userData = {
                id,
                quizResult,
                email: state.email,
                displayName: state.displayName,
                photoURL: state.photoURL,
            };
            saveUserDataCB(userData);
        },

        /**
         * Handle successful quiz result update
         */
        userQuizUpdated(state, action) {
            state.quizResult = action.payload;
            state.isLoading = false;
            state.error = null;

            // Update quiz results in localStorage
            const userData = getStoredUserDataCB();
            if (userData) {
                userData.quizResult = action.payload;
                saveUserDataCB(userData);
            }
        },

        /**
         * Handle Firestore operation failures
         */
        userOperationFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
            // If this is during initial load, still set ready to true so app can continue
            if (!state.isReady) {
                state.isReady = true;
            }
        },

        /**
         * Handle successful authentication
         */
        authSuccess(state, action) {
            const { uid, email, displayName, photoURL } = action.payload;

            state.isLoading = false;
            state.isAuthenticated = true;
            state.id = uid;
            state.email = email;
            state.displayName = displayName;
            state.photoURL = photoURL;
            state.error = null;
            // Note: isReady will be set to true by userLoaded after Firestore fetch

            // Save authentication data to localStorage (but not isReady yet)
            const userData = {
                id: uid,
                email,
                displayName,
                photoURL,
                quizResult: state.quizResult,
            };
            saveUserDataCB(userData);

            // Clear pending auth data
            delete state._pendingAuth;
        },

        /**
         * Handle authentication failure
         */
        authFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
            state.isReady = true; // Set ready to true even on failure so app can continue
            // Clear pending auth data on failure
            delete state._pendingAuth;
        },

        /**
         * Clear authentication error
         */
        clearAuthError(state) {
            state.error = null;
        },

        /**
         * Start sign out process
         */
        signOutStart(state) {
            state.isLoading = true;
            state.error = null;
        },

        /**
         * Handle successful sign out
         */
        signOutSuccess(state) {
            // Reset user authentication state
            state.isLoading = false;
            state.isAuthenticated = false;
            state.id = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.quizResult = [];
            state.error = null;
            state.isReady = true; // Keep ready state true

            // Clear all stored data
            clearAllStoredDataCB();
        },

        /**
         * Handle sign out failure
         */
        signOutFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        /**
         * Set user as ready for non-authenticated users
         */
        setUserReady(state) {
            state.isReady = true;
            state.isLoading = false;
        },
    },
});

// Export action creators
export const {
    // Auth actions
    googleSignInStart,
    emailSignInStart,
    emailSignUpStart,
    clearPendingAuth,

    // Firestore operations
    fetchUser,
    userLoaded,
    updateQuizResult,
    userQuizUpdated,
    userOperationFailed,

    // Authentication operations
    authSuccess,
    authFailed,
    clearAuthError,
    signOutStart,
    signOutSuccess,
    signOutFailed,

    // Utility actions
    setUserReady,
} = userSlice.actions;

export default userSlice.reducer;
