import { createSlice } from "@reduxjs/toolkit";

/**
 * Helper function to generate unique investment IDs
 */
export function generateInvestmentId() {
    return `inv_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

/**
 * Helper function to create a new investment object
 */
export function createNewInvestment(existingInvestmentsCount = 0) {
    return {
        id: generateInvestmentId(),
        name: `Investment ${existingInvestmentsCount + 1}`,
        amount: 1000,
        riskTolerance: "Medium",
        timeHorizon: "Medium-term (3-7 years)",
        liquidity: "Medium (Some restrictions)",
    };
}

/**
 * Helper functions for local storage fallback
 */
function getStoredInvestmentsCB() {
    try {
        const investmentsData = localStorage.getItem("investments");
        return investmentsData ? JSON.parse(investmentsData) : [];
    } catch (error) {
        console.error("Error getting investments from localStorage:", error);
        return [];
    }
}

// Get initial data from local storage if available
const storedInvestments = getStoredInvestmentsCB();

export const investmentSlice = createSlice({
    name: "investments",
    initialState: {
        items: storedInvestments,
        isLoading: false,
        error: null,
    },
    reducers: {
        // Fetch investments actions
        fetchInvestments(state) {
            state.isLoading = true;
            state.error = null;
        },
        investmentsLoaded(state, action) {
            state.items = action.payload;
            state.isLoading = false;

            // Update localStorage for offline access
            try {
                localStorage.setItem("investments", JSON.stringify(action.payload));
            } catch (error) {
                console.error("Error saving investments to localStorage:", error);
            }
        },

        // Add investment actions
        addInvestment(state) {
            state.isLoading = true;
            state.error = null;
        },
        investmentAdded(state, action) {
            state.items.push(action.payload);
            state.isLoading = false;

            // Update localStorage
            try {
                localStorage.setItem("investments", JSON.stringify(state.items));
            } catch (error) {
                console.error("Error saving investments to localStorage:", error);
            }
        },

        // Update investment actions
        updateInvestment(state) {
            state.isLoading = true;
            state.error = null;
        },
        investmentUpdated(state, action) {
            const updatedInvestment = action.payload;
            state.items = state.items.map(function mapInvestmentCB(item) {
                return item.id === updatedInvestment.id ? updatedInvestment : item;
            });
            state.isLoading = false;

            // Update localStorage
            try {
                localStorage.setItem("investments", JSON.stringify(state.items));
            } catch (error) {
                console.error("Error saving investments to localStorage:", error);
            }
        },

        // Delete investment actions
        deleteInvestment(state) {
            state.isLoading = true;
            state.error = null;
        },
        investmentDeleted(state, action) {
            const investmentId = action.payload;
            state.items = state.items.filter(function filterInvestmentCB(item) {
                return item.id !== investmentId;
            });
            state.isLoading = false;

            // Update localStorage
            try {
                localStorage.setItem("investments", JSON.stringify(state.items));
            } catch (error) {
                console.error("Error saving investments to localStorage:", error);
            }
        },

        // Error handling
        investmentOperationFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        initializeDashboard(state) {
            // This can be empty since we're using it as a signal
            // for the middleware to dispatch fetchInvestments
        },
    },
});

export const {
    fetchInvestments,
    investmentsLoaded,
    addInvestment,
    investmentAdded,
    updateInvestment,
    investmentUpdated,
    deleteInvestment,
    investmentDeleted,
    investmentOperationFailed,
    initializeDashboard,
} = investmentSlice.actions;

export default investmentSlice.reducer;
