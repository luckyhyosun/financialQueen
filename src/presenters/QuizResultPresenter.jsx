import { connect } from "react-redux";
import { QuizResultView } from "../views/QuizResultView";
import { QuizResultSuspenseView } from "../views/QuizResultSuspenseView";
import { mapDispatchToQuizResultProps, mapStateToQuizResultProps } from "../maps/quizMap";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function QuizResultViewRender(props) {
    if (props.isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    useEffect(() => {
        props.fetchTempResultACB();
    }, []);

    if (!props.loading && !props.isEmpty && !props.error) {
        return (
            <QuizResultView
                princessImg={props.tempQuizResult.princessImage}
                representativePrincess={props.tempQuizResult.representativePrincess}
                princessDescription={props.tempQuizResult.princessDescription}
            />
        );
    } else {
        return <QuizResultSuspenseView isEmpty={props.isEmpty} error={props.error} initiateQuiz={props.initQuizACB} />;
    }
}

export const QuizResult = connect(mapStateToQuizResultProps, mapDispatchToQuizResultProps)(QuizResultViewRender);
