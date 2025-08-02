import { ProfileView } from "../views/ProfileView";
import { connect } from "react-redux";
import { mapStateToProfileProps, mapDispatchToProfileProps } from "../maps/profileMap";
import { QuizResultSuspenseView } from "../views/QuizResultSuspenseView";

function ProfileViewRender(props) {
    if (props.triggered && !props.updateInProgress) {
        props.fetchQuizResultACB();
    }

    if (!props.loading && !props.updateInProgress && !props.isQuizResultEmpty && !props.error) {
        return (
            <ProfileView
                princessNameResult={props.princessNameResult}
                princessRateResults={props.princessRateResult}
                princessImg={props.princessMainImgUrl}
                princessShortDesc={props.shortDesc}
                princessLongDesc={props.longDesc}
                princessRiskAnalysis={props.riskAnalysis}
            />
        );
    } else {
        return (
            <QuizResultSuspenseView
                isEmpty={props.isQuizResultEmpty}
                error={props.error}
                initiateQuiz={props.initQuizACB}
            />
        );
    }
}

export const Profile = connect(mapStateToProfileProps, mapDispatchToProfileProps)(ProfileViewRender);
