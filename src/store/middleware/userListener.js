import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
    fetchUser,
    updateQuizResult,
    userLoaded,
    userOperationFailed,
    userQuizUpdated,
    authSuccess,
    signOutStart,
    signOutSuccess,
    signOutFailed,
    googleSignInStart,
    emailSignInStart,
    emailSignUpStart,
    authFailed,
    clearPendingAuth,
} from "../slices/userSlice";
import { db } from "../../firebase/index.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
    createUserWithEmailACB,
    signInWithEmailACB,
    signInWithGoogleACB,
    signOutACB as firebaseSignOutACB,
    checkEmailMethodsACB,
} from "../../firebase/auth";
import { formatErrorMessageCB, checkIfEmailUsedWithGoogleACB } from "../../utils/Authentification/validation";
import { forumCleanUp } from "./forumListener.js";

export const userListenerMiddleware = createListenerMiddleware();
/**
 * Google Sign-In Listener
 */
userListenerMiddleware.startListening({
    actionCreator: googleSignInStart,
    effect: async function googleSignInEffectACB(action, listenerApi) {
        try {
            const signInFunction = signInWithGoogleACB();
            const { user, success, error } = await signInFunction();

            if (!success) {
                throw new Error(error || "Google sign-in failed");
            }

            if (!user?.uid) {
                throw new Error("Invalid user data received from Google");
            }

            listenerApi.dispatch(
                authSuccess({
                    uid: user.uid,
                    email: user.email || "",
                    displayName: user.displayName || user.email?.split("@")[0] || "",
                    photoURL: user.photoURL || "",
                })
            );
        } catch (error) {
            const errorMessage = formatErrorMessageCB(error, "Google sign-in failed. Please try again.");
            console.error("Google sign-in error:", error);
            listenerApi.dispatch(authFailed(errorMessage));
        }
    },
});

/**
 * Email Sign-In Listener
 */
userListenerMiddleware.startListening({
    actionCreator: emailSignInStart,
    effect: async function emailSignInEffectACB(action, listenerApi) {
        try {
            const { email, password } = action.payload;

            // Basic validation
            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            // Check if email is associated with Google
            const { isGoogleEmail, error: checkError } = await checkIfEmailUsedWithGoogleACB(email);
            if (isGoogleEmail && checkError) {
                throw new Error(checkError);
            }

            const signInFn = signInWithEmailACB(email, password);
            const { user, success, error } = await signInFn();

            if (!success) {
                throw new Error(error || "Sign-in failed");
            }

            if (!user?.uid) {
                throw new Error("Invalid user data received");
            }

            listenerApi.dispatch(
                authSuccess({
                    uid: user.uid,
                    email: user.email || email,
                    displayName: user.displayName || email.split("@")[0],
                    photoURL: user.photoURL || "",
                })
            );
        } catch (error) {
            const errorMessage = formatErrorMessageCB(error, "Sign-in failed. Please check your email and password.");
            console.error("Email sign-in error:", error);
            listenerApi.dispatch(authFailed(errorMessage));
        } finally {
            // Always clear pending auth data
            listenerApi.dispatch(clearPendingAuth());
        }
    },
});

/**
 * Email Sign-Up Listener
 */
userListenerMiddleware.startListening({
    actionCreator: emailSignUpStart,
    effect: async function emailSignUpEffectACB(action, listenerApi) {
        try {
            const { email, password, name } = action.payload;

            // Basic validation
            if (!email || !password || !name) {
                throw new Error("Email, password, and name are required");
            }

            // Check if email is already registered with any provider
            const { isGoogleEmail, error: checkError } = await checkIfEmailUsedWithGoogleACB(email);
            if (isGoogleEmail && checkError) {
                throw new Error(checkError);
            }

            const signUpFn = createUserWithEmailACB(email, password, name);
            const { user, success, error } = await signUpFn();

            if (!success) {
                throw new Error(error || "Sign-up failed");
            }

            if (!user?.uid) {
                throw new Error("Invalid user data received");
            }

            listenerApi.dispatch(
                authSuccess({
                    uid: user.uid,
                    email: user.email || email,
                    displayName: user.displayName || name || email.split("@")[0],
                    photoURL: user.photoURL || "",
                })
            );
        } catch (error) {
            const errorMessage = formatErrorMessageCB(error, "Sign-up failed. Please try again.");
            console.error("Email sign-up error:", error);
            listenerApi.dispatch(authFailed(errorMessage));
        } finally {
            // Always clear pending auth data
            listenerApi.dispatch(clearPendingAuth());
        }
    },
});

/**
 * Sign Out Listener
 */
userListenerMiddleware.startListening({
    actionCreator: signOutStart,
    effect: async function signOutEffectACB(action, listenerApi) {
        try {
            const signOutFunction = firebaseSignOutACB();
            const { success, error } = await signOutFunction();

            if (!success) {
                throw new Error(error || "Sign-out failed");
            }

            listenerApi.dispatch(signOutSuccess());
        } catch (error) {
            const errorMessage = formatErrorMessageCB(error, "Sign-out failed. Please try again.");
            console.error("Sign-out error:", error);
            listenerApi.dispatch(signOutFailed(errorMessage));
        }
    },
});

/**
 * Listener for fetching user data from Firestore
 */
userListenerMiddleware.startListening({
    actionCreator: fetchUser,
    effect: async function fetchUserEffectACB(action, listenerApi) {
        const userData = action.payload;

        if (!userData?.id) {
            console.error("fetchUser called without user ID");
            listenerApi.dispatch(userOperationFailed("User ID is required"));
            return;
        }

        try {
            const userDocRef = doc(db, "users", userData.id);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const data = userDoc.data();

                listenerApi.dispatch(
                    userLoaded({
                        id: userDoc.id,
                        quizResult: data.quizResult || [],
                    })
                );
            } else {
                // Create new user document if it doesn't exist
                const newUserData = {
                    id: userData.id,
                    quizResult: [],
                    createdAt: new Date(),
                    lastLoginAt: new Date(),
                };

                await setDoc(userDocRef, newUserData);

                listenerApi.dispatch(
                    userLoaded({
                        id: userData.id,
                        quizResult: [],
                    })
                );
            }
        } catch (error) {
            console.error("Error fetching user data:", error);

            // Handle insufficient permissions error (user not authenticated)
            if (error.code === "permission-denied") {
                console.log("User not authenticated for Firestore access");
                // Don't dispatch an error for this case, just log it
                return;
            }

            listenerApi.dispatch(userOperationFailed(error.message || "Failed to fetch user data"));
        }
    },
});

/**
 * Listener for updating quiz results in Firestore
 */
userListenerMiddleware.startListening({
    actionCreator: updateQuizResult,
    effect: async function updateQuizResultEffectACB(action, listenerApi) {
        try {
            const { currentUser } = listenerApi.getState();

            if (!currentUser.id) {
                throw new Error("User must be authenticated to update quiz results");
            }

            const quizResult = action.payload;
            const userDocRef = doc(db, "users", currentUser.id);

            await setDoc(
                userDocRef,
                {
                    quizResult,
                    lastQuizUpdate: new Date(),
                },
                { merge: true }
            );

            listenerApi.dispatch(userQuizUpdated(quizResult));
        } catch (error) {
            console.error("Error updating quiz result:", error);
            listenerApi.dispatch(userOperationFailed(error.message || "Failed to update quiz result"));
        }
    },
});

/**
 * Listener for handling user setup after successful authentication
 */
userListenerMiddleware.startListening({
    actionCreator: authSuccess,
    effect: async function authSuccessEffectACB(action, listenerApi) {
        try {
            const user = action.payload;

            if (!user.uid) {
                throw new Error("Invalid user data: missing uid");
            }

            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // Create new user document for first-time users
                const newUserData = {
                    id: user.uid,
                    email: user.email || "",
                    displayName: user.displayName || "",
                    photoURL: user.photoURL || "",
                    quizResult: [],
                    createdAt: new Date(),
                    lastLoginAt: new Date(),
                    authProvider: user.email ? "email" : "google",
                };

                await setDoc(userDocRef, newUserData);

                listenerApi.dispatch(
                    userLoaded({
                        id: user.uid,
                        quizResult: [],
                    })
                );
            } else {
                // Load existing user data
                const userData = userDoc.data();

                // Update last login time
                await setDoc(
                    userDocRef,
                    {
                        lastLoginAt: new Date(),
                    },
                    { merge: true }
                );

                listenerApi.dispatch(
                    userLoaded({
                        id: user.uid,
                        quizResult: userData.quizResult || [],
                    })
                );
            }
        } catch (error) {
            console.error("Error in auth success middleware:", error);
            listenerApi.dispatch(userOperationFailed(error.message || "Failed to setup user data"));
        }
    },
});

/**
 * Listener for handling cleanup after user sign out
 */
userListenerMiddleware.startListening({
    actionCreator: signOutSuccess,
    effect: async function signOutSuccessEffectACB(action, listenerApi) {
        try {
            console.log("User signed out successfully");
            // Forum clean up
            forumCleanUp(listenerApi.dispatch);
        } catch (error) {
            console.error("Error during sign out cleanup:", error);
        }
    },
});

/**
 * Listener for handling user operation failures
 */
userListenerMiddleware.startListening({
    actionCreator: userOperationFailed,
    effect: async function userOperationFailedEffectACB(action, listenerApi) {
        const error = action.payload;
        console.error("User operation failed:", error);
    },
});

export default userListenerMiddleware;
