import { fetchQuizResult, resetTriggered } from "../store/slices/profileSlice";
import { initiateQuiz } from "../store/slices/quizSlice";

export function mapStateToProfileProps(state) {
    return {
        triggered: state.profile.triggered,
        userId: state.currentUser.id,
        princessNameResult: state.profile.princessNameResult,
        princessMainImgUrl: state.profile.princessMainImgUrl,
        princessRateResult: state.profile.princessRateResult,
        shortDesc: state.profile.shortDesc,
        longDesc: state.profile.longDesc,
        riskAnalysis: state.profile.riskAnalysis,
        loading: state.profile.loading,
        error: state.profile.error,
        updateInProgress: state.profile.updateInProgress,
        updateCompleted: state.profile.updateCompleted,
        isQuizResultEmpty: state.profile.isQuizResultEmpty,
    };
}

export function mapDispatchToProfileProps(dispatch) {
    return {
        fetchQuizResultACB: () => dispatch(fetchQuizResult()),
        resetTriggeredACB: () => dispatch(resetTriggered()),
        initQuizACB: () => dispatch(initiateQuiz()),
    };
}
