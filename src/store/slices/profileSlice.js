import { createSlice } from "@reduxjs/toolkit";
import { resetStoredQuiz } from "../../helpers/localStorage";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        triggered: true,
        userId: "",
        princessNameResult: null,
        princessMainImgUrl: "",
        princessRateResult: null,
        shortDesc: "",
        longDesc: "",
        riskAnalysis: [],
        loading: true,
        error: null,
        updateInProgress: false,
        updateCompleted: false,
        isQuizResultEmpty: false,
    },
    reducers: {
        fetchQuizResult(state, action) {
            state.loading = true;
            state.error = null;
        },
        quizResultLoaded(state, action) {
            state.princessNameResult = action.payload.princessNameResult;
            state.princessRateResult = action.payload.princessRateResult;
            state.shortDesc = action.payload.shortDesc;
            state.longDesc = action.payload.longDesc;
            state.riskAnalysis = action.payload.riskAnalysis;
            state.loading = false;
            state.triggered = false;
            state.isQuizResultEmpty = false;
        },
        quizResultFetchFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.triggered = false;
        },
        quizResultEmpty(state) {
            state.loading = false;
            state.triggered = false;
            state.isQuizResultEmpty = true;
        },
        fetchMainPrincessImg(state, action) {
            state.loading = true;
        },
        fetchMainPrincessDone(state, action) {
            state.princessMainImgUrl = action.payload;
        },
        fetchOtherPrincessDone(state, action) {
            state.princessRateResult = action.payload;
            state.loading = false;
        },
        fetchPrincesImgFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateQuizResult(state) {
            state.updateInProgress = true;
            state.loading = true;
        },
        updateQuizResultSuccess: (state) => {
            state.updateInProgress = false;
            state.updateCompleted = true;
            state.isQuizResultEmpty = false;
            resetStoredQuiz();
        },
        updateQuizResultFailed: (state, action) => {
            state.error = action.payload;
            state.updateInProgress = false;
            state.loading = false;
        },
        resetTriggered: (state) => {
            state.triggered = false;
        },
    },
});

export const {
    fetchQuizResult,
    quizResultLoaded,
    quizResultFetchFailed,
    quizResultEmpty,
    fetchMainPrincessImg,
    fetchMainPrincessDone,
    fetchOtherPrincessDone,
    fetchPrincesImgFailed,
    updateQuizResult,
    updateQuizResultSuccess,
    updateQuizResultFailed,
    resetTriggered,
} = profileSlice.actions;

export default profileSlice.reducer;
