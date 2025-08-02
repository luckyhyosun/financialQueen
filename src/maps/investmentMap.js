import { fetchInvestments, addInvestment, updateInvestment, deleteInvestment } from "../store/slices/investmentSlice";
import { fetchQuizResult } from "../store/slices/profileSlice.js";

/**
 * Maps Redux state to investment-related props
 * @param {Object} state The Redux state
 * @returns {Object} Investment-related props
 */
export function mapStateToInvestmentProps(state) {
    return {
        investments: state.investments.items || [],
        isInvestmentsLoading: state.investments.isLoading || false,
        investmentsError: state.investments.error || null,
        shortDesc: state.profile.shortDesc,
        longDesc: state.profile.longDesc,
        // Add user authentication state
        isUserReady: state.currentUser.isReady,
        isUserAuthenticated: state.currentUser.isAuthenticated,
    };
}

/**
 * Maps dispatch to investment-related action creators
 * @param {Function} dispatch The Redux dispatch function
 * @returns {Object} Investment-related action creators
 */
export function mapDispatchToInvestmentProps(dispatch) {
    return {
        fetchInvestmentsACB() {
            dispatch(fetchInvestments());
        },

        addInvestmentACB(newInvestment) {
            dispatch(addInvestment(newInvestment));
        },

        updateInvestmentACB(updatedInvestment) {
            dispatch(updateInvestment(updatedInvestment));
        },

        deleteInvestmentACB(investmentId) {
            dispatch(deleteInvestment(investmentId));
        },
        fetchQuizResultACB() {
            dispatch(fetchQuizResult());
        },
    };
}
