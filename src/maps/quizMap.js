import {
    changeQuestion,
    storeAnswers,
    analyzeQuizAnswers,
    storeDescription,
    fetchTempResult,
    fetchSelectedAnswers,
    initiateQuiz,
} from "../store/slices/quizSlice";

export function mapStateToQuizProps(state) {
    return {
        currentQuestionId: state.quiz.currentQuestionId,
        question: state.quiz.question,
        answers: state.quiz.answers,
        characterData: state.quiz.characterData,
        selectedAnswers: state.quiz.selectedAnswers,
        loading: state.quiz.loading,
        error: state.quiz.error,
        isLoggedIn: state.currentUser.id !== null,
    };
}

export function mapDispatchToQuizProps(dispatch) {
    return {
        nextQuestion(idNum) {
            dispatch(changeQuestion(idNum));
        },
        prevQuestion(idNum) {
            dispatch(changeQuestion(idNum));
        },
        storeAnswers(id, label, answer) {
            dispatch(storeAnswers({ id, label, answer }));
        },
        fetchAnswersACB() {
            dispatch(fetchSelectedAnswers());
        },
        analyzeQuizAnswers() {
            dispatch(analyzeQuizAnswers());
        },
        storeDescription() {
            dispatch(storeDescription());
        },
        initQuizACB() {
            dispatch(initiateQuiz());
        },
    };
}

export function mapStateToQuizResultProps(state) {
    return {
        isLoggedIn: state.currentUser.id !== null,
        tempQuizResult: state.quiz.tempQuizResult,
        loading: state.quiz.loading,
        error: state.quiz.error,
        isEmpty: state.quiz.isEmpty,
    };
}

export function mapDispatchToQuizResultProps(dispatch) {
    return {
        fetchTempResultACB() {
            dispatch(fetchTempResult());
        },
        initQuizACB() {
            dispatch(initiateQuiz());
        },
    };
}
