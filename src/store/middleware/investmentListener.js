import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
    fetchInvestments,
    investmentsLoaded,
    addInvestment,
    investmentAdded,
    updateInvestment,
    investmentUpdated,
    deleteInvestment,
    investmentDeleted,
    investmentOperationFailed,
    createNewInvestment,
} from "../slices/investmentSlice";
import { signOutSuccess } from "../slices/userSlice"; // Import signOut action
import { db } from "../../firebase/index.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const listenerMiddleware = createListenerMiddleware();

// Helper function to ensure no undefined values in the investment object
function sanitizeInvestment(investment) {
    // Create a copy of the investment
    const cleanInvestment = { ...investment };

    // Set default values for any undefined fields
    if (cleanInvestment.riskTolerance === undefined) cleanInvestment.riskTolerance = "Medium";
    if (cleanInvestment.timeHorizon === undefined) cleanInvestment.timeHorizon = "Medium-term (3-7 years)";
    if (cleanInvestment.liquidity === undefined) cleanInvestment.liquidity = "Medium (Some restrictions)"; // Fixed typo
    if (cleanInvestment.amount === undefined) cleanInvestment.amount = 0;

    // Ensure the investment has both an id and a name
    if (!cleanInvestment.name && cleanInvestment.id) {
        cleanInvestment.name = cleanInvestment.id;
    }

    return cleanInvestment;
}

// Helper to check if user is authenticated
function isUserAuthenticatedCB(listenerApi) {
    const { currentUser } = listenerApi.getState();
    return currentUser && currentUser.isAuthenticated && currentUser.id;
}

// Fetch investments
listenerMiddleware.startListening({
    actionCreator: fetchInvestments,
    effect: async function fetchInvestmentsEffectACB(action, listenerApi) {
        try {
            const { currentUser } = listenerApi.getState();

            // If no user is logged in, use localStorage data only
            if (!isUserAuthenticatedCB(listenerApi)) {
                try {
                    const savedData = localStorage.getItem("investments");
                    const investments = savedData ? JSON.parse(savedData) : [];
                    listenerApi.dispatch(investmentsLoaded(investments));
                } catch (e) {
                    console.log("Error reading from localStorage", e);
                    listenerApi.dispatch(investmentsLoaded([]));
                }
                return;
            }

            // Otherwise fetch from Firestore
            const userDoc = await getDoc(doc(db, "users", currentUser.id));

            if (userDoc.exists()) {
                const data = userDoc.data();
                const investments = data.investments || [];

                // Clean the investments data
                const cleanInvestments = investments.map(sanitizeInvestment);

                listenerApi.dispatch(investmentsLoaded(cleanInvestments));
            } else {
                listenerApi.dispatch(investmentsLoaded([]));
            }
        } catch (error) {
            console.error("Error fetching investments:", error);

            // Handle permission errors gracefully
            if (error.code === "permission-denied") {
                console.log("User not authenticated for investment data access");
                // Load from localStorage as fallback
                try {
                    const savedData = localStorage.getItem("investments");
                    const investments = savedData ? JSON.parse(savedData) : [];
                    listenerApi.dispatch(investmentsLoaded(investments));
                } catch (localError) {
                    listenerApi.dispatch(investmentsLoaded([]));
                }
                return;
            }

            listenerApi.dispatch(investmentOperationFailed(error.message));
        }
    },
});

// Add investment
listenerMiddleware.startListening({
    actionCreator: addInvestment,
    effect: async function addInvestmentEffectACB(action, listenerApi) {
        try {
            const {
                currentUser,
                investments: { items },
            } = listenerApi.getState();

            const investmentCount = Array.isArray(items) ? items.length : 0;
            const newInvestment = createNewInvestment(investmentCount);

            // Add to backend if user is logged in
            if (isUserAuthenticatedCB(listenerApi)) {
                const userDoc = await getDoc(doc(db, "users", currentUser.id));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const currentInvestments = userData.investments || [];

                    await updateDoc(doc(db, "users", currentUser.id), {
                        investments: [...currentInvestments, newInvestment],
                    });
                }
            }

            // Update state
            listenerApi.dispatch(investmentAdded(newInvestment));
        } catch (error) {
            console.error("Error adding investment:", error);

            // Handle permission errors - still add to local state
            if (error.code === "permission-denied") {
                console.log("User not authenticated for adding investment - saving locally only");
                listenerApi.dispatch(investmentAdded(newInvestment));
                return;
            }

            listenerApi.dispatch(investmentOperationFailed(error.message));
        }
    },
});

// Update investment
listenerMiddleware.startListening({
    actionCreator: updateInvestment,
    effect: async function updateInvestmentEffectACB(action, listenerApi) {
        try {
            // Clean the investment data
            const updatedInvestment = sanitizeInvestment(action.payload);
            const { currentUser } = listenerApi.getState();

            // Update in backend if user is logged in
            if (isUserAuthenticatedCB(listenerApi)) {
                const userDoc = await getDoc(doc(db, "users", currentUser.id));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const currentInvestments = userData.investments || [];

                    // Replace the old investment with the updated one
                    const updatedInvestments = currentInvestments.map((inv) =>
                        inv.id === updatedInvestment.id ? updatedInvestment : inv
                    );

                    await updateDoc(doc(db, "users", currentUser.id), {
                        investments: updatedInvestments,
                    });
                }
            }

            // Update state
            listenerApi.dispatch(investmentUpdated(updatedInvestment));
        } catch (error) {
            console.error("Error updating investment:", error);

            // Handle permission errors - still update local state
            if (error.code === "permission-denied") {
                console.log("User not authenticated for updating investment - updating locally only");
                listenerApi.dispatch(investmentUpdated(updatedInvestment));
                return;
            }

            listenerApi.dispatch(investmentOperationFailed(error.message));
        }
    },
});

// Delete investment
listenerMiddleware.startListening({
    actionCreator: deleteInvestment,
    effect: async function deleteInvestmentEffectACB(action, listenerApi) {
        try {
            const investmentId = action.payload;
            const { currentUser } = listenerApi.getState();

            // Delete from backend if user is logged in
            if (isUserAuthenticatedCB(listenerApi)) {
                const userDoc = await getDoc(doc(db, "users", currentUser.id));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const currentInvestments = userData.investments || [];

                    // Filter out the deleted investment
                    const updatedInvestments = currentInvestments.filter((inv) => inv.id !== investmentId);

                    await updateDoc(doc(db, "users", currentUser.id), {
                        investments: updatedInvestments,
                    });
                }
            }

            // Update state
            listenerApi.dispatch(investmentDeleted(investmentId));
        } catch (error) {
            console.error("Error deleting investment:", error);

            // Handle permission errors - still delete from local state
            if (error.code === "permission-denied") {
                console.log("User not authenticated for deleting investment - deleting locally only");
                listenerApi.dispatch(investmentDeleted(investmentId));
                return;
            }

            listenerApi.dispatch(investmentOperationFailed(error.message));
        }
    },
});

// Clean up investments on sign out
listenerMiddleware.startListening({
    actionCreator: signOutSuccess,
    effect: async function signOutInvestmentCleanupEffectACB(action, listenerApi) {
        try {
            console.log("Cleaning up investment data after sign out");

            // Clear investments to prevent permission errors
            // Keep localStorage data so it can be loaded for guest users
            const savedData = localStorage.getItem("investments");
            const guestInvestments = savedData ? JSON.parse(savedData) : [];

            listenerApi.dispatch(investmentsLoaded(guestInvestments));
        } catch (error) {
            console.error("Error cleaning up investments after sign out:", error);
            // Fallback: clear everything
            listenerApi.dispatch(investmentsLoaded([]));
        }
    },
});

export default listenerMiddleware;
