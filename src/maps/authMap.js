import {
    googleSignInStart,
    emailSignInStart,
    emailSignUpStart,
    clearAuthError,
    signOutStart,
} from "../store/slices/userSlice.js";

export function mapStateToAuthPropsCB(state) {
    return {
        id: state.currentUser.id,
        email: state.currentUser.email,
        displayName: state.currentUser.displayName,
        photoURL: state.currentUser.photoURL,
        quizResult: state.currentUser.quizResult,
        isAuthenticated: state.currentUser.isAuthenticated,
        isReady: state.currentUser.isReady,
        isLoading: state.currentUser.isLoading,
        error: state.currentUser.error,
    };
}

export function mapDispatchToAuthPropsACB(dispatch) {
    return {
        /**
         * Signs in user with Google authentication
         */
        googleSignInACB() {
            return dispatch(googleSignInStart());
        },

        /**
         * Signs in user with email and password
         */
        emailSignInACB(email, password) {
            return dispatch(emailSignInStart({ email, password }));
        },

        /**
         * Signs up user with email, password, and name
         */
        emailSignUpACB(email, password, name) {
            return dispatch(emailSignUpStart({ email, password, name }));
        },

        /**
         * Signs out the current user
         */
        signOutACB() {
            return dispatch(signOutStart());
        },

        /**
         * Clears any authentication errors
         */
        clearAuthError() {
            dispatch(clearAuthError());
        },
    };
}
