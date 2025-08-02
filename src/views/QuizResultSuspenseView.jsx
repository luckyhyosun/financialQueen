export function QuizResultSuspenseView(props) {
    let icon = null;
    if (props.error) {
        icon = "exclamation-octagon-fill";
    }

    if (props.isEmpty) {
        icon = "patch-question-fill";
    }
    return (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
            <div className="container d-flex flex-column flex-md-row align-items-center justify-content-around">
                <div className="text-white-50 text-center" aria-hidden="true">
                    {icon !== null && (
                        <div
                            className="d-flex bg-secondary align-items-center justify-content-around"
                            style={{
                                width: 400,
                                height: 400,
                                borderRadius: "10%",
                            }}
                        >
                            <i
                                className={`bi bi-${icon}`}
                                style={{
                                    fontSize: "20rem",
                                }}
                            ></i>
                        </div>
                    )}
                    {icon == null && (
                        <div className="placeholder-glow">
                            <div className="placeholder" style={{ width: 400, height: 400, borderRadius: "10%" }}></div>
                        </div>
                    )}
                </div>

                <div className="text-white text-center">{displayMessageSection()}</div>
            </div>
        </div>
    );

    function handleNativeQuizClickACB() {
        props.initiateQuiz();
        window.location.hash = "/quiz";
    }

    function displayMessageSection() {
        if (props.error) {
            return <div>Error Loading Quiz Result : {props.error}</div>;
        }
        if (props.isEmpty) {
            return (
                <>
                    <h3>No Quiz Result</h3>
                    {props.initiateQuiz && (
                        <div>
                            <button className="btn btn-light btn-lg rounded-pill" onClick={handleNativeQuizClickACB}>
                                Take Quiz Now
                            </button>
                        </div>
                    )}
                </>
            );
        }

        return <h3>Loading Quiz Result ...</h3>;
    }
}
