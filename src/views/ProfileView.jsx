export function ProfileView(props) {
    function showRiskAnalysisDescACB(name) {
        const riskAnalysisArray = props.princessRiskAnalysis;

        const matchingRisk = riskAnalysisArray.find((risk) => risk.name === name);

        if (matchingRisk) {
            return (
                <div key={matchingRisk.name}>
                    <p className="mb-0">{matchingRisk.riskAnalysis}</p>
                    {matchingRisk.riskDescription && <p className="fst-italic small">{matchingRisk.riskDescription}</p>}
                </div>
            );
        }
    }

    function showPrincessRateACB(result, index) {
        return (
            <div
                key={result.id || index}
                className="d-flex align-items-center justify-content-start gap-3 my-2 flex-row"
            >
                <img
                    src={result.imgUrl}
                    alt={result.name}
                    style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                    }}
                />
                <div className="text-start">
                    <p className="mb-0">{result.rate}% of</p>
                    <h5 className="mb-1">{result.name}</h5>
                </div>
            </div>
        );
    }

    function showRiskAnalysisACB(result, index) {
        return (
            <div
                key={result.id || index}
                className="d-flex flex-column flex-sm-row align-items-center justify-content-start gap-3 my-2"
            >
                <img
                    src={result.imgUrl}
                    alt={result.name}
                    style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "50%",
                    }}
                />
                <div
                    className="text-start"
                    style={{
                        width: "150px",
                        minWidth: "100px",
                        maxWidth: "150px",
                    }}
                >
                    <p className="mb-0">
                        {result.rate}% of {result.name}:
                    </p>
                </div>
                <div key={result.name} className="text-start" style={{ flex: 1 }}>
                    {showRiskAnalysisDescACB(result.name)}
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex align-items-start w-100 h-100 overflow-auto py-3">
            <div className="container d-flex flex-column flex-lg-row justify-content-around gap-5">
                {/* Left side - Princess image - Hidden on screens smaller than lg */}
                <div className="text-center text-white d-none d-lg-flex">
                    <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <img
                            src={props.princessImg}
                            style={{
                                width: 400,
                                height: 400,
                                objectFit: "cover",
                                borderRadius: "10%",
                            }}
                        ></img>
                        <h1 className="mb-3">Welcome, {props.princessNameResult}</h1>
                    </div>
                </div>

                {/* Right side - Content - Always visible, takes full width on mobile */}
                <div className="text-white text-center w-100 w-lg-50 overflow-auto">
                    {/* Mobile-only welcome header */}
                    <div className="d-lg-none mb-4">
                        <h1 className="mb-3">Welcome, {props.princessNameResult}</h1>
                    </div>

                    <h3 className="fw-bold">You are...</h3>
                    <p className="fw-bold">{props.princessShortDesc}</p>
                    <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                        {props.princessRateResults.map(showPrincessRateACB)}
                        <br />
                        <p className="text-start">{props.princessLongDesc}</p>
                    </div>
                    <br />

                    <h3 className="fw-bold">Risk Analysis</h3>
                    <div>{props.princessRateResults.map(showRiskAnalysisACB)}</div>
                </div>
            </div>
        </div>
    );
}
