import { initiateQuiz } from "../store/slices/quizSlice";

export function mapDispatchToLandingProps(dispatch) {
    return {
        initiateQuizACB() {
            initiateQuiz();
        },
    };
}
