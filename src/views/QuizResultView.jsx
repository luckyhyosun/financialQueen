export function QuizResultView(props) {
    return (
        <div
            className="w-100 h-100"
            style={{
                position: "relative",
                overflowY: "auto",
                maxHeight: "100%",
            }}
        >
            <div className="d-flex align-items-start justify-content-center w-100 py-4">
                <div className="container d-flex flex-column flex-md-row align-items-center justify-content-around">
                    <div className="text-center text-white">
                        <div className="d-flex flex-column align-items-center gap-3">
                            <img
                                src={props.princessImg}
                                alt="quiz result"
                                style={{
                                    width: 400,
                                    height: 400,
                                    objectFit: "cover",
                                    borderRadius: "10%",
                                }}
                            ></img>
                            <button
                                onClick={navigateQuizPageACB}
                                className="btn btn-light btn-lg px-5 rounded-pill fw-bold shadow"
                                style={{ marginBottom: "2rem" }}
                            >
                                Retake Quiz
                            </button>
                        </div>
                    </div>

                    <div className="text-white text-center">
                        <h3 className="fw-bold">You are</h3>
                        <h1 className="fw-bold">{props.representativePrincess}!</h1>
                        <br />
                        <h4 className="fw-bold">{props.princessDescription}!</h4>
                        <br />
                        <br />
                        <p>
                            In order to get more detailed results, <br />
                            Please create an account with us
                        </p>
                        <button
                            onClick={navigateSignUpACB}
                            className="btn btn-light btn-lg px-5 rounded-pill fw-bold shadow mt-3"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    function navigateQuizPageACB() {
        localStorage.clear();
        window.location.hash = "#/quiz";
        location.reload();
    }
    function navigateSignUpACB() {
        window.location.hash = "#/signUp";
    }
}
