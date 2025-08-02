export function LandingPageView(props) {
    function navigateQuizACB() {
        props.initiateQuizACB();
        window.location.hash = "/quiz";
        location.reload();
    }

    return (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
            <div className="container">
                <div className="row justify-content-center">
                    {/* Main content - centered */}
                    <div className="col-md-8 text-center text-white">
                        <h1 className="display-4 fw-bold mb-4 landing-header">
                            Mirror Mirror
                            <br />
                            on the wall,
                            <br />
                            Who is the
                            <br />
                            richest
                            <br />
                            of them all?
                        </h1>
                        <button
                            onClick={navigateQuizACB}
                            className="btn btn-light btn-lg px-5 rounded-pill fw-bold shadow mt-3"
                        >
                            START
                        </button>
                    </div>
                </div>
            </div>
            {/* Bottom left text - positioned absolutely */}
            <div className="position-absolute start-0 bottom-0 p-4 d-none d-md-block mb-3">
                <p className="text-white small opacity-75 mb-0">
                    Grow financial
                    <br />
                    independence
                    <br />
                    with education and
                    <br />
                    build a connection with
                    <br />
                    same interest group.
                </p>
            </div>
            {/* On mobile, text appears at the bottom center */}
            <div className="position-absolute bottom-0 p-4 w-100 text-center d-block d-md-none">
                <p className="text-white small opacity-75 mb-0">
                    Grow financial independence with education and
                    <br />
                    build a connection with same interest group.
                </p>
            </div>
        </div>
    );
}
