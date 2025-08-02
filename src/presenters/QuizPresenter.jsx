import { connect } from "react-redux";
import { QuizView } from "../views/QuizView";
import { mapDispatchToQuizProps, mapStateToQuizProps } from "../maps/quizMap";
import { useEffect } from "react";

function QuizViewRender(props) {
    useEffect(() => {
        props.fetchAnswersACB();
    }, []);

    return (
        <QuizView
            question={props.question}
            id={props.currentQuestionId}
            answers={props.answers}
            selectedAnswers={props.selectedAnswers}
            storeAnswers={props.storeAnswers}
            prevQuestion={props.prevQuestion}
            nextQuestion={props.nextQuestion}
            analyzeQuizAnswers={props.analyzeQuizAnswers}
            storeDescription={props.storeDescription}
            isLoggedIn={props.isLoggedIn}
        />
    );
}

export const Quiz = connect(mapStateToQuizProps, mapDispatchToQuizProps)(QuizViewRender);
